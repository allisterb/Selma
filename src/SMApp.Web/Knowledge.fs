namespace SMApp.Web

open WebSharper

[<JavaScript;AutoOpen>]
module Knowledge =
    type EmotionalTrait = EmotionalTrait of string * string list * float with
        member x.Label = let (EmotionalTrait(l, _, _)) = x in l
        member x.Hierarchy = let (EmotionalTrait(_, h, _)) = x in h
        member x.Frequence = let (EmotionalTrait(_, _, f)) = x in f

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
