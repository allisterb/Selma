namespace SMApp.Web

open System
open System.Collections.Generic;
open System.Linq

open FSharp.Control

open WebSharper
open MongoDB.Driver
open MongoDB.Bson
open MongoDB.Driver.Linq
open FSharp.MongoDB
open Npgsql.FSharp

open SMApp
open SMApp.Models

type _User = {
    Id: BsonObjectId
    username: string
    password: string
    salt:string
    email:string
    displayName:string
}


type ``user`` = {
    user_name:string
    last_logged_in: DateTime option
}
    

module Server =        
   
    let private witai = new WitApi()
    
    let private mongodb =
            let host = Api.Config("MONGODB")
            do if host.IsEmpty() then failwith "Could not retrieve the MongoDB host using configuration key MONGODB"
            let connectionString = sprintf "mongodb://%s:%s@<%s>/test?w=majority" host "eddi" "eddi"
            new MongoClient(connectionString)
    
    let private mongodb_users = mongodb.GetDatabase("eddi").GetCollection<``user``>("users")
    
    let private pgdb =
        Sql.host (Api.Config("PGSQL"))
        |> Sql.port 5432
        |> Sql.username "smapp"
        |> Sql.password "smapp"
        |> Sql.database "smapp"
        |> Sql.sslMode SslMode.Prefer
        |> Sql.config "Pooling=true"
        |> Sql.formatConnectionString
        |> Sql.connect

    [<Rpc>]
    let GetUser (user:string) = 
        async {
            use op = beginOp <| sprintf "Find user %s" user
            match! mongodb_users.Find(Builders.Filter.Where(fun (u:``user``) -> u.user_name = user)).FirstAsync() |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o -> 
                op.Complete() 
                return Some {Name=o.user_name}
            | _ -> 
                op.Complete()
                debugf "Did not find user {0}." [user]; return None
        }

    [<Rpc>]
    let GetUser2(user:string) : Async<User option> = 
        pgdb
        |> (Sql.query <| sprintf "SELECT * FROM selma_user WHERE user_name='%s'" user)
        |> Sql.executeAsync (fun read ->
        {
            Name =  read.string("user_name") 
        }) 
        |> Async.map(function | Ok (u)  -> (if u.Length > 0 then Some u.Head else None) | Error exn -> err(exn.Message); None)

    [<Rpc>]
    let GetMeaning input = 
        async {
            match! witai.GetMeaning input |> Async.AwaitTask |> Async.Catch with
            | Choice1Of2 o when not(isNull(o)) -> 
                let intents = o.Intents |> Seq.map (fun i -> Text.Intent'(i.Name, i.Confidence)) |> List.ofSeq
                let entities = 
                    o.Entities 
                    |> Seq.map (fun en -> en.Value) 
                    |> Seq.concat 
                    |> Seq.map (fun e -> Text.Entity'(e.Name, e.Confidence, e.Role, e.Value))
                    |> List.ofSeq
                return Text.Meaning'(intents, entities) |> Some
            | Choice2Of2 exn -> errf "Could not get Wit.ai meaning for input '{0}'. Exception: {1}" [input; exn.Message]; return None
            | _ -> errf "Could not get Wit.ai meaning for input '{0}'. Exception: {1}" [input]; return None
        }

    [<Rpc>]
    let GetPatients() : Async<Result<Patient list, string>> = 
        pgdb
        |> Sql.query "SELECT * FROM patient"
        |> Sql.executeAsync (fun read ->
        {
            Id =  read.string("Id") |> Models.String
            Sex = Male
            Name = None
            BirthDate = None
            Address = None
        }) 
        |> Async.map(function | Ok r -> Ok r | Error exn -> Error(exn.Message))
    