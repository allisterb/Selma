using System.Collections.Generic;
using WebSharper;

namespace SMApp.NLU.Wit
{
    [JavaScript]
    public class ConverseResponse
    {
        /// <summary>
        /// The type of the bot response. Either merge (first bot action after a user message), msg (the bot has something to say), action (the bot has something to do) or stop (the bot is waiting to proceed).
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// The answer of your bot, when applicable.
        /// </summary>
        public string msg { get; set; }

        /// <summary>
        /// The action to execute, when applicable.
        /// </summary>
        public string action { get; set; }

        /// <summary>
        /// Object of entities, when applicable. Each entity is an array of values (even when there is only one value).
        /// </summary>
        public Dictionary<string, List<Entity>> entities { get; set; }

        /// <summary>
        /// Represents the confidence level of the next step, between 0 (low) and 1 (high).
        /// </summary>
        public double confidence { get; set; }
    }
}