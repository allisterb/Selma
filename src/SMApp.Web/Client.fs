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
    
    let context = new Stack<CUIContext>()

    (* Options for the CUI session.*)
    let mutable debugMode = false
    let mutable transcribe = false

    let speak text = async { Window.SpeechSynthesis.Speak(new SpeechSynthesisUtterance(text)) } |> Async.Start
    let speakRandomPhrase phrases = speak <| CUI.getRandomPhrase phrases    
    /// Main interpreter
    let Main = 
        let main (term:Terminal) (command:string)  =    
            match command with
            | Help -> term.Echo' "This is the help commnd"
            | DebugOn -> debugMode <- true; sprintf "Debug mode is now %A." debugMode |> term.Echo' 
            | DebugOff -> debugMode <- false; sprintf "Debug mode is now %A." debugMode |> term.Echo' 
            | NonLocal -> 
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | HelloUser u -> term.Echo(sprintf "This is the hello intent. The user name is %s." u.Value)
                    | Hello _ -> speakRandomPhrase helloPhrases //term.Echo("This is the hello intent but I don't know who the user is.")
                    | _ -> term.Echo "This is the whatever intent"
                    do term.Enable()
                } |> Async.Start
        let mainOpt =
            Options(
                Name="Main", 
                Greetings = "Welcome to Selma. Type hello to begin or help.",
                Prompt =">"
            )
        Interpreter(main, mainOpt)
    
    let Term() = 
        Terminal("#main", ThisAction<Terminal, string>(fun term command -> Main.Func term command), Main.Options) |> ignore
        context.Push(InterpreterCtx Main)
        Doc.Empty