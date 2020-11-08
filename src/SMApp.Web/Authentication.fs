namespace SMApp.Web

open System
open System.Collections.Generic
open System.IO
open System.Text
open System.Text.RegularExpressions
open System.Net.Http
open System.Net.Http.Headers
open System.Security.Cryptography
open System.Text
open System.Threading.Tasks;
open Microsoft.Azure.CognitiveServices.Vision.Face
open Microsoft.CognitiveServices.Speech;
open Microsoft.CognitiveServices.Speech.Audio;

open WebSharper

open SMApp
open SMApp.TypingDNA

module TypingDNA =
    [<JavaScript>]
    type SaveResponse = {
        name: string
        message: string
        message_code: int
        status: int
    }

    [<JavaScript>]
    type UserResponse = {
        message: string
        message_code: int
        success: int
        count:int
        status: int
    }

    [<JavaScript>]
    type VerifyResponse = {
        message: string
        message_code: int
        success: int
        result:int
        score:int
        confidence: int
    }

    [<JavaScript>]
    let getSameTextTypingPattern (text:string) (dna: TypingDNA.TypingDNA) =
        let opt = new TypingDNAOptions(1, Text = text, CaseSensitive = true)
        dna.GetTypingPattern(opt)

    let private apiKey = Runtime.Config("TYPINGDNA_KEY")
    let private apiSecret = Runtime.Config("TYPINGDNA_SECRET")
    let private authString = Convert.ToBase64String(Encoding.ASCII.GetBytes(String.Format("{0}:{1}", apiKey, apiSecret)));
    let private baseUrl = "https://api.typingdna.com/{0}/{1}";
    let private contentType = "application/x-www-form-urlencoded"; 
    let private md5Provider = new MD5CryptoServiceProvider()

    let savePattern (id: string) (tp: string) =
        async {
            try
                use httpClient = new HttpClient()
                do httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType))
                httpClient.DefaultRequestHeaders.Authorization <- new AuthenticationHeaderValue("Basic", authString);
                let data = new FormUrlEncodedContent([|new KeyValuePair<string, string>("tp", tp)|])
                let userData = Convert.ToBase64String(md5Provider.ComputeHash(ASCIIEncoding.ASCII.GetBytes(id)))
                use!response = httpClient.PostAsync(String.Format(baseUrl, "save", userData), data) |> Async.AwaitTask 
                let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask 
                infof "Received {0} from TypingDNA API for saving pattern for user {1}/{2}." [content; id; userData]
                return content |> Json.Deserialize<SaveResponse> |> Ok
            with error -> return Error error.Message
        }

    let verifyPattern (id: string) (tp: string) =
        async {
            try
                use httpClient = new HttpClient()
                do httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType))
                httpClient.DefaultRequestHeaders.Authorization <- new AuthenticationHeaderValue("Basic", authString);
                let data = new FormUrlEncodedContent([|new KeyValuePair<string, string>("tp", tp)|])
                let userData = Convert.ToBase64String(md5Provider.ComputeHash(ASCIIEncoding.ASCII.GetBytes(id)))
                use!response = httpClient.PostAsync(String.Format(baseUrl, "verify", userData), data) |> Async.AwaitTask 
                let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask 
                infof "Received {0} from TypingDNA API for verifying pattern for user {1}/{2}." [content; id; userData]
                return content |> Json.Deserialize<VerifyResponse> |> Ok
            with error -> return Error error.Message
        }

    let getUser (id: string)  =
        async {
            try
                use httpClient = new HttpClient()
                do httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType))
                httpClient.DefaultRequestHeaders.Authorization <- new AuthenticationHeaderValue("Basic", authString);
                let userData = Convert.ToBase64String(md5Provider.ComputeHash(ASCIIEncoding.ASCII.GetBytes(id)))
                use!response = httpClient.GetAsync(String.Format(baseUrl, "user", userData)) |> Async.AwaitTask 
                let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask 
                infof "Received {0} from TypingDNA API for saving pattern for user {1}/{2}." [content; id; userData]
                return content |> Json.Deserialize<UserResponse> |> Ok
            with error -> return Error error
        }

module AzureSpeech =
    let private apiKey = Runtime.Config "AZURE_SPEECH_KEY"
    let private endpoint = Runtime.Config "AZURE_SPEECH_ENDPOINT"
    let private region = "westus";
    let private config = SpeechConfig.FromSubscription(apiKey, region);

    let createVoiceProfile () =
        async {
            try
                use client = new VoiceProfileClient(config)
                let! r = client.CreateProfileAsync(VoiceProfileType.TextDependentVerification, "en-US") |> Async.AwaitTask
                return Ok r
            with error -> return Error error.Message
        }

    let deleteVoiceProfile (profile: VoiceProfile) =
        async {
            try
                use client = new VoiceProfileClient(config)
                let! r = client.DeleteProfileAsync profile |> Async.AwaitTask
                return Ok r
            with error -> return Error error.Message
        }

    let enrollVoiceProfile (profile:VoiceProfile) (data:JavaScript.Int16Array) = 
        async {
            try
                let _data = Array.create<int16> data.Length 0s
                for i = 0 to data.Length - 1 do _data.[i] <- data.Get i
                let buffer = Array.create<byte> (data.Length * 2) 0uy
                do Buffer.BlockCopy(_data, 0, buffer, 0, buffer.Length)
                debugf "Voice data buffer has length {0} bytes." [buffer.Length]
                use client = new VoiceProfileClient(config) 
                let stream = new PushAudioInputStream()
                use audio = AudioConfig.FromStreamInput(stream)
                do stream.Write(buffer)
                let! result = client.EnrollProfileAsync(profile,  audio) |> Async.AwaitTask
                return 
                    match result.Reason with
                    | ResultReason.EnrolledVoiceProfile -> Ok(result)
                    | _ -> 
                        let e = VoiceProfileEnrollmentCancellationDetails.FromResult(result)
                        Error e.ErrorDetails
            with e -> return Error e.Message
        }

module AzureFace =
    let private apiKey = Runtime.Config "AZURE_FACE_KEY"
    let private endpoint = Runtime.Config "AZURE_FACE_ENDPOINT"
    let private client = new FaceClient(new ApiKeyServiceClientCredentials(apiKey), [||])
    let private gid = "selma-person-gid"
    client.Endpoint <- endpoint
    
    let getImageFromDataUrl(s:string) = s.Split(',') |> Seq.last |> Convert.FromBase64String
       
    let savePersonFaceToDisk(img:byte[], u:string) =
        let file = System.IO.File.Create(u + ".png")
        do file.Write(img, 0, img.Length)
        infof "Wrote face snapshot to {0}." [Path.GetFullPath u + ".png"] 

    let getPersonGroup() =
        async {                
            let! groups = client.PersonGroup.ListAsync() |> Async.AwaitTask                             
            match groups |> Seq.tryFind(fun g -> g.PersonGroupId = gid) with
            | Some g -> return g
            | None ->
                infof "Creating Azure Face person group {0}." [gid]
                do! client.PersonGroup.CreateAsync (gid) |> Async.AwaitTask
                let! groups' = client.PersonGroup.ListAsync() |> Async.AwaitTask
                return groups' |> Seq.find (fun g ->g.PersonGroupId = gid) 
        }

    let addPerson(pid:string) =
        async {
            try
                let! g = getPersonGroup()
                let! p = client.PersonGroupPerson.CreateAsync(g.PersonGroupId, pid) |> await
                if isNull p then 
                    let e = sprintf "Could not create Azure Face person using id %s." pid
                    err e; return Error e
                else
                    infof "Added Azure Face person with id {0}." [p.Name]; return Ok p
            with e -> return Error e.Message
        }

    let getPerson(uid:string) =
        async {
            try
                let! g = getPersonGroup()
                let! p = client.PersonGroupPerson.GetAsync(g.PersonGroupId, Guid.Parse uid) |> await
                if isNull p then 
                    let e = sprintf "Could not get Azure Face person with id %s." uid
                    err e;
                    return Error e  
                else return Ok p
            with e -> return Error e.Message
        }
    
    let detectFaceAttributes(img:byte[]) =
        async {
            let! f = client.Face.DetectWithStreamAsync(new MemoryStream(img), recognitionModel = Models.RecognitionModel.Recognition03) |> Async.AwaitTask
            infof "Detected faces: {0}." [f.Count]
            return 
                match f.Count with
                | 0 -> None
                | _ -> 
                    //info f.[0].
                    infof "Age: {0}" [f.[0].FaceAttributes.Age.Value.ToString()] 
                    f.[0] |> Some
        }

    let detectFace(img:byte[]) =
        async {
            let! f = client.Face.DetectWithStreamAsync(new MemoryStream(img), recognitionModel = Models.RecognitionModel.Recognition01, detectionModel = Models.DetectionModel.Detection02) |> Async.AwaitTask
            infof "Detected faces: {0}." [f.Count]
            return 
                match f.Count with
                | 0 -> None
                | _ ->
                    let file = System.IO.File.Create("detect-face.png")
                    do file.Write(img, 0, img.Length)
                    infof "Wrote face snapshot to {0}." [Path.GetFullPath "detect-face.png"]
                    f.[0]|> Some
        }

    let enrollPersonFace (p:Models.Person) (img:byte[]) =
        async {
            try
                match! detectFace img with
                | None -> 
                    let e = "The image does not contain a face."
                    err e; return Error e 
                | Some f -> 
                    let! pf = client.PersonGroupPerson.AddFaceFromStreamAsync(gid, p.PersonId, new MemoryStream(img), 
                                detectionModel = Models.DetectionModel.Detection02) |> await
                    infof "Added face with id {0} for user face_profile id id {1}." [pf.PersistedFaceId; p.PersonId]; return Ok pf
            with error -> return Error error.Message
        }