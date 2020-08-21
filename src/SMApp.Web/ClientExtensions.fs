namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client

open SMApp.JQueryTerminal

[<AutoOpen; JavaScript>]
module ClientExtensions =
    type Terminal with
        member x.Push(i:Interpreter) = x.Push(i.Func, i.Options)