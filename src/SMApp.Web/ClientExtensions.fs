namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.JQuery

open SMApp.JQueryTerminal
open SMApp.WebSpeech

[<AutoOpen; JavaScript>]
module ClientExtensions =
    type Terminal with
        member x.Echo' (text:string) = x.Disable(); x.Echo text; x.Enable()
        member x.Push (i:Interpreter) = x.Push(i.Func, i.Options)

    let error = JQuery.JQuery.Error

    let toArray (a : ArrayLike<'t>) =
        JQuery.MakeArray a |> Array.map (fun a -> a :?> 't)