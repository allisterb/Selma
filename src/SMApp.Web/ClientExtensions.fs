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
    let rawOpt = EchoOptions(Raw=true)
    type Terminal with
        member x.Echo' (text:string) = x.Disable(); x.Echo text; x.Enable()
        member x.EchoHtml' (text:string) = x.Disable(); x.Echo(text, rawOpt) ; x.Enable()
        member x.Push (i:Interpreter) = x.Push(i.Func, i.Options)

    let error = JQuery.JQuery.Error

    let info = Console.Info
    
    let toArray (a : ArrayLike<'t>) =
        JQuery.MakeArray a |> Array.map (fun a -> a :?> 't)