using WebSharper;

namespace SMApp.NLU.Wit
{
    [JavaScript]
    public class Intent
    {
        public Intent(string _id, string _name, float _confidence)
        {
            id = _id;
            name = _name;
            confidence = _confidence;
        }
        public string id { get; set; }

        public string name { get; set; }

        public float confidence { get; set; }
    }

}
