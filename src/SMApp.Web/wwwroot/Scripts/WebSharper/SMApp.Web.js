(function()
{
 "use strict";
 var Global,SMApp,Web,Client,SC$1,WebSharper,UI,Doc;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 Client=Web.Client=Web.Client||{};
 SC$1=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
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
  var a;
  a=Client.Welcome(command);
  a.$==1?_this.echo("Commands: help, clear, template"):a.$==2?_this.echo("switch"):_this.echo("Unknown");
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
  SC$1.baseInt=function()
  {
   return null;
  };
 };
}());
