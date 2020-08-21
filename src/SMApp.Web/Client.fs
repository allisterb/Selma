namespace SMApp.Web

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
    let speak text = Window.SpeechSynthesis.Speak(new SpeechSynthesisUtterance(text))
    
    let mutable debugMode = false
    
    /// Main interpreter
    let Main = 
        let main (term:Terminal) (command:string)  =    
            match command with
            | Help -> term.Echo "This is the help commnd"
            | DebugOn -> debugMode <- true; sprintf "Debug mode is now %A." debugMode |> term.Echo 
            | DebugOff -> debugMode <- false; sprintf "Debug mode is now %A." debugMode |> term.Echo 
            | NonLocal -> 
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | HelloUser u -> term.Echo(sprintf "This is the hello intent. The user name is %s." u.Value)
                    | Hello _ -> term.Echo("This is the hello intent but I don't know who the user is.")
                    | _ -> term.Echo "This is the whatever intent"
                    do term.Enable()
                } |> Async.Start
        Interpreter(main, Options(Name="Main", Prompt=">"))
    
    let Term() = 
        let _Opt =
            Options(
                Name="_", 
                Greetings = "Welcome to Selma",
                OnInit = (fun (t:Terminal) -> do speak "Welcome to Selma 1 2 3 4."; t.Push(Main))
            )
        Terminal("#main", ThisAction<Terminal, string>(fun _ _ ->()), _Opt) |> ignore
        Doc.Empty