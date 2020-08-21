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
    let mutable debugMode = false
    
    /// Main interpreter
    let Main (term:Terminal) (command:string)  =    
        do Window.SpeechSynthesis.Speak(new SpeechSynthesisUtterance("hello 1 2 3 4"))
        match command with
        | Help -> term.Red "This is the help commnd"
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

    let Term() = 
        let baseOpt =
            Options(
                Name="_", 
                Greetings = "Welcome to Selma",
                OnInit = (fun (t:Terminal) -> t.Echo(sprintf "There are %i speech voices available." (Window.SpeechSynthesis.GetVoices().Length)); t.Push(Main, Options(Name="Main", Prompt=">")))
            )
        Terminal("#main", ThisAction<Terminal, string>(fun _ _ ->()), baseOpt) |> ignore
        Doc.Empty