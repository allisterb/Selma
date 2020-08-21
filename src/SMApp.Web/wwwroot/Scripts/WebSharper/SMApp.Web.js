(function()
{
 "use strict";
 var Global,SMApp,Web,User,Meaning,Intent,Entity,Interpreter,CUIContext,Resource,NLU,SC$1,CUI,SC$2,ClientExtensions,Client,SC$3,IntelliFactory,Runtime,WebSharper,List,UI,Doc,Concurrency,Utils,Remoting,AjaxRemotingProvider;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 User=Web.User=Web.User||{};
 Meaning=Web.Meaning=Web.Meaning||{};
 Intent=Web.Intent=Web.Intent||{};
 Entity=Web.Entity=Web.Entity||{};
 Interpreter=Web.Interpreter=Web.Interpreter||{};
 CUIContext=Web.CUIContext=Web.CUIContext||{};
 Resource=Web.Resource=Web.Resource||{};
 NLU=Web.NLU=Web.NLU||{};
 SC$1=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
 CUI=Web.CUI=Web.CUI||{};
 SC$2=Global.StartupCode$SMApp_Web$CUI=Global.StartupCode$SMApp_Web$CUI||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 Client=Web.Client=Web.Client||{};
 SC$3=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Utils=WebSharper&&WebSharper.Utils;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 User.New=function(UserName)
 {
  return{
   UserName:UserName
  };
 };
 Meaning=Web.Meaning=Runtime.Class({
  get_TopIntent:function()
  {
   return List.head(List.sortBy(function(i)
   {
    return i.get_Confidence();
   },this.get_Intents()));
  },
  get_Entities:function()
  {
   return(this.get_Unwrap())[1];
  },
  get_Intents:function()
  {
   return(this.get_Unwrap())[0];
  },
  get_Unwrap:function()
  {
   return[this.$0,this.$1];
  }
 },null,Meaning);
 Intent=Web.Intent=Runtime.Class({
  get_Confidence:function()
  {
   return(this.get_Unwrap())[1];
  },
  get_Name:function()
  {
   return(this.get_Unwrap())[0];
  },
  get_Unwrap:function()
  {
   return[this.$0,this.$1];
  }
 },null,Intent);
 Entity=Web.Entity=Runtime.Class({
  get_Value:function()
  {
   return(this.get_Unwrap())[3];
  },
  get_Role:function()
  {
   return(this.get_Unwrap())[2];
  },
  get_Confidence:function()
  {
   return(this.get_Unwrap())[1];
  },
  get_Name:function()
  {
   return(this.get_Unwrap())[0];
  },
  get_Unwrap:function()
  {
   return[this.$0,this.$1,this.$2,this.$3];
  }
 },null,Entity);
 Interpreter=Web.Interpreter=Runtime.Class({
  get_Options:function()
  {
   return(this.get_Unwrap())[1];
  },
  get_Func:function()
  {
   return(this.get_Unwrap())[0];
  },
  get_Unwrap:function()
  {
   return[this.$0[0],this.$0[1]];
  }
 },null,Interpreter);
 CUIContext.InputCtx={
  $:2
 };
 CUIContext.MenuCtx={
  $:1
 };
 Resource.New=function(Name,Description,Url)
 {
  return{
   Name:Name,
   Description:Description,
   Url:Url
  };
 };
 NLU.HelloUser=function(a)
 {
  var $1,a$1;
  return(a$1=NLU.Hello(a),a$1!=null&&a$1.$==1&&(a$1.$0.$==1&&(a$1.$0.$1.$==0&&(a$1.$0.$0.get_Role()==="contact"&&($1=a$1.$0.$0,true)))))?{
   $:1,
   $0:$1
  }:null;
 };
 NLU.Hello=function(a)
 {
  var $1,a$1;
  return a!=null&&a.$==1&&(a$1=NLU.Intent("Hello",a.$0),a$1!=null&&a$1.$==1&&($1=a$1.$0,true))?{
   $:1,
   $0:$1
  }:null;
 };
 NLU.Help=function(a)
 {
  return a==="help"?{
   $:0,
   $0:null
  }:a==="debug on"?{
   $:1,
   $0:null
  }:a==="debug off"?{
   $:2,
   $0:null
  }:{
   $:3,
   $0:null
  };
 };
 NLU.Intent=function(name,a)
 {
  return a.get_TopIntent().get_Name()===name&&a.get_TopIntent().get_Confidence()>NLU.intentConfidenceThreshold()?{
   $:1,
   $0:List.filter(function(e)
   {
    return e.get_Confidence()>NLU.entityConfidenceThreshold();
   },a.get_Entities())
  }:null;
 };
 NLU.entityConfidenceThreshold=function()
 {
  SC$1.$cctor();
  return SC$1.entityConfidenceThreshold;
 };
 NLU.set_entityConfidenceThreshold=function($1)
 {
  SC$1.$cctor();
  SC$1.entityConfidenceThreshold=$1;
 };
 NLU.intentConfidenceThreshold=function()
 {
  SC$1.$cctor();
  return SC$1.intentConfidenceThreshold;
 };
 NLU.set_intentConfidenceThreshold=function($1)
 {
  SC$1.$cctor();
  SC$1.intentConfidenceThreshold=$1;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.intentConfidenceThreshold=0.8;
  SC$1.entityConfidenceThreshold=0.8;
 };
 CUI.helloUserPhrases=function()
 {
  SC$2.$cctor();
  return SC$2.helloUserPhrases;
 };
 CUI.helloPhrases=function()
 {
  SC$2.$cctor();
  return SC$2.helloPhrases;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.helloPhrases=List.ofArray(["Welcome","Welcome to Selma","Hi I'm Selma, how can I help?","Hello I'm Selma, how can I help?"]);
  SC$2.helloUserPhrases=List.ofArray(["Welcome $user, nice to see you again..","Welcome to Selma","Hi I'm Selma, how can I help?","Hello I'm Selma, how can I help?"]);
 };
 ClientExtensions["Terminal.Push"]=function(x,i)
 {
  var a,b;
  a=i.get_Func();
  b=i.get_Options();
  x.push(Runtime.CreateFuncWithThis(a),b);
 };
 ClientExtensions["Terminal.Echo'"]=function(x,text)
 {
  x.disable();
  x.echo(text);
  x.enable();
 };
 Client.Term=function()
 {
  var interpreter,options;
  interpreter=Runtime.ThisFunc(function(term,command)
  {
   return((Client.Main().get_Func())(term))(command);
  });
  options=Client.Main().get_Options();
  Global.$("#main").terminal(interpreter,options);
  return Doc.get_Empty();
 };
 Client.Main=function()
 {
  SC$3.$cctor();
  return SC$3.Main;
 };
 Client.speak=function(text)
 {
  var b;
  Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   Global.speechSynthesis.speak(new Global.SpeechSynthesisUtterance(text));
   return Concurrency.Zero();
  })),null);
 };
 Client.transcribe=function()
 {
  SC$3.$cctor();
  return SC$3.transcribe;
 };
 Client.set_transcribe=function($1)
 {
  SC$3.$cctor();
  SC$3.transcribe=$1;
 };
 Client.debugMode=function()
 {
  SC$3.$cctor();
  return SC$3.debugMode;
 };
 Client.set_debugMode=function($1)
 {
  SC$3.$cctor();
  SC$3.debugMode=$1;
 };
 SC$3.$cctor=function()
 {
  var r;
  SC$3.$cctor=Global.ignore;
  function main(term,command)
  {
   var a,b;
   a=NLU.Help(command);
   return a.$==1?(Client.set_debugMode(true),ClientExtensions["Terminal.Echo'"](term,(function($1)
   {
    return function($2)
    {
     return $1("Debug mode is now "+Utils.prettyPrint($2)+".");
    };
   }(Global.id))(Client.debugMode()))):a.$==2?(Client.set_debugMode(false),ClientExtensions["Terminal.Echo'"](term,(function($1)
   {
    return function($2)
    {
     return $1("Debug mode is now "+Utils.prettyPrint($2)+".");
    };
   }(Global.id))(Client.debugMode()))):a.$==3?(term.disable(),Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:394434405",[command]),function(a$1)
    {
     var a$2,$1;
     a$2=NLU.HelloUser(a$1);
     return a$2!=null&&a$2.$==1?(term.echo((function($2)
     {
      return function($3)
      {
       return $2("This is the hello intent. The user name is "+Utils.toSafe($3)+".");
      };
     }(Global.id))(a$2.$0.get_Value())),Concurrency.Zero()):($1=NLU.Hello(a$1),$1!=null&&$1.$==1)?(term.echo("This is the hello intent but I don't know who the user is."),Concurrency.Zero()):(term.echo("This is the whatever intent"),Concurrency.Zero());
    }),Concurrency.Delay(function()
    {
     term.enable();
     return Concurrency.Zero();
    }));
   })),null)):ClientExtensions["Terminal.Echo'"](term,"This is the help commnd");
  }
  SC$3.debugMode=false;
  SC$3.transcribe=false;
  SC$3.Main=new Interpreter({
   $:0,
   $0:[function($1)
   {
    return function($2)
    {
     return main($1,$2);
    };
   },(r={},r.name="Main",r.greetings="Welcome to Selma",r.prompt=">",r)]
  });
 };
}());
