namespace SMApp.Web

open System

open WebSharper
/// Basic user information for authentication and authorization
[<JavaScript>]
type User = {
    UserName: string
}

/// A r
[<JavaScript>]
type Resource = {
    Name :string
    Description :string
    Url: Uri option
}



