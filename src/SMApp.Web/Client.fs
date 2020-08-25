namespace SMApp.Web

open System.Collections.Generic

open FSharp.Control

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html

open SMApp.JQueryTerminal
open SMApp.WebSpeech
open SMApp.Microphone

[<JavaScript>]
module Client =
   
    let mutable CUI = {
        Voice = None
        Mic = None
        Term = Unchecked.defaultof<Terminal>
        DebugMode = false
        Caption = false
    }
    let echo = CUI.Term.EchoHtml'
    let debug m = 
        let text' = sprintf "Client: %A" m in
        ClientExtensions.debug text'
        if CUI.DebugMode then echo text'
    
    let mutable MicState = MicNotInitialized

    (* NLU context *)
    let Context = new List<Meaning>()

    let updateCtx (m:Meaning) =
        do Context.Insert(0, m)
        let b = if Context.Count >= 5 then 5 else Context.Count
        Context |> Seq.take b |> List.ofSeq 

    (* Initialize speech and mic *)
    let initSpeech() =
        let voices' = Window.SpeechSynthesis.GetVoices()
        do if not(isNull(voices')) then
            let voices = voices' |> toArray
            do voices |> Array.iter(fun v-> 
                if CUI.Voice = None && (v.Name.Contains "Microsoft Zira" || v.Name.ToLower().Contains "female") then
                    CUI <- { CUI with Voice = Some v }; debug <| sprintf "Using voice %s." CUI.Voice.Value.Name
                )
            do if CUI.Voice = None && voices.Length > 0 then
                let v = voices |> Array.find (fun v -> v.Default) in 
                CUI <- { CUI with Voice = Some v }; debug <| sprintf "Using default voice %s." CUI.Voice.Value.Name 
        if CUI.Voice = None then 
            error "No speech synthesis voice is available."
            CUI.Term.Echo' "No speech synthesis voice is available. Install speech synthesis on this device or computer to use the voice output feature of Selma."
        
    let initMic m =
        CUI <- { CUI with Mic = Some(new Mic()) }
        let mic = CUI.Mic.Value
        do mic.onConnecting <- (fun _ -> MicState <- MicConnecting; debug "Mic connecting...")
        do mic.onDisconnected <- (fun _ -> MicState <- MicDisconnected;debug "Mic disconnected.")
        do mic.onAudioStart <- (fun _ -> MicState <- MicAudioStart;debug "Mic audio start...")
        do mic.onAudioEnd <- (fun _ -> MicState <- MicAudioEnd;debug "Mic audio end.")
        do mic.onError <- (fun s -> MicState <- MicError s; debug (sprintf "Mic error : %s." s))
        do mic.onReady <- (fun _ -> MicState <- MicReady; debug "Mic ready.")
        do mic.onResult <- (fun i e -> 
            if not (isNull i || isNull e) then 
                MicState <- MicResult(i,e) 
                debug <| sprintf "Mic result: %A %A." i e; m mic (i,e)
            else 
                debug "Mic: No result returned."
            )
        do mic.Connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT")

    let say text =        
        match CUI.Voice with
        | None -> CUI.Term.Echo' text
        | Some v ->
            async { 
                let u = new SpeechSynthesisUtterance(text)
                u.Voice <- v
                Window.SpeechSynthesis.Speak(u) 
            } |> Async.Start
            do if CUI.Caption then CUI.Term.Echo' text
            
    let sayVoices() =
        let voices' = Window.SpeechSynthesis.GetVoices()
        do if not(isNull(voices')) then
            let voices = voices' |> toArray    
            sprintf "There are currently %i voices installed on this computer or device." voices.Length |> say
            voices |> Array.iteri (fun i v -> sprintf "Voice %i. Name: %s, Local: %A." i v.Name v.LocalService |> say)

    let sayRandom phrases = say <| getRandomPhrase phrases    
    
    let stopSpeaking = if Window.SpeechSynthesis.Speaking || Window.SpeechSynthesis.Pending then Window.SpeechSynthesis.Cancel()
    
    let wait (f:unit -> unit) =
        do 
            CUI.Term.Echo'("please wait")
            CUI.Term.Disable();f();CUI.Term.Enable()

    let container = SMApp.Bootstrap.Controls.Container

    /// Main interpreter
    let Main =             
        let main' (_:Mic) (command:obj*obj) =
            let i, e = command
            debug <| sprintf "Voice: %A %A" i e
            let intent = 
                match i, e with
                | Voice.Intent' i -> Some i
                | _ -> None
            let entity = 
                match e with
                | Voice.Entity' entity -> Some [entity]
                | _ -> None
            let _trait = 
                match e with
                | Voice.Trait' t -> Some t
                | _ -> None
            match (intent, entity, _trait) with
            | None, None, None -> ()
            | _ -> 
                debug <| sprintf "Voice: %A %A %A" intent entity _trait
                Meaning(intent, _trait, entity) |> updateCtx |> Main.update CUI
            
        let main (term:Terminal) (command:string)  =
            CUI <- { CUI with Term = term }
            do if CUI.Voice = None then initSpeech()
            do if CUI.Mic = None then initMic main'  
            match command with
            (* Quick commands *)
            | Text.Blank -> say "Tell me what you want me to do or ask me a question."
            | Text.DebugOn -> CUI <- { CUI with DebugMode = true }; say "Debug mode is now on."  
            | Text.DebugOff -> CUI <- { CUI with DebugMode = false }; say "Debug mode is now off." 
            | Text.QuickHello m 
            | Text.QuickHelp m 
            | Text.QuickPrograms m -> 
                debug <| sprintf "Quick Text: %A." m
                m |> updateCtx |> Main.update CUI
            (* Use the NLU service for everything else *)
            | _->         
                async {
                    match! Server.GetMeaning command with
                    | Some (Text.Meaning'([],  [])) -> 
                        debug <| sprintf "Text: no intent."; 
                        term.Echo' "Sorry I did not understand what you said."
                    | Some (Text.Meaning'([],  e)) ->
                        debug <| sprintf "Text: no intent. Entities: %A." e
                    | Some (Text.Meaning'(intents,  []) as m) ->
                        debug <| sprintf "Text: Intents: %A. No entities." intents
                        Meaning(Some (Intent(m.TopIntent.Name, Some m.TopIntent.Confidence)), None, None) |> updateCtx |> Main.update CUI
                    | Some (Text.Meaning'(intents,  entities) as m) ->
                        debug <| sprintf "Text: intents: %A. entities: %A." intents entities
                        Meaning(Some(Intent(m.TopIntent.Name, Some m.TopIntent.Confidence)), None, 
                            entities 
                            |> List.map (fun e -> Entity(e.Name, e.Value, Some e.Confidence)) 
                            |> Some) 
                            |> updateCtx |> Main.update CUI
                    | None -> 
                        debug "Text: Did not receive a response from the server." 
                        term.Echo' "Sorry I did not understand what you said."
                } |> CUI.Wait
        let mainOpt =
            Options(
                Name="Main", 
                Greetings = "Welcome to Selma. Type hello to begin or help for more assistance.",
                Prompt =">"
            )       
        Interpreter(main', (main, mainOpt))
    
    let run() =
        Terminal("#main", ThisAction<Terminal, string>(fun term command -> Main.Text term command), Main.Options) |> ignore 
        Doc.Empty