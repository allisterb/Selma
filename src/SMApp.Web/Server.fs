namespace SMApp.Web

open System.Collections.Generic;

open FSharp.Control

open WebSharper

open SMApp
open SMApp.EDDI

module Server =        
    
    let private eddi = new EDDIApi()
    let private witai = new WitApi()
    
    [<Rpc>]
    let GetUser user = 
        async {
            match! eddi.GetUser user |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o when not(isNull(o)) -> debugf "Foud user {0}." [user]; return Some {UserName=o.Username}
            | _ -> debugf "Did not find user {0}." [user]; return None
        }
        
    [<Rpc>]
    let GetMeaning input = 
        async {
            match! witai.GetMeaning input |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o when not(isNull(o)) -> 
                let intents = o.Intents |> Seq.map (fun i -> Intent(i.Name, i.Confidence)) |> List.ofSeq
                let entities = 
                    o.Entities 
                    |> Seq.map (fun en -> en.Value) 
                    |> Seq.concat 
                    |> Seq.map (fun e -> Entity(e.Name, e.Confidence, e.Role, e.Value))
                    |> List.ofSeq
                return Meaning(intents, entities) |> Some
            | _ -> debugf "Could not get Wit.ai meaning for input '{0}'." [input]; return None
        }

        