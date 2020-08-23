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
         
    (* CUI state and options *)

    let context = new Stack<CUIContext>()
    let mutable currentVoice:SpeechSynthesisVoice option = None
    let mutable currentTerm = Unchecked.defaultof<Terminal>
    let mutable debugMode = false
    let mutable echo = false
    
    (* Speech functions *)
    
    let initSpeech() =
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray
        do voices |> Array.iter(fun v-> 
            if currentVoice = None && (v.Name.Contains "Microsoft Zira" || v.Name.ToLower().Contains "female") then
                currentVoice <- Some v; info <| sprintf "Using voice %s." currentVoice.Value.Name
            )
        do if currentVoice = None && voices.Length > 0 then
            let v = voices |> Array.find (fun v -> v.Default) in 
            currentVoice <- Some v; info <| sprintf "Using default voice %s." currentVoice.Value.Name 
           else if currentVoice = None then 
            error "No speech synthesis voice is available."
            currentTerm.Echo' "No speech synthesis voice is available. Install speech synthesis on this device or computer to use the voice output feature of Selma."
        
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
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray        
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
        let main (term:Terminal) (command:string)  =
            currentTerm <- term
            do if currentVoice = None then initSpeech()
            match command with
            | QuickHello _ -> sayRandom helloPhrases;
            | QuickHelp -> 
                let mic = new Mic()
                do mic.onReady <- (fun _ -> term.Echo' "Ready.")
                do mic.onConnecting <- (fun _ -> term.Echo' "Connecting...")
                do mic.onDisconnected <- (fun _ -> term.Echo' "Disconnected.")
                do mic.onAudioStart <- (fun _ -> term.Echo' "Audio start...")
                do mic.onAudioEnd <- (fun _ -> term.Echo' "Audio end.")
                do mic.onError <- (fun s -> term.Echo' (sprintf "Error : %s." s))
                do mic.onResult <- 
                    (fun i e -> 
                        match e with
                        | Voice.Greetings g -> info g
                        | _ -> error e
                       
                    )
                mic.Connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT")
            | DebugOn -> debugMode <- true; say "Debug mode is now on."  
            | DebugOff -> debugMode <- false; say "Debug mode is now off." 
            | Programs -> 
                say "The following programs are available:"
                availablePrograms |> List.iteri (fun i p -> sprintf "%i. %s" i p |> say)
            | Phrase -> 
                do currentTerm.Echo'("please wait")
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | HelloUser u -> say (sprintf "This is the hello intent. The user name is %s." u.Value)
                    | _ -> term.Echo' "This is the whatever intent"             
                    do term.Enable()
                } |> Async.Start
        let mainOpt =
            Options(
                Name="Main", 
                Greetings = "Welcome to Selma. Type hello to begin or help for more assistance.",
                Prompt =">"
            )
        Interpreter(main, mainOpt)
    
    let Term() = 
        Terminal("#main", ThisAction<Terminal, string>(fun term command -> Main.Func term command), Main.Options) |> ignore
        context.Push(InterpreterCtx Main)
        Doc.Empty