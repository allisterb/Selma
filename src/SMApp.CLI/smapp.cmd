@echo off
@setlocal
set ERROR_CODE=0

REM dotnet ".\bin\Debug\netcoreapp2.1\SMApp.CLI.dll" %*
cd bin\Debug\net461\
"SMApp.CLI.exe" %*
goto end

:end
cd ..\..\..
exit /B %ERROR_CODE%