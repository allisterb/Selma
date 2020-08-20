namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open SMApp.JQueryTerminal

[<JavaScript>]
module Client =

    let (|Welcome|Help|Switch|Other|) =
          function
          | "help" -> Help
          | "welcome" -> Welcome
          | "switch" -> Switch
          | _ -> Other

    let i2 (this:Terminal) (command:string)   = 
            match command with
            | Help -> this.Echo("Commands: help, clear, template")
            | Switch -> this.Echo "switch"
            | _ -> this.Echo "Unknown"

    let baseOpt =
        Options(
            Name="_Base", 
            Greetings = "Welcome to Selma",
            OnInit = (fun (t:Terminal) -> t.Push(i2, Options(Name="Main", Prompt=">")))
        )

    let baseInt =
        FuncWithThis<Terminal, string->unit>(fun this command->())

    let Term() = 
        Terminal("#main", baseInt, baseOpt) |> ignore
        Doc.Empty

