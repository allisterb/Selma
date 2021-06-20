﻿using System;
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
        static ExpertAIApi()
        {
            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + Config("EXPERTAI_TOKEN"));
        }

        public ExpertAIApi() : base() 
        {
            client = new Client(httpClient);
            Initialized = !string.IsNullOrEmpty(Config("EXPERTAI_TOKEN"));
        }
        #endregion

        #region Methods
        public async Task<CategorizeDocument> AnalyzeEmotionalTraits(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r =  await client.CategorizeAsync("emotional-traits", Language3.En, request);
            return r.Success ? r.Data : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }

        public async Task<ICollection<Relation>> AnalyzeRelations(string sentence)
        {
            var request = new AnalysisRequest() { Document = new Document() { Text = sentence } };
            var r = await client.AnalyzePostAsync("standard", Language2.En, Analysis.Relations, request);
            return r.Success ? r.Data.Relations : throw new Exception(r.Errors.Select(e => e.Message).Aggregate((s1, s2) => s1 + Environment.NewLine + s2));
        }
        #endregion

        #region Fields
        private static HttpClient httpClient = new HttpClient();
        private Client client;
        #endregion
    }
}