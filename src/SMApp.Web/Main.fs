namespace SMApp.Web

open System.Collections.Generic

open WebSharper

[<JavaScript>]
module Main =
    let debug m = sprintf "Main: %A" m |> ClientExtensions.debug
    
    let update (cui: CUI) (props: Dictionary<string, obj>) (questions:Stack<Question>) (responses:Stack<string>) (context: Stack<Meaning>) =
        
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

        let (|Question|_|) :(Intent option * Trait option * Entity list option) -> (Intent option * Trait option * Entity list option) option  =
            let matchp m = match questions.Peek() with | Question(m', _) when m = m' -> true | _ -> false
            function
            | m when questions.Count > 0 && matchp(Meaning(m)) ->  Some m
            | _ -> None

        let say' t = cui.Say t
        
        let say t =
            responses.Push t
            say' t

        let sayRandom p v  = 
            let t = getRandomPhrase p v
            responses.Push(t) |> ignore
            cui.Say t
        
        let sayRandom' p = sayRandom p ""

        let getUser u = 
            async { 
                do sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser2 u with 
                | Some u -> 
                    if hasProp "user" then props.["user"] <- u else props.Add("user", u)
                    sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
                | None _ -> say <| sprintf "Sorry I did not find the user name %s." u
            } |> Async.Start 

        let b = if context.Count >= 5 then 5 else context.Count
        
        let pop n = for _ in 1..n do context.Pop() |> ignore
        
        let popq() = questions.Pop() |> ignore

        let push' (q:Meaning list) (r:string) = questions.Push(Question(q.Head, r))

        let question q r =
            push' q r; say r
            debug <| sprintf "Added question: %A." (questions.Peek())

        debug <| sprintf "Current context: %A." context
        debug <| sprintf "Previous questions: %A." questions

        (* Interpreter logic begins here *)
        match context |> Seq.take b |> List.ofSeq with
        
        (* Hello *)
        | AnonUser(Intent "hello", None, None)::[] ->
            sayRandom' helloPhrases

        | User(Intent "hello", None, None)::[] ->
            sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
            pop 1

        (* User login *)                    
        | AnonUser(Intent "hello", None, Some [Entity "contact" u])::_ ->
            getUser u
            pop 1

        | AnonUser (None, None, Some [Entity "contact" u])::AnonUser(Intent "hello", None, None)::[] ->
            getUser u
            pop  2

        | AnonUser (Intent "hello", None, Some [Entity "contact" u])::AnonUser(Intent "hello", None, None)::[] ->            
            getUser u
            pop  2

        (* User switch *)
        | User(Intent "hello", None, Some [Entity "contact" _])::[] as q ->
            question q "Are you sure you want to switch users?"
            
        | User(Intent "yes", None, None)::User(Question(Intent "hello", None, Some [Entity "contact" u]))::[] ->
            getUser u
            pop 2
            popq()

        | User(Intent "no", None, None)::User(Question(Intent "hello", None, Some [Entity "contact" _]))::[] ->
            pop 2
            popq()

        | _ -> 
            pop 1 |> ignore
            say "Sorry I didn't understand what you meant."
            if questions.Count > 0 then let q = questions.Peek() in q.Response |> say