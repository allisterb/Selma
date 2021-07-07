using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

using Google.Apis.Auth.OAuth2;
using Google.Apis.CloudHealthcare.v1;
using Google.Apis.CloudHealthcare.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;


namespace SMApp.NLU.GoogleHC
{
    public class GoogleHCApi : Runtime
    {
        #region Constructors
        static GoogleHCApi()
        {
            Info("Google HealthCare API project id is {0}.", Config("GOOGLE_PROJECT_ID"));
            Info("Using service account data from {0}.", Config("GOOGLE_APPLICATION_CREDENTIALS"));
            using (var stream = File.OpenRead(Config("GOOGLE_APPLICATION_CREDENTIALS")))
            {
                Credential = GoogleCredential.FromStream(stream).CreateScoped("https://www.googleapis.com/auth/cloud-platform").UnderlyingCredential;

            }
            Service = new CloudHealthcareService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = Credential,
                ApplicationName = "micah",
            });
         
            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer ");
        }
        #endregion

        #region Properties
        public static CloudHealthcareService Service { get; }
        #endregion

        #region Methods
        public static async Task<string> AnalyzeEntities(string document)
        {
            var token = await Credential.GetAccessTokenForRequestAsync();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var r = await httpClient.PostAsync("https://healthcare.googleapis.com/v1beta1/projects/seismic-bonfire-319022/locations/us-central1/services/nlp:analyzeEntities", new StringContent("{" + string.Format("'nlpService':'projects/{0}/locations/us-central1/services/nlp', 'documentContent':'{1}', 'licensedVocabularies':['SNOMEDCT_US','ICD10CM']", 
                Config("GOOGLE_PROJECT_ID"), document) + "}"));
            r.EnsureSuccessStatusCode();
            return await r.Content.ReadAsStringAsync();
        }
        #endregion

        #region Fields
        private static ICredential Credential;

        private static HttpClient httpClient = new HttpClient();
        #endregion
    }
}
