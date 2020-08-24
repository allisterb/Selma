namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript

[<JavaScript;AutoOpen>]
module NLU =

    type Intent = Intent of string * float32 option
      with
          member x.Unwrap = match x with | Intent(n,c)->(n,c)
          member x.Name = let (n, _) = x.Unwrap in n
          member x.Confidence = let (_, c) = x.Unwrap in c
          override x.ToString() = sprintf "Intent(%s, %A)" x.Name x.Confidence

    type Trait = Trait of string * string
        with
            member x.Unwrap = match x with | Trait(n,v)->(n,v)
            member x.Name = let (n, _) = x.Unwrap in n
            member x.Value = let (_, v) = x.Unwrap in v
            override x.ToString() = sprintf "Trait(%s, %A)" x.Name x.Value
    
    type Entity = Entity of string * string * float32 option
        with
            member x.Unwrap = match x with | Entity(n,v,c)->(n, v, c)
            member x.Name = let (n, _, _) = x.Unwrap in n
            member x.Value = let (_, v, _) = x.Unwrap in v
            member x.Confidence = let (_, _, c) = x.Unwrap in c
            override x.ToString() = sprintf "Entity(%s, %s, %A)" x.Name x.Value x.Confidence

    type Meaning = Meaning of Intent * Trait option * Entity list option with
        member x.Unwrap() = match x with Meaning(i, t, el) -> i, t, el
        member x.Intent = let i, t, el = x.Unwrap() in i
        member x.Trait = let i, t, el = x.Unwrap() in t
        member x.Entities = let i, t, el = x.Unwrap() in el
        override x.ToString() = sprintf "%A %A. %A" x.Intent x.Trait x.Entities

    [<RequireQualifiedAccess>]
    module Voice =
        type Entity' = {body:string; ``end``:int; start: int; suggested:bool; value:string}
        
        let (|Entity'|_|)  :obj -> Entity option =
            function
            | o when o.GetJS("contact") |> isNull |> not -> Entity("contact", o.GetJS("contact").GetJS("value") :?> string, None) |> Some
            | _ -> None

        let (|Trait'|_|) : obj -> Trait option =
            function
            | o when o.GetJS("greetings") |> isNull |> not -> Trait("greetings", o.GetJS("contact").GetJS("value") :?> string) |> Some
            | _ -> None

        let (|Intent'|_|) :(obj * obj) -> Intent option =
            function
            | i, o when o.GetJS("intent") |> isNull |> not -> Intent(o.GetJS("intent").GetJS("value") :?> string, None) |> Some
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
            | "hi" -> Meaning(Intent("hello", None), None, None) |> Some
            | _ -> None

        let (|QuickHelp|_|) =
            function
            | "help"
            | "help me"
            | "what's this?"
            | "huh" -> Meaning(Intent("help", None), None, None) |> Some 
            | _ -> None    

        let (|QuickPrograms|_|) =
            function
            | "programs" -> Meaning(Intent("Program", None), None, None) |> Some
            | _ -> None

        [<JavaScript>]
        type Meaning' = Meaning' of Intent' list * Entity' list
        with 
            member x.Unwrap = match x with | Meaning'(i, e)-> i, e
            member x.Intents = let (i, e) = x.Unwrap in i
            member x.Entities = let (i, e) = x.Unwrap in e
            member x.TopIntent = x.Intents |> List.sortBy (fun i -> i.Confidence) |> List.head
        and
            [<JavaScript>]
            Intent' = Intent' of string * float32 
                with
                member x.Unwrap = match x with | Intent'(n,c)->(n,c)
                member x.Name = let (n, _) = x.Unwrap in n
                member x.Confidence = let (_, c) = x.Unwrap in c
        and 
            [<JavaScript>]
            Entity' = Entity' of string * float32 * string * string
                with
                member x.Unwrap = match x with | Entity'(n,c,r,v)->(n,c,r,v)
                member x.Name = let (n, _, _, _) = x.Unwrap in n
                member x.Confidence = let (_, c, _, _) = x.Unwrap in c
                member x.Role = let (_, _, r, _) = x.Unwrap in r
                member x.Value = let (_, _, _, v) = x.Unwrap in v
        
        let mutable intentConfidenceThreshold = 0.85f

        let mutable entityConfidenceThreshold = 0.85f
        
        let (|Intent'|_|) :Meaning'->(Meaning option) =
            function
            | m when m.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    let entities = m.Entities |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) |> List.map(fun e -> Entity(e.Name, e.Value, Some(e.Confidence))) 
                    Meaning(Intent(m.TopIntent.Name, Some m.TopIntent.Confidence), None, if entities.Length = 0 then None else Some(entities)) |> Some
            | _ -> None        