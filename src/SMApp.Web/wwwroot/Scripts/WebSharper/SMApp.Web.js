(function()
{
 "use strict";
 var Global,SMApp,Web,User,Meaning,Entity,Resource,Client,SC$1,IntelliFactory,Runtime,WebSharper,UI,Doc,Concurrency,Remoting,AjaxRemotingProvider;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 User=Web.User=Web.User||{};
 Meaning=Web.Meaning=Web.Meaning||{};
 Entity=Web.Entity=Web.Entity||{};
 Resource=Web.Resource=Web.Resource||{};
 Client=Web.Client=Web.Client||{};
 SC$1=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
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
  interpreter=Client.baseInt();
  options=Client.baseOpt();
  Global.$("#main").terminal(interpreter,options);
  return Doc.get_Empty();
 };
 Client.baseInt=function()
 {
  SC$1.$cctor();
  return SC$1.baseInt;
 };
 Client.baseOpt=function()
 {
  SC$1.$cctor();
  return SC$1.baseOpt;
 };
 Client.i2=function(_this,command)
 {
  var a,b;
  a=Client.Welcome(command);
  a.$==1?_this.echo("Commands: help, clear, template"):a.$==0?Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   _this.disable();
   return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:-414293294",["Hello I'm John"]),function(a$1)
   {
    return a$1!=null&&a$1.$==1?(_this.echo("bar"),Concurrency.Zero()):(_this.echo("foo"),Concurrency.Zero());
   }),Concurrency.Delay(function()
   {
    _this.enable();
    return Concurrency.Zero();
   }));
  })),null):a.$==2?_this.echo("switch"):_this.echo("Unknown");
 };
 Client.Welcome=function(a)
 {
  return a==="help"?{
   $:1,
   $0:null
  }:a==="welcome"?{
   $:0,
   $0:null
  }:a==="switch"?{
   $:2,
   $0:null
  }:{
   $:3,
   $0:null
  };
 };
 SC$1.$cctor=function()
 {
  var r;
  SC$1.$cctor=Global.ignore;
  SC$1.baseOpt=(r={},r.name="_Base",r.greetings="Welcome to Selma",r.onInit=function(t)
  {
   var r$1;
   return t.push(function(c)
   {
    return Client.i2(this,c);
   },(r$1={},r$1.name="Main",r$1.prompt=">",r$1));
  },r);
  SC$1.baseInt=Runtime.ThisFunc(function()
  {
   return null;
  });
 };
}());
