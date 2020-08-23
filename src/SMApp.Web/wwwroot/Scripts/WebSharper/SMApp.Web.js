(function()
{
 "use strict";
 var Global,SMApp,Bootstrap,Controls,SC$1,Web,User,Meaning,Intent,Entity,Interpreter,Resource,NLU,SC$2,CUI,SC$3,ClientExtensions,_Html,_hModule,SC$4,Client,SC$5,WebSharper,UI,Doc,List,AttrModule,IntelliFactory,Runtime,Seq,Random,Arrays,$,console,Strings,Concurrency,Utils,Unchecked,Remoting,AjaxRemotingProvider;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Bootstrap=SMApp.Bootstrap=SMApp.Bootstrap||{};
 Controls=Bootstrap.Controls=Bootstrap.Controls||{};
 SC$1=Global.StartupCode$SMApp_Web$Bootstrap=Global.StartupCode$SMApp_Web$Bootstrap||{};
 Web=SMApp.Web=SMApp.Web||{};
 User=Web.User=Web.User||{};
 Meaning=Web.Meaning=Web.Meaning||{};
 Intent=Web.Intent=Web.Intent||{};
 Entity=Web.Entity=Web.Entity||{};
 Interpreter=Web.Interpreter=Web.Interpreter||{};
 Resource=Web.Resource=Web.Resource||{};
 NLU=Web.NLU=Web.NLU||{};
 SC$2=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
 CUI=Web.CUI=Web.CUI||{};
 SC$3=Global.StartupCode$SMApp_Web$CUI=Global.StartupCode$SMApp_Web$CUI||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 _Html=Web._Html=Web._Html||{};
 _hModule=Web._hModule=Web._hModule||{};
 SC$4=Global.StartupCode$SMApp_Web$ClientExtensions=Global.StartupCode$SMApp_Web$ClientExtensions||{};
 Client=Web.Client=Web.Client||{};
 SC$5=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
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
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Utils=WebSharper&&WebSharper.Utils;
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
 NLU.QuickHello=function(a)
 {
  var $1;
  switch(a==="hello"?0:a==="hey"?0:a==="yo"?0:a==="hi"?0:a==="help"?1:a==="debug on"?2:a==="debug off"?3:a.toLowerCase()==="programs"?4:5)
  {
   case 0:
    return{
     $:0,
     $0:null
    };
   case 1:
    return{
     $:1,
     $0:null
    };
   case 2:
    return{
     $:2,
     $0:null
    };
   case 3:
    return{
     $:3,
     $0:null
    };
   case 4:
    return{
     $:4,
     $0:null
    };
   case 5:
    return{
     $:5,
     $0:null
    };
  }
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
 NLU.availablePrograms=function()
 {
  SC$2.$cctor();
  return SC$2.availablePrograms;
 };
 NLU.entityConfidenceThreshold=function()
 {
  SC$2.$cctor();
  return SC$2.entityConfidenceThreshold;
 };
 NLU.set_entityConfidenceThreshold=function($1)
 {
  SC$2.$cctor();
  SC$2.entityConfidenceThreshold=$1;
 };
 NLU.intentConfidenceThreshold=function()
 {
  SC$2.$cctor();
  return SC$2.intentConfidenceThreshold;
 };
 NLU.set_intentConfidenceThreshold=function($1)
 {
  SC$2.$cctor();
  SC$2.intentConfidenceThreshold=$1;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.intentConfidenceThreshold=0.85;
  SC$2.entityConfidenceThreshold=0.85;
  SC$2.availablePrograms=List.ofArray(["Depression","Arthritis"]);
 };
 CUI.helloUserPhrases=function()
 {
  SC$3.$cctor();
  return SC$3.helloUserPhrases;
 };
 CUI.helloPhrases=function()
 {
  SC$3.$cctor();
  return SC$3.helloPhrases;
 };
 CUI.getRandomPhrase=function(phrases)
 {
  return Seq.nth(CUI.rng().Next(0,phrases.get_Length()),phrases);
 };
 CUI.rng=function()
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
 ClientExtensions.info=function(a)
 {
  console.info(a);
 };
 ClientExtensions.error=function(a)
 {
  $.error(a);
 };
 ClientExtensions["Terminal.Push"]=function(x,i)
 {
  var a,b;
  a=i.get_Func();
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
 _hModule.alt=function(c)
 {
  return new _Html({
   $:1,
   $0:"alt",
   $1:c
  });
 };
 _hModule.src=function(c)
 {
  return new _Html({
   $:1,
   $0:"src",
   $1:c
  });
 };
 _hModule.cls=function(c)
 {
  return new _Html({
   $:1,
   $0:"class",
   $1:c
  });
 };
 _hModule.str=function(h)
 {
  return _Html.toString(h);
 };
 _hModule.op_PercentEquals=function(name,value)
 {
  return new _Html({
   $:1,
   $0:name,
   $1:value
  });
 };
 _hModule.op_Splice=function(s)
 {
  var c;
  return List.ofArray([new _Html({
   $:2,
   $0:(c=s,Global.String(c))
  })]);
 };
 _hModule.strong=function()
 {
  SC$4.$cctor();
  return SC$4.strong;
 };
 _hModule.h4=function()
 {
  SC$4.$cctor();
  return SC$4.h4;
 };
 _hModule.h3=function()
 {
  SC$4.$cctor();
  return SC$4.h3;
 };
 _hModule.h2=function()
 {
  SC$4.$cctor();
  return SC$4.h2;
 };
 _hModule.h1=function()
 {
  SC$4.$cctor();
  return SC$4.h1;
 };
 _hModule.li=function()
 {
  SC$4.$cctor();
  return SC$4.li;
 };
 _hModule.ul=function()
 {
  SC$4.$cctor();
  return SC$4.ul;
 };
 _hModule.th=function()
 {
  SC$4.$cctor();
  return SC$4.th;
 };
 _hModule.td=function()
 {
  SC$4.$cctor();
  return SC$4.td;
 };
 _hModule.tr=function()
 {
  SC$4.$cctor();
  return SC$4.tr;
 };
 _hModule.a=function()
 {
  SC$4.$cctor();
  return SC$4.a;
 };
 _hModule.p=function()
 {
  SC$4.$cctor();
  return SC$4.p;
 };
 _hModule.area=function()
 {
  SC$4.$cctor();
  return SC$4.area;
 };
 _hModule.map=function()
 {
  SC$4.$cctor();
  return SC$4.map;
 };
 _hModule.img=function()
 {
  SC$4.$cctor();
  return SC$4.img;
 };
 _hModule.tfoot=function()
 {
  SC$4.$cctor();
  return SC$4.tfoot;
 };
 _hModule.tbody=function()
 {
  SC$4.$cctor();
  return SC$4.tbody;
 };
 _hModule.thead=function()
 {
  SC$4.$cctor();
  return SC$4.thead;
 };
 _hModule.table=function()
 {
  SC$4.$cctor();
  return SC$4.table;
 };
 _hModule.span=function()
 {
  SC$4.$cctor();
  return SC$4.span;
 };
 _hModule.section=function()
 {
  SC$4.$cctor();
  return SC$4.section;
 };
 _hModule.br=function()
 {
  SC$4.$cctor();
  return SC$4.br;
 };
 _hModule.div=function()
 {
  SC$4.$cctor();
  return SC$4.div;
 };
 _hModule.body=function()
 {
  SC$4.$cctor();
  return SC$4.body;
 };
 _hModule.style=function()
 {
  SC$4.$cctor();
  return SC$4.style;
 };
 _hModule.title=function()
 {
  SC$4.$cctor();
  return SC$4.title;
 };
 _hModule.head=function()
 {
  SC$4.$cctor();
  return SC$4.head;
 };
 _hModule.html=function()
 {
  SC$4.$cctor();
  return SC$4.html;
 };
 _hModule.elem=function(tag,content)
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
   return _hModule.elem("html",c);
  };
  SC$4.head=function(c)
  {
   return _hModule.elem("head",c);
  };
  SC$4.title=function(c)
  {
   return _hModule.elem("title",c);
  };
  SC$4.style=function(c)
  {
   return _hModule.elem("style",c);
  };
  SC$4.body=function(c)
  {
   return _hModule.elem("body",c);
  };
  SC$4.div=function(c)
  {
   return _hModule.elem("div",c);
  };
  SC$4.br=function(c)
  {
   return _hModule.elem("br",c);
  };
  SC$4.section=function(c)
  {
   return _hModule.elem("section",c);
  };
  SC$4.span=function(c)
  {
   return _hModule.elem("span",c);
  };
  SC$4.table=function(c)
  {
   return _hModule.elem("table",c);
  };
  SC$4.thead=function(c)
  {
   return _hModule.elem("thead",c);
  };
  SC$4.tbody=function(c)
  {
   return _hModule.elem("tbody",c);
  };
  SC$4.tfoot=function(c)
  {
   return _hModule.elem("tfoot",c);
  };
  SC$4.img=function(c)
  {
   return _hModule.elem("img",c);
  };
  SC$4.map=function(c)
  {
   return _hModule.elem("map",c);
  };
  SC$4.area=function(c)
  {
   return _hModule.elem("area",c);
  };
  SC$4.p=function(c)
  {
   return _hModule.elem("p",c);
  };
  SC$4.a=function(c)
  {
   return _hModule.elem("a",c);
  };
  SC$4.tr=function(c)
  {
   return _hModule.elem("tr",c);
  };
  SC$4.td=function(c)
  {
   return _hModule.elem("td",c);
  };
  SC$4.th=function(c)
  {
   return _hModule.elem("th",c);
  };
  SC$4.ul=function(c)
  {
   return _hModule.elem("ul",c);
  };
  SC$4.li=function(c)
  {
   return _hModule.elem("li",c);
  };
  SC$4.h1=function(c)
  {
   return _hModule.elem("h1",c);
  };
  SC$4.h2=function(c)
  {
   return _hModule.elem("h1",c);
  };
  SC$4.h3=function(c)
  {
   return _hModule.elem("h1",c);
  };
  SC$4.h4=function(c)
  {
   return _hModule.elem("h1",c);
  };
  SC$4.strong=function(c)
  {
   return _hModule.elem("strong",c);
  };
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
  Client.context().unshift({
   $:0,
   $0:Client.Main()
  });
  return Doc.get_Empty();
 };
 Client.Main=function()
 {
  SC$5.$cctor();
  return SC$5.Main;
 };
 Client.container=function()
 {
  SC$5.$cctor();
  return SC$5.container;
 };
 Client.d=function()
 {
  SC$5.$cctor();
  return SC$5.d;
 };
 Client.wait=function(f)
 {
  var b;
  Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   f();
   return Concurrency.Zero();
  })),null);
  ClientExtensions["Terminal.Echo'"](Client.currentTerm(),"please wait");
  Client.currentTerm().disable();
  f();
  Client.currentTerm().enable();
 };
 Client.stopSpeaking=function()
 {
  SC$5.$cctor();
  return SC$5.stopSpeaking;
 };
 Client.sayRandom=function(phrases)
 {
  Client.say(CUI.getRandomPhrase(phrases));
 };
 Client.sayVoices=function()
 {
  var voices,i,$1,v;
  voices=ClientExtensions.toArray(Global.speechSynthesis.getVoices());
  Client.say((function($2)
  {
   return function($3)
   {
    return $2("There are currently "+Global.String($3)+" voices installed on this computer or device.");
   };
  }(Global.id))(Arrays.length(voices)));
  for(i=0,$1=Arrays.length(voices)-1;i<=$1;i++){
   v=Arrays.get(voices,i);
   Client.say(((((Runtime.Curried(function($2,$3,$4,$5)
   {
    return $2("Voice "+Global.String($3)+". Name: "+Utils.toSafe($4)+", Local: "+Utils.prettyPrint($5)+".");
   },4))(Global.id))(i))(v.name))(v.localService));
  }
 };
 Client.say=function(text)
 {
  var b;
  Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   var u;
   u=new Global.SpeechSynthesisUtterance(text);
   u.voice=Client.currentVoice();
   Global.speechSynthesis.speak(u);
   return Concurrency.Zero();
  })),null);
  Client.transcribe()?Client.currentTerm().echo(text):void 0;
 };
 Client.initSpeech=function()
 {
  var voices,u,b;
  voices=ClientExtensions.toArray(Global.speechSynthesis.getVoices());
  Arrays.iter(function(v)
  {
   if(Unchecked.Equals(Client.currentVoice(),null)&&(v.name.indexOf("Microsoft Zira")!=-1||v.name.toLowerCase().indexOf("female")!=-1))
    {
     Client.set_currentVoice(v);
     ClientExtensions.info((function($1)
     {
      return function($2)
      {
       return $1("Using voice "+Utils.toSafe($2)+".");
      };
     }(Global.id))(Client.currentVoice().name));
    }
  },voices);
  Unchecked.Equals(Client.currentVoice(),null)&&Arrays.length(voices)>0?(Client.set_currentVoice(Arrays.find(function(v)
  {
   return v["default"];
  },voices)),ClientExtensions.info((function($1)
  {
   return function($2)
   {
    return $1("Using voice "+Utils.toSafe($2)+".");
   };
  }(Global.id))(Client.currentVoice().name)),u=new Global.SpeechSynthesisUtterance(function($1)
  {
   return $1("Using the default speech synthesis voice.");
  }(Global.id)),Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   Global.speechSynthesis.speak(u);
   return Concurrency.Zero();
  })),null)):Unchecked.Equals(Client.currentVoice(),null)?ClientExtensions.error("No speech synthesis voice is available. In order to use Selma you must install a speech synthesis voice on this device or computer."):void 0;
 };
 Client.transcribe=function()
 {
  SC$5.$cctor();
  return SC$5.transcribe;
 };
 Client.set_transcribe=function($1)
 {
  SC$5.$cctor();
  SC$5.transcribe=$1;
 };
 Client.debugMode=function()
 {
  SC$5.$cctor();
  return SC$5.debugMode;
 };
 Client.set_debugMode=function($1)
 {
  SC$5.$cctor();
  SC$5.debugMode=$1;
 };
 Client.currentTerm=function()
 {
  SC$5.$cctor();
  return SC$5.currentTerm;
 };
 Client.set_currentTerm=function($1)
 {
  SC$5.$cctor();
  SC$5.currentTerm=$1;
 };
 Client.currentVoice=function()
 {
  SC$5.$cctor();
  return SC$5.currentVoice;
 };
 Client.set_currentVoice=function($1)
 {
  SC$5.$cctor();
  SC$5.currentVoice=$1;
 };
 Client.context=function()
 {
  SC$5.$cctor();
  return SC$5.context;
 };
 SC$5.$cctor=function()
 {
  var r;
  SC$5.$cctor=Global.ignore;
  function main(term,command)
  {
   var a,b;
   Client.set_currentTerm(term);
   Unchecked.Equals(Client.currentVoice(),null)?Client.initSpeech():void 0;
   a=NLU.QuickHello(command);
   return a.$==1?ClientExtensions["Terminal.EchoHtml'"](term,_hModule.str((_hModule.div())(List.ofArray([(_hModule.img())(List.ofArray([_hModule.cls("card-img-top"),_hModule.src("...")]))])))):a.$==2?(Client.set_debugMode(true),Client.say("Debug mode is now on.")):a.$==3?(Client.set_debugMode(false),Client.say("Debug mode is now off.")):a.$==4?(Client.say("The following programs are available:"),List.iteri(function(i,p)
   {
    return Client.say((((Runtime.Curried3(function($1,$2,$3)
    {
     return $1(Global.String($2)+". "+Utils.toSafe($3));
    }))(Global.id))(i))(p));
   },NLU.availablePrograms())):a.$==5?(ClientExtensions["Terminal.Echo'"](Client.currentTerm(),"please wait"),term.disable(),Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:904730489",[command]),function(a$1)
    {
     var a$2;
     a$2=NLU.HelloUser(a$1);
     return a$2!=null&&a$2.$==1?(Client.say((function($1)
     {
      return function($2)
      {
       return $1("This is the hello intent. The user name is "+Utils.toSafe($2)+".");
      };
     }(Global.id))(a$2.$0.get_Value())),Concurrency.Zero()):(ClientExtensions["Terminal.Echo'"](term,"This is the whatever intent"),Concurrency.Zero());
    }),Concurrency.Delay(function()
    {
     term.enable();
     return Concurrency.Zero();
    }));
   })),null)):Client.sayRandom(CUI.helloPhrases());
  }
  SC$5.context=[];
  SC$5.currentVoice=null;
  SC$5.currentTerm=null;
  SC$5.debugMode=false;
  SC$5.transcribe=false;
  SC$5.stopSpeaking=Global.speechSynthesis.speaking||Global.speechSynthesis.pending?Global.speechSynthesis.cancel():null;
  SC$5.d="\n        <div class=\"card\" style=\"width: 18rem;\">\n        <img class=\"card-img-top\" src=\"...\" alt=\"Card image cap\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">Card title</h5>\n          <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\n          <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n        </div>\n</div>\n    ";
  SC$5.container=Controls.Container;
  SC$5.Main=new Interpreter({
   $:0,
   $0:[function($1)
   {
    return function($2)
    {
     return main($1,$2);
    };
   },(r={},r.name="Main",r.greetings="Welcome to Selma. Type hello to begin or help for more assistance.",r.prompt=">",r)]
  });
 };
}());
