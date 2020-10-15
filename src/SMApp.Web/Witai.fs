namespace SMApp.NLU

open System

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery

[<JavaScript>]
module Witai =

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


