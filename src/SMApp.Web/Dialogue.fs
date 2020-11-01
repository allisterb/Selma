namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.Web

[<JavaScript>]
type Question = Question of string * string * QuestionType * string with 
    member x.Name = let (Question(n, _, _, _)) = x in n 
    member x.Text = let (Question(_, t, _, _)) = x in t
    member x.Type = let (Question(_, _, ty, _)) = x in ty
    member x.Module = let (Question(_, _, _, m)) = x in m
    override x.ToString() = sprintf "Name: %s Text: %s Type: %A Module: %s" x.Name x.Text x.Type x.Module

and [<JavaScript>] QuestionType =
| UserAuthentication of (string->CanvasElement->unit)
| Verification
| Disjunctive
| ConceptCompletion

[<JavaScript>]
type Form = Form of string * Question list

[<JavaScript>]
type Dialogue = Dialogue of CUI * Dictionary<string, obj> * Stack<Question> * Stack<string> * Stack<Utterance> with
    member x.Cui = let (Dialogue(c,_, _, _, _)) = x in c 
    member x.Props = let (Dialogue(_,p, _, _, _)) = x in p
    member x.DialogueQuestions = let (Dialogue(_, _, dq, _, _)) = x in dq
    member x.Output = let (Dialogue(_, _, _, o, _)) = x in o
    member x.Utterances = let (Dialogue(_, _, _, _, u)) = x in u

[<JavaScript>]
module Dialogue =
    let echo (d:Dialogue) t = d.Cui.EchoHtml' t

    let say' (d:Dialogue) t = d.Cui.Say t
 
    let say (d:Dialogue) t =
        d.Output.Push t
        say' d t

    let sayRandom (d:Dialogue) p v  = 
        let t = getRandomPhrase p v
        d.Output.Push(t) |> ignore
        d.Cui.Say t
 
    let sayRandom' (d:Dialogue) p = sayRandom d p ""
 
    (* Manage the dialogue state elements*)
    let have (d:Dialogue) k = d.Props.ContainsKey k
    let add<'a> (d:Dialogue) k (v:'a) = d.Props.Add(k, v)
    let delete (d:Dialogue) k = d.Props.Remove k |> ignore
    let prop<'a> (d:Dialogue) k :'a = d.Props.[k] :?> 'a
 
    let pushu (d:Dialogue) (m:Utterance) = d.Utterances.Push m 
    let popu (d:Dialogue) = d.Utterances.Pop() |> ignore
    let pushq (d:Dialogue) (q:Question) = d.DialogueQuestions.Push q
    let popq(d: Dialogue) = d.DialogueQuestions.Pop() |> ignore
    
    let popt (d:Dialogue) =
        popu d |> ignore
        popq d |> ignore
    
    let ask (d:Dialogue) (debug:string -> unit) (target:Dialogue -> unit) (question:Question) =    
        pushq d question
        match question.Type with
        | UserAuthentication f -> 
            d.Cui.TypingDNA.Reset()
            questionBox "Biometric Authentication" "" 640 480 (fun _ -> 
                 let pattern =  d.Cui.GetSameTextTypingPattern "Hello my name is John Brown and I am an administrator" None
                 debug <| "Text pattern: " + pattern
                 let el = JQuery(".swal2-content").Get().[0].FirstChild.FirstChild |> As<CanvasElement>
                 f pattern el
            )
            let input = JQuery(".swal2-input").Get().[0] |> As<Dom.Element> 
            do 
                input.SetAttribute("id", "auth-input")
                d.Cui.MonitorTypingPattern None
            let e = JQuery(".swal2-content").Get().[0].FirstChild |> As<Dom.Element>
            let c = createCanvas "camera" "640" "480" e
            startCamera JS.Document.Body c

        | _ -> ()
     
    let handle (d:Dialogue) (debug:string -> unit) (m:string) (f:unit->unit) =
        popu d
        debug <| sprintf "Handle: %s." m
        f()

    let handle' (d:Dialogue) (debug:string -> unit) (m:string) (f:unit->unit) =
        popt d
        debug <| sprintf "Turn end: %s." m
        f()

    let dispatch (d:Dialogue) (debug:string -> unit) (targetModule:string) (target:Dialogue->unit) =
        debug <| sprintf "Dispatch to module %s utterances: %A questions: %A." targetModule d.Utterances d.DialogueQuestions
        target d
       
    let didNotUnderstand (d:Dialogue) (debug:string -> unit) (name:string) =
        debug <| sprintf "%s interpreter did not understand utterance." name
        say d "Sorry I didn't understand what you meant."
        if d.DialogueQuestions.Count > 0 then 
            let q = Seq.item 0 d.DialogueQuestions in 
            if have d q.Name then 
                say d <| replace_tok "$0" (d.Props.[q.Name] :?> string) q.Text
            else say d q.Text

    (* Dialogue patterns *)
    let (|Agenda_|_|) (d:Dialogue) (n:string) :Utterance list -> unit option =
        function
        | _ when d.DialogueQuestions.Count > 0  && d.DialogueQuestions.Peek().Module = n -> Some ()
        | _ -> None

    let (|PropSet_|_|) (d:Dialogue) (n:string) :Utterance -> Utterance option =
         function
         | m when have d n -> Some m
         | _ -> None

    let (|PropNotSet_|_|) (d:Dialogue) (n:string) :Utterance -> Utterance option =
         function
         | m when not (have d n) -> Some m
         | _ -> None
  
    let (|User_|_|) (d:Dialogue) :Utterance -> Utterance option =
         function
         | PropSet_ d "user" m when d.DialogueQuestions.Count = 0 -> Some m
         | _ -> None

    let (|User'_|_|) (d:Dialogue) :Utterance -> Utterance option =
         function
         | PropNotSet_ d "user" m when d.DialogueQuestions.Count = 0 -> Some m
         | _ -> None

    let (|Response_|_|) (d:Dialogue) (n:string) :Utterance -> (Utterance * obj option) option =
         function
         | PropSet_ d "user" m when d.DialogueQuestions.Count > 0  && d.DialogueQuestions.Peek().Name = n -> 
             if have d n then
                 let v = d.Props.[n]
                 delete d n
                 Some(m, Some v)
             else Some(m, None)
         | _ -> None

    let (|Response'_|_|) (d:Dialogue) (n:string) :Utterance -> (Utterance * obj option) option =
         function
         | PropNotSet_ d "user" m when d.DialogueQuestions.Count > 0  && d.DialogueQuestions.Peek().Name = n -> 
             if have d n then
                 let v = d.Props.[n]
                 delete d n
                 Some(m, Some v)
             else Some(m, None)
         | _ -> None