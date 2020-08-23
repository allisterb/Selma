namespace SMApp.Microphone

open WebSharper
open WebSharper.JavaScript
open WebSharper.InterfaceGenerator

module Definition =
    let Mic =
        Class "Mic"
        |+> Instance [
                "connect" => T<string> ^-> T<unit>
                "start" => T<unit> ^-> T<unit>
                "stop" => T<unit> ^-> T<unit>
                "onaudiostart"=> T<unit> ^-> T<unit>
                "onaudioend"=> T<unit> ^-> T<unit>
                "onconnecting"=> T<unit> ^-> T<unit>
                "ondisconnected"=> T<unit> ^-> T<unit>
                "onready"=> T<unit> ^-> T<unit>
                "onerror"=> T<string> ^-> T<unit>
                "onresult"=> T<string> ^-> T<obj list> ^-> T<unit>
            ]
        |+> Static [
                Constructor (T<unit>)
            ]

    let Assembly =
        Assembly [
            Namespace "SMApp.Microphone.Resources" [
                Resource "Js" "https://allisterb-selma.s3.us-east-2.amazonaws.com/microphone/js/microphone.min.js"
                |> AssemblyWide
                Resource "Css" "https://allisterb-selma.s3.us-east-2.amazonaws.com/microphone/css/microphone.min.css"
                |> AssemblyWide
            ]
            Namespace "SMApp.Microphone" [
                 Mic
            ]
        ]

[<Sealed>]
type Extension() =
    interface IExtension with
        member ext.Assembly =
            Definition.Assembly

[<assembly: Extension(typeof<Extension>)>]
do ()