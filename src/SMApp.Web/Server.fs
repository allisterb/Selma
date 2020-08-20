namespace SMApp.Web

open FSharp.Control

open WebSharper

open SMApp
open SMApp.EDDI

module Server =        
    
    let eddi = new EDDIApi()
    
    [<Rpc>]
    let GetUser user = 
        async {
            match! eddi.GetUser user |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o when not(isNull(o)) -> return Some {UserName=o.Username}
            | _ -> debugf "Did not find user {0}." [user]; return None
        } 

        