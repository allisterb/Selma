namespace SMApp.TypingDNA

open WebSharper
open WebSharper.JavaScript
open WebSharper.InterfaceGenerator

module Definition =
    let TypingDNAOptions =
        Pattern.Config "Options"{
            Required=[
                "type", T<int>
            ]
            Optional=
            [
                "text", T<bool>
                "textId", T<int>
                "length", T<int>
                "targetId", T<string>
                "caseSensitive", T<bool>
            ]
        }
    
    let TypingDNA =
        Class "TypingDNA"
        |+> Instance [
                "getTypingPattern" => TypingDNAOptions ^-> T<string>
                "addTarget" => T<string> ^-> T<unit>
                "removeTarget" => T<string> ^-> T<unit>
                "start" => T<unit> ^-> T<unit>
                "stop" => T<unit> ^-> T<unit>
                "reset" => T<unit> ^-> T<unit>
            ]
        |+> Static [
                Constructor (T<unit>)
            ]

    let Assembly =
        Assembly [
            Namespace "SMApp.TypingDNA" [
                Resource "Js" "https://www.typingdna.com/scripts/typingdna.js" |> AssemblyWide                
            ]
            Namespace "SMApp.TypingDNA" [
                 TypingDNAOptions
                 TypingDNA
            ]
        ]

[<Sealed>]
type Extension() =
    interface IExtension with
        member ext.Assembly =
            Definition.Assembly

[<assembly: Extension(typeof<Extension>)>]
do ()