namespace SMApp.Web

open WebSharper

[<JavaScript;AutoOpen>]
module Knowledge =
    type EmotionalTrait = EmotionalTrait of string * string list * float with
        member x.Label = let (EmotionalTrait(l, _, _)) = x in l
        member x.Hierarchy = let (EmotionalTrait(_, h, _)) = x in h
        member x.Frequence = let (EmotionalTrait(_, _, f)) = x in f

    type Relation = Relation of Subject * Verb * Object option  with
        member x.Subject = let (Relation(s, _, _)) = x in s
        member x.Verb = let (Relation(_, v, _)) = x in v
        member x.Object = let (Relation(_, _, o)) = x in o
        override x.ToString() = sprintf "(%A, %A, %A)" x.Subject x.Verb x.Object

    and Subject = 
        | Subject of string
        | Relation of Relation
    with override x.ToString() = match x with | Subject text -> text | Relation r -> r.ToString()

    and Verb = Verb of string with override x.ToString() = let (Verb t) = x in t 

    and Object = 
        | Object of string
        | Relation of Relation
    with override x.ToString() = match x with | Object text -> text | Relation r -> r.ToString()