(function()
{
 "use strict";
 var Global,SMApp,Web,User,Meaning,Intent,Entity,Resource,NLU,SC$1,Client,SC$2,IntelliFactory,Runtime,WebSharper,List,UI,Doc,Utils,Concurrency,Remoting,AjaxRemotingProvider;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 User=Web.User=Web.User||{};
 Meaning=Web.Meaning=Web.Meaning||{};
 Intent=Web.Intent=Web.Intent||{};
 Entity=Web.Entity=Web.Entity||{};
 Resource=Web.Resource=Web.Resource||{};
 NLU=Web.NLU=Web.NLU||{};
 SC$1=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
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
 Client.Term=function()
 {
  var interpreter,options;
  interpreter=Runtime.ThisFunc(function()
  {
   return null;
  });
  options=Client.baseOpt();
  Global.$("#main").terminal(interpreter,options);
  return Doc.get_Empty();
 };
 Client.baseOpt=function()
 {
  SC$2.$cctor();
  return SC$2.baseOpt;
 };
 Client.Main=function(term,command)
 {
  var a,b;
  a=NLU.Help(command);
  a.$==1?(Client.set_debugMode(true),term.echo((function($1)
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
   return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:-621881670",[command]),function(a$1)
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
 SC$2.$cctor=function()
 {
  var r;
  SC$2.$cctor=Global.ignore;
  SC$2.debugMode=false;
  SC$2.baseOpt=(r={},r.name="_",r.greetings="Welcome to Selma",r.onInit=function(t)
  {
   var r$1;
   return t.push(function(c)
   {
    return Client.Main(this,c);
   },(r$1={},r$1.name="Main",r$1.prompt=">",r$1));
  },r);
 };
}());
