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
                | Ok r -> cui.DebugEcho <| sprintf "Got %i patients." r.Length
                | Error s -> cui.DebugEcho <| sprintf "Error %s" s
            } |> cui.Wait 
        | _ -> ()

