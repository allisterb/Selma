namespace SMApp.Web

open System

open WebSharper

[<AutoOpen;JavaScript>]
module CUI =
    let rng = Random()
    
    let getRandomPhrase (phrases:List<'t>) = phrases |> List.item(rng.Next(0, phrases.Length))
    
    let helloPhrases = [
        "Welcome!"
        "Welcome to Selma"
        "Welcome to Selma. How can I help?"
        "Hello this is Selma, how can I help?"
        "Hello how can I help?"
    ]

    let helloUserPhrases = [
        "Hi $user, welcome back."
        "Welcome $user, nice to see you again.."
        "Hello $user"
        "Good to see you $user."
    ]

