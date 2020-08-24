namespace SMApp.Web

open WebSharper
[<JavaScript>]
module Main =
    let update (cui: CUI) (context: Meaning list) =
        cui.Debug <| sprintf "Main update ctx: %A." context
        match context with
        | Meaning(Intent("hello", _) , None, None)::[] -> cui.Say <| sprintf "Hello. My name is Selma. What's yours?" 
        | Meaning(Intent("hello", _), None, Some [u])::[] -> cui.Say <| sprintf "Hello %s" u.Name
        | _ -> ()

