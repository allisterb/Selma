(function()
{
 "use strict";
 var Global,WebSharper,Obj,Forms,ErrorMessage,Fresh,Result,Form,Utils,Dependent,Many,ItemOperations,Fresh$1,Collection,CollectionWithDefault,Builder,Validation,Pervasives,Attr,Doc,View,SC$1,IntelliFactory,Runtime,List,Collections,Dictionary,UI,Doc$1,View$1,Var$1,Seq,Submitter,Arrays,Array,Concurrency,Unchecked,AttrProxy,AttrModule;
 Global=self;
 WebSharper=Global.WebSharper;
 Obj=WebSharper&&WebSharper.Obj;
 Forms=WebSharper.Forms=WebSharper.Forms||{};
 ErrorMessage=Forms.ErrorMessage=Forms.ErrorMessage||{};
 Fresh=Forms.Fresh=Forms.Fresh||{};
 Result=Forms.Result=Forms.Result||{};
 Form=Forms.Form=Forms.Form||{};
 Utils=Forms.Utils=Forms.Utils||{};
 Dependent=Form.Dependent=Form.Dependent||{};
 Many=Form.Many=Form.Many||{};
 ItemOperations=Many.ItemOperations=Many.ItemOperations||{};
 Fresh$1=Many.Fresh=Many.Fresh||{};
 Collection=Many.Collection=Many.Collection||{};
 CollectionWithDefault=Many.CollectionWithDefault=Many.CollectionWithDefault||{};
 Builder=Form.Builder=Form.Builder||{};
 Validation=Forms.Validation=Forms.Validation||{};
 Pervasives=Forms.Pervasives=Forms.Pervasives||{};
 Attr=Forms.Attr=Forms.Attr||{};
 Doc=Forms.Doc=Forms.Doc||{};
 View=Forms.View=Forms.View||{};
 SC$1=Global.StartupCode$WebSharper_Forms$Forms=Global.StartupCode$WebSharper_Forms$Forms||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 List=WebSharper&&WebSharper.List;
 Collections=WebSharper&&WebSharper.Collections;
 Dictionary=Collections&&Collections.Dictionary;
 UI=WebSharper&&WebSharper.UI;
 Doc$1=UI&&UI.Doc;
 View$1=UI&&UI.View;
 Var$1=UI&&UI.Var$1;
 Seq=WebSharper&&WebSharper.Seq;
 Submitter=UI&&UI.Submitter;
 Arrays=WebSharper&&WebSharper.Arrays;
 Array=UI&&UI.Array;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 AttrProxy=UI&&UI.AttrProxy;
 AttrModule=UI&&UI.AttrModule;
 ErrorMessage=Forms.ErrorMessage=Runtime.Class({},Obj,ErrorMessage);
 ErrorMessage.Create=function(p,text)
 {
  return new ErrorMessage.New(p.id,text);
 };
 ErrorMessage.Create$1=function(id,text)
 {
  return new ErrorMessage.New(id,text);
 };
 ErrorMessage.New=Runtime.Ctor(function(id,message)
 {
  Obj.New.call(this);
  this.id=id;
  this.message=message;
 },ErrorMessage);
 Fresh.Id=function()
 {
  (Fresh.lastId())[0]++;
  return"Form"+Global.String((Fresh.lastId())[0]);
 };
 Fresh.lastId=function()
 {
  SC$1.$cctor();
  return SC$1.lastId;
 };
 Result.FailWith=function(errorMessage,id)
 {
  return{
   $:1,
   $0:List.ofArray([new ErrorMessage.New(id==null?Fresh.Id():id.$0,errorMessage)])
  };
 };
 Result.Append=function(app,r1,r2)
 {
  return r1.$==0?r2.$==0?{
   $:0,
   $0:app(r1.$0,r2.$0)
  }:r2:r2.$==0?r1:{
   $:1,
   $0:List.append(r1.$0,r2.$0)
  };
 };
 Result.Bind=function(f,r)
 {
  return r.$==0?f(r.$0):{
   $:1,
   $0:r.$0
  };
 };
 Result.ApJoin=function(rf,rx)
 {
  var $1;
  return rf.$==0?(rx.$==0?rx.$0.$==0?($1=rx.$0.$0,false):($1=rx.$0.$0,true):($1=rx.$0,true))?{
   $:1,
   $0:$1
  }:{
   $:0,
   $0:rf.$0($1)
  }:rx.$==0?{
   $:1,
   $0:rf.$0
  }:{
   $:1,
   $0:List.append(rf.$0,rx.$0)
  };
 };
 Result.Apply=function(rf,rx)
 {
  return rf.$==0?rx.$==0?{
   $:0,
   $0:rf.$0(rx.$0)
  }:{
   $:1,
   $0:rx.$0
  }:rx.$==0?{
   $:1,
   $0:rf.$0
  }:{
   $:1,
   $0:List.append(rf.$0,rx.$0)
  };
 };
 Result.Map=function(f,r)
 {
  return r.$==1?{
   $:1,
   $0:r.$0
  }:{
   $:0,
   $0:f(r.$0)
  };
 };
 Result.IsFailure=function(r)
 {
  return r.$==1;
 };
 Result.IsSuccess=function(r)
 {
  return r.$!=1;
 };
 Form.New=function(id,view,render)
 {
  return{
   id:id,
   view:view,
   render:render
  };
 };
 Utils.memoize=function(f)
 {
  var d;
  d=new Dictionary.New$5();
  return function(x)
  {
   var y;
   return d.ContainsKey(x)?d.get_Item(x):(y=f(x),(d.set_Item(x,y),y));
  };
 };
 Dependent=Form.Dependent=Runtime.Class({
  RenderDependent:function(f)
  {
   return Doc$1.BindView(function(a)
   {
    return a.$==1?Doc$1.get_Empty():a.$0.render(f);
   },this.pOut);
  }
 },Obj,Dependent);
 Dependent.New=Runtime.Ctor(function(renderPrimary,pOut)
 {
  Obj.New.call(this);
  this.renderPrimary=renderPrimary;
  this.pOut=pOut;
  this.out=View$1.Bind(function(a)
  {
   return a.$==1?View$1.Const({
    $:1,
    $0:a.$0
   }):a.$0.view;
  },this.pOut);
 },Dependent);
 Dependent.Make=function(primary,dependent)
 {
  var a;
  return new Dependent.New(primary.render,View$1.Map((a=Utils.memoize(function(x)
  {
   var p;
   p=dependent(x);
   return Form.New(p.id,p.view,p.render);
  }),function(a$1)
  {
   return Result.Map(a,a$1);
  }),primary.view));
 };
 ItemOperations=Many.ItemOperations=Runtime.Class({},Obj,ItemOperations);
 ItemOperations.New=Runtime.Ctor(function(_delete,moveUp,moveDown)
 {
  Obj.New.call(this);
  this["delete"]=_delete;
  this.moveUp=moveUp;
  this.moveDown=moveDown;
 },ItemOperations);
 Fresh$1.Int=function()
 {
  SC$1.$cctor();
  return SC$1.Int;
 };
 Collection=Many.Collection=Runtime.Class({
  adderView:function(x)
  {
   x.$==0?this.add(x.$0):void 0;
   return Doc$1.get_Empty();
  },
  add:function(x)
  {
   this.arr.push(this.mk(x));
   Var$1.Update(this["var"],Global.id);
  },
  fst3:Global.id,
  mk:function(x)
  {
   var $this,ident,getThisIndexIn,vIndex,sMoveUp,vMoveUp,sMoveDown,vMoveDown,p;
   function p$1(a,a$1,j)
   {
    return ident===j;
   }
   $this=this;
   ident=(Fresh$1.Int())();
   getThisIndexIn=function(s)
   {
    return Seq.findIndex(function($1)
    {
     return p$1($1[0],$1[1],$1[2]);
    },s);
   };
   vIndex=View$1.Map(getThisIndexIn,this["var"].get_View());
   sMoveUp=new Submitter.New(View$1.Map(function(i)
   {
    return i===0?{
     $:1,
     $0:List.T.Empty
    }:{
     $:0,
     $0:true
    };
   },vIndex),Arrays.length(this.arr)===0?{
    $:1,
    $0:List.T.Empty
   }:{
    $:0,
    $0:false
   });
   vMoveUp=View$1.Map(function(a)
   {
    var i;
    if(a.$==0)
     if(a.$0)
      {
       i=getThisIndexIn($this.arr);
       Many["List`1.Swap"]($this.arr,i,i-1);
       Var$1.Update($this["var"],Global.id);
      }
   },sMoveUp.view);
   sMoveDown=new Submitter.New(View$1.Map(function(i)
   {
    return i===Arrays.length($this.arr)-1?{
     $:1,
     $0:List.T.Empty
    }:{
     $:0,
     $0:true
    };
   },vIndex),{
    $:1,
    $0:List.T.Empty
   });
   vMoveDown=View$1.Map(function(a)
   {
    var i;
    if(a.$==0)
     if(a.$0)
      {
       i=getThisIndexIn($this.arr);
       Many["List`1.Swap"]($this.arr,i,i+1);
       Var$1.Update($this["var"],Global.id);
      }
   },sMoveDown.view);
   p=this.p(x);
   return[Form.New(p.id,View$1.Map2(Global.id,p.view,View$1.Map2(function()
   {
    return null;
   },vMoveUp,vMoveDown)),p.render),new ItemOperations.New(function()
   {
    var _this,start;
    _this=$this.arr;
    start=getThisIndexIn($this.arr);
    _this.splice.apply(_this,[start,1]);
    Var$1.Update($this["var"],Global.id);
   },sMoveUp,sMoveDown),ident];
  },
  RenderAdder:function(f)
  {
   var $this,x;
   $this=this;
   x=this.adder.render(f);
   return Doc$1.Append(Doc$1.EmbedView(View$1.Map(function(x$1)
   {
    return $this.adderView(x$1);
   },this.adder.view)),x);
  },
  Render:function(f)
  {
   function a(a$2,a$3,ident)
   {
    return ident;
   }
   function a$1(p,ops,a$2)
   {
    return p.render(f(ops));
   }
   return Doc$1.ConvertBy(function($1)
   {
    return a($1[0],$1[1],$1[2]);
   },function($1)
   {
    return a$1($1[0],$1[1],$1[2]);
   },this.changesView);
  }
 },Obj,Collection);
 Collection.New=Runtime.Ctor(function(p,inits,adder)
 {
  var $this,g,o;
  function f(x)
  {
   return $this.mk(x);
  }
  $this=this;
  Obj.New.call(this);
  this.p=p;
  this.adder=adder;
  this.arr=[];
  this["var"]=Var$1.Create$1(this.arr);
  Seq.iter((g=(o=this.arr,function(a)
  {
   o.push(a);
  }),function(x)
  {
   return g(f(x));
  }),inits);
  this.changesView=View$1.Bind(function(arr)
  {
   var x;
   x=arr.slice();
   return Array.MapTreeReduce(function(x$1)
   {
    return View$1.Map(function()
    {
     return[x$1];
    },$this.fst3(x$1[0],x$1[1],x$1[2]).view);
   },View$1.Const([]),function(a,a$1)
   {
    return View$1.Map2(Seq.append,a,a$1);
   },x);
  },this["var"].get_View());
  this.out=View$1.Bind(function(s)
  {
   var x,d,r;
   function m(p$1,a$1,a$2)
   {
    function a$3(v)
    {
     return[v];
    }
    return View$1.Map(function(a$4)
    {
     return Result.Map(a$3,a$4);
    },p$1.view);
   }
   function a(a$1,a$2)
   {
    return Result.Append(Seq.append,a$1,a$2);
   }
   x=s.slice();
   d=View$1.Const({
    $:0,
    $0:[]
   });
   r=(Runtime.Curried3(View$1.Map2))(a);
   return Array.MapTreeReduce(function($1)
   {
    return m($1[0],$1[1],$1[2]);
   },d,function($1,$2)
   {
    return(r($1))($2);
   },x);
  },this["var"].get_View());
 },Collection);
 CollectionWithDefault=Many.CollectionWithDefault=Runtime.Class({
  AddOne:function()
  {
   this.add(this["default"]);
  }
 },Collection,CollectionWithDefault);
 CollectionWithDefault.New=Runtime.Ctor(function(p,inits,pInit,_default)
 {
  Collection.New.call(this,p,inits,pInit);
  this["default"]=_default;
 },CollectionWithDefault);
 Many["List`1.Swap"]=function(_this,i,j)
 {
  var tmp;
  tmp=Arrays.get(_this,i);
  Arrays.set(_this,i,Arrays.get(_this,j));
  Arrays.set(_this,j,tmp);
 };
 Builder.Do={
  $:0
 };
 Form.Dependent$1=function(primary,dependent)
 {
  var d;
  d=Dependent.Make(primary,dependent);
  return Form.New(Fresh.Id(),d.out,function(f)
  {
   return f(d);
  });
 };
 Form.Many$1=function(init,addValue,itemForm)
 {
  var m;
  m=new CollectionWithDefault.New(itemForm,init,itemForm(addValue),addValue);
  return Form.New(Fresh.Id(),m.out,function(f)
  {
   return f(m);
  });
 };
 Form.ManyForm=function(init,addForm,itemForm)
 {
  var m;
  m=new Collection.New(itemForm,init,addForm);
  return Form.New(Fresh.Id(),m.out,function(f)
  {
   return f(m);
  });
 };
 Form.RunResult=function(f,p)
 {
  return Form.MapResult(function(x)
  {
   f(x);
   return x;
  },p);
 };
 Form.Run=function(f,p)
 {
  return Form.Map(function(x)
  {
   f(x);
   return x;
  },p);
 };
 Form.FlushErrors=function(p)
 {
  return Form.MapResult(function(a)
  {
   return a.$==1?{
    $:1,
    $0:List.T.Empty
   }:a;
  },p);
 };
 Form.MapRenderArgs=function(f,p)
 {
  return Form.New(p.id,p.view,function(g)
  {
   return g(p.render(f));
  });
 };
 Form.MapAsync=function(f,p)
 {
  return Form.MapAsyncResult(function(x)
  {
   var m,b,x$1,b$1;
   return x.$==1?(m=x.$0,(b=null,Concurrency.Delay(function()
   {
    return Concurrency.Return({
     $:1,
     $0:m
    });
   }))):(x$1=x.$0,(b$1=null,Concurrency.Delay(function()
   {
    return Concurrency.Bind(f(x$1),function(a)
    {
     return Concurrency.Return({
      $:0,
      $0:a
     });
    });
   })));
  },p);
 };
 Form.MapToAsyncResult=function(f,p)
 {
  return Form.MapAsyncResult(function(x)
  {
   var m,b,x$1,b$1;
   return x.$==1?(m=x.$0,(b=null,Concurrency.Delay(function()
   {
    return Concurrency.Return({
     $:1,
     $0:m
    });
   }))):(x$1=x.$0,(b$1=null,Concurrency.Delay(function()
   {
    return f(x$1);
   })));
  },p);
 };
 Form.MapAsyncResult=function(f,p)
 {
  return Form.New(p.id,View$1.MapAsync(f,p.view),p.render);
 };
 Form.Map=function(f,p)
 {
  return Form.MapResult(function(a)
  {
   return Result.Map(f,a);
  },p);
 };
 Form.MapToResult=function(f,p)
 {
  return Form.MapResult(function(a)
  {
   return Result.Bind(f,a);
  },p);
 };
 Form.MapResult=function(f,p)
 {
  return Form.New(p.id,View$1.Map(f,p.view),p.render);
 };
 Form.TransmitViewMap=function(f,p)
 {
  return Form.TransmitViewMapResult(function(a)
  {
   return Result.Map(f,a);
  },p);
 };
 Form.TransmitViewMapResult=function(f,p)
 {
  return Form.New(p.id,p.view,function(x)
  {
   return(p.render(x))(View$1.Map(f,p.view));
  });
 };
 Form.TransmitView=function(p)
 {
  return Form.New(p.id,p.view,function(x)
  {
   return(p.render(x))(p.view);
  });
 };
 Form.WithSubmit=function(p)
 {
  var submitter;
  submitter=new Submitter.New(p.view,{
   $:1,
   $0:List.T.Empty
  });
  return Form.New(Fresh.Id(),submitter.view,function(r)
  {
   return(p.render(r))(submitter);
  });
 };
 Form.ApJoin=function(pf,px)
 {
  var f,g;
  return Form.New(Fresh.Id(),View$1.Map2(Result.ApJoin,pf.view,px.view),(f=pf.render,(g=px.render,function(x)
  {
   return g(f(x));
  })));
 };
 Form.Apply=function(pf,px)
 {
  var f,g;
  return Form.New(Fresh.Id(),View$1.Map2(Result.Apply,pf.view,px.view),(f=pf.render,(g=px.render,function(x)
  {
   return g(f(x));
  })));
 };
 Form.YieldOption=function(init,noneValue)
 {
  var _var;
  _var=Var$1.Create$1(init==null?noneValue:init.$0);
  return Form.New(_var.get_Id(),View$1.Map(function(x)
  {
   return{
    $:0,
    $0:Unchecked.Equals(x,noneValue)?null:{
     $:1,
     $0:x
    }
   };
  },_var.get_View()),function(r)
  {
   return r(_var);
  });
 };
 Form.YieldFailure=function()
 {
  var _var,view;
  _var=Var$1.Create$1(void 0);
  view=_var.get_View();
  return Form.New(_var.get_Id(),View$1.SnapshotOn({
   $:1,
   $0:List.T.Empty
  },view,View$1.Map(function(a)
  {
   return{
    $:0,
    $0:a
   };
  },view)),function(r)
  {
   return r(_var);
  });
 };
 Form.Yield=function(init)
 {
  return Form.YieldVar(Var$1.Create$1(init));
 };
 Form.YieldVar=function(_var)
 {
  return Form.New(_var.get_Id(),View$1.Map(function(a)
  {
   return{
    $:0,
    $0:a
   };
  },_var.get_View()),function(r)
  {
   return r(_var);
  });
 };
 Form.ReturnFailure=function()
 {
  return Form.New(Fresh.Id(),View$1.Const({
   $:1,
   $0:List.T.Empty
  }),Global.id);
 };
 Form.Return=function(value)
 {
  return Form.New(Fresh.Id(),View$1.Const({
   $:0,
   $0:value
  }),Global.id);
 };
 Form.Render=function(renderFunction,p)
 {
  var x;
  x=p.render(renderFunction);
  return Doc$1.Append(Doc$1.EmbedView(View$1.Map(function()
  {
   return Doc$1.get_Empty();
  },p.view)),x);
 };
 Form.Create=function(view,renderBuilder)
 {
  return Form.New(Fresh.Id(),view,renderBuilder);
 };
 Validation.MapValidCheckedInput=function(msg,p)
 {
  return Form.MapResult(function(res)
  {
   return res.$==1?{
    $:1,
    $0:res.$0
   }:res.$0.$==0?{
    $:0,
    $0:res.$0.$0
   }:{
    $:1,
    $0:List.ofArray([ErrorMessage.Create(p,msg)])
   };
  },p);
 };
 Validation.IsMatch=function(regexp,msg,p)
 {
  var o;
  return Validation.Is((o=new Global.RegExp(regexp),function(a)
  {
   return o.test(a);
  }),msg,p);
 };
 Validation.IsNotEmpty=function(msg,p)
 {
  return Validation.Is(function(x)
  {
   return x!=="";
  },msg,p);
 };
 Validation.Is=function(pred,msg,p)
 {
  return Form.MapResult(function(res)
  {
   return res.$==1?res:pred(res.$0)?res:{
    $:1,
    $0:List.ofArray([new ErrorMessage.New(p.id,msg)])
   };
  },p);
 };
 Pervasives.op_LessMultiplyQmarkGreater=function(pf,px)
 {
  return Form.ApJoin(pf,px);
 };
 Pervasives.op_LessMultiplyGreater=function(pf,px)
 {
  return Form.Apply(pf,px);
 };
 Attr.SubmitterValidate=function(submitter)
 {
  var view;
  return AttrProxy.Append(AttrModule.Handler("click",function()
  {
   return function()
   {
    return submitter.Trigger();
   };
  }),(view=View$1.Const("disabled"),AttrModule.DynamicPred("disabled",View$1.Map(Result.IsFailure,submitter.input),view)));
 };
 Doc.ShowSuccess=function(v,f)
 {
  return Doc$1.BindView(function(a)
  {
   return a.$==1?Doc$1.get_Empty():f(a.$0);
  },v);
 };
 Doc.ShowErrors=function(v,f)
 {
  return Doc$1.BindView(function(a)
  {
   return a.$==1?f(a.$0):Doc$1.get_Empty();
  },v);
 };
 Doc.ButtonValidate=function(caption,attrs,submitter)
 {
  return Doc$1.Element("button",Seq.append([Attr.SubmitterValidate(submitter)],attrs),[Doc$1.TextNode(caption)]);
 };
 View.Through=function(input,p)
 {
  return View$1.Map(function(x)
  {
   return x.$==1?{
    $:1,
    $0:List.filter(function(m)
    {
     return m.id===p.id;
    },x.$0)
   }:x;
  },input);
 };
 View.Through$1=function(input,v)
 {
  return View$1.Map(function(x)
  {
   return x.$==1?{
    $:1,
    $0:List.filter(function(m)
    {
     return m.id===v.get_Id();
    },x.$0)
   }:x;
  },input);
 };
 SC$1.$cctor=function()
 {
  var x;
  SC$1.$cctor=Global.ignore;
  SC$1.lastId=[0];
  SC$1.Int=(x=[0],function()
  {
   x[0]++;
   return x[0];
  });
 };
}());
