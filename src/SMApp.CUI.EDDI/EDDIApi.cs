using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SMApp.EDDI;

namespace SMApp
{
    public class EDDIApi : Api
    {
        public EDDIApi() : base()
        {
            CUI_EDDI_SERVER_URL = Api.Config("CUI_EDDI_SERVER_URL");
            if (!string.IsNullOrEmpty(CUI_EDDI_SERVER_URL))
            {
                Client = new EDDIClient(CUI_EDDI_SERVER_URL, HttpClient);
                Initialized = true;
            }
            else
            {
                Error("Could not retrieve the E.D.D.I server url using configuration key {0}.", "CUI_EDDI_SERVER_URL");
            }
        }

        #region Properties
        public string CUI_EDDI_SERVER_URL { get; }
        public EDDIClient Client { get; }
        #endregion

        #region Methods
        public async Task<User> GetUser(string userName)
        {
            ThrowIfNotInitialized();
            using (var op = Begin("Getting user id for {0}...", userName))
            {
                Client.ReadResponseAsString = true;
                var u = await Client.UserstoreUsersGetByNameAsync(userName);
                var userid = new Uri(u).Segments.Last();
                Debug("User id for {0} is {1}.", userName, userid);
                var user = await Client.UserstoreUsersGetByIdAsync(userid);
                op.Complete();
                return user;
            }       
        }
        #endregion
    }
}
