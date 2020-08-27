(function()
{
 "use strict";
 var Global,SMApp,Web,ClientExtensions,_Html,htmModule,SC$1,Bootstrap,Controls,SC$2,NLU,Intent,Trait,Entity,Meaning,Question,Voice,_Entity,Text,_Meaning,_Intent,_Entity$1,SC$3,CUI,User,MicState,ClientState,Interpreter,CUI$1,SC$4,Main,Client,SC$5,SMApp$Web_GeneratedPrintf,WebSharper,Strings,Utils,console,$,Arrays,IntelliFactory,Runtime,List,Seq,UI,Doc,AttrModule,Concurrency,Random,Unchecked,Remoting,AjaxRemotingProvider,Wit,document,Collections,Dictionary;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Web=SMApp.Web=SMApp.Web||{};
 ClientExtensions=Web.ClientExtensions=Web.ClientExtensions||{};
 _Html=Web._Html=Web._Html||{};
 htmModule=Web.htmModule=Web.htmModule||{};
 SC$1=Global.StartupCode$SMApp_Web$ClientExtensions=Global.StartupCode$SMApp_Web$ClientExtensions||{};
 Bootstrap=SMApp.Bootstrap=SMApp.Bootstrap||{};
 Controls=Bootstrap.Controls=Bootstrap.Controls||{};
 SC$2=Global.StartupCode$SMApp_Web$Bootstrap=Global.StartupCode$SMApp_Web$Bootstrap||{};
 NLU=Web.NLU=Web.NLU||{};
 Intent=NLU.Intent=NLU.Intent||{};
 Trait=NLU.Trait=NLU.Trait||{};
 Entity=NLU.Entity=NLU.Entity||{};
 Meaning=NLU.Meaning=NLU.Meaning||{};
 Question=NLU.Question=NLU.Question||{};
 Voice=NLU.Voice=NLU.Voice||{};
 _Entity=Voice["Entity'"]=Voice["Entity'"]||{};
 Text=NLU.Text=NLU.Text||{};
 _Meaning=Text["Meaning'"]=Text["Meaning'"]||{};
 _Intent=Text["Intent'"]=Text["Intent'"]||{};
 _Entity$1=Text["Entity'"]=Text["Entity'"]||{};
 SC$3=Global.StartupCode$SMApp_Web$NLU=Global.StartupCode$SMApp_Web$NLU||{};
 CUI=Web.CUI=Web.CUI||{};
 User=CUI.User=CUI.User||{};
 MicState=CUI.MicState=CUI.MicState||{};
 ClientState=CUI.ClientState=CUI.ClientState||{};
 Interpreter=CUI.Interpreter=CUI.Interpreter||{};
 CUI$1=CUI.CUI=CUI.CUI||{};
 SC$4=Global.StartupCode$SMApp_Web$CUI=Global.StartupCode$SMApp_Web$CUI||{};
 Main=Web.Main=Web.Main||{};
 Client=Web.Client=Web.Client||{};
 SC$5=Global.StartupCode$SMApp_Web$Client=Global.StartupCode$SMApp_Web$Client||{};
 SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf=Global.SMApp$Web_GeneratedPrintf||{};
 WebSharper=Global.WebSharper;
 Strings=WebSharper&&WebSharper.Strings;
 Utils=WebSharper&&WebSharper.Utils;
 console=Global.console;
 $=Global.jQuery;
 Arrays=WebSharper&&WebSharper.Arrays;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 UI=WebSharper&&WebSharper.UI;
 Doc=UI&&UI.Doc;
 AttrModule=UI&&UI.AttrModule;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Random=WebSharper&&WebSharper.Random;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Wit=Global.Wit;
 document=Global.document;
 Collections=WebSharper&&WebSharper.Collections;
 Dictionary=Collections&&Collections.Dictionary;
 ClientExtensions.replace_tok=function(token,value,s)
 {
  return Strings.Replace(s,token,value);
 };
 ClientExtensions.toLower=function(s)
 {
  return s.toLowerCase();
 };
 ClientExtensions.debug=function(t)
 {
  var c;
  ClientExtensions.info((function($1)
  {
   return function($2)
   {
    return $1("DEBUG: "+Utils.toSafe($2));
   };
  }(Global.id))((c=t,Global.String(c))));
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
  SC$2.$cctor();
  return SC$2.Class;
 };
 Controls.cls=function()
 {
  SC$2.$cctor();
  return SC$2.cls;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.cls=AttrModule.Class;
  SC$2.Class=AttrModule.Class;
 };
 Intent=NLU.Intent=Runtime.Class({
  toString:function()
  {
   return(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Intent("+Utils.toSafe($2)+", "+SMApp$Web_GeneratedPrintf.p$2($3)+")");
   }))(Global.id))(this.get_Name()))(this.get_Confidence());
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
   return[this.$0,this.$1];
  }
 },null,Intent);
 Trait=NLU.Trait=Runtime.Class({
  toString:function()
  {
   return(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Trait("+Utils.toSafe($2)+", "+Utils.prettyPrint($3)+")");
   }))(Global.id))(this.get_Name()))(this.get_Value());
  },
  get_Value:function()
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
 },null,Trait);
 Entity=NLU.Entity=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1("Entity("+Utils.toSafe($2)+", "+Utils.toSafe($3)+", "+SMApp$Web_GeneratedPrintf.p$2($4)+")");
   },4))(Global.id))(this.get_Name()))(this.get_Value()))(this.get_Confidence());
  },
  get_Confidence:function()
  {
   return(this.get_Unwrap())[2];
  },
  get_Value:function()
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
 },null,Entity);
 Meaning=NLU.Meaning=Runtime.Class({
  toString:function()
  {
   return((((Runtime.Curried(function($1,$2,$3,$4)
   {
    return $1(SMApp$Web_GeneratedPrintf.p($2)+" "+SMApp$Web_GeneratedPrintf.p$3($3)+". "+SMApp$Web_GeneratedPrintf.p$5($4));
   },4))(Global.id))(this.get_Intent()))(this.get_Trait()))(this.get_Entities());
  },
  get_Entities:function()
  {
   return(this.Unwrap())[2];
  },
  get_Trait:function()
  {
   return(this.Unwrap())[1];
  },
  get_Intent:function()
  {
   return(this.Unwrap())[0];
  },
  Unwrap:function()
  {
   return[this.$0,this.$1,this.$2];
  }
 },null,Meaning);
 Question=NLU.Question=Runtime.Class({
  toString:function()
  {
   return(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("("+SMApp$Web_GeneratedPrintf.p$7($2)+","+Utils.prettyPrint($3)+")");
   }))(Global.id))(this.get_Meaning()))(this.get_Response());
  },
  get_Response:function()
  {
   return(this.Unwrap())[1];
  },
  get_Meaning:function()
  {
   return(this.Unwrap())[0];
  },
  Unwrap:function()
  {
   return[this.$0,this.$1];
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
  return!(a.greetings==null)?{
   $:1,
   $0:new Trait({
    $:0,
    $0:"greetings",
    $1:ClientExtensions.toLower(a.contact.value)
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
 _Meaning=Text["Meaning'"]=Runtime.Class({
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
 },null,_Meaning);
 _Intent=Text["Intent'"]=Runtime.Class({
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
 Text.HasMeaning=function(a)
 {
  var $1,$2,m,$3,m$1,entities;
  return a!=null&&a.$==1&&(a.$0.$0.$==0&&(a.$0.$1.get_Length()>0&&($1=a.$0.$1,true)))?{
   $:1,
   $0:new Meaning({
    $:0,
    $0:null,
    $1:null,
    $2:{
     $:1,
     $0:List.map(function(e)
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
     },$1))
    }
   })
  }:a!=null&&a.$==1&&(a.$0.$1.$==0&&(a.$0.$0.get_Length()>0&&a.$0.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()&&($2=[a.$0.$0,a],true)))?(m=$2[1],{
   $:1,
   $0:new Meaning({
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
  }):a!=null&&a.$==1&&(a.$0.$0.get_Length()>0&&a.$0.$1.get_Length()>0&&a.$0.get_TopIntent().get_Confidence()>Text.intentConfidenceThreshold()&&($3=[a.$0.$1,a.$0.$0,a],true))?(m$1=$3[2],(entities=List.map(function(e)
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
   $0:new Meaning({
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
     $0:entities
    }
   })
  })):null;
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
 Text.QuickPrograms=function(a)
 {
  return a==="programs"?{
   $:1,
   $0:new Meaning({
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
 Text.QuickNo=function(a)
 {
  var $1;
  return a==="no"||(a==="NO"||(a==="No"||(a==="nope"||(a==="no way"||(a==="nah"||(a==="don't do it"||a==="stop"))))))?{
   $:1,
   $0:new Meaning({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"no",
      $1:null
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
   $0:new Meaning({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"yes",
      $1:null
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
   $0:new Meaning({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"help",
      $1:null
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
   $0:new Meaning({
    $:0,
    $0:{
     $:1,
     $0:new Intent({
      $:0,
      $0:"hello",
      $1:null
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
 Text.Blank=function(a)
 {
  return a===""?{
   $:1,
   $0:null
  }:null;
 };
 NLU.No=function(a)
 {
  var $1,$2;
  return($2=NLU.Intent$1("no",a.$0),$2!=null&&$2.$==1)&&(a.$1==null&&a.$2==null)?{
   $:1,
   $0:null
  }:null;
 };
 NLU.Yes=function(a)
 {
  var $1,$2;
  return($2=NLU.Intent$1("yes",a.$0),$2!=null&&$2.$==1)&&(a.$1==null&&a.$2==null)?{
   $:1,
   $0:null
  }:null;
 };
 NLU.Entity$1=function(n,a)
 {
  return a.get_Name()===n?{
   $:1,
   $0:a.get_Value()
  }:null;
 };
 NLU.Intent$1=function(n,a)
 {
  var $1;
  return a!=null&&a.$==1&&(a.$0.$0===n&&($1=a.$0.$0,true))?{
   $:1,
   $0:null
  }:null;
 };
 SC$3.$cctor=function()
 {
  SC$3.$cctor=Global.ignore;
  SC$3.intentConfidenceThreshold=0.85;
  SC$3.entityConfidenceThreshold=0.85;
 };
 User=CUI.User=Runtime.Class({
  toString:function()
  {
   return this.Name;
  }
 },null,User);
 User.New=function(Name)
 {
  return new User({
   Name:Name
  });
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
 ClientState.UserOp={
  $:1
 };
 ClientState.LangOp={
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
   this.Term.enable();
   f();
   this.Term.disable();
  },
  sayRandom:Global.ignore,
  Say:function(text)
  {
   var m,v,b;
   m=this.Voice;
   m!=null&&m.$==1?(v=m.$0,Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    var u;
    u=new Global.SpeechSynthesisUtterance(text);
    u.voice=v;
    Global.speechSynthesis.speak(u);
    return Concurrency.Zero();
   })),null),this.Caption?this["Echo'"](text):void 0):this["Echo'"](text);
  },
  Debug:function(m)
  {
   ClientExtensions.debug(m);
   this.DebugMode?this["EchoHtml'"](m):void 0;
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
 CUI$1.New=function(Voice$1,Mic,Term,DebugMode,Caption)
 {
  return new CUI$1({
   Voice:Voice$1,
   Mic:Mic,
   Term:Term,
   DebugMode:DebugMode,
   Caption:Caption
  });
 };
 CUI.helpPhrases=function()
 {
  SC$4.$cctor();
  return SC$4.helpPhrases;
 };
 CUI.helloUserPhrases=function()
 {
  SC$4.$cctor();
  return SC$4.helloUserPhrases;
 };
 CUI.helloPhrases=function()
 {
  SC$4.$cctor();
  return SC$4.helloPhrases;
 };
 CUI.waitRetrievePhrases=function()
 {
  SC$4.$cctor();
  return SC$4.waitRetrievePhrases;
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
  SC$4.$cctor();
  return SC$4.rng;
 };
 SC$4.$cctor=function()
 {
  SC$4.$cctor=Global.ignore;
  SC$4.rng=new Random.New();
  SC$4.waitRetrievePhrases=List.ofArray(["Ok, let me check that $0 for you","Please wait while I check that $0 for you.","Wait while I check that $0.","Ok let me see if I can find that $0."]);
  SC$4.helloPhrases=List.ofArray(["Welcome!","Welcome, my name is Selma.","Welcome to Selma. How can I help?","Hello this is Selma, how can I help?","Hello, I am Selma. How can I help?","Hello, I am Selma. How may I help you now?"]);
  SC$4.helloUserPhrases=List.ofArray(["Hi $0, welcome back.","Welcome $0, nice to see you again.","Hello $0.","Good to see you $0."]);
  SC$4.helpPhrases=List.ofArray(["What can I help you with $0?"]);
 };
 Main.update=function(cui,props,questions,responses,context)
 {
  var Question$1,b,m,$1,a,$2,$3,a$1,$4,$5,a$2,$6,$7,a$3,$8,a$4,$9,a$5,a$6,$10,$11,a$7,$12,$13,a$8,a$9,$14,$15,a$10,$16,$17,$18,r,$19,a$11,$20,a$12,a$13,$21,$22,a$14,$23,a$15,$24,a$16,a$17,$25,$26,$27;
  function hasProp(k)
  {
   return props.ContainsKey(k);
  }
  function AnonUser(a$18)
  {
   return!hasProp("user")?{
    $:1,
    $0:a$18.Unwrap()
   }:null;
  }
  function User$1(a$18)
  {
   return hasProp("user")?{
    $:1,
    $0:a$18.Unwrap()
   }:null;
  }
  function matchp(m$1)
  {
   return Unchecked.Equals(m$1,questions[0].$0);
  }
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
  function getUser(u)
  {
   var b$1;
   Concurrency.Start((b$1=null,Concurrency.Delay(function()
   {
    sayRandom(CUI.waitRetrievePhrases(),"user name");
    return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetUser2:-539855299",[u]),function(a$18)
    {
     var u$1;
     return a$18==null?(say((function($28)
     {
      return function($29)
      {
       return $28("Sorry I did not find the user name "+Utils.toSafe($29)+".");
      };
     }(Global.id))(u)),Concurrency.Zero()):(u$1=a$18.$0,Concurrency.Combine(hasProp("user")?(props.set_Item("user",u$1),Concurrency.Zero()):(props.Add("user",u$1),Concurrency.Zero()),Concurrency.Delay(function()
     {
      sayRandom(CUI.helloUserPhrases(),(function($28)
      {
       return function($29)
       {
        return $28(Utils.prettyPrint($29));
       };
      }(Global.id))(props.get_Item("user")));
      return Concurrency.Zero();
     })));
    });
   })),null);
  }
  function pop(n)
  {
   var f,$28;
   for(f=1,$28=n;f<=$28;f++)context.shift();
  }
  function popq()
  {
   questions.shift();
  }
  Question$1=function(a$18)
  {
   return questions.length>0&&matchp(new Meaning({
    $:0,
    $0:a$18[0],
    $1:a$18[1],
    $2:a$18[2]
   }))?{
    $:1,
    $0:a$18
   }:null;
  };
  b=context.length>=5?5:context.length;
  Main.debug((function($28)
  {
   return function($29)
   {
    return $28("Current context: "+Utils.prettyPrint($29)+".");
   };
  }(Global.id))(context));
  Main.debug((function($28)
  {
   return function($29)
   {
    return $28("Previous questions: "+Utils.prettyPrint($29)+".");
   };
  }(Global.id))(questions));
  m=List.ofSeq(Seq.take(b,context));
  m.$==1&&(a=AnonUser(m.$0),a!=null&&a.$==1&&(($2=NLU.Intent$1("hello",a.$0[0]),$2!=null&&$2.$==1)&&(a.$0[1]==null&&(a.$0[2]==null&&m.$1.$==0))))?sayRandom(CUI.helloPhrases(),""):m.$==1&&(a$1=User$1(m.$0),a$1!=null&&a$1.$==1&&(($4=NLU.Intent$1("hello",a$1.$0[0]),$4!=null&&$4.$==1)&&(a$1.$0[1]==null&&(a$1.$0[2]==null&&m.$1.$==0))))?(sayRandom(CUI.helloUserPhrases(),(function($28)
  {
   return function($29)
   {
    return $28(Utils.prettyPrint($29));
   };
  }(Global.id))(props.get_Item("user"))),pop(1)):m.$==1&&(a$2=AnonUser(m.$0),a$2!=null&&a$2.$==1&&(($6=NLU.Intent$1("hello",a$2.$0[0]),$6!=null&&$6.$==1)&&(a$2.$0[1]==null&&(($7=a$2.$0[2],$7!=null&&$7.$==1)&&(a$2.$0[2].$0.$==1&&(a$3=NLU.Entity$1("contact",a$2.$0[2].$0.$0),a$3!=null&&a$3.$==1&&(a$2.$0[2].$0.$1.$==0&&($5=a$3.$0,true))))))))?(getUser($5),pop(1)):m.$==1&&(a$4=AnonUser(m.$0),a$4!=null&&a$4.$==1&&(a$4.$0[0]==null&&(a$4.$0[1]==null&&(($9=a$4.$0[2],$9!=null&&$9.$==1)&&(a$4.$0[2].$0.$==1&&(a$5=NLU.Entity$1("contact",a$4.$0[2].$0.$0),a$5!=null&&a$5.$==1&&(a$4.$0[2].$0.$1.$==0&&(m.$1.$==1&&(a$6=AnonUser(m.$1.$0),a$6!=null&&a$6.$==1&&(($10=NLU.Intent$1("hello",a$6.$0[0]),$10!=null&&$10.$==1)&&(a$6.$0[1]==null&&(a$6.$0[2]==null&&(m.$1.$1.$==0&&($8=a$5.$0,true))))))))))))))?(getUser($8),pop(2)):m.$==1&&(a$7=AnonUser(m.$0),a$7!=null&&a$7.$==1&&(($12=NLU.Intent$1("hello",a$7.$0[0]),$12!=null&&$12.$==1)&&(a$7.$0[1]==null&&(($13=a$7.$0[2],$13!=null&&$13.$==1)&&(a$7.$0[2].$0.$==1&&(a$8=NLU.Entity$1("contact",a$7.$0[2].$0.$0),a$8!=null&&a$8.$==1&&(a$7.$0[2].$0.$1.$==0&&(m.$1.$==1&&(a$9=AnonUser(m.$1.$0),a$9!=null&&a$9.$==1&&(($14=NLU.Intent$1("hello",a$9.$0[0]),$14!=null&&$14.$==1)&&(a$9.$0[1]==null&&(a$9.$0[2]==null&&(m.$1.$1.$==0&&($11=a$8.$0,true))))))))))))))?(getUser($11),pop(2)):m.$==1&&(a$10=User$1(m.$0),a$10!=null&&a$10.$==1&&(($16=NLU.Intent$1("hello",a$10.$0[0]),$16!=null&&$16.$==1)&&(a$10.$0[1]==null&&(($17=a$10.$0[2],$17!=null&&$17.$==1)&&(a$10.$0[2].$0.$==1&&(($18=NLU.Entity$1("contact",a$10.$0[2].$0.$0),$18!=null&&$18.$==1)&&(a$10.$0[2].$0.$1.$==0&&(m.$1.$==0&&($15=m,true)))))))))?(r="Are you sure you want to switch users?",questions.unshift(new Question({
   $:0,
   $0:List.head($15),
   $1:r
  })),say(r),Main.debug((function($28)
  {
   return function($29)
   {
    return $28("Added question: "+SMApp$Web_GeneratedPrintf.p$8($29)+".");
   };
  }(Global.id))(questions[0]))):m.$==1&&(a$11=User$1(m.$0),a$11!=null&&a$11.$==1&&(($20=NLU.Intent$1("yes",a$11.$0[0]),$20!=null&&$20.$==1)&&(a$11.$0[1]==null&&(a$11.$0[2]==null&&(m.$1.$==1&&(a$12=User$1(m.$1.$0),a$12!=null&&a$12.$==1&&(a$13=Question$1(a$12.$0),a$13!=null&&a$13.$==1&&(($21=NLU.Intent$1("hello",a$13.$0[0]),$21!=null&&$21.$==1)&&(a$13.$0[1]==null&&(($22=a$13.$0[2],$22!=null&&$22.$==1)&&(a$13.$0[2].$0.$==1&&(a$14=NLU.Entity$1("contact",a$13.$0[2].$0.$0),a$14!=null&&a$14.$==1&&(a$13.$0[2].$0.$1.$==0&&(m.$1.$1.$==0&&($19=a$14.$0,true)))))))))))))))?(getUser($19),pop(2),popq()):m.$==1&&(a$15=User$1(m.$0),a$15!=null&&a$15.$==1&&(($24=NLU.Intent$1("no",a$15.$0[0]),$24!=null&&$24.$==1)&&(a$15.$0[1]==null&&(a$15.$0[2]==null&&(m.$1.$==1&&(a$16=User$1(m.$1.$0),a$16!=null&&a$16.$==1&&(a$17=Question$1(a$16.$0),a$17!=null&&a$17.$==1&&(($25=NLU.Intent$1("hello",a$17.$0[0]),$25!=null&&$25.$==1)&&(a$17.$0[1]==null&&(($26=a$17.$0[2],$26!=null&&$26.$==1)&&(a$17.$0[2].$0.$==1&&(($27=NLU.Entity$1("contact",a$17.$0[2].$0.$0),$27!=null&&$27.$==1)&&(a$17.$0[2].$0.$1.$==0&&m.$1.$1.$==0)))))))))))))?(pop(2),popq()):(pop(1),say("Sorry I didn't understand what you meant."),questions.length>0?say(questions[0].get_Response()):void 0);
 };
 Main.debug=function(m)
 {
  ClientExtensions.debug((function($1)
  {
   return function($2)
   {
    return $1("Main: "+Utils.prettyPrint($2));
   };
  }(Global.id))(m));
 };
 Client.run=function()
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
  SC$5.$cctor();
  return SC$5.Main;
 };
 Client.container=function()
 {
  SC$5.$cctor();
  return SC$5.container;
 };
 Client.wait=function(f)
 {
  ClientExtensions["Terminal.Echo'"](Client.CUI().Term,"please wait");
  Client.CUI().Term.disable();
  f();
  Client.CUI().Term.enable();
 };
 Client.sayRandom=function(t,phrases)
 {
  Client.say(CUI.getRandomPhrase(phrases,t));
 };
 Client.sayVoices=function()
 {
  var voices;
  voices=ClientExtensions.toArray(Global.speechSynthesis.getVoices());
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
  var m,v,b;
  m=Client.CUI().Voice;
  m!=null&&m.$==1?(v=m.$0,Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   var u;
   u=new Global.SpeechSynthesisUtterance(text);
   u.voice=v;
   Global.speechSynthesis.speak(u);
   Client.CUI().Caption?ClientExtensions["Terminal.Echo'"](Client.CUI().Term,text):void 0;
   return Concurrency.Zero();
  })),null)):ClientExtensions["Terminal.Echo'"](Client.CUI().Term,text);
 };
 Client.initMic=function(m,term)
 {
  var M,mic;
  Client.set_CUI((M={
   $:1,
   $0:new Wit.Microphone(document.getElementById("microphone"))
  },CUI$1.New(Client.CUI().Voice,M,Client.CUI().Term,Client.CUI().DebugMode,Client.CUI().Caption)));
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
  mic.onresult=function(i,e)
  {
   return!(i==null||e==null)?(Client.set_MicState({
    $:7,
    $0:i,
    $1:e
   }),Client.debug((((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("Mic result: "+Utils.prettyPrint($2)+" "+Utils.prettyPrint($3)+".");
   }))(Global.id))(i))(e)),m(mic,[i,e])):Client.debug("Mic: No result returned.");
  };
  mic.connect("4Y2BLQY5TWLIN7HFIV264S53MY4PCUAT");
 };
 Client.initSpeech=function()
 {
  var voices;
  voices=ClientExtensions.toArray(Client.synth().getVoices());
  Arrays.iter(function(v)
  {
   if(Unchecked.Equals(Client.CUI().Voice,null)&&(v.name.indexOf("Microsoft Zira")!=-1||v.name.toLowerCase().indexOf("female")!=-1))
    {
     Client.set_CUI(CUI$1.New({
      $:1,
      $0:v
     },Client.CUI().Mic,Client.CUI().Term,Client.CUI().DebugMode,Client.CUI().Caption));
     Client.debug((function($1)
     {
      return function($2)
      {
       return $1("Using voice "+Utils.toSafe($2)+".");
      };
     }(Global.id))(Client.CUI().Voice.$0.name));
    }
  },voices);
  Unchecked.Equals(Client.CUI().Voice,null)&&Arrays.length(voices)>0?(Client.set_CUI(CUI$1.New({
   $:1,
   $0:Arrays.find(function(v)
   {
    return v["default"];
   },voices)
  },Client.CUI().Mic,Client.CUI().Term,Client.CUI().DebugMode,Client.CUI().Caption)),Client.debug((function($1)
  {
   return function($2)
   {
    return $1("Using default voice "+Utils.toSafe($2)+".");
   };
  }(Global.id))(Client.CUI().Voice.$0.name))):Unchecked.Equals(Client.CUI().Voice,null)?(ClientExtensions.error("No speech synthesis voice is available."),Client.echo("No speech synthesis voice is available. Install speech synthesis on this device or computer to use the voice output feature of Selma.")):void 0;
 };
 Client.synth=function()
 {
  SC$5.$cctor();
  return SC$5.synth;
 };
 Client.pushContext=function(m)
 {
  Client.Context().unshift(m);
  return Client.Context();
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
 Client.Context=function()
 {
  SC$5.$cctor();
  return SC$5.Context;
 };
 Client.debug=function(m)
 {
  var text;
  text=(function($1)
  {
   return function($2)
   {
    return $1("Client: "+Utils.prettyPrint($2));
   };
  }(Global.id))(m);
  ClientExtensions.debug(text);
  Client.CUI().DebugMode?Client.echo(text):void 0;
 };
 Client.echo=function(m)
 {
  if(!(Client.CUI().Term==null))
   ClientExtensions["Terminal.EchoHtml'"](Client.CUI().Term,m);
 };
 Client.Props=function()
 {
  SC$5.$cctor();
  return SC$5.Props;
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
  var r;
  SC$5.$cctor=Global.ignore;
  function _main(a,command)
  {
   var i,e,intent,a$1,_trait,a$2,entity,a$3,$1,$2,c;
   i=command[0];
   e=command[1];
   Client.debug((((Runtime.Curried3(function($3,$4,$5)
   {
    return $3("Voice: "+Utils.prettyPrint($4)+" "+Utils.prettyPrint($5));
   }))(Global.id))(i))(e));
   intent=(a$1=Voice["Intent'"](i,e),a$1!=null&&a$1.$==1?{
    $:1,
    $0:a$1.$0
   }:null);
   _trait=(a$2=Voice["Trait'"](e),a$2!=null&&a$2.$==1?{
    $:1,
    $0:a$2.$0
   }:null);
   entity=(a$3=Voice["Entity'$1"](e),a$3!=null&&a$3.$==1?{
    $:1,
    $0:List.ofArray([a$3.$0])
   }:null);
   return intent==null&&(_trait==null&&entity==null)?null:(Client.debug(((((Runtime.Curried(function($3,$4,$5,$6)
   {
    return $3("Voice: "+SMApp$Web_GeneratedPrintf.p($4)+" "+SMApp$Web_GeneratedPrintf.p$3($5)+" "+SMApp$Web_GeneratedPrintf.p$5($6));
   },4))(Global.id))(intent))(_trait))(entity)),(Client.ClientState()==null?false:Client.ClientState().$0.$==0)?Client["say'"]("I'm still working on understanding your last message."):(c=Client.pushContext(new Meaning({
    $:0,
    $0:intent,
    $1:_trait,
    $2:entity
   })),Main.update(Client.CUI(),Client.Props(),Client.Questions(),Client.Responses(),c)));
  }
  function main(term,command)
  {
   var $1,$2,$3,$4,$5,$6,a,a$1,a$2,a$3,a$4,c,b;
   Client.set_CUI(CUI$1.New(Client.CUI().Voice,Client.CUI().Mic,term,Client.CUI().DebugMode,Client.CUI().Caption));
   Unchecked.Equals(Client.CUI().Mic,null)?Client.initMic(_main,term):void 0;
   Unchecked.Equals(Client.CUI().Voice,null)?Client.initSpeech():void 0;
   return($1=Text.Blank(command),$1!=null&&$1.$==1)?Client["say'"]("Tell me what you want me to do or ask me a question."):($2=Text.DebugOn(command),$2!=null&&$2.$==1)?(Client.set_CUI(CUI$1.New(Client.CUI().Voice,Client.CUI().Mic,Client.CUI().Term,true,Client.CUI().Caption)),Client["say'"]("Debug mode is now on.")):($3=Text.DebugOff(command),$3!=null&&$3.$==1)?(Client.set_CUI(CUI$1.New(Client.CUI().Voice,Client.CUI().Mic,Client.CUI().Term,false,Client.CUI().Caption)),Client["say'"]("Debug mode is now off.")):($4=Text.Voices(command),$4!=null&&$4.$==1)?Client.sayVoices():(Client.ClientState()==null?false:Client.ClientState().$0.$==0)?Client["say'"]("I'm still working on understanding your last message."):(a=Text.QuickHello(command),a!=null&&a.$==1?($6=a.$0,true):(a$1=Text.QuickHelp(command),a$1!=null&&a$1.$==1?($6=a$1.$0,true):(a$2=Text.QuickYes(command),a$2!=null&&a$2.$==1?($6=a$2.$0,true):(a$3=Text.QuickNo(command),a$3!=null&&a$3.$==1?($6=a$3.$0,true):(a$4=Text.QuickPrograms(command),a$4!=null&&a$4.$==1&&($6=a$4.$0,true))))))?(Client.debug((function($7)
   {
    return function($8)
    {
     return $7("Quick Text: "+SMApp$Web_GeneratedPrintf.p$7($8)+".");
    };
   }(Global.id))($6)),c=Client.pushContext($6),Main.update(Client.CUI(),Client.Props(),Client.Questions(),Client.Responses(),c)):Client.CUI().Wait((b=null,Concurrency.Delay(function()
   {
    Client.set_ClientState({
     $:1,
     $0:ClientState.LangOp
    });
    return Concurrency.Combine(Concurrency.Bind((new AjaxRemotingProvider.New()).Async("SMApp.Web:SMApp.Web.Server.GetMeaning:-301318401",[command]),function(a$5)
    {
     var a$6,m,c$1;
     a$6=Text.HasMeaning(a$5);
     return a$6!=null&&a$6.$==1?(m=a$6.$0,(Client.debug(((((Runtime.Curried(function($7,$8,$9,$10)
     {
      return $7("Text: "+SMApp$Web_GeneratedPrintf.p($8)+" "+SMApp$Web_GeneratedPrintf.p$3($9)+" "+SMApp$Web_GeneratedPrintf.p$5($10));
     },4))(Global.id))(m.get_Intent()))(m.get_Trait()))(m.get_Entities())),c$1=Client.pushContext(m),Main.update(Client.CUI(),Client.Props(),Client.Questions(),Client.Responses(),c$1),Concurrency.Zero())):(Client.debug("Text: Did not receive a meaning from the server."),Client["say'"]("Sorry I did not understand what you said."),Concurrency.Zero());
    }),Concurrency.Delay(function()
    {
     Client.set_ClientState(null);
     return Concurrency.Zero();
    }));
   })));
  }
  SC$5.CUI=CUI$1.New(null,null,null,false,false);
  SC$5.MicState=MicState.MicNotInitialized;
  SC$5.ClientState=null;
  SC$5.Props=new Dictionary.New$5();
  SC$5.Context=[];
  SC$5.Questions=[];
  SC$5.Responses=[];
  SC$5.synth=Global.speechSynthesis;
  SC$5.container=Controls.Container;
  SC$5.Main=new Interpreter({
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
   },(r={},r.name="Main",r.greetings="Welcome to Selma. Enter 'hello my name is...(you)' to begin and initialize speech or help for more assistance.",r.prompt=">",r)]
  });
 };
 SMApp$Web_GeneratedPrintf.p$8=function($1)
 {
  return"Question ("+SMApp$Web_GeneratedPrintf.p$7($1.$0)+", "+Utils.prettyPrint($1.$1)+")";
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
  return"Trait ("+Utils.prettyPrint($1.$0)+", "+Utils.prettyPrint($1.$1)+")";
 };
 SMApp$Web_GeneratedPrintf.p$3=function($1)
 {
  return $1==null?"null":"Some "+SMApp$Web_GeneratedPrintf.p$4($1.$0);
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
  return"Meaning ("+SMApp$Web_GeneratedPrintf.p($1.$0)+", "+SMApp$Web_GeneratedPrintf.p$3($1.$1)+", "+SMApp$Web_GeneratedPrintf.p$5($1.$2)+")";
 };
}());
