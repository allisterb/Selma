namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.Web

[<JavaScript>]
module Questions =
    let userAuthenticationDialogue (d:Dialogue) (debug:string -> unit) (q:Question) (u:string) =
        let say = Dialogue.say d
     
        let trigger = Dialogue.trigger d debug q.Target q.Name
        let cancel = Dialogue.cancel d debug 
       
        let passPhrase = sprintf "Hello my name is %s and I am an administrator" u
        say <| sprintf "Enter the phrase %s." passPhrase 
        
        let collectData() = 
            d.Cui.MonitorTypingPattern None
            let c = createDialogueBoxCanvas()
            startCamera JS.Document.Body c
        
        let rec box() = 
            questionBox "Biometric Authentication" "" 640 480 None (Some collectData) (fun o ->  
                let text = o :?> string
                let image = getCameraCanvas().ToDataURL();
                debug <|sprintf "User image is %s..." (image.Substring(0, 10))
                stopCamera()
                let pattern =  d.Cui.GetSameTextTypingPattern passPhrase None
                debug <| sprintf "User entered typing pattern %s for text %s" pattern text
                if text.ToLower() <> passPhrase.ToLower() then
                    say "Sorry you did not enter the passphrase correctly. Please try again."
                    box()
                else [|u; pattern; image|] |> trigger) (fun _ -> 
                    stopCamera()
                    cancel q.Name 
                )
        box()

    let ask (d:Dialogue) (debug:string -> unit) (q:Question) =    
        Dialogue.pushq d debug q
        match q.Type with
        | UserAuthentication u -> userAuthenticationDialogue d debug q u
        | _ -> failwith "Not implemented"
