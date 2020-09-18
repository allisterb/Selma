namespace SMApp.Web

open System
open System.Collections.Generic;
open System.Linq

open FSharp.Control

open WebSharper
open Npgsql.FSharp
open Humanizer

open SMApp
open SMApp.Models
    
module Server =        
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
    let humanize(date:DateTime) = async { return date.Humanize() }

    [<Rpc>]
    let getUser(user:string) : Async<User option> = 
        pgdb
        |> Sql.query "SELECT * FROM selma_user WHERE user_name=@u"
        |> Sql.parameters ["u", Sql.string user]
        |> Sql.executeAsync (fun read -> {
            Name =  read.string("user_name")
            LastLoggedIn = read.timestampOrNone "last_logged_in" |> Option.map(fun t -> t.ToDateTime())
        }) 
        |> Async.map(
            function 
            | Ok u  -> (if u.Length > 0 then infof "Retrieved user {0} from database." [u.Head.Name]; Some u.Head else None) 
            | Error exn -> errex "Error retrieving user {0} to database." exn [user]; None)

    [<Rpc>]
    let addUser (user:string) : Async<unit Option> =
        pgdb
        |> Sql.query "INSERT INTO public.selma_user(user_name, last_logged_in) VALUES (@u, @d);"
        |> Sql.parameters [("u", Sql.string user); ("d", Sql.timestamp (DateTime.Now))]
        |> Sql.executeNonQueryAsync
        |> Async.map(
            function 
            | Ok n -> (if n > 0 then infof "Added user {0} to database." [user]; Some() else None) 
            | Error exn -> errex "Error adding user {0} to database." exn [user]; None)

    [<Rpc>]
    let updateUserLastLogin (user:string) : Async<unit option> =
        pgdb
        |> Sql.query "UPDATE public.selma_user SET last_logged_in=@d WHERE user_name=@u;"
        |> Sql.parameters [("u", Sql.string user); ("d", Sql.timestamp (DateTime.Now))]
        |> Sql.executeNonQueryAsync
        |> Async.map(
            function 
            | Ok n -> (if n > 0 then infof "Added updated user {0} last login time in database." [user]; Some() else None) 
            | Error exn -> errex "Error updating user {0} last login time in database." exn [user]; None)

    [<Rpc>]
    let addSymptomJournalEntry (userName:string) (magnitude:int option) (location:string option) : Async<unit Option> =
        pgdb
        |> Sql.query "INSERT INTO public.symptom_journal(user_name, date, magnitude, location) VALUES (@u, @d, @m, @l);"
        |> Sql.parameters [
            "u", Sql.string userName 
            "d", Sql.timestamp (DateTime.Now) 
            "m", if magnitude.IsSome then Sql.int(magnitude.Value) else Sql.dbnull
            "l", if location.IsSome then Sql.string (location.Value) else Sql.dbnull
        ]
        |> Sql.executeNonQueryAsync
        |> Async.map(function | Ok n -> (if n > 0 then Some() else None) | Error exn -> err(exn.Message); None)
    
    [<Rpc>]
    let getSymptomJournal(userName:string) : Async<SymptomEntry list option> = 
        pgdb
        |> Sql.query "SELECT * FROM symptom_journal WHERE user_name=@u"
        |> Sql.parameters ["u", Sql.string userName]
        |> Sql.executeAsync (fun read -> {
            UserName =  read.string("user_name")
            Date = (read.timestamp "date").ToDateTime() 
            Magnitude = read.intOrNone "magnitude"  
            Location = read.stringOrNone "location"
        }) 
        |> Async.map(function | Ok j  -> Some j | Error exn -> err(exn.Message); None)

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
    