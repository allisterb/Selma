namespace SMApp.Web

open System

open WebSharper

[<AutoOpen;JavaScript>]
module CUI =
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

