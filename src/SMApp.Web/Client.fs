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
         
    (* CUI options*)

    let mutable currentVoice = ""
    let mutable currentVoiceURI = ""
    let mutable debugMode = false
    let mutable transcribe = false

    (* CUI context *)
    
    let context = new Stack<CUIContext>()

    (* Speech functions *)
    
    let initSpeech() =
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray
        for i = 0 to voices.Length - 1 do
            let v = voices.[i]
            if currentVoice = "" && (v.Name.Contains "Microsoft Zira" || v.Name.Contains "English Female") then
                currentVoice <- v.Name
                currentVoiceURI <- v.VoiceURI
        do if currentVoice = "" && voices.Length > 0 then
            let v = voices.[0] in
            currentVoice <- v.Name
            currentVoiceURI <- v.VoiceURI
            else if currentVoice = "" then error "No speech synthesis voice is available. You must install a speech synthesis voice on this device or computer to use Selma."

    let say text = 
        do if currentVoice <> "" && currentVoice <> "None" then
            async { 
                let u = new SpeechSynthesisUtterance(text)
                u.VoiceURI <- currentVoiceURI
                Window.SpeechSynthesis.Speak(u) 
            } |> Async.Start
            
    let sayVoices() =
        let voices = Window.SpeechSynthesis.GetVoices()
        sprintf "There are currently %i voices installed on this computer or device." voices.Length |> say
        for i = 0 to voices.Length do
            let v = voices.Item i
            sprintf "Voice 1: %s." v.Name |> say

    let sayRandom phrases = say <| getRandomPhrase phrases    
    let stopSpeaking = if Window.SpeechSynthesis.Speaking || Window.SpeechSynthesis.Pending then Window.SpeechSynthesis.Cancel()
    
    /// Main interpreter
    let Main = 
        let main (term:Terminal) (command:string)  =    
            do if currentVoice = "" then 
                initSpeech()
                sprintf "Using voice %s." currentVoice |> term.Echo'
            match command with
            | QuickHelp -> say "This is the quick help command"
            | QuickVoices -> say "This is the quick voices command."
            | DebugOn -> debugMode <- true; sprintf "Debug mode is now on." |> say 
            | DebugOff -> debugMode <- false; sprintf "Debug mode is now off." |> say 
            | QuickVoice1 -> say "Quick voice 1"
            | QuickVoice2 -> say "Quick voice 2"
            | Phrase -> 
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | HelloUser u -> term.Echo(sprintf "This is the hello intent. The user name is %s." u.Value)
                    | Hello _ -> sayRandom helloPhrases; (sprintf "%i" (Window.SpeechSynthesis.GetVoices().Length)) |> term.Echo
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