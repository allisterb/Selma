namespace SMApp

open System

open WebSharper

[<JavaScript; AutoOpen>]
module Models =
    type Identifier =
        | Id of uint64
        | Uuid of Guid
        | String of string

    type Sex =
        | Male
        | Female
        | Intersex

    type Address = {Street: string; Town: string; }

    type Name = {First: string option; Last: string option}

    type Patient = {
        Id: Identifier    
        Sex: Sex option
        Address: Address option 
    }

    type Skill =
        | PainManagement
        | FatigueManagement
        | BreathingManagement
        | EmotionsManagement
        | Nutrition
        | Exercise
        | SleepManagement
    