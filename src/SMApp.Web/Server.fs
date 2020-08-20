namespace SMApp.Web

module Server =
    
    open FSharp.Control

    open WebSharper
    
    open SMApp
    open SMApp.EDDI
    
    let eddi = new EDDIApi()
    
    [<Rpc>]
    let GetUser user = async {
        return! eddi.GetUser user
    }