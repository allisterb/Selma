namespace SMApp.Web

open System.Collections.Generic

open WebSharper

[<JavaScript>]
module Main =
    
    let debug m = sprintf "Main: %A" m |> ClientExtensions.debug
    
    let (|Intent|_|) n = 
        function
        | Some(Intent (i, _)) when i = n -> Some ()
        | _ -> None
        
    let (|Entity|_|) (n:string) :Entity->string option = 
        function
        | entity when entity.Name = n -> Some entity.Value
        | _ -> None

    let update (cui: CUI) (context: Stack<Meaning>) =
        let say = cui.Say
        let b = if context.Count >= 5 then 5 else context.Count
        let pop n = for _ in 1..n do context.Pop() |> ignore
        debug <| sprintf "Current context: %A." context
        match context |> Seq.take b |> List.ofSeq with
        | Meaning(Intent "hello", None, None)::[] -> 
            cui.Say <| sprintf "Hello. My name is Selma. What's yours?"
            
        | Meaning(Intent "hello", None, Some [Entity "contact" u])::[] 
        | Meaning(_, _, Some [Entity "contact" u])::Meaning(Intent "hello", None, None)::[] ->            
            pop 2
            async { 
                do cui.sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser2 u with 
                | Some u -> say <| sprintf "Hello %s" u.Name
                | None _ -> say "Sorry I did not find that user."
            } |> Async.Start 
        | _ -> ()