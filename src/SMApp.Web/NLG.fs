namespace SMApp.Web

open WebSharper

open System
[<AutoOpen;JavaScript>]
module NLG =
    let rng = Random()
    
    let replace_tok (token:string) (value:string) (s:string) = s.Replace(token, value)

    let getRandomPhrase (phrases:List<string>) r = phrases |> List.item(rng.Next(0, phrases.Length)) |> replace_tok "$0" r
    
    let getRandomPhrase' (phrases:List<string>)  = phrases |> List.item(rng.Next(0, phrases.Length)) |> replace_tok "$0" ""

    let helloPhrases = [
        "Welcome!"
        "Welcome, my name is Selma."
        "Welcome to Selma. How can I help?"
        "Hello this is Selma, how can I help?"
        "Hello, I am Selma. How can I help?"
        "Hello, I am Selma. How may I help you now?"
        "I'm Selma. Tell me your name so we can get started."
    ]

    let helloUserPhrases = [
        "Hello $0, welcome back."
        "Welcome $0, nice to see you again."
        "Hello $0."
        "Good to see you $0."
        "Hello $0, nice to see you."
    ]

    let helpPhrases = [
        "What can I help you with $0?"
    ]

    let waitRetrievePhrases = [
        "Ok, let me check that $0 for you"
        "Please wait while I check that $0 for you."
        "Wait while I check that $0."
        "Ok let me see if I can find that $0."
    ]

    let waitAddPhrases = [
        "Ok, let me add that $0 for you"
        "Please wait while I add that $0 for you."
        "Wait while I add that $0."
        "I'll add that $0 now."
    ]

