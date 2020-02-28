@echo off
echo Instalando packages
npm i

@echo Rodando build
npm run prd

xcopy %DEPLOYMENT_SOURCE%/public %DEPLOYMENT_TARGET% /Y