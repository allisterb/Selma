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
        
    /// Local commands
    let (|Help|DebugOn|NonLocal|) =
        function
        | "help" -> Help
        | "debug on" -> DebugOn
        | _ -> NonLocal 
    
    let (|Hello|_|) =
        function
        | Some(Intent "Hello" e) -> Some e
        | _ -> None

    let (|HelloUser|_|) =
        function
        | Hello (e::[]) when  e.Role = "contact" -> Some e
        | _ -> None
