namespace SMApp.Web

open WebSharper

[<AutoOpen;JavaScript>]
module NLU =
    let mutable intentConfidenceThreshold = 0.85f

    let mutable entityConfidenceThreshold = 0.85f

    let (|Intent|_|) (name:string) :Meaning -> (Entity list option) =
        function
        | m when m.TopIntent.Name = name && m.TopIntent.Confidence > intentConfidenceThreshold  -> 
                m.Entities 
                |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                |> Some
        | _ -> None
        
    /// Quick commands that can be parsed without using the NLU service
    let (|QuickHelp|QuickVoices|DebugOn|DebugOff|QuickVoice1|QuickVoice2|Phrase|) =
        function
        | "help" -> QuickHelp
        | "voices" -> QuickVoices
        | "debug on" -> DebugOn
        | "debug off"-> DebugOff
        | "voice 1" -> QuickVoice1
        | "voice 2" -> QuickVoice2
        | _ -> Phrase 
    
    let (|Hello|_|) =
        function
        | Some(Intent "Hello" e) -> Some e
        | _ -> None

    let (|HelloUser|_|) =
        function
        | Hello (e::[]) when  e.Role = "contact" -> Some e
        | _ -> None
