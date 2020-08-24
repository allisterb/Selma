namespace SMApp.Web

open WebSharper
[<JavaScript>]
module Main =
    
    let update (cui: CUI) (context: NLUContext list) =
        cui.Say "I'm in the Main module."
        match context with
        | NLUContext m::_ when m.Intent = Programs -> 
            async { 
                let! p = Server.GetPatients()
                match p with
                | Ok r -> cui.Say "I got the patients"
                | _ -> cui.Say " I did not"
            } |> Async.Start
        | _ -> ()

