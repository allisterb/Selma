namespace SMApp.Web

open System.Collections.Generic

open FSharp.Control

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html

open SMApp.JQueryTerminal
open SMApp.WebSpeech


[<JavaScript>]
module Client =
         
    (* CUI state and options *)

    let context = new Stack<CUIContext>()
    let mutable currentVoice = Unchecked.defaultof<SpeechSynthesisVoice>
    let mutable currentTerm = Unchecked.defaultof<Terminal>
    let mutable debugMode = false
    let mutable transcribe = false
    
    (* Speech functions *)
    
    let initSpeech() =
        do 
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray
        do voices |> Array.iter(fun v-> 
            if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> && (v.Name.Contains "Microsoft Zira" || v.Name.ToLower().Contains "female") then
                currentVoice <- v; info <| sprintf "Using voice %s." currentVoice.Name
            )
        do if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> && voices.Length > 0 then
                let v = voices |> Array.find (fun v -> v.Default) in currentVoice <- v; info <| sprintf "Using voice %s." currentVoice.Name
                let u = new SpeechSynthesisUtterance(sprintf "Using the default speech synthesis voice.") in async { Window.SpeechSynthesis.Speak u } |> Async.Start
            else if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> then error "No speech synthesis voice is available. In order to use Selma you must install a speech synthesis voice on this device or computer."
        
    let say text =        
        async { 
            let u = new SpeechSynthesisUtterance(text)
            u.Voice <- currentVoice
            Window.SpeechSynthesis.Speak(u) 
        } |> Async.Start
        do if transcribe then currentTerm.Echo text
            
    let sayVoices() =
        let voices = Window.SpeechSynthesis.GetVoices() |> toArray
        sprintf "There are currently %i voices installed on this computer or device." voices.Length |> say
        for i = 0 to voices.Length - 1 do
            let v = voices.[i]
            sprintf "Voice %i. Name: %s, Local: %A." i v.Name v.LocalService |> say

    let sayRandom phrases = say <| getRandomPhrase phrases    
    
    let stopSpeaking = if Window.SpeechSynthesis.Speaking || Window.SpeechSynthesis.Pending then Window.SpeechSynthesis.Cancel()
    
    let wait (f:unit -> unit) =
        do async {f()} |> Async.Start
        do currentTerm.Echo'("please wait")
        do currentTerm.Disable()
        do f() 
        do currentTerm.Enable()

    let d =
        """
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
</div>
    """
    
    let container = SMApp.Bootstrap.Controls.Container

    /// Main interpreter
    let Main = 
        let main (term:Terminal) (command:string)  =
            currentTerm <- term
            do if currentVoice = Unchecked.defaultof<SpeechSynthesisVoice> then initSpeech()
            match command with
            | QuickHello _ -> sayRandom helloPhrases;
            | QuickHelp -> 
                term.EchoHtml' <| _h.str(_h.img [_h.cls "card-img-top";_h.src "..."])
            | DebugOn -> debugMode <- true; say "Debug mode is now on."  
            | DebugOff -> debugMode <- false; say "Debug mode is now off." 
            | Programs -> 
                say "The following programs are available:"
                availablePrograms |> List.iteri (fun i p -> sprintf "%i. %s" i p |> say)
            | Phrase -> 
                do currentTerm.Echo'("please wait")
                do term.Disable()
                async {
                    match! Server.GetMeaning command with
                    | HelloUser u -> say (sprintf "This is the hello intent. The user name is %s." u.Value)
                    | _ -> term.Echo' "This is the whatever intent"             
                    do term.Enable()
                } |> Async.Start
        let mainOpt =
            Options(
                Name="Main", 
                Greetings = "Welcome to Selma. Type hello to begin or help for more assistance.",
                Prompt =">"
            )
        Interpreter(main, mainOpt)
    
    let Term() = 
        Terminal("#main", ThisAction<Terminal, string>(fun term command -> Main.Func term command), Main.Options) |> ignore
        context.Push(InterpreterCtx Main)
        Doc.Empty