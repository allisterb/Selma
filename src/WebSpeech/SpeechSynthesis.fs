namespace Site

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.UI
open WebSharper.UI.Notation
open WebSharper.UI.Html
open WebSharper.UI.Client

[<JavaScript>]
module SpeechSynthesis =

    module Utils =
        let ToArray (a : ArrayLike<_>) =
            let rec helper n acc =
                if n = -1 then acc
                else helper (n - 1) (a.Item(n) :: acc)

            helper (a.Length - 1) []
            |> Array.ofList

    let MaxConfidence = Array.maxBy (fun (e : SpeechRecognitionAlternative) -> e.Confidence)

    let Main (e : Dom.Element) =
        let txt = Var.Create ""
        let info = div [] [text "Speak loud and clear."]
        let pre = Elt.pre [attr.style "width: 550px; height: 300px; overflow-y: scroll; display: block;"] [text txt.V]

        let srecog =
            SpeechRecognition(
                Lang = "en-US",
                Continuous = true,
                Onresult = fun res ->
                    (res.Results
                    |> Utils.ToArray).[res.ResultIndex ..]
                    |> Array.map Utils.ToArray
                    |> Array.map MaxConfidence
                    |> Array.iter (fun e -> txt := !txt + e.Transcript)
                    pre.Dom.ScrollTop <- pre.Dom.ScrollHeight
            )

        let startBtn = button [on.click (fun _ _ -> srecog.Start())] [text "Start"]
        let stopBtn = button [on.click (fun _ _ -> srecog.Stop())] [text "Stop"]
        div [] [info; pre; startBtn; stopBtn]
        |> Doc.Run e

    let Sample = 
        Samples.Build()
            .Id("SpeechSynthesis")
            .FileName(__SOURCE_FILE__)
            .Keywords(["user media"; "speech synthesis"; "speech"; "speech-to-text"])
            .Render(Main)
            .Create()
