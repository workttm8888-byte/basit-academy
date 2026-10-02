@echo off
echo ===================================================
echo        BASIT ACADEMY - LAUNCHING LIVE SERVER
echo ===================================================
echo 1. Starting Backend & Static Server on Port 3000...
start /b node server.js
timeout /t 2 /nobreak >nul
echo 2. Launching Live HTTPS Internet Tunnel...
ssh -o StrictHostKeyChecking=no -R 80:localhost:3000 nokey@localhost.run
pause
