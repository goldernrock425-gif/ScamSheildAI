@echo off
title ScamShield AI - Multi-User Server
color 0A
echo ========================================================
echo        STARTING SCAMSHIELD AI MULTI-USER SERVER
echo ========================================================
echo.
echo Checking Python environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo You can still open index.html directly in any browser.
    pause
    exit /b
)

echo Starting server on port 8000...
echo All users on your Wi-Fi network can connect to this IP!
echo.
python server.py
pause
