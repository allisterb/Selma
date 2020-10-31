(function()
{
 "use strict";
 var Global,SMApp,Models,Sex,Address,Name,User,Patient,SymptomEntry,IntelliFactory,Runtime;
 Global=self;
 SMApp=Global.SMApp=Global.SMApp||{};
 Models=SMApp.Models=SMApp.Models||{};
 Sex=Models.Sex=Models.Sex||{};
 Address=Models.Address=Models.Address||{};
 Name=Models.Name=Models.Name||{};
 User=Models.User=Models.User||{};
 Patient=Models.Patient=Models.Patient||{};
 SymptomEntry=Models.SymptomEntry=Models.SymptomEntry||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Sex.Intersex={
  $:2
 };
 Sex.Female={
  $:1
 };
 Sex.Male={
  $:0
 };
 Address.New=function(Street,Town)
 {
  return{
   Street:Street,
   Town:Town
  };
 };
 Name.New=function(Full,First,Last)
 {
  return{
   Full:Full,
   First:First,
   Last:Last
  };
 };
 User=Models.User=Runtime.Class({
  toString:function()
  {
   return this.Name;
  },
  get_Create:function()
  {
   return User.New("",null);
  }
 },null,User);
 User.New=function(Name$1,LastLoggedIn)
 {
  return new User({
   Name:Name$1,
   LastLoggedIn:LastLoggedIn
  });
 };
 Patient.New=function(Id,Sex$1,Name$1,BirthDate,Address$1)
 {
  return{
   Id:Id,
   Sex:Sex$1,
   Name:Name$1,
   BirthDate:BirthDate,
   Address:Address$1
  };
 };
 SymptomEntry.New=function(UserName,Date,Magnitude,Location)
 {
  return{
   UserName:UserName,
   Date:Date,
   Magnitude:Magnitude,
   Location:Location
  };
 };
}());
