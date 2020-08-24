namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript

[<JavaScript;AutoOpen>]
module NLU =

    type Intent = 
    | Hello 
    | Help 
    | Onboard 
    | Program 
      
    and Trait = | Greetings
    
    and Entity =
    | User of string
    | Contact of string

    type Meaning = Meaning of Intent * Trait option * Entity list option with
        member x.Unwrap() = match x with Meaning(i, t, el) -> i, t, el
        member x.Intent = let i, t, el = x.Unwrap() in i
        member x.Trait = let i, t, el = x.Unwrap() in t
        member x.Entities = let i, t, el = x.Unwrap() in el
        override x.ToString() = sprintf "Intent: %A. Trait: %A. Entities: %A" x.Intent x.Trait x.Entities

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
        let (|Blank|_|) =
            function
            | "" -> Some()
            | _ -> None

        let (|DebugOn|_|) =
            function
            | "debug on" -> Some ()
            | _ -> None

        let (|DebugOff|_|) =
            function
            | "debug off" -> Some ()
            | _ -> None

        let (|QuickHello|_|) =
            function
            | "hello"
            | "hey"
            | "yo"
            | "hi" -> Meaning(Hello, None, None) |> Some
            | _ -> None

        let (|QuickHelp|_|) =
            function
            | "help"
            | "help me"
            | "what's this?"
            | "huh" -> Meaning(Help, None, None) |> Some 
            | _ -> None    

        let (|QuickPrograms|_|) =
            function
            | "programs" -> Meaning(Program, None, None) |> Some
            | _ -> None

        [<JavaScript>]
        type Meaning' = Meaning' of Intent list * Entity list
        with 
            member x.Unwrap = match x with | Meaning'(i, e)-> i, e
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
        
        let (|Intent|_|) (name:string) :Meaning' -> (Entity list option) =
            function
            | m when m.TopIntent.Name = name && m.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    m.Entities 
                    |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                    |> Some
            | _ -> None
        
        let (|Hello|_|) =
            function
            | Some(Intent "Hello" []) -> Meaning(Intent.Hello, None, None) |> Some
            | _ -> None

        let (|HelloUser|_|) =
            function
            | Some(Intent "Hello" [e]) -> let user = e.Name |> User in Meaning(Hello, None, Some [user]) |> Some
            | _ -> None
