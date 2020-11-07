namespace SMApp.Web

open System.Collections.Generic

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open SMApp.Web

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
                
            let rec box() = 
                let setupBox1(b:SweetAlert.Box) =
                    b.Input <- "text"
                    b.ShowCancelButton <- true
                    b.ConfirmButtonText <- "Ok"

                let setupBox2(b:SweetAlert.Box) =
                    b.ConfirmButtonClass <- "invisible"

                let collectFaceAndTypingData() =
                    d.Cui.MonitorTypingPattern None
                    let c = createDialogueBoxCanvas()
                    startCamera JS.Document.Body c

                questionBox "Biometric Authentication" "" 640 480 (Some setupBox1) (Some collectFaceAndTypingData) (fun o ->  
                    let text = o :?> string
                    let image = getCameraCanvas().ToDataURL();
                    debug <|sprintf "User image is %s..." (image.Substring(0, 10))
                    stopCamera()
                    let pattern =  d.Cui.GetSameTextTypingPattern passPhrase None
                    debug <| sprintf "User entered typing pattern %s for text %s" pattern text
                    if text.ToLower() <> passPhrase.ToLower() then
                        say "Sorry you did not enter the passphrase correctly. Please try again."
                        box()
                    else 
                        let collectVoiceData () =
                            let data = [|u; pattern; image|]
                            do getDialogueBoxContent().AppendChild(getMic()) |> ignore
                            d.Cui.AudioHandlers.Add("VoiceAuthentication", fun v -> let j = v |> Json.Serialize in confirmQuestionBox(); Array.append data [|j|] |> trigger)
                        questionBox "Biometric Authentication" "" 480 160  (Some setupBox2) (Some collectVoiceData)  (fun _ -> ()) 
                            (fun _ -> say "Ok but you must login for me to help you."; cancel q.Name)
                    )        
                    (fun _ -> 
                        say "Ok but you must login for me to help you."
                        stopCamera()
                        cancel q.Name 
                 ) 
            box()

        Dialogue.pushq d debug q
        match q.Type with
        | UserAuthentication u -> userAuthenticationDialogue d debug q u
        | _ -> failwith "Not implemented"


