namespace SMApp.Web

open System
open System.Collections.Generic
open System.IO
open System.Text
open System.Net.Http
open System.Net.Http.Headers

open System.Threading.Tasks;
open Microsoft.CognitiveServices.Speech;
open Microsoft.CognitiveServices.Speech.Audio;

open WebSharper

open SMApp
open SMApp.TypingDNA

module TypingDNA =
    [<JavaScript>]
    type Response = {
        name: string
        message: string
        message_code: int
        status: int
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
    
    let savePattern (id: string) (tp: string) =
        async {
            try
                use httpClient = new HttpClient()
                do httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType))
                httpClient.DefaultRequestHeaders.Authorization <- new AuthenticationHeaderValue("Basic", authString);
                let data = new FormUrlEncodedContent([|new KeyValuePair<string, string>("tp", tp)|])
                use! response = httpClient.PostAsync(String.Format(baseUrl, "save", id), data) |> Async.AwaitTask 
                let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask 
                infof "Received {0} from TypingDNA API." [content]
                return content |> Json.Deserialize<Response> |> Ok
            with error -> return Error error
        }

module AzureSpeech =
    let private apiKey = Runtime.Config("AZURE_SPEECH_KEY")
    let private region = "westus";
    let private config = SpeechConfig.FromSubscription(apiKey, region);
    
    let createVoiceProfile () =
        async {
            use client = new VoiceProfileClient(config)
            return! client.CreateProfileAsync(VoiceProfileType.TextDependentVerification, "en-US") |> Async.AwaitTask
        }

    let enrollVoiceProfile (profile:VoiceProfile, data:JavaScript.Int16Array) = 
        async {
            let _data = Array.create<int16> data.Length 0s
            for i = 0 to data.Length - 1 do _data.[i] <- data.Get i
            let buffer = Array.create<byte> (data.Length * 2) 0uy
            do Buffer.BlockCopy(_data, 0, buffer, 0, buffer.Length)
            debugf "Voice data buffer has length {0}." [buffer.Length]
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
                    Error e
        }