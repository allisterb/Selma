namespace SMApp.Web

open FSharp.Control

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html

open SMApp.JQueryTerminal

[<JavaScript>]
module Client =
    let mutable debugMode = false
    
    /// Main interpreter
    let Main (term:Terminal) (command:string)  = 
        /// Local commands
        let (|Help|DebugOn|NonLocal|) =
            function
            | "help" -> Help
            | "debug on" -> DebugOn
            | _ -> NonLocal 
    
        let (|Hello|_|) :Meaning -> Entity list option =
            function
            | m when m.TopIntent.Name = "Hello" && m.TopIntent.Confidence > 0.8f  -> m.Entities |> List.where(fun e -> e.Confidence > 0.8f) |> Some
            | _ -> None
            
        match command with
        | Help -> term.Echo "This is the help commnd"
        | DebugOn -> term.Echo("Debug mode set."); debugMode <- true
        | NonLocal -> 
            do term.Disable()
            async {
                match! Server.GetMeaning command with
                | Some(Hello(e::[])) when e.Role = "contact" -> term.Echo(sprintf "This is the hello intent. The user name is %s." e.Role)
                | Some(Hello(_)) -> term.Echo("This is the hello intent but I don't know who the user is.")
                | _ -> term.Echo "This is the whatever intent"
                do term.Enable()
            } |> Async.Start 

    let baseOpt =
        Options(
            Name="_", 
            Greetings = "Welcome to Selma",
            OnInit = (fun (t:Terminal) -> t.Push(Main, Options(Name="Main", Prompt=">")))
        )

    let Term() = 
        Terminal("#main", ThisAction<Terminal, string>(fun _ _ ->()), baseOpt) |> ignore
        Doc.Empty

