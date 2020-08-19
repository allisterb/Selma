namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open SMApp.JQueryTerminal

[<JavaScript>]
module Client =

    
    let Main () =
        let rvInput = Var.Create ""
        let submit = Submitter.CreateOption rvInput.View
        let vReversed =
            submit.View.MapAsync(function
                | None -> async { return "" }
                | Some input -> Server.DoSomething input
            )
        div [] [
          
            Doc.Input [] rvInput
            Doc.Button "Send" [] submit.Trigger
            hr [] []
            h4 [attr.``class`` "text-muted"] [text "The server responded:"]
            div [attr.``class`` "jumbotron"] [h1 [] [textView vReversed]]
        ]


    let (|Welcome|Help|Switch|Other|) =
          function
          | "help" -> Help
          | "welcome" -> Welcome
          | "switch" -> Switch
          | _ -> Other



    let i2 (this:Terminal) (command:string) = 
            match command with
            | Switch -> this.Pop()
            | _ -> this.Pop()
            
        
    
    let Opt =
        Options(
            Name = "Terminal1",
            Prompt = ">> ",
            Greetings = "Welcome to the Terminal Test Page! See 'help' for the list of commands.",
            OnInit = (fun (t:Terminal) -> t.Enable(); t.Echo("Hey Dood, it's workin'!"))
        )

    let interpreter =
        ThisAction<Terminal, string>(fun this command ->
            match command with
            | Help -> this.Echo "Commands: help, clear, template"
            | Switch -> 
                this.Push(fun (this:Terminal) (command:string) -> 
                    match command with
                    | Switch -> this.Pop()
                    | _ -> this.Pop()
                ,InterpreterOptions())
            | _ -> this.Echo "Com"
        )

    let Term() = 
        Terminal("#main", interpreter, Opt) |> ignore
        Doc.Empty

