using WebSharper;

namespace SMApp.NLU.Wit
{
    [JavaScript]
    public class Trait
    {
        public string id { get; set; }

        public string value { get; set; }

        public float confidence { get; set; }
    }

}
