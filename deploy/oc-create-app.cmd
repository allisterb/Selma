@echo off
REM oc delete bc selma
REM oc delete dc selma
REM oc delete svc selma

REM cd C:\Projects\SMApp\src\Selma.Web

REM dotnet publish -c Debug /p:MicrosoftNETPlatformLibrary=Microsoft.NETCore.App
REM oc new-build --name=selma dotnet:2.2 --binary=true
oc start-build selma --from-dir=bin\Debug\netcoreapp2.2\publish
oc new-app selma -e WITAI=4DMATWRKPI5UC4ARO63CAZQSCIMWFG3X -e MONGODB=172.30.48.222 -e PGSQL=172.30.199.82
oc expose svc/selma