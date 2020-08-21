#region Attribution
// Contains code from the Wit.net project - https://github.com/migueldeicaza/TensorFlowSharp/
// TensorFlowSharp is authored by Miguel de Icaza and licensed under the MIT License: https://github.com/migueldeicaza/TensorFlowSharp/blob/master/LICENSE
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

using SMApp.NLU.Wit;

namespace SMApp
{
    public class WitApi : Api
    {
        #region Constructors
        public WitApi(string token) : base()
        {
            if (string.IsNullOrEmpty(token))
            {
                Error("The Wit.ai token retrieved is empty.");
            }
            else
            {
                authValue = "Bearer " + token;
                restClient = new RestClient("https://api.wit.ai");
                Initialized = true;
            }
        }

        public WitApi() : this(Config("WITAI")) { }
        #endregion

        #region Methods
        public async Task<Meaning> GetMeaning(string q, string msg_id = null, string thread_id = null)
        {
            ThrowIfNotInitialized();
            var request = new RestRequest("message", Method.GET);
            request.AddQueryParameter("q", q);
            if (msg_id != null)
                request.AddQueryParameter("msg_id", msg_id);
            if (thread_id != null)
                request.AddQueryParameter("thread_id", thread_id);
            request.AddHeader("Authorization", authValue);
            IRestResponse response = await restClient.ExecuteAsync(request);
            if (response.ErrorException != null) throw response.ErrorException;
            return JsonConvert.DeserializeObject<Meaning>(response.Content);
        }
        #endregion

        #region Fields
        private string authValue;
        private RestClient restClient;
        #endregion
    }
}
