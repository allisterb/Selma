(function()
{
 "use strict";
 var Global,SMApp,Web,User,Meaning,Intent,Entity,Resource,Client,SC$1,IntelliFactory,Runtime,WebSharper,List,UI,Doc,Concurrency,Remoting,AjaxRemotingProvider;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 User=Web.User=Web.User||{};
 Meaning=Web.Meaning=Web.Meaning||{};
 Intent=Web.Intent=Web.Intent||{};
 Entity=Web.Entity=Web.Entity||{};
 Resource=Web.Resource=Web.Resource||{};
 Client=Web.Client=Web.Client||{};
 SC$1=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
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
  SC$1.$cctor();
  return SC$1.baseOpt;
 };
 Client.Main=function(term,command)
 {
  var a,b;
  function Hello(a$1)
  {
   return a$1.get_TopIntent().get_Name()==="Hello"&&a$1.get_TopIntent().get_Confidence()>0.8?{
    $:1,
    $0:a$1.get_Entities()
   }:null;
  }
  a=command==="help"?{
   $:1,
   $0:"This is the help function"
  }:null;
  a!=null&&a.$==1?term.echo(a.$0):Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   term.disable();
   return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:222565848",[command]),function(a$1)
   {
    var $1,a$2;
    return a$1!=null&&a$1.$==1&&(a$2=Hello(a$1.$0),a$2!=null&&a$2.$==1&&($1=a$2.$0,true))?(term.echo("This is the hello intent"),Concurrency.Zero()):(term.echo("This is the whatever intent"),Concurrency.Zero());
   }),Concurrency.Delay(function()
   {
    term.enable();
    return Concurrency.Zero();
   }));
  })),null);
 };
 SC$1.$cctor=function()
 {
  var r;
  SC$1.$cctor=Global.ignore;
  SC$1.baseOpt=(r={},r.name="_",r.greetings="Welcome to Selma",r.onInit=function(t)
  {
   var r$1;
   return t.push(function(c)
   {
    return Client.Main(this,c);
   },(r$1={},r$1.name="Main",r$1.prompt=">",r$1));
  },r);
 };
}());
