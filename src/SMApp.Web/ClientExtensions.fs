// Contains code from FsHtml: https://github.com/ptrelford/FsHtml by Phillip Trelford
// FsHtml is licensed under the Apache License 2.0: https://raw.githubusercontent.com/ptrelford/FsHtml/master/LICENSE 

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
module ClientExtensions =
    let rnd = System.Random()

    let rawOpt = EchoOptions(Raw=true)

    type Terminal with
        member x.Echo' (text:string) = x.Pause(); x.Echo text; x.Resume()
        member x.EchoHtml' (text:string) = x.Pause(); x.Echo(text, rawOpt) ; x.Resume()
      
    let toArray (a : ArrayLike<'t>) =
        JQuery.MakeArray a |> Array.map (fun a -> a :?> 't)

    let jserror = JQuery.JQuery.Error 

    let info = Console.Info
    
    let error = Console.Error

    let debug (loc:string) t = info <| sprintf "DEBUG: %s: %A" (loc.ToUpper()) t
    
    let toLower (s:string) = s.ToLower()

    [<Direct "$('#term').terminal().disable()">]
    let disableTerminal() = X<unit>

    [<Direct "$('#term').terminal().enable()">]
    let enableTerminal() = X<unit>

    let terminalOutput() = JQuery(".terminal-output").Get().[0]

    [<Direct "$('#term').terminal()">]
    let Terminal = X<Terminal>

    let getMic() = JQuery("#microphone").Get().[0]

    [<Direct("window.lastMicData")>]
    let lastMicData() = X<Int16Array>

    [<Direct("window.speechSynthesis")>]
    let speechSynthesis() = X<SpeechSynthesis>

    let eid = attr.id
    
    let reid s = s + "-" + rnd.Next().ToString()  |> eid

    let cls n = attr.``class`` n
    
    let href s = attr.href s

    let dindex (n:int) = Attr.Create "data-index" (n.ToString())
    
    let container c = div [cls "container"] c
    
    let getContainer() = JQuery("#container").Get().[0].FirstChild |> As<Dom.Element>
    
    let createElement doc =
        let el = JS.Document.CreateElement "div"
        do JS.Document.AppendChild(el) |> ignore        
        do doc |> Doc.RunAppend el
        
    let elementHTML (d:Dom.Element) = d.InnerHTML
    
    let createCanvas (id:string) (width:string) (height:string) (parent:Dom.Element) =
        canvas[eid id; attr.width width; attr.height height][] |> Doc.Run parent
        let c = parent.FirstChild |> As<CanvasElement>
        c

    let createDialogueBoxCanvas() =
        let e = JQuery("#swal2-content").Get().[0].FirstChild |> As<Dom.Element>
        let c = createCanvas "camera" "640" "480" e
        c

    let getDialogueBoxContent() = JQuery("#swal2-content").Get().[0].FirstChild |> As<Dom.Element>
        
    let getDialogueBoxCanvas() = JQuery("canvas.swal2-content").Get().[0] |> As<CanvasElement> 

    let getDialogueBoxInput() = JQuery(".swal2-input").Get().[0] |> As<HTMLInputElement>
    
    [<Direct "startCamera($container, $canvasElement)">]
    let startCamera (container:Dom.Element) (canvasElement:Dom.Element) = X<unit>
    
    [<Direct "stopCamera()">]
    let stopCamera () = X<unit>

    [<Direct "getCameraCanvas()">]
    let getCameraCanvas() = X<CanvasElement>

    type SweetAlert with
        static member QueueBoxes = SweetAlert.Mixin(Box()).Queue

    let questionBox title text (queueSteps: Box[] option) (dim:(int * int) option) (onCreate:(Box->unit) option) (onShow:(unit->unit) option) (onInput:SweetAlertResult<obj>->unit)= 
        let prom = 
            let b = 
                match dim with
                | (Some(width, height)) -> 
                    SweetAlert.Box (
                                TitleText = title,
                                Text = text,
                                Icon = "question",
                                Width = width.ToString(),
                                Html = sprintf "<div class=\"swal2-content-custom\" style=\"width:%ipx;height:%ipx\"></div>" width height,
                                AllowOutsideClick = false
                    )
                | None -> 
                    SweetAlert.Box (
                        TitleText = title,
                        Text = text,
                        Icon = "question",
                        Html = "<div></div>",
                        AllowOutsideClick = false
                    )   
            do if onCreate.IsSome then onCreate.Value b
          
            match queueSteps with
            | None -> b |> SweetAlert.Fire
            | Some s -> 
                b.ProgressSteps <- seq {1..s.Length} |> Array.ofSeq
                (SweetAlert.Mixin b).Queue(Array.create (s.Length) b)
            
        do if onShow.IsSome then onShow.Value()
        prom.Then(Action<SweetAlertResult<obj>>(onInput))
        
    let confirmQuestionBox = SweetAlert.ClickConfirm
         
    let boxesWithTitles (boxes:string array) = boxes |> Array.map(fun b -> SweetAlert.Box(TitleText = b))
    
[<JavaScript>]
type _Html =
   | Elem of string * _Html list
   | Attr of string * string
   | Text of string
   with
   static member toString elem =
      let rec toString indent elem =
         let spaces = String.replicate indent " "
         match elem with
         | Attr(name,value) -> name+"=\""+value+"\""
         | Elem(tag, [Text s]) ->
            spaces+"<"+tag+">"+s+"</"+tag+">\r\n"
         | Elem(tag, content) ->
            let isAttr = function Attr _ -> true | _ -> false
            let attrs, elems = content |> List.partition isAttr
            let attrs =         
               if attrs = [] then ""
               else " " + String.concat " " [for attr in attrs -> toString 0 attr]
            match elems with
            | [] -> spaces+"<"+tag+attrs+"/>\r\n"
            | _ ->
               spaces+"<"+tag+attrs+">\r\n"+
                  String.concat "" [for e in elems -> toString (indent+1) e] +
                     spaces+"</"+tag+">\r\n"
         | Text(text) ->            
            spaces + text + "\r\n"
      toString 0 elem
   override this.ToString() = _Html.toString this

type htm = _Html

[<RequireQualifiedAccess; JavaScript>]
module htm = 
    let elem tag content = Elem(tag,content)
    let html = elem "html"
    let head = elem "head"
    let title = elem "title"
    let style = elem "style"
    let body = elem "body"
    let div = elem "div"
    let br = elem "br"
    let section = elem "section"
    let span = elem "span"
    let table = elem "table"
    let thead = elem "thead"
    let tbody = elem "tbody"
    let tfoot = elem "tfoot"
    let img = elem "img"
    let map = elem "map"
    let area = elem "area"
    let p = elem "p"
    let a = elem "a"
    let tr = elem "tr"
    let td = elem "td"
    let th = elem "th"
    let ul = elem "ul"
    let li = elem "li"
    let h1 = elem "h1"
    let h2 = elem "h1"
    let h3 = elem "h1"
    let h4 = elem "h1"
    let strong = elem "strong"
    let (~%) s = [Text(s.ToString())]
    let (%=) name value = Attr(name,value)
    let str h = _Html.toString h
    let cls c = Attr("class", c)
    let src c = Attr("src", c)
    let alt c = Attr("alt", c)