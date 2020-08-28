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
        let addProp k v = props.Add(k, v)
        let deleteProp k = props.Remove k |> ignore
      
        let haveUser() = haveProp "user"

        let say' t = cui.Say t
        
        let say t =
            responses.Push t
            say' t

        let sayRandom p v  = 
            let t = getRandomPhrase p v
            responses.Push(t) |> ignore
            cui.Say t
        
        let pop n = for _ in 1..n do context.Pop() |> ignore
        let popc() = context.Pop() |> ignore
        let popq() = questions.Pop() |> ignore
        let pushq (r:string) = 
            match getQuestion r with
            | Some q -> questions.Push q
            | None -> failwithf "No such question: %s" r

        let question r =
            pushq r; 
            debug <| sprintf "Added question: %A." (questions.Peek())
            
        let (|PropSet|_|) (n:string) :Meaning -> Meaning option =
            function
            | m when haveProp n -> Some m
            | _ -> None

        let (|PropNotSet|_|) (n:string) :Meaning -> Meaning option =
            function
            | m when not (haveProp n) -> Some m
            | _ -> None
         
        let (|AnonUser|_|) :Meaning -> Meaning option = //(Intent option * Trait option * Entity list option) option =
            function
            | PropNotSet "user" m -> m |> Some 
            | _ -> None

        let (|User|_|) :Meaning -> Meaning option = //(Intent option * Trait option * Entity list option) option =
            function
            | PropSet "user" m -> m |> Some 
            | _ -> None

        let (|Assert|_|) :Meaning -> Meaning option  =
            function
            | m when questions.Count = 0 -> 
                popc()
                Some m
            | _ -> None

        let (|Response|_|) (n:string) :Meaning -> Meaning option  =
            function
            | m when haveQuestion n && questions.Count > 0  && questions.Peek().Name = n -> 
                popq()
                Some m
            | _ -> None

        let ask q = 
            question <| q
            let _q = getQuestion q in say <| _q.Value.Text

        let ask' q v =
            addProp q v
            question <| q
            let _q = getQuestion q in say _q.Value.Text

        let loginUser u = 
            async { 
                do sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser2 u with 
                | Some u -> 
                    props.Add("user", u)
                    sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
                | None _ -> 
                    say <| sprintf "Sorry I did not find the user name %s." u
                    ask' "addUser" u
            } |> Async.Start

        (* Interpreter logic begins here *)
        match context |> Seq.take (if context.Count >= 5 then 5 else context.Count) |> List.ofSeq with
        
        (* Hello *)
        | AnonUser(Assert(Intent "hello" (None, None)))::[] -> sayRandom helloPhrases ""
            
        (* User login *)
        | AnonUser(Assert(Intent "hello" (None, Some [Entity "contact" u])))::[] -> loginUser u
        | AnonUser(Meaning(None, None, Some [Entity "contact" u]))::[] -> loginUser u
            
        (* User add *)
        | User(Response "addUser" Yes)::[] -> say <| sprintf "Added user %A." props.["addUser"]; deleteProp "addUser" |> ignore
        | User(Response "addUser" No)::[] -> say <| "did not add user"; deleteProp "addUser" |> ignore
        //| (Response "addUser" (User(Yes(_))))::[] -> say <| sprintf "Added user %A." props.["addUser"]; deleteProp "addUser" |> ignore
        //| (Response "addUser" (User(No(_))))::[] -> say <| sprintf "Not adding user."; deleteProp "addUser"

        (* User switch *)
        //| Assert(User(IntentName "hello", None, Some [Entity "contact" u]))::[] -> ask' "switchUser" u
        //| (Response "switchUser" (User(Yes(_))))::[] -> say  <| sprintf "Switch user to %A." props.["switchUser"]; deleteProp "switchUser" |> ignore
        //| (Response "switchUser" (User(No(_))))::[] -> deleteProp "switchUser" 

        | _ -> 
            pop 1 |> ignore
            say "Sorry I didn't understand what you meant."
            if questions.Count > 0 then let q = questions.Peek() in q.Text |> say