namespace SMApp

open System

type Resource = {
    Name :string
    Description :string
    Url: Uri option
}

type User = {
    Id: int64
    UserName: string
}

