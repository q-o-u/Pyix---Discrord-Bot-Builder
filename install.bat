@echo off
title Pyix Bot Builder - Installer
color 0A

echo ============================================
echo        Pyix Bot Builder - Installer
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing Node.js, run this script again.
    echo.
    pause
    exit /b 1
)

:: Show Node.js version
echo [OK] Node.js found:
node -v
echo.

:: Show npm version
echo [OK] npm found:
call npm -v
echo.

:: Install main project dependencies (discord.js + electron)
echo ============================================
echo  Installing project dependencies...
echo ============================================
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)
echo.
echo [OK] Project dependencies installed.
echo.

echo ============================================
echo        Installation Complete!
echo ============================================
echo.
echo To start the app:
echo   npm start
echo.
pause
