namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.UI
open SMApp.Models
open SMApp.NLU

[<JavaScript>]
module Journal =
    let name = "Journal"
    let debug m = ClientExtensions.debug name m
    let mutable journalEntry = false

    /// Update the dialogue state
    let rec update d =        
        Dialogue.debugInterpreterStart d debug name

        let (Dialogue.Dialogue(cui, props, dialogueQuestions, output, utterances)) = d
        
        let echo = Dialogue.echo d
        let say' = Dialogue.say' d
        let say = Dialogue.say d
        let doc = cui.EchoDoc
        let sayRandom = Dialogue.sayRandom d
        let sayRandom' = Dialogue.sayRandom' d

        (* Manage the dialogue state elements*)
        let have = Dialogue.have d 
        let prop k = Dialogue.prop<'a> d k
        let add k v = Dialogue.add d debug k v
        let remove = Dialogue.remove d debug
        
        let user():User = prop "user"

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
       
        (* Journal functions *)

        let writing_prompts = [
            "Describe a place that makes me feel fearful or angry."
            "Something happened in the past week that made me feel angry or upset"
            "I remember this dream I had…"
        ]
        let process_entry() = 
            let triples:Stack<Triple list list> = prop "journal_entry"
            ()
        let addEntry e = 
            async {
                match! Server.getTriples e with
                | Ok triples ->
                    if triples.Length > 0 then
                        debug <| sprintf "Got %i sentences from NLU server" (triples.Length)
                        add "journal_entry_triples" (Stack(triples))
                        echo "Triples:"
                        for triple in triples do echo <| sprintf "<span style='color:white;background-color:#00FA9A'>%A</span>" (triple)
                    else 
                        say <| sprintf "Sorry I could not add an entry your journal entry."
                | Error e -> say <| sprintf "I could not add your journal entry. The following error occurred: %A" e
                
                match! Server.getMainLemmas e with
                | Ok lemmas -> 
                    for lemma in lemmas do 
                        debug <|sprintf "%A" lemma
                    echo "Lemmas:"
                    for lemma in lemmas do echo <| sprintf "<span style='color:white;background-color:#FFC0CB'>%A</span>" lemma
                | Error e -> debug e

                match! Server.getEntities e with
                | Ok entities -> 
                    for entity in entities do debug <|sprintf "%A" entity
                    echo "Entities:"
                    for entity in entities do echo <| sprintf "<span style='color:white;background-color:#7B68EE'>%A</span>" entity
                | Error e -> debug e
                
                match! Server.getEmotionalTraits e with
                    | Ok t -> 
                        for et in t do debug <| sprintf "%A" et
                        echo "Emotional Traits:"
                        for tr in t do echo <| sprintf "<span style='color:white;background-color:#FF4500'>%A</span>" tr
                    | Error e -> debug e

                match! Server.getBehavioralTraits e with
                    | Ok t -> 
                        for et in t do debug <| sprintf "%A" et
                        echo "Behavioral Traits:"
                        for tr in t do echo <| sprintf "<span style='color:white;background-color:#FFFF00'>%A</span>" tr
                    | Error e -> debug e
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

        | User(Intent "journal" (_, None))::[] -> 
            say "Choose one of the following the writing prompts:"
            for p in writing_prompts do say p
            echo <| sprintf "1. %s" writing_prompts.[0]
            echo <| sprintf "2. %s" writing_prompts.[1]
            echo <| sprintf "3. %s" writing_prompts.[2]
            doc <| Doc.Concat [
                Html.ol [cls "pagination"] [
                    Html.li [cls "page-item"] [Html.a [cls "page-link"; href "#"; Html.on.click(fun _ _ -> trigger "1" "1")] [Html.text "1"]]
                    Html.text "     "
                    Html.li [cls "page-item"] [Html.a [cls "page-link"; href "#"; Html.on.click(fun _ _ -> trigger "2" "2")] [Html.text "2"]]
                    Html.text "     "
                    Html.li [cls "page-item"] [Html.a [cls "page-link"; href "#"; Html.on.click(fun _ _ -> trigger "3" "3")] [Html.text "3"]]
                ]
            ]
            
        | User(Number n)::User(Intent "journal" (_, None))::[] -> 
            if (n <= 0 || n > 3) then
                say "Choose a writing prompt from 1 to 3."
            else
                add "writingprompt" n
                add "journalentry" true
                echo <| sprintf "<span style='color:white;background-color:#7B68EE'>%A</span>" writing_prompts.[n - 1]
                say "Enter your journal entry and I'll analyze it and add it to your journal."
        
        | User(Intent "journal" (_, Entity1Of1 "journal_entry" j))::User(Number n)::User(Intent "journal" (_, None))::[] ->
            async {
                say "Ok let me analyze what you've written and add that to your journal."
                do! addEntry j.Value 
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