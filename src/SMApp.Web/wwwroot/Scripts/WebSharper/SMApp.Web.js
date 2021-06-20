(function()
{
 "use strict";
 var Global,SMApp,Web,ClientExtensions,SweetAlert,_Html,htmModule,SC$1,TypingDNA,SaveResponse,UserResponse,VerifyResponse,Bs,NLU,Witai,Utterance,Intent,Entity,Trait,_Utterance,_Value,NLG,SC$2,NLU$1,Intent$1,Trait$1,Entity$1,Utterance$1,Voice,_Entity,Text,_Utterance$1,_Intent,_Entity$1,_Trait,Domain,SC$3,Knowledge,EmotionalTrait,Relation,Triple,Subject,Verb,Object,CUI,MicState,ClientState,Interpreter,CUI$1,Dialogue,Question,QuestionType,DialogueModule,Questions,User,SC$4,Symptoms,SC$5,Main,SC$6,Client,SC$7,SMApp$Web_GeneratedPrintf,GeneratedPrintf,WebSharper,Arrays,SweetAlert$1,IntelliFactory,Runtime,Operators,UI,Doc,AttrProxy,Client$1,Templates,Utils,console,$,Strings,List,Seq,AttrModule,Concurrency,Random,Collections,Map,JavaScript,Pervasives,ClientSideJson,Provider,JSON,SDK,Unchecked,Remoting,AjaxRemotingProvider,Wit,document,Dictionary;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 SweetAlert=ClientExtensions.SweetAlert=ClientExtensions.SweetAlert||{};
 _Html=Web._Html=Web._Html||{};
 htmModule=Web.htmModule=Web.htmModule||{};
 SC$1=Global.StartupCode$SMApp_Web$ClientExtensions=Global.StartupCode$SMApp_Web$ClientExtensions||{};
 TypingDNA=Web.TypingDNA=Web.TypingDNA||{};
 SaveResponse=TypingDNA.SaveResponse=TypingDNA.SaveResponse||{};
 UserResponse=TypingDNA.UserResponse=TypingDNA.UserResponse||{};
 VerifyResponse=TypingDNA.VerifyResponse=TypingDNA.VerifyResponse||{};
 Bs=Web.Bs=Web.Bs||{};
 NLU=SMApp.NLU=SMApp.NLU||{};
 Witai=NLU.Witai=NLU.Witai||{};
 Utterance=Witai.Utterance=Witai.Utterance||{};
 Intent=Witai.Intent=Witai.Intent||{};
 Entity=Witai.Entity=Witai.Entity||{};
 Trait=Witai.Trait=Witai.Trait||{};
 _Utterance=Witai["Utterance'"]=Witai["Utterance'"]||{};
 _Value=Witai["Value'"]=Witai["Value'"]||{};
 NLG=Web.NLG=Web.NLG||{};
 SC$2=Global.StartupCode$SMApp_Web$NLG=Global.StartupCode$SMApp_Web$NLG||{};
 NLU$1=Web.NLU=Web.NLU||{};
 Intent$1=NLU$1.Intent=NLU$1.Intent||{};
 Trait$1=NLU$1.Trait=NLU$1.Trait||{};
 Entity$1=NLU$1.Entity=NLU$1.Entity||{};
 Utterance$1=NLU$1.Utterance=NLU$1.Utterance||{};
 Voice=NLU$1.Voice=NLU$1.Voice||{};
 _Entity=Voice["Entity'"]=Voice["Entity'"]||{};
 Text=NLU$1.Text=NLU$1.Text||{};
 _Utterance$1=Text["Utterance'"]=Text["Utterance'"]||{};
 _Intent=Text["Intent'"]=Text["Intent'"]||{};
 _Entity$1=Text["Entity'"]=Text["Entity'"]||{};
 _Trait=Text["Trait'"]=Text["Trait'"]||{};
 Domain=NLU$1.Domain=NLU$1.Domain||{};
 SC$3=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
 Knowledge=Web.Knowledge=Web.Knowledge||{};
 EmotionalTrait=Knowledge.EmotionalTrait=Knowledge.EmotionalTrait||{};
 Relation=Knowledge.Relation=Knowledge.Relation||{};
 Triple=Knowledge.Triple=Knowledge.Triple||{};
 Subject=Knowledge.Subject=Knowledge.Subject||{};
 Verb=Knowledge.Verb=Knowledge.Verb||{};
 Object=Knowledge.Object=Knowledge.Object||{};
 CUI=Web.CUI=Web.CUI||{};
 MicState=CUI.MicState=CUI.MicState||{};
 ClientState=CUI.ClientState=CUI.ClientState||{};
 Interpreter=CUI.Interpreter=CUI.Interpreter||{};
 CUI$1=CUI.CUI=CUI.CUI||{};
 Dialogue=Web.Dialogue=Web.Dialogue||{};
 Question=Web.Question=Web.Question||{};
 QuestionType=Web.QuestionType=Web.QuestionType||{};
 DialogueModule=Web.DialogueModule=Web.DialogueModule||{};
 Questions=Web.Questions=Web.Questions||{};
 User=Web.User=Web.User||{};
 SC$4=Global.StartupCode$SMApp_Web$User=Global.StartupCode$SMApp_Web$User||{};
 Symptoms=Web.Symptoms=Web.Symptoms||{};
 SC$5=Global.StartupCode$SMApp_Web$Symptoms=Global.StartupCode$SMApp_Web$Symptoms||{};
 Main=Web.Main=Web.Main||{};
 SC$6=Global.StartupCode$SMApp_Web$Main=Global.StartupCode$SMApp_Web$Main||{};
 Client=Web.Client=Web.Client||{};
 SC$7=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf||{};
 GeneratedPrintf=Global.GeneratedPrintf=Global.GeneratedPrintf||{};
 WebSharper=Global.WebSharper;
 Arrays=WebSharper&&WebSharper.Arrays;
 SweetAlert$1=Global.SweetAlert;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Operators=WebSharper&&WebSharper.Operators;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 Client$1=UI&&UI.Client;
 Templates=Client$1&&Client$1.Templates;
 Utils=WebSharper&&WebSharper.Utils;
 console=Global.console;
 $=Global.jQuery;
 Strings=WebSharper&&WebSharper.Strings;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 AttrModule=UI&&UI.AttrModule;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Random=WebSharper&&WebSharper.Random;
 Collections=WebSharper&&WebSharper.Collections;
 Map=Collections&&Collections.Map;
 JavaScript=WebSharper&&WebSharper.JavaScript;
 Pervasives=JavaScript&&JavaScript.Pervasives;
 ClientSideJson=WebSharper&&WebSharper.ClientSideJson;
 Provider=ClientSideJson&&ClientSideJson.Provider;
 JSON=Global.JSON;
 SDK=Global.SDK;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Wit=Global.Wit;
 document=Global.document;
 Dictionary=Collections&&Collections.Dictionary;
 ClientExtensions.getCameraCanvas=function()
 {
  return Global.getCameraCanvas();
 };
 ClientExtensions.stopCamera=function()
 {
  return Global.stopCamera();
 };
 ClientExtensions.startCamera=function(container,canvasElement)
 {
  return Global.startCamera(container,canvasElement);
 };
 ClientExtensions.speechSynthesis=function()
 {
  return Global.speechSynthesis;
 };
 ClientExtensions.lastMicData=function()
 {
  return Global.lastMicData;
 };
 ClientExtensions.Terminal=function()
 {
  return Global.$("#term").terminal();
 };
 ClientExtensions.enableTerminal=function()
 {
  return Global.$("#term").terminal().enable();
 };
 ClientExtensions.disableTerminal=function()
 {
  return Global.$("#term").terminal().disable();
 };
 ClientExtensions.boxesWithTitles=function(boxes)
 {
  return Arrays.map(function(b)
  {
   var r;
   r={};
   r.titleText=b;
   return r;
  },boxes);
 };
 ClientExtensions.confirmQuestionBox=function()
 {
  SweetAlert$1.clickConfirm();
 };
 ClientExtensions.questionBox=function(title,text,queueSteps,dim,onCreate,onShow,onInput)
 {
  var prom,b,r,width,r$1,s;
  prom=(b=dim==null?(r={},r.titleText=title,r.text=text,r.icon="question",r.html="<div></div>",r.allowOutsideClick=false,r):(width=dim.$0[0],(r$1={},r$1.titleText=title,r$1.text=text,r$1.icon="question",r$1.width=Global.String(width),r$1.html=(((Runtime.Curried3(function($1,$2,$3)
  {
   return $1("<div class=\"swal2-content-custom\" style=\"width:"+Global.String($2)+"px;height:"+Global.String($3)+"px\"></div>");
  }))(Global.id))(width))(dim.$0[1]),r$1.allowOutsideClick=false,r$1)),(onCreate!=null?onCreate.$0(b):void 0,queueSteps!=null&&queueSteps.$==1?(s=queueSteps.$0,(b.progressSteps=Arrays.ofSeq(Operators.range(1,Arrays.length(s))),SweetAlert$1.mixin(b).queue(Arrays.create(Arrays.length(s),b)))):SweetAlert$1.fire(b)));
  onShow!=null?onShow.$0():void 0;
  prom.then(onInput);
 };
 SweetAlert.get_QueueBoxes=function()
 {
  var o;
  o=SweetAlert$1.mixin({});
  return function(a)
  {
   return o.queue(a);
  };
 };
 ClientExtensions.getDialogueBoxInput=function()
 {
  return Arrays.get(Global.jQuery(".swal2-input").get(),0);
 };
 ClientExtensions.getDialogueBoxCanvas=function()
 {
  return Arrays.get(Global.jQuery("canvas.swal2-content").get(),0);
 };
 ClientExtensions.getDialogueBoxContent=function()
 {
  return Arrays.get(Global.jQuery("#swal2-content").get(),0).firstChild;
 };
 ClientExtensions.createDialogueBoxCanvas=function()
 {
  return ClientExtensions.createCanvas("camera","640","480",Arrays.get(Global.jQuery("#swal2-content").get(),0).firstChild);
 };
 ClientExtensions.createCanvas=function(id,width,height,parent)
 {
  var a;
  a=Doc.Element("canvas",[ClientExtensions.eid(id),AttrProxy.Create("width",width),AttrProxy.Create("height",height)],[]);
  Templates.LoadLocalTemplates("");
  Doc.Run(parent,a);
  return parent.firstChild;
 };
 ClientExtensions.elementHTML=function(d)
 {
  return d.innerHTML;
 };
 ClientExtensions.createElement=function(doc)
 {
  var el;
  el=self.document.createElement("div");
  self.document.appendChild(el);
  Templates.LoadLocalTemplates("");
  Doc.RunAppend(el,doc);
 };
 ClientExtensions.getContainer=function()
 {
  return Arrays.get(Global.jQuery("#container").get(),0).firstChild;
 };
 ClientExtensions.container=function(c)
 {
  return Doc.Element("div",[ClientExtensions.cls("container")],c);
 };
 ClientExtensions.dindex=function(n)
 {
  return AttrProxy.Create("data-index",Global.String(n));
 };
 ClientExtensions.cls=function(n)
 {
  return AttrProxy.Create("class",n);
 };
 ClientExtensions.eid=function(a)
 {
  return AttrProxy.Create("id",a);
 };
 ClientExtensions.getMic=function()
 {
  return Arrays.get(Global.jQuery("#microphone").get(),0);
 };
 ClientExtensions.terminalOutput=function()
 {
  return Arrays.get(Global.jQuery(".terminal-output").get(),0);
 };
 ClientExtensions.toLower=function(s)
 {
  return s.toLowerCase();
 };
 ClientExtensions.debug=function(loc,t)
 {
  ClientExtensions.info((((Runtime.Curried3(function($1,$2,$3)
  {
   return $1("DEBUG: "+Utils.toSafe($2)+": "+Utils.prettyPrint($3));
  }))(Global.id))(loc.toUpperCase()))(t));
 };
 ClientExtensions.error=function(a)
 {
  console.error(a);
 };
 ClientExtensions.info=function(a)
 {
  console.info(a);
 };
 ClientExtensions.jserror=function(a)
 {
  $.error(a);
 };
 ClientExtensions.toArray=function(a)
 {
  return Arrays.map(Global.id,$.makeArray(a));
 };
 ClientExtensions["Terminal.EchoHtml'"]=function(x,text)
 {
  x.pause();
  x.echo(text,ClientExtensions.rawOpt());
  x.resume();
 };
 ClientExtensions["Terminal.Echo'"]=function(x,text)
 {
  x.pause();
  x.echo(text);
  x.resume();
 };
 ClientExtensions.rawOpt=function()
 {
  SC$1.$cctor();
  return SC$1.rawOpt;
 };
 _Html=Web._Html=Runtime.Class({
  toString:function()
  {
   return _Html.toString(this);
  }
 },null,_Html);
 _Html.toString=function(elem)
 {
  function toString(indent)
  {
   return function(elem$1)
   {
    var $1,spaces,tag,tag$1,p,elems,attrs;
    spaces=Strings.replicate(indent," ");
    switch(elem$1.$==0?elem$1.$1.$==1?elem$1.$1.$0.$==2?elem$1.$1.$1.$==0?($1=[elem$1.$1.$0.$0,elem$1.$0],1):($1=[elem$1.$1,elem$1.$0],2):($1=[elem$1.$1,elem$1.$0],2):($1=[elem$1.$1,elem$1.$0],2):elem$1.$==2?($1=elem$1.$0,3):($1=[elem$1.$0,elem$1.$1],0))
    {
     case 0:
      return $1[0]+"=\""+$1[1]+"\"";
     case 1:
      tag=$1[1];
      return spaces+"<"+tag+">"+$1[0]+"</"+tag+">\r\n";
     case 2:
      tag$1=$1[1];
      p=List.partition(function(a)
      {
       return a.$==1;
      },$1[0]);
      elems=p[1];
      attrs=p[0];
      return elems.$==0?spaces+"<"+tag$1+(attrs.$===0?"":" "+Strings.concat(" ",List.ofSeq(Seq.delay(function()
      {
       return Seq.map(function(attr)
       {
        return(toString(0))(attr);
       },attrs);
      }))))+"/>\r\n":spaces+"<"+tag$1+(attrs.$===0?"":" "+Strings.concat(" ",List.ofSeq(Seq.delay(function()
      {
       return Seq.map(function(attr)
       {
        return(toString(0))(attr);
       },attrs);
      }))))+">\r\n"+Strings.concat("",List.ofSeq(Seq.delay(function()
      {
       return Seq.map(function(e)
       {
        return(toString(indent+1))(e);
       },elems);
      })))+spaces+"</"+tag$1+">\r\n";
     case 3:
      return spaces+$1+"\r\n";
    }
   };
  }
  return(toString(0))(elem);
 };
 htmModule.alt=function(c)
 {
  return new _Html({
   $:1,
   $0:"alt",
   $1:c
  });
 };
 htmModule.src=function(c)
 {
  return new _Html({
   $:1,
   $0:"src",
   $1:c
  });
 };
 htmModule.cls=function(c)
 {
  return new _Html({
   $:1,
   $0:"class",
   $1:c
  });
 };
 htmModule.str=function(h)
 {
  return _Html.toString(h);
 };
 htmModule.op_PercentEquals=function(name,value)
 {
  return new _Html({
   $:1,
   $0:name,
   $1:value
  });
 };
 htmModule.op_Splice=function(s)
 {
  var c;
  return List.ofArray([new _Html({
   $:2,
   $0:(c=s,Global.String(c))
  })]);
 };
 htmModule.strong=function()
 {
  SC$1.$cctor();
  return SC$1.strong;
 };
 htmModule.h4=function()
 {
  SC$1.$cctor();
  return SC$1.h4;
 };
 htmModule.h3=function()
 {
  SC$1.$cctor();
  return SC$1.h3;
 };
 htmModule.h2=function()
 {
  SC$1.$cctor();
  return SC$1.h2;
 };
 htmModule.h1=function()
 {
  SC$1.$cctor();
  return SC$1.h1;
 };
 htmModule.li=function()
 {
  SC$1.$cctor();
  return SC$1.li;
 };
 htmModule.ul=function()
 {
  SC$1.$cctor();
  return SC$1.ul;
 };
 htmModule.th=function()
 {
  SC$1.$cctor();
  return SC$1.th;
 };
 htmModule.td=function()
 {
  SC$1.$cctor();
  return SC$1.td;
 };
 htmModule.tr=function()
 {
  SC$1.$cctor();
  return SC$1.tr;
 };
 htmModule.a=function()
 {
  SC$1.$cctor();
  return SC$1.a;
 };
 htmModule.p=function()
 {
  SC$1.$cctor();
  return SC$1.p;
 };
 htmModule.area=function()
 {
  SC$1.$cctor();
  return SC$1.area;
 };
 htmModule.map=function()
 {
  SC$1.$cctor();
  return SC$1.map;
 };
 htmModule.img=function()
 {
  SC$1.$cctor();
  return SC$1.img;
 };
 htmModule.tfoot=function()
 {
  SC$1.$cctor();
  return SC$1.tfoot;
 };
 htmModule.tbody=function()
 {
  SC$1.$cctor();
  return SC$1.tbody;
 };
 htmModule.thead=function()
 {
  SC$1.$cctor();
  return SC$1.thead;
 };
 htmModule.table=function()
 {
  SC$1.$cctor();
  return SC$1.table;
 };
 htmModule.span=function()
 {
  SC$1.$cctor();
  return SC$1.span;
 };
 htmModule.section=function()
 {
  SC$1.$cctor();
  return SC$1.section;
 };
 htmModule.br=function()
 {
  SC$1.$cctor();
  return SC$1.br;
 };
 htmModule.div=function()
 {
  SC$1.$cctor();
  return SC$1.div;
 };
 htmModule.body=function()
 {
  SC$1.$cctor();
  return SC$1.body;
 };
 htmModule.style=function()
 {
  SC$1.$cctor();
  return SC$1.style;
 };
 htmModule.title=function()
 {
  SC$1.$cctor();
  return SC$1.title;
 };
 htmModule.head=function()
 {
  SC$1.$cctor();
  return SC$1.head;
 };
 htmModule.html=function()
 {
  SC$1.$cctor();
  return SC$1.html;
 };
 htmModule.elem=function(tag,content)
 {
  return new _Html({
   $:0,
   $0:tag,
   $1:content
  });
 };
 SC$1.$cctor=function()
 {
  var r;
  SC$1.$cctor=Global.ignore;
  SC$1.rawOpt=(r={},r.raw=true,r);
  SC$1.html=function(c)
  {
   return htmModule.elem("html",c);
  };
  SC$1.head=function(c)
  {
   return htmModule.elem("head",c);
  };
  SC$1.title=function(c)
  {
   return htmModule.elem("title",c);
  };
  SC$1.style=function(c)
  {
   return htmModule.elem("style",c);
  };
  SC$1.body=function(c)
  {
   return htmModule.elem("body",c);
  };
  SC$1.div=function(c)
  {
   return htmModule.elem("div",c);
  };
  SC$1.br=function(c)
  {
   return htmModule.elem("br",c);
  };
  SC$1.section=function(c)
  {
   return htmModule.elem("section",c);
  };
  SC$1.span=function(c)
  {
   return htmModule.elem("span",c);
  };
  SC$1.table=function(c)
  {
   return htmModule.elem("table",c);
  };
  SC$1.thead=function(c)
  {
   return htmModule.elem("thead",c);
  };
  SC$1.tbody=function(c)
  {
   return htmModule.elem("tbody",c);
  };
  SC$1.tfoot=function(c)
  {
   return htmModule.elem("tfoot",c);
  };
  SC$1.img=function(c)
  {
   return htmModule.elem("img",c);
  };
  SC$1.map=function(c)
  {
   return htmModule.elem("map",c);
  };
  SC$1.area=function(c)
  {
   return htmModule.elem("area",c);
  };
  SC$1.p=function(c)
  {
   return htmModule.elem("p",c);
  };
  SC$1.a=function(c)
  {
   return htmModule.elem("a",c);
  };
  SC$1.tr=function(c)
  {
   return htmModule.elem("tr",c);
  };
  SC$1.td=function(c)
  {
   return htmModule.elem("td",c);
  };
  SC$1.th=function(c)
  {
   return htmModule.elem("th",c);
  };
  SC$1.ul=function(c)
  {
   return htmModule.elem("ul",c);
  };
  SC$1.li=function(c)
  {
   return htmModule.elem("li",c);
  };
  SC$1.h1=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$1.h2=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$1.h3=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$1.h4=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$1.strong=function(c)
  {
   return htmModule.elem("strong",c);
  };
 };
 SaveResponse.New=function(name,message,message_code,status)
 {
  return{
   name:name,
   message:message,
   message_code:message_code,
   status:status
  };
 };
 UserResponse.New=function(message,message_code,success,count,status)
 {
  return{
   message:message,
   message_code:message_code,
   success:success,
   count:count,
   status:status
  };
 };
 VerifyResponse.New=function(message,message_code,success,result,score,confidence)
 {
  return{
   message:message,
   message_code:message_code,
   success:success,
   result:result,
   score:score,
   confidence:confidence
  };
 };
 Bs.Radio=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:ClientExtensions.cls("radio"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.Radio(targetExtras,true,target),Doc.TextNode(lbl)])]);
 };
 Bs.checkbox=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:ClientExtensions.cls("checkbox"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.CheckBox(targetExtras,target),Doc.TextNode(lbl)])]);
 };
 Bs.textArea=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:ClientExtensions.cls("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.InputArea(new List.T({
   $:1,
   $0:ClientExtensions.cls("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Bs.inputPassword=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:ClientExtensions.cls("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.PasswordBox(new List.T({
   $:1,
   $0:ClientExtensions.cls("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Bs.input=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:ClientExtensions.cls("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.Input([ClientExtensions.cls("form-control"),targetExtras],target)]);
 };
 Bs.btnSecondary=function(id,label,onclick)
 {
  return Doc.Element("button",[ClientExtensions.eid(id),ClientExtensions.cls("btn btn-secondary"),AttrModule.Handler("click",onclick)],[Doc.TextNode(label)]);
 };
 Bs.btnPrimary=function(id,label,onclick)
 {
  return Doc.Element("button",[ClientExtensions.eid(id),ClientExtensions.cls("btn btn-primary"),AttrModule.Handler("click",onclick)],[Doc.TextNode(label)]);
 };
 Utterance.New=function(text,intents,entities,traits)
 {
  return{
   text:text,
   intents:intents,
   entities:entities,
   traits:traits
  };
 };
 Intent.New=function(id,name,confidence)
 {
  return{
   id:id,
   name:name,
   confidence:confidence
  };
 };
 Entity.New=function(id,name,role,start,end,body,confidence,entities,suggested,value,type)
 {
  return{
   id:id,
   name:name,
   role:role,
   start:start,
   end:end,
   body:body,
   confidence:confidence,
   entities:entities,
   suggested:suggested,
   value:value,
   type:type
  };
 };
 Trait.New=function(id,value,confidence)
 {
  return{
   id:id,
   value:value,
   confidence:confidence
  };
 };
 _Utterance.New=function(intent)
 {
  return{
   intent:intent
  };
 };
 _Value.New=function(value)
 {
  return{
   value:value
  };
 };
 Witai.getMeaning2=function(authValue,sentence)
 {
  function a(ok,ko)
  {
   var r;
   $.ajax((r={},r.url=(function($1)
   {
    return function($2)
    {
     return $1("https://api.wit.ai/message?q="+Utils.toSafe($2));
    };
   }(Global.id))(sentence),r.type="GET",r.beforeSend=function(jqxhr)
   {
    return jqxhr.setRequestHeader("Authorization","Bearer "+authValue);
   },r.success=function(result)
   {
    return ok(result);
   },r.error=function(jqxhr)
   {
    return ko(new Global.Error(jqxhr.responseText));
   },r));
  }
  return Concurrency.FromContinuations(function($1,$2,$3)
  {
   return a.apply(null,[$1,$2,$3]);
  });
 };
 Witai.getMeaning=function(authValue,sentence,success,error)
 {
  var r;
  $.ajax((r={},r.url=(function($1)
  {
   return function($2)
   {
    return $1("https://api.wit.ai/message?q="+Utils.toSafe($2));
   };
  }(Global.id))(sentence),r.type="GET",r.beforeSend=function(jqxhr)
  {
   return jqxhr.setRequestHeader("Authorization","Bearer "+authValue);
  },r.success=success,r.error=error,r));
 };
 NLG.waitAddPhrases=function()
 {
  SC$2.$cctor();
  return SC$2.waitAddPhrases;
 };
 NLG.waitRetrievePhrases=function()
 {
  SC$2.$cctor();
  return SC$2.waitRetrievePhrases;
 };
 NLG.helpPhrases=function()
 {
  SC$2.$cctor();
  return SC$2.helpPhrases;
 };
 NLG.helloUserPhrases=function()
 {
  SC$2.$cctor();
  return SC$2.helloUserPhrases;
 };
 NLG.helloPhrases=function()
 {
  SC$2.$cctor();
  return SC$2.helloPhrases;
 };
 NLG["getRandomPhrase'"]=function(phrases)
 {
  return NLG.replace_tok("$0","",Seq.nth(NLG.rng().Next(0,phrases.get_Length()),phrases));
 };
 NLG.getRandomPhrase=function(phrases,r)
 {
  return NLG.replace_tok("$0",r,Seq.nth(NLG.rng().Next(0,phrases.get_Length()),phrases));
 };
 NLG.replace_tok=function(token,value,s)
 {
  return Strings.Replace(s,token,value);
 };
 NLG.rng=function()
 {
  SC$2.$cctor();
  return SC$2.rng;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.rng=new Random.New();
  SC$2.helloPhrases=List.ofArray(["Welcome!","Welcome, my name is Selma.","Welcome to Selma. How can I help?","Hello this is Selma, how can I help?","Hello, I am Selma. How can I help?","Hello, I am Selma. How may I help you now?","I'm Selma. Tell me your name so we can get started."]);
  SC$2.helloUserPhrases=List.ofArray(["Hello $0, welcome back.","Welcome $0, nice to see you again.","Hello $0.","Good to see you $0.","Hello $0, nice to see you."]);
  SC$2.helpPhrases=List.ofArray(["What can I help you with $0?"]);
  SC$2.waitRetrievePhrases=List.ofArray(["Ok, let me check that $0 for you","Please wait while I check that $0 for you.","Wait while I check that $0.","Ok let me see if I can find that $0."]);
  SC$2.waitAddPhrases=List.ofArray(["Ok, let me add that $0 for you","Please wait while I add that $0 for you.","Wait while I add that $0.","I'll add that $0 now."]);
 };
 Intent$1=NLU$1.Intent=Runtime.Class({
  toString:function()
  {
   return(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Intent("+Utils.toSafe($2)+", "+SMApp$Web_GeneratedPrintf.p$2($3)+")");
   }))(Global.id))(this.get_Name()))(this.get_Confidence());
  },
  get_Confidence:function()
  {
   return this.$1;
  },
  get_Name:function()
  {
   return this.$0;
  }
 },null,Intent$1);
 Trait$1=NLU$1.Trait=Runtime.Class({
  toString:function()
  {
   return(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Trait("+Utils.toSafe($2)+", "+Utils.prettyPrint($3)+")");
   }))(Global.id))(this.get_Name()))(this.get_Value());
  },
  get_Confidence:function()
  {
   return this.$2;
  },
  get_Value:function()
  {
   return this.$1;
  },
  get_Name:function()
  {
   return this.$0;
  }
 },null,Trait$1);
 Entity$1=NLU$1.Entity=Runtime.Class({
  toString:function()
  {
   return(((((Runtime.Curried(function($1,$2,$3,$4,$5)
   {
    return $1("Entity("+Utils.toSafe($2)+", "+Utils.toSafe($3)+", "+Utils.toSafe($4)+", "+SMApp$Web_GeneratedPrintf.p$2($5)+")");
   },5))(Global.id))(this.get_Name()))(this.get_Role()))(this.get_Value()))(this.get_Confidence());
  },
  get_Confidence:function()
  {
   return this.$3;
  },
  get_Value:function()
  {
   return this.$2;
  },
  get_Role:function()
  {
   return this.$1;
  },
  get_Name:function()
  {
   return this.$0;
  }
 },null,Entity$1);
 Utterance$1=NLU$1.Utterance=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1(SMApp$Web_GeneratedPrintf.p($2)+" "+SMApp$Web_GeneratedPrintf.p$3($3)+" "+SMApp$Web_GeneratedPrintf.p$5($4));
   },4))(Global.id))(this.get_Intent()))(this.get_Traits()))(this.get_Entities());
  },
  get_Entities:function()
  {
   var el;
   el=this.$3;
   return el!=null?{
    $:1,
    $0:List.sortBy(function(e)
    {
     return e.get_Name();
    },el.$0)
   }:null;
  },
  get_Traits:function()
  {
   var tl;
   tl=this.$2;
   return tl!=null?{
    $:1,
    $0:List.sortBy(function(e)
    {
     return e.get_Name();
    },tl.$0)
   }:null;
  },
  get_Intent:function()
  {
   return this.$1;
  },
  get_Text:function()
  {
   return this.$0;
  }
 },null,Utterance$1);
 _Entity.New=function(body,end,start,suggested,value)
 {
  return{
   body:body,
   end:end,
   start:start,
   suggested:suggested,
   value:value
  };
 };
 Voice["Intent'"]=function(a,a$1)
 {
  return!(a$1.intent==null)?{
   $:1,
   $0:new Intent$1({
    $:0,
    $0:ClientExtensions.toLower(a$1.intent.value),
    $1:null
   })
  }:null;
 };
 Voice["Trait'"]=function(a)
 {
  return!(a.domain==null)?{
   $:1,
   $0:new Trait$1({
    $:0,
    $0:"domain",
    $1:ClientExtensions.toLower(a.domain.value),
    $2:null
   })
  }:!(a.dialogue_act==null)?{
   $:1,
   $0:new Trait$1({
    $:0,
    $0:"dialogue_act",
    $1:ClientExtensions.toLower(a.dialogue_act.value),
    $2:null
   })
  }:null;
 };
 Voice["Entity'$1"]=function(a)
 {
  return!(a.contact==null)?{
   $:1,
   $0:new Entity$1({
    $:0,
    $0:"contact",
    $1:"",
    $2:ClientExtensions.toLower(a.contact.value),
    $3:null
   })
  }:null;
 };
 _Utterance$1=Text["Utterance'"]=Runtime.Class({
  get_TopIntent:function()
  {
   return List.head(List.sortBy(function(i)
   {
    return i.get_Confidence();
   },this.get_Intents()));
  },
  get_Traits:function()
  {
   return this.$3;
  },
  get_Entities:function()
  {
   return this.$2;
  },
  get_Intents:function()
  {
   return this.$1;
  },
  get_Text:function()
  {
   return this.$0;
  }
 },null,_Utterance$1);
 _Intent=Text["Intent'"]=Runtime.Class({
  get_Confidence:function()
  {
   return this.$1;
  },
  get_Name:function()
  {
   return this.$0;
  }
 },null,_Intent);
 _Entity$1=Text["Entity'"]=Runtime.Class({
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
 },null,_Entity$1);
 _Trait=Text["Trait'"]=Runtime.Class({
  get_Value:function()
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
   return[this.$0,this.$1,this.$2];
  }
 },null,_Trait);
 Text.HasUtterance=function(a)
 {
  var $1,_entities,m,_traits,intent,entities;
  return a!=null&&a.$==1&&(a.$0.$2.get_Length()>0&&($1=[a.$0.$2,a.$0.$1,a,a.$0.$0,a.$0.$3],true))?(_entities=$1[0],(m=$1[2],(_traits=$1[4],(intent=$1[1].$==0?null:{
   $:1,
   $0:new Intent$1({
    $:0,
    $0:m.$0.get_TopIntent().get_Name(),
    $1:{
     $:1,
     $0:m.$0.get_TopIntent().get_Confidence()
    }
   })
  },(entities=_entities.$==0?null:{
   $:1,
   $0:List.map(function(e)
   {
    return new Entity$1({
     $:0,
     $0:e.get_Name(),
     $1:ClientExtensions.toLower(e.get_Role()),
     $2:e.get_Value(),
     $3:{
      $:1,
      $0:e.get_Confidence()
     }
    });
   },List.filter(function(e)
   {
    return e.get_Confidence()>Text.entityConfidenceThreshold();
   },_entities))
  },{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:$1[3],
    $1:intent,
    $2:_traits.$==0?null:{
     $:1,
     $0:List.map(function(t)
     {
      return new Trait$1({
       $:0,
       $0:ClientExtensions.toLower(t.get_Name()),
       $1:t.get_Value(),
       $2:{
        $:1,
        $0:t.get_Confidence()
       }
      });
     },List.filter(function(t)
     {
      return t.get_Confidence()>Text.entityConfidenceThreshold();
     },_traits))
    },
    $3:entities
   })
  }))))):null;
 };
 Text.entityConfidenceThreshold=function()
 {
  SC$3.$cctor();
  return SC$3.entityConfidenceThreshold;
 };
 Text.set_entityConfidenceThreshold=function($1)
 {
  SC$3.$cctor();
  SC$3.entityConfidenceThreshold=$1;
 };
 Text.intentConfidenceThreshold=function()
 {
  SC$3.$cctor();
  return SC$3.intentConfidenceThreshold;
 };
 Text.set_intentConfidenceThreshold=function($1)
 {
  SC$3.$cctor();
  SC$3.intentConfidenceThreshold=$1;
 };
 Text.getUtterance2=function(sentence)
 {
  var b;
  b=null;
  return Concurrency.Delay(function()
  {
   return Concurrency.Bind(Witai.getMeaning2("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT",sentence),function(a)
   {
    ClientExtensions.debug("NLU",(function($1)
    {
     return function($2)
     {
      return $1("Wit.ai returned "+GeneratedPrintf.p($2)+" ");
     };
    }(Global.id))(a));
    return Concurrency.Return(new _Utterance$1({
     $:0,
     $0:sentence,
     $1:List.ofArray(Arrays.map(function(a$1)
     {
      return new _Intent({
       $:0,
       $0:a$1.name,
       $1:a$1.confidence
      });
     },a.intents)),
     $2:List.map(function(e)
     {
      return new _Entity$1({
       $:0,
       $0:e.name,
       $1:e.confidence,
       $2:e.role,
       $3:e.value
      });
     },List.ofSeq(Seq.concat(Seq.map(function(t)
     {
      return t[1];
     },Map.ToSeq(a.entities))))),
     $3:List.ofSeq(Seq.map(function(t)
     {
      var _t;
      _t=t[1];
      return new _Trait({
       $:0,
       $0:t[0],
       $1:Arrays.get(_t,0).confidence,
       $2:Arrays.get(_t,0).value
      });
     },Map.ToSeq(a.traits)))
    }));
   });
  });
 };
 Text.getUtterance=function(sentence,m)
 {
  Witai.getMeaning("OOGDHEQL7JZRQASXN2N2GHFUKGO3SCNV",sentence,function(o)
  {
   var intents,traits;
   ClientExtensions.debug("NLU",(function($1)
   {
    return function($2)
    {
     return $1("Wit.ai returned: "+Utils.prettyPrint($2));
    };
   }(Global.id))(o));
   intents=!(o.intents==null)?List.ofArray(Arrays.map(function(i)
   {
    return new _Intent({
     $:0,
     $0:i.name,
     $1:i.confidence
    });
   },o.intents)):List.T.Empty;
   traits=!(o.traits==null)?List.ofSeq(Seq.concat(List.map(function(tt)
   {
    return Arrays.map(function(t)
    {
     return new _Trait({
      $:0,
      $0:tt,
      $1:t.confidence,
      $2:t.value
     });
    },Pervasives.GetJS(o.traits,[tt]));
   },List.filter(function(tt)
   {
    return!(Pervasives.GetJS(o.traits,[tt])==null);
   },Text.trait_types())))):List.T.Empty;
   return m({
    $:1,
    $0:new _Utterance$1({
     $:0,
     $0:sentence,
     $1:intents,
     $2:!(o.entities==null)?List.ofSeq(Seq.concat(List.map(function(et)
     {
      return Arrays.map(function(e)
      {
       return new _Entity$1({
        $:0,
        $0:e.name,
        $1:e.confidence,
        $2:e.role,
        $3:e.value
       });
      },Pervasives.GetJS(o.entities,[et]));
     },List.filter(function(et)
     {
      return!(Pervasives.GetJS(o.entities,[et])==null);
     },Text.entity_types())))):List.T.Empty,
     $3:traits
    })
   });
  },function(a,s,e)
  {
   ClientExtensions.error((((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Wit.ai returned: "+Utils.prettyPrint($2)+" "+Utils.prettyPrint($3));
   }))(Global.id))(s))(e));
   return m(null);
  });
 };
 Text.trait_types=function()
 {
  SC$3.$cctor();
  return SC$3.trait_types;
 };
 Text.entity_types=function()
 {
  SC$3.$cctor();
  return SC$3.entity_types;
 };
 Text.QuickJournal=function(a)
 {
  var $1;
  return a==="journal"||a==="diary"?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"journal",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"journal",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:null
   })
  }:null;
 };
 Text.QuickNumber=function(a)
 {
  var $1,a$1,a$2,a$3,a$4,a$5;
  return(a$1=Text.One(a),a$1!=null&&a$1.$==1?($1=a$1.$0,true):(a$2=Text.Two(a),a$2!=null&&a$2.$==1?($1=a$2.$0,true):(a$3=Text.Three(a),a$3!=null&&a$3.$==1?($1=a$3.$0,true):(a$4=Text.Four(a),a$4!=null&&a$4.$==1?($1=a$4.$0,true):(a$5=Text.Five(a),a$5!=null&&a$5.$==1&&($1=a$5.$0,true))))))?{
   $:1,
   $0:$1
  }:null;
 };
 Text.Five=function(a)
 {
  var $1;
  return a==="5"||a==="five"?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"five",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:{
     $:1,
     $0:List.ofArray([new Entity$1({
      $:0,
      $0:"wit/ordinal",
      $1:"",
      $2:"five",
      $3:{
       $:1,
       $0:1
      }
     })])
    }
   })
  }:null;
 };
 Text.Four=function(a)
 {
  var $1;
  return a==="4"||a==="four"?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"four",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:{
     $:1,
     $0:List.ofArray([new Entity$1({
      $:0,
      $0:"wit/ordinal",
      $1:"",
      $2:"four",
      $3:{
       $:1,
       $0:1
      }
     })])
    }
   })
  }:null;
 };
 Text.Three=function(a)
 {
  var $1;
  return a==="3"||a==="three"?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"three",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:{
     $:1,
     $0:List.ofArray([new Entity$1({
      $:0,
      $0:"wit/ordinal",
      $1:"",
      $2:"three",
      $3:{
       $:1,
       $0:1
      }
     })])
    }
   })
  }:null;
 };
 Text.Two=function(a)
 {
  var $1;
  return a==="2"||a==="two"?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"two",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:{
     $:1,
     $0:List.ofArray([new Entity$1({
      $:0,
      $0:"wit/ordinal",
      $1:"",
      $2:"two",
      $3:{
       $:1,
       $0:1
      }
     })])
    }
   })
  }:null;
 };
 Text.One=function(a)
 {
  var $1;
  return a==="1"||a==="one"?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"one",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:{
     $:1,
     $0:List.ofArray([new Entity$1({
      $:0,
      $0:"wit/ordinal",
      $1:"",
      $2:"one",
      $3:{
       $:1,
       $0:1
      }
     })])
    }
   })
  }:null;
 };
 Text.QuickNo=function(a)
 {
  var $1;
  return a==="no"||(a==="nope"||(a==="no way"||(a==="nah"||(a==="don't do it"||a==="stop"))))?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"no",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"reject",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:null
   })
  }:null;
 };
 Text.QuickYes=function(a)
 {
  var $1;
  return a==="yes"||(a==="ok"||(a==="sure"||(a==="yeah"||(a==="yep"||(a==="uh huh"||(a==="go ahead"||a==="go"))))))?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"yes",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"verify",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:null
   })
  }:null;
 };
 Text.QuickHelp=function(a)
 {
  var $1;
  return a==="help"||(a==="help me"||(a==="what's this?"||a==="huh"))?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"help",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"help",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:null
   })
  }:null;
 };
 Text.QuickHello=function(a)
 {
  var $1;
  return a==="hello"||(a==="hey"||(a==="yo"||a==="hi"))?{
   $:1,
   $0:new Utterance$1({
    $:0,
    $0:"hello",
    $1:{
     $:1,
     $0:new Intent$1({
      $:0,
      $0:"greet",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $2:null,
    $3:null
   })
  }:null;
 };
 Text.Voices=function(a)
 {
  return a==="voices"?{
   $:1,
   $0:null
  }:null;
 };
 Text.DebugTriples=function(a)
 {
  return Strings.StartsWith(a,"debug-triples ")?{
   $:1,
   $0:Strings.Replace(a,"debug-triples ","")
  }:null;
 };
 Text.Debug=function(a)
 {
  return a==="debug"?{
   $:1,
   $0:null
  }:null;
 };
 Text.Blank=function(a)
 {
  return a===""?{
   $:1,
   $0:null
  }:null;
 };
 Domain.Study=function(a)
 {
  return a.get_Traits()!=null?{
   $:0,
   $0:null
  }:{
   $:1,
   $0:null
  };
 };
 NLU$1.StrA=function(a)
 {
  if(a!=null&&a.$==1)
   try
   {
    return{
     $:1,
     $0:((Provider.DecodeArray(Provider.Id()))())(JSON.parse(a.$0))
    };
   }
   catch(m)
   {
    return null;
   }
  else
   return null;
 };
 NLU$1.PStr=function(a)
 {
  var $1;
  return a!=null&&a.$==1&&(typeof a.$0=="string"&&($1=a.$0,true))?{
   $:1,
   $0:$1
  }:null;
 };
 NLU$1.No=function(a)
 {
  var $1,a$1;
  return(a$1=NLU$1.Intent$1("reject",a),a$1!=null&&a$1.$==1&&(a$1.$0[0]==null&&(a$1.$0[1]==null&&($1=a,true))))?{
   $:1,
   $0:$1
  }:null;
 };
 NLU$1.Yes=function(a)
 {
  var $1,a$1;
  return(a$1=NLU$1.Intent$1("verify",a),a$1!=null&&a$1.$==1&&(a$1.$0[0]==null&&(a$1.$0[1]==null&&($1=a,true))))?{
   $:1,
   $0:$1
  }:null;
 };
 NLU$1.EntityManyofMany=function(roles,a)
 {
  return{
   $:1,
   $0:Map.OfArray(Arrays.ofSeq(List.map(function(r)
   {
    return List.exists(function(e)
    {
     return e.get_Role()===r;
    },a)?[r,{
     $:1,
     $0:List.filter(function(_e)
     {
      return _e.get_Role()===r;
     },a)
    }]:[r,null];
   },roles)))
  };
 };
 NLU$1.EntityManyOf1=function(r,a)
 {
  var $1;
  return a!=null&&a.$==1&&(List.exists(function(e)
  {
   return e.get_Role()===r;
  },a.$0)&&($1=a.$0,true))?{
   $:1,
   $0:List.filter(function(e)
   {
    return e.get_Role()===r;
   },$1)
  }:null;
 };
 NLU$1.Entity1OfAny=function(r,a)
 {
  var $1;
  return a!=null&&a.$==1&&(List.exists(function(e)
  {
   return e.get_Role()===r;
  },a.$0)&&($1=a.$0,true))?{
   $:1,
   $0:List.head(List.sortBy(function(e)
   {
    return e.get_Role();
   },List.filter(function(e)
   {
    return e.get_Role()===r;
   },$1)))
  }:null;
 };
 NLU$1.Entity1Of1=function(r,a)
 {
  var $1,entity;
  return a!=null&&a.$==1&&(a.$0.$==1&&(a.$0.$1.$==0&&((entity=a.$0.$0,entity.get_Role()===r||entity.get_Name()===r)&&($1=a.$0.$0,true))))?{
   $:1,
   $0:$1
  }:null;
 };
 NLU$1.Intent$1=function(n,a)
 {
  return a.get_Intent()!=null&&a.get_Intent().$0.get_Name()===n?{
   $:1,
   $0:[a.get_Traits(),a.get_Entities()]
  }:null;
 };
 SC$3.$cctor=function()
 {
  SC$3.$cctor=Global.ignore;
  SC$3.entity_types=List.ofArray(["wit$contact:name","wit$datetime:datetime","term:subject","term:object","term:verb"]);
  SC$3.trait_types=List.ofArray(["domain","dialogue_act"]);
  SC$3.intentConfidenceThreshold=0.85;
  SC$3.entityConfidenceThreshold=0.85;
 };
 EmotionalTrait=Knowledge.EmotionalTrait=Runtime.Class({
  get_Frequence:function()
  {
   return this.$2;
  },
  get_Hierarchy:function()
  {
   return this.$1;
  },
  get_Label:function()
  {
   return this.$0;
  }
 },null,EmotionalTrait);
 Relation=Knowledge.Relation=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("("+Utils.prettyPrint($2)+", "+Utils.prettyPrint($3)+", "+Utils.prettyPrint($4)+")");
   },4))(Global.id))(this.get_T1()))(this.get_Name()))(this.get_T2());
  },
  get_T2:function()
  {
   return this.$2;
  },
  get_Name:function()
  {
   return this.$1;
  },
  get_T1:function()
  {
   return this.$0;
  }
 },null,Relation);
 Triple=Knowledge.Triple=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("("+SMApp$Web_GeneratedPrintf.p$9($2)+", "+SMApp$Web_GeneratedPrintf.p$11($3)+", "+SMApp$Web_GeneratedPrintf.p$16($4)+")");
   },4))(Global.id))(this.get_Subject()))(this.get_Verb()))(this.get_Object());
  },
  get_Object:function()
  {
   var o;
   o=this.$1;
   return o!=null?{
    $:1,
    $0:o.$0.get_T2()
   }:null;
  },
  get_Verb:function()
  {
   return this.$0.get_T2();
  },
  get_Subject:function()
  {
   return this.$0.get_T1();
  }
 },null,Triple);
 Subject=Knowledge.Subject=Runtime.Class({
  toString:function()
  {
   return this.$==1?Global.String(this.$0):this.$0;
  }
 },null,Subject);
 Verb=Knowledge.Verb=Runtime.Class({
  toString:function()
  {
   return this.$0;
  }
 },null,Verb);
 Object=Knowledge.Object=Runtime.Class({
  toString:function()
  {
   return this.$==1?Global.String(this.$0):this.$0;
  }
 },null,Object);
 MicState.MicReady={
  $:5
 };
 MicState.MicAudioEnd={
  $:4
 };
 MicState.MicAudioStart={
  $:3
 };
 MicState.MicDisconnected={
  $:2
 };
 MicState.MicConnecting={
  $:1
 };
 MicState.MicNotInitialized={
  $:0
 };
 ClientState.ClientUnderstand={
  $:2
 };
 ClientState.ClientReady={
  $:1
 };
 ClientState.ClientNotInitialzed={
  $:0
 };
 Interpreter=CUI.Interpreter=Runtime.Class({
  get_Options:function()
  {
   return(this.get_Unwrap())[2];
  },
  get_Text:function()
  {
   return(this.get_Unwrap())[1];
  },
  get_Voice:function()
  {
   return(this.get_Unwrap())[0];
  },
  get_Unwrap:function()
  {
   return[this.$0,this.$1[0],this.$1[1]];
  }
 },null,Interpreter);
 CUI$1=CUI.CUI=Runtime.Class({
  SayVoices:function()
  {
   var $this,_voices,voices;
   $this=this;
   _voices=Global.speechSynthesis.getVoices();
   !(_voices==null)?(voices=ClientExtensions.toArray(_voices),$this.Say((function($1)
   {
    return function($2)
    {
     return $1("There are currently "+Global.String($2)+" voices installed on this computer or device.");
    };
   }(Global.id))(Arrays.length(voices))),Arrays.iteri(function(i,v)
   {
    return $this.Say(((((Runtime.Curried(function($1,$2,$3,$4)
    {
     return $1("Voice "+Global.String($2)+". Name: "+Utils.toSafe($3)+", Local: "+Utils.prettyPrint($4)+".");
    },4))(Global.id))(i))(v.name))(v.localService));
   },voices)):void 0;
  },
  Wait:function(f)
  {
   this.Wait$1(function()
   {
    Concurrency.Start(f,null);
   });
  },
  Wait$1:function(f)
  {
   this["Echo'"]("please wait...");
   this.Term.pause();
   f();
   this.Term.resume();
  },
  sayRandom:function(phrases,t)
  {
   this.Say(NLG.getRandomPhrase(phrases,t));
  },
  SayAngry:function(m)
  {
   var $this,b;
   $this=this;
   Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Combine(Global.speechSynthesis.speaking?(Global.speechSynthesis.cancel(),SDK.chime(),Concurrency.Zero()):Concurrency.Zero(),Concurrency.Delay(function()
    {
     Global.addMessage($this.Avatar,m,"","");
     $this.Avatar.processMessages(0);
     return Concurrency.Zero();
    }));
   })),null);
  },
  SayDoc:function(d)
  {
   var i,x,a;
   i=Arrays.get($(".terminal-output").get(),0).childNodes.length;
   x=Doc.Element("div",[ClientExtensions.cls("terminal-command"),ClientExtensions.dindex(i+1)],[d]);
   a=ClientExtensions.terminalOutput();
   Templates.LoadLocalTemplates("");
   Doc.RunAppend(a,x);
  },
  Say:function(text)
  {
   var $this,b;
   $this=this;
   Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Combine(Global.speechSynthesis.speaking?(SDK.chime(),Concurrency.Zero()):Concurrency.Zero(),Concurrency.Delay(function()
    {
     $this.Avatar.addMessage(text);
     $this.Avatar.processMessages(0);
     return Concurrency.Zero();
    }));
   })),null);
  },
  Debug:function(loc,m)
  {
   ClientExtensions.debug(loc,m);
  },
  "EchoHtml'":function(text)
  {
   var rawOpt,r;
   rawOpt=(r={},r.raw=true,r);
   this.Term.disable();
   this.Term.echo(text,rawOpt);
   this.Term.enable();
  },
  "Echo'":function(text)
  {
   this.Term.disable();
   this.Term.echo(text);
   this.Term.enable();
  }
 },null,CUI$1);
 CUI$1.New=function(Voice$1,Mic,Term,Avatar,Caption,AudioHandlers,TypingDNA$1)
 {
  return new CUI$1({
   Voice:Voice$1,
   Mic:Mic,
   Term:Term,
   Avatar:Avatar,
   Caption:Caption,
   AudioHandlers:AudioHandlers,
   TypingDNA:TypingDNA$1
  });
 };
 Dialogue=Web.Dialogue=Runtime.Class({
  get_Utterances:function()
  {
   return this.$4;
  },
  get_Output:function()
  {
   return this.$3;
  },
  get_DialogueQuestions:function()
  {
   return this.$2;
  },
  get_Props:function()
  {
   return this.$1;
  },
  get_Cui:function()
  {
   return this.$0;
  }
 },null,Dialogue);
 Question=Web.Question=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("Name: "+Utils.toSafe($2)+" Module: "+Utils.toSafe($3)+" Type: "+SMApp$Web_GeneratedPrintf.p$17($4)+" ");
   },4))(Global.id))(this.get_Name()))(this.get_Module()))(this.get_Type());
  },
  get_Target:function()
  {
   return this.$4;
  },
  get_Params:function()
  {
   return this.$3;
  },
  get_Type:function()
  {
   return this.$2;
  },
  get_Module:function()
  {
   return this.$1;
  },
  get_Name:function()
  {
   return this.$0;
  }
 },null,Question);
 QuestionType.ConceptCompletion={
  $:3
 };
 QuestionType.Disjunctive={
  $:2
 };
 QuestionType.Verification={
  $:1
 };
 DialogueModule["Response'_"]=function(d,n,a)
 {
  var $1,a$1,a$2,a$3,a$4,a$5,a$6,p;
  return(a$1=DialogueModule.PropNotSet_(d,"user",a),a$1!=null&&a$1.$==1?(a$2=DialogueModule.Form(d,n,a$1.$0),a$2!=null&&a$2.$==1?($1=a$2.$0,true):(a$3=DialogueModule.PropNotSet_(d,"user",a),a$3!=null&&a$3.$==1&&(a$4=DialogueModule.NotForm(d,n,a$3.$0),a$4!=null&&a$4.$==1&&($1=a$4.$0,true)))):(a$5=DialogueModule.PropNotSet_(d,"user",a),a$5!=null&&a$5.$==1&&(a$6=DialogueModule.NotForm(d,n,a$5.$0),a$6!=null&&a$6.$==1&&($1=a$6.$0,true))))?(p=DialogueModule.have(d,n)?{
   $:1,
   $0:DialogueModule.prop(d,n)
  }:null,$1.get_Text()!==""?{
   $:1,
   $0:[$1,{
    $:1,
    $0:$1.get_Text()
   },p]
  }:{
   $:1,
   $0:[$1,null,p]
  }):null;
 };
 DialogueModule.Response_=function(d,n,a)
 {
  var $1,a$1,a$2,a$3,a$4,a$5,a$6,p;
  return(a$1=DialogueModule.PropSet_(d,"user",a),a$1!=null&&a$1.$==1?(a$2=DialogueModule.Form(d,n,a$1.$0),a$2!=null&&a$2.$==1?($1=a$2.$0,true):(a$3=DialogueModule.PropSet_(d,"user",a),a$3!=null&&a$3.$==1&&(a$4=DialogueModule.NotForm(d,n,a$3.$0),a$4!=null&&a$4.$==1&&($1=a$4.$0,true)))):(a$5=DialogueModule.PropSet_(d,"user",a),a$5!=null&&a$5.$==1&&(a$6=DialogueModule.NotForm(d,n,a$5.$0),a$6!=null&&a$6.$==1&&($1=a$6.$0,true))))?(p=DialogueModule.have(d,n)?{
   $:1,
   $0:DialogueModule.prop(d,n)
  }:null,$1.get_Text()!==""?{
   $:1,
   $0:[$1,{
    $:1,
    $0:$1.get_Text()
   },p]
  }:{
   $:1,
   $0:[$1,null,p]
  }):null;
 };
 DialogueModule.NotForm=function(d,n,a)
 {
  return d.get_DialogueQuestions().length>0&&(d.get_DialogueQuestions())[0].get_Name()===n&&a.get_Text()!==""?{
   $:1,
   $0:a
  }:null;
 };
 DialogueModule.Form=function(d,n,a)
 {
  return d.get_DialogueQuestions().length>0&&(d.get_DialogueQuestions())[0].get_Name()===n&&a.get_Intent()!=null&&a.get_Intent().$0.get_Name()===n&&Unchecked.Equals(a.get_Intent().$0.get_Confidence(),{
   $:1,
   $0:1
  })&&Unchecked.Equals(a.get_Traits(),null)&&Unchecked.Equals(a.get_Entities(),null)?{
   $:1,
   $0:a
  }:null;
 };
 DialogueModule["User'_"]=function(d,a)
 {
  var $1,a$1;
  return(a$1=DialogueModule.PropNotSet_(d,"user",a),a$1!=null&&a$1.$==1&&(d.get_DialogueQuestions().length===0&&($1=a$1.$0,true)))?{
   $:1,
   $0:$1
  }:null;
 };
 DialogueModule.User_=function(d,a)
 {
  var $1,a$1;
  return(a$1=DialogueModule.PropSet_(d,"user",a),a$1!=null&&a$1.$==1&&(d.get_DialogueQuestions().length===0&&($1=a$1.$0,true)))?{
   $:1,
   $0:$1
  }:null;
 };
 DialogueModule.PropNotSet_=function(d,n,a)
 {
  return!DialogueModule.have(d,n)?{
   $:1,
   $0:a
  }:null;
 };
 DialogueModule.PropSet_=function(d,n,a)
 {
  return DialogueModule.have(d,n)?{
   $:1,
   $0:a
  }:null;
 };
 DialogueModule.Agenda_=function(d,debug,m,a)
 {
  return d.get_DialogueQuestions().length>0&&(d.get_DialogueQuestions())[0].get_Module()===m?{
   $:1,
   $0:null
  }:null;
 };
 DialogueModule.debugInterpreterEnd=function(d,debug,name)
 {
  debug(((((Runtime.Curried(function($1,$2,$3,$4)
  {
   return $1(Utils.toSafe($2)+" ending utterances:"+Utils.prettyPrint($3)+", questions: "+Utils.prettyPrint($4)+".");
  },4))(Global.id))(name))(d.get_Utterances()))(d.get_DialogueQuestions()));
 };
 DialogueModule.debugInterpreterStart=function(d,debug,name)
 {
  debug(((((Runtime.Curried(function($1,$2,$3,$4)
  {
   return $1(Utils.toSafe($2)+" starting utterances:"+Utils.prettyPrint($3)+", questions: "+Utils.prettyPrint($4)+".");
  },4))(Global.id))(name))(d.get_Utterances()))(d.get_DialogueQuestions()));
 };
 DialogueModule.frame=function(utterances)
 {
  return List.ofSeq(Seq.take(utterances.length>=5?5:utterances.length,utterances));
 };
 DialogueModule.didNotUnderstand=function(d,debug,name)
 {
  debug((function($1)
  {
   return function($2)
   {
    return $1(Utils.toSafe($2)+" interpreter did not understand utterance.");
   };
  }(Global.id))(name));
  DialogueModule.popu(d,debug);
  DialogueModule.say(d,"Sorry I didn't understand what you meant.");
 };
 DialogueModule.endt=function(d,debug,m,f)
 {
  DialogueModule.popu(d,debug);
  DialogueModule.popq(d,debug);
  DialogueModule.have(d,m)?DialogueModule.remove(d,debug,m):void 0;
  debug((function($1)
  {
   return function($2)
   {
    return $1("End turn "+Utils.toSafe($2)+".");
   };
  }(Global.id))(m));
  f();
 };
 DialogueModule.cancel=function(d,debug,qn)
 {
  var q;
  q=(d.get_DialogueQuestions())[0];
  q.get_Name()!==qn?(((Runtime.Curried3(function($1,$2,$3)
  {
   return $1(SMApp$Web_GeneratedPrintf.p$18($2)+" at the top of the stack does not have the name "+Utils.toSafe($3)+".");
  }))(Operators.FailWith))(q))(qn):void 0;
  DialogueModule.popq(d,debug);
  debug((function($1)
  {
   return function($2)
   {
    return $1("Cancel "+SMApp$Web_GeneratedPrintf.p$18($2)+".");
   };
  }(Global.id))(q));
 };
 DialogueModule.trigger=function(d,debug,target,name,data)
 {
  DialogueModule.pushu(d,debug,new Utterance$1({
   $:0,
   $0:JSON.stringify(data),
   $1:{
    $:1,
    $0:new Intent$1({
     $:0,
     $0:name,
     $1:{
      $:1,
      $0:1
     }
    })
   },
   $2:null,
   $3:null
  }));
  target(d);
 };
 DialogueModule.handle=function(d,debug,m,f)
 {
  DialogueModule.popu(d,debug);
  debug((function($1)
  {
   return function($2)
   {
    return $1("Handle utterance "+Utils.toSafe($2)+".");
   };
  }(Global.id))(m));
  f();
 };
 DialogueModule.dispatch=function(d,debug,targetModule,target)
 {
  debug(((((Runtime.Curried(function($1,$2,$3,$4)
  {
   return $1("Dispatch to module "+Utils.toSafe($2)+" utterances: "+Utils.prettyPrint($3)+" questions: "+Utils.prettyPrint($4)+".");
  },4))(Global.id))(targetModule))(d.get_Utterances()))(d.get_DialogueQuestions()));
  target(d);
 };
 DialogueModule.popq=function(d,debug)
 {
  var q;
  q=d.get_DialogueQuestions().shift();
  debug((function($1)
  {
   return function($2)
   {
    return $1("Pop "+SMApp$Web_GeneratedPrintf.p$18($2)+".");
   };
  }(Global.id))(q));
 };
 DialogueModule.pushq=function(d,debug,q)
 {
  d.get_DialogueQuestions().unshift(q);
  debug((function($1)
  {
   return function($2)
   {
    return $1("Push "+SMApp$Web_GeneratedPrintf.p$18($2)+".");
   };
  }(Global.id))(q));
 };
 DialogueModule.popu=function(d,debug)
 {
  var m;
  m=d.get_Utterances().shift();
  debug((function($1)
  {
   return function($2)
   {
    return $1("Pop "+SMApp$Web_GeneratedPrintf.p$15($2)+".");
   };
  }(Global.id))(m));
 };
 DialogueModule.pushu=function(d,debug,m)
 {
  debug((function($1)
  {
   return function($2)
   {
    return $1("Push "+SMApp$Web_GeneratedPrintf.p$15($2)+".");
   };
  }(Global.id))(m));
  d.get_Utterances().unshift(m);
 };
 DialogueModule.remove=function(d,debug,k)
 {
  debug((function($1)
  {
   return function($2)
   {
    return $1("Remove property "+Utils.toSafe($2)+".");
   };
  }(Global.id))(k));
  d.get_Props().Remove(k);
 };
 DialogueModule.add=function(d,debug,k,v)
 {
  d.get_Props().Add(k,v);
  debug((((Runtime.Curried3(function($1,$2,$3)
  {
   return $1("Add property "+Utils.toSafe($2)+":"+Utils.prettyPrint($3)+".");
  }))(Global.id))(k))(v));
 };
 DialogueModule.prop=function(d,k)
 {
  return d.get_Props().ContainsKey(k)?d.get_Props().get_Item(k):(function($1)
  {
   return function($2)
   {
    return $1("The "+Utils.toSafe($2)+" dialogue property does not exist.");
   };
  }(Operators.FailWith))(k);
 };
 DialogueModule.have=function(d,k)
 {
  return d.get_Props().ContainsKey(k);
 };
 DialogueModule["sayRandom'"]=function(d,p)
 {
  DialogueModule.sayRandom(d,p,"");
 };
 DialogueModule.sayRandom=function(d,p,v)
 {
  var t;
  t=NLG.getRandomPhrase(p,v);
  d.get_Output().unshift(t);
  d.get_Cui().Say(t);
 };
 DialogueModule.say=function(d,t)
 {
  d.get_Output().unshift(t);
  DialogueModule["say'"](d,t);
 };
 DialogueModule["say'"]=function(d,t)
 {
  d.get_Cui().Say(t);
 };
 DialogueModule.echo=function(d,t)
 {
  (d.get_Cui())["EchoHtml'"](t);
 };
 Questions.ask=function(d,debug,q)
 {
  var m,t,n,passPhrase;
  function say(t$1)
  {
   DialogueModule.say(d,t$1);
  }
  function setupBox1(b)
  {
   b.input="text";
   b.showCancelButton=true;
   b.confirmButtonText="Ok";
  }
  function setupBox2(b)
  {
   b.confirmButtonClass="invisible";
   b.showCancelButton=true;
  }
  function collectFaceAndTypingData()
  {
   var c;
   c=ClientExtensions.createDialogueBoxCanvas();
   ClientExtensions.startCamera(self.document.body,c);
  }
  function box(t$1)
  {
   var c,data;
   c=t$1[0];
   data=t$1[1];
   ClientExtensions.questionBox("Biometric Authentication","",{
    $:1,
    $0:ClientExtensions.boxesWithTitles(["2","3"])
   },{
    $:1,
    $0:[640,480]
   },{
    $:1,
    $0:setupBox1
   },{
    $:1,
    $0:collectFaceAndTypingData
   },function(o)
   {
    var pattern,r,text,image;
    o.isConfirmed?(pattern=d.get_Cui().TypingDNA.getTypingPattern((r={},r.type=1,r.text=passPhrase,r.caseSensitive=false,r)),text=o.value,image=ClientExtensions.getCameraCanvas().toDataURL(),debug((function($1)
    {
     return function($2)
     {
      return $1("User image is "+Utils.toSafe($2)+"...");
     };
    }(Global.id))(Strings.Substring(image,0,10))),ClientExtensions.stopCamera(),debug((((Runtime.Curried3(function($1,$2,$3)
    {
     return $1("User entered typing pattern "+Utils.toSafe($2)+" for text "+Utils.toSafe($3));
    }))(Global.id))(pattern))(text)),text.toLowerCase()!==passPhrase.toLowerCase()?(say("Sorry you did not enter the passphrase correctly. Please try again."),box([c,data])):ClientExtensions.questionBox("Biometric Authentication","",null,null,{
     $:1,
     $0:setupBox2
    },{
     $:1,
     $0:function()
     {
      ClientExtensions.getDialogueBoxContent().appendChild(ClientExtensions.getMic());
      d.get_Cui().AudioHandlers.Add("VoiceAuthentication",function(v)
      {
       JSON.stringify(((Provider.Id())())(v));
       ClientExtensions.confirmQuestionBox();
      });
     }
    },function(o$1)
    {
     if(!o$1.isConfirmed)
      {
       d.get_Cui().AudioHandlers.Remove("VoiceAuthentication");
       say("OK but you must login for me to help you.");
      }
    })):say("OK but you must login for me to help you.");
   });
  }
  DialogueModule.pushq(d,debug,q);
  m=q.get_Type();
  m.$==0?(t=q.get_Target(),n=q.get_Name(),passPhrase=(function($1)
  {
   return function($2)
   {
    return $1("Hello my name is "+Utils.toSafe($2)+" and I am an administrator");
   };
  }(Global.id))(m.$0),say((function($1)
  {
   return function($2)
   {
    return $1("Enter the phrase "+Utils.toSafe($2)+".");
   };
  }(Global.id))(passPhrase)),box([0,[]])):Operators.FailWith("Not implemented");
 };
 User.update=function(d)
 {
  var handle,endt,ask,m,$1,a,a$1,a$2,$2,a$3,a$4,a$5,$3,a$6,a$7,$4,a$8,a$9,a$10,$5,a$11,a$12,a$13,$6,a$14,a$15,$7,a$16,a$17,a$18,b,$8,a$19,a$20,a$21,$9,a$22,a$23,a$24;
  function say(t)
  {
   DialogueModule.say(d,t);
  }
  function sayRandom(p,v)
  {
   return DialogueModule.sayRandom(d,p,v);
  }
  function add(k,v)
  {
   return DialogueModule.add(d,function(m$1)
   {
    User.debug(m$1);
   },k,v);
  }
  function d$1(m$1)
  {
   User.debug(m$1);
  }
  function d$2(m$1)
  {
   User.debug(m$1);
  }
  function d$3(m$1)
  {
   User.debug(m$1);
  }
  function _User(a$25)
  {
   return DialogueModule["User'_"](d,a$25);
  }
  function Response(n,a$25)
  {
   return DialogueModule.Response_(d,n,a$25);
  }
  function _Response(n,a$25)
  {
   return DialogueModule["Response'_"](d,n,a$25);
  }
  function loginUser(u)
  {
   var b$1;
   sayRandom(NLG.waitRetrievePhrases(),"user name");
   Concurrency.Start((b$1=null,Concurrency.Delay(function()
   {
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getUser:-796169108",[u]),function(a$25)
    {
     var user;
     return a$25==null?(say((function($10)
     {
      return function($11)
      {
       return $10("I did not find a user with the name "+Utils.toSafe($11)+".");
      };
     }(Global.id))(u)),ask(new Question({
      $:0,
      $0:"addUser",
      $1:User.name(),
      $2:QuestionType.Verification,
      $3:null,
      $4:function()
      {
       add("addUser",u);
       say((function($10)
       {
        return function($11)
        {
         return $10("Do you want me to add the user "+Utils.toSafe($11)+"?");
        };
       }(Global.id))(u));
      }
     })),Concurrency.Zero()):(user=a$25.$0,Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.updateUserLastLogin:1901099988",[user.Name]),function()
     {
      sayRandom(NLG.helloUserPhrases(),user.Name);
      return user.LastLoggedIn!=null?Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.humanize:987812025",[user.LastLoggedIn.$0]),function(a$26)
      {
       say((function($10)
       {
        return function($11)
        {
         return $10("You last logged in "+Utils.toSafe($11)+".");
        };
       }(Global.id))(a$26));
       return Concurrency.Zero();
      }):Concurrency.Zero();
     }));
    });
   })),null);
  }
  function switchUserQuestion(u)
  {
   return new Question({
    $:0,
    $0:"switchUser",
    $1:User.name(),
    $2:QuestionType.Verification,
    $3:null,
    $4:function()
    {
     say((function($10)
     {
      return function($11)
      {
       return $10("Do you want me to switch to the user "+Utils.toSafe($11));
      };
     }(Global.id))(u));
    }
   });
  }
  DialogueModule.debugInterpreterStart(d,function(m$1)
  {
   User.debug(m$1);
  },User.name());
  handle=Runtime.Curried(DialogueModule.handle,2,[d,d$1]);
  endt=Runtime.Curried(DialogueModule.endt,2,[d,d$2]);
  ask=function(q)
  {
   Questions.ask(d,d$3,q);
  };
  m=DialogueModule.frame(d.$4);
  m.$==1&&(a=_User(m.$0),a!=null&&a.$==1&&(a$1=NLU$1.Intent$1("greet",a.$0),a$1!=null&&a$1.$==1&&(a$2=NLU$1.Entity1Of1("name",a$1.$0[1]),a$2!=null&&a$2.$==1&&(m.$1.$==0&&($1=a$2.$0,true)))))?(handle("loginUser"))(function()
  {
   loginUser($1.get_Value());
  }):m.$==1&&(a$3=_User(m.$0),a$3!=null&&a$3.$==1&&(a$4=NLU$1.Intent$1("hello",a$3.$0),a$4!=null&&a$4.$==1&&(a$5=NLU$1.Entity1Of1("contact",a$4.$0[1]),a$5!=null&&a$5.$==1&&(m.$1.$==0&&($2=a$5.$0,true)))))?(handle("loginUser"))(function()
  {
   loginUser($2.get_Value());
  }):m.$==1&&(a$6=_Response("authenticateUser",m.$0),a$6!=null&&a$6.$==1&&(a$7=NLU$1.StrA(a$6.$0[1]),a$7!=null&&a$7.$==1&&(m.$1.$==0&&($3=a$7.$0,true))))?(endt("authenticateUser"))(function()
  {
   var b$1;
   User.debug($3);
   Concurrency.Start((b$1=null,Concurrency.Delay(function()
   {
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.hasFace:-1025880667",[Arrays.get($3,2)]),function(a$25)
    {
     return a$25?(say("Face detected"),Concurrency.Zero()):(say(function($10)
     {
      return $10("Sorry I did not detect a face in the camera image. Make sure you can see the red square around your face in the camera window when you click the OK button.");
     }(Global.id)),Concurrency.Zero());
    });
   })),null);
  }):m.$==1&&(a$8=NLU$1.No(m.$0),a$8!=null&&a$8.$==1&&(a$9=_Response("addUser",a$8.$0),a$9!=null&&a$9.$==1&&(a$10=NLU$1.PStr(a$9.$0[2]),a$10!=null&&a$10.$==1&&(m.$1.$==0&&($4=a$10.$0,true)))))?(endt("addUser"))(function()
  {
   say((function($10)
   {
    return function($11)
    {
     return $10("Ok I did not add the user "+Utils.toSafe($11)+". But you must login for me to help you.");
    };
   }(Global.id))($4));
  }):m.$==1&&(a$11=NLU$1.Yes(m.$0),a$11!=null&&a$11.$==1&&(a$12=_Response("addUser",a$11.$0),a$12!=null&&a$12.$==1&&(a$13=NLU$1.PStr(a$12.$0[2]),a$13!=null&&a$13.$==1&&(m.$1.$==0&&($5=a$13.$0,true)))))?(endt("addUser"))(function()
  {
   ask(new Question({
    $:0,
    $0:"authenticateNewUser1",
    $1:User.name(),
    $2:{
     $:0,
     $0:$5
    },
    $3:null,
    $4:function(d$4)
    {
     User.update(d$4);
    }
   }));
  }):m.$==1&&(a$14=_Response("authenticateNewUser1",m.$0),a$14!=null&&a$14.$==1&&(a$15=NLU$1.StrA(a$14.$0[1]),a$15!=null&&a$15.$==1&&(m.$1.$==0&&($6=a$15.$0,true))))?(endt("authenticateNewUser1"))(function()
  {
   say((function($10)
   {
    return function($11)
    {
     return $10("Authenticate new user "+Utils.toSafe($11)+".");
    };
   }(Global.id))(Arrays.get($6,0)));
  }):m.$==1&&(a$16=DialogueModule.User_(d,m.$0),a$16!=null&&a$16.$==1&&(a$17=NLU$1.Intent$1("hello",a$16.$0),a$17!=null&&a$17.$==1&&(a$17.$0[0]==null&&(a$18=NLU$1.Entity1Of1("name",a$17.$0[1]),a$18!=null&&a$18.$==1&&(m.$1.$==0&&($7=a$18.$0,true))))))?Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getUser:-796169108",[$7.get_Value()]),function(a$25)
   {
    return a$25==null?(say((function($10)
    {
     return function($11)
     {
      return $10("Sorry, the user "+Utils.toSafe($11)+" does not exist.");
     };
    }(Global.id))($7.get_Value())),Concurrency.Zero()):(ask(switchUserQuestion(a$25.$0.Name)),Concurrency.Zero());
   });
  })),null):m.$==1&&(a$19=NLU$1.Yes(m.$0),a$19!=null&&a$19.$==1&&(a$20=Response("switchUser",a$19.$0),a$20!=null&&a$20.$==1&&(a$21=NLU$1.PStr(a$20.$0[2]),a$21!=null&&a$21.$==1&&(m.$1.$==0&&($8=a$21.$0,true)))))?(d.$1.set_Item("user",$8),say((function($10)
  {
   return function($11)
   {
    return $10("Ok I switched to user "+Utils.prettyPrint($11)+".");
   };
  }(Global.id))($8))):m.$==1&&(a$22=NLU$1.No(m.$0),a$22!=null&&a$22.$==1&&(a$23=Response("switchUser",a$22.$0),a$23!=null&&a$23.$==1&&(a$24=NLU$1.PStr(a$23.$0[2]),a$24!=null&&a$24.$==1&&(m.$1.$==0&&($9=a$24.$0,true)))))?say((function($10)
  {
   return function($11)
   {
    return $10("Ok I did not switch to user "+Utils.toSafe($11)+".");
   };
  }(Global.id))($9)):DialogueModule.didNotUnderstand(d,function(m$1)
  {
   User.debug(m$1);
  },User.name());
  DialogueModule.debugInterpreterEnd(d,function(m$1)
  {
   User.debug(m$1);
  },User.name());
 };
 User.debug=function(m)
 {
  ClientExtensions.debug(User.name(),m);
 };
 User.name=function()
 {
  SC$4.$cctor();
  return SC$4.name;
 };
 SC$4.$cctor=function()
 {
  SC$4.$cctor=Global.ignore;
  SC$4.name="User";
 };
 Symptoms.update=function(d)
 {
  var m,$1,a,a$1,a$2,b,$2,a$3,$3,$4,a$4,a$5,$5,$6,a$6,$7;
  function say(t)
  {
   DialogueModule.say(d,t);
  }
  function sayRandom(p,v)
  {
   return DialogueModule.sayRandom(d,p,v);
  }
  function prop(k)
  {
   return DialogueModule.prop(d,k);
  }
  function User$1(a$7)
  {
   return DialogueModule.User_(d,a$7);
  }
  function user()
  {
   return prop("user");
  }
  function addSymptom(s,l,m$1)
  {
   var b$1;
   return Concurrency.Start((b$1=null,Concurrency.Delay(function()
   {
    sayRandom(NLG.waitAddPhrases(),"symptom entry");
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.addSymptomJournalEntry:-1678372324",[user().Name,s,l,m$1]),function(a$7)
    {
     return a$7.$==1?(say(function($8)
     {
      return $8("Sorry I wasn't able to add that symptom to your journal. Could you try again?");
     }(Global.id)),Concurrency.Zero()):(say((function($8)
     {
      return function($9)
      {
       return $8("OK I added that "+Utils.toSafe($9)+" symptom to your journal.");
      };
     }(Global.id))(s)),Concurrency.Zero());
    });
   })),null);
  }
  DialogueModule.debugInterpreterStart(d,function(m$1)
  {
   Symptoms.debug(m$1);
  },Symptoms.name());
  m=DialogueModule.frame(d.$4);
  m.$==1&&(a=User$1(m.$0),a!=null&&a.$==1&&(a$1=NLU$1.Intent$1("symptom",a.$0),a$1!=null&&a$1.$==1&&(a$2=NLU$1.Entity1OfAny("symptom_name",a$1.$0[1]),a$2!=null&&a$2.$==1&&(m.$1.$==0&&($1=a$2.$0,true)))))?Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   say("Ok I'll add that entry to your symptom journal");
   addSymptom($1.get_Value(),null,null);
   return Concurrency.Zero();
  })),null):m.$==1&&(a$3=NLU$1.Yes(m.$0),a$3!=null&&a$3.$==1&&(($3=DialogueModule.Response_(d,"painVideo",a$3.$0),$3!=null&&$3.$==1)&&m.$1.$==0))?d.$0["EchoHtml'"]("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/SkAqOditKN0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"):m.$==1&&(a$4=User$1(m.$0),a$4!=null&&a$4.$==1&&(a$5=NLU$1.Intent$1("medjournal",a$4.$0),a$5!=null&&a$5.$==1&&(($5=a$5.$0[1],$5!=null&&$5.$==1)&&(m.$1.$==0&&($4=a$5.$0[1].$0,true)))))?(say("ok I added that entry to your medication journal."),say("You should be careful not to take too many painkillers over a short period of time.")):m.$==1&&(a$6=User$1(m.$0),a$6!=null&&a$6.$==1&&(($7=NLU$1.Intent$1("kbquery",a$6.$0),$7!=null&&$7.$==1)&&(m.$1.$==0&&($6=a$6.$0,true))))?void 0:DialogueModule.didNotUnderstand(d,function(m$1)
  {
   Symptoms.debug(m$1);
  },Symptoms.name());
  DialogueModule.debugInterpreterEnd(d,function(m$1)
  {
   Symptoms.debug(m$1);
  },Symptoms.name());
 };
 Symptoms.debug=function(m)
 {
  ClientExtensions.debug(Symptoms.name(),m);
 };
 Symptoms.name=function()
 {
  SC$5.$cctor();
  return SC$5.name;
 };
 SC$5.$cctor=function()
 {
  SC$5.$cctor=Global.ignore;
  SC$5.name="Symptoms";
 };
 Main.update=function(d)
 {
  var utterances,dispatch,handle,m,a,$1,a$1,a$2,a$3,a$4,$2,a$5,a$6,$3,a$7,a$8,$4,$5,a$9,a$10,$6;
  function say(t)
  {
   DialogueModule.say(d,t);
  }
  function _sayRandom(p)
  {
   DialogueModule["sayRandom'"](d,p);
  }
  function d$1(m$1)
  {
   Main.debug(m$1);
  }
  function d$2(m$1)
  {
   Main.debug(m$1);
  }
  function _User(a$11)
  {
   return DialogueModule["User'_"](d,a$11);
  }
  utterances=d.$4;
  Main.debug(((((Runtime.Curried(function($7,$8,$9,$10)
  {
   return $7("Module "+Utils.toSafe($8)+" starting utterances:"+Utils.prettyPrint($9)+", questions: "+Utils.prettyPrint($10)+".");
  },4))(Global.id))(Main.name()))(utterances))(d.$2));
  dispatch=Runtime.Curried(DialogueModule.dispatch,2,[d,d$1]);
  handle=Runtime.Curried(DialogueModule.handle,2,[d,d$2]);
  m=DialogueModule.frame(utterances);
  a=DialogueModule.Agenda_(d,function(m$1)
  {
   Main.debug(m$1);
  },User.name(),m);
  a!=null&&a.$==1?(Main.debug((function($7)
  {
   return function($8)
   {
    return $7("Agenda is "+SMApp$Web_GeneratedPrintf.p$18($8)+".");
   };
  }(Global.id))((d.get_DialogueQuestions())[0])),User.update(d)):m.$==1&&(a$1=(a$2=DialogueModule.PropNotSet_(d,"started",m.$0),a$2!=null&&a$2.$==1?{
   $:1,
   $0:a$2.$0
  }:null),a$1!=null&&a$1.$==1&&(a$3=_User(a$1.$0),a$3!=null&&a$3.$==1&&(a$4=NLU$1.Intent$1("greet",a$3.$0),a$4!=null&&a$4.$==1&&(a$4.$0[1]==null&&m.$1.$==0))))?(DialogueModule.add(d,function(m$1)
  {
   Main.debug(m$1);
  },"started",true),(handle("greet"))(function()
  {
   _sayRandom(NLG.helloPhrases());
  })):m.$==1&&(a$5=_User(m.$0),a$5!=null&&a$5.$==1&&(a$6=NLU$1.Intent$1("greet",a$5.$0),a$6!=null&&a$6.$==1&&(a$6.$0[1]==null&&m.$1.$==0)))?(handle("greet"))(function()
  {
   say("Hello, tell me your name to get started.");
  }):m.$==1&&(a$7=_User(m.$0),a$7!=null&&a$7.$==1&&(a$8=NLU$1.Intent$1("greet",a$7.$0),a$8!=null&&a$8.$==1&&(($4=NLU$1.Entity1Of1("name",a$8.$0[1]),$4!=null&&$4.$==1)&&m.$1.$==0)))?(dispatch(User.name()))(function(d$3)
  {
   User.update(d$3);
  }):m.$==1&&(a$9=_User(m.$0),a$9!=null&&a$9.$==1&&(a$10=NLU$1.Intent$1("hello",a$9.$0),a$10!=null&&a$10.$==1&&(($6=NLU$1.Entity1Of1("contact",a$10.$0[1]),$6!=null&&$6.$==1)&&m.$1.$==0)))?(dispatch(User.name()))(function(d$3)
  {
   User.update(d$3);
  }):DialogueModule.didNotUnderstand(d,function(m$1)
  {
   Main.debug(m$1);
  },Main.name());
  DialogueModule.debugInterpreterEnd(d,function(m$1)
  {
   Main.debug(m$1);
  },Main.name());
 };
 Main.debug=function(m)
 {
  ClientExtensions.debug(Main.name(),m);
 };
 Main.name=function()
 {
  SC$6.$cctor();
  return SC$6.name;
 };
 SC$6.$cctor=function()
 {
  SC$6.$cctor=Global.ignore;
  SC$6.name="Main";
 };
 Client.run=function()
 {
  var interpreter,options;
  interpreter=Runtime.ThisFunc(function(term,command)
  {
   return((Client.Main().get_Text())(term))(command);
  });
  options=Client.Main().get_Options();
  Global.$("#term").terminal(interpreter,options);
  return Doc.get_Empty();
 };
 Client.Main=function()
 {
  SC$7.$cctor();
  return SC$7.Main;
 };
 Client.initMic=function(interpret)
 {
  var M,mic;
  Client.set_CUI((M={
   $:1,
   $0:new Wit.Microphone(document.getElementById("microphone"))
  },CUI$1.New(Client.CUI().Voice,M,Client.CUI().Term,Client.CUI().Avatar,Client.CUI().Caption,Client.CUI().AudioHandlers,Client.CUI().TypingDNA)));
  mic=Client.CUI().Mic.$0;
  mic.onconnecting=function()
  {
   Client.set_MicState(MicState.MicConnecting);
   return Client.debug("Mic connecting...");
  };
  mic.ondisconnected=function()
  {
   Client.set_MicState(MicState.MicDisconnected);
   return Client.debug("Mic disconnected.");
  };
  mic.onaudiostart=function()
  {
   Client.set_MicState(MicState.MicAudioStart);
   return Client.debug("Mic audio start...");
  };
  mic.onaudioend=function()
  {
   var e,i,kv,h;
   Client.debug("Mic audio end.");
   i=Client.CUI().AudioHandlers;
   e=i.GetEnumerator$1();
   try
   {
    while(e.MoveNext())
     {
      kv=e.Current();
      Client.debug((function($1)
      {
       return function($2)
       {
        return $1("Executing audio handler "+Utils.toSafe($2)+".");
       };
      }(Global.id))(kv.K));
      Client.set_MicState({
       $:7,
       $0:kv.K
      });
      h=kv.V;
      Client.CUI().AudioHandlers.Remove(kv.K);
      h(ClientExtensions.lastMicData());
     }
    return;
   }
   finally
   {
    e.Dispose();
   }
  };
  mic.onerror=function(s)
  {
   Client.set_MicState({
    $:6,
    $0:s
   });
   return Client.debug((function($1)
   {
    return function($2)
    {
     return $1("Mic error : "+Utils.toSafe($2)+".");
    };
   }(Global.id))(s));
  };
  mic.onready=function()
  {
   Client.set_MicState(MicState.MicReady);
   return Client.debug("Mic ready.");
  };
  mic.onresult=function(i,e)
  {
   return Client.ClientState().$==2?Client.echo("I'm still trying to understand what you said before."):Client.ClientState().$==0?ClientExtensions.error("Client is not intialized."):Client.MicState().$==7?null:!(i==null||e==null)?(Client.set_MicState({
    $:8,
    $0:i,
    $1:e
   }),Client.debug((((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Mic result: "+Utils.prettyPrint($2)+" "+Utils.prettyPrint($3)+".");
   }))(Global.id))(i))(e)),interpret(i,e)):Client.debug("Mic: No result returned.");
  };
  mic.connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT");
 };
 Client.sayRandom=function(t,phrases)
 {
  Client.say(NLG.getRandomPhrase(phrases,t));
 };
 Client.say=function(text)
 {
  Client.Output().unshift(text);
  Client["say'"](text);
 };
 Client["say'"]=function(text)
 {
  Client.CUI().Say(text);
 };
 Client.initSpeech=function()
 {
  var voices;
  voices=ClientExtensions.toArray(Client.synth().getVoices());
  Arrays.length(voices)>0?(Arrays.iter(function(v)
  {
   if(Unchecked.Equals(Client.CUI().Voice,null)&&(v.name.indexOf("Microsoft Zira")!=-1||v.name.toLowerCase().indexOf("female")!=-1))
    {
     Client.set_CUI(CUI$1.New({
      $:1,
      $0:v
     },Client.CUI().Mic,Client.CUI().Term,Client.CUI().Avatar,Client.CUI().Caption,Client.CUI().AudioHandlers,Client.CUI().TypingDNA));
     Client.debug((function($1)
     {
      return function($2)
      {
       return $1("Using browser speech synthesis voice "+Utils.toSafe($2)+".");
      };
     }(Global.id))(Client.CUI().Voice.$0.name));
    }
  },voices),!Unchecked.Equals(Client.CUI().Voice,null)?(Client.CUI().Avatar.nativeVoice=true,Client.CUI().Avatar.nativeVoiceName=Client.CUI().Voice.$0.name,Client.debug((function($1)
  {
   return function($2)
   {
    return $1("Using browser speech synthesis voice "+Utils.toSafe($2)+".");
   };
  }(Global.id))(Client.CUI().Voice.$0.name))):void 0):void 0;
  Unchecked.Equals(Client.CUI().Voice,null)?Client.debug("No female browser speech synthesis voice is available. Using CMU SLT Female voice via TTS."):void 0;
 };
 Client.synth=function()
 {
  SC$7.$cctor();
  return SC$7.synth;
 };
 Client.push=function(m)
 {
  Client.Utterances().unshift(m);
  return Client.Dialogue();
 };
 Client.Dialogue=function()
 {
  SC$7.$cctor();
  return SC$7.Dialogue;
 };
 Client.Utterances=function()
 {
  SC$7.$cctor();
  return SC$7.Utterances;
 };
 Client.Questions=function()
 {
  SC$7.$cctor();
  return SC$7.Questions;
 };
 Client.Output=function()
 {
  SC$7.$cctor();
  return SC$7.Output;
 };
 Client.Props=function()
 {
  SC$7.$cctor();
  return SC$7.Props;
 };
 Client.wait=function(f)
 {
  ClientExtensions["Terminal.Echo'"](Client.CUI().Term,"please wait");
  Client.CUI().Term.pause();
  f();
  Client.CUI().Term.resume();
 };
 Client.debug=function(m)
 {
  ClientExtensions.debug("CLIENT",m);
 };
 Client.echo=function(m)
 {
  ClientExtensions["Terminal.EchoHtml'"](Client.CUI().Term,(function($1)
  {
   return function($2)
   {
    return $1(Utils.prettyPrint($2));
   };
  }(Global.id))(m));
 };
 Client.ClientState=function()
 {
  SC$7.$cctor();
  return SC$7.ClientState;
 };
 Client.set_ClientState=function($1)
 {
  SC$7.$cctor();
  SC$7.ClientState=$1;
 };
 Client.MicState=function()
 {
  SC$7.$cctor();
  return SC$7.MicState;
 };
 Client.set_MicState=function($1)
 {
  SC$7.$cctor();
  SC$7.MicState=$1;
 };
 Client.CUI=function()
 {
  SC$7.$cctor();
  return SC$7.CUI;
 };
 Client.set_CUI=function($1)
 {
  SC$7.$cctor();
  SC$7.CUI=$1;
 };
 SC$7.$cctor=function()
 {
  var sdk,web,r;
  SC$7.$cctor=Global.ignore;
  function _main(i,e)
  {
   var intent,a,_trait,a$1,entity,a$2,$1;
   Client.debug((((Runtime.Curried3(function($2,$3,$4)
   {
    return $2("Voice: "+Utils.prettyPrint($3)+" "+Utils.prettyPrint($4));
   }))(Global.id))(i))(e));
   intent=(a=Voice["Intent'"](i,e),a!=null&&a.$==1?{
    $:1,
    $0:a.$0
   }:null);
   _trait=(a$1=Voice["Trait'"](e),a$1!=null&&a$1.$==1?{
    $:1,
    $0:List.ofArray([a$1.$0])
   }:null);
   entity=(a$2=Voice["Entity'$1"](e),a$2!=null&&a$2.$==1?{
    $:1,
    $0:List.ofArray([a$2.$0])
   }:null);
   intent==null&&(_trait==null&&entity==null)?void 0:(Client.debug(((((Runtime.Curried(function($2,$3,$4,$5)
   {
    return $2("Voice: "+SMApp$Web_GeneratedPrintf.p($3)+" "+SMApp$Web_GeneratedPrintf.p$3($4)+" "+SMApp$Web_GeneratedPrintf.p$5($5));
   },4))(Global.id))(intent))(_trait))(entity)),Main.update(Client.push(new Utterance$1({
    $:0,
    $0:"",
    $1:intent,
    $2:_trait,
    $3:entity
   }))));
  }
  function main(term,command)
  {
   var e,a,dt,b,$1,voices,$2,a$1,a$2,a$3,a$4,a$5,b$1,a$6,a$7,p;
   Client.set_CUI(CUI$1.New(Client.CUI().Voice,Client.CUI().Mic,term,Client.CUI().Avatar,Client.CUI().Caption,Client.CUI().AudioHandlers,Client.CUI().TypingDNA));
   if(Unchecked.Equals(Client.CUI().Mic,null))
    Client.initMic(_main);
   if(Unchecked.Equals(Client.CUI().Voice,null))
    Client.initSpeech();
   if(Client.ClientState().$===0)
    Client.set_ClientState(ClientState.ClientReady);
   a$6=Text.Blank(command);
   if(a$6!=null&&a$6.$==1)
    return Client["say'"]("Tell me what you want me to do or ask me a question.");
   else
    {
     a$7=Text.Debug(command);
     if(a$7!=null&&a$7.$==1)
      {
       Client.debug((function($3)
       {
        return function($4)
        {
         return $3("Utterances: "+Utils.prettyPrint($4));
        };
       }(Global.id))(Client.Utterances()));
       Client.debug((function($3)
       {
        return function($4)
        {
         return $3("Questions: "+Utils.prettyPrint($4));
        };
       }(Global.id))(Client.Questions()));
       e=Client.Props().GetEnumerator$1();
       try
       {
        while(e.MoveNext())
         {
          p=e.Current();
          Client.debug((((Runtime.Curried3(function($3,$4,$5)
          {
           return $3(Utils.toSafe($4)+": "+Utils.prettyPrint($5));
          }))(Global.id))(p.K))(p.V));
         }
        return;
       }
       finally
       {
        e.Dispose();
       }
      }
     else
      {
       a=Text.DebugTriples(command);
       return a!=null&&a.$==1?(dt=a.$0,Client.CUI().Wait((b=null,Concurrency.Delay(function()
       {
        return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getTriples:-677734872",[dt]),function(a$8)
        {
         return a$8.$==1?(Client.debug(a$8.$0),Concurrency.Zero()):Concurrency.For(a$8.$0,function(a$9)
         {
          return Concurrency.For(a$9,function(a$10)
          {
           Client.debug((function($3)
           {
            return function($4)
            {
             return $3(SMApp$Web_GeneratedPrintf.p$7($4));
            };
           }(Global.id))(a$10));
           return Concurrency.Zero();
          });
         });
        });
       })))):($1=Text.Voices(command),$1!=null&&$1.$==1?(voices=ClientExtensions.toArray(ClientExtensions.speechSynthesis().getVoices()),Client["say'"]((function($3)
       {
        return function($4)
        {
         return $3("There are currently "+Global.String($4)+" voices installed on this computer or device.");
        };
       }(Global.id))(Arrays.length(voices))),Arrays.iteri(function(i,v)
       {
        return Client["say'"](((((Runtime.Curried(function($3,$4,$5,$6)
        {
         return $3("Voice "+Global.String($4)+". Name: "+Utils.toSafe($5)+", Local: "+Utils.prettyPrint($6)+".");
        },4))(Global.id))(i))(v.name))(v.localService));
       },voices)):Client.ClientState().$==1?(a$1=Text.QuickHello(command),(a$1!=null&&a$1.$==1?($2=a$1.$0,true):(a$2=Text.QuickHelp(command),a$2!=null&&a$2.$==1?($2=a$2.$0,true):(a$3=Text.QuickYes(command),a$3!=null&&a$3.$==1?($2=a$3.$0,true):(a$4=Text.QuickNo(command),a$4!=null&&a$4.$==1?($2=a$4.$0,true):(a$5=Text.QuickNumber(command),a$5!=null&&a$5.$==1&&($2=a$5.$0,true))))))?(Client.debug((function($3)
       {
        return function($4)
        {
         return $3("Quick Text: "+SMApp$Web_GeneratedPrintf.p$15($4)+".");
        };
       }(Global.id))($2)),Main.update(Client.push($2)),Client.set_ClientState(ClientState.ClientReady)):Client.CUI().Wait((b$1=null,Concurrency.Delay(function()
       {
        Client.set_ClientState(ClientState.ClientUnderstand);
        Text.getUtterance(command,function(meaning)
        {
         var a$8,m;
         a$8=Text.HasUtterance(meaning);
         a$8!=null&&a$8.$==1?(m=a$8.$0,Client.debug(((((Runtime.Curried(function($3,$4,$5,$6)
         {
          return $3("Text: Intent: "+SMApp$Web_GeneratedPrintf.p($4)+", Traits: "+SMApp$Web_GeneratedPrintf.p$3($5)+", Entities: "+SMApp$Web_GeneratedPrintf.p$5($6)+".");
         },4))(Global.id))(m.get_Intent()))(m.get_Traits()))(m.get_Entities())),Main.update(Client.push(m))):(Client.debug("Text: Did not receive a meaning from the server."),Client["say'"]("Sorry I did not understand what you said."));
        });
        Client.set_ClientState(ClientState.ClientReady);
        return Concurrency.Zero();
       })))):Client.ClientState().$==0?ClientExtensions.error("Client is not initialized."):Client["say'"]("I'm still trying to understand what you said before."));
      }
    }
  }
  SC$7.CUI=CUI$1.New(null,null,null,(SDK.applicationId="4277115329081938617",sdk=new Global.SDKConnection(),web=new Global.WebAvatar(),web.version=8.5,web.connection=sdk,web.avatar="20926186",web.voice="cmu-slt",web.voiceMod="default",web.width=175,web.createBox(),web.addMessage(""),web.processMessages(0),web),false,new Dictionary.New$5(),new Global.TypingDNA());
  SC$7.MicState=MicState.MicNotInitialized;
  SC$7.ClientState=ClientState.ClientNotInitialzed;
  SC$7.Props=new Dictionary.New$5();
  SC$7.Output=[];
  SC$7.Questions=[];
  SC$7.Utterances=[];
  SC$7.Dialogue=new Dialogue({
   $:0,
   $0:Client.CUI(),
   $1:Client.Props(),
   $2:Client.Questions(),
   $3:Client.Output(),
   $4:Client.Utterances()
  });
  SC$7.synth=Global.speechSynthesis;
  SC$7.Main=new Interpreter({
   $:0,
   $0:function($1)
   {
    return _main($1[0],$1[1]);
   },
   $1:[function($1)
   {
    return function($2)
    {
     return main($1,$2);
    };
   },(r={},r.name="Main",r.greetings="Welcome to Selma. Enter 'hello' or 'hello my name is...(you) to initialize speech.",r.prompt=">",r)]
  });
 };
 SMApp$Web_GeneratedPrintf.p$16=function($1)
 {
  return $1==null?"null":"Some "+SMApp$Web_GeneratedPrintf.p$14($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$17=function($1)
 {
  return $1.$==3?"ConceptCompletion":$1.$==2?"Disjunctive":$1.$==1?"Verification":"UserAuthentication "+Utils.prettyPrint($1.$0);
 };
 GeneratedPrintf.p=function($1)
 {
  return"{"+("text = "+Utils.prettyPrint($1.text))+"; "+("intents = "+Utils.printArray(function($2)
  {
   return GeneratedPrintf.p$1($2);
  },$1.intents))+"; "+("entities = "+Utils.prettyPrint($1.entities))+"; "+("traits = "+Utils.prettyPrint($1.traits))+"}";
 };
 GeneratedPrintf.p$1=function($1)
 {
  return"{"+("id = "+Utils.prettyPrint($1.id))+"; "+("name = "+Utils.prettyPrint($1.name))+"; "+("confidence = "+Utils.prettyPrint($1.confidence))+"}";
 };
 SMApp$Web_GeneratedPrintf.p$18=function($1)
 {
  return"Question ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$17($1.$2)+", "+SMApp$Web_GeneratedPrintf.p$19($1.$3)+", "+"<fun>"+")";
 };
 SMApp$Web_GeneratedPrintf.p$19=function($1)
 {
  return $1==null?"null":"Some "+Utils.printArray(Utils.prettyPrint,$1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$2=function($1)
 {
  return $1==null?"null":"Some "+Utils.prettyPrint($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$1=function($1)
 {
  return"Intent ("+Utils.prettyPrint($1.$0)+", "+SMApp$Web_GeneratedPrintf.p$2($1.$1)+")";
 };
 SMApp$Web_GeneratedPrintf.p=function($1)
 {
  return $1==null?"null":"Some "+SMApp$Web_GeneratedPrintf.p$1($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$4=function($1)
 {
  return"Trait ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$2($1.$2)+")";
 };
 SMApp$Web_GeneratedPrintf.p$3=function($1)
 {
  return $1==null?"null":"Some "+Utils.printList(function($2)
  {
   return SMApp$Web_GeneratedPrintf.p$4($2);
  },$1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$6=function($1)
 {
  return"Entity ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+Utils.prettyPrint($1.$2)+", "+SMApp$Web_GeneratedPrintf.p$2($1.$3)+")";
 };
 SMApp$Web_GeneratedPrintf.p$5=function($1)
 {
  return $1==null?"null":"Some "+Utils.printList(function($2)
  {
   return SMApp$Web_GeneratedPrintf.p$6($2);
  },$1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$10=function($1)
 {
  return"Relation ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+Utils.prettyPrint($1.$2)+")";
 };
 SMApp$Web_GeneratedPrintf.p$9=function($1)
 {
  return $1.$==1?"Relation "+SMApp$Web_GeneratedPrintf.p$10($1.$0):"Subject "+Utils.prettyPrint($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$11=function($1)
 {
  return"Verb "+Utils.prettyPrint($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$8=function($1)
 {
  return"Relation ("+SMApp$Web_GeneratedPrintf.p$9($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$11($1.$2)+")";
 };
 SMApp$Web_GeneratedPrintf.p$14=function($1)
 {
  return $1.$==1?"Relation "+SMApp$Web_GeneratedPrintf.p$10($1.$0):"Object "+Utils.prettyPrint($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$13=function($1)
 {
  return"Relation ("+SMApp$Web_GeneratedPrintf.p$11($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$14($1.$2)+")";
 };
 SMApp$Web_GeneratedPrintf.p$12=function($1)
 {
  return $1==null?"null":"Some "+SMApp$Web_GeneratedPrintf.p$13($1.$0);
 };
 SMApp$Web_GeneratedPrintf.p$7=function($1)
 {
  return"Triple ("+SMApp$Web_GeneratedPrintf.p$8($1.$0)+", "+SMApp$Web_GeneratedPrintf.p$12($1.$1)+")";
 };
 SMApp$Web_GeneratedPrintf.p$15=function($1)
 {
  return"Utterance ("+Utils.prettyPrint($1.$0)+", "+SMApp$Web_GeneratedPrintf.p($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$3($1.$2)+", "+SMApp$Web_GeneratedPrintf.p$5($1.$3)+")";
 };
}());
