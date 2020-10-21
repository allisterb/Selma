namespace SMApp.Compromise

open WebSharper
open WebSharper.JavaScript
open WebSharper.InterfaceGenerator

module Definition =

    let Nlp = 
        Class "Nlp"
        |+> Static [
            Constructor (T<string>? target) |> WithInline("new window.nlp($target)")
        ]
        |+> Instance[
            "match" => T<string> ^-> TSelf
            "text" => T<unit> ^-> T<string>
        ]


    let Assembly =
        Assembly [
            Namespace "SMApp.Compromise.Resources" [
                Resource "compromise" "https://unpkg.com/compromise" |> AssemblyWide
                Resource "numbers" "https://unpkg.com/compromise-numbers" |> AssemblyWide
                Resource "dates" "https://unpkg.com/compromise-dates" |> AssemblyWide
                Resource "adjectives" "https://unpkg.com/compromise-adjectives" |> AssemblyWide
                Resource "syllables" "https://unpkg.com/compromise-syllables" |> AssemblyWide
                Resource "sentences" "https://unpkg.com/compromise-sentences" |> AssemblyWide
                Resource "paragraphs" "https://unpkg.com/compromise-paragraphs" |> AssemblyWide
            ]
            Namespace "SMApp.Compromise" [
                Nlp
            ]
        ]

[<Sealed>]
type Extension() =
    interface IExtension with
        member ext.Assembly =
            Definition.Assembly

[<assembly: Extension(typeof<Extension>)>]
do ()
