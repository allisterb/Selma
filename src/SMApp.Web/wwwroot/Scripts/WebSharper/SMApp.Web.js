(function()
{
 "use strict";
 var Global,SMApp,Bootstrap,Controls,SC$1,Web,NLU,Intent,Trait,Voice,_Entity,Text,Meaning,Intent$1,Entity,SC$2,CUIModule,User,Interpreter,SC$3,ClientExtensions,_Html,htmModule,SC$4,Main,SC$5,Client,SC$6,WebSharper,UI,Doc,List,AttrModule,IntelliFactory,Runtime,Seq,Random,Arrays,$,console,Strings,Utils,Concurrency,Wit,document,Unchecked,Remoting,AjaxRemotingProvider;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Bootstrap=SMApp.Bootstrap=SMApp.Bootstrap||{};
 Controls=Bootstrap.Controls=Bootstrap.Controls||{};
 SC$1=Global.StartupCode$SMApp_Web$Bootstrap=Global.StartupCode$SMApp_Web$Bootstrap||{};
 Web=SMApp.Web=SMApp.Web||{};
 NLU=Web.NLU=Web.NLU||{};
 Intent=NLU.Intent=NLU.Intent||{};
 Trait=NLU.Trait=NLU.Trait||{};
 Voice=NLU.Voice=NLU.Voice||{};
 _Entity=Voice["Entity'"]=Voice["Entity'"]||{};
 Text=NLU.Text=NLU.Text||{};
 Meaning=Text.Meaning=Text.Meaning||{};
 Intent$1=Text.Intent=Text.Intent||{};
 Entity=Text.Entity=Text.Entity||{};
 SC$2=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
 CUIModule=Web.CUIModule=Web.CUIModule||{};
 User=CUIModule.User=CUIModule.User||{};
 Interpreter=CUIModule.Interpreter=CUIModule.Interpreter||{};
 SC$3=Global.StartupCode$SMApp_Web$CUI=Global.StartupCode$SMApp_Web$CUI||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 _Html=Web._Html=Web._Html||{};
 htmModule=Web.htmModule=Web.htmModule||{};
 SC$4=Global.StartupCode$SMApp_Web$ClientExtensions=Global.StartupCode$SMApp_Web$ClientExtensions||{};
 Main=Web.Main=Web.Main||{};
 SC$5=Global.StartupCode$SMApp_Web$Main=Global.StartupCode$SMApp_Web$Main||{};
 Client=Web.Client=Web.Client||{};
 SC$6=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 List=WebSharper&&WebSharper.List;
 AttrModule=UI&&UI.AttrModule;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Seq=WebSharper&&WebSharper.Seq;
 Random=WebSharper&&WebSharper.Random;
 Arrays=WebSharper&&WebSharper.Arrays;
 $=Global.jQuery;
 console=Global.console;
 Strings=WebSharper&&WebSharper.Strings;
 Utils=WebSharper&&WebSharper.Utils;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Wit=Global.Wit;
 document=Global.document;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Controls.Radio=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("radio"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.Radio(targetExtras,true,target),Doc.TextNode(lbl)])]);
 };
 Controls.Checkbox=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("checkbox"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.CheckBox(targetExtras,target),Doc.TextNode(lbl)])]);
 };
 Controls.TextArea=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.InputArea(new List.T({
   $:1,
   $0:(Controls.cls())("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Controls.InputPassword=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.PasswordBox(new List.T({
   $:1,
   $0:(Controls.cls())("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Controls.Input=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:(Controls.cls())("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.Input(new List.T({
   $:1,
   $0:(Controls.cls())("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Controls.Container=function(c)
 {
  return Doc.Element("div",[(Controls.cls())("container")],c);
 };
 Controls.Class=function()
 {
  SC$1.$cctor();
  return SC$1.Class;
 };
 Controls.cls=function()
 {
  SC$1.$cctor();
  return SC$1.cls;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.cls=AttrModule.Class;
  SC$1.Class=AttrModule.Class;
 };
 Intent.Onboard={
  $:2
 };
 Intent.Help={
  $:1
 };
 Intent.Hello={
  $:0
 };
 Trait.Greetings={
  $:0
 };
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
 Voice.Contact=function(a)
 {
  return!(a.contact==null)?{
   $:1,
   $0:{
    $:0,
    $0:_Entity.New(a.body,a.end,a.start,a.ff,a.value).value
   }
  }:null;
 };
 Voice.Greetings=function(a)
 {
  return!(a.greetings==null)&&!(a.greetings.value==null)?{
   $:1,
   $0:Trait.Greetings
  }:null;
 };
 Voice.Hello=function(a)
 {
  return typeof a=="string"&&a.toLowerCase()==="default_intent"?{
   $:1,
   $0:Intent.Hello
  }:null;
 };
 Meaning=Text.Meaning=Runtime.Class({
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
 Intent$1=Text.Intent=Runtime.Class({
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
 },null,Intent$1);
 Entity=Text.Entity=Runtime.Class({
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
 Text.HelloUser=function(a)
 {
  var $1,a$1;
  return(a$1=Text.Hello(a),a$1!=null&&a$1.$==1&&(a$1.$0.$==1&&(a$1.$0.$1.$==0&&(a$1.$0.$0.get_Role()==="contact"&&($1=a$1.$0.$0,true)))))?{
   $:1,
   $0:$1
  }:null;
 };
 Text.Hello=function(a)
 {
  var $1,a$1;
  return a!=null&&a.$==1&&(a$1=Text.Intent$1("Hello",a.$0),a$1!=null&&a$1.$==1&&($1=a$1.$0,true))?{
   $:1,
   $0:$1
  }:null;
 };
 Text.DebugOff=function(a)
 {
  return a==="debug off"?{
   $:1,
   $0:null
  }:null;
 };
 Text.DebugOn=function(a)
 {
  return a==="debug on"?{
   $:1,
   $0:null
  }:null;
 };
 Text.QuickHelp=function(a)
 {
  var $1;
  return a==="help"||(a==="help me"||(a==="what's this?"||a==="hugh"))?{
   $:1,
   $0:Intent.Help
  }:null;
 };
 Text.QuickHello=function(a)
 {
  var $1;
  return a==="hello"||(a==="hey"||(a==="yo"||a==="hi"))?{
   $:1,
   $0:Intent.Hello
  }:null;
 };
 Text.Intent$1=function(name,a)
 {
  return a.get_TopIntent().get_Name()===name&&a.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()?{
   $:1,
   $0:List.filter(function(e)
   {
    return e.get_Confidence()>Text.entityConfidenceThreshold();
   },a.get_Entities())
  }:null;
 };
 Text.entityConfidenceThreshold=function()
 {
  SC$2.$cctor();
  return SC$2.entityConfidenceThreshold;
 };
 Text.set_entityConfidenceThreshold=function($1)
 {
  SC$2.$cctor();
  SC$2.entityConfidenceThreshold=$1;
 };
 Text.intentConfidenceThreshold=function()
 {
  SC$2.$cctor();
  return SC$2.intentConfidenceThreshold;
 };
 Text.set_intentConfidenceThreshold=function($1)
 {
  SC$2.$cctor();
  SC$2.intentConfidenceThreshold=$1;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.intentConfidenceThreshold=0.85;
  SC$2.entityConfidenceThreshold=0.85;
 };
 User.New=function(UserName)
 {
  return{
   UserName:UserName
  };
 };
 Interpreter=CUIModule.Interpreter=Runtime.Class({
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
 CUIModule.helloUserPhrases=function()
 {
  SC$3.$cctor();
  return SC$3.helloUserPhrases;
 };
 CUIModule.helloPhrases=function()
 {
  SC$3.$cctor();
  return SC$3.helloPhrases;
 };
 CUIModule.getRandomPhrase=function(phrases)
 {
  return Seq.nth(CUIModule.rng().Next(0,phrases.get_Length()),phrases);
 };
 CUIModule.rng=function()
 {
  SC$3.$cctor();
  return SC$3.rng;
 };
 SC$3.$cctor=function()
 {
  SC$3.$cctor=Global.ignore;
  SC$3.rng=new Random.New();
  SC$3.helloPhrases=List.ofArray(["Welcome!","Welcome, my name is Selma.","Welcome to Selma. How can I help?","Hello this is Selma, how can I help?","Hello, I am Selma. How can I help?","Hello, I am Selma. How may I help you now?"]);
  SC$3.helloUserPhrases=List.ofArray(["Hi $user, welcome back.","Welcome $user, nice to see you again..","Hello $user","Good to see you $user."]);
 };
 ClientExtensions.toArray=function(a)
 {
  return Arrays.map(Global.id,$.makeArray(a));
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
 ClientExtensions["Terminal.Push"]=function(x,i)
 {
  var a,b;
  a=i.get_Text();
  b=i.get_Options();
  x.push(Runtime.CreateFuncWithThis(a),b);
 };
 ClientExtensions["Terminal.EchoHtml'"]=function(x,text)
 {
  x.disable();
  x.echo(text,ClientExtensions.rawOpt());
  x.enable();
 };
 ClientExtensions["Terminal.Echo'"]=function(x,text)
 {
  x.disable();
  x.echo(text);
  x.enable();
 };
 ClientExtensions.rawOpt=function()
 {
  SC$4.$cctor();
  return SC$4.rawOpt;
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
  SC$4.$cctor();
  return SC$4.strong;
 };
 htmModule.h4=function()
 {
  SC$4.$cctor();
  return SC$4.h4;
 };
 htmModule.h3=function()
 {
  SC$4.$cctor();
  return SC$4.h3;
 };
 htmModule.h2=function()
 {
  SC$4.$cctor();
  return SC$4.h2;
 };
 htmModule.h1=function()
 {
  SC$4.$cctor();
  return SC$4.h1;
 };
 htmModule.li=function()
 {
  SC$4.$cctor();
  return SC$4.li;
 };
 htmModule.ul=function()
 {
  SC$4.$cctor();
  return SC$4.ul;
 };
 htmModule.th=function()
 {
  SC$4.$cctor();
  return SC$4.th;
 };
 htmModule.td=function()
 {
  SC$4.$cctor();
  return SC$4.td;
 };
 htmModule.tr=function()
 {
  SC$4.$cctor();
  return SC$4.tr;
 };
 htmModule.a=function()
 {
  SC$4.$cctor();
  return SC$4.a;
 };
 htmModule.p=function()
 {
  SC$4.$cctor();
  return SC$4.p;
 };
 htmModule.area=function()
 {
  SC$4.$cctor();
  return SC$4.area;
 };
 htmModule.map=function()
 {
  SC$4.$cctor();
  return SC$4.map;
 };
 htmModule.img=function()
 {
  SC$4.$cctor();
  return SC$4.img;
 };
 htmModule.tfoot=function()
 {
  SC$4.$cctor();
  return SC$4.tfoot;
 };
 htmModule.tbody=function()
 {
  SC$4.$cctor();
  return SC$4.tbody;
 };
 htmModule.thead=function()
 {
  SC$4.$cctor();
  return SC$4.thead;
 };
 htmModule.table=function()
 {
  SC$4.$cctor();
  return SC$4.table;
 };
 htmModule.span=function()
 {
  SC$4.$cctor();
  return SC$4.span;
 };
 htmModule.section=function()
 {
  SC$4.$cctor();
  return SC$4.section;
 };
 htmModule.br=function()
 {
  SC$4.$cctor();
  return SC$4.br;
 };
 htmModule.div=function()
 {
  SC$4.$cctor();
  return SC$4.div;
 };
 htmModule.body=function()
 {
  SC$4.$cctor();
  return SC$4.body;
 };
 htmModule.style=function()
 {
  SC$4.$cctor();
  return SC$4.style;
 };
 htmModule.title=function()
 {
  SC$4.$cctor();
  return SC$4.title;
 };
 htmModule.head=function()
 {
  SC$4.$cctor();
  return SC$4.head;
 };
 htmModule.html=function()
 {
  SC$4.$cctor();
  return SC$4.html;
 };
 htmModule.elem=function(tag,content)
 {
  return new _Html({
   $:0,
   $0:tag,
   $1:content
  });
 };
 SC$4.$cctor=function()
 {
  var r;
  SC$4.$cctor=Global.ignore;
  SC$4.rawOpt=(r={},r.raw=true,r);
  SC$4.html=function(c)
  {
   return htmModule.elem("html",c);
  };
  SC$4.head=function(c)
  {
   return htmModule.elem("head",c);
  };
  SC$4.title=function(c)
  {
   return htmModule.elem("title",c);
  };
  SC$4.style=function(c)
  {
   return htmModule.elem("style",c);
  };
  SC$4.body=function(c)
  {
   return htmModule.elem("body",c);
  };
  SC$4.div=function(c)
  {
   return htmModule.elem("div",c);
  };
  SC$4.br=function(c)
  {
   return htmModule.elem("br",c);
  };
  SC$4.section=function(c)
  {
   return htmModule.elem("section",c);
  };
  SC$4.span=function(c)
  {
   return htmModule.elem("span",c);
  };
  SC$4.table=function(c)
  {
   return htmModule.elem("table",c);
  };
  SC$4.thead=function(c)
  {
   return htmModule.elem("thead",c);
  };
  SC$4.tbody=function(c)
  {
   return htmModule.elem("tbody",c);
  };
  SC$4.tfoot=function(c)
  {
   return htmModule.elem("tfoot",c);
  };
  SC$4.img=function(c)
  {
   return htmModule.elem("img",c);
  };
  SC$4.map=function(c)
  {
   return htmModule.elem("map",c);
  };
  SC$4.area=function(c)
  {
   return htmModule.elem("area",c);
  };
  SC$4.p=function(c)
  {
   return htmModule.elem("p",c);
  };
  SC$4.a=function(c)
  {
   return htmModule.elem("a",c);
  };
  SC$4.tr=function(c)
  {
   return htmModule.elem("tr",c);
  };
  SC$4.td=function(c)
  {
   return htmModule.elem("td",c);
  };
  SC$4.th=function(c)
  {
   return htmModule.elem("th",c);
  };
  SC$4.ul=function(c)
  {
   return htmModule.elem("ul",c);
  };
  SC$4.li=function(c)
  {
   return htmModule.elem("li",c);
  };
  SC$4.h1=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$4.h2=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$4.h3=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$4.h4=function(c)
  {
   return htmModule.elem("h1",c);
  };
  SC$4.strong=function(c)
  {
   return htmModule.elem("strong",c);
  };
 };
 Main.updateCtx=function(cui,m)
 {
  Main.set_context(List.append(Main.context(),List.ofArray([{
   $:0,
   $0:m
  }])));
 };
 Main.context=function()
 {
  SC$5.$cctor();
  return SC$5.context;
 };
 Main.set_context=function($1)
 {
  SC$5.$cctor();
  SC$5.context=$1;
 };
 SC$5.$cctor=function()
 {
  SC$5.$cctor=Global.ignore;
  SC$5.context=List.T.Empty;
 };
 Client.CUI=function()
 {
  var interpreter,options;
  interpreter=Runtime.ThisFunc(function(term,command)
  {
   return((Client.Main().get_Text())(term))(command);
  });
  options=Client.Main().get_Options();
  Global.$("#main").terminal(interpreter,options);
  return Doc.get_Empty();
 };
 Client.Main=function()
 {
  SC$6.$cctor();
  return SC$6.Main;
 };
 Client.container=function()
 {
  SC$6.$cctor();
  return SC$6.container;
 };
 Client.wait=function(f)
 {
  ClientExtensions["Terminal.Echo'"](Client.currentTerm(),"please wait");
  Client.currentTerm().disable();
  f();
  Client.currentTerm().enable();
 };
 Client.stopSpeaking=function()
 {
  SC$6.$cctor();
  return SC$6.stopSpeaking;
 };
 Client.sayRandom=function(phrases)
 {
  Client.say(CUIModule.getRandomPhrase(phrases));
 };
 Client.sayVoices=function()
 {
  var _voices,voices;
  _voices=Global.speechSynthesis.getVoices();
  !(_voices==null)?(voices=ClientExtensions.toArray(_voices),Client.say((function($1)
  {
   return function($2)
   {
    return $1("There are currently "+Global.String($2)+" voices installed on this computer or device.");
   };
  }(Global.id))(Arrays.length(voices))),Arrays.iteri(function(i,v)
  {
   return Client.say(((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("Voice "+Global.String($2)+". Name: "+Utils.toSafe($3)+", Local: "+Utils.prettyPrint($4)+".");
   },4))(Global.id))(i))(v.name))(v.localService));
  },voices)):void 0;
 };
 Client.say=function(text)
 {
  var $1,v,b;
  if($1=Client.currentVoice(),$1!=null&&$1.$==1)
   {
    v=Client.currentVoice().$0;
    Concurrency.Start((b=null,Concurrency.Delay(function()
    {
     var u;
     u=new Global.SpeechSynthesisUtterance(text);
     u.voice=v;
     Global.speechSynthesis.speak(u);
     return Concurrency.Zero();
    })),null);
    Client.caption()?ClientExtensions["Terminal.Echo'"](Client.currentTerm(),text):void 0;
   }
  else
   ClientExtensions["Terminal.Echo'"](Client.currentTerm(),text);
 };
 Client.initMic=function(m,term)
 {
  var mic;
  Client.set_currentMic({
   $:1,
   $0:new Wit.Microphone(document.getElementById("microphone"))
  });
  mic=Client.currentMic().$0;
  mic.onconnecting=function()
  {
   Client.set_currentMicState({
    $:1
   });
   return Client.debugEcho("Mic connecting...");
  };
  mic.ondisconnected=function()
  {
   return Client.debugEcho("Mic disconnected.");
  };
  mic.onaudiostart=function()
  {
   return Client.debugEcho("Mic audio start...");
  };
  mic.onaudioend=function()
  {
   return Client.debugEcho("Mic audio end.");
  };
  mic.onerror=function(s)
  {
   return Client.debugEcho((function($1)
   {
    return function($2)
    {
     return $1("Mic error : "+Utils.toSafe($2)+".");
    };
   }(Global.id))(s));
  };
  mic.onready=function()
  {
   return Client.debugEcho("Mic ready.");
  };
  mic.onresult=function(i,e)
  {
   return m(mic,[i,e]);
  };
  mic.connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT");
 };
 Client.initSpeech=function()
 {
  var _voices,voices;
  _voices=Global.speechSynthesis.getVoices();
  !(_voices==null)?(voices=ClientExtensions.toArray(_voices),Arrays.iter(function(v)
  {
   if(Unchecked.Equals(Client.currentVoice(),null)&&(v.name.indexOf("Microsoft Zira")!=-1||v.name.toLowerCase().indexOf("female")!=-1))
    {
     Client.set_currentVoice({
      $:1,
      $0:v
     });
     ClientExtensions.info((function($1)
     {
      return function($2)
      {
       return $1("Using voice "+Utils.toSafe($2)+".");
      };
     }(Global.id))(Client.currentVoice().$0.name));
    }
  },voices),Unchecked.Equals(Client.currentVoice(),null)&&Arrays.length(voices)>0?(Client.set_currentVoice({
   $:1,
   $0:Arrays.find(function(v)
   {
    return v["default"];
   },voices)
  }),ClientExtensions.info((function($1)
  {
   return function($2)
   {
    return $1("Using default voice "+Utils.toSafe($2)+".");
   };
  }(Global.id))(Client.currentVoice().$0.name))):void 0):void 0;
  Unchecked.Equals(Client.currentVoice(),null)?(ClientExtensions.error("No speech synthesis voice is available."),ClientExtensions["Terminal.Echo'"](Client.currentTerm(),"No speech synthesis voice is available. Install speech synthesis on this device or computer to use the voice output feature of Selma.")):void 0;
 };
 Client.debugEcho=function(s)
 {
  if(Client.debugMode())
   ClientExtensions["Terminal.EchoHtml'"](Client.currentTerm(),s);
 };
 Client.echo=function()
 {
  SC$6.$cctor();
  return SC$6.echo;
 };
 Client.context=function()
 {
  SC$6.$cctor();
  return SC$6.context;
 };
 Client.set_context=function($1)
 {
  SC$6.$cctor();
  SC$6.context=$1;
 };
 Client.state=function()
 {
  return{
   Voice:Client.currentVoice(),
   Mic:Client.currentMic(),
   MicState:Client.currentMicState(),
   Term:Client.currentTerm(),
   Debug:Client.debugMode(),
   Caption:Client.caption()
  };
 };
 Client.caption=function()
 {
  SC$6.$cctor();
  return SC$6.caption;
 };
 Client.set_caption=function($1)
 {
  SC$6.$cctor();
  SC$6.caption=$1;
 };
 Client.debugMode=function()
 {
  SC$6.$cctor();
  return SC$6.debugMode;
 };
 Client.set_debugMode=function($1)
 {
  SC$6.$cctor();
  SC$6.debugMode=$1;
 };
 Client.currentInterpreter=function()
 {
  SC$6.$cctor();
  return SC$6.currentInterpreter;
 };
 Client.set_currentInterpreter=function($1)
 {
  SC$6.$cctor();
  SC$6.currentInterpreter=$1;
 };
 Client.currentTerm=function()
 {
  SC$6.$cctor();
  return SC$6.currentTerm;
 };
 Client.set_currentTerm=function($1)
 {
  SC$6.$cctor();
  SC$6.currentTerm=$1;
 };
 Client.currentMicState=function()
 {
  SC$6.$cctor();
  return SC$6.currentMicState;
 };
 Client.set_currentMicState=function($1)
 {
  SC$6.$cctor();
  SC$6.currentMicState=$1;
 };
 Client.currentMic=function()
 {
  SC$6.$cctor();
  return SC$6.currentMic;
 };
 Client.set_currentMic=function($1)
 {
  SC$6.$cctor();
  SC$6.currentMic=$1;
 };
 Client.currentVoice=function()
 {
  SC$6.$cctor();
  return SC$6.currentVoice;
 };
 Client.set_currentVoice=function($1)
 {
  SC$6.$cctor();
  SC$6.currentVoice=$1;
 };
 SC$6.$cctor=function()
 {
  var r;
  SC$6.$cctor=Global.ignore;
  function _main(mic,command)
  {
   var e,a;
   e=command[1];
   ClientExtensions.info(command[0]);
   ClientExtensions.info(e);
   a=Voice.Greetings(e);
   return a!=null&&a.$==1?ClientExtensions.info(a.$0):ClientExtensions.error(e);
  }
  function main(term,command)
  {
   var $1,$2,$3,a,a$1,b;
   Client.set_currentTerm(term);
   Unchecked.Equals(Client.currentVoice(),null)?Client.initSpeech():void 0;
   Unchecked.Equals(Client.currentMic(),null)?Client.initMic(_main,term):void 0;
   return($1=Text.DebugOn(command),$1!=null&&$1.$==1)?(Client.set_debugMode(true),Client.say("Debug mode is now on.")):($2=Text.DebugOff(command),$2!=null&&$2.$==1)?(Client.set_debugMode(false),Client.say("Debug mode is now off.")):(a=Text.QuickHello(command),a!=null&&a.$==1?($3=a.$0,true):(a$1=Text.QuickHelp(command),a$1!=null&&a$1.$==1&&($3=a$1.$0,true)))?(Main.updateCtx(Client.state(),{
    $:0,
    $0:$3,
    $1:null,
    $2:null
   }),Client.sayRandom(CUIModule.helloPhrases())):(ClientExtensions["Terminal.Echo'"](Client.currentTerm(),"please wait"),Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:-1757206500",[command]),function(a$2)
    {
     var a$3;
     a$3=Text.HelloUser(a$2);
     return a$3!=null&&a$3.$==1?(Client.say((function($4)
     {
      return function($5)
      {
       return $4("This is the hello intent. The user name is "+Utils.toSafe($5)+".");
      };
     }(Global.id))(a$3.$0.get_Value())),Concurrency.Zero()):(ClientExtensions["Terminal.Echo'"](term,"This is the whatever intent"),Concurrency.Zero());
    });
   })),null));
  }
  SC$6.currentVoice=null;
  SC$6.currentMic=null;
  SC$6.currentMicState={
   $:0
  };
  SC$6.currentTerm=null;
  SC$6.currentInterpreter=null;
  SC$6.debugMode=false;
  SC$6.caption=false;
  SC$6.context=List.T.Empty;
  SC$6.echo=function(a)
  {
   ClientExtensions["Terminal.EchoHtml'"](Client.currentTerm(),a);
  };
  SC$6.stopSpeaking=Global.speechSynthesis.speaking||Global.speechSynthesis.pending?Global.speechSynthesis.cancel():null;
  SC$6.container=Controls.Container;
  SC$6.Main=new Interpreter({
   $:0,
   $0:function($1)
   {
    return function($2)
    {
     return _main($1,$2);
    };
   },
   $1:[function($1)
   {
    return function($2)
    {
     return main($1,$2);
    };
   },(r={},r.name="Main",r.greetings="Welcome to Selma. Type hello to begin or help for more assistance.",r.prompt=">",r)]
  });
 };
}());
