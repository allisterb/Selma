## Inspiration
The global Covid-19 pandemic has accelerated significantly already existing trends towards online delivery of commercial and social services, while at the same time severely straining existing health care resources and raising the stark possibility of massive overloads of existing health care systems around the world. Globally healthcare providers are faced with looming, potentially reoccurring crises of disease treatment and patient resources becoming critically overloaded due to lockdowns, insufficient capacity of beds and critical medical equipment, insufficient availability of ICUs and intensive care equipment, insufficient PPE for health workers, and insufficient health worker capacity due to staff cutbacks or illness and deaths from the virus itself.  

[Polls](https://www.kff.org/coronavirus-covid-19/report/kff-health-tracking-poll-early-april-2020/) show there is significant concern over how the pandemic will affect people's ability to receive needed health care. But people who suffer from chronic illnesses and disabilities are the most severely affected, both by the pandemic itself and by the pandemic's impacts on health care systems. People with pre-existing conditions like diabetes, asthma, cancer etc. are at [higher risk](https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-at-increased-risk.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fneed-extra-precautions%2Fpeople-at-higher-risk.html) from the virus, but must also cope with health care resources being diverted towards treatment of acute conditions and emergencies that must be given priority. Without regular person-to-person support and care, many people with chronic diseases are at a far higher risk of seeing their conditions worsen.

Much like the present and near-future of work, shopping, government services, education, et.al, healthcare services [must now shift](https://www.advisory.com/-/media/Advisory-com/COVID-19/Covid19-Chronic-Disease-resource.pdf) from person-to-person interactions at centralized physical locations, towards decentralized, remote collaboration between patients and healthcare providers over the Internet, using computers and mobile devices and software powered by ML and NLU to create human-like interfaces for finding information and accomplishing complex tasks.

### What is self-management?
`Self-management can be defined as the methods, skills, and strategies by which
individuals effectively direct their own activities toward the achievement of
specific objectives. It usually includes goal-setting, planning, scheduling, task
tracking, self-evaluation, self-intervention, and self-development. 
In healthcare, self-management typically refers to the training, skill acquisition, and
interventions through which patients who suffer from a disease or a chronic condition may 
take care of themselves and manage their illnesses.`
 
 - From _Self-Management of Depression A Manual for Mental Health and Primary Care Professionals_ by Albert Yeung et.al

A self-management program teaches patients to see treatment as a collaborative process with the patient taking responsibility for self-monitoring and tracking their
symptoms as well as medication intake and other vital information, together with a commitment to using evidence-based, self-administered structured therapy and intervention as adjuncts to professionally delivered interventions for managing their illness. 
There are many chronic disease self-management [programs](http://www.aaa1b.org/wp-content/uploads/2012/05/List-of-Evidence-Based-Programs.pdf) and [resources](https://www.ncoa.org/center-for-healthy-aging/cdsme-resource-center/) developed for diseases and conditions like arthritis, asthma, diabetes, heart-disease, high-blood pressure, depression, obesity, smoking-cessation etc. 

### The problem
There are many Android and iOS mobile apps in the category of self-management and self-help like task planners, time and activity trackers, med and symptom trackers, journals etc. For desktop users there is bStable for managing Bipolar Disorder, as well several telemedicine and CBT apps designed to deliver specific therapies remotely, together with the usual assortment of general-purpose calendars, task management and time tracking tools.

All of these apps however rely on GUIs and touch interfaces with visual forms and widgets for entering and reviewing data and presenting information. 
![A typical self-management app interface](https://image.slidesharecdn.com/bstablepresentation-110821193750-phpapp01/95/bstable-depression-and-bipolar-disorder-disease-state-management-system-presentation-slides-12-728.jpg?cb=1313964137)
Screenshot of McGraw System's "bstable" desktop app for bipolar disease management

These types of interfaces can be inaccessible or difficult to use for older people unaccustomed to complex GUI interfaces, or people with neuropathy, arthritis, and generally people with vision or motor disabilities or chronic conditions. A large proportion of the target user-base for these apps and systems would benefit from simpler systems or the ability to rely on assistive technology to help then naviagate modern desktop and web applications. Microsoft, Apple and Google have made major advancements in accessibility technology for their operating systems with Microsoft’s Windows Narrator and Apple’s VoiceOver technology in particular being widely used by people with vision disabilities. But even with the best assistive technology, app interfaces and web pages that rely on a persistent visual medium can be frustratingly difficult to use for disabled people as they force users to navigate linearly through large hierarchies of visual widgets which use visual orientation in space and visual style elements like font sizes to effectively organize and present information. 

The most accessible app interfaces for older people and people with disabilities are voice assistants like Cortana and Siri and Alexa. 

## What it does
Selma is a multimodal CUI that provides an inclusive interface to self-management tools like medication trackers, mood and symptom trackers, dream and sleep journals, time, activity and exercise, trackers, personal planners, reliable knowledge bases on health conditions and diseases, and similar tools used in the management of chronic physical and mental diseases and disorders and conditions like ADHD or chronic pain where.self-management skills for life activities are critical.

Selma follows in the tradition of 'therapy bots' like ELIZA but updated with powerful ML-trained NLU models for interacting with users in real-time using both typed text and speech. Existing self-management apps like journal, activity-, and symptom-tracking apps all use GUIs or touch UIs and assume users are sighted and dexterous. The reliance on a visual medium and complex interface for entering and reviewing daily self-management data is a significant barrier to adoption of these apps by people with disabilities and chronic conditions, who form a majority of a self-management app's user base.

Selma eschews complex GUI forms and visual widgets like scales and calendars and instead uses a simple line-oriented conversational user interface that uses automatic speech recognition and natural language understanding models for transcribing and extracting symptom descriptions, journal entries, and other user input that traditionally requires navigating and completing data entry forms. Patients interact with Selma using simple natural language commands or questions and enter their journal or medication or symptom tracking entry using speech or text. The captured audio and text is analyzed using NLU models trained to extract relevant details spoken by the patient on their medication intake, mood, activities, symptoms and other self-management details, which are then added to the user’s self-management journals.

The Selma CUI is an accessible user interface that produces text output easily read by screen readers, braille displays and other assistive technology. Users interact in a conversational style with Selma which gathers information in specific areas and guides the user through specific tasks like daily medication and mood tracking and filling out periodic journal entries and evaluations. Users can ask questions (“Did I take my meds today?”, “Did I go out this week?”) and bots can answer intelligently based on information previously captured and analyzed. With the user's consent the information gathered can be automatically sent to the patient’s health providers, reducing the time needed for administering these routine tasks and allowing face-to-face communication and direct supervision with a practitioner to be conserved and more effectively use. The information can also be analyzed for possibly warning symptoms or threats of acute events that may require intervention.

Selma uses Facebook's Wit.ai NLU service for understanding what users say and and input as text.
![Witai console](https://allisterb-selma.s3.us-east-2.amazonaws.com/selma6.png)

## How I built it

### Overview
Selma is written in F#, running on .NET Core and using PostgreSQL as the storage back-end. F# is a functional-first multi-paradigm language which brings all the benefits of functional lanaguages like OCaml to the modern .NET Core runtime, which also allows it to be compiled to JavaScript and used exclusively for front-end development. The Selma front-end is a browser-based CUI which uses natural language understanding on both text and speech, together with voice, text and graphic output using HTML5 features like the WebSpeech API to provide an inclusive interface to self-management data for one or more self-management programs the user enrolls in. The front-end is designed to be accessible to all mobile and desktop users and does not require any additional software beyond a HTML5 compatible browser.

### Client
The [CUI](https://github.com/allisterb/Selma/blob/master/src/SMApp.Web/Client.fs),  [server](https://github.com/allisterb/Selma/blob/master/src/SMApp.Web/Server.fs) [logic](https://github.com/allisterb/Selma/blob/master/src/SMApp.Web/Main.fs) and [core](https://github.com/allisterb/Selma/blob/master/src/SMApp.Core/Models.fs) of Selma are written in F# and make heavy use of functional language features like first-class functions, algebraic types, pattern-matching, immutability by default, and avoiding nulls using ``Option`` types. This yields code that is concise and easy to understand and eliminates many common code errors, which is an important feature for developing health-care management software. CUI rules are implemented in a declarative way using F# pattern matching, which greatly reduces the complexity of the branching logic required for a rule-based chatbot

Using the [WebSharper](https://websharper.com/) framework allows us to exclusively use F# on the client-side which is compiled to JavaScript and runs in the browser, yielding all the benefits of a statically-typed higher-level functional language for client-side development. For instance the [NLU](https://github.com/allisterb/Selma/blob/master/src/SMApp.Web/NLU.fs) module makes heavy use of pattern matching:

````fsharp        
        let (|Intent|_|) (name:string) :Meaning' -> (Entity list option) =
            function
            | m when m.TopIntent.Name = name && m.TopIntent.Confidence > intentConfidenceThreshold  -> 
                    m.Entities 
                    |> List.where(fun e -> e.Confidence > entityConfidenceThreshold) 
                    |> Some
            | _ -> None

        let (|HelloUser|_|) =
            function
            | Some(Intent "Hello" [e]) -> let user = e.Name |> User in Meaning(Hello, None, Some [user]) |> Some
            | _ -> None

````
This code defines an `Intent` pattern which only matches an intent of a specified name from [Wit.ai](https://wit.al) that has a confidence score over a certain threshold. The `HelloUser` pattern returns a `Meaning` object with an intent of "Hello" with one entity which is the user name. The [CUI](https://github.com/allisterb/Selma/blob/master/src/SMApp.Web/CUI.fs) module uses these patterns in understanding what the user inputs:
````fsharp
            match command with
            (* Quick commands *)
            | Text.Blank -> say "Tell me what you want me to do or ask me a question."
            | Text.DebugOn -> CUI <- { CUI with DebugMode = true }; say "Debug mode is now on."  
            | Text.DebugOff -> CUI <- { CUI with DebugMode = false }; say "Debug mode is now off." 
            | Text.QuickHello m 
            | Text.QuickHelp m 
            | Text.QuickPrograms m -> m |> updateCtx |> Main.update CUI
            (* Use the NLU service for everything else *)
            | _->         
                async {
                    match! Server.GetMeaning command with
                    | Text.HelloUser m -> m |> updateCtx |> Main.update CUI
                    | _ -> term.Echo' "Sorry I did not understand what you said."             
                } |> CUI.Wait
````
User intents are dispatched to different interpreters which also heavily use pattern-matching e.g the [Main](https://github.com/allisterb/Selma/blob/master/src/SMApp.Web/Main.fs) interpreter uses logic like this:
````fsharp
        | Meaning(Hello, None, None)::_ -> cui.Say <| sprintf "Hello. My name is Selma. What's yours?" 
        | Meaning(Hello, None, Some [User(user)])::_ -> cui.Say <| sprintf "Hello %s" user
````
This logic says that for a "Hello" intent Selma should respond by asking the user their name. If the user provides a name then Selma will respond appropriately. Use a functional language like F# to write CUI logic is a vastly better and faster alternative to using commercial bot builder services.

### Server
The Selma server is designed around a set of micro-services running on the OpenShift Container Platform which talk to the client and stored data in the storage backend.
![Dashboard for the Selma project on RedHat OpenShift Online](https://allisterb-selma.s3.us-east-2.amazonaws.com/selma-2.png)

Since the data is highly-relational and commonly requires calculation of statistics across aggregates, a traditional SQL server is used for data storage.

All the CUI and and interpreter logic is written in F# and runs on the client with the server mainly responsible for data operations. A typical server function is like
```fsharp
    [<Rpc>]
    let addSymptomJournalEntry (userName:string) (magnitude:int) (location:string) : Async<unit Option> =
        pgdb
        |> Sql.query "INSERT INTO public.symptom_journal(user_name, date, magnitude, location) VALUES (@u, @d, @m, @l);"
        |> Sql.parameters [("u", Sql.string userName); ("d", Sql.timestamp (DateTime.Now)); ("m", Sql.int (magnitude)); ("l", Sql.string (location))]
        |> Sql.executeNonQueryAsync
        |> Async.map(function | Ok n -> (if n > 0 then Some() else None) | Error exn -> err(exn.Message); None)
```