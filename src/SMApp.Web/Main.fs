namespace SMApp.Web

open System.Collections.Generic

open WebSharper

[<JavaScript>]
module Main =
    
    let debug m = sprintf "Main: %A" m |> ClientExtensions.debug
    
    let history = new Stack<Meaning>()

    let (|Intent|_|) n = 
        function
        | Some(Intent (i, _)) when i = n -> Some ()
        | _ -> None
        
    let (|Entity|_|) (n:string) :Entity->string option = 
        function
        | entity when entity.Name = n -> Some entity.Value
        | _ -> None

    let update (cui: CUI) (props: Dictionary<string, obj>) (msgs:Stack<string>) (context: Stack<Meaning>) =
        
        let hasProp k = props.ContainsKey k
        
        let (|PropSet|_|) (n:string) :Meaning list->Meaning list option =
            function
            | m when hasProp n -> Some m
            | _ -> None

        let (|PropNotSet|_|) (n:string) :Meaning list->Meaning list option =
            function
            | m when not (hasProp n) -> Some m
            | _ -> None
         
        let (|AnonUser|_|) :Meaning -> (Intent option * Trait option * Entity list option) option =
            function
            | m when not(hasProp "user") -> m.Unwrap() |> Some 
            | _ -> None

        let (|User|_|) :Meaning -> (Intent option * Trait option * Entity list option) option =
            function
            | m when hasProp "user" -> m.Unwrap() |> Some 
            | _ -> None

        let say t = 
            msgs.Push(t.ToString())
            cui.Say t

        let sayRandom p v  = 
            let t = getRandomPhrase p v
            msgs.Push(t) |> ignore
            cui.Say t
        
        let sayRandom' p = sayRandom p ""

        let getUser u = 
            async { 
                do sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser2 u with 
                | Some u -> 
                    props.Add("user", u)
                    sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
                | None _ -> say <| sprintf "Sorry I did not find the user name %s." u
            } |> Async.Start 

        let b = if context.Count >= 5 then 5 else context.Count
        
        let pop n = for _ in 1..n do context.Pop() |> ignore
        
        debug <| sprintf "Current context: %A." context

        (* Interpreter logic begins here *)
        match context |> Seq.take b |> List.ofSeq with
        | AnonUser(Intent "hello", None, None)::[] -> 
            sayRandom' helloPhrases
        
        | User(Intent "hello", None, None)::[] -> 
            sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
            pop 1
            
        | AnonUser(Intent "hello", None, Some [Entity "contact" u])::[] ->
            getUser u
            pop 1

        | AnonUser (None, None, Some [Entity "contact" u])::AnonUser(Intent "hello", None, None)::[] ->
            getUser u
            pop  2

        | AnonUser (Intent "hello", None, Some [Entity "contact" u])::AnonUser(Intent "hello", None, None)::[] ->            
            getUser u
            pop  2

        | _ -> 
            pop 1 |> ignore
            say "Sorry I didn't understand what you meant."