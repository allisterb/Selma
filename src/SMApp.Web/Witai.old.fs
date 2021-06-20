namespace SMApp.NLU

open System

open WebSharper
open WebSharper.JQuery

[<JavaScript>]
module Witai =

    type Utterance = {
        text: string
        intents: Intent array
        entities: Map<string, Entity array>
        traits: Map<string, Trait array>
    }
       
    and Intent = {
        id: string
        name: string
        confidence: float32
    }
    and Entity = {
        id: string
        name: string
        role: string
        start: int
        ``end``: int
        body: string
        confidence: float32
        entities: obj[]
        suggested: bool
        value: string
        ``type``:string
    }
    
    and Trait = {
        id: string
        value: string
        confidence: float32
    }

    type Utterance' = {
        intent: Value'
    }
    and Value' = { value: string}

    let getMeaning (authValue:string) (sentence:string) (success:Action<obj, string, JqXHR>) (error:Action<JqXHR, string, string>) =
        JQuery.Ajax(
                JQuery.AjaxSettings(
                    Url = sprintf "https://api.wit.ai/message?q=%s" sentence,
                    Type = RequestType.GET,
                    BeforeSend = Action<JqXHR, AjaxSettings>(fun jqxhr s -> jqxhr.SetRequestHeader("Authorization", "Bearer " + authValue)),
                    Success = success, 
                    Error = error
                ))
        |> ignore

    let getMeaning2 (authValue:string) (sentence:string) :Async<Utterance> =
        Async.FromContinuations <| fun (ok, ko, _) -> 
            JQuery.Ajax(
                JQuery.AjaxSettings(
                    Url = sprintf "https://api.wit.ai/message?q=%s" sentence,
                    Type = RequestType.GET,
                    BeforeSend = Action<JqXHR, AjaxSettings>(fun jqxhr s -> jqxhr.SetRequestHeader("Authorization", "Bearer " + authValue)),
                    Success = Action<obj, string, JqXHR>(fun result s _ -> ok (result :?> Utterance)),
                    Error = Action<JqXHR, string, string>(fun jqxhr _ _ -> ko (exn jqxhr.ResponseText))
            )) |> ignore