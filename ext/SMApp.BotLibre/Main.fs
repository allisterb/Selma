namespace SMApp.BotLibre

open WebSharper
open WebSharper.JavaScript
open WebSharper.InterfaceGenerator

module Definition =
    let SDK =
        Class "SDK"
        |+> Static [
            "applicationId" =@ T<string>
            "host" =@ T<string>
            "app" =@ T<string>
            "scheme" =@ T<string>
            "rest" =@ T<string>
            "debug" =@ T<bool>
            "useCanvas" =@ T<bool>
            "useVideo" =@ T<bool>
            "speechRate" =@ T<float>
            "chime" => T<unit> ^-> T<unit>
        ]

    let Credentials = 
        Class "Credentials"
        |+> Static [
                Constructor (T<unit>)
        ]
        |+> Instance [
            "host" =@ T<string>
            "app" =@ T<string>
            "url" =@ T<string>
            "rest" =@ T<string>
            "applicationId" =@ T<string>
        ]
    let SDKConnection = 
        Class "SDKConnection"
        |+> Static [
                Constructor (T<unit>)
        ]
        |+> Instance [
            "credentials" =@ Credentials
            "user" =@ T<string>
            "domain" =@ T<string>
            "error" =@ T<string>
            "debug" =@ T<bool>
        ]
    let WebAvatar = 
        Class "WebAvatar"
        |+> Instance [
            "speak" =@ T<bool>
            "connection" =@ SDKConnection
            "version" =@ T<float>
            "avatar" =@ T<string>
            "voice" =@ T<string>
            "voiceMod" =@ T<string>
            "nativeVoice" =@ T<bool>
            "nativeVoiceName" =@ T<string>
            "width" =@ T<int>
            "createBox" => T<unit> ^-> T<unit>
            "addMessage" => T<string> ^-> T<unit>
            "addMessage2" => (T<string> * T<string>) ^-> T<unit> |> WithInline("""addMessage($0, $1, "", "")""")
            "processMessages" => T<int> ^-> T<unit>
        ]
        |+> Static [
                Constructor (T<unit>)
        ]            

    let Assembly =
        Assembly [
            Namespace "SMApp.BotLibre.Resources" [
                Resource "Js" "https://www.botlibre.com/scripts/sdk.js"
                |> AssemblyWide
            ]
            Namespace "SMApp.BotLibre" [
                 SDK
                 Credentials
                 SDKConnection
                 WebAvatar
            ]
        ]

[<Sealed>]
type Extension() =
    interface IExtension with
        member ext.Assembly =
            Definition.Assembly

[<assembly: Extension(typeof<Extension>)>]
do ()
