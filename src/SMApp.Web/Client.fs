namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.UI
open WebSharper.UI.Client

open SMApp.JQueryTerminal
open SMApp.WebSpeech
open SMApp.Microphone
open SMApp.BotLibre
open SMApp.TypingDNA

[<JavaScript>]
module Client =
    (* CUI state *)
    let mutable CUI = {
        Voice = None
        Mic = None
        Term = Unchecked.defaultof<Terminal>
        Avatar = 
            SDK.ApplicationId <- "4277115329081938617"
            let sdk = new SDKConnection()
            let web = new WebAvatar()
            web.Version <- 8.5
            web.Connection <- sdk
            web.Avatar <- "20926186"
            web.Voice <- "cmu-slt";
            web.VoiceMod <- "default";
            web.Width <- if JQuery(JS.Window).Width() <= 479 then 90 else 175
            web.CreateBox();
            web.AddMessage("")
            web.ProcessMessages(0)
            web
        Caption = false
        AudioHandlers = new Dictionary<string, Int16Array->unit>()
        TypingDNA = new TypingDNA()
    }
    let mutable MicState = MicNotInitialized
    let mutable ClientState = ClientNotInitialzed
    let cui() = CUI

    (* Console and terminal messages *)
    let echo m = CUI.Term.EchoHtml' <| sprintf "%A" m 
    let debug m = debug "CLIENT" m
    let wait (f:unit -> unit) =
        do 
            CUI.Term.Echo'("please wait")
            CUI.Term.Pause();f();CUI.Term.Resume()

    (* Dialogue state *)
    let Props = new Dictionary<string, obj>()
    let Output = new Stack<string>()
    let Questions = new Stack<Question>()
    let Utterances = new Stack<Utterance>()
    //let Dialogue = Dialogue(CUI, Props, Questions, Output, Utterances)
    //let push (m:Utterance) = Utterances.Push m; Dialogue

    (* Speech *)
    let synth = Window.SpeechSynthesis

    let initSpeech() =
        let voices = synth.GetVoices() |> toArray         
        if voices.Length > 0 then
            do voices |> Array.iter(fun v-> 
                if CUI.Voice = None && (v.Name.Contains "Microsoft Zira" || v.Name.ToLower().Contains "female") then
                    CUI <- { CUI with Voice = Some v }; debug <| sprintf "Using browser speech synthesis voice %s." CUI.Voice.Value.Name
                )
            if CUI.Voice <> None then
                CUI.Avatar.NativeVoice <- true
                CUI.Avatar.NativeVoiceName <- CUI.Voice.Value.Name
                debug <| sprintf "Using browser speech synthesis voice %s." CUI.Voice.Value.Name
        if CUI.Voice = None then  
            debug "No female browser speech synthesis voice is available. Using CMU SLT Female voice via TTS."

    let say' (text:string) = CUI.Say text         
    
    let say text =
        Output.Push text
        say' text
        
    let sayRandom t phrases = say <| getRandomPhrase phrases t
    
    (* Mic *)
    let initMic interpret  =
        CUI <- { CUI with Mic = Some(Mic()) }
        let mic = CUI.Mic.Value
        do mic.onConnecting <- (fun _ -> MicState <- MicConnecting; debug "Mic connecting...")
        do mic.onDisconnected <- (fun _ -> MicState <- MicDisconnected;debug "Mic disconnected.")
        do mic.onAudioStart <- (fun _ -> MicState <- MicAudioStart;debug "Mic audio start...")
        do mic.onAudioEnd <- (fun _ -> 
            debug "Mic audio end." 
            for kv in CUI.AudioHandlers do 
                debug <| sprintf "Executing audio handler %s." kv.Key
                MicState <- MicAudioHandled kv.Key
                let h = kv.Value
                CUI.AudioHandlers.Remove kv.Key |> ignore
                h(lastMicData())
        )
        do mic.onError <- (fun s -> MicState <- MicError s; debug (sprintf "Mic error : %s." s))
        do mic.onReady <- (fun _ -> MicState <- MicReady; debug "Mic ready.")
        do mic.onResult <- (fun i e -> 
            match ClientState with
            | ClientReady ->
                match MicState with
                | MicAudioHandled _ -> ()
                | _ ->
                    if not (isNull i || isNull e) then 
                        MicState <- MicResult(i,e) 
                        debug <| sprintf "Mic result: %A %A." i e
                        interpret (i,e)
                    else 
                        debug "Mic: No result returned."        
            | ClientUnderstand -> echo "I'm still trying to understand what you said before."
            | ClientNotInitialzed -> error "Client is not intialized."
            )
        do mic.Connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT")
    
    /// Mic interpreter
    let main' (command:obj*obj) =
        let Dialogue = Dialogue(CUI, Props, Questions, Output, Utterances)
        let push (m:Utterance) = Utterances.Push m; Dialogue
        let i, e = command
        debug <| sprintf "Voice: %A %A" i e
        let intent = 
            match i, e with
            | Voice.Intent' i -> Some i
            | _ -> None
        let _trait = 
            match e with
            | Voice.Trait' t -> Some [t]
            | _ -> None
        let entity = 
            match e with
            | Voice.Entity' entity -> Some [entity]
            | _ -> None
        match (intent, _trait, entity) with
        | None, None, None -> ()
        | _ -> 
            debug <| sprintf "Voice: %A %A %A" intent _trait entity
            Utterance("", intent, _trait, entity) |> push |> Main.update

    /// Main interpreter
    let Main =             
        
        /// Terminal interpreter 
        let main (term:Terminal) (command:string)  =
            CUI <- { CUI with Term = term }
            do 
                if CUI.Mic = None then initMic main'
                if CUI.Voice = None then initSpeech()
            do if ClientState = ClientNotInitialzed then ClientState <- ClientReady
            
            let Dialogue = Dialogue(CUI, Props, Questions, Output, Utterances)
            let push (m:Utterance) = Utterances.Push m; Dialogue
            
            match command with
            (* Journal entry *)
            | j when Dialogue.Props.ContainsKey "journalentry" -> 
                debug "Routing input as journal entry."
                Utterance("journal", Some(Intent("journal", Some 1.0f)), None, Some([Entity("journal_entry", "", j, Some 1.0f)])) |> push |> Journal.update

            (* Quick commands *)
            | Text.Blank -> say' "Tell me what you want me to do or ask me a question."
            | Text.Debug ->
                debug <| sprintf "Utterances: %A" Utterances
                debug <| sprintf "Questions: %A" Questions
                for p in Props do debug <| sprintf "%s: %A"  p.Key p.Value
            | Text.DebugEntities e ->
                async {
                    match! Server.getEntities e with
                    | Ok entities -> 
                        for entity in entities do debug <|sprintf "%A" entity
                        echo "Entities:"
                        for entity in entities do echo <| sprintf "<span style='color:white;background-color:#7B68EE'>%A</span>" entity
                    | Error e -> debug e
                } |> CUI.Wait

            | Text.DebugLemmas e ->
                async {
                    match! Server.getMainLemmas e with
                    | Ok lemmas -> 
                        for lemma in lemmas do 
                            debug <|sprintf "%A" lemma
                        echo "Lemmas:"
                        for lemma in lemmas do echo <| sprintf "<span style='color:white;background-color:#FFC0CB'>%A</span>" lemma
                    | Error e -> debug e
                } |> CUI.Wait

            | Text.DebugTriples dt ->
                async {
                    match! Server.getTriples dt with
                    | Ok c -> 
                        for r in c do for e in r do debug <| sprintf "%A" e
                        echo "Triples:"
                        for triple in c do echo <| sprintf "<span style='color:white;background-color:#00FA9A'>%A</span>" triple
                    | Error e -> debug e
                } |> CUI.Wait

            | Text.DebugEmotionalTraits et ->
                async {
                    match! Server.getEmotionalTraits et with
                    | Ok t -> 
                        for e in t do debug <| sprintf "%A" e
                        echo "Emotional Traits:"
                        for tr in t do echo <| sprintf "<span style='color:white;background-color:#FF4500'>%A</span>" tr
                    | Error e -> debug e
                } |> CUI.Wait

            | Text.DebugBehavioralTraits bt ->
                async {
                    match! Server.getBehavioralTraits bt with
                    | Ok t -> 
                        for e in t do debug <| sprintf "%A" e
                        echo "Behavioral Traits:"
                        for tr in t do echo <| sprintf "<span style='color:white;background-color:#FF4500'>%A</span>" tr
                    | Error e -> debug e
                } |> CUI.Wait

            | Text.Voices -> 
                let voices = speechSynthesis().GetVoices() |> toArray    
                sprintf "There are currently %i voices installed on this computer or device." voices.Length |> say'
                voices |> Array.iteri (fun i v -> sprintf "Voice %i. Name: %s, Local: %A." i v.Name v.LocalService |> say')
            
            | _ ->
                match ClientState with
                | ClientUnderstand -> say' "I'm still trying to understand what you said before."
                | ClientReady ->
                    match command with
                    (* Quick commands *)
                    | Text.QuickHello m 
                    | Text.QuickHelp m 
                    | Text.QuickYes m
                    | Text.QuickNo m 
                    | Text.QuickNumber m -> 
                        debug <| sprintf "Quick Text: %A." m                        
                        m |> push |> Main.update
                        ClientState <- ClientReady
                    | Text.JournalEntry m ->
                        debug <| sprintf "Journal entry: %A." m                        
                        m |> push |> Main.update
                        ClientState <- ClientReady
                    (* Use the NLU service for everything else *)
                    | _->         
                        async {
                            ClientState <- ClientUnderstand
                            NLU.Text.getUtterance command (fun meaning ->
                                match meaning with
                                | Text.HasUtterance m -> 
                                    debug <| sprintf "Text: Intent: %A, Traits: %A, Entities: %A." m.Intent m.Traits m.Entities
                                    m |> push |> Main.update
                                | _ -> 
                                    debug "Text: Did not receive a meaning from the server." 
                                    say' "Sorry I did not understand what you said."
                            )
                            ClientState <- ClientReady
                        } |> CUI.Wait
                | ClientNotInitialzed -> error "Client is not initialized."
        let mainOpt =
            Options(
                Name="Main", 
                Greetings = "Welcome to Selma. Enter 'hello' or 'hello my name is...(you) to initialize speech.",
                Prompt =">"
            )       
        Interpreter(main', (main, mainOpt))
    
    let run() =        
        let term =  Terminal("#term", ThisAction<Terminal, string>(fun term command -> Main.Text term command), Main.Options)
        CUI <- { CUI with Term = term }
        let Dialogue = Dialogue(CUI, Props, Questions, Output, Utterances)
        let push (m:Utterance) = Utterances.Push m; Dialogue
        
        CUI.EchoDoc <| Doc.Concat [
            Bs.btnSuccess "hello" (fun _ _ -> initMic(main');initSpeech();quick_utter "greet" |> push |> SMApp.Web.Main.update)
            Html.text "     "
            Bs.btnPrimary "help" (fun _ _ -> initMic(main');initSpeech();quick_utter "help" |> push |> SMApp.Web.Main.update)
        ]

        Doc.Empty