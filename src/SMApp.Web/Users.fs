namespace SMApp.Web.Prototype

open System.Collections.Generic

open SMApp.Models

//open SMApp.Web.ClientExtensions
open SMApp.Web.CUI
open SMApp.Web.NLU
open SMApp.Web
open WebSharper

[<JavaScript>]
module Users =
    let debug m = ClientExtensions.debug "Users" m
    
    let questions = [ 
        Question("addUser", "Do you want me to add the user $0?")
        Question("switchUser", "Do you want me to switch to the user $0?")
    ]
    let getQuestion n = questions |> List.tryFind(fun q -> q.Name = n)
    let haveQuestion n = questions |> List.exists(fun q -> q.Name = n)

    let update(d: Dialogue) = 
        debug <| sprintf "Starting utterances:%A. Starting responses: %A." d.Utterances d.Responses 
        let haveProp = d.HaveProp
        let addProp = d.AddProp
        let deleteProp k = d.Props.Remove k |> ignore
        let strProp k = d.Props.[k] :?> string
        let userProp() = d.Props.["user"] :?> User
        
        let popu() = d.PopUtterance() |> ignore
        let popq() = d.PopQuestion() |> ignore
        let pushq (n:string) = 
            match getQuestion n with
            | Some q -> d.PushQuestion q
            | None -> failwithf "No such question: %s" n
        
        let say' = d.Say'
        let ack' n t = Ack(n, t)
        let ack n t = Ack(n, t) |> d.Say
        let ackRandom n p v = let t = getRandomPhrase p v in ack n t
        let expr' t = Expr t
        let expr t = Expr t |> d.Say
        let exprRandom p v = let t = getRandomPhrase p v in expr t
        let ask q v =
            addProp q v
            pushq q; debug <| sprintf "Added question: %A." (d.Responses.Peek()) 
            let _q = getQuestion q in Question(q, replace_tok "$0" v _q.Value.Text) |> d.Say
        
        (* Dialogue patterns *)

        let (|PropSet|_|) (n:string) :Utterance -> Utterance option =
            function
            | m when haveProp n -> Some m
            | _ -> None

        let (|PropNotSet|_|) (n:string) :Utterance -> Utterance option =
            function
            | m when not (haveProp n) -> Some m
            | _ -> None
         
        let (|PropStr|_|) : obj option -> string option =
            function
            | Some s when (s :? string) -> Some (s :?> string)
            | _ -> None

        let (|Assert|_|) :Utterance -> Utterance option =
            function
            | PropSet "user" m when d.Responses.Peek().IsAQuestion -> 
                popu()
                Some m
            | _ -> None

        let (|Response|_|) (n:string) :Utterance -> (Utterance * obj option) option =
            function
            | PropSet "user" m when haveQuestion n && d.Responses.Count > 0 && d.Responses.Peek().IsAQuestion && d.Responses.Peek().Name = n -> 
                popu()
                popq()
                if haveProp n then
                    let d = d.Props.[n]
                    deleteProp n
                    Some(m, Some d)
                else Some(m, None)
            | _ -> None
        
        let (|AnonResponse|_|) (n:string) :Utterance -> (Utterance * obj option) option =
            function
            | PropNotSet "user" m when haveQuestion n && d.Responses.Count > 0  && d.Responses.Peek().IsAQuestion && d.Responses.Peek().Name = n -> 
                popu()
                popq()
                if haveProp n then
                    let p = d.Props.[n]
                    deleteProp n
                    Some(m, Some p)
                else Some(m, None)
            | _ -> None

        let (|AnonAssert|_|) :Utterance -> Utterance option =
            function
            | PropNotSet "user" m when questions.Count = 0 -> 
                popc()
                Some m
            | _ -> None

        let (|Start|_|) :Utterance -> Utterance option=
            function
            | PropNotSet "started" m -> Some m
            | _ -> None

        (* User functions *)
        
        let loginUser u = 
            do ackRandom "getUser" waitRetrievePhrases "user name"
            async { 
                match! Server.getUser u with
                | Some u ->
                    do! Server.updateUserLastLogin u.Name |> Async.Ignore
                    addProp "user" u
                    exprRandom "helloUser" helloUserPhrases <| userProp().Name
                    if u.LastLoggedIn.IsSome then 
                        let! h = Server.humanize u.LastLoggedIn.Value
                        say' <| sprintf "You last logged in %s." h 
                | None _ -> 
                    say' <| sprintf "I did not find a user with the name %s." u
                    ask "addUser" u
            } |> Async.Start
        
        let addUser u = 
            async { 
                do ackRandom "addUser" waitAddPhrases "user"
                match! Server.addUser u with 
                | Some _ -> 
                    addProp "user" u
                    ack "addUset" <| sprintf "Hello %A, nice to meet you." (userProp())
                | None _ -> 
                    say' <| sprintf "Sorry I was not able to add the user %s to the system." u
            } |> Async.Start

        (* Interpreter logic begins here *)
        match d.Frame() with
        (* Hello *)
        
        | Start(AnonAssert(Intent "hello" (_, None)))::[] ->  
                addProp "started" true
                sayRandom' helloPhrases
        | AnonAssert(Intent "hello" (_, None))::[] -> say "Hello, tell me your name to get started."

        (* User login *)
        
        | AnonAssert(Intent "hello" (_, Entity1Of1 "contact" u))::[] -> loginUser u.Value
        
        (* User add *)
        
        | Yes(AnonResponse "addUser" (_, StrProp user))::[] -> addUser user
        | No(AnonResponse "addUser" (_, Str user))::[] -> say <| sprintf "Ok I did not add the user %s. But you must login for me to help you." user

        | AnonAssert(_) ::[] -> say "Could you introduce yourself so we can get started?"

        (* User switch *)
        
        | Assert(Intent "hello" (None, Entity1Of1 "contact" u))::[] -> 
            async {
                match! Server.getUser u.Value with
                | Some user -> ask "switchUser" user.Name
                | None -> say <| sprintf "Sorry, the user %s does not exist." u.Value
            } |> Async.Start
        | Yes(Response "switchUser" (_, Str user))::[] ->
            props.["user"] <- user
            say <| sprintf "Ok I switched to user %A." user  
        | No(Response "switchUser" (_, Str user))::[] -> 
            say <| sprintf "Ok I did not switch to user %s." user

        debug <| sprintf "Ending utterances:%A. Ending responses: %A." d.Utterances d.Responses 