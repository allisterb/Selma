namespace SMApp.Web

open WebSharper
open WebSharper.JavaScript
open WebSharper.Sitelets
open WebSharper.UI
open WebSharper.UI.Server
open WebSharper.JQueryTerminal

type Route =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.UI.Html

    type MainTemplate = Templating.Template<"wwwroot/Main.html">

    // Compute a menubar where the menu item for the given endpoint is active
    let MenuBar (ctx: Context<Route>) endpoint : Doc list =
        let ( => ) txt act =
             li [if endpoint = act then yield attr.``class`` "active"] [
                a [attr.href (ctx.Link act)] [text txt]
             ]
        [
            "Home" => Home
            "About" => About
        ]

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
            | Home -> HomePage ctx
            | About -> AboutPage ctx
        )
    
    

