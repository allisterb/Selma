namespace SMApp.Web

open WebSharper
[<JavaScript>]
module Main =
    
    let update (cui: CUI) (context: NLUContext list) =
        cui.Say "I'm in the Main module."


