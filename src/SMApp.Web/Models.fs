namespace SMApp.Web

open System

open WebSharper

/// Basic user information for authentication and authorization
[<JavaScript>]
type User = {
    UserName: string
}

[<JavaScript>]
type Meaning = Meaning of Intent list * Entity list
with 
    member x.Unwrap = match x with | Meaning(i, e)-> i, e
    member x.Intents = let (i, e) = x.Unwrap in i
    member x.Entities = let (i, e) = x.Unwrap in e
and
    [<JavaScript>]
    Intent = Intent of string * float32 
and 
    [<JavaScript>]
    Entity = Entity of string * float32 * string * string
        with
        member x.Unwrap = match x with | Entity(n,c,r,v)->(n,c,r,v)
        member x.Name = let (n, _, _, _) = x.Unwrap in n
        member x.Confidence = let (_, c, _, _) = x.Unwrap in c
        member x.Role = let (_, _, r, _) = x.Unwrap in r
        member x.Value = let (_, _, _, v) = x.Unwrap in v
        
[<JavaScript>]
type Resource = {
    Name :string
    Description :string
    Url: Uri option
}



