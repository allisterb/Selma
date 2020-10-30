namespace SMApp

[<AutoOpen>]
module Runtme =
    let (|Force|) (l:Lazy<_>) =
        l.Force()

    let info = Runtime.Info

    let debug = Runtime.Debug
    
    let err = Runtime.Error
    
    let beginOp = Runtime.Begin

    let infof mt args = Runtime.Info(mt, List.toArray args)

    let debugf mt args = Runtime.Debug(mt, List.toArray args)

    let errf mt args = Runtime.Error(mt, List.toArray args)

    let errex mt ex args = Runtime.Error(ex, mt, List.toArray args)
