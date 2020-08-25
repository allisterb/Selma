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

    let update (cui: CUI) (props: Dictionary<string, obj>) (msgs:Stack<string>) (context: Stack<Meaning>) =
        let (|PropSet|_|) (n:string) :Meaning list->Meaning list option =
            function
            | m when props.ContainsKey n -> Some m
            | _ -> None

        let (|PropNotSet|_|) (n:string) :Meaning list->Meaning list option =
            function
            | m when not (props.ContainsKey(n)) -> Some m
            | _ -> None
         
        let say t = 
            msgs.Push(t.ToString())
            cui.Say t

        let sayRandom p v  = 
            let t = cui.sayRandom p v
            msgs.Push(t.ToString())
         
        let b = if context.Count >= 5 then 5 else context.Count
        let pop n = for _ in 1..n do context.Pop() |> ignore
        
        debug <| sprintf "Current context: %A." context
        
        match context |> Seq.take b |> List.ofSeq with
        | PropNotSet "user" (Meaning(Intent "hello", None, None)::[]) -> 
            say <| sprintf "Hello. My name is Selma. What's yours?"
            
        | PropNotSet "user" (Meaning(Intent "hello", None, Some [Entity "contact" u])::[]) 
        | PropNotSet "user" (Meaning(_, _, Some [Entity "contact" u])::Meaning(Intent "hello", None, None)::[]) ->            
            pop 2
            async { 
                do sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser2 u with 
                | Some u -> 
                    props.Add("user", u)
                    say <| sprintf "Hello %s" u.Name
                | None _ -> say "Sorry I did not find that user."
            } |> Async.Start 
        | _ -> 
            context.Pop() |> ignore
            say "Sorry I didn't understand what you mean.t"