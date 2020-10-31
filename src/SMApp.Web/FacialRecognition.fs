namespace SMApp.Web

open System

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.JQuery
open WebSharper.SweetAlert

open SMApp.JQueryTerminal
open SMApp.WebSpeech
open SMApp.TypingDNA

[<AutoOpen; JavaScript>]
module FacialRecognition =
    [<Direct "startCamera($container, $canvasElement)">]
    let startCamera (container:Dom.Element) (canvasElement:Dom.Element) = X<unit>
    