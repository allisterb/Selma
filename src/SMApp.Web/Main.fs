namespace SMApp.Web

open WebSharper
[<JavaScript>]
module Main =
    
    let mutable context: NLUContext list = [] // NLU context
    
    let updateCtx (cui: CUI) (m:Meaning) =
        context <- (context @ [NLUContext m])


