namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
[<JavaScript;AutoOpen>]
module NLU =
    let mutable intentConfidenceThreshold = 0.85f

    let mutable entityConfidenceThreshold = 0.85f

    [<JavaScript; RequireQualifiedAccess>]
    module Voice =
        type Entity = {body:string; ``end``:int; start: int; suggested:bool; value:string}
        
        let (|Greetings|_|):obj -> obj option =
            function
            | o when (o.GetJS("greetings") |> isNull |> not) && (o.GetJS("greetings").GetJS("value") |> isNull |> not) -> 
                o.GetJS("greetings").GetJS("value") |> Some
            | _ -> None

        let (|Contact|_|):obj -> Entity option =
            function
            | o when o.GetJS("contact") |> isNull |> not -> 
                {
                    body = o.GetJS("body") :?> string 
                    ``end``= o.GetJS("end") :?> int 
                    start = o.GetJS "start" :?> int
                    suggested = o.GetJS("ff") :?> bool 
                    value= o.GetJS("value") :?> string
                } |> Some
            | _ -> None

    let availablePrograms = [
        "Depression"
        "Arthritis"
    ]
    let (|Intent|_|) (name:string) :Meaning -> (Entity list option) =
        function
        | m when m.TopIntent.Name = name && m.TopIntent.Confidence > intentConfidenceThreshold  -> 
                m.Entities 
                |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                |> Some
        | _ -> None
        
    /// Quick commands that can be parsed without using the NLU service
    let (|QuickHello|QuickHelp|DebugOn|DebugOff|Programs|Phrase|) =
        function
        | "hello"
        | "hey"
        | "yo"
        | "hi" ->
                QuickHello
        | "help" -> QuickHelp
        | "debug on" -> DebugOn
        | "debug off" -> DebugOff
        | s when s.ToLower() = "programs" -> Programs
        | _ -> Phrase 
    
    let (|Hello|_|) =
        function
        | Some(Intent "Hello" e) -> Some e
        | _ -> None

    let (|HelloUser|_|) =
        function
        | Hello (e::[]) when  e.Role = "contact" -> Some e
        | _ -> None
