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

    let addVideoElement (el:Dom.Element) = 
        let v = video [] []
        v |> Doc.RunAppend el
        v

    let addCanvaElement (el:Dom.Element) = 
        let v = canvas [eid "canvasOutput"; attr.width "320"; attr.height "240"] []
        v |> Doc.RunAppend el
        v


    //let startCamera = 

