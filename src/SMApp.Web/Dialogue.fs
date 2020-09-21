namespace SMApp.Web.Prototype

open System.Collections.Generic

open WebSharper

open SMApp.Web

[<AutoOpen; JavaScript>]
module Dialogue =
    type Response =
        | Question of string * string
        | Ack of string * string
        | Expr of string
        
    with
        member x.Name =
            match x with
            | Question(n, _) 
            | Ack (n, _) -> n
            | Expr _ -> "Expr"

        member x.Text =
            match x with
            | Question(_, t)
            | Ack (_, t)
            | Expr t -> t
        
        member x.IsAQuestion = match x with | Question _ -> true | _ -> false

        override x.ToString() = x.Text

    type Dialogue = Dialogue of CUI * Dictionary<string, obj>  * Stack<Utterance> * Stack<Response>
    with 
        member x.Cui = let (Dialogue(c, _, _, _)) = x in c
        member x.Props = let (Dialogue(_, p, _, _)) = x in p
        member x.Utterances = let (Dialogue(_, _, u, _)) = x in u
        member x.Responses = let (Dialogue(_, _, _, r)) = x in r 
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
            
    type Agent = Agent of (Dialogue -> unit)