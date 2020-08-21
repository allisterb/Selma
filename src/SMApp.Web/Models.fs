namespace SMApp.Web

open System

open WebSharper

/// Basic user information for app authentication and authorization
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

[<JavaScript>]
type Interpreter = Interpreter of ((SMApp.JQueryTerminal.Terminal->string->unit) * SMApp.JQueryTerminal.Options)
    with
    member x.Unwrap = match x with | Interpreter(i, o) -> i, o
    member x.Func = x.Unwrap |> fst
    member x.Options = x.Unwrap |> snd

[<JavaScript>]
type CUIContext =
    | InterpreterCtx of Interpreter
    | MenuCtx
    | InputCtx

type Skill =
    | PainManagement
    | FatigueManagement
    | BreathingManagement
    | EmotionsManagement
    | Nutrition
    | Exercise
    | SleepManagement

type Disease = {
    Name: string
    Description: string
}
        
[<JavaScript>]
type Resource = {
    Name :string
    Description :string
    Url: Uri option
}



