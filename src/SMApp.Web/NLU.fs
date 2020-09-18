namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript

open SMApp.NLU.Wit

[<JavaScript;AutoOpen>]
module NLU =
    type Intent = Intent of string * float32 option
      with
          member x.Unwrap = match x with | Intent(n, c)->(n, c)
          member x.Name = let (n, _) = x.Unwrap in n
          member x.Confidence = let (_, c) = x.Unwrap in c
          override x.ToString() = sprintf "Intent(%s, %A)" x.Name x.Confidence

    type Trait = Trait of string * string
        with
            member x.Unwrap = match x with | Trait(n, v)->(n, v)
            member x.Name = let (n, _) = x.Unwrap in n
            member x.Value = let (_, v) = x.Unwrap in v
            override x.ToString() = sprintf "Trait(%s, %A)" x.Name x.Value
    
    type Entity = Entity of string * string * float32 option
        with
            member x.Unwrap = match x with | Entity(n, v, c)->(n, v, c)
            member x.Name = let (n, _, _) = x.Unwrap in n
            member x.Value = let (_, v, _) = x.Unwrap in v
            member x.Confidence = let (_, _, c) = x.Unwrap in c
            override x.ToString() = sprintf "Entity(%s, %s, %A)" x.Name x.Value x.Confidence

    type Meaning = Meaning of Intent option * Trait option * Entity list option with
        member x.Unwrap() = match x with Meaning(i, t, el) -> i, t, el
        member x.Intent = let i, t, el = x.Unwrap() in i
        member x.Trait = let i, t, el = x.Unwrap() in t
        member x.Entities = let i, t, el = x.Unwrap() in if el.IsSome then el.Value |> List.sortBy(fun e -> e.Name) |> Some else None
        override x.ToString() = sprintf "%A %A %A" x.Intent x.Trait x.Entities

    type Meaning' = Trait option * Entity list option

    type Question = Question of string * string
    with 
        member x.Unwrap() = match x with | Question(n, t)-> n, t
        member x.Name = x.Unwrap() |> fst 
        member x.Text = x.Unwrap() |> snd
        override x.ToString() = sprintf "Name: %s Text: %s" x.Name x.Text

    let (|Intent|_|) n :Meaning -> Meaning' option= 
        function
        | m when m.Intent.IsSome && m.Intent.Value.Name = n -> let _, t, el = m.Unwrap() in (t, el) |> Some
        | _ -> None
        
    let (|Entity1Of1|_|) (n:string) :Entity list option -> Entity option = 
        function
        | Some(entity::[]) when entity.Name = n -> Some entity
        | _ -> None

    let (|EntityManyOf1|_|) (n:string) :Entity list option -> Entity list option = 
        function
        | Some entities when entities |> List.exists(fun e -> e.Name = n) -> entities |> List.where(fun e -> e.Name = n) |> Some  
        | _ -> None

    let (|EntityManyofMany|_|) (names:string list) :Entity list -> Map<string, Entity list option> option = 
        function
        | el -> 
            let matches = 
                names |> List.map(fun n -> if (el |> List.exists(fun e -> e.Name = n)) then (n, Some(el |> List.where(fun e' -> e'.Name = n))) else (n ,None)) |> Map.ofList
            Some matches
        
    let (|Yes|_|) :Meaning -> Meaning option= 
        function 
        | Intent "yes" (None, None) as m -> Some m
        | Intent "yesresponse" (None, None) as m -> Some m
        | Intent "YesResponse" (None, None) as m -> Some m
        |  _ -> None

    let (|No|_|) :Meaning -> Meaning option= 
        function 
        | Intent "no" (None, None) as m  -> Some m
        | Intent "noresponse" (None, None) as m  -> Some m
        | Intent "NoResponse" (None, None) as m  -> Some m
        |  _ -> None

    [<RequireQualifiedAccess>]
    module Voice =
        type Entity' = {body:string; ``end``:int; start: int; suggested:bool; value:string}
        
        let (|Entity'|_|)  :obj->Entity option =
            function
            | o when o.GetJS("contact") |> isNull |> not -> Entity("contact", o.GetJS("contact").GetJS("value") :?> string |> toLower, None) |> Some
            | _ -> None

        let (|Trait'|_|) : obj -> Trait option =
            function
            | o when o.GetJS("greetings") |> isNull |> not -> Trait("greetings", o.GetJS("contact").GetJS("value") :?> string |> toLower) |> Some
            | _ -> None

        let (|Intent'|_|) :(obj * obj) -> Intent option =
            function
            | i, o when o.GetJS("intent") |> isNull |> not -> Intent(o.GetJS("intent").GetJS("value") :?> string |> toLower, None) |> Some
            | _ -> None

    [<RequireQualifiedAccess>]
    module Text =
       
        let (|Blank|_|) =
            function
            | "" -> Some()
            | _ -> None

        let (|Debug|_|) =
            function
            | "debug" -> Some ()
            | _ -> None

        let (|Voices|_|) =
            function
            | "voices" -> Some ()
            | _ -> None

        let (|QuickHello|_|) =
            function
            | "hello"
            | "hey"
            | "yo"
            | "hi" -> Meaning(Some(Intent("hello", Some 1.0f)), None, None) |> Some
            | _ -> None

        let (|QuickHelp|_|) =
            function
            | "help"
            | "help me"
            | "what's this?"
            | "huh" -> Meaning(Some(Intent("help", Some 1.0f)), None, None) |> Some 
            | _ -> None    

        let (|QuickYes|_|) =
            function
            | "yes"
            | "YES"
            | "Yes"
            | "YEs"
            | "Yes"
            | "ok"
            | "sure"
            | "yeah" 
            | "yep" 
            | "uh huh" 
            | "go ahead" 
            | "go" -> Meaning(Some(Intent("yes", Some 1.0f)), None, None) |> Some 
            | _ -> None

        let (|QuickNo|_|) =
            function
            | "no"
            | "NO"
            | "No"
            | "no"
            | "nope"          
            | "no way" 
            | "nah" 
            | "don't do it" 
            | "stop" -> Meaning(Some(Intent("no", Some 1.0f)), None, None) |> Some 
            | _ -> None

        let (|One|_|) =
            function
            | "1"
            | "one" -> Meaning(Some(Intent("questionresponse", Some 1.0f)), None, Some([Entity("wit/ordinal", "one", Some 1.0f)])) |> Some
            | _ -> None

        let (|Two|_|) =
            function
            | "2"
            | "two" -> Meaning(Some(Intent("questionresponse", Some 1.0f)), None, Some([Entity("wit/ordinal", "two", Some 1.0f)])) |> Some
            | _ -> None

        let (|Three|_|) =
            function
            | "3"
            | "three" -> Meaning(Some(Intent("questionresponse", Some 1.0f)), None, Some([Entity("wit/ordinal", "three", Some 1.0f)])) |> Some
            | _ -> None

        let (|QuickNumber|_|) =
            function
            | One m 
            | Two m -> Some m
            | _ -> None

        let (|QuickPrograms|_|) =
            function
            | "programs" -> Meaning(Some(Intent("Program", None)), None, None) |> Some
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

        let private witapi = new WitApi("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT")
         
        let entity_types = ["wit$contact:contact"]
        let getMeaning sentence m =
            witapi.getMeaning(sentence, 
                (
                    fun o _ _ -> 
                        debug "NLU" <| sprintf  "Wit.ai returned: %A" o
                        let intents = 
                            if not (isNull(o.GetJS("intents"))) then
                                o.GetJS<obj array>("intents") 
                                |> Array.map (fun i -> Intent'(i.GetJS<string>("name"), i.GetJS<float32>("confidence")))    
                                |> List.ofArray  
                            else []
                        let entities =
                            if not (isNull(o.GetJS("intents"))) then
                                entity_types 
                                |> List.where(fun et -> not(isNull(o.GetJS("entities").GetJS<obj array>(et)))) 
                                |> List.map(fun et -> o.GetJS("entities").GetJS<obj array>(et) |> Array.map(fun e -> Entity'(e.GetJS<string>("name"), e.GetJS<float32>("confidence"), e.GetJS<string>("role"), e.GetJS<string>("value"))))
                                |> Seq.concat
                                |> List.ofSeq
                            else []
                        m (Some(Meaning'(intents, entities)))
                ), 
                    fun s e _ ->  
                        error <| sprintf  "Wit.ai returned: %A %A" s e
                        m (None)
                )
 
        let mutable intentConfidenceThreshold = 0.85f

        let mutable entityConfidenceThreshold = 0.85f
        
        let (|HasMeaning|_|) :Meaning' option ->(Meaning option) =
            function
            | Some(Meaning'([], entities)) when entities.Length > 0 -> 
                let entities' = 
                    entities 
                    |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                    |> List.map(fun e -> Entity(e.Role |> toLower, e.Value, Some(e.Confidence)))
                Meaning(None, None, Some entities') |> Some

            | Some(Meaning'(intents, [])) as m when intents.Length > 0 && m.Value.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    Meaning(Some(Intent(m.Value.TopIntent.Name |> toLower, Some m.Value.TopIntent.Confidence)), None, None) |> Some
            
            | Some(Meaning'(intents, entities)) as m when intents.Length > 0 && entities.Length > 0 && m.Value.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    let entities = 
                        m.Value.Entities |> 
                        List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                        |> List.map(fun e -> Entity(e.Role |> toLower, e.Value, Some(e.Confidence))) 
                    Meaning(Some(Intent(m.Value.TopIntent.Name |> toLower, Some m.Value.TopIntent.Confidence)), None, Some(entities)) |> Some
            
            | _ -> None        