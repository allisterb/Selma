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
        let handle = Dialogue.handle d debug
        let ask = Dialogue.ask d debug
        let trigger = Dialogue.trigger d debug update
        let cancel = Dialogue.cancel d debug
        let endt = Dialogue.endt d debug
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
        
        (* User functions *)
        let authenticateUser u = 
            Question("authenticateUser", name, UserAuthentication, fun d ->  
                let passPhrase = sprintf "Hello my name is %s and I am an administrator" u
                say <| sprintf "Enter the phrase %s." passPhrase 

                let collectData() = 
                    d.Cui.MonitorTypingPattern None
                    let c = createDialogueBoxCanvas()
                    startCamera JS.Document.Body c

                let rec box() = 
                    questionBox "Biometric Authentication" "" 640 480 None (Some collectData) (fun o ->  
                        let text = o :?> string
                        let image = getCameraCanvas().ToDataURL();
                        debug <|sprintf "User image is %s..." (image.Substring(0, 10))
                        stopCamera()
                        let pattern =  d.Cui.GetSameTextTypingPattern passPhrase None
                        debug <| sprintf "User entered typing pattern %s for text %s" pattern text
                        if text.ToLower() <> passPhrase.ToLower() then
                            say "Sorry, you did not enter the passphrase correctly. Please try again."
                            box()
                        else
                            [|u; pattern; image|] |> trigger "authenticateUser"
                    ) (fun _ -> 
                        say "Ok but you must login for me to help you."
                        stopCamera()
                        cancel "authenticateUser"
                      )
                box()
            )

        let loginUser u = 
            do sayRandom waitRetrievePhrases "user name"
            async { 
                match! Server.getUser u with 
                | Some user ->
                    do! Server.updateUserLastLogin user.Name |> Async.Ignore
                    sayRandom helloUserPhrases <| sprintf "%A" user.Name
                    if Option.isSome user.LastLoggedIn then 
                        let! h = Server.humanize user.LastLoggedIn.Value
                        say <| sprintf "You last logged in %s." h
                        authenticateUser u |> ask
                | None _ -> 
                    say <| sprintf "I did not find a user with the name %s." u
                    Question("addUser", name, Verification, fun _ -> add "addUser" u; say <| sprintf "Do you want me to add the user %s?" u) |> ask
            } |> Async.Start
        
        let authenticateNewUser u = 
            Question("authenticateNewUser", name, UserAuthentication, fun d ->  
                let passPhrase = sprintf "Hello my name is %s and I am an administrator" u
                say <| sprintf "Enter the phrase %s." passPhrase 
                
                let collectData() = 
                    d.Cui.MonitorTypingPattern None
                    let c = createDialogueBoxCanvas()
                    startCamera JS.Document.Body c
                
                let rec box() = 
                    questionBox "Biometric Authentication" "" 640 480 None (Some collectData) (fun o ->  
                        let text = o :?> string
                        let image = getCameraCanvas().ToDataURL();
                        debug <|sprintf "User image is %s..." (image.Substring(0, 10))
                        stopCamera()
                        let pattern =  d.Cui.GetSameTextTypingPattern passPhrase None
                        debug <| sprintf "User entered typing pattern %s for text %s" pattern text
                        if text.ToLower() <> passPhrase.ToLower() then
                            say "Sorry you did not enter the passphrase correctly. Please try again."
                            box()
                        else [|u; pattern; image|] |> trigger "authenticateNewUser"
                    ) (fun _ -> 
                        stopCamera()
                        say <| sprintf "Ok I did not add the user %s. But you must login for me to help you." u
                        cancel "authenticateNewUser"
                      )
                box()
            )

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

               
        let switchUserQuestion u = Question("switchUser", name, Verification, fun _ -> say <| sprintf "Do you want me to switch to the user %s" u)
          
        (* Interpreter logic begins here *)
        match Dialogue.frame utterances with
        /// User login
        | User'(Intent "greet" (_, Entity1Of1 "name" u))::[] -> handle "loginUser" (fun _ -> loginUser u.Value)
        | User'(Intent "hello" (_, Entity1Of1 "contact" u))::[] -> handle "loginUser" (fun _ -> loginUser u.Value)
        
        /// User authentication
        | Response' "authenticateUser" (_, StrA user, _)::[] -> endt "authenticateUser" (fun _ ->
            say <| sprintf "Authenticate user %s." user.[0]
          ) 
        
        /// User add
        | No(Response' "addUser" (_, _, PStr u))::[] -> endt "addUser" (fun _ -> say <| sprintf "Ok I did not add the user %s. But you must login for me to help you." u)
        | Yes(Response' "addUser" (_, _, PStr u))::[] -> endt "addUser" (fun _ -> let q = authenticateNewUser u in ask q)
        | Response' "authenticateNewUser" (_, StrA user, _)::[] -> endt "authenticateNewUser" (fun _ -> 
            say <| sprintf "Authenticate new user %s." user.[0]
          )

        /// User switch
        | User(Intent "hello" (None, Entity1Of1 "name" u))::[] -> 
            async {
                match! Server.getUser u.Value with
                | Some user -> switchUserQuestion user.Name |> ask
                | None -> say <| sprintf "Sorry, the user %s does not exist." u.Value
            } |> Async.Start
        | Yes(Response "switchUser" (_, _, PStr user))::[] ->
            props.["user"] <- user
            say <| sprintf "Ok I switched to user %A." user  
        | No(Response "switchUser" (_, _, PStr user))::[] -> 
            say <| sprintf "Ok I did not switch to user %s." user
        
        | _ -> didNotUnderstand()

        Dialogue.debugInterpreterEnd d debug name