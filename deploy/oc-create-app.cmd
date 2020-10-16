@echo off
REM oc delete bc selma
REM oc delete dc selma
REM oc delete svc selma

REM cd C:\Projects\SMApp\src\SMApp.Web

REM dotnet publish -c Debug /p:MicrosoftNETPlatformLibrary=Microsoft.NETCore.App
REM oc new-build --name=selma dotnet:2.2 --binary=true
REM oc start-build selma --from-dir=bin\Debug\netcoreapp2.2\publish
REM oc new-app selma:latest -e PGSQL=172.30.56.108
REM oc expose svc/selma