namespace SMApp.Web.Prototype

open System.Collections.Generic

open WebSharper

open SMApp.Web

[<AutoOpen; JavaScript>]
module Dialogue =
    type Response =
        | Question of string * string
        | Ack of string * string
    with
        member x.Name =
            match x with
            | Question(n, _) 
            | Ack (n, _) -> n

        member x.Text =
            match x with
            | Question(_, t)
            | Ack (_, t) -> t
        
        member x.IsAQuestion = match x with | Question _ -> true | _ -> false

        override x.ToString() = x.Text

    type Turn = Turn of Utterance * Response

    type Agent = Agent of (Dialogue -> unit) * (Question list) with
        member x.Questions = let (Agent(d, q)) = x in q 

    and Dialogue = Dialogue of CUI * Dictionary<string, obj>  * Stack<Utterance> * Stack<Response> * Stack<Agent> with 
        member x.Props = let (Dialogue(_, p, _, _, _)) = x in p
        member x.Utterances = let (Dialogue(_, _, u, _, _)) = x in u
        member x.Responses = let (Dialogue(_, _, _, r, _)) = x in r
        member x.Cui = let (Dialogue(c, _, _, _, _)) = x in c
        member x.Agents = let (Dialogue(_, _, _, _, a)) = x in a
        member x.Frame() = x.Utterances |> Seq.take (if x.Utterances.Count >= 5 then 5 else x.Utterances.Count) |> List.ofSeq
        
        (* Audio and text cues *)

        member x.Say' t = x.Cui.Say t
    
        member x.Say r =
            x.Responses.Push r
            x.Say' r.Text

        member x.SayRandom (r:string -> Response) p v  = 
            let t = getRandomPhrase p v
            x.Responses.Push(r <| getRandomPhrase p v) 
            x.Cui.Say t

        (* Manage the dialogue state elements*)

        member x.HaveProp k = x.Props.ContainsKey k
        member x.AddProp k v = x.Props.Add(k, v)
        member x.DeleteProp k = x.Props.Remove k
        member x.GetProp<'a> k = x.Props.[k] :?> 'a

        member x.PushQuestion q = 
            match q with
            | Question (_, _) -> 
                x.Responses.Push q
            | _ -> failwithf "Response %s is not a question." q.Text
        member x.PopUtterance() = x.Utterances.Pop()
        member x.PopQuestion() = 
            let top = x.Responses.Peek()
            match top with
            | Question _ -> x.Responses.Pop()
            | _ -> failwithf "The top of the responses stack: %s is not a question." top.Text
            

    (* Dialogue patterns *)

    let (|PropSet|_|) (d:Dialogue) (n:string) :Utterance -> Utterance option =
        function
        | m when d.HaveProp n -> Some m
        | _ -> None

    let (|PropNotSet|_|) (d:Dialogue) (n:string) :Utterance -> Utterance option =
        function
        | m when not (d.HaveProp n) -> Some m
        | _ -> None
     
    let (|Assert|_|) (d:Dialogue) (a:Agent) :Utterance -> Utterance option =
        function
        | PropSet d "user" m when a.Questions.Length = 0 -> 
            d.PopUtterance() |> ignore
            Some m
        | _ -> None

    let (|Response|_|) (d:Dialogue) (n:string) :Utterance -> (Utterance * obj option) option =
        function
        | PropSet d "user" m when haveQuestion n && questions.Count > 0  && questions.Peek().Name = n -> 
            popc()
            popq()
            if haveProp n then
                let d = props.[n]
                deleteProp n
                Some(m, Some d)
            else Some(m, None)
        | _ -> None

    let (|AnonResponse|_|) (n:string) :Utterance -> (Utterance * obj option) option =
        function
        | PropNotSet "user" m when haveQuestion n && questions.Count > 0  && questions.Peek().Name = n -> 
            popc()
            popq()
            if haveProp n then
                let d = props.[n]
                deleteProp n
                Some(m, Some d)
            else Some(m, None)
        | _ -> None

    let (|AnonAssert|_|) (d:Dialogue) :Utterance -> Utterance option =
        function
        | PropNotSet d "user" m when questions.Count = 0 -> 
            popc()
            Some m
        | _ -> None

    let (|Start|_|) (d:Dialogue) :Utterance -> Utterance option=
        function
        | PropNotSet "started" m -> Some m
        | _ -> None

    let (|Str|_|) : obj option -> string option =
        function
        | Some s when (s :? string) -> Some (s :?> string)
        | _ -> None
