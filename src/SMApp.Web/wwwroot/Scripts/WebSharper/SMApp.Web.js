(function()
{
 "use strict";
 var Global,SMApp,Web,ClientExtensions,_Html,htmModule,SC$1,TypingDNA,SaveResponse,UserResponse,VerifyResponse,Bs,NLU,Babelfy,ApiResponse,TokenFragment,CharFragment,Witai,Utterance,Intent,Entity,Trait,_Utterance,_Value,QnAMaker,ITSQuestion,ITSAnswerContext,ITSAnswer,ITSAnswers,NLG,SC$2,NLU$1,Intent$1,Trait$1,Entity$1,Utterance$1,Voice,_Entity,Text,_Utterance$1,_Intent,_Entity$1,_Trait,Domain,SC$3,CUI,MicState,ClientState,Interpreter,CUI$1,Question,QuestionType,Dialogue,DialogueModule,User,SC$4,Main,SC$5,Client,SC$6,SMApp$Web_GeneratedPrintf,GeneratedPrintf,IntelliFactory,Runtime,WebSharper,UI,Doc,AttrProxy,Client$1,Templates,Arrays,Utils,console,$,Strings,List,Seq,AttrModule,Concurrency,JSON,Random,Collections,Map,JavaScript,Pervasives,SDK,Remoting,AjaxRemotingProvider,Wit,document,Unchecked,Dictionary;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 _Html=Web._Html=Web._Html||{};
 htmModule=Web.htmModule=Web.htmModule||{};
 SC$1=Global.StartupCode$SMApp_Web$ClientExtensions=Global.StartupCode$SMApp_Web$ClientExtensions||{};
 TypingDNA=Web.TypingDNA=Web.TypingDNA||{};
 SaveResponse=TypingDNA.SaveResponse=TypingDNA.SaveResponse||{};
 UserResponse=TypingDNA.UserResponse=TypingDNA.UserResponse||{};
 VerifyResponse=TypingDNA.VerifyResponse=TypingDNA.VerifyResponse||{};
 Bs=Web.Bs=Web.Bs||{};
 NLU=SMApp.NLU=SMApp.NLU||{};
 Babelfy=NLU.Babelfy=NLU.Babelfy||{};
 ApiResponse=Babelfy.ApiResponse=Babelfy.ApiResponse||{};
 TokenFragment=Babelfy.TokenFragment=Babelfy.TokenFragment||{};
 CharFragment=Babelfy.CharFragment=Babelfy.CharFragment||{};
 Witai=NLU.Witai=NLU.Witai||{};
 Utterance=Witai.Utterance=Witai.Utterance||{};
 Intent=Witai.Intent=Witai.Intent||{};
 Entity=Witai.Entity=Witai.Entity||{};
 Trait=Witai.Trait=Witai.Trait||{};
 _Utterance=Witai["Utterance'"]=Witai["Utterance'"]||{};
 _Value=Witai["Value'"]=Witai["Value'"]||{};
 QnAMaker=NLU.QnAMaker=NLU.QnAMaker||{};
 ITSQuestion=QnAMaker.ITSQuestion=QnAMaker.ITSQuestion||{};
 ITSAnswerContext=QnAMaker.ITSAnswerContext=QnAMaker.ITSAnswerContext||{};
 ITSAnswer=QnAMaker.ITSAnswer=QnAMaker.ITSAnswer||{};
 ITSAnswers=QnAMaker.ITSAnswers=QnAMaker.ITSAnswers||{};
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
 CUI=Web.CUI=Web.CUI||{};
 MicState=CUI.MicState=CUI.MicState||{};
 ClientState=CUI.ClientState=CUI.ClientState||{};
 Interpreter=CUI.Interpreter=CUI.Interpreter||{};
 CUI$1=CUI.CUI=CUI.CUI||{};
 Question=Web.Question=Web.Question||{};
 QuestionType=Web.QuestionType=Web.QuestionType||{};
 Dialogue=Web.Dialogue=Web.Dialogue||{};
 DialogueModule=Web.DialogueModule=Web.DialogueModule||{};
 User=Web.User=Web.User||{};
 SC$4=Global.StartupCode$SMApp_Web$User=Global.StartupCode$SMApp_Web$User||{};
 Main=Web.Main=Web.Main||{};
 SC$5=Global.StartupCode$SMApp_Web$Main=Global.StartupCode$SMApp_Web$Main||{};
 Client=Web.Client=Web.Client||{};
 SC$6=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf||{};
 GeneratedPrintf=Global.GeneratedPrintf=Global.GeneratedPrintf||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 Client$1=UI&&UI.Client;
 Templates=Client$1&&Client$1.Templates;
 Arrays=WebSharper&&WebSharper.Arrays;
 Utils=WebSharper&&WebSharper.Utils;
 console=Global.console;
 $=Global.jQuery;
 Strings=WebSharper&&WebSharper.Strings;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 AttrModule=UI&&UI.AttrModule;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 JSON=Global.JSON;
 Random=WebSharper&&WebSharper.Random;
 Collections=WebSharper&&WebSharper.Collections;
 Map=Collections&&Collections.Map;
 JavaScript=WebSharper&&WebSharper.JavaScript;
 Pervasives=JavaScript&&JavaScript.Pervasives;
 SDK=Global.SDK;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Wit=Global.Wit;
 document=Global.document;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Dictionary=Collections&&Collections.Dictionary;
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
 ClientExtensions.questionBox=function(title,text,width,height,action)
 {
  var r,r$1;
  (r=Global.Sweetalert2((r$1={},r$1.titleText=title,r$1.text=text,r$1.type="question",r$1.width=Global.String(width),r$1.html=(((Runtime.Curried3(function($1,$2,$3)
  {
   return $1("<div style=\"width:"+Global.String($2)+"px;height:"+Global.String($3)+"px\"></div>");
  }))(Global.id))(width))(height),r$1.input="text",r$1.confirmButtonText="Ok",r$1)),r).then(action);
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
 ClientExtensions.termOutput=function()
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
 TypingDNA.getSameTextTypingPattern=function(text,dna)
 {
  var r;
  return dna.getTypingPattern((r={
   type:1
  },r.text=text,r.caseSensitive=true,r));
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
 ApiResponse.New=function(tokenFragment,charFragment,babelSynsetID,DBpediaURL,BabelNetURL,score,cohrenceScore,globalScore,source)
 {
  return{
   tokenFragment:tokenFragment,
   charFragment:charFragment,
   babelSynsetID:babelSynsetID,
   DBpediaURL:DBpediaURL,
   BabelNetURL:BabelNetURL,
   score:score,
   cohrenceScore:cohrenceScore,
   globalScore:globalScore,
   source:source
  };
 };
 TokenFragment.New=function(start,end)
 {
  return{
   start:start,
   end:end
  };
 };
 CharFragment.New=function(start,end)
 {
  return{
   start:start,
   end:end
  };
 };
 Babelfy.disambiguate=function(text)
 {
  function a(ok,ko)
  {
   var r;
   $.ajax((r={},r.url=(function($1)
   {
    return function($2)
    {
     return $1("https://babelfy.io/v1/disambiguate?text="+Utils.toSafe($2)+"&lang=EN&extAIDA=true&key=983fc0ec-a6fa-49ef-bd02-203c18aef272");
    };
   }(Global.id))(text),r.type="GET",r.success=function(result)
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
 ITSQuestion.New=function(question)
 {
  return{
   question:question
  };
 };
 ITSAnswerContext.New=function(isContextOnly,prompts)
 {
  return{
   isContextOnly:isContextOnly,
   prompts:prompts
  };
 };
 ITSAnswer.New=function(questions,answer,score,id,source,metadata,context)
 {
  return{
   questions:questions,
   answer:answer,
   score:score,
   id:id,
   source:source,
   metadata:metadata,
   context:context
  };
 };
 ITSAnswers.New=function(answers)
 {
  return{
   answers:answers
  };
 };
 QnAMaker.getAnswer=function(q)
 {
  function a(ok,ko)
  {
   var r;
   $.ajax((r={},r.url="https://lerna.azurewebsites.net/qnamaker/knowledgebases/13a6a026-942b-4612-a8cb-654086ec76ee/generateAnswer",r.type="POST",r.beforeSend=function(xhr)
   {
    return xhr.setRequestHeader("Authorization","EndpointKey e5a55563-b1b0-4343-8796-bda5a0509385");
   },r.contentType="application/json",r.dataType="json",r.data=JSON.stringify(ITSQuestion.New(q)),r.success=function(result)
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
 Text.QuickNumber=function(a)
 {
  var $1,a$1,a$2;
  return(a$1=Text.One(a),a$1!=null&&a$1.$==1?($1=a$1.$0,true):(a$2=Text.Two(a),a$2!=null&&a$2.$==1&&($1=a$2.$0,true)))?{
   $:1,
   $0:$1
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
 NLU$1.Str=function(a)
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
  MonitorTypingPattern:function(input)
  {
   this.TypingDNA.reset();
   input!=null?this.TypingDNA.addTarget(input.$0):void 0;
   this.TypingDNA.start();
  },
  GetSameTextTypingPattern:function(text,el)
  {
   var r,r$1;
   return this.TypingDNA.getTypingPattern(el==null?(r={
    type:1
   },r.text=text,r.caseSensitive=false,r):(r$1={
    type:1
   },r$1.text=text,r$1.caseSensitive=false,r$1.targetId=el.$0,r$1));
  },
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
   a=ClientExtensions.termOutput();
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
 CUI$1.New=function(Voice$1,Mic,Term,Avatar,Caption,TypingDNA$1,AudioEnd)
 {
  return new CUI$1({
   Voice:Voice$1,
   Mic:Mic,
   Term:Term,
   Avatar:Avatar,
   Caption:Caption,
   TypingDNA:TypingDNA$1,
   AudioEnd:AudioEnd
  });
 };
 Question=Web.Question=Runtime.Class({
  toString:function()
  {
   return(((((Runtime.Curried(function($1,$2,$3,$4,$5)
   {
    return $1("Name: "+Utils.toSafe($2)+" Text: "+Utils.toSafe($3)+" Type: "+SMApp$Web_GeneratedPrintf.p$8($4)+" Module: "+Utils.toSafe($5));
   },5))(Global.id))(this.get_Name()))(this.get_Text()))(this.get_Type()))(this.get_Module());
  },
  get_Module:function()
  {
   return this.$3;
  },
  get_Type:function()
  {
   return this.$2;
  },
  get_Text:function()
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
 DialogueModule["Response'_"]=function(d,n,a)
 {
  var $1,a$1,v;
  return(a$1=DialogueModule.PropNotSet_(d,"user",a),a$1!=null&&a$1.$==1&&(d.get_DialogueQuestions().length>0&&(d.get_DialogueQuestions())[0].get_Name()===n&&($1=a$1.$0,true)))?DialogueModule.have(d,n)?(v=d.get_Props().get_Item(n),(DialogueModule["delete"](d,n),{
   $:1,
   $0:[$1,{
    $:1,
    $0:v
   }]
  })):{
   $:1,
   $0:[$1,null]
  }:null;
 };
 DialogueModule.Response_=function(d,n,a)
 {
  var $1,a$1,v;
  return(a$1=DialogueModule.PropSet_(d,"user",a),a$1!=null&&a$1.$==1&&(d.get_DialogueQuestions().length>0&&(d.get_DialogueQuestions())[0].get_Name()===n&&($1=a$1.$0,true)))?DialogueModule.have(d,n)?(v=d.get_Props().get_Item(n),(DialogueModule["delete"](d,n),{
   $:1,
   $0:[$1,{
    $:1,
    $0:v
   }]
  })):{
   $:1,
   $0:[$1,null]
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
 DialogueModule.Agenda_=function(d,n,a)
 {
  return d.get_DialogueQuestions().length>0&&(d.get_DialogueQuestions())[0].get_Module()===n?{
   $:1,
   $0:null
  }:null;
 };
 DialogueModule.didNotUnderstand=function(d,debug,name)
 {
  var q;
  debug((function($1)
  {
   return function($2)
   {
    return $1(Utils.toSafe($2)+" interpreter did not understand utterance.");
   };
  }(Global.id))(name));
  DialogueModule.say(d,"Sorry I didn't understand what you meant.");
  d.get_DialogueQuestions().length>0?(q=Seq.nth(0,d.get_DialogueQuestions()),DialogueModule.have(d,q.get_Name())?DialogueModule.say(d,NLG.replace_tok("$0",d.get_Props().get_Item(q.get_Name()),q.get_Text())):DialogueModule.say(d,q.get_Text())):void 0;
 };
 DialogueModule.dispatch=function(d,debug,targetModule,target)
 {
  debug(((((Runtime.Curried(function($1,$2,$3,$4)
  {
   return $1("Dispatch to module "+Utils.toSafe($2)+" utterances: "+Utils.prettyPrint($3)+" questions: "+Utils.prettyPrint($4)+".");
  },4))(Global.id))(targetModule))(d.get_Utterances()))(d.get_DialogueQuestions()));
  target(d);
 };
 DialogueModule["handle'"]=function(d,debug,m,f)
 {
  DialogueModule.popt(d);
  debug((function($1)
  {
   return function($2)
   {
    return $1("Turn end: "+Utils.toSafe($2)+".");
   };
  }(Global.id))(m));
  f();
 };
 DialogueModule.handle=function(d,debug,m,f)
 {
  DialogueModule.popu(d);
  debug((function($1)
  {
   return function($2)
   {
    return $1("Handle: "+Utils.toSafe($2)+".");
   };
  }(Global.id))(m));
  f();
 };
 DialogueModule.ask=function(d,debug,target,question)
 {
  var m,f,c;
  DialogueModule.pushq(d,question);
  m=question.get_Type();
  m.$==0?(f=m.$0,d.get_Cui().TypingDNA.reset(),ClientExtensions.questionBox("Biometric Authentication","",640,480,function()
  {
   var pattern,el;
   pattern=d.get_Cui().GetSameTextTypingPattern("Hello my name is John Brown and I am an administrator",null);
   debug("Text pattern: "+pattern);
   el=Arrays.get($(".swal2-content").get(),0).firstChild.firstChild;
   (f(pattern))(el);
  }),Arrays.get($(".swal2-input").get(),0).setAttribute("id","auth-input"),d.get_Cui().MonitorTypingPattern(null),c=ClientExtensions.createCanvas("camera","640","480",Arrays.get($(".swal2-content").get(),0).firstChild),ClientExtensions.startCamera(self.document.body,c)):void 0;
 };
 DialogueModule.popt=function(d)
 {
  DialogueModule.popu(d);
  DialogueModule.popq(d);
 };
 DialogueModule.popq=function(d)
 {
  d.get_DialogueQuestions().shift();
 };
 DialogueModule.pushq=function(d,q)
 {
  d.get_DialogueQuestions().unshift(q);
 };
 DialogueModule.popu=function(d)
 {
  d.get_Utterances().shift();
 };
 DialogueModule.pushu=function(d,m)
 {
  d.get_Utterances().unshift(m);
 };
 DialogueModule.prop=function(d,k)
 {
  return d.get_Props().get_Item(k);
 };
 DialogueModule["delete"]=function(d,k)
 {
  d.get_Props().Remove(k);
 };
 DialogueModule.add=function(d,k,v)
 {
  d.get_Props().Add(k,v);
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
 User.update=function(d)
 {
  var utterances,props,dialogueQuestions,cui,ask,handle,m,$1,a,a$1,a$2,$2,a$3,a$4,a$5,$3,a$6,a$7,$4,a$8,a$9,a$10,b,$5,a$11,a$12,a$13,$6,a$14,a$15,a$16,$7,a$17,$8,a$18,$9,a$19,$10,b$1,$11,a$20,a$21,a$22,b$2,$12,a$23,$13,$14,a$24,a$25,$15;
  function echo(t)
  {
   DialogueModule.echo(d,t);
  }
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
   return DialogueModule.add(d,k,v);
  }
  function prop(k)
  {
   return DialogueModule.prop(d,k);
  }
  function user()
  {
   return prop("user");
  }
  function d$1(m$1)
  {
   User.debug(m$1);
  }
  function d$2(m$1)
  {
   User.debug(m$1);
  }
  function User$1(a$26)
  {
   return DialogueModule.User_(d,a$26);
  }
  function _User(a$26)
  {
   return DialogueModule["User'_"](d,a$26);
  }
  function Response(n,a$26)
  {
   return DialogueModule.Response_(d,n,a$26);
  }
  function authenticateUserQuestion(u)
  {
   return new Question({
    $:0,
    $0:"authenticateUser",
    $1:"",
    $2:{
     $:0,
     $0:function(p)
     {
      return function()
      {
       var b$3;
       return p==null?cui.Say("Sorry I could not authenticate your pass phrase."):Concurrency.Start((b$3=null,Concurrency.Delay(function()
       {
        return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.verifyUserTypingPattern:-697060909",["john",u]),function(a$26)
        {
         User.debug((function($16)
         {
          return function($17)
          {
           return $16("TypingDNA: "+SMApp$Web_GeneratedPrintf.p$9($17));
          };
         }(Global.id))(a$26));
         return a$26.$==1?(ClientExtensions.error(a$26.$0),Concurrency.Zero()):a$26.$0.confidence>50?(cui.Say("You are now authenticated."),Concurrency.Zero()):(cui.Say("Sorry I could not authenticate your passphrase."),Concurrency.Zero());
        });
       })),null);
      };
     }
    },
    $3:User.name()
   });
  }
  function addUserQuestion(u)
  {
   return new Question({
    $:0,
    $0:"addUser",
    $1:(function($16)
    {
     return function($17)
     {
      return $16("Do you want me to add the user "+Utils.toSafe($17)+"?");
     };
    }(Global.id))(u),
    $2:QuestionType.Verification,
    $3:User.name()
   });
  }
  function switchUserQuestion(u)
  {
   return new Question({
    $:0,
    $0:"switchUser",
    $1:(function($16)
    {
     return function($17)
     {
      return $16("Do you want me to switch to the user "+Utils.toSafe($17));
     };
    }(Global.id))(u),
    $2:QuestionType.Verification,
    $3:User.name()
   });
  }
  function loginUser(u)
  {
   var b$3;
   sayRandom(NLG.waitRetrievePhrases(),"user name");
   Concurrency.Start((b$3=null,Concurrency.Delay(function()
   {
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getUser:1952335863",[u]),function(a$26)
    {
     var user$1;
     return a$26==null?(say((function($16)
     {
      return function($17)
      {
       return $16("I did not find a user with the name "+Utils.toSafe($17)+".");
      };
     }(Global.id))(u)),(ask(function(d$4)
     {
      User.update(d$4);
     }))(addUserQuestion(u)),Concurrency.Zero()):(user$1=a$26.$0,Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.updateUserLastLogin:-1518036560",[user$1.Name]),function()
     {
      add("user",user$1);
      sayRandom(NLG.helloUserPhrases(),(function($16)
      {
       return function($17)
       {
        return $16(Utils.prettyPrint($17));
       };
      }(Global.id))(props.get_Item("user")));
      return user$1.LastLoggedIn!=null?Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.humanize:296374240",[user$1.LastLoggedIn.$0]),function(a$27)
      {
       say((function($16)
       {
        return function($17)
        {
         return $16("You last logged in "+Utils.toSafe($17)+".");
        };
       }(Global.id))(a$27));
       say("Since you will be accessing sensitive data I need to authenticate you via facial recognition and typing behaviour. Enter the pass phrase you were assigned during enrollment in the box provided. Then, look into your camera until you see the red box around your face and press the Ok button.");
       (ask(function(d$4)
       {
        User.update(d$4);
       }))(authenticateUserQuestion(u));
       return Concurrency.Zero();
      }):Concurrency.Zero();
     }));
    });
   })),null);
  }
  function addUser(u,tp)
  {
   var b$3;
   return Concurrency.Start((b$3=null,Concurrency.Delay(function()
   {
    sayRandom(NLG.waitAddPhrases(),"user");
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.addUser:-1518036560",[u]),function(a$26)
    {
     return a$26.$==1?(say((function($16)
     {
      return function($17)
      {
       return $16("Sorry I was not able to add the user "+Utils.toSafe($17)+" to the system.");
      };
     }(Global.id))(u)),Concurrency.Zero()):Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.addUserTypingPattern:2129763137",[u,tp]),function(a$27)
     {
      return a$27.$==1?(say((function($16)
      {
       return function($17)
       {
        return $16("Sorry I was not able to add the user "+Utils.toSafe($17)+" to the system.");
       };
      }(Global.id))(u)),Concurrency.Zero()):(add("user",u),say((function($16)
      {
       return function($17)
       {
        return $16("Hello "+Utils.prettyPrint($17)+", nice to meet you.");
       };
      }(Global.id))(props.get_Item("user"))),Concurrency.Zero());
     });
    });
   })),null);
  }
  function addSymptom(s,l,m$1)
  {
   var b$3;
   return Concurrency.Start((b$3=null,Concurrency.Delay(function()
   {
    sayRandom(NLG.waitAddPhrases(),"symptom entry");
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.addSymptomJournalEntry:1931294837",[user().Name,s,l,m$1]),function(a$26)
    {
     return a$26.$==1?(say(function($16)
     {
      return $16("Sorry I wasn't able to add that symptom to your journal. Could you try again?");
     }(Global.id)),Concurrency.Zero()):(say((function($16)
     {
      return function($17)
      {
       return $16("OK I added that "+Utils.toSafe($17)+" symptom to your journal.");
      };
     }(Global.id))(s)),Concurrency.Zero());
    });
   })),null);
  }
  function d$3(m$1)
  {
   User.debug(m$1);
  }
  utterances=d.$4;
  props=d.$1;
  dialogueQuestions=d.$2;
  cui=d.$0;
  ask=Runtime.Curried(DialogueModule.ask,2,[d,d$1]);
  handle=Runtime.Curried(DialogueModule.handle,2,[d,d$2]);
  User.debug((((Runtime.Curried3(function($16,$17,$18)
  {
   return $16("Starting utterances:"+Utils.prettyPrint($17)+". Starting questions: "+Utils.prettyPrint($18)+".");
  }))(Global.id))(utterances))(dialogueQuestions));
  m=List.ofSeq(Seq.take(utterances.length>=5?5:utterances.length,utterances));
  m.$==1&&(a=_User(m.$0),a!=null&&a.$==1&&(a$1=NLU$1.Intent$1("greet",a.$0),a$1!=null&&a$1.$==1&&(a$2=NLU$1.Entity1Of1("name",a$1.$0[1]),a$2!=null&&a$2.$==1&&(m.$1.$==0&&($1=a$2.$0,true)))))?(handle("loginUser"))(function()
  {
   loginUser($1.get_Value());
  }):m.$==1&&(a$3=_User(m.$0),a$3!=null&&a$3.$==1&&(a$4=NLU$1.Intent$1("hello",a$3.$0),a$4!=null&&a$4.$==1&&(a$5=NLU$1.Entity1Of1("contact",a$4.$0[1]),a$5!=null&&a$5.$==1&&(m.$1.$==0&&($2=a$5.$0,true)))))?(handle("loginUser"))(function()
  {
   loginUser($2.get_Value());
  }):m.$==1&&(a$6=DialogueModule["Response'_"](d,"inputPassPhrase",m.$0),a$6!=null&&a$6.$==1&&(a$7=NLU$1.Str(a$6.$0[1]),a$7!=null&&a$7.$==1&&(m.$1.$==0&&($3=a$7.$0,true))))?((Runtime.Curried(DialogueModule["handle'"],2,[d,d$3]))("addUser"))(function()
  {
   cui.TypingDNA.stop();
   addUser($3,cui.GetSameTextTypingPattern($3,null));
  }):m.$==1&&(a$8=User$1(m.$0),a$8!=null&&a$8.$==1&&(a$9=NLU$1.Intent$1("hello",a$8.$0),a$9!=null&&a$9.$==1&&(a$9.$0[0]==null&&(a$10=NLU$1.Entity1Of1("name",a$9.$0[1]),a$10!=null&&a$10.$==1&&(m.$1.$==0&&($4=a$10.$0,true))))))?Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getUser:1952335863",[$4.get_Value()]),function(a$26)
   {
    return a$26==null?(say((function($16)
    {
     return function($17)
     {
      return $16("Sorry, the user "+Utils.toSafe($17)+" does not exist.");
     };
    }(Global.id))($4.get_Value())),Concurrency.Zero()):((ask(function(d$4)
    {
     User.update(d$4);
    }))(switchUserQuestion(a$26.$0.Name)),Concurrency.Zero());
   });
  })),null):m.$==1&&(a$11=NLU$1.Yes(m.$0),a$11!=null&&a$11.$==1&&(a$12=Response("switchUser",a$11.$0),a$12!=null&&a$12.$==1&&(a$13=NLU$1.Str(a$12.$0[1]),a$13!=null&&a$13.$==1&&(m.$1.$==0&&($5=a$13.$0,true)))))?(props.set_Item("user",$5),say((function($16)
  {
   return function($17)
   {
    return $16("Ok I switched to user "+Utils.prettyPrint($17)+".");
   };
  }(Global.id))($5))):m.$==1&&(a$14=NLU$1.No(m.$0),a$14!=null&&a$14.$==1&&(a$15=Response("switchUser",a$14.$0),a$15!=null&&a$15.$==1&&(a$16=NLU$1.Str(a$15.$0[1]),a$16!=null&&a$16.$==1&&(m.$1.$==0&&($6=a$16.$0,true)))))?say((function($16)
  {
   return function($17)
   {
    return $16("Ok I did not switch to user "+Utils.toSafe($17)+".");
   };
  }(Global.id))($6)):m.$==1&&(a$17=_User(m.$0),a$17!=null&&a$17.$==1?($8=NLU$1.Intent$1("kbquery",a$17.$0),$8!=null&&$8.$==1)?m.$1.$==0&&($7=a$17.$0,true):(a$18=User$1(m.$0),a$18!=null&&a$18.$==1&&(($9=NLU$1.Intent$1("kbquery",a$18.$0),$9!=null&&$9.$==1)&&(m.$1.$==0&&($7=a$18.$0,true)))):(a$19=User$1(m.$0),a$19!=null&&a$19.$==1&&(($10=NLU$1.Intent$1("kbquery",a$19.$0),$10!=null&&$10.$==1)&&(m.$1.$==0&&($7=a$19.$0,true)))))?Concurrency.Start((b$1=null,Concurrency.Delay(function()
  {
   return Concurrency.Bind(QnAMaker.getAnswer($7.get_Text()),function(a$26)
   {
    var s;
    return Concurrency.Bind((s=Arrays.get(a$26.answers,0).answer,(new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.mdtohtml:1581252605",[s])),function(a$27)
    {
     var s$1;
     return Concurrency.Bind((s$1=Arrays.get(a$26.answers,0).answer,(new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.mdtotext:1581252605",[s$1])),function(a$28)
     {
      echo(a$27);
      say(a$28);
      return Concurrency.Zero();
     });
    });
   });
  })),null):m.$==1&&(a$20=User$1(m.$0),a$20!=null&&a$20.$==1&&(a$21=NLU$1.Intent$1("symptom",a$20.$0),a$21!=null&&a$21.$==1&&(a$22=NLU$1.Entity1OfAny("symptom_name",a$21.$0[1]),a$22!=null&&a$22.$==1&&(m.$1.$==0&&($11=a$22.$0,true)))))?Concurrency.Start((b$2=null,Concurrency.Delay(function()
  {
   say("Ok I'll add that entry to your symptom journal");
   addSymptom($11.get_Value(),null,null);
   return Concurrency.Zero();
  })),null):m.$==1&&(a$23=NLU$1.Yes(m.$0),a$23!=null&&a$23.$==1&&(($13=Response("painVideo",a$23.$0),$13!=null&&$13.$==1)&&m.$1.$==0))?cui["EchoHtml'"]("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/SkAqOditKN0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"):m.$==1&&(a$24=User$1(m.$0),a$24!=null&&a$24.$==1&&(a$25=NLU$1.Intent$1("medjournal",a$24.$0),a$25!=null&&a$25.$==1&&(($15=a$25.$0[1],$15!=null&&$15.$==1)&&(m.$1.$==0&&($14=a$25.$0[1].$0,true)))))?(say("ok I added that entry to your medication journal."),say("You should be careful not to take too many painkillers over a short period of time.")):DialogueModule.didNotUnderstand(d,function(m$1)
  {
   User.debug(m$1);
  },User.name());
  User.debug((((Runtime.Curried3(function($16,$17,$18)
  {
   return $16("Ending utterances: "+Utils.prettyPrint($17)+". Ending questions:"+Utils.prettyPrint($18)+".");
  }))(Global.id))(utterances))(dialogueQuestions));
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
 Main.update=function(d)
 {
  var utterances,dialogueQuestions,dispatch,handle,m,a,$1,a$1,a$2,a$3,a$4,$2,a$5,a$6,$3,a$7,a$8,$4,$5,a$9,a$10,$6;
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
  dialogueQuestions=d.$2;
  Main.debug((((Runtime.Curried3(function($7,$8,$9)
  {
   return $7("Starting utterances:"+Utils.prettyPrint($8)+". Starting questions: "+Utils.prettyPrint($9)+".");
  }))(Global.id))(utterances))(dialogueQuestions));
  dispatch=Runtime.Curried(DialogueModule.dispatch,2,[d,d$1]);
  handle=Runtime.Curried(DialogueModule.handle,2,[d,d$2]);
  m=List.ofSeq(Seq.take(utterances.length>=5?5:utterances.length,utterances));
  a=DialogueModule.Agenda_(d,User.name(),m);
  a!=null&&a.$==1?User.update(d):m.$==1&&(a$1=(a$2=DialogueModule.PropNotSet_(d,"started",m.$0),a$2!=null&&a$2.$==1?{
   $:1,
   $0:a$2.$0
  }:null),a$1!=null&&a$1.$==1&&(a$3=_User(a$1.$0),a$3!=null&&a$3.$==1&&(a$4=NLU$1.Intent$1("greet",a$3.$0),a$4!=null&&a$4.$==1&&(a$4.$0[1]==null&&m.$1.$==0))))?(DialogueModule.add(d,"started",true),(handle("Hello"))(function()
  {
   _sayRandom(NLG.helloPhrases());
  })):m.$==1&&(a$5=_User(m.$0),a$5!=null&&a$5.$==1&&(a$6=NLU$1.Intent$1("greet",a$5.$0),a$6!=null&&a$6.$==1&&(a$6.$0[1]==null&&m.$1.$==0)))?(handle("Hello"))(function()
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
  Main.debug((((Runtime.Curried3(function($7,$8,$9)
  {
   return $7("Ending utterances: "+Utils.prettyPrint($8)+". Ending questions:"+Utils.prettyPrint($9)+".");
  }))(Global.id))(utterances))(dialogueQuestions));
 };
 Main.debug=function(m)
 {
  ClientExtensions.debug(Main.name(),m);
 };
 Main.name=function()
 {
  SC$5.$cctor();
  return SC$5.name;
 };
 SC$5.$cctor=function()
 {
  SC$5.$cctor=Global.ignore;
  SC$5.name="Main";
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
  SC$6.$cctor();
  return SC$6.Main;
 };
 Client.initMic=function(interpret)
 {
  var M,mic;
  Client.set_CUI((M={
   $:1,
   $0:new Wit.Microphone(document.getElementById("microphone"))
  },CUI$1.New(Client.CUI().Voice,M,Client.CUI().Term,Client.CUI().Avatar,Client.CUI().Caption,Client.CUI().TypingDNA,Client.CUI().AudioEnd)));
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
   Client.set_MicState(MicState.MicAudioEnd);
   Client.debug("Mic audio end.");
   return Client.debug(self.lastMicData);
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
   return Client.ClientState().$==2?Client.echo("I'm still trying to understand what you said before."):Client.ClientState().$==0?ClientExtensions.error("Client is not intialized."):!(i==null||e==null)?(Client.set_MicState({
    $:7,
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
     },Client.CUI().Mic,Client.CUI().Term,Client.CUI().Avatar,Client.CUI().Caption,Client.CUI().TypingDNA,Client.CUI().AudioEnd));
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
  SC$6.$cctor();
  return SC$6.synth;
 };
 Client.push=function(m)
 {
  Client.Utterances().unshift(m);
  return Client.Dialogue();
 };
 Client.Dialogue=function()
 {
  SC$6.$cctor();
  return SC$6.Dialogue;
 };
 Client.Utterances=function()
 {
  SC$6.$cctor();
  return SC$6.Utterances;
 };
 Client.Questions=function()
 {
  SC$6.$cctor();
  return SC$6.Questions;
 };
 Client.Output=function()
 {
  SC$6.$cctor();
  return SC$6.Output;
 };
 Client.Props=function()
 {
  SC$6.$cctor();
  return SC$6.Props;
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
  SC$6.$cctor();
  return SC$6.ClientState;
 };
 Client.set_ClientState=function($1)
 {
  SC$6.$cctor();
  SC$6.ClientState=$1;
 };
 Client.MicState=function()
 {
  SC$6.$cctor();
  return SC$6.MicState;
 };
 Client.set_MicState=function($1)
 {
  SC$6.$cctor();
  SC$6.MicState=$1;
 };
 Client.CUI=function()
 {
  SC$6.$cctor();
  return SC$6.CUI;
 };
 Client.set_CUI=function($1)
 {
  SC$6.$cctor();
  SC$6.CUI=$1;
 };
 SC$6.$cctor=function()
 {
  var sdk,web,dna,r;
  SC$6.$cctor=Global.ignore;
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
   var $1,$2,$3,voices,$4,a,a$1,a$2,a$3,a$4,b;
   Client.set_CUI(CUI$1.New(Client.CUI().Voice,Client.CUI().Mic,term,Client.CUI().Avatar,Client.CUI().Caption,Client.CUI().TypingDNA,Client.CUI().AudioEnd));
   Unchecked.Equals(Client.CUI().Mic,null)?Client.initMic(_main):void 0;
   Unchecked.Equals(Client.CUI().Voice,null)?Client.initSpeech():void 0;
   Client.ClientState().$===0?Client.set_ClientState(ClientState.ClientReady):void 0;
   return($1=Text.Blank(command),$1!=null&&$1.$==1)?Client["say'"]("Tell me what you want me to do or ask me a question."):($2=Text.Debug(command),$2!=null&&$2.$==1)?(Client.debug((function($5)
   {
    return function($6)
    {
     return $5("Utterances: "+Utils.prettyPrint($6));
    };
   }(Global.id))(Client.Utterances())),Client.debug((function($5)
   {
    return function($6)
    {
     return $5("Questions: "+Utils.prettyPrint($6));
    };
   }(Global.id))(Client.Questions()))):($3=Text.Voices(command),$3!=null&&$3.$==1)?(voices=ClientExtensions.toArray(ClientExtensions.speechSynthesis().getVoices()),(Client["say'"]((function($5)
   {
    return function($6)
    {
     return $5("There are currently "+Global.String($6)+" voices installed on this computer or device.");
    };
   }(Global.id))(Arrays.length(voices))),Arrays.iteri(function(i,v)
   {
    return Client["say'"](((((Runtime.Curried(function($5,$6,$7,$8)
    {
     return $5("Voice "+Global.String($6)+". Name: "+Utils.toSafe($7)+", Local: "+Utils.prettyPrint($8)+".");
    },4))(Global.id))(i))(v.name))(v.localService));
   },voices))):Client.ClientState().$==1?(a=Text.QuickHello(command),a!=null&&a.$==1?($4=a.$0,true):(a$1=Text.QuickHelp(command),a$1!=null&&a$1.$==1?($4=a$1.$0,true):(a$2=Text.QuickYes(command),a$2!=null&&a$2.$==1?($4=a$2.$0,true):(a$3=Text.QuickNo(command),a$3!=null&&a$3.$==1?($4=a$3.$0,true):(a$4=Text.QuickNumber(command),a$4!=null&&a$4.$==1&&($4=a$4.$0,true))))))?(Client.debug((function($5)
   {
    return function($6)
    {
     return $5("Quick Text: "+SMApp$Web_GeneratedPrintf.p$7($6)+".");
    };
   }(Global.id))($4)),Main.update(Client.push($4)),Client.set_ClientState(ClientState.ClientReady)):Client.CUI().Wait((b=null,Concurrency.Delay(function()
   {
    Client.set_ClientState(ClientState.ClientUnderstand);
    Text.getUtterance(command,function(meaning)
    {
     var a$5,m;
     a$5=Text.HasUtterance(meaning);
     a$5!=null&&a$5.$==1?(m=a$5.$0,Client.debug(((((Runtime.Curried(function($5,$6,$7,$8)
     {
      return $5("Text: Intent: "+SMApp$Web_GeneratedPrintf.p($6)+", Traits: "+SMApp$Web_GeneratedPrintf.p$3($7)+", Entities: "+SMApp$Web_GeneratedPrintf.p$5($8)+".");
     },4))(Global.id))(m.get_Intent()))(m.get_Traits()))(m.get_Entities())),Main.update(Client.push(m))):(Client.debug("Text: Did not receive a meaning from the server."),Client["say'"]("Sorry I did not understand what you said."));
    });
    Client.set_ClientState(ClientState.ClientReady);
    return Concurrency.Zero();
   }))):Client.ClientState().$==0?ClientExtensions.error("Client is not initialized."):Client["say'"]("I'm still trying to understand what you said before.");
  }
  SC$6.CUI=CUI$1.New(null,null,null,(SDK.applicationId="4277115329081938617",sdk=new Global.SDKConnection(),web=new Global.WebAvatar(),web.version=8.5,web.connection=sdk,web.avatar="20926186",web.voice="cmu-slt",web.voiceMod="default",web.width=175,web.createBox(),web.addMessage(""),web.processMessages(0),web),false,(dna=new Global.TypingDNA(),(dna.stop(),dna)),[]);
  SC$6.MicState=MicState.MicNotInitialized;
  SC$6.ClientState=ClientState.ClientNotInitialzed;
  SC$6.Props=new Dictionary.New$5();
  SC$6.Output=[];
  SC$6.Questions=[];
  SC$6.Utterances=[];
  SC$6.Dialogue=new Dialogue({
   $:0,
   $0:Client.CUI(),
   $1:Client.Props(),
   $2:Client.Questions(),
   $3:Client.Output(),
   $4:Client.Utterances()
  });
  SC$6.synth=Global.speechSynthesis;
  SC$6.Main=new Interpreter({
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
 SMApp$Web_GeneratedPrintf.p$8=function($1)
 {
  return $1.$==3?"ConceptCompletion":$1.$==2?"Disjunctive":$1.$==1?"Verification":"UserAuthentication <fun>";
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
 SMApp$Web_GeneratedPrintf.p$9=function($1)
 {
  return $1.$==1?"Error "+Utils.prettyPrint($1.$0):"Ok "+GeneratedPrintf.p$2($1.$0);
 };
 GeneratedPrintf.p$2=function($1)
 {
  return"{"+("message = "+Utils.prettyPrint($1.message))+"; "+("message_code = "+Utils.prettyPrint($1.message_code))+"; "+("success = "+Utils.prettyPrint($1.success))+"; "+("result = "+Utils.prettyPrint($1.result))+"; "+("score = "+Utils.prettyPrint($1.score))+"; "+("confidence = "+Utils.prettyPrint($1.confidence))+"}";
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
 SMApp$Web_GeneratedPrintf.p$7=function($1)
 {
  return"Utterance ("+Utils.prettyPrint($1.$0)+", "+SMApp$Web_GeneratedPrintf.p($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$3($1.$2)+", "+SMApp$Web_GeneratedPrintf.p$5($1.$3)+")";
 };
}());
