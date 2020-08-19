namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
open WebSharper.Web
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Server


type Route =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.UI.Html

    type MainTemplate = Templating.Template<"wwwroot/Main.html">

    let Main ctx action (title: string) (body: Doc list) =
        Content.Page(
            MainTemplate()
                .Title(title)
                .Body(body)
                .Doc()
        )
    
module Site =
    open WebSharper.UI.Html

    let HomePage ctx =
        Templating.Main ctx Home "Home" [
            div [attr.id "main"] []
            client <@ Client.Term() @>
        ]

    let AboutPage ctx =
        Templating.Main ctx About "About" [
            h1 [] [text "About"]
            p [] [text "This is a template WebSharper client-server application."]
           
        ]
            
    [<Website>]
    let Main = 
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | Home -> 
                HomePage ctx
            | About -> AboutPage ctx
        )
    
    

