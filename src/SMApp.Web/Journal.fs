namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.UI

open SMApp.Models

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
       
        (* Writing journal functions *)

        let writing_prompts = [
            "Describe a place that makes me feel fearful or angry."
            "Something happened in the past week that made me feel angry or upset"
            "I remember this dream I had…"
        ]
        let processEntry() = 
            let writingPrompt:int = prop "journalentry_writingprompt" 
            let triples:Stack<Triple list list> = prop "journalentry_triples"
            let lemmas:ExpertAILemma list = prop "journalentry_mainlemmas"
            let entities:ExpertAIEntity list = prop "journalentry_entities"
            let emotional_traits:ExpertAIEntity list = prop "journalentry_emotionaltraits"
            let behavioural_traits:ExpertAIEntity list = prop "journalentry_behaviouraltraits"
            say <| writingPrompt.ToString()
            remove "journalentry_behaviouraltraits"
            remove "journalentry_emotionaltraits"
            remove "journalentry_entities"
            remove "journalentry_mainlemmas"
            remove "journalentry_triples"
            remove "journalentry_writingprompt"
            remove "journalentry"

        let addEntry e = 
            async {
                match! Server.getTriples e with
                | Ok triples ->              
                    debug <| sprintf "Got %i sentences from NLU server" (triples.Length)
                    add "journalentry_triples" (Stack(triples))
                    echo "Triples:"
                    for triple in triples do echo <| sprintf "<span style='color:white;background-color:#00FA9A'>%A</span>" (triple)

                    match! Server.getMainLemmas e with
                    | Ok lemmas -> 
                        for lemma in lemmas do debug <|sprintf "%A" lemma
                        add "journalentry_mainlemmas" lemmas
                        echo "Lemmas:"
                        for lemma in lemmas do echo <| sprintf "<span style='color:white;background-color:#FFC0CB'>%A</span>" lemma

                        match! Server.getEntities e with
                        | Ok entities -> 
                            for entity in entities do debug <|sprintf "%A" entity
                            add "journalentry_entities" entities
                            echo "Entities:"
                            for entity in entities do echo <| sprintf "<span style='color:white;background-color:#7B68EE'>%A</span>" entity

                            match! Server.getEmotionalTraits e with
                            | Ok t -> 
                                for et in t do debug <| sprintf "%A" et
                                add "journalentry_emotionaltraits" t
                                echo "Emotional Traits:"
                                for tr in t do echo <| sprintf "<span style='color:white;background-color:#FF4500'>%A</span>" tr

                                match! Server.getBehavioralTraits e with
                                | Ok t -> 
                                    add "journalentry_behaviouraltraits" t
                                    for et in t do debug <| sprintf "%A" et
                                    echo "Behavioral Traits:"
                                    for tr in t do echo <| sprintf "<span style='color:white;background-color:#FFFF00'>%A</span>" tr

                                    return Ok()

                                | Error e -> 
                                    debug e
                                    return Error e

                            | Error e -> 
                                debug e
                                return Error e
                        | Error e -> 
                            debug e
                            return Error e
                    | Error e -> 
                        debug e
                        return Error e
                | Error e -> 
                    return Error e
            }

        (* Symptom journal functions *) 

        let symptom_writing_prompts = [
            "Describe the symptoms you are having right now."
            "Describe the symptoms you have had for the past month."
            "Describe any symptoms that your condition causes."
        ]

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

        (* Writing Journal *)

        | User(Intent "journal" (_, None))::[] -> 
            say "Choose one of the following the writing prompts:"
            cui.Say writing_prompts
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
                add "journalentry" true
                add "journalentry_writingprompt" n
                echo <| sprintf "<span style='color:white;background-color:#7B68EE'>%A</span>" writing_prompts.[n - 1]
                say "Enter your journal entry and I'll analyze it and add it to your journal."
        
        | User(Intent "journal" (_, Entity1Of1 "journal_entry" j))::User(Number n)::User(Intent "journal" (_, None))::[] ->
            popu()
            async {
                say "Ok let me analyze what you've written and add that to your journal."
                match! addEntry j.Value with
                | Ok _ -> 
                    popu()
                    popu()
                    processEntry()
                | Error e -> say "Sorry I was not able to add your journal entry. Could you try again? Press the up arrow to return to the text you just wrote."
            } 
            |> Async.Start
        
        (* Symptom Journal *)

        | User(Intent "symptom_journal" (_, None))::[] -> 
            say "Choose one of the following the writing prompts:"
            cui.Say symptom_writing_prompts
            echo <| sprintf "1. %s" symptom_writing_prompts.[0]
            echo <| sprintf "2. %s" symptom_writing_prompts.[1]
            echo <| sprintf "3. %s" symptom_writing_prompts.[2]
            doc <| Doc.Concat [
                Html.ol [cls "pagination"] [
                    Html.li [cls "page-item"] [Html.a [cls "page-link"; href "#"; Html.on.click(fun _ _ -> trigger "1" "1")] [Html.text "1"]]
                    Html.text "     "
                    Html.li [cls "page-item"] [Html.a [cls "page-link"; href "#"; Html.on.click(fun _ _ -> trigger "2" "2")] [Html.text "2"]]
                    Html.text "     "
                    Html.li [cls "page-item"] [Html.a [cls "page-link"; href "#"; Html.on.click(fun _ _ -> trigger "3" "3")] [Html.text "3"]]
                ]
            ]
            
        | User(Number n)::User(Intent "symptom_journal" (_, None))::[] -> 
            if (n <= 0 || n > 3) then
                say "Choose a writing prompt from 1 to 3."
            else
                add "journalentry" true
                add "journalentry_writingprompt" n
                echo <| sprintf "<span style='color:white;background-color:#7B68EE'>%A</span>" symptom_writing_prompts.[n - 1]
                say "Enter the symptoms you are having and I'll analyze it and add it to your journal."
        
        | User(Intent "journal" (_, Entity1Of1 "journal_entry" j))::User(Number n)::User(Intent "symptom_journal" (_, None))::[] ->
            popu()
            async {
                say "Ok let me analyze your symptoms."
                match! addEntry j.Value with
                | Ok _ -> 
                    popu()
                    popu()
                    processEntry()
                | Error e -> say "Sorry I was not able to add your journal entry. Could you try again? Press the up arrow to return to the text you just wrote."
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