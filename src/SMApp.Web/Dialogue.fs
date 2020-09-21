namespace SMApp.Web

open System.Collections.Generic

open WebSharper

[<AutoOpen; JavaScript>]
module Dialogue =
    type Response =
        | Question of string * string
        | Ack of string * string
        | Expr of string * string
        
    with
        member x.Name =
            match x with
            | Question(n, _) 
            | Ack (n, _) 
            | Expr (n, _) -> n

        member x.Text =
            match x with
            | Question(_, t)
            | Ack (_, t)
            | Expr(_, t) -> t
        
        member x.IsAQuestion = match x with | Question _ -> true | _ -> false

        override x.ToString() = x.Text

    type Dialogue = Dialogue of CUI * Dictionary<string, obj>  * Stack<Utterance> * Stack<Response>
    with 
        member x.Cui = let (Dialogue(c, _, _, _)) = x in c
        member x.Props = let (Dialogue(_, p, _, _)) = x in p
        member x.Utterances = let (Dialogue(_, _, u, _)) = x in u
        member x.Responses = let (Dialogue(_, _, _, r)) = x in r 
        member x.UtteranceHistory = new List<Utterance>()
        member x.ResponseHistory = new List<Response>()

        member x.Frame() = x.Utterances |> Seq.take (if x.Utterances.Count >= 5 then 5 else x.Utterances.Count) |> List.ofSeq
        
        (* Audio and text cues *)

        member x.Say' t = x.Cui.Say t
    
        member x.Say t =
            x.Responses.Push t
            x.Say' (t.ToString())

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
                x.ResponseHistory.Add q
            | _ -> failwithf "Response %s is not a question." q.Text
        member x.PopUtterance() = x.Utterances.Pop()
        member x.PopQuestion() = 
            let top = x.Responses.Peek()
            match top with
            | Question _ -> x.Responses.Pop()
            | _ -> failwithf "The top of the responses stack: %s is not a question." top.Text
            
    type Agent = Agent of (Dialogue -> unit)