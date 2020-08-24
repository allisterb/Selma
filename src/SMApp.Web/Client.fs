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
    
    (* CUI state *)
    let mutable currentVoice:SpeechSynthesisVoice option = None
    let mutable currentMic: Mic option = None
    let mutable currentMicState: MicState = NotInitialized
    let mutable currentTerm = Unchecked.defaultof<Terminal>
    let mutable currentInterpreter = Unchecked.defaultof<Interpreter>
    let mutable debugMode = false
    let mutable caption = false
    
    let state () = {
        Voice = currentVoice
        Mic = currentMic
        MicState = currentMicState
        Term = currentTerm
        Debug = debugMode
        Caption = caption
    }

    (* NLU context *)
    let mutable context: NLUContext list = []

    let update (m:Meaning) =
        context <- ([NLUContext m] @ context)
        let b = if context.Length >= 5 then 5 else context.Length
        context |> List.take b

    let echo = currentTerm.EchoHtml'

    let debugEcho s = if debugMode then currentTerm.EchoHtml' s

    let initSpeech() =
        let voices' = Window.SpeechSynthesis.GetVoices()
        do if not(isNull(voices')) then
            let voices = voices' |> toArray
            do voices |> Array.iter(fun v-> 
                if currentVoice = None && (v.Name.Contains "Microsoft Zira" || v.Name.ToLower().Contains "female") then
                    currentVoice <- Some v; info <| sprintf "Using voice %s." currentVoice.Value.Name
                )
            do if currentVoice = None && voices.Length > 0 then
                let v = voices |> Array.find (fun v -> v.Default) in 
                currentVoice <- Some v; info <| sprintf "Using default voice %s." currentVoice.Value.Name 
        if currentVoice = None then 
            error "No speech synthesis voice is available."
            currentTerm.Echo' "No speech synthesis voice is available. Install speech synthesis on this device or computer to use the voice output feature of Selma."
        
    let initMic m (term:Terminal) =
        currentMic <- Some(new Mic())
        let mic = currentMic.Value
        do mic.onConnecting <- (fun _ -> currentMicState<- Connecting; debugEcho "Mic connecting...")
        do mic.onDisconnected <- (fun _ -> debugEcho "Mic disconnected.")
        do mic.onAudioStart <- (fun _ -> debugEcho "Mic audio start...")
        do mic.onAudioEnd <- (fun _ -> debugEcho "Mic audio end.")
        do mic.onError <- (fun s -> debugEcho (sprintf "Mic error : %s." s))
        do mic.onReady <- (fun _ -> debugEcho "Mic ready.")
        do mic.onResult <- (fun i e -> m mic (i,e))
        do mic.Connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT")

    let say text =        
        match currentVoice with
        | None -> currentTerm.Echo' text
        | Some v ->
            async { 
                let u = new SpeechSynthesisUtterance(text)
                u.Voice <- v
                Window.SpeechSynthesis.Speak(u) 
            } |> Async.Start
            do if caption then currentTerm.Echo' text
            
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
            currentTerm.Echo'("please wait")
            currentTerm.Disable();f();currentTerm.Enable()

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
            currentTerm <- term
            do if currentVoice = None then initSpeech()
            do if currentMic = None then initMic main' term 
            match command with
            | Text.DebugOn -> debugMode <- true; say "Debug mode is now on."  
            | Text.DebugOff -> debugMode <- false; say "Debug mode is now off." 
            | Text.QuickHello m 
            | Text.QuickHelp m ->
                JQuery.JQuery.Of("$microphone").Hide() |> ignore
                Meaning(m, None, None) |> update |> Main.update (state())
                JQuery.JQuery.Of("#microphone").Show() |> ignore
                sayRandom helloPhrases;
            | _-> 
                currentTerm.Echo'("please wait")
                async {
                    match! Server.GetMeaning command with
                    | Text.HelloUser u -> say (sprintf "This is the hello intent. The user name is %s." u.Value)
                    | _ -> term.Echo' "This is the whatever intent"             
                } |> Async.Start
            
        let mainOpt =
            Options(
                Name="Main", 
                Greetings = "Welcome to Selma. Type hello to begin or help for more assistance.",
                Prompt =">"
            )
              
        Interpreter(main', (main, mainOpt))
    
    let CUI() =
        Terminal("#main", ThisAction<Terminal, string>(fun term command -> Main.Text term command), Main.Options) |> ignore 
        Doc.Empty