namespace SMApp.Web

open System.Collections.Generic;

open FSharp.Control

open WebSharper
open MongoDB.Driver
open Npgsql.FSharp

open SMApp
open SMApp.Models
open SMApp.EDDI

module Server =        
   
    let private witai = new WitApi()
    
    let private mongodb =
            let host = Api.Config("MONGODB")
            do if host.IsEmpty() then failwith "Could not retrieve the MongoDB host using configuration key MONGODB"
            let connectionString = sprintf "mongodb://%s:%s@<%s>/test?w=majority" host "eddi" "eddi"
            new MongoClient(connectionString)
        
    let private pgdb =
        Sql.host (Api.Config("PGSQL"))
        |> Sql.port 5432
        |> Sql.username "smapp"
        |> Sql.password "smapp"
        |> Sql.database "smapp"
        |> Sql.sslMode SslMode.Require
        |> Sql.config "Pooling=true"
        |> Sql.formatConnectionString
        |> Sql.connect

    let private users = mongodb.GetDatabase("eddi").GetCollection<User>("Users")

    //infof "Got {0} users. " [users.CountDocuments(FilterDefinitionBuilder().Empty)]
    
    [<Rpc>]
    let GetPatients() : Result<Patient list, exn> =       
        pgdb
        |> Sql.query "SELECT * FROM Patient"
        |> Sql.execute (fun read ->
        {
            Id =  read.string("Id") |> Models.String
            Sex = Male
            Name = None
            BirthDate = None
            Address = None
        })
        

        
    (*
    //let u = users.FindAsync()
    [<Rpc>]
    let GetUser user = 
        async {
            match! eddi.GetUser user |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o when not(isNull(o)) -> debugf "Found user {0}." [user]; return Some {UserName=o.Username}
            | _ -> debugf "Did not find user {0}." [user]; return None
        }
    *)  
    [<Rpc>]
    let GetMeaning input = 
        async {
            match! witai.GetMeaning input |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o when not(isNull(o)) -> 
                let intents = o.Intents |> Seq.map (fun i -> Text.Intent(i.Name, i.Confidence)) |> List.ofSeq
                let entities = 
                    o.Entities 
                    |> Seq.map (fun en -> en.Value) 
                    |> Seq.concat 
                    |> Seq.map (fun e -> Text.Entity(e.Name, e.Confidence, e.Role, e.Value))
                    |> List.ofSeq
                return Text.Meaning(intents, entities) |> Some
            | _ -> debugf "Could not get Wit.ai meaning for input '{0}'." [input]; return None
        }

        