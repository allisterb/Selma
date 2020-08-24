namespace SMApp.Web

open WebSharper
[<JavaScript>]
module Main =
    let update (cui: CUI) (context: NLUContext list) =
        cui.Debug <| sprintf "Main update ctx: %A." context
        match context with
        | NLUContext m::_ when m.Intent = Programs -> 
            async { 
                let! p = Server.GetPatients()
                match p with
                | Ok r -> cui.Debug <| sprintf "Got %i patients." r.Length
                | Error s -> cui.Debug <| sprintf "Error %s" s
            } |> cui.Wait 
        | _ -> ()

