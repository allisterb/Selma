namespace SMApp

[<AutoOpen>]
module Api =
    let info = Api.Info

    let debug = Api.Debug
    
    let err = Api.Error
    
    let beginOp = Api.Begin

    let infof mt args = Api.Info(mt, List.toArray args)

    let debugf mt args = Api.Debug(mt, List.toArray args)

    let errf mt args = Api.Error(mt, List.toArray args)

    let errex mt args = Api.Error(mt, List.toArray args)

