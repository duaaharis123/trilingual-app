@echo off
setlocal
if not exist "C:\gradle" mkdir "C:\gradle"
if not exist "C:\tmp" mkdir "C:\tmp"
set GRADLE_USER_HOME=C:\gradle
set TEMP=C:\tmp
set TMP=C:\tmp
cd /d "%~dp0.."
call npm.cmd run android -- %*
