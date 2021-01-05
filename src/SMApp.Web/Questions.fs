namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.TypingDNA

[<JavaScript>]
module Questions =
    let rec ask (d:Dialogue) (debug:string -> unit) (q:Question) =        
        // User authentication dialogue 
        let userAuthenticationDialogue (d:Dialogue) (debug:string -> unit) (q:Question) (u:string) =
            let say = Dialogue.say d
            let trigger = Dialogue.trigger d debug q.Target q.Name
            let cancel = Dialogue.cancel d debug 
            let passPhrase = sprintf "Hello my name is %s and I am an administrator" u
            say <| sprintf "Enter the phrase %s." passPhrase 
                
            let setupBox1(b:SweetAlert.Box) =
                b.Input <- "text"
                b.ShowCancelButton <- true
                b.ConfirmButtonText <- "Ok"
               
            let setupBox2(b:SweetAlert.Box) =
                b.ConfirmButtonClass <- "invisible"
                b.ShowCancelButton <- true
                
            let collectFaceAndTypingData() =
                let c = createDialogueBoxCanvas()
                startCamera JS.Document.Body c
               
            let rec box(c:int, data: string array array) = 
                questionBox "Biometric Authentication" "" (Some (boxesWithTitles [|"2"; "3"|])) (Some (640, 480)) (Some setupBox1) (Some (collectFaceAndTypingData)) (fun o ->
                    match o.IsConfirmed with
                    | true ->
                        let pattern = d.Cui.TypingDNA.GetTypingPattern(new TypingDNAOptions(Type = 1, Text = passPhrase, CaseSensitive = false))
                        let text = o.Value :?> string
                        let image = getCameraCanvas().ToDataURL();
                        debug <|sprintf "User image is %s..." (image.Substring(0, 10))
                        stopCamera()
                        debug <| sprintf "User entered typing pattern %s for text %s" pattern text
                        if text.ToLower() <> passPhrase.ToLower() then
                            say "Sorry you did not enter the passphrase correctly. Please try again."
                            box(c, data)
                        else 
                            let collectVoiceData () =
                                let data = [|u; pattern; image|]
                                do getDialogueBoxContent().AppendChild(getMic()) |> ignore
                                d.Cui.AudioHandlers.Add("VoiceAuthentication", 
                                                            fun v -> 
                                                                let j = v |> Json.Serialize in 
                                                                confirmQuestionBox()
                                                                ///let d = Array.append data [|j|]
                                                                //let data' = 
                                                                //if d = 3 then trigger(d)
                                                            )
                            questionBox "Biometric Authentication" "" None None (Some setupBox2) (Some collectVoiceData)  (
                                fun o -> 
                                    if not o.IsConfirmed then 
                                        do d.Cui.AudioHandlers.Remove("VoiceAuthentication") |> ignore
                                        say "OK but you must login for me to help you."
                            )    
                    | false -> say "OK but you must login for me to help you."        
                    )        
            box(0, [||])

        Dialogue.pushq d debug q
        match q.Type with
        | UserAuthentication u -> userAuthenticationDialogue d debug q u
        | _ -> failwith "Not implemented"


