@echo off
REM ============================================================
REM  Canal School - one-time setup for Windows
REM  Installs Node.js (LTS) and Docker Desktop if they are missing.
REM  Right-click this file and choose "Run as administrator".
REM ============================================================
setlocal

echo.
echo ==========================================================
echo   Canal School - Windows setup
echo ==========================================================
echo.

REM --- Check for winget (Windows Package Manager) ---
where winget >nul 2>nul
if errorlevel 1 (
    echo [!] winget was not found.
    echo     Please update "App Installer" from the Microsoft Store,
    echo     or install Node.js and Docker manually:
    echo       Node.js : https://nodejs.org/en/download
    echo       Docker  : https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

REM --- Node.js ---
where node >nul 2>nul
if errorlevel 1 (
    echo [*] Installing Node.js LTS...
    winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
) else (
    echo [ok] Node.js is already installed:
    node -v
)

echo.
REM --- Docker Desktop (recommended, optional) ---
where docker >nul 2>nul
if errorlevel 1 (
    echo [*] Installing Docker Desktop ^(this is large, please be patient^)...
    winget install -e --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements
    echo.
    echo [!] After Docker installs, RESTART your computer once,
    echo     then open "Docker Desktop" so it can finish setting up.
) else (
    echo [ok] Docker is already installed:
    docker -v
)

echo.
echo ==========================================================
echo   Setup finished!
echo   - To run with Docker (easiest):   scripts\start-docker.bat
echo   - To run without Docker (dev):    scripts\start-dev.bat
echo ==========================================================
echo.
pause
