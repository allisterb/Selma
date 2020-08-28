namespace SMApp.Web

open System.Collections.Generic

open WebSharper

[<JavaScript>]
module Main =
    let debug m = ClientExtensions.debug "Main" m
    
    let questions = [ 
        Question("addUser", "Do you want me to add the user $0?")
        Question("switchUser", "Do you want me to switch to the user $0?")
    ]  
    let getQuestion n = questions |> List.tryFind(fun q -> q.Name = n)
    let haveQuestion n = questions |> List.exists(fun q -> q.Name = n)

    let update (cui: CUI) (props: Dictionary<string, obj>) (questions:Stack<Question>) (responses:Stack<string>) (context: Stack<Meaning>) =        
        debug <| sprintf "Current context: %A." context
        debug <| sprintf "Current questions: %A." questions

        let haveProp k = props.ContainsKey k
        let getProp k = if props.ContainsKey k then Some(props.[k]) else None
        let addProp k v = props.Add(k, v)
        let deleteProp k = props.Remove(k)

        let haveUser() = haveProp "user"

        let say' t = cui.Say t
        
        let say t =
            responses.Push t
            say' t

        let sayRandom p v  = 
            let t = getRandomPhrase p v
            responses.Push(t) |> ignore
            cui.Say t
        
        let sayRandom' p = sayRandom p ""

        let b = if context.Count >= 5 then 5 else context.Count
        
        let pop n = for _ in 1..n do context.Pop() |> ignore
        
        let popq() = questions.Pop() |> ignore

        let push' (r:string) = 
            match getQuestion r with
            | Some q -> questions.Push q
            | None -> failwithf "No such question: %s" r

        let question r =
            push' r; 
            debug <| sprintf "Added question: %A." (questions.Peek())

        let (|PropSet|_|) (n:string) :Meaning list->Meaning list option =
            function
            | m when haveProp n -> Some m
            | _ -> None

        let (|PropNotSet|_|) (n:string) :Meaning list->Meaning list option =
            function
            | m when not (haveProp n) -> Some m
            | _ -> None
         
        let (|AnonUser|_|) :Meaning -> (Intent option * Trait option * Entity list option) option =
            function
            | m when not(haveProp "user") -> m.Unwrap() |> Some 
            | _ -> None

        let (|User|_|) :Meaning -> (Intent option * Trait option * Entity list option) option =
            function
            | m when haveProp "user" -> m.Unwrap() |> Some 
            | _ -> None

        let (|Assert|_|) :Meaning->Meaning option  =
            function
            | m when questions.Count = 0 -> 
                pop 1
                Some m
            | _ -> None

        let (|Response|_|) (n:string) :Meaning->Meaning option  =
            function
            | m when questions.Count > 0 && haveQuestion n && questions.Peek().Name = n -> 
                do popq()
                Some m
            | _ -> None

        let askAddUser u = 
            props.Add("addUser", u)
            question <| "addUser"

        let askSwitchUser u = 
            props.Add("switchUser", u)
            question <| "switchUser"

        let getUser u = 
            async { 
                do sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser2 u with 
                | Some u -> 
                    if props.ContainsKey "user" then props.["user"] <- u else props.Add("user", u)
                    sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
                | None _ -> 
                    say <| sprintf "Sorry I did not find the user name %s." u
                    if not(haveUser()) then askAddUser u
            } |> Async.Start

        (* Interpreter logic begins here *)
        match context |> Seq.take b |> List.ofSeq with
        
        (* Hello *)
        | AnonUser(Intent "hello", None, None)::[] ->
            sayRandom' helloPhrases
        | Assert(AnonUser(Intent "hello", None, None))::AnonUser(Intent "hello", None, None)::[] ->
            say "Tell me your name so we can get started."
            
        (* User login *)                    
        | Assert(AnonUser(Intent "hello", None, Some [Entity "contact" u]))::[] -> getUser u
            
        | Assert(AnonUser (None, None, Some [Entity "contact" u]))::Assert(AnonUser(Intent "hello", None, None))::[] 
        | Assert(AnonUser (Intent "hello", None, Some [Entity "contact" u]))::Assert(AnonUser(Intent "hello", None, None))::[] -> getUser u
            
        (* User add *)
        | (Response "addUser" (User(Yes)))::[] -> say <| sprintf "Added user %A." props.["addUser"]; deleteProp "addUser" |> ignore
        | (Response "addUser" (User(No)))::[] -> say <| sprintf "Not adding user."; deleteProp "addUser" |> ignore

        (* User switch *)
        | Assert(User(Intent "hello", None, Some [Entity "contact" u]))::[] -> askSwitchUser u
        | (Response "switchUser" (User(Yes)))::[] -> say  <| sprintf "Switch user to %A." props.["switchUser"]; deleteProp "switchUser" |> ignore
        | (Response "switchUser" (User(No)))::[] -> deleteProp "switchUser" |> ignore

        | _ -> 
            pop 1 |> ignore
            say "Sorry I didn't understand what you meant."
            if questions.Count > 0 then let q = questions.Peek() in q.Text |> say