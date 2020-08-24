namespace SMApp.Web

open WebSharper
[<JavaScript>]
module Main =
    let update (cui: CUI) (context: Meaning list) =
        cui.Debug <| sprintf "Main update ctx: %A." context
        match context with
        | Meaning(Program, None, None) ::_ -> 
            async { 
                let! p = Server.GetPatients()
                match p with
                | Ok r -> cui.Debug <| sprintf "Got %i patients." r.Length
                | Error s -> cui.Debug <| sprintf "Error %s" s
            } |> cui.Wait 
        | Meaning(Hello, None, None)::[] -> cui.Say <| sprintf "Hello. My name is Selma. What's yours?" 
        | Meaning(Hello, None, Some [User(user)])::[] -> cui.Say <| sprintf "Hello %s" user
        | _ -> ()

