(function()
{
 "use strict";
 var Global,SMApp,Web,User,Meaning,Intent,Entity,Interpreter,CUIContext,Resource,NLU,SC$1,ClientExtensions,Client,SC$2,IntelliFactory,Runtime,WebSharper,List,UI,Doc,Utils,Concurrency,Remoting,AjaxRemotingProvider;
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
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 Client=Web.Client=Web.Client||{};
 SC$2=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 Utils=WebSharper&&WebSharper.Utils;
 Concurrency=WebSharper&&WebSharper.Concurrency;
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
 CUIContext.Input={
  $:2
 };
 CUIContext.MenuChoice={
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
 ClientExtensions["Terminal.Push"]=function(x,i)
 {
  var a,b;
  a=i.get_Func();
  b=i.get_Options();
  x.push(Runtime.CreateFuncWithThis(a),b);
 };
 Client.Term=function()
 {
  var _Opt,r,interpreter;
  _Opt=(r={},r.name="_",r.greetings="Welcome to Selma",r.onInit=function(t)
  {
   Client.speak("Welcome to Selma 1 2 3 4.");
   return ClientExtensions["Terminal.Push"](t,Client.Main());
  },r);
  interpreter=Runtime.ThisFunc(function()
  {
   return null;
  });
  Global.$("#main").terminal(interpreter,_Opt);
  return Doc.get_Empty();
 };
 Client.Main=function()
 {
  SC$2.$cctor();
  return SC$2.Main;
 };
 Client.debugMode=function()
 {
  SC$2.$cctor();
  return SC$2.debugMode;
 };
 Client.set_debugMode=function($1)
 {
  SC$2.$cctor();
  SC$2.debugMode=$1;
 };
 Client.speak=function(text)
 {
  Global.speechSynthesis.speak(new Global.SpeechSynthesisUtterance(text));
 };
 SC$2.$cctor=function()
 {
  var r;
  SC$2.$cctor=Global.ignore;
  function main(term,command)
  {
   var a,b;
   a=NLU.Help(command);
   return a.$==1?(Client.set_debugMode(true),term.echo((function($1)
   {
    return function($2)
    {
     return $1("Debug mode is now "+Utils.prettyPrint($2)+".");
    };
   }(Global.id))(Client.debugMode()))):a.$==2?(Client.set_debugMode(false),term.echo((function($1)
   {
    return function($2)
    {
     return $1("Debug mode is now "+Utils.prettyPrint($2)+".");
    };
   }(Global.id))(Client.debugMode()))):a.$==3?(term.disable(),Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:-1248913656",[command]),function(a$1)
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
   })),null)):term.echo("This is the help commnd");
  }
  SC$2.debugMode=false;
  SC$2.Main=new Interpreter({
   $:0,
   $0:[function($1)
   {
    return function($2)
    {
     return main($1,$2);
    };
   },(r={},r.name="Main",r.prompt=">",r)]
  });
 };
}());
