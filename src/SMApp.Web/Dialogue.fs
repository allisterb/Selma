namespace SMApp.Web

open System.Collections.Generic

open WebSharper

open SMApp.Web

[<JavaScript>]
module Dialogue =
    type Dialogue = Dialogue of CUI * Dictionary<string, obj> * Stack<Question> * Stack<string> * Stack<Utterance> with
        member x.Cui = let (Dialogue(c,_, _, _, _)) = x in c 
        member x.Props = let (Dialogue(_,p, _, _, _)) = x in p
        member x.DialogueQuestions = let (Dialogue(_, _, dq, _, _)) = x in dq
        member x.Output = let (Dialogue(_, _, _, o, _)) = x in o
        member x.Utterances = let (Dialogue(_, _, _, _, u)) = x in u
        
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
    let question mn name text t = Question(name, text, t, mn)
    let have (d:Dialogue) k = d.Props.ContainsKey k
    let add<'a> (d:Dialogue) k (v:'a) = d.Props.Add(k, v)
    let delete (d:Dialogue) k = d.Props.Remove k |> ignore
    let prop<'a> (d:Dialogue) k :'a = d.Props.[k] :?> 'a
 
    let getQuestion (moduleQuestions:Question list) n = moduleQuestions |> List.tryFind(fun q -> q.Name = n)
    let haveQuestion (moduleQuestions: Question list) n = moduleQuestions |> List.exists(fun q -> q.Name = n)

    let pushu (d:Dialogue) (m:Utterance) = d.Utterances.Push m 
    let popu (d:Dialogue) = d.Utterances.Pop() |> ignore
    let popq(d: Dialogue) = d.DialogueQuestions.Pop() |> ignore
    
    let pushq (d:Dialogue) (moduleQuestions: Question list) (questionName:string) = 
        match getQuestion moduleQuestions questionName with
        | Some q -> d.DialogueQuestions.Push q
        | None -> failwithf "No such question: %s" questionName
    
    let popt (d:Dialogue) =
        popu d |> ignore
        popq d |> ignore
    
    let ask (d:Dialogue) (moduleQuestions: Question list) q v (target:Dialogue -> unit)=
        let question = Option.get <| getQuestion moduleQuestions  q
        add d q v
        pushq d moduleQuestions q
        let text = replace_tok "$0" v question.Text
        say d <| text
        match question.Type with
        | UserData -> questionBox "User Input" "320px" "240px" text (fun input -> pushu d (Utterance(input, None, None, None)); target d)
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

    let (|Response_|_|) (d:Dialogue) (moduleQuestions: Question list) (n:string) :Utterance -> (Utterance * obj option) option =
         function
         | PropSet_ d "user" m when haveQuestion moduleQuestions n && d.DialogueQuestions.Count > 0  && d.DialogueQuestions.Peek().Name = n -> 
             if have d n then
                 let v = d.Props.[n]
                 delete d n
                 Some(m, Some v)
             else Some(m, None)
         | _ -> None

    let (|Response'_|_|) (d:Dialogue) (moduleQuestions: Question list) (n:string) :Utterance -> (Utterance * obj option) option =
         function
         | PropNotSet_ d "user" m when haveQuestion moduleQuestions n && d.DialogueQuestions.Count > 0  && d.DialogueQuestions.Peek().Name = n -> 
             if have d n then
                 let v = d.Props.[n]
                 delete d n
                 Some(m, Some v)
             else Some(m, None)
         | _ -> None