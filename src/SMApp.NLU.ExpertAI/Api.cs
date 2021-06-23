using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using SMApp;

namespace SMApp.NLU.ExpertAI
{
    public class ExpertAIApi : Runtime
    {
        #region Constructors
        public ExpertAIApi(string token) : base() 
        {
            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
            client = new Client(httpClient);
            Initialized = token != "";
        }
        #endregion

        #region Methods
        public async Task<ICollection<Relation>> AnalyzeRelations(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r = await client.AnalyzePostAsync("standard", Language2.En, Analysis.Relations, request);
            return r.Success ? r.Data.Relations : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }

        public async Task<ICollection<MainLemma>> AnalyzeMainLemmas(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r = await client.AnalyzePostAsync("standard", Language2.En, Analysis.Relevants, request);
            return r.Success ? r.Data.MainLemmas : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }

        public async Task<ICollection<Entity>> AnalyzeEntities(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r = await client.AnalyzePostAsync("standard", Language2.En, Analysis.Entities, request);
            return r.Success ? r.Data.Entities : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }

        public async Task<CategorizeDocument> AnalyzeEmotionalTraits(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r = await client.CategorizeAsync("emotional-traits", Language3.En, request);
            return r.Success ? r.Data : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }

        public async Task<CategorizeDocument> AnalyzeBehavioralTraits(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r = await client.CategorizeAsync("behavioral-traits", Language3.En, request);
            return r.Success ? r.Data : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }

        #endregion

        #region Fields
        private static HttpClient httpClient = new HttpClient();
        private Client client;
        #endregion
    }
}
