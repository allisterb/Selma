namespace SMApp.Web

open System.Collections.Generic

open WebSharper

open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module Main =
    let name = "Main"
    let debug m = ClientExtensions.debug name m
           
    /// Update the dialogue state
    let rec update d =        
        let (Dialogue.Dialogue(cui, props, dialogueQuestions, output, utterances)) = d
        debug <| sprintf "Module %s starting utterances:%A, questions: %A." name utterances dialogueQuestions
   
        let echo = Dialogue.echo d
        let say' = Dialogue.say' d
        let say = Dialogue.say d
        let sayRandom = Dialogue.sayRandom d
        let sayRandom' = Dialogue.sayRandom' d

        (* Manage the dialogue state elements t*)
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
        let endt = Dialogue.endt d debug
        let didNotUnderstand() = Dialogue.didNotUnderstand d debug name

        (* Base dialogue patterns *)
        let (|Agenda|_|) = Dialogue.(|Agenda_|_|) d debug
        let (|PropSet|_|) = Dialogue.(|PropSet_|_|) d
        let (|PropNotSet|_|) = Dialogue.(|PropNotSet_|_|) d
        let (|User|_|) = Dialogue.(|User_|_|) d
        let (|User'|_|) = Dialogue.(|User'_|_|) d
        let (|Response|_|) = Dialogue.(|Response_|_|) d
        let (|Response'|_|) = Dialogue.(|Response'_|_|) d
        
        (* Module dialogue patterns *) 
        let (|Start|_|) :Utterance -> Utterance option=
            function
            | PropNotSet "started" m -> Some m
            | _ -> None
   
        (* Interpreter logic begins here *)
        match utterances |> Seq.take (if utterances.Count >= 5 then 5 else utterances.Count) |> List.ofSeq with
        (* Agenda *)
        | Agenda User.name -> 
            debug <| sprintf "Agenda is %A." (d.DialogueQuestions.Peek())
            User.update d

        (* Greet *)
        | Start(User'(Intent "greet" (_, None)))::[] ->  
                add "started" true
                handle "greet" (fun _ -> sayRandom' helloPhrases)

        | User'(Intent "greet" (_, None))::[] -> handle "greet" (fun _ -> say "Hello, tell me your name to get started.")
          
        (* Dispatch *)
        // User login
        | User'(Intent "greet" (_, Entity1Of1 "name" _))::[] -> dispatch User.name User.update
        | User'(Intent "hello" (_, Entity1Of1 "contact" _))::[] -> dispatch User.name User.update

        | _ -> didNotUnderstand()

        Dialogue.debugInterpreterEnd d debug name