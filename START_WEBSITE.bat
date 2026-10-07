@echo off
title Porsche 911 Turbo S - Launch Server
echo ========================================================
echo   Launching Porsche 911 Turbo S Scrollytelling Experience
echo ========================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

start "" "http://localhost:3000"
call npx vite --host 0.0.0.0 --port 3000
pause
