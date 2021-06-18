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
    let private httpClient = new System.Net.Http.HttpClient()

    let private expertai = new SMApp.NLU.ExpertAI.Client(httpClient)

    let private pgdb =
        Sql.host (Runtime.Config("PGSQL"))
        |> Sql.port 5432
        |> Sql.username "smapp"
        |> Sql.password "smapp"
        |> Sql.database "smapp"
        |> Sql.sslMode SslMode.Prefer
        |> Sql.config "Pooling=true"
        |> Sql.formatConnectionString
        |> Sql.connect
 
    (* Text transformation functions *)
    [<Rpc>]
    let humanize(date:DateTime) = async { return date.Humanize() }

    [<Rpc>]
    let mdtohtml(s:string) = async { return Markdig.Markdown.ToHtml s }

    [<Rpc>]
    let mdtotext(s:string) = async { return Markdig.Markdown.ToPlainText s }

    (* Authentication functions *)
    [<Rpc>]
    let addUserTypingPattern (id:string) (tp: string) = async { return! TypingDNA.savePattern id tp }

    [<Rpc>]
    let verifyUserTypingPattern (id:string) (tp: string) = async { return! TypingDNA.verifyPattern id tp }

    [<Rpc>]
    let enrollUser (userName:string) (voiceData:JavaScript.Int16Array) =
        async {
            match! AzureSpeech.createVoiceProfile() with
            | Error e -> return None
            | Ok profile -> 
                match! AzureSpeech.enrollVoiceProfile profile voiceData with
                | Error e -> 
                    errf "Azure Speech returned {0} when enrolling user {1}." [e; userName]
                    return None
                | Ok r -> 
                    infof "Azure Speech audio profile enrollment for user {0} has: length {1}, speech length {2}, remaining enrollments {3}" [userName; r.AudioLength; r.AudioSpeechLength; r.RemainingEnrollmentsCount]
                    return Some(r)
        }

    [<Rpc>]
    let detectFace (dataUrl:string) = AzureFace.detectFace <| AzureFace.getImageFromDataUrl dataUrl
        
    [<Rpc>]
    let hasFace (dataUrl:string) = 
        async {
            let! f = detectFace dataUrl
            return isVal f
        }

    [<Rpc>]
    let detectFaceAttributes (dataUrl:string) = AzureFace.detectFaceAttributes <| AzureFace.getImageFromDataUrl dataUrl

    [<Rpc>]
    let authUserFace(imageDataUrl:string) =
        async {
            match! detectFace imageDataUrl with
            | None -> return false
            | Some f -> 
                infof "{0}" [f.FaceAttributes.Age.Value.ToString()]
                return true
        }

    [<Rpc>]
    let enrollUserFace(un: string, imgDataUrl:string) = 
        async {
            let uid = Guid.NewGuid().ToString()
            match! AzureFace.addPerson uid with
            | Ok p -> 
                match! imgDataUrl |> AzureFace.getImageFromDataUrl |> AzureFace.enrollPersonFace p with
                | Ok _ -> return Ok uid
                | Error e -> return Error e 
            | Error e -> return Error e
        }

    (* User functions *)
    [<Rpc>]
    let getUser(user:string) : Async<User option> = 
        pgdb
        |> Sql.query "SELECT * FROM smapp_user WHERE user_name=@u"
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
    let addUser (user:string) : Async<Result<unit, string>> =
        pgdb
        |> Sql.query "INSERT INTO public.smapp_user(user_name, last_logged_in) VALUES (@u, @d);"
        |> Sql.parameters [("u", Sql.string user); ("d", Sql.timestamp (DateTime.Now))]
        |> Sql.executeNonQueryAsync
        |> Async.map(
            function 
            | Ok n -> if n > 0 then Ok(infof "Added user {0} to database." [user]) else Error("Insert user returned 0.")
            | Error exn as e -> errex "Error adding user {0} to database." exn [user]; Error exn.Message
        )

    [<Rpc>]
    let updateUserLastLogin (user:string) : Async<Result<unit, exn>> =
        pgdb
        |> Sql.query "UPDATE public.smapp_user SET last_logged_in=@d WHERE user_name=@u;"
        |> Sql.parameters [("u", Sql.string user); ("d", Sql.timestamp (DateTime.Now))]
        |> Sql.executeNonQueryAsync
        |> Async.map (
            function 
            | Ok n -> if n > 0 then Ok(infof "Updated user {0} last login time in database." [user]) else Error(exn("Insert user returned 0.")) 
            | Error exn -> errex "Error updating user {0} last login time in database." exn [user]; Error exn
        )

    [<Rpc>]
    let updateUserTypingProfileId (user:string) (tid:string) : Async<Result<unit, exn>> =
        pgdb
        |> Sql.query "UPDATE public.smapp_user SET typig_logge_in=@d WHERE user_name=@u;"
        |> Sql.parameters [("u", Sql.string user); ("d", Sql.timestamp (DateTime.Now))]
        |> Sql.executeNonQueryAsync
        |> Async.map (
            function 
            | Ok n -> if n > 0 then Ok(infof "Updated user {0} last login time in database." [user]) else Error(exn("Insert user returned 0.")) 
            | Error exn -> errex "Error updating user {0} last login time in database." exn [user]; Error exn
        )

    (* Symptom journal functions *)
    [<Rpc>]
    let addSymptomJournalEntry (user:string) (name:string) (location:string option) (magnitude:int option) : Async<Result<unit, exn>> =
        pgdb
        |> Sql.query "INSERT INTO public.physical_symptom_journal(user_name, name, date, magnitude, location) VALUES (@u, @n, @d, @m, @l);"
        |> Sql.parameters [
            "u", Sql.string user
            "n", Sql.string name
            "d", Sql.timestamp (DateTime.Now) 
            "m", if magnitude.IsSome then Sql.int(magnitude.Value) else Sql.dbnull
            "l", if location.IsSome then Sql.string (location.Value) else Sql.dbnull
        ]
        |> Sql.executeNonQueryAsync
        |> Async.map(
            function 
            | Ok n -> if n > 0 then Ok(infof "Added symptom {0} for user {1} to database." [name;user]) else Error(exn("Insert into symptom journal entry affected 0 rows."))
            | Error exn -> errex "Did not add symptom {0} for user {1} to database" exn [name;user]; Error exn
        )
    
    [<Rpc>]
    let getSymptomJournal(userName:string) : Async<SymptomEntry list option> = 
        pgdb
        |> Sql.query "SELECT * FROM public.physical_symptom_journal WHERE user_name=@u"
        |> Sql.parameters ["u", Sql.string userName]
        |> Sql.executeAsync (fun read -> {
            UserName =  read.string("user_name")
            Date = (read.timestamp "date").ToDateTime() 
            Magnitude = read.intOrNone "magnitude"  
            Location = read.stringOrNone "location"
        }) 
        |> Async.map(function | Ok j  -> Some j | Error exn -> err(exn.Message); None)

    [<Rpc>]
    let getPatients() : Async<Result<Patient list, string>> = 
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

    [<Rpc>]
    let getRel(): Async<Result<string, string>> =
        let n = 1
        let r = 
            expertai.ContextsAsync() 
               |> Async.AwaitTask 
               |> Async.Catch 
               |> Async.map(function | Choice1Of2 r -> Ok("") | Choice2Of2 exn -> Error(exn.Message))
        r
        
        