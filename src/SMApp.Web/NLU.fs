﻿namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript

[<JavaScript;AutoOpen>]
module NLU =
    type Intent = | Hello
      
    type Trait = | Greetings
    
    type Entity =
    | Contact of string

    type Meaning = Meaning of Intent * Trait option * Entity list option

    type NLUContext = NLUContext of Meaning

    [<RequireQualifiedAccess>]
    module Voice =
        type Entity' = {body:string; ``end``:int; start: int; suggested:bool; value:string}
        
        let (|Hello|_|) :obj -> Intent option =
            function
            | o when o :? string && (o :?> string).ToLower() = "default_intent" -> Intent.Hello |> Some
            | _ -> None

        let (|Greetings|_|) :obj -> Trait option =
            function
            | o when (o.GetJS("greetings") |> isNull |> not) && (o.GetJS("greetings").GetJS("value") |> isNull |> not) -> 
                Trait.Greetings |> Some
            | _ -> None

        let (|Contact|_|):obj -> Entity option =
            function
            | o when o.GetJS("contact") |> isNull |> not -> 
                let e ={
                    body = o.GetJS("body") :?> string 
                    ``end``= o.GetJS("end") :?> int 
                    start = o.GetJS "start" :?> int
                    suggested = o.GetJS("ff") :?> bool 
                    value= o.GetJS("value") :?> string
                } 
                e.value |> Entity.Contact |> Some
            | _ -> None

    [<RequireQualifiedAccess>]
    module Text =
        [<JavaScript>]
        type Meaning = Meaning of Intent list * Entity list
        with 
            member x.Unwrap = match x with | Meaning(i, e)-> i, e
            member x.Intents = let (i, e) = x.Unwrap in i
            member x.Entities = let (i, e) = x.Unwrap in e
            member x.TopIntent = x.Intents |> List.sortBy (fun i -> i.Confidence) |> List.head
        and
            [<JavaScript>]
            Intent = Intent of string * float32 
                with
                member x.Unwrap = match x with | Intent(n,c)->(n,c)
                member x.Name = let (n, _) = x.Unwrap in n
                member x.Confidence = let (_, c) = x.Unwrap in c
        and 
            [<JavaScript>]
            Entity = Entity of string * float32 * string * string
                with
                member x.Unwrap = match x with | Entity(n,c,r,v)->(n,c,r,v)
                member x.Name = let (n, _, _, _) = x.Unwrap in n
                member x.Confidence = let (_, c, _, _) = x.Unwrap in c
                member x.Role = let (_, _, r, _) = x.Unwrap in r
                member x.Value = let (_, _, _, v) = x.Unwrap in v
        
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
