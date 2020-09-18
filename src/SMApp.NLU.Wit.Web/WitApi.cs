#region Attribution
// Contains code from the Wit.net project - https://github.com/migueldeicaza/TensorFlowSharp/
// TensorFlowSharp is authored by Miguel de Icaza and licensed under the MIT License: https://github.com/migueldeicaza/TensorFlowSharp/blob/master/LICENSE
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using WebSharper;
using WebSharper.JavaScript;
using WebSharper.JQuery;

namespace SMApp.NLU.Wit
{
    [JavaScript]
    public class WitApi 
    {
        #region Constructors
        public WitApi(string token) 
        {
            authValue = "Bearer " + token;
        }
        #endregion

        #region Methods
        public void getMeaning(string sentence, Action<object, string, JqXHR> success, Action<JqXHR, string, string> error)
        {
            JQuery.Ajax(
                    new AjaxSettings()
                    {
                        Url = "https://api.wit.ai/message?q=" + sentence,
                        BeforeSend = (jqxhr, s) => jqxhr.SetRequestHeader("Authorization", authValue),
                        Type = RequestType.GET,
                        ContentType = "application/json",
                        DataType = DataType.Json,
                        Success = success, 
                        Error = error
                    });
        }
        #endregion

        #region Fields
        private string authValue;
        #endregion
    }
}
