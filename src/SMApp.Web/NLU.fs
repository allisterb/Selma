namespace SMApp.Web

open WebSharper

[<AutoOpen;JavaScript>]
module NLU =
    let mutable intentConfidenceThreshold = 0.8f

    let mutable entityConfidenceThreshold = 0.8f

    let (|Intent|_|) (name:string) :Meaning -> (Entity list option) =
        function
        | m when m.TopIntent.Name = name && m.TopIntent.Confidence > intentConfidenceThreshold  -> 
                m.Entities 
                |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                |> Some
        | _ -> None
        