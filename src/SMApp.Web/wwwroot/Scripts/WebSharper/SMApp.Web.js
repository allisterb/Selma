(function()
{
 "use strict";
 var Global,SMApp,Web,Client,SC$1,WebSharper,UI,Doc,Var$1,Submitter,View,Remoting,AjaxRemotingProvider,Concurrency,AttrProxy;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 Client=Web.Client=Web.Client||{};
 SC$1=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 Var$1=UI&&UI.Var$1;
 Submitter=UI&&UI.Submitter;
 View=UI&&UI.View;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 AttrProxy=UI&&UI.AttrProxy;
 Client.Term=function()
 {
  var interpreter,options;
  interpreter=Client.interpreter();
  options=Client.Opt();
  Global.$("#main").terminal(interpreter,options);
  return Doc.Element("hr",[],[]);
 };
 Client.Opt=function()
 {
  SC$1.$cctor();
  return SC$1.Opt;
 };
 Client.interpreter=function()
 {
  SC$1.$cctor();
  return SC$1.interpreter;
 };
 Client.Welcome=function(a)
 {
  return a==="help"?{
   $:1,
   $0:null
  }:a==="welcome"?{
   $:0,
   $0:null
  }:{
   $:2,
   $0:null
  };
 };
 Client.Main=function()
 {
  var rvInput,submit,vReversed;
  rvInput=Var$1.Create$1("");
  submit=Submitter.CreateOption(rvInput.get_View());
  vReversed=View.MapAsync(function(a)
  {
   var b;
   return a!=null&&a.$==1?(new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.DoSomething:1867586241",[a.$0]):(b=null,Concurrency.Delay(function()
   {
    return Concurrency.Return("");
   }));
  },submit.view);
  return Doc.Element("div",[],[Doc.Input([],rvInput),Doc.Button("Send",[],function()
  {
   submit.Trigger();
  }),Doc.Element("hr",[],[]),Doc.Element("h4",[AttrProxy.Create("class","text-muted")],[Doc.TextNode("The server responded:")]),Doc.Element("div",[AttrProxy.Create("class","jumbotron")],[Doc.Element("h1",[],[Doc.TextView(vReversed)])])]);
 };
 SC$1.$cctor=function()
 {
  var r;
  SC$1.$cctor=Global.ignore;
  SC$1.interpreter=function(command)
  {
   return Client.Welcome(command).$==1?this.echo("Commands: help, clear, template"):this.echo("Com");
  };
  SC$1.Opt=(r={},r.name="Terminal1",r.prompt="> ",r.greetings="Welcome to the Terminal Test Page! See 'help' for the list of commands.",r.onInit=function(t)
  {
   t.enable();
   return t.echo("Hey Dood, it's workin'!");
  },r);
 };
}());
