namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module Journal =
    let name = "Journal"
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

        (* Triple patterns *)
        let (|TripleSubject|_|) (s:string) =
            function
            | Subject ss when ss = s -> Some()
            | _ -> None

        let (|TripleRelation|_|) (s:string) =
            function
            | ss when ss = s -> Some()
            | _ -> None

        let (|TripleVerb|_|) (s:string) =
            function
            | Verb ss when ss = s -> Some()
            | _ -> None

        let (|SubjectVerb1OfAny|_|) (s:string) (sr:string) (v:string) :Triple list option -> Triple option = 
            function
            | Some triples when triples |> List.tryPick(fun t -> match t with | Triple(SubjectVerbRelation.Relation(TripleSubject s, TripleRelation sr, TripleVerb v), _) -> Some t | _ -> None) |> Option.isSome -> 
                triples |> List.pick(fun t -> match t with | Triple(SubjectVerbRelation.Relation(TripleSubject s, TripleRelation sr, v), _) -> Some t | _ -> None) 
                |> Some 
            | _ -> None


        (* Journal functions *)

        let process_entry() = 
            let triples = prop<Stack<Triple list list>> "journal_entry"
            ()
        let addEntry e = 
            async {
                match! Server.getTriples e with
                | Ok triples ->
                    if triples.Length > 0 then
                        debug <| sprintf "Got %i sentences from NLU server" (triples.Length)
                        add "journal_entry" (Stack(triples))
                        process_entry()
                    else 
                        say <| sprintf "Sorry I could not add an entry your journal entry."
                | Error e -> say <| sprintf "I could not add your journal entry. The following error occurred: %A" e
            }

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

        (* Journal *)

        | User(Intent "journal" (_, Entity1Of1 "journal_entry" j))::[] ->
            async {
                say "Ok I'll add that entry to your symptom journal."
                do! addEntry j.Value 
                //addSymptom s.Value None (None)
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
            ()

        | _ -> didNotUnderstand()

        Dialogue.debugInterpreterEnd d debug name