namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module Symptoms =
    let name = "Symptoms"
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
        let trigger = Dialogue.trigger d debug update
        let cancel = Dialogue.cancel d debug
        let endt = Dialogue.endt d debug
        let didNotUnderstand() = Dialogue.didNotUnderstand d debug name

        let ask = Questions.ask d debug

        (* Base dialogue patterns *)
        let (|Agenda|_|) = Dialogue.(|Agenda_|_|) d
        let (|PropSet|_|) = Dialogue.(|PropSet_|_|) d
        let (|PropNotSet|_|) = Dialogue.(|PropNotSet_|_|) d
        let (|User|_|) = Dialogue.(|User_|_|) d
        let (|User'|_|) = Dialogue.(|User'_|_|) d
        let (|Response|_|) = Dialogue.(|Response_|_|) d
        let (|Response'|_|) = Dialogue.(|Response'_|_|) d
       
        let user():User = prop "user"

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

        | Yes(Response "painVideo"(_, _, _))::[] -> cui.EchoHtml'("""<iframe width="560" height="315" src="https://www.youtube.com/embed/SkAqOditKN0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>""")
            
        (* Meds *)

        | User(Intent "medjournal" (_, Some en))::[] ->
            say "ok I added that entry to your medication journal."
            say "You should be careful not to take too many painkillers over a short period of time."

        (* KB query *)

        | User(Intent "kbquery" (_, _) as u)::[] -> 
            async {
                let! a = QnAMaker.getAnswer u.Text 
                let! html = a.answers.[0].answer |> Server.mdtohtml
                let! text = a.answers.[0].answer |> Server.mdtotext
                echo html
                say text
            } |> Async.Start

        | _ -> didNotUnderstand()

        Dialogue.debugInterpreterEnd d debug name