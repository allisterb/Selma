namespace SMApp.Web

open System

open WebSharper

open SMApp.JQueryTerminal
open SMApp.WebSpeech
open SMApp.Microphone

type MicState = NotInitialized | Connecting | Disconnected | AudioStart | AudioEnd | Error of string | Result of obj*obj

type CUI = {
    Voice:SpeechSynthesisVoice option
    Mic: Mic option
    MicState: MicState 
    Term: Terminal
    Debug: bool
    Caption: bool
}

[<AutoOpen;JavaScript>]
module CUI =
    /// Basic user information for app authentication.
    [<JavaScript>]
    type User = {
        UserName: string
    }
    
    /// Interprets input entered by the user using voice or the terminal.
    [<JavaScript>]
    type Interpreter = Interpreter of (SMApp.Microphone.Mic -> (obj*obj) -> unit) * ((SMApp.JQueryTerminal.Terminal->string->unit) * SMApp.JQueryTerminal.Options)
        with
        member x.Unwrap = match x with | Interpreter(v, (i, o)) -> v, i, o
        member x.Voice = let v, i, o = x.Unwrap in v
        member x.Text = let v, i, o = x.Unwrap in i
        member x.Options = let v, i, o = x.Unwrap in o
    
    
    let rng = Random()
    
    let getRandomPhrase (phrases:List<'t>) = phrases |> List.item(rng.Next(0, phrases.Length))
    
    let helloPhrases = [
        "Welcome!"
        "Welcome, my name is Selma."
        "Welcome to Selma. How can I help?"
        "Hello this is Selma, how can I help?"
        "Hello, I am Selma. How can I help?"
        "Hello, I am Selma. How may I help you now?"
    ]

    let helloUserPhrases = [
        "Hi $user, welcome back."
        "Welcome $user, nice to see you again.."
        "Hello $user"
        "Good to see you $user."
    ]

