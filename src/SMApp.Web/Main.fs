namespace SMApp.Web

open WebSharper

[<JavaScript>]
module Main =
    
    let debug m = sprintf "Main: %A" m |> ClientExtensions.debug
    
    let update (cui: CUI) (context: Meaning list) =
        debug <| sprintf "Current context: %A." context
        match context with
        | Meaning(Some(Intent("hello", _)) , None, None)::[] -> cui.Say <| sprintf "Hello. My name is Selma. What's yours?" 
        | Meaning(Some(Intent("hello", _)), None, Some [u])::[] -> cui.Say <| sprintf "Hello %s" u.Name
        | _ -> ()

