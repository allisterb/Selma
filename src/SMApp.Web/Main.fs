namespace SMApp.Web

open System.Collections.Generic

open WebSharper

open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module Main =
    let name = "Main"
    let debug m = ClientExtensions.debug name m
    
    let moduleQuestions:Question list = []
    let getQuestion n = moduleQuestions |> List.tryFind(fun q -> q.Name = n)
    let haveQuestion n = moduleQuestions |> List.exists(fun q -> q.Name = n)
       
    /// Update the dialogue state
    let update d =        
        let (Dialogue.Dialogue(cui, props, dialogueQuestions, output, utterances)) = d
        debug <| sprintf "Starting utterances:%A. Starting questions: %A." utterances dialogueQuestions
   
        let echo = Dialogue.echo d
        let say' = Dialogue.say' d
        let say = Dialogue.say d
        let sayRandom = Dialogue.sayRandom d
        let sayRandom' = Dialogue.sayRandom' d

        (* Manage the dialogue state elements*)
        let have = Dialogue.have d 
        let add k v = Dialogue.add d k v
        let delete = Dialogue.delete d
        let prop k  = Dialogue.prop d k
        let user() :User = prop "user"

        let pushu = Dialogue.pushu d
        let pushq = Dialogue.pushq d moduleQuestions
        let popu() = Dialogue.popu d
        let popq() = Dialogue.popq d
        let popt() = Dialogue.popt d
        let ask = Dialogue.ask d moduleQuestions
        
        let dispatch = Dialogue.dispatch d debug
        let handle = Dialogue.handle d debug
        let handle' = Dialogue.handle' d debug
        let didNotUnderstand() = Dialogue.didNotUnderstand d debug name

        (* Base dialogue patterns *)
        let (|Agenda|_|) = Dialogue.(|Agenda_|_|) d
        let (|PropSet|_|) = Dialogue.(|PropSet_|_|) d
        let (|PropNotSet|_|) = Dialogue.(|PropNotSet_|_|) d
        let (|User|_|) = Dialogue.(|User_|_|) d
        let (|User'|_|) = Dialogue.(|User'_|_|) d
        let (|Response|_|) = Dialogue.(|Response_|_|) d moduleQuestions
        let (|Response'|_|) = Dialogue.(|Response'_|_|) d moduleQuestions
        
        (* Module dialogue patterns *) 
        let (|Start|_|) :Utterance -> Utterance option=
            function
            | PropNotSet "started" m -> Some m
            | _ -> None
   
        (* Interpreter logic begins here *)
        match utterances |> Seq.take (if utterances.Count >= 5 then 5 else utterances.Count) |> List.ofSeq with
        (* Agenda *)
        | Agenda "User" _ -> User.update d

        (* Greet *)
        | Start(User'(Intent "greet" (_, None)))::[] ->  
                props.Add("started", true)
                handle "hello" (fun _ -> sayRandom' helloPhrases)

        | User'(Intent "greet" (_, None))::[] -> handle "hello" (fun _ -> say "Hello, tell me your name to get started.")
          
        (* Dispatch *)
        /// User login
        | User'(Intent "greet" (_, Entity1Of1 "name" _))::[] -> dispatch User.name User.update

        | _ -> didNotUnderstand()

        debug <| sprintf "Ending utterances: %A. Ending questions:%A." utterances dialogueQuestions