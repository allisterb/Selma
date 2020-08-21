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

    let Main (term:Terminal) (command:string)  = 
        let (|Help|_|) =
            function
            | "help" -> Some "This is the help function"
            | _ -> None 
    
        let (|Hello|_|) :Meaning -> Entity list option =
            function
            | m when m.TopIntent.Name = "Hello" && m.TopIntent.Confidence > 0.8f -> m.Entities |> Some
            | _ -> None
            
        match command with
        | Help h -> term.Echo h
        | _ -> 
            async {
                do term.Disable()
                match! Server.GetMeaning command with
                | Some(Hello e) -> term.Echo "This is the hello intent"
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

