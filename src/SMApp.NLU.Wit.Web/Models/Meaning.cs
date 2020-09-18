using System;
using System.Collections.Generic;

using WebSharper;

namespace SMApp.NLU.Wit
{
    [JavaScript]    
    public class Meaning
    {       
        public Meaning() { }

        public string text { get; set; }
   
        public Intent[] intents { get; set; }
    
        public Dictionary<string, Entity[]> entities { get; set; }
        
        public Dictionary<string, Trait[]> traits { get; set; }
    }
}
