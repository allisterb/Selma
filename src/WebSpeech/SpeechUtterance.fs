namespace Site

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.UI
open WebSharper.UI.Notation
open WebSharper.UI.Html
open WebSharper.UI.Client

[<JavaScript>]
module SpeechUtterance =

    let Texts =
        [
            "Hey! How are you doing?", "en-US"
            "Hey! How are you doing?", "en-GB"
            "Hallo! Wie geht's?", "de-DE"
            "Ciao! Come và?", "it-IT"
            "こんにちはお元気ですか", "ja-JP"
        ]

    let MkField (sp : SpeechSynthesis) (u : SpeechSynthesisUtterance) =
        Texts
        |> List.map (fun (txt, lang) ->
            let txt = Var.Create txt
            let t = Doc.InputArea [attr.width "200"] txt
            let b =
                button [
                    on.click (fun _ _ ->
                        u.Text <- !txt
                        u.Lang <- lang
                        sp.Speak(u))
                ] [text "Speak!"]
            let style = "margin: 5px; display: inline-block;"
            div [attr.style style] [t; br [] []; b]
        )

    let Main (e : Dom.Element) =
        div [] <| MkField (Window.SpeechSynthesis) (new SpeechSynthesisUtterance())
        |> Doc.Run e

    let Sample = 
        Samples.Build()
            .Id("SpeechUtterance")
            .FileName(__SOURCE_FILE__)
            .Keywords(["user media"; "speech utterance"; "speech"; "TTS"])
            .Render(Main)
            .Create()       