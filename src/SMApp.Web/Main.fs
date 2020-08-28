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
        debug <| sprintf "Begin context: %A." context
        debug <| sprintf "Begin questions: %A." questions
     
        let haveProp k = props.ContainsKey k
        let addProp k v = props.Add(k, v)
        let deleteProp k = props.Remove k |> ignore

        let haveUser() = haveProp "user"

        let popc() = context.Pop() |> ignore
        let popq() = questions.Pop() |> ignore
        let pushq (n:string) = 
            match getQuestion n with
            | Some q -> questions.Push q
            | None -> failwithf "No such question: %s" n

        let say' t = cui.Say t
        
        let say t =
            responses.Push t
            say' t

        let sayRandom p v  = 
            let t = getRandomPhrase p v
            responses.Push(t) |> ignore
            cui.Say t
        
        let ask q v =
            addProp q v
            pushq q; 
            debug <| sprintf "Added question: %A." (questions.Peek()) 
            let _q = getQuestion q in say <| replace_tok "$0" v _q.Value.Text
            
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

        let (|Assert|_|) :Meaning -> Meaning option =
            function
            | m when questions.Count = 0 -> 
                popc()
                Some m
            | _ -> None

        let (|Response|_|) (n:string) :Meaning -> Meaning option =
            function
            | m when haveQuestion n && questions.Count > 0  && questions.Peek().Name = n -> 
                popc()
                popq()
                Some m
            | _ -> None

        let loginUser u = 
            async { 
                do sayRandom waitRetrievePhrases "user name"
                match! Server.GetUser u with 
                | Some u -> 
                    props.Add("user", u)
                    sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
                | None _ -> 
                    say <| sprintf "Sorry I did not find the user name %s." u
                    ask "addUser" u
            } |> Async.Start

        (* Interpreter logic begins here *)
        match context |> Seq.take (if context.Count >= 5 then 5 else context.Count) |> List.ofSeq with
        
        (* Hello *)
        | AnonUser(Assert(Intent "hello" (None, None)))::[] -> 
            if not(haveProp "started") then 
                props.Add("started", true)
                sayRandom helloPhrases ""
            else
                say "Hello, tell me your user name to get started."

        (* User login *)
        | AnonUser(Assert(Intent "hello" (None, Some [Entity "contact" u])))::[]  
        | AnonUser(Meaning(None, None, Some [Entity "contact" u]))::[] -> 
            if not(haveProp "started") then 
                props.Add("started", true)
                say "Hello I'm Selma."
            loginUser u
            
        (* User add *)
        | User(Assert(Intent "hello" (None, Some [Entity "contact" u])))::[] 
        | User(Meaning(None, None, Some [Entity "contact" u]))::[] -> ask "addUser" (props.["user"] :?> string)
        | User(Yes(Response "addUser" _))::[] -> 
            say <| sprintf "Added user %A." props.["addUser"]; 
            deleteProp "addUser" 
        | User(No(Response "addUser" _))::[] -> 
            say <| "did not add user"; 
            deleteProp "addUser"

        | m -> 
            debug <| sprintf "Did not understand %A." m
            popc()
            say "Sorry I didn't understand what you meant."
            if questions.Count > 0 then let q = Seq.item 0 questions in q.Text |> say

        debug <| sprintf "End context: %A." context
        debug <| sprintf "End questions: %A." questions