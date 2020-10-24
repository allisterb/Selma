namespace SMApp.NLU

open System

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery

[<JavaScript>]
module QnAMaker =
    type ITSQuestion = {
        question:string
    }

    type ITSAnswerContext = {
        isContextOnly: bool
        prompts: string[]
    }

    type ITSAnswer = {
        questions: string array
        answer: string
        score: float
        id: int
        source: string
        metadata: Map<string, string>
        context: ITSAnswerContext
    }

    type ITSAnswers = {
        answers: ITSAnswer array
    }

    let getAnswer q :Async<ITSAnswers> =
        Async.FromContinuations <| fun (ok, ko, _) -> 
            JQuery.Ajax(
                JQuery.AjaxSettings(
                    Url = "https://lerna.azurewebsites.net/qnamaker/knowledgebases/13a6a026-942b-4612-a8cb-654086ec76ee/generateAnswer",
                    Type = RequestType.POST,
                    BeforeSend = Action<JqXHR, AjaxSettings>(fun xhr s -> xhr.SetRequestHeader("Authorization", "EndpointKey e5a55563-b1b0-4343-8796-bda5a0509385")),
                    ContentType = Union2Of2("application/json"),
                    DataType = JQuery.DataType.Json,
                    Data = JSON.Stringify({question = q}),
                    Success = Action<obj, string, JqXHR>(fun result s _ -> ok (result :?> ITSAnswers)),
                    Error = Action<JqXHR, string, string>(fun jqxhr _ _ -> ko (exn jqxhr.ResponseText))
            )) |> ignore

