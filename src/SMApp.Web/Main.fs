namespace SMApp.Web

open WebSharper

[<JavaScript>]
module Main =
    
    let debug m = sprintf "Main: %A" m |> ClientExtensions.debug
    
    let (|Intent|_|) n = 
        function
        | Some(Intent (i, _)) when i = n -> Some ()
        | _ -> None
        
    let (|Entity|_|) (n:string) :Entity->string option = 
        function
        | entity when entity.Name = n -> Some entity.Value
        | _ -> None

    let update (cui: CUI) (context: Meaning list) =
        let say = cui.Say
        debug <| sprintf "Current context: %A." context
        match context with
        | Meaning(Intent "hello", None, None)::[] -> 
            cui.Say <| sprintf "Hello. My name is Selma. What's yours?" 
        | Meaning(Intent "hello", _, Some [Entity "contact" u])::_ ->            
            cui.Wait(fun _ -> 
                match Server.GetUser u  with
                | Some user -> say <| sprintf "Hello %s" u
                | None -> say "Sorry I did not find that user."
            )
        //| Meaning "hello" (Meaning "hello" x) -> cui.Say <| sprintf "Hello %s" u.Name
        | _ -> ()