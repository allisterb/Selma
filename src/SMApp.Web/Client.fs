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
    let debugEcho s = if CUI.DebugMode then CUI.Term.EchoHtml' s
    
    let mutable MicState = MicNotInitialized

    (* NLU context *)
    let Context = new List<NLUContext>()

    let updateCtx (m:Meaning) =
        do Context.Insert(0, NLUContext(m))
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
        
    let initMic m (term:Terminal) =
        CUI <- { CUI with Mic = Some(new Mic()) }
        let mic = CUI.Mic.Value
        do mic.onConnecting <- (fun _ -> MicState <- MicConnecting; debugEcho "Mic connecting...")
        do mic.onDisconnected <- (fun _ -> MicState <- MicDisconnected;debugEcho "Mic disconnected.")
        do mic.onAudioStart <- (fun _ -> MicState <- MicAudioStart;debugEcho "Mic audio start...")
        do mic.onAudioEnd <- (fun _ -> MicState <- MicAudioEnd;debugEcho "Mic audio end.")
        do mic.onError <- (fun s -> MicState <- MicError s; debugEcho (sprintf "Mic error : %s." s))
        do mic.onReady <- (fun _ -> MicState <- MicReady; debugEcho "Mic ready.")
        do mic.onResult <- (fun i e -> MicState <- MicResult(i,e);m mic (i,e))
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
        let main' (mic:Mic) (command:obj*obj) =
            let i, e = command
            info i
            info e
            match e with
            | Voice.Greetings g -> info g
            | _ -> error e
            
        let main (term:Terminal) (command:string)  =
            CUI <- { CUI with Term = term }
            do if CUI.Voice = None then initSpeech()
            do if CUI.Mic = None then initMic main' term 
            match command with
            | Text.DebugOn -> CUI <- { CUI with DebugMode = true }; say "Debug mode is now on."  
            | Text.DebugOff -> CUI <- { CUI with DebugMode = false }; say "Debug mode is now off." 
            | Text.QuickHello m 
            | Text.QuickHelp m 
            | Text.QuickPrograms m -> Meaning(m, None, None) |> updateCtx |> Main.update CUI
            | _->         
                async {
                    match! Server.GetMeaning command with
                    | Text.HelloUser u -> say (sprintf "This is the hello intent. The user name is %s." u.Value)
                    | _ -> term.Echo' "This is the whatever intent"             
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