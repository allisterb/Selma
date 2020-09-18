using WebSharper;

namespace SMApp.NLU.Wit
{
    [JavaScript]
    public class Entity
    {
        public string id { get; set; }
        
        public string name { get; set; }
        
        public string role { get; set; }
        
        public int start { get; set; }
        
        public int end { get; set; }

        public string body { get; set; }
        
        public float confidence { get; set; }

        public object[] entities { get; set; }

        public bool suggested { get; set; }

        public string value { get; set; }

        public string type { get; set; }
    }

}
