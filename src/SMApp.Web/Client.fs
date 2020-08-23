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
    let context = new Stack<NLUContext>() // NLU context

    (* CUI state *)

    let mutable currentVoice:SpeechSynthesisVoice option = None
    let mutable currentMic: Mic option = None
    let mutable currentTerm = Unchecked.defaultof<Terminal>
    let mutable currentInterpreter = Unchecked.defaultof<Interpreter>
    let mutable debugMode = false
    let mutable echo = false
    
    (* Speech functions *)
    
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
        
    let initMic m =
        currentMic <- Some(new Mic())
        let mic = currentMic.Value
        let term = currentTerm
        do mic.onConnecting <- (fun _ -> term.Echo' "Mic connecting...")
        do mic.onDisconnected <- (fun _ -> term.Echo' "Mic disconnected.")
        do mic.onAudioStart <- (fun _ -> term.Echo' "Mic audio start...")
        do mic.onAudioEnd <- (fun _ -> term.Echo' "Mic audio end.")
        do mic.onError <- (fun s -> term.Echo' (sprintf "Mic error : %s." s))
        do mic.onResult <- (fun i e -> m mic (i,e))
        do mic.onReady <- (fun _ -> term.Echo' "Mic ready.")
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
            do if echo then currentTerm.Echo' text
            
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
            do if currentMic = None then initMic main' 
            match command with
            | Text.QuickHello _ -> sayRandom helloPhrases;
            | Text.QuickHelp -> say "Quick help"
            | Text.DebugOn -> debugMode <- true; say "Debug mode is now on."  
            | Text.DebugOff -> debugMode <- false; say "Debug mode is now off." 
            | Text.Programs -> 
                say "The following programs are available:"
                //availablePrograms |> List.iteri (fun i p -> sprintf "%i. %s" i p |> say)
            | Text.Phrase -> 
                do currentTerm.Echo'("please wait")
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | Text.HelloUser u -> say (sprintf "This is the hello intent. The user name is %s." u.Value)
                    | _ -> term.Echo' "This is the whatever intent"             
                    do term.Enable()
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