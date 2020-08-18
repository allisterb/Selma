#!/bin/bash

set -e 
cd src/SMApp.Web/
dotnet build -c "Debug" $*
cd ../../