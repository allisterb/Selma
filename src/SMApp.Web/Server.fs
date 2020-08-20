namespace SMApp.Web

open FSharp.Control

open WebSharper

open SMApp
open SMApp.EDDI

module Server =        
    let eddi = new EDDIApi()
    
    [<Rpc>]
    let GetUser user = async {
        let! u = eddi.GetUser user |> Async.AwaitTask
        match u with
        | null -> return None
        | o -> return (o |> Some)
    }