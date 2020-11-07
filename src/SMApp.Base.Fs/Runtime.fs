namespace SMApp

[<AutoOpen>]
module Runtme =
    let isVal = Option.isSome

    let mapa f xAsync = async {
        // get the contents of xAsync 
        let! x = xAsync 
        // apply the function and lift the result
        return f x
    }

    let retna x = async {
        // lift x to an Async
        return x
    }

    let applya fAsync xAsync = async {
        // start the two asyncs in parallel
        let! fChild = Async.StartChild fAsync
        let! xChild = Async.StartChild xAsync

        // wait for the results
        let! f = fChild
        let! x = xChild 

        // apply the function to the results
        return f x 
    }

    let binda f xAsync = async {
        // get the contents of xAsync 
        let! x = xAsync 
        // apply the function but don't lift the result
        // as f will return an Async
        return! f x
    }

    let await = Async.AwaitTask

    let info = Runtime.Info

    let debug = Runtime.Debug
    
    let err = Runtime.Error
    
    let beginOp = Runtime.Begin

    let infof mt args = Runtime.Info(mt, List.toArray args)

    let debugf mt args = Runtime.Debug(mt, List.toArray args)

    let errf mt args = Runtime.Error(mt, List.toArray args)

    let errex mt ex args = Runtime.Error(ex, mt, List.toArray args)
