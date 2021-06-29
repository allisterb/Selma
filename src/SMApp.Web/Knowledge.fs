namespace SMApp.Web

open System

open WebSharper

[<JavaScript;AutoOpen>]
module Knowledge =
    type EmotionalTrait = EmotionalTrait of string * string list * float with
        member x.Label = let (EmotionalTrait(l, _, _)) = x in l
        member x.Hierarchy = let (EmotionalTrait(_, h, _)) = x in h
        member x.Frequency = let (EmotionalTrait(_, _, f)) = x in f

    type BehavioralTrait = BehavioralTrait of string * string list * float with
        member x.Label = let (BehavioralTrait(l, _, _)) = x in l
        member x.Hierarchy = let (BehavioralTrait(_, h, _)) = x in h
        member x.Frequency = let (BehavioralTrait(_, _, f)) = x in f

    type Relation<'t1, 't2> = Relation of 't1 * string * 't2 with
        member x.T1 = let (Relation(t1, _, _)) = x in t1
        member x.Name = let (Relation(_, n, _)) = x in n
        member x.T2 = let (Relation(_, _, t2)) = x in t2
        override x.ToString() = sprintf "(%A, %A, %A)" x.T1 x.Name x.T2
        
    type Triple = Triple of SubjectVerbRelation * VerbObjectRelation option  with
        member x.Subject = let (Triple(s, _)) = x in s.T1
        member x.Verb = let (Triple(s, _)) = x in s.T2
        member x.Object = let (Triple(_, o)) = x in if o.IsSome then Some(o.Value.T2) else None
        override x.ToString() = sprintf "(%A, %A, %A)" x.Subject x.Verb x.Object

    and SubjectVerbRelation = Relation<Subject, Verb>
    
    and VerbObjectRelation = Relation<Verb, Object>

    and Subject = 
        | Subject of string
        | Relation of Relation<string, string>
    with override x.ToString() = match x with | Subject text -> text | Relation r -> r.ToString()

    and Verb = Verb of string with override x.ToString() = let (Verb t) = x in t 

    and Object = 
        | Object of string
        | Relation of Relation<string, string>
    with override x.ToString() = match x with | Object text -> text | Relation r -> r.ToString()

    type ExpertAIEntity = ExpertAIEntity of string * string * (int64*int64) list * int64 with
        member x.Type = let (ExpertAIEntity(t, _, _, _))= x in t
        member x.Lemma = let (ExpertAIEntity(_, n, _, _))= x in n
        member x.Positions = let (ExpertAIEntity(_, _, p, _))= x in p
        member x.Relevance = let (ExpertAIEntity(_, _, _, r))= x in r

    type ExpertAILemma = ExpertAILemma of string * float * (int64*int64) list  with
        member x.Value = let (ExpertAILemma(v, _, _))= x in v
        member x.Score = let (ExpertAILemma(_, s, _))= x in s
        member x.Positions = let (ExpertAILemma(_, _, p))= x in p

    (* Triple patterns *)
    let (|TripleSubject|_|) (s:string) =
        function
        | Subject ss when ss.ToUpper() = s.ToUpper() -> Some()
        | _ -> None

    let (|TripleRelation|_|) (s:string) :string -> unit option =
        function
        | ss when ss.ToUpper() = s.ToUpper() -> Some()
        | _ -> None

    let (|TripleVerb|_|) (s:string) =
        function
        | Verb ss when ss.ToUpper() = s.ToUpper() -> Some()
        | _ -> None

    (* Triple patterns *)
    let (|TripleObject|_|) (s:string) =
        function
        | Object ss when ss.ToUpper() = s.ToUpper() -> Some()
        | _ -> None

    let (|ExpertAIEntityType|_|) (s:string) :string->unit option =
        function
        | ss when ss.ToUpper() = s.ToUpper() -> Some()
        | _ -> None

    let (|EmotionalTraitLabel|_|) (s:string) :string->unit option =
        function
        | ss when ss.ToUpper() = s.ToUpper() -> Some()
        | _ -> None

    let (|SubjectVerb1OfAny|_|) (s:string) (svr:string) (v:string) (triples:Triple list option) : Triple option = 
        triples 
        |> Option.bind(
            List.tryPick(fun t -> 
                match t with 
                | Triple(SubjectVerbRelation.Relation(TripleSubject s, TripleRelation svr, TripleVerb v), _) -> Some t 
                | _ -> None   
            )) 
             
    let (|SubjectVerbObject1OfAny|_|) (s:string) (svr:string) (v:string) (vor:string) (o:string) (triples:Triple list option) : Triple option = 
        triples 
        |> Option.bind(
            List.tryPick(fun t -> 
                match t with 
                | Triple(SubjectVerbRelation.Relation(TripleSubject s, TripleRelation svr, TripleVerb v), Some(VerbObjectRelation.Relation(TripleVerb v, TripleRelation vor, TripleObject o))) -> Some t 
                | _ -> None
            ))

    let (|EmotionalTrait1OfAny|_|) (s:string) (traits:EmotionalTrait list) : EmotionalTrait option =
        traits
        |> 
        List.tryPick(fun t ->
            match t with
            | EmotionalTrait(EmotionalTraitLabel s, _, _) -> Some t
            | _ -> None
        )

    let (|ExpertAIEntity1OfAnyType|_|) (s:string) (entities:ExpertAIEntity list option) : ExpertAIEntity option =
        entities
        |> Option.bind(
            List.tryPick(fun t ->
                match t with
                | ExpertAIEntity(ExpertAIEntityType s, _, _, _) -> Some t
                | _ -> None
            ))

    
    type WritingJournlEntry = {
        UserName: string
        Date: DateTime
        WritingPrompt: int
        Text: string
        KnowledgeTriples: Triple list list
        KnowledgeLemmas: ExpertAILemma list
        KnowledgeEntities: ExpertAIEntity list
        KnowledgeBehaviouralTraits: BehavioralTrait list
        KnowledgeEmotionalTraits: EmotionalTrait list
    }