namespace SMApp.Web

open System.Collections.Generic

open WebSharper

open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module Main =
    let debug m = ClientExtensions.debug "Main" m
    
    let tasks = [ 
        Task("addUser", Ssml(SSML("Do you want me to add the user $0?")))
        Task("switchUser", Ssml(SSML("Do you want me to switch to the user $0?")))
    ]  
    let getTask n = tasks |> List.tryFind(fun q -> q.Name = n)
    let haveTask n = tasks |> List.exists(fun q -> q.Name = n)

    /// Update the dialogue state
    let update (cui: CUI) (props: Dictionary<string, obj>) (tasks:Stack<Task>) (responses:Stack<string>) (utterances: Stack<Utterance>) =        
        debug <| sprintf "Starting utterances:%A. Starting tasks: %A." utterances tasks
       
        (* Audio and text cues *)

        let say' t = cui.Say t
        
        let say t =
            responses.Push t
            say' t

        let sayRandom p v  = 
            let t = getRandomPhrase p v
            responses.Push(t) |> ignore
            cui.Say t
        
        let sayRandom' p = sayRandom p ""

        let echo t = cui.EchoHtml' t

        (* Manage the dialogue state elements*)

        let haveProp k = props.ContainsKey k
        let prop k :'a = props.[k] :?> 'a
        let addProp k v = props.Add(k, v)
        let deleteProp k = props.Remove k |> ignore
        
        let user() :User = prop "user"
        let popc() = utterances.Pop() |> ignore
        let popq() = tasks.Pop() |> ignore
        let pushq (n:string) = 
            match getTask n with
            | Some q -> tasks.Push q
            | None -> failwithf "No such task %s" n
        let ask q v =
            addProp q v
            pushq q; 
            debug <| sprintf "Added question: %A." (tasks.Peek()) 
            let _q = getTask q in say <| replace_tok "$0" v (_q.Value.Prompt.Text)
            
        (* Dialogue patterns *)

        let (|PropSet|_|) (n:string) :Utterance -> Utterance option =
            function
            | m when haveProp n -> Some m
            | _ -> None

        let (|PropNotSet|_|) (n:string) :Utterance -> Utterance option =
            function
            | m when not (haveProp n) -> Some m
            | _ -> None
         
        let (|Assert|_|) :Utterance -> Utterance option =
            function
            | PropSet "user" m when tasks.Count = 0 -> 
                popc()
                Some m
            | _ -> None

        let (|Response|_|) (n:string) :Utterance -> (Utterance * obj option) option =
            function
            | PropSet "user" m when haveTask n && tasks.Count > 0  && tasks.Peek().Name = n -> 
                popc()
                popq()
                if haveProp n then
                    let d = props.[n]
                    deleteProp n
                    Some(m, Some d)
                else Some(m, None)
            | _ -> None

        let (|Response'|_|) (n:string) :Utterance -> (Utterance * obj option) option =
            function
            | PropNotSet "user" m when haveTask n && tasks.Count > 0  && tasks.Peek().Name = n -> 
                popc()
                popq()
                if haveProp n then
                    let d = props.[n]
                    deleteProp n
                    Some(m, Some d)
                else Some(m, None)
            | _ -> None

        let (|Assert'|_|) :Utterance -> Utterance option =
            function
            | PropNotSet "user" m when tasks.Count = 0 -> 
                popc()
                Some m
            | _ -> None

        let (|Start|_|) :Utterance -> Utterance option=
            function
            | PropNotSet "started" m -> Some m
            | _ -> None

        let (|Str|_|) : obj option -> string option =
            function
            | Some s when (s :? string) -> Some (s :?> string)
            | _ -> None

        (* User functions *)
        
        let loginUser u = 
            do sayRandom waitRetrievePhrases "user name"
            async { 
                match! Server.getUser u with 
                | Some u ->
                    do! Server.updateUserLastLogin u.Name |> Async.Ignore
                    props.Add("user", u)
                    sayRandom helloUserPhrases <| sprintf "%A" props.["user"]
                    if u.LastLoggedIn.IsSome then 
                        let! h = Server.humanize u.LastLoggedIn.Value
                        say <| sprintf "You last logged in %s." h 
                | None _ -> 
                    say <| sprintf "I did not find a user with the name %s." u
                    ask "addUser" u
            } |> Async.Start
        
        let addUser u = 
            async { 
                do sayRandom waitAddPhrases "user"
                match! Server.addUser u with 
                | Some _ -> 
                    addProp "user" u
                    say <| sprintf "Hello %A, nice to meet you." props.["user"]
                | None _ -> 
                    say <| sprintf "Sorry I was not able to add the user %s to the system." u
            } |> Async.Start

        (* Symptom journal functions *)
        
        let addSymptom s l m = 
            async { 
                do sayRandom waitAddPhrases "symptom entry"
                match! Server.addSymptomJournalEntry (user().Name) s l m with 
                | Some _ -> 
                    say <| sprintf "OK I added that %s symptom to your journal." s 
                | None _ -> 
                    say <| sprintf "Sorry I wasn't able to add that symptom to your journal. Could you try again?"
            } |> Async.Start 

        let getSymptomJournal u =  
            async {
                do sayRandom waitRetrievePhrases "symptom journal"
                return! Server.getSymptomJournal u 
        }
            
        (* Interpreter logic begins here *)
        match utterances |> Seq.take (if utterances.Count >= 5 then 5 else utterances.Count) |> List.ofSeq with

        (* Hello *)
        
        | Start(Assert'(Intent "hello" (_, None)))::[] ->  
                props.Add("started", true)
                sayRandom' helloPhrases
        | Assert'(Intent "hello" (_, None))::[] -> say "Hello, tell me your name to get started."

        (* User login *)
        
        | Assert'(Intent "hello" (_, Entity1Of1 "contact" u))::[] -> loginUser u.Value
        
        (* User add *)
        
        | Yes(Response' "addUser" (_, Str user))::[] -> addUser user
        | No(Response' "addUser" (_, Str user))::[] -> say <| sprintf "Ok I did not add the user %s. But you must login for me to help you." user

        //| Assert'(_) ::[] -> say "Could you introduce yourself so we can get started?"

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
        

        (* KB query *)

        | Assert'(Intent "kbquery" (_, _) as u)::[]
        | Assert(Intent "kbquery" (_, _) as u)::[] -> 
            async {
                let! a = QnAMaker.getAnswer u.Text 
                let! html = a.answers.[0].answer |> Server.mdtohtml
                let! text = a.answers.[0].answer |> Server.mdtotext
                echo html
                say text
            } |> Async.Start

        (* Symptoms *)

        | Assert(Intent "symptom" (_, Entity1OfAny "symptom_name" s))::[] ->
            async {
                say "Ok I'll add that entry to your symptom journal"
                addSymptom s.Value None (None)
                //let! j = getSymptomJournal (user().Name)
                //say <| sprintf "I see this is the 3rd time today you've had pain %s" (user())
                //ask "painVideo" ""
            } 
            |> Async.Start

        | Yes(Response "painVideo"(_, _))::[] -> cui.EchoHtml'("""<iframe width="560" height="315" src="https://www.youtube.com/embed/SkAqOditKN0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>""")
            
        (* Meds *)

        | Assert(Intent "medjournal" (_, Some en))::[] ->
            say "ok I added that entry to your medication journal."
            say "You should be careful not to take too many painkillers over a short period of time."

        | _ -> 
            popc()
            debug "Main interpreter did not understand utterance."
            say "Sorry I didn't understand what you meant."
            if tasks.Count > 0 then 
                let q = Seq.item 0 tasks in 
                if haveProp q.Name then 
                    say <| replace_tok "$0" (props.[q.Name] :?> string) (q.ToString())
                else say (q.ToString())

        debug <| sprintf "Ending utterances: %A. Ending questions:%A." utterances tasks