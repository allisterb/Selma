namespace SMApp

open System

/// Basic user information for authentication and authorization
type User = {
    Id: int64
    UserName: string
}
/// A r
type Resource = {
    Name :string
    Description :string
    Url: Uri option
}



