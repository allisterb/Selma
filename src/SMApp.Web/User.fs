namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module User =
    let name = "User"
    let debug m = ClientExtensions.debug name m
    
    /// Update the dialogue state
    let rec update d =        
        Dialogue.debugInterpreterStart d debug name

        let (Dialogue.Dialogue(cui, props, dialogueQuestions, output, utterances)) = d
        
        let echo = Dialogue.echo d
        let say' = Dialogue.say' d
        let say = Dialogue.say d
        let sayRandom = Dialogue.sayRandom d
        let sayRandom' = Dialogue.sayRandom' d

        (* Manage the dialogue state elements*)
        let have = Dialogue.have d 
        let prop k  = Dialogue.prop d k
        let add k v = Dialogue.add d debug k v
        let remove = Dialogue.remove d debug

        let pushu = Dialogue.pushu d debug
        let pushq = Dialogue.pushq d debug
        let popu() = Dialogue.popu d debug
        let popq() = Dialogue.popq d debug
        
        let dispatch = Dialogue.dispatch d debug
        let ask = Dialogue.ask d debug
        let handle = Dialogue.handle d debug
        let endt = Dialogue.endt d debug
        let trigger = Dialogue.trigger d debug update
        let didNotUnderstand() = Dialogue.didNotUnderstand d debug name

        (* Base dialogue patterns *)
        let (|Agenda|_|) = Dialogue.(|Agenda_|_|) d
        let (|PropSet|_|) = Dialogue.(|PropSet_|_|) d
        let (|PropNotSet|_|) = Dialogue.(|PropNotSet_|_|) d
        let (|User|_|) = Dialogue.(|User_|_|) d
        let (|User'|_|) = Dialogue.(|User'_|_|) d
        let (|Response|_|) = Dialogue.(|Response_|_|) d
        let (|Response'|_|) = Dialogue.(|Response'_|_|) d
       
        let user():User = prop "user"

        let authenticateNewUserQuestion u = 
            Question("authenticateNewUser", name, UserAuthentication, fun d ->  
                let passPhrase = sprintf "Hello my name is %s and I am a user" u
                say <| sprintf "Enter the phrase %s." passPhrase 
                
                let collectData() = 
                    d.Cui.MonitorTypingPattern None
                    let c = createDialogueBoxCanvas()
                    startCamera JS.Document.Body c
                
                let rec box() = questionBox "Biometric Authentication" "" 640 480 None (Some collectData) (fun text ->  
                    let image = getCameraCanvas().ToDataURL();
                    debug <|sprintf "User image is %s..." (image.Substring(0, 10))
                    stopCamera()
                    let pattern =  d.Cui.GetSameTextTypingPattern passPhrase None
                    debug <| sprintf "User entered typing pattern %s for text %s" pattern text
                    if text.ToLower() <> passPhrase.ToLower() then
                        say "Sorry you did not enter the passphrase correctly. Please try again."
                        box()
                    else
                        add "authenticateNewUser" [|u; pattern; image|]
                        trigger "authenticateNewUser"
                )
                box()
            )

        let authenticateUserQuestion u = 
            Question("authenticateUser", name, UserAuthentication, fun d ->  
                d.Cui.TypingDNA.Reset()
                questionBox "Biometric Authentication" "" 640 480 None None (fun _ -> 
                     let pattern =  d.Cui.GetSameTextTypingPattern (sprintf "Hello my name is %s and I am an administrator" u) None
                     debug <| sprintf "User entered typing pattern %s" pattern  
                     if isNull pattern then trigger("authenticateUser") else
                         async { 
                                 let! t = Server.verifyUserTypingPattern u pattern 
                                 debug <| sprintf "TypingDNA: %A"  t
                                 match t with
                                 | Ok r -> add "authenticateUser" (Some r)
                                 | Error e -> error e; add "authenticateUser" None
                                 trigger "authenticateUser"
                         } |> Async.Start
                )

                let input = JQuery(".swal2-input").Get().[0] |> As<Dom.Element> 
                do d.Cui.MonitorTypingPattern None
                let e = JQuery(".swal2-content").Get().[0].FirstChild |> As<Dom.Element>
                let c = createCanvas "camera" "640" "480" e
                startCamera JS.Document.Body c
            )
       
        let switchUserQuestion u = Question("switchUser", name, Verification, fun _ -> say <| sprintf "Do you want me to switch to the user %s" u)
        
        (* User functions *)
        let loginUser u = 
            do sayRandom waitRetrievePhrases "user name"
            async { 
                match! Server.getUser u with 
                | Some user ->
                    do! Server.updateUserLastLogin user.Name |> Async.Ignore
                    add "loginUser" user
                    sayRandom helloUserPhrases <| sprintf "%A" user.Name
                    if Option.isSome user.LastLoggedIn then 
                        let! h = Server.humanize user.LastLoggedIn.Value
                        say <| sprintf "You last logged in %s." h
                        say "Since you will be accessing sensitive data I need to authenticate you via facial recognition and typing behaviour. Enter the pass phrase you were assigned during enrollment in the box provided. Then, look into your camera until you see the red box around your face and press the Ok button."
                        authenticateUserQuestion u |> ask
                | None _ -> 
                    say <| sprintf "I did not find a user with the name %s." u
                    Question("addUser", name, Verification, fun _ -> add "addUser" u; say <| sprintf "Do you want me to add the user %s?" u) |> ask
            } |> Async.Start
        
        let addUser u tp = 
            async { 
                do sayRandom waitAddPhrases "user"
                match! Server.addUser u with 
                | Ok _ -> 
                    match! Server.addUserTypingPattern u tp with
                    | Ok _ ->
                        add "user" u
                        say <| sprintf "Hello %A, nice to meet you." props.["user"]
                    | Error _ -> say <| sprintf "Sorry I was not able to add the user %s to the system." u 
                | Error e -> 
                    error <| sprintf "Error adding user %s:%s." u e
                    say <| sprintf "Sorry I was not able to add the user %s to the system." u
            } |> Async.Start

        (* Symptom journal functions *) 
        let addSymptom s l m = 
            async { 
                do sayRandom waitAddPhrases "symptom entry"
                match! Server.addSymptomJournalEntry (user().Name) s l m with 
                | Ok _ -> 
                    say <| sprintf "OK I added that %s symptom to your journal." s 
                | Error _ -> 
                    say <| sprintf "Sorry I wasn't able to add that symptom to your journal. Could you try again?"
            } |> Async.Start 

        let getSymptomJournal u =  
            async {
                do sayRandom waitRetrievePhrases "symptom journal"
                return! Server.getSymptomJournal u 
        }
            
        (* Interpreter logic begins here *)
        match Dialogue.frame utterances with
        
        /// User login
        | User'(Intent "greet" (_, Entity1Of1 "name" u))::[] -> handle "loginUser" (fun _ -> loginUser u.Value)
        | User'(Intent "hello" (_, Entity1Of1 "contact" u))::[] -> handle "loginUser" (fun _ -> loginUser u.Value)
        
        /// User authentication
        | Response' "authenticateUser" (_, r)::[] -> endt "authenticateUser" (fun _ -> 
            match r with
            | None -> debug "authenticateUser cancelled."
            | _ -> () 
            ) 
        
        /// User add
        | No(Response' "addUser" (_, Str u))::[] -> endt "addUser" (fun _ -> say <| sprintf "Ok I did not add the user %s. But you must login for me to help you." u)
        | Yes(Response' "addUser" (_, Str u))::[] -> endt "addUser" (fun _ -> let q = authenticateNewUserQuestion u in ask q)
        | Response' "authenticateNewUser" (_, StrA u)::[] -> endt "authenticateNewUser" (fun _ -> addUser u.[0] u.[1])

        (* User switch *)
        
        | User(Intent "hello" (None, Entity1Of1 "name" u))::[] -> 
            async {
                match! Server.getUser u.Value with
                | Some user -> switchUserQuestion user.Name |> ask
                | None -> say <| sprintf "Sorry, the user %s does not exist." u.Value
            } |> Async.Start
        | Yes(Response "switchUser" (_, Str user))::[] ->
            props.["user"] <- user
            say <| sprintf "Ok I switched to user %A." user  
        | No(Response "switchUser" (_, Str user))::[] -> 
            say <| sprintf "Ok I did not switch to user %s." user
        

        (* KB query *)

        | User'(Intent "kbquery" (_, _) as u)::[]
        | User(Intent "kbquery" (_, _) as u)::[] -> 
            async {
                let! a = QnAMaker.getAnswer u.Text 
                let! html = a.answers.[0].answer |> Server.mdtohtml
                let! text = a.answers.[0].answer |> Server.mdtotext
                echo html
                say text
            } |> Async.Start

        (* Symptoms *)

        | User(Intent "symptom" (_, Entity1OfAny "symptom_name" s))::[] ->
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

        | User(Intent "medjournal" (_, Some en))::[] ->
            say "ok I added that entry to your medication journal."
            say "You should be careful not to take too many painkillers over a short period of time."

        | _ -> didNotUnderstand()

        Dialogue.debugInterpreterEnd d debug name