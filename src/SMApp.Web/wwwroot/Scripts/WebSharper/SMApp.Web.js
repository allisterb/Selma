(function()
{
 "use strict";
 var Global,SMApp,Web,ClientExtensions,_Html,htmModule,SC$1,Bs,NLU,Babelfy,ApiResponse,TokenFragment,CharFragment,Witai,NLU$1,Intent,Trait,Entity,Utterance,Question,Voice,_Entity,Text,_Utterance,_Intent,_Entity$1,_Trait,Domain,SC$2,CUI,MicState,ClientState,Interpreter,CUI$1,SC$3,Main,SC$4,Client,SC$5,SMApp$Web_GeneratedPrintf,WebSharper,UI,Client$1,Templates,Doc,Strings,IntelliFactory,Runtime,Utils,console,$,Arrays,List,Seq,AttrProxy,Concurrency,JavaScript,Pervasives,Collections,Map,SDK,Random,Operators,Remoting,AjaxRemotingProvider,Wit,document,Unchecked,Dictionary;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 _Html=Web._Html=Web._Html||{};
 htmModule=Web.htmModule=Web.htmModule||{};
 SC$1=Global.StartupCode$SMApp_Web$ClientExtensions=Global.StartupCode$SMApp_Web$ClientExtensions||{};
 Bs=Web.Bs=Web.Bs||{};
 NLU=SMApp.NLU=SMApp.NLU||{};
 Babelfy=NLU.Babelfy=NLU.Babelfy||{};
 ApiResponse=Babelfy.ApiResponse=Babelfy.ApiResponse||{};
 TokenFragment=Babelfy.TokenFragment=Babelfy.TokenFragment||{};
 CharFragment=Babelfy.CharFragment=Babelfy.CharFragment||{};
 Witai=NLU.Witai=NLU.Witai||{};
 NLU$1=Web.NLU=Web.NLU||{};
 Intent=NLU$1.Intent=NLU$1.Intent||{};
 Trait=NLU$1.Trait=NLU$1.Trait||{};
 Entity=NLU$1.Entity=NLU$1.Entity||{};
 Utterance=NLU$1.Utterance=NLU$1.Utterance||{};
 Question=NLU$1.Question=NLU$1.Question||{};
 Voice=NLU$1.Voice=NLU$1.Voice||{};
 _Entity=Voice["Entity'"]=Voice["Entity'"]||{};
 Text=NLU$1.Text=NLU$1.Text||{};
 _Utterance=Text["Utterance'"]=Text["Utterance'"]||{};
 _Intent=Text["Intent'"]=Text["Intent'"]||{};
 _Entity$1=Text["Entity'"]=Text["Entity'"]||{};
 _Trait=Text["Trait'"]=Text["Trait'"]||{};
 Domain=NLU$1.Domain=NLU$1.Domain||{};
 SC$2=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
 CUI=Web.CUI=Web.CUI||{};
 MicState=CUI.MicState=CUI.MicState||{};
 ClientState=CUI.ClientState=CUI.ClientState||{};
 Interpreter=CUI.Interpreter=CUI.Interpreter||{};
 CUI$1=CUI.CUI=CUI.CUI||{};
 SC$3=Global.StartupCode$SMApp_Web$CUI=Global.StartupCode$SMApp_Web$CUI||{};
 Main=Web.Main=Web.Main||{};
 SC$4=Global.StartupCode$SMApp_Web$Main=Global.StartupCode$SMApp_Web$Main||{};
 Client=Web.Client=Web.Client||{};
 SC$5=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Client$1=UI&&UI.Client;
 Templates=Client$1&&Client$1.Templates;
 Doc=UI&&UI.Doc;
 Strings=WebSharper&&WebSharper.Strings;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Utils=WebSharper&&WebSharper.Utils;
 console=Global.console;
 $=Global.jQuery;
 Arrays=WebSharper&&WebSharper.Arrays;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 AttrProxy=UI&&UI.AttrProxy;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 JavaScript=WebSharper&&WebSharper.JavaScript;
 Pervasives=JavaScript&&JavaScript.Pervasives;
 Collections=WebSharper&&WebSharper.Collections;
 Map=Collections&&Collections.Map;
 SDK=Global.SDK;
 Random=WebSharper&&WebSharper.Random;
 Operators=WebSharper&&WebSharper.Operators;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Wit=Global.Wit;
 document=Global.document;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Dictionary=Collections&&Collections.Dictionary;
 ClientExtensions.speechSynthesis=function()
 {
  return Global.speechSynthesis;
 };
 ClientExtensions.elementHTML=function(d)
 {
  return d.innerHTML;
 };
 ClientExtensions.createElement=function(id,doc)
 {
  var el;
  el=self.document.createElement(id);
  Templates.LoadLocalTemplates("");
  Doc.RunAppend(el,doc);
  return el;
 };
 ClientExtensions.replace_tok=function(token,value,s)
 {
  return Strings.Replace(s,token,value);
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
 Bs.Radio=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:Bs.cls("radio"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.Radio(targetExtras,true,target),Doc.TextNode(lbl)])]);
 };
 Bs.checkbox=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:Bs.cls("checkbox"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.CheckBox(targetExtras,target),Doc.TextNode(lbl)])]);
 };
 Bs.textArea=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:Bs.cls("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.InputArea(new List.T({
   $:1,
   $0:Bs.cls("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Bs.inputPassword=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:Bs.cls("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.PasswordBox(new List.T({
   $:1,
   $0:Bs.cls("form-control"),
   $1:targetExtras
  }),target)]);
 };
 Bs.input=function(lbl,extras,target,labelExtras,targetExtras)
 {
  return Doc.Element("div",new List.T({
   $:1,
   $0:Bs.cls("form-group"),
   $1:extras
  }),[Doc.Element("label",labelExtras,[Doc.TextNode(lbl)]),Doc.Input([Bs.cls("form-control"),targetExtras],target)]);
 };
 Bs.btn=function(id)
 {
  return Doc.Element("button",[Bs.eid(id),Bs.cls("btn")],[]);
 };
 Bs.container=function(c)
 {
  return Doc.Element("div",[Bs.cls("container")],c);
 };
 Bs.cls=function(a)
 {
  return AttrProxy.Create("class",a);
 };
 Bs.eid=function(a)
 {
  return AttrProxy.Create("id",a);
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
 Intent=NLU$1.Intent=Runtime.Class({
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
 },null,Intent);
 Trait=NLU$1.Trait=Runtime.Class({
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
 },null,Trait);
 Entity=NLU$1.Entity=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("Entity("+Utils.toSafe($2)+", "+Utils.toSafe($3)+", "+SMApp$Web_GeneratedPrintf.p$2($4)+")");
   },4))(Global.id))(this.get_Name()))(this.get_Value()))(this.get_Confidence());
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
 },null,Entity);
 Utterance=NLU$1.Utterance=Runtime.Class({
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
   el=this.$2;
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
   tl=this.$1;
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
   return this.$0;
  }
 },null,Utterance);
 Question=NLU$1.Question=Runtime.Class({
  toString:function()
  {
   return(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Name: "+Utils.toSafe($2)+" Text: "+Utils.toSafe($3));
   }))(Global.id))(this.get_Name()))(this.get_Text());
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
   $0:new Intent({
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
   $0:new Trait({
    $:0,
    $0:"domain",
    $1:ClientExtensions.toLower(a.domain.value),
    $2:null
   })
  }:!(a.dialogue_act==null)?{
   $:1,
   $0:new Trait({
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
   $0:new Entity({
    $:0,
    $0:"contact",
    $1:ClientExtensions.toLower(a.contact.value),
    $2:null
   })
  }:null;
 };
 _Utterance=Text["Utterance'"]=Runtime.Class({
  get_TopIntent:function()
  {
   return List.head(List.sortBy(function(i)
   {
    return i.get_Confidence();
   },this.get_Intents()));
  },
  get_Traits:function()
  {
   return this.$2;
  },
  get_Entities:function()
  {
   return this.$1;
  },
  get_Intents:function()
  {
   return this.$0;
  }
 },null,_Utterance);
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
  var $1,_entities,$2,m,$3,m$1,_entities$1,$4,m$2,_traits,$5,m$3,_entities$2,_traits$1;
  return a!=null&&a.$==1&&(a.$0.$0.$==0&&(a.$0.$1.get_Length()>0&&($1=[a.$0.$1,a.$0.$2],true)))?(_entities=List.map(function(e)
  {
   return new Entity({
    $:0,
    $0:ClientExtensions.toLower(e.get_Role()),
    $1:e.get_Value(),
    $2:{
     $:1,
     $0:e.get_Confidence()
    }
   });
  },List.filter(function(e)
  {
   return e.get_Confidence()>Text.entityConfidenceThreshold();
  },$1[0])),{
   $:1,
   $0:new Utterance({
    $:0,
    $0:null,
    $1:{
     $:1,
     $0:List.map(function(t)
     {
      return new Trait({
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
     },$1[1]))
    },
    $2:{
     $:1,
     $0:_entities
    }
   })
  }):a!=null&&a.$==1&&(a.$0.$1.$==0&&(a.$0.$2.$==0&&(a.$0.$0.get_Length()>0&&a.$0.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()&&($2=[a.$0.$0,a],true))))?(m=$2[1],{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:ClientExtensions.toLower(m.$0.get_TopIntent().get_Name()),
      $1:{
       $:1,
       $0:m.$0.get_TopIntent().get_Confidence()
      }
     })
    },
    $1:null,
    $2:null
   })
  }):a!=null&&a.$==1&&(a.$0.$2.$==0&&(a.$0.$0.get_Length()>0&&a.$0.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()&&($3=[a.$0.$0,a],true)))?(m$1=$3[1],(_entities$1=List.map(function(e)
  {
   return new Entity({
    $:0,
    $0:ClientExtensions.toLower(e.get_Role()),
    $1:e.get_Value(),
    $2:{
     $:1,
     $0:e.get_Confidence()
    }
   });
  },List.filter(function(e)
  {
   return e.get_Confidence()>Text.entityConfidenceThreshold();
  },m$1.$0.get_Entities())),{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:ClientExtensions.toLower(m$1.$0.get_TopIntent().get_Name()),
      $1:{
       $:1,
       $0:m$1.$0.get_TopIntent().get_Confidence()
      }
     })
    },
    $1:null,
    $2:{
     $:1,
     $0:_entities$1
    }
   })
  })):a!=null&&a.$==1&&(a.$0.$1.$==0&&(a.$0.$0.get_Length()>0&&a.$0.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()&&($4=[a.$0.$0,a],true)))?(m$2=$4[1],(_traits=List.map(function(e)
  {
   return new Trait({
    $:0,
    $0:ClientExtensions.toLower(e.get_Name()),
    $1:e.get_Value(),
    $2:{
     $:1,
     $0:e.get_Confidence()
    }
   });
  },List.filter(function(e)
  {
   return e.get_Confidence()>Text.entityConfidenceThreshold();
  },m$2.$0.get_Traits())),{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:ClientExtensions.toLower(m$2.$0.get_TopIntent().get_Name()),
      $1:{
       $:1,
       $0:m$2.$0.get_TopIntent().get_Confidence()
      }
     })
    },
    $1:{
     $:1,
     $0:_traits
    },
    $2:null
   })
  })):a!=null&&a.$==1&&(a.$0.$0.get_Length()>0&&a.$0.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()&&($5=[a.$0.$0,a],true))?(m$3=$5[1],(_entities$2=List.map(function(e)
  {
   return new Entity({
    $:0,
    $0:ClientExtensions.toLower(e.get_Role()),
    $1:e.get_Value(),
    $2:{
     $:1,
     $0:e.get_Confidence()
    }
   });
  },List.filter(function(e)
  {
   return e.get_Confidence()>Text.entityConfidenceThreshold();
  },m$3.$0.get_Entities())),(_traits$1=List.map(function(e)
  {
   return new Trait({
    $:0,
    $0:ClientExtensions.toLower(e.get_Name()),
    $1:e.get_Value(),
    $2:{
     $:1,
     $0:e.get_Confidence()
    }
   });
  },List.filter(function(e)
  {
   return e.get_Confidence()>Text.entityConfidenceThreshold();
  },m$3.$0.get_Traits())),{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:ClientExtensions.toLower(m$3.$0.get_TopIntent().get_Name()),
      $1:{
       $:1,
       $0:m$3.$0.get_TopIntent().get_Confidence()
      }
     })
    },
    $1:{
     $:1,
     $0:_traits$1
    },
    $2:{
     $:1,
     $0:_entities$2
    }
   })
  }))):null;
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
 Text.getUtterance=function(sentence,m)
 {
  Witai.getMeaning("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT",sentence,function(o)
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
    $0:new _Utterance({
     $:0,
     $0:intents,
     $1:!(o.intents==null)?List.ofSeq(Seq.concat(List.map(function(et)
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
     $2:traits
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
  SC$2.$cctor();
  return SC$2.trait_types;
 };
 Text.entity_types=function()
 {
  SC$2.$cctor();
  return SC$2.entity_types;
 };
 Text.QuickPrograms=function(a)
 {
  return a==="programs"?{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"Program",
      $1:null
     })
    },
    $1:null,
    $2:null
   })
  }:null;
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
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:{
     $:1,
     $0:List.ofArray([new Entity({
      $:0,
      $0:"wit/ordinal",
      $1:"three",
      $2:{
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
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:{
     $:1,
     $0:List.ofArray([new Entity({
      $:0,
      $0:"wit/ordinal",
      $1:"two",
      $2:{
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
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"questionresponse",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:{
     $:1,
     $0:List.ofArray([new Entity({
      $:0,
      $0:"wit/ordinal",
      $1:"one",
      $2:{
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
  return a==="no"||(a==="NO"||(a==="No"||(a==="nope"||(a==="no way"||(a==="nah"||(a==="don't do it"||a==="stop"))))))?{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"no",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:null
   })
  }:null;
 };
 Text.QuickYes=function(a)
 {
  var $1;
  return a==="yes"||(a==="YES"||(a==="Yes"||(a==="YEs"||(a==="ok"||(a==="sure"||(a==="yeah"||(a==="yep"||(a==="uh huh"||(a==="go ahead"||a==="go")))))))))?{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"yes",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:null
   })
  }:null;
 };
 Text.QuickHelp=function(a)
 {
  var $1;
  return a==="help"||(a==="help me"||(a==="what's this?"||a==="huh"))?{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"help",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:null
   })
  }:null;
 };
 Text.QuickHello=function(a)
 {
  var $1;
  return a==="hello"||(a==="hey"||(a==="yo"||a==="hi"))?{
   $:1,
   $0:new Utterance({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"hello",
      $1:{
       $:1,
       $0:1
      }
     })
    },
    $1:null,
    $2:null
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
 NLU$1.No=function(a)
 {
  var $1,a$1,$2,a$2,$3,a$3;
  return(a$1=NLU$1.Intent$1("no",a),a$1!=null&&a$1.$==1&&(a$1.$0[0]==null&&(a$1.$0[1]==null&&($1=a,true))))?{
   $:1,
   $0:$1
  }:(a$2=NLU$1.Intent$1("noresponse",a),a$2!=null&&a$2.$==1&&(a$2.$0[0]==null&&(a$2.$0[1]==null&&($2=a,true))))?{
   $:1,
   $0:$2
  }:(a$3=NLU$1.Intent$1("NoResponse",a),a$3!=null&&a$3.$==1&&(a$3.$0[0]==null&&(a$3.$0[1]==null&&($3=a,true))))?{
   $:1,
   $0:$3
  }:null;
 };
 NLU$1.Yes=function(a)
 {
  var $1,a$1,$2,a$2,$3,a$3;
  return(a$1=NLU$1.Intent$1("yes",a),a$1!=null&&a$1.$==1&&(a$1.$0[0]==null&&(a$1.$0[1]==null&&($1=a,true))))?{
   $:1,
   $0:$1
  }:(a$2=NLU$1.Intent$1("yesresponse",a),a$2!=null&&a$2.$==1&&(a$2.$0[0]==null&&(a$2.$0[1]==null&&($2=a,true))))?{
   $:1,
   $0:$2
  }:(a$3=NLU$1.Intent$1("YesResponse",a),a$3!=null&&a$3.$==1&&(a$3.$0[0]==null&&(a$3.$0[1]==null&&($3=a,true))))?{
   $:1,
   $0:$3
  }:null;
 };
 NLU$1.EntityManyofMany=function(names,a)
 {
  return{
   $:1,
   $0:Map.OfArray(Arrays.ofSeq(List.map(function(n)
   {
    return List.exists(function(e)
    {
     return e.get_Name()===n;
    },a)?[n,{
     $:1,
     $0:List.filter(function(_e)
     {
      return _e.get_Name()===n;
     },a)
    }]:[n,null];
   },names)))
  };
 };
 NLU$1.EntityManyOf1=function(n,a)
 {
  var $1;
  return a!=null&&a.$==1&&(List.exists(function(e)
  {
   return e.get_Name()===n;
  },a.$0)&&($1=a.$0,true))?{
   $:1,
   $0:List.filter(function(e)
   {
    return e.get_Name()===n;
   },$1)
  }:null;
 };
 NLU$1.Entity1OfAny=function(n,a)
 {
  var $1;
  return a!=null&&a.$==1&&(List.exists(function(e)
  {
   return e.get_Name()===n;
  },a.$0)&&($1=a.$0,true))?{
   $:1,
   $0:List.head(List.sortBy(function(e)
   {
    return e.get_Name();
   },List.filter(function(e)
   {
    return e.get_Name()===n;
   },$1)))
  }:null;
 };
 NLU$1.Entity1Of1=function(n,a)
 {
  var $1;
  return a!=null&&a.$==1&&(a.$0.$==1&&(a.$0.$1.$==0&&(a.$0.$0.get_Name()===n&&($1=a.$0.$0,true))))?{
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
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.entity_types=List.ofArray(["wit$contact:contact","wit$datetime:datetime","subject:subject","term:term"]);
  SC$2.trait_types=List.ofArray(["domain","dialogue_act"]);
  SC$2.intentConfidenceThreshold=0.85;
  SC$2.entityConfidenceThreshold=0.85;
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
   this.Say(CUI.getRandomPhrase(phrases,t));
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
 CUI$1.New=function(Voice$1,Mic,Term,Avatar,Caption)
 {
  return new CUI$1({
   Voice:Voice$1,
   Mic:Mic,
   Term:Term,
   Avatar:Avatar,
   Caption:Caption
  });
 };
 CUI.waitAddPhrases=function()
 {
  SC$3.$cctor();
  return SC$3.waitAddPhrases;
 };
 CUI.waitRetrievePhrases=function()
 {
  SC$3.$cctor();
  return SC$3.waitRetrievePhrases;
 };
 CUI.helpPhrases=function()
 {
  SC$3.$cctor();
  return SC$3.helpPhrases;
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
 CUI["getRandomPhrase'"]=function(phrases)
 {
  return ClientExtensions.replace_tok("$0","",Seq.nth(CUI.rng().Next(0,phrases.get_Length()),phrases));
 };
 CUI.getRandomPhrase=function(phrases,r)
 {
  return ClientExtensions.replace_tok("$0",r,Seq.nth(CUI.rng().Next(0,phrases.get_Length()),phrases));
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
  SC$3.helloPhrases=List.ofArray(["Welcome!","Welcome, my name is SMApp.","Welcome to SMApp. How can I help?","Hello this is SMApp, how can I help?","Hello, I am SMApp. How can I help?","Hello, I am SMApp. How may I help you now?","I'm SMApp. Tell me your name so we can get started."]);
  SC$3.helloUserPhrases=List.ofArray(["Hello $0, welcome back.","Welcome $0, nice to see you again.","Hello $0.","Good to see you $0.","Hello $0, nice to see you."]);
  SC$3.helpPhrases=List.ofArray(["What can I help you with $0?"]);
  SC$3.waitRetrievePhrases=List.ofArray(["Ok, let me check that $0 for you","Please wait while I check that $0 for you.","Wait while I check that $0.","Ok let me see if I can find that $0."]);
  SC$3.waitAddPhrases=List.ofArray(["Ok, let me add that $0 for you","Please wait while I add that $0 for you.","Wait while I add that $0.","I'll add that $0 now."]);
 };
 Main.update=function(cui,props,questions,responses,utterances)
 {
  var m,$1,a,a$1,a$2,a$3,$2,a$4,a$5,$3,a$6,a$7,a$8,u,b,$4,a$9,a$10,a$11,b$1,$5,a$12,a$13,a$14,$6,$7,$8,a$15,a$16,a$17,b$2,$9,a$18,a$19,a$20,$10,a$21,a$22,a$23,$11,a$24,a$25,a$26,b$3,$12,a$27,$13,$14,a$28,a$29,$15,q;
  function _say(t)
  {
   cui.Say(t);
  }
  function say(t)
  {
   responses.unshift(t);
   _say(t);
  }
  function sayRandom(p,v)
  {
   var t;
   t=CUI.getRandomPhrase(p,v);
   responses.unshift(t);
   return cui.Say(t);
  }
  function haveProp(k)
  {
   return props.ContainsKey(k);
  }
  function addProp(k,v)
  {
   return props.Add(k,v);
  }
  function deleteProp(k)
  {
   props.Remove(k);
  }
  function user()
  {
   return props.get_Item("user");
  }
  function popc()
  {
   utterances.shift();
  }
  function popq()
  {
   questions.shift();
  }
  function pushq(n)
  {
   var m$1;
   m$1=Main.getQuestion(n);
   m$1==null?(function($16)
   {
    return function($17)
    {
     return $16("No such question: "+Utils.toSafe($17));
    };
   }(Operators.FailWith))(n):questions.unshift(m$1.$0);
  }
  function ask(q$1,v)
  {
   addProp(q$1,v);
   pushq(q$1);
   Main.debug((function($16)
   {
    return function($17)
    {
     return $16("Added question: "+SMApp$Web_GeneratedPrintf.p$8($17)+".");
    };
   }(Global.id))(questions[0]));
   return say(ClientExtensions.replace_tok("$0",v,Main.getQuestion(q$1).$0.get_Text()));
  }
  function PropSet(n,a$30)
  {
   return haveProp(n)?{
    $:1,
    $0:a$30
   }:null;
  }
  function PropNotSet(n,a$30)
  {
   return!haveProp(n)?{
    $:1,
    $0:a$30
   }:null;
  }
  function Assert(a$30)
  {
   var $16,a$31;
   return(a$31=PropSet("user",a$30),a$31!=null&&a$31.$==1&&(questions.length===0&&($16=a$31.$0,true)))?(popc(),{
    $:1,
    $0:$16
   }):null;
  }
  function Response(n,a$30)
  {
   var $16,a$31,d;
   return(a$31=PropSet("user",a$30),a$31!=null&&a$31.$==1&&(Main.haveQuestion(n)&&questions.length>0&&questions[0].get_Name()===n&&($16=a$31.$0,true)))?(popc(),popq(),haveProp(n)?(d=props.get_Item(n),(deleteProp(n),{
    $:1,
    $0:[$16,{
     $:1,
     $0:d
    }]
   })):{
    $:1,
    $0:[$16,null]
   }):null;
  }
  function AnonResponse(n,a$30)
  {
   var $16,a$31,d;
   return(a$31=PropNotSet("user",a$30),a$31!=null&&a$31.$==1&&(Main.haveQuestion(n)&&questions.length>0&&questions[0].get_Name()===n&&($16=a$31.$0,true)))?(popc(),popq(),haveProp(n)?(d=props.get_Item(n),(deleteProp(n),{
    $:1,
    $0:[$16,{
     $:1,
     $0:d
    }]
   })):{
    $:1,
    $0:[$16,null]
   }):null;
  }
  function AnonAssert(a$30)
  {
   var $16,a$31;
   return(a$31=PropNotSet("user",a$30),a$31!=null&&a$31.$==1&&(questions.length===0&&($16=a$31.$0,true)))?(popc(),{
    $:1,
    $0:$16
   }):null;
  }
  function Str(a$30)
  {
   var $16;
   return a$30!=null&&a$30.$==1&&(typeof a$30.$0=="string"&&($16=a$30.$0,true))?{
    $:1,
    $0:$16
   }:null;
  }
  function addSymptom(s,l,m$1)
  {
   var b$4;
   return Concurrency.Start((b$4=null,Concurrency.Delay(function()
   {
    sayRandom(CUI.waitAddPhrases(),"symptom entry");
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.addSymptomJournalEntry:-1265180699",[user().Name,s,l,m$1]),function(a$30)
    {
     return a$30==null?(say(function($16)
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
  function getSymptomJournal(u$1)
  {
   var b$4;
   b$4=null;
   return Concurrency.Delay(function()
   {
    sayRandom(CUI.waitRetrievePhrases(),"symptom journal");
    return(new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getSymptomJournal:-1789573153",[u$1]);
   });
  }
  Main.debug((((Runtime.Curried3(function($16,$17,$18)
  {
   return $16("Starting utterances:"+Utils.prettyPrint($17)+". Starting questions: "+Utils.prettyPrint($18)+".");
  }))(Global.id))(utterances))(questions));
  m=List.ofSeq(Seq.take(utterances.length>=5?5:utterances.length,utterances));
  m.$==1&&(a=(a$1=PropNotSet("started",m.$0),a$1!=null&&a$1.$==1?{
   $:1,
   $0:a$1.$0
  }:null),a!=null&&a.$==1&&(a$2=AnonAssert(a.$0),a$2!=null&&a$2.$==1&&(a$3=NLU$1.Intent$1("hello",a$2.$0),a$3!=null&&a$3.$==1&&(a$3.$0[1]==null&&m.$1.$==0))))?(props.Add("started",true),sayRandom(CUI.helloPhrases(),"")):m.$==1&&(a$4=AnonAssert(m.$0),a$4!=null&&a$4.$==1&&(a$5=NLU$1.Intent$1("hello",a$4.$0),a$5!=null&&a$5.$==1&&(a$5.$0[1]==null&&m.$1.$==0)))?say("Hello, tell me your name to get started."):m.$==1&&(a$6=AnonAssert(m.$0),a$6!=null&&a$6.$==1&&(a$7=NLU$1.Intent$1("hello",a$6.$0),a$7!=null&&a$7.$==1&&(a$8=NLU$1.Entity1Of1("contact",a$7.$0[1]),a$8!=null&&a$8.$==1&&(m.$1.$==0&&($3=a$8.$0,true)))))?(u=$3.get_Value(),sayRandom(CUI.waitRetrievePhrases(),"user name"),Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getUser:310748805",[u]),function(a$30)
   {
    var u$1;
    return a$30==null?(say((function($16)
    {
     return function($17)
     {
      return $16("I did not find a user with the name "+Utils.toSafe($17)+".");
     };
    }(Global.id))(u)),ask("addUser",u),Concurrency.Zero()):(u$1=a$30.$0,Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.updateUserLastLogin:-1135318433",[u$1.Name]),function()
    {
     props.Add("user",u$1);
     sayRandom(CUI.helloUserPhrases(),(function($16)
     {
      return function($17)
      {
       return $16(Utils.prettyPrint($17));
      };
     }(Global.id))(props.get_Item("user")));
     return u$1.LastLoggedIn!=null?Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.humanize:-836764497",[u$1.LastLoggedIn.$0]),function(a$31)
     {
      say((function($16)
      {
       return function($17)
       {
        return $16("You last logged in "+Utils.toSafe($17)+".");
       };
      }(Global.id))(a$31));
      return Concurrency.Zero();
     }):Concurrency.Zero();
    }));
   });
  })),null)):m.$==1&&(a$9=NLU$1.Yes(m.$0),a$9!=null&&a$9.$==1&&(a$10=AnonResponse("addUser",a$9.$0),a$10!=null&&a$10.$==1&&(a$11=Str(a$10.$0[1]),a$11!=null&&a$11.$==1&&(m.$1.$==0&&($4=a$11.$0,true)))))?Concurrency.Start((b$1=null,Concurrency.Delay(function()
  {
   sayRandom(CUI.waitAddPhrases(),"user");
   return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.addUser:-1135318433",[$4]),function(a$30)
   {
    return a$30==null?(say((function($16)
    {
     return function($17)
     {
      return $16("Sorry I was not able to add the user "+Utils.toSafe($17)+" to the system.");
     };
    }(Global.id))($4)),Concurrency.Zero()):(addProp("user",$4),say((function($16)
    {
     return function($17)
     {
      return $16("Hello "+Utils.prettyPrint($17)+", nice to meet you.");
     };
    }(Global.id))(props.get_Item("user"))),Concurrency.Zero());
   });
  })),null):m.$==1&&(a$12=NLU$1.No(m.$0),a$12!=null&&a$12.$==1&&(a$13=AnonResponse("addUser",a$12.$0),a$13!=null&&a$13.$==1&&(a$14=Str(a$13.$0[1]),a$14!=null&&a$14.$==1&&(m.$1.$==0&&($5=a$14.$0,true)))))?say((function($16)
  {
   return function($17)
   {
    return $16("Ok I did not add the user "+Utils.toSafe($17)+". But you must login for me to help you.");
   };
  }(Global.id))($5)):m.$==1&&(($7=AnonAssert(m.$0),$7!=null&&$7.$==1)&&m.$1.$==0)?say("Could you introduce yourself so we can get started?"):m.$==1&&(a$15=Assert(m.$0),a$15!=null&&a$15.$==1&&(a$16=NLU$1.Intent$1("hello",a$15.$0),a$16!=null&&a$16.$==1&&(a$16.$0[0]==null&&(a$17=NLU$1.Entity1Of1("contact",a$16.$0[1]),a$17!=null&&a$17.$==1&&(m.$1.$==0&&($8=a$17.$0,true))))))?Concurrency.Start((b$2=null,Concurrency.Delay(function()
  {
   return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.getUser:310748805",[$8.get_Value()]),function(a$30)
   {
    return a$30==null?(say((function($16)
    {
     return function($17)
     {
      return $16("Sorry, the user "+Utils.toSafe($17)+" does not exist.");
     };
    }(Global.id))($8.get_Value())),Concurrency.Zero()):(ask("switchUser",a$30.$0.Name),Concurrency.Zero());
   });
  })),null):m.$==1&&(a$18=NLU$1.Yes(m.$0),a$18!=null&&a$18.$==1&&(a$19=Response("switchUser",a$18.$0),a$19!=null&&a$19.$==1&&(a$20=Str(a$19.$0[1]),a$20!=null&&a$20.$==1&&(m.$1.$==0&&($9=a$20.$0,true)))))?(props.set_Item("user",$9),say((function($16)
  {
   return function($17)
   {
    return $16("Ok I switched to user "+Utils.prettyPrint($17)+".");
   };
  }(Global.id))($9))):m.$==1&&(a$21=NLU$1.No(m.$0),a$21!=null&&a$21.$==1&&(a$22=Response("switchUser",a$21.$0),a$22!=null&&a$22.$==1&&(a$23=Str(a$22.$0[1]),a$23!=null&&a$23.$==1&&(m.$1.$==0&&($10=a$23.$0,true)))))?say((function($16)
  {
   return function($17)
   {
    return $16("Ok I did not switch to user "+Utils.toSafe($17)+".");
   };
  }(Global.id))($10)):m.$==1&&(a$24=Assert(m.$0),a$24!=null&&a$24.$==1&&(a$25=NLU$1.Intent$1("symptom",a$24.$0),a$25!=null&&a$25.$==1&&(a$26=NLU$1.Entity1OfAny("symptom_name",a$25.$0[1]),a$26!=null&&a$26.$==1&&(m.$1.$==0&&($11=a$26.$0,true)))))?Concurrency.Start((b$3=null,Concurrency.Delay(function()
  {
   say("Ok I'll add that entry to your symptom journal");
   addSymptom($11.get_Value(),null,null);
   return Concurrency.Bind(getSymptomJournal(user().Name),function()
   {
    ask("painVideo","");
    return Concurrency.Zero();
   });
  })),null):m.$==1&&(a$27=NLU$1.Yes(m.$0),a$27!=null&&a$27.$==1&&(($13=Response("painVideo",a$27.$0),$13!=null&&$13.$==1)&&m.$1.$==0))?cui["EchoHtml'"]("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/SkAqOditKN0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"):m.$==1&&(a$28=Assert(m.$0),a$28!=null&&a$28.$==1&&(a$29=NLU$1.Intent$1("medjournal",a$28.$0),a$29!=null&&a$29.$==1&&(($15=a$29.$0[1],$15!=null&&$15.$==1)&&(m.$1.$==0&&($14=a$29.$0[1].$0,true)))))?(say("ok I added that entry to your medication journal."),say("You should be careful not to take too many painkillers over a short period of time.")):(popc(),Main.debug("Main interpreter did not understand utterance."),say("Sorry I didn't understand what you meant."),questions.length>0?(q=Seq.nth(0,questions),haveProp(q.get_Name())?say(ClientExtensions.replace_tok("$0",props.get_Item(q.get_Name()),q.get_Text())):say(q.get_Text())):void 0);
  Main.debug((((Runtime.Curried3(function($16,$17,$18)
  {
   return $16("Ending utterances: "+Utils.prettyPrint($17)+". Ending questions:"+Utils.prettyPrint($18)+".");
  }))(Global.id))(utterances))(questions));
 };
 Main.haveQuestion=function(n)
 {
  return List.exists(function(q)
  {
   return q.get_Name()===n;
  },Main.questions());
 };
 Main.getQuestion=function(n)
 {
  return Seq.tryFind(function(q)
  {
   return q.get_Name()===n;
  },Main.questions());
 };
 Main.questions=function()
 {
  SC$4.$cctor();
  return SC$4.questions;
 };
 Main.debug=function(m)
 {
  ClientExtensions.debug("Main",m);
 };
 SC$4.$cctor=function()
 {
  SC$4.$cctor=Global.ignore;
  SC$4.questions=List.ofArray([new Question({
   $:0,
   $0:"addUser",
   $1:"Do you want me to add the user $0?"
  }),new Question({
   $:0,
   $0:"switchUser",
   $1:"Do you want me to switch to the user $0?"
  }),new Question({
   $:0,
   $0:"painSurvey",
   $1:"Would you like to take a short survey on your pain symptoms so I can understand them better."
  }),new Question({
   $:0,
   $0:"painVideo",
   $1:"Would you like to see a video about pain management that might help you?"
  }),new Question({
   $:0,
   $0:"medReminder",
   $1:"Would you like me to add a reminder about your meds so you won't forget them later?"
  })]);
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
  SC$5.$cctor();
  return SC$5.Main;
 };
 Client.initMic=function(cui,interpret)
 {
  var i,mic;
  cui[0]=(i=cui[0],CUI$1.New(i.Voice,{
   $:1,
   $0:new Wit.Microphone(document.getElementById("microphone"))
  },i.Term,i.Avatar,i.Caption));
  mic=cui[0].Mic.$0;
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
   return Client.debug("Mic audio end.");
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
  mic.onresult=function(i$1,e)
  {
   return Client.ClientState().$==2?Client.echo("I'm still trying to understand what you said before."):Client.ClientState().$==0?ClientExtensions.error("Client is not intialized."):!(i$1==null||e==null)?(Client.set_MicState({
    $:7,
    $0:i$1,
    $1:e
   }),Client.debug((((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Mic result: "+Utils.prettyPrint($2)+" "+Utils.prettyPrint($3)+".");
   }))(Global.id))(i$1))(e)),interpret(cui,mic,[i$1,e])):Client.debug("Mic: No result returned.");
  };
  mic.connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT");
 };
 Client.sayRandom=function(t,phrases)
 {
  Client.say(CUI.getRandomPhrase(phrases,t));
 };
 Client.sayVoices=function()
 {
  var voices;
  voices=ClientExtensions.toArray(ClientExtensions.speechSynthesis().getVoices());
  Client["say'"]((function($1)
  {
   return function($2)
   {
    return $1("There are currently "+Global.String($2)+" voices installed on this computer or device.");
   };
  }(Global.id))(Arrays.length(voices)));
  Arrays.iteri(function(i,v)
  {
   return Client["say'"](((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("Voice "+Global.String($2)+". Name: "+Utils.toSafe($3)+", Local: "+Utils.prettyPrint($4)+".");
   },4))(Global.id))(i))(v.name))(v.localService));
  },voices);
 };
 Client.say=function(text)
 {
  Client.Responses().unshift(text);
  Client["say'"](text);
 };
 Client["say'"]=function(text)
 {
  Client.CUI().Say(text);
 };
 Client.initSpeech=function(cui)
 {
  var voices,v,i,_cui;
  voices=ClientExtensions.toArray(Client.synth().getVoices());
  Arrays.length(voices)>0?(v=Arrays.find(function(v$1)
  {
   return v$1["default"];
  },voices),cui[0]=(i=cui[0],CUI$1.New({
   $:1,
   $0:v
  },i.Mic,i.Term,i.Avatar,i.Caption)),_cui=cui[0],Client.debug((function($1)
  {
   return function($2)
   {
    return $1("Using browser speech synthesis voice "+Utils.toSafe($2)+".");
   };
  }(Global.id))(_cui.Voice.$0.name)),_cui.Avatar.nativeVoice=true,_cui.Avatar.nativeVoiceName=v.name):Client.echo("No browser speech synthesis voice is available. Falling back to CMU TTS.");
 };
 Client.synth=function()
 {
  SC$5.$cctor();
  return SC$5.synth;
 };
 Client.push=function(m)
 {
  Client.Utterances().unshift(m);
  return Client.Utterances();
 };
 Client.Props=function()
 {
  SC$5.$cctor();
  return SC$5.Props;
 };
 Client.Responses=function()
 {
  SC$5.$cctor();
  return SC$5.Responses;
 };
 Client.Questions=function()
 {
  SC$5.$cctor();
  return SC$5.Questions;
 };
 Client.Utterances=function()
 {
  SC$5.$cctor();
  return SC$5.Utterances;
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
  SC$5.$cctor();
  return SC$5.ClientState;
 };
 Client.set_ClientState=function($1)
 {
  SC$5.$cctor();
  SC$5.ClientState=$1;
 };
 Client.MicState=function()
 {
  SC$5.$cctor();
  return SC$5.MicState;
 };
 Client.set_MicState=function($1)
 {
  SC$5.$cctor();
  SC$5.MicState=$1;
 };
 Client.CUI=function()
 {
  SC$5.$cctor();
  return SC$5.CUI;
 };
 Client.set_CUI=function($1)
 {
  SC$5.$cctor();
  SC$5.CUI=$1;
 };
 SC$5.$cctor=function()
 {
  var sdk,web,mainOpt,r,$1,$2;
  SC$5.$cctor=Global.ignore;
  function _main(cui,a,command)
  {
   var i,e,intent,a$1,_trait,a$2,entity,a$3,$3,x;
   i=command[0];
   e=command[1];
   Client.debug((((Runtime.Curried3(function($4,$5,$6)
   {
    return $4("Voice: "+Utils.prettyPrint($5)+" "+Utils.prettyPrint($6));
   }))(Global.id))(i))(e));
   intent=(a$1=Voice["Intent'"](i,e),a$1!=null&&a$1.$==1?{
    $:1,
    $0:a$1.$0
   }:null);
   _trait=(a$2=Voice["Trait'"](e),a$2!=null&&a$2.$==1?{
    $:1,
    $0:List.ofArray([a$2.$0])
   }:null);
   entity=(a$3=Voice["Entity'$1"](e),a$3!=null&&a$3.$==1?{
    $:1,
    $0:List.ofArray([a$3.$0])
   }:null);
   return intent==null&&(_trait==null&&entity==null)?null:(Client.debug(((((Runtime.Curried(function($4,$5,$6,$7)
   {
    return $4("Voice: "+SMApp$Web_GeneratedPrintf.p($5)+" "+SMApp$Web_GeneratedPrintf.p$3($6)+" "+SMApp$Web_GeneratedPrintf.p$5($7));
   },4))(Global.id))(intent))(_trait))(entity)),x=Client.push(new Utterance({
    $:0,
    $0:intent,
    $1:_trait,
    $2:entity
   })),Main.update(cui[0],Client.Props(),Client.Questions(),Client.Responses(),x));
  }
  function main(cui,term,command)
  {
   var _cui,$3,$4,el,a,$5,$6,a$1,a$2,a$3,a$4,u,b;
   cui[0]=CUI$1.New(Client.CUI().Voice,Client.CUI().Mic,term,Client.CUI().Avatar,Client.CUI().Caption);
   Unchecked.Equals(cui[0].Mic,null)?Client.initMic(cui,_main):void 0;
   Unchecked.Equals(cui[0].Voice,null)?Client.initSpeech(cui):void 0;
   _cui=cui[0];
   Client.ClientState().$===0?Client.set_ClientState(ClientState.ClientReady):void 0;
   return($3=Text.Blank(command),$3!=null&&$3.$==1)?Client["say'"]("Tell me what you want me to do or ask me a question."):($4=Text.Debug(command),$4!=null&&$4.$==1)?(Client.debug((function($7)
   {
    return function($8)
    {
     return $7("Utterances: "+Utils.prettyPrint($8));
    };
   }(Global.id))(Client.Utterances())),Client.debug((function($7)
   {
    return function($8)
    {
     return $7("Questions: "+Utils.prettyPrint($8));
    };
   }(Global.id))(Client.Questions())),el=self.document.createElement("insert"),a=Doc.Element("div",[AttrProxy.Create("id","bar")],[]),Templates.LoadLocalTemplates(""),Doc.RunAppend(el,a),Client.debug(el.innerHTML)):($5=Text.Voices(command),$5!=null&&$5.$==1)?Client.sayVoices():Client.ClientState().$==1?(a$1=Text.QuickHello(command),a$1!=null&&a$1.$==1?($6=a$1.$0,true):(a$2=Text.QuickHelp(command),a$2!=null&&a$2.$==1?($6=a$2.$0,true):(a$3=Text.QuickYes(command),a$3!=null&&a$3.$==1?($6=a$3.$0,true):(a$4=Text.QuickNo(command),a$4!=null&&a$4.$==1&&($6=a$4.$0,true)))))?(Client.debug((function($7)
   {
    return function($8)
    {
     return $7("Quick Text: "+SMApp$Web_GeneratedPrintf.p$7($8)+".");
    };
   }(Global.id))($6)),u=Client.push($6),Main.update(_cui,Client.Props(),Client.Questions(),Client.Responses(),u),Client.set_ClientState(ClientState.ClientReady)):_cui.Wait((b=null,Concurrency.Delay(function()
   {
    Client.set_ClientState(ClientState.ClientUnderstand);
    Text.getUtterance(command,function(meaning)
    {
     var a$5,m,u$1;
     a$5=Text.HasUtterance(meaning);
     a$5!=null&&a$5.$==1?(m=a$5.$0,Client.debug(((((Runtime.Curried(function($7,$8,$9,$10)
     {
      return $7("Text: Intent: "+SMApp$Web_GeneratedPrintf.p($8)+", Traits: "+SMApp$Web_GeneratedPrintf.p$3($9)+", Entities: "+SMApp$Web_GeneratedPrintf.p$5($10));
     },4))(Global.id))(m.get_Intent()))(m.get_Traits()))(m.get_Entities())),u$1=Client.push(m),Main.update(_cui,Client.Props(),Client.Questions(),Client.Responses(),u$1)):(Client.debug("Text: Did not receive a meaning from the server."),Client["say'"]("Sorry I did not understand what you said."));
    });
    Client.set_ClientState(ClientState.ClientReady);
    return Concurrency.Zero();
   }))):Client.ClientState().$==0?ClientExtensions.error("Client is not initialized."):Client["say'"]("I'm still trying to understand what you said before.");
  }
  SC$5.CUI=CUI$1.New(null,null,null,(SDK.applicationId="4277115329081938617",sdk=new Global.SDKConnection(),web=new Global.WebAvatar(),web.version=8.5,web.connection=sdk,web.avatar="22225225",web.voice="cmu-slt",web.voiceMod="default",web.nativeVoice=true,web.nativeVoiceName="Microsoft David Desktop - English (United States)",web.width=300,web.createBox(),web.addMessage(""),web.processMessages(0),web),false);
  SC$5.MicState=MicState.MicNotInitialized;
  SC$5.ClientState=ClientState.ClientNotInitialzed;
  SC$5.Utterances=[];
  SC$5.Questions=[];
  SC$5.Responses=[];
  SC$5.Props=new Dictionary.New$5();
  SC$5.synth=Global.speechSynthesis;
  SC$5.Main=(mainOpt=(r={},r.name="Main",r.greetings="Welcome to SMApp. Enter 'hello' or 'hello my name is...(you) to initialize speech.",r.prompt=">",r),new Interpreter({
   $:0,
   $0:($1=[Client.CUI()],(Runtime.Curried3(_main))($1)),
   $1:[($2=[Client.CUI()],(Runtime.Curried3(main))($2)),mainOpt]
  }));
 };
 SMApp$Web_GeneratedPrintf.p$8=function($1)
 {
  return"Question ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+")";
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
  return"Entity ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$2($1.$2)+")";
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
  return"Utterance ("+SMApp$Web_GeneratedPrintf.p($1.$0)+", "+SMApp$Web_GeneratedPrintf.p$3($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$5($1.$2)+")";
 };
}());
