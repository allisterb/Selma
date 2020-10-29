namespace SMApp.Web

open System

open WebSharper
open WebSharper.JavaScript

open SMApp.NLU

[<JavaScript;AutoOpen>]
module NLU =
    type Intent = Intent of string * float32 option
      with
          member x.Name = let (Intent(n, _)) = x in n
          member x.Confidence = let (Intent(_, c)) = x in c
          override x.ToString() = sprintf "Intent(%s, %A)" x.Name x.Confidence
    
    type Trait = Trait of string * string * float32 option
        with
            member x.Name = let (Trait(n, _, _)) = x in n
            member x.Value = let (Trait(_, v, _)) = x in v
            member x.Confidence = let (Trait(_, _, c)) = x in c
            override x.ToString() = sprintf "Trait(%s, %A)" x.Name x.Value

    type Entity = Entity of string * string * string * float32 option
        with
            member x.Name = let (Entity(n, _, _, _)) = x in n
            member x.Role = let (Entity(_, r, _, _)) = x in r
            member x.Value = let (Entity(_, _,v,_)) = x in v
            member x.Confidence = let (Entity(_, _, _, c)) = x in c
            override x.ToString() = sprintf "Entity(%s, %s, %s, %A)" x.Name x.Role x.Value x.Confidence

    type Utterance = Utterance of string * Intent option * Trait list option * Entity list option with
        member x.Text = let (Utterance(t, _, _, _)) = x in t
        member x.Intent = let (Utterance(_,i, _, _)) = x in i
        member x.Traits = let (Utterance(_, _, tl, _)) = x in if tl.IsSome then tl.Value |> List.sortBy(fun e -> e.Name) |> Some else None
        member x.Entities = let (Utterance(_, _, _, el)) = x in if el.IsSome then el.Value |> List.sortBy(fun e -> e.Name) |> Some else None
        override x.ToString() = sprintf "%A %A %A" x.Intent x.Traits x.Entities

    type Utterance' = Trait list option * Entity list option

    type Question = Question of string * string * QuestionType with 
        member x.Name = let (Question(n, _, _)) = x in n 
        member x.Text = let (Question(_, t, _)) = x in t
        member x.Type = let (Question(_, _, ty)) = x in ty
        override x.ToString() = sprintf "Name: %s Text: %s" x.Name x.Text
    
    and QuestionType =
    | Verification of bool
    | Disjunctive of string * string
    | ConceptCompletion of string
    
    let (|Intent|_|) n :Utterance -> Utterance' option= 
        function
        | m when m.Intent.IsSome && m.Intent.Value.Name = n -> (m.Traits, m.Entities) |> Some
        | _ -> None
        
    let (|Entity1Of1|_|) (r:string) :Entity list option -> Entity option = 
        function
        | Some(entity::[]) when entity.Role = r -> Some entity
        | _ -> None

    let (|Entity1OfAny|_|) (r:string) :Entity list option -> Entity option = 
        function
        | Some el when el |> List.exists(fun e -> e.Role = r) -> 
            el |> List.where(fun e -> e.Role = r) 
            |> List.sortBy(fun e -> e.Role)
            |> List.head 
            |> Some 
        | _ -> None

    let (|EntityManyOf1|_|) (r:string) :Entity list option -> Entity list option = 
        function
        | Some entities when entities |> List.exists(fun e -> e.Role = r) -> entities |> List.where(fun e -> e.Role = r) |> Some  
        | _ -> None

    let (|EntityManyofMany|_|) (roles:string list) :Entity list -> Map<string, Entity list option> option = 
        function
        | el -> 
            let matches = 
                roles |> List.map(fun r -> if (el |> List.exists(fun e -> e.Role = r)) then (r, Some(el |> List.where(fun e' -> e'.Role = r))) else (r ,None)) |> Map.ofList
            Some matches
        
    let (|Yes|_|) :Utterance -> Utterance option= 
        function 
        | Intent "verify" (None, None) as m -> Some m
        |  _ -> None

    let (|No|_|) :Utterance -> Utterance option= 
        function 
        | Intent "reject" (None, None) as m -> Some m
        |  _ -> None

    [<RequireQualifiedAccess>]
    module Voice =
        type Entity' = {body:string; ``end``:int; start: int; suggested:bool; value:string}
        
        let (|Entity'|_|)  :obj->Entity option =
            function
            | o when o.GetJS("contact") |> isNull |> not -> Entity("contact", "", o.GetJS("contact").GetJS("value") :?> string |> toLower, None) |> Some
            | _ -> None

        let (|Trait'|_|) : obj -> Trait option =
            function
            | o when o.GetJS("domain") |> isNull |> not -> Trait("domain", o.GetJS("domain").GetJS("value") :?> string |> toLower, None) |> Some
            | o when o.GetJS("dialogue_act") |> isNull |> not -> Trait("dialogue_act", o.GetJS("dialogue_act").GetJS("value") :?> string |> toLower, None) |> Some
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
            | "hi" -> Utterance("hello", Some(Intent("greet", Some 1.0f)), None, None) |> Some
            | _ -> None

        let (|QuickHelp|_|) =
            function
            | "help"
            | "help me"
            | "what's this?"
            | "huh" -> Utterance("help", Some(Intent("help", Some 1.0f)), None, None) |> Some 
            | _ -> None    

        let (|QuickYes|_|) =
            function
            | "yes"
            | "ok"
            | "sure"
            | "yeah" 
            | "yep" 
            | "uh huh" 
            | "go ahead" 
            | "go" -> Utterance("yes", Some(Intent("verify", Some 1.0f)), None, None) |> Some 
            | _ -> None

        let (|QuickNo|_|) =
            function
            | "no"
            | "nope"          
            | "no way" 
            | "nah" 
            | "don't do it" 
            | "stop" -> Utterance("no", Some(Intent("reject", Some 1.0f)), None, None) |> Some 
            | _ -> None

        let (|One|_|) =
            function
            | "1"
            | "one" -> Utterance("one", Some(Intent("questionresponse", Some 1.0f)), None, Some([Entity("wit/ordinal", "", "one", Some 1.0f)])) |> Some
            | _ -> None

        let (|Two|_|) =
            function
            | "2"
            | "two" -> Utterance("two", Some(Intent("questionresponse", Some 1.0f)), None, Some([Entity("wit/ordinal", "", "two", Some 1.0f)])) |> Some
            | _ -> None

        let (|Three|_|) =
            function
            | "3"
            | "three" -> Utterance("three", Some(Intent("questionresponse", Some 1.0f)), None, Some([Entity("wit/ordinal", "", "three", Some 1.0f)])) |> Some
            | _ -> None

        let (|QuickNumber|_|) =
            function
            | One m 
            | Two m -> Some m
            | _ -> None

        [<JavaScript>]
        type Utterance' = Utterance' of string * Intent' list * Entity' list * Trait' list
        with 
            member x.Text = let (Utterance'(t,_, _, _)) = x in t
            member x.Intents = let (Utterance'(_,i, _, _)) = x in i
            member x.Entities = let (Utterance'(_,_, e, _)) = x in e
            member x.Traits = let (Utterance'(_,_,_,t)) = x in t
            member x.TopIntent = x.Intents |> List.sortBy (fun i -> i.Confidence) |> List.head
        and
            [<JavaScript>]
            Intent' = Intent' of string * float32 
                with
                member x.Name = let (Intent'(n, _)) = x in n
                member x.Confidence = let (Intent'(_, c)) = x in c
        and 
            [<JavaScript>]
            Entity' = Entity' of string * float32 * string * string
                with
                member x.Unwrap = match x with | Entity'(n,c,r,v)->(n,c,r,v)
                member x.Name = let (n, _, _, _) = x.Unwrap in n
                member x.Confidence = let (_, c, _, _) = x.Unwrap in c
                member x.Role = let (_, _, r, _) = x.Unwrap in r
                member x.Value = let (_, _, _, v) = x.Unwrap in v

        and
            [<JavaScript>]
            Trait' = Trait' of string * float32 * string 
                with
                member x.Unwrap = match x with | Trait'(n,c,v)->(n,c,v)
                member x.Name = let (n, _, _) = x.Unwrap in n
                member x.Confidence = let (_, c, _) = x.Unwrap in c
                member x.Value = let (_, _, v) = x.Unwrap in v

        let private entity_types = ["wit$contact:name"; "wit$datetime:datetime"; "term:subject"; "term:object"; "term:verb";]

        let private trait_types = ["domain"; "dialogue_act"]

        let getUtterance sentence m =
            Witai.getMeaning "4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT" sentence 
               (Action<obj, string, JQuery.JqXHR>(
                    fun o _ _ -> 
                        debug "NLU" <| sprintf  "Wit.ai returned: %A" o
                        let intents = 
                            if not (isNull(o.GetJS("intents"))) then
                                o.GetJS<obj array>("intents") 
                                |> Array.map (fun i -> Intent'(i.GetJS<string>("name"), i.GetJS<float32>("confidence")))    
                                |> List.ofArray  
                            else []                        
                        let traits =
                            if not (isNull(o.GetJS("traits"))) then
                                trait_types 
                                |> List.where(fun tt -> not(isNull(o.GetJS("traits").GetJS<obj array>(tt)))) 
                                |> List.map(fun tt -> o.GetJS("traits").GetJS<obj array>(tt) |> Array.map(fun t -> Trait'(tt, t.GetJS<float32>("confidence"), t.GetJS<string>("value"))))
                                |> Seq.concat
                                |> List.ofSeq
                            else []                       
                        let entities =
                            if not (isNull(o.GetJS("entities"))) then
                                entity_types 
                                |> List.where(fun et -> not(isNull(o.GetJS("entities").GetJS<obj array>(et)))) 
                                |> List.map(fun et -> o.GetJS("entities").GetJS<obj array>(et) |> Array.map(fun e -> Entity'(e.GetJS<string>("name"), e.GetJS<float32>("confidence"), e.GetJS<string>("role"), e.GetJS<string>("value"))))
                                |> Seq.concat
                                |> List.ofSeq
                            else []
                        m (Some(Utterance'(sentence, intents, entities, traits)))
                ))
                (Action<JQuery.JqXHR, string, string>( 
                    fun _ s e ->  
                        error <| sprintf  "Wit.ai returned: %A %A" s e
                        m (None)
                ))

        let getUtterance2 sentence = 
            async {
                let! m = Witai.getMeaning2 "4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT" sentence
                debug "NLU" <| sprintf "Wit.ai returned %A " m
                let intents = m.intents |> Array.map(fun a -> Intent'(a.name, a.confidence)) |> List.ofArray
                let entities = m.entities |> Map.toSeq |> Seq.map snd |> Seq.concat |> List.ofSeq |> List.map(fun e -> Entity'(e.name, e.confidence, e.role, e.value))
                let traits = m.traits |> Map.toSeq |> Seq.map(fun t -> let t' = snd t in Trait'(fst t, t'.[0].confidence, t'.[0].value)) |> List.ofSeq                
                return Utterance'(sentence, intents, entities, traits)
            }
 
        let mutable intentConfidenceThreshold = 0.85f

        let mutable entityConfidenceThreshold = 0.85f
        
        let (|HasUtterance|_|) :Utterance' option ->(Utterance option) =
            function
            | Some(Utterance'(sentence, [], entities, traits)) when entities.Length > 0 -> 
                let entities' = 
                    entities 
                    |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                    |> List.map(fun e -> Entity(e.Name, e.Role |> toLower, e.Value, Some(e.Confidence)))
                let traits' = 
                    traits 
                    |> List.where(fun t -> t.Confidence > entityConfidenceThreshold) 
                    |> List.map(fun t -> Trait(t.Name |> toLower, t.Value, Some(t.Confidence)))
                Utterance(sentence, None, Some traits', Some entities') |> Some

            | Some(Utterance'(sentence, intents, [], [])) as m when intents.Length > 0 && m.Value.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    Utterance(sentence, Some(Intent(m.Value.TopIntent.Name |> toLower, Some m.Value.TopIntent.Confidence)), None, None) |> Some
            
            | Some(Utterance'(sentence, intents, _, [])) as m when intents.Length > 0 && m.Value.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    let entities' = 
                        m.Value.Entities |> 
                        List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                        |> List.map(fun e -> Entity(e.Name, e.Role |> toLower, e.Value, Some(e.Confidence)))
                    Utterance(sentence, Some(Intent(m.Value.TopIntent.Name |> toLower, Some m.Value.TopIntent.Confidence)), None, Some(entities')) |> Some

            | Some(Utterance'(sentence, intents, [], _)) as m when intents.Length > 0 && m.Value.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    let traits' = 
                        m.Value.Traits |> 
                        List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                        |> List.map(fun e -> Trait(e.Name |> toLower, e.Value, Some(e.Confidence)))
                    Utterance(sentence, Some(Intent(m.Value.TopIntent.Name |> toLower, Some m.Value.TopIntent.Confidence)), Some(traits'), None) |> Some

            | Some(Utterance'(sentence, intents, _, _)) as m when intents.Length > 0 && m.Value.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    let entities' = 
                        m.Value.Entities |> 
                        List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                        |> List.map(fun e -> Entity(e.Name, e.Role |> toLower, e.Value, Some(e.Confidence))) 
                    let traits' = 
                        m.Value.Traits |> 
                        List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                        |> List.map(fun e -> Trait(e.Name |> toLower, e.Value, Some(e.Confidence))) 
                    Utterance(sentence, Some(Intent(m.Value.TopIntent.Name |> toLower, Some m.Value.TopIntent.Confidence)), Some(traits'), Some(entities')) |> Some
            
            | _ -> None        

    [<RequireQualifiedAccess>]
    module Domain =
        let (|Study|Other|) :Utterance -> Choice<unit, unit> =
            function
            | u when u.Traits.IsSome -> Study
            | _ -> Other