namespace SMApp.Web

open System
open System.Text
open System.Net.Http
open System.Net.Http.Headers

open WebSharper

open SMApp

module TypingDNA =
    let private apiKey = Runtime.Config("TYPINGDNA_KEY")
    let private apiSecret = Runtime.Config("TYPINGDNA_SECRET")
    let authString = Convert.ToBase64String(Encoding.ASCII.GetBytes(String.Format("{0}:{1}", apiKey, apiSecret)));
    let private baseUrl = "https://api.typingdna.com/{0}/{1}";
    let private contentType = "application/x-www-form-urlencoded"; 
    
    [<JavaScript>]
    type Response = {
        name: string
        message: string
        message_code: int
        status: int
    }

    let savePattern (id: string) (tp: string) =
        async {
            try
                use httpClient = new HttpClient()
                do httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType))
                httpClient.DefaultRequestHeaders.Authorization <- new AuthenticationHeaderValue("Basic", authString);
                let data = new FormUrlEncodedContent([|new System.Collections.Generic.KeyValuePair<string, string>("tp", tp)|])
                use! response = httpClient.PostAsync(String.Format(baseUrl, "save", id), data) |> Async.AwaitTask 
                let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask 
                return content |> Json.Deserialize<Response> |> Ok
            with error -> return Error error
        }

