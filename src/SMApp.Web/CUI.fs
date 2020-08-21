namespace SMApp.Web

open WebSharper

[<AutoOpen;JavaScript>]
module CUI =
    let helloPhrases = [
        "Welcome"
        "Welcome to Selma"
        "Hi I'm Selma, how can I help?"
        "Hello I'm Selma, how can I help?"
    ]

    let helloUserPhrases = [
        "Welcome $user, nice to see you again.."
        "Welcome to Selma"
        "Hi I'm Selma, how can I help?"
        "Hello I'm Selma, how can I help?"
    ]

