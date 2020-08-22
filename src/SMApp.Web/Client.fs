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

[<JavaScript>]
module Client =
         
    (* CUI state and options *)

    let context = new Stack<CUIContext>()
    let mutable currentVoice = Unchecked.defaultof<SpeechSynthesisVoice>
    let mutable currentTerm = Unchecked.defaultof<Terminal>
    let mutable debugMode = false
    let mutable transcribe = false
    
    (* Speech functions *)
    
    let initSpeech() =
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray
        do voices |> Array.iter(fun v-> 
            if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> && (v.Name.Contains "Microsoft Zira" || v.Name.Contains "English Female") then
                currentVoice <- v; info <| sprintf "Using voice %s." currentVoice.Name
            )
        do if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> && voices.Length > 0 then
                let v = voices |> Array.find (fun v -> v.Default) in currentVoice <- v; info <| sprintf "Using voice %s." currentVoice.Name
                let u = new SpeechSynthesisUtterance(sprintf "Using the default speech synthesis voice.") in async { Window.SpeechSynthesis.Speak u } |> Async.Start
            else if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> then error "No speech synthesis voice is available. In order to use Selma you must install a speech synthesis voice on this device or computer."

    let say text =        
        async { 
            let u = new SpeechSynthesisUtterance(text)
            u.Voice <- currentVoice
            Window.SpeechSynthesis.Speak(u) 
        } |> Async.Start
        do if transcribe then currentTerm.Echo text
            
    let sayVoices() =
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray
        sprintf "There are currently %i voices installed on this computer or device." voices.Length |> say
        for i = 0 to voices.Length - 1 do
            let v = voices.[i]
            sprintf "Voice %i: Name: %s Local: %A." i v.Name v.LocalService |> say

    let sayRandom phrases = say <| getRandomPhrase phrases    
    
    let stopSpeaking = if Window.SpeechSynthesis.Speaking || Window.SpeechSynthesis.Pending then Window.SpeechSynthesis.Cancel()
    
    /// Main interpreter
    let Main = 
        let main (term:Terminal) (command:string)  =    
            do if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> then initSpeech()
            currentTerm <- term
            match command with
            | QuickHelp -> say "This is the quick help command"
            | QuickVoices -> sayVoices()
            | DebugOn -> debugMode <- true; say "Debug mode is now on."  
            | DebugOff -> debugMode <- false; say "Debug mode is now off." 
            | QuickVoice1 -> say "Quick voice 1"
            | QuickVoice2 -> say "Quick voice 2"
            | Phrase -> 
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | HelloUser u -> term.Echo(sprintf "This is the hello intent. The user name is %s." u.Value)
                    | Hello _ -> sayRandom helloPhrases;
                    | _ -> term.Echo "This is the whatever intent"
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