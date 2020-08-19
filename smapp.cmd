@echo off
@setlocal
set ERROR_CODE=0

cd src\SMApp.CLI\bin\Debug\net461
SMApp.CLI.exe %*
goto end

:end
cd ..\..\..\..
exit /B %ERROR_CODE%