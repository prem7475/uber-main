@echo off
REM Fix Module Resolution Error - Windows Batch Script
REM This script will clean and reinstall the project

echo.
echo ========================================
echo Uber Clone - Module Resolution Fix
echo ========================================
echo.

REM Check if node_modules exists
if exist node_modules (
    echo [1/5] Removing node_modules...
    rmdir /s /q node_modules
    echo ✓ node_modules removed
) else (
    echo [1/5] node_modules not found (skipping)
)

REM Remove package-lock.json
if exist package-lock.json (
    echo [2/5] Removing package-lock.json...
    del package-lock.json
    echo ✓ package-lock.json removed
) else (
    echo [2/5] package-lock.json not found (skipping)
)

REM Clear npm cache
echo [3/5] Clearing npm cache...
call npm cache clean --force
echo ✓ npm cache cleared

REM Clear Expo cache
echo [4/5] Clearing Expo cache...
call expo cache clear
echo ✓ Expo cache cleared

REM Reinstall dependencies
echo [5/5] Installing dependencies (this may take a few minutes)...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ SUCCESS - Fix completed!
    echo ========================================
    echo.
    echo Next steps:
    echo  1. Run: npm run web:clear
    echo  2. Open: http://localhost:8081
    echo.
    echo Starting app now...
    pause
    call npm run web:clear
) else (
    echo.
    echo ========================================
    echo ✗ ERROR - Installation failed
    echo ========================================
    echo.
    echo Try these alternatives:
    echo  1. Close all terminals and VS Code
    echo  2. Run this script again
    echo  3. Or manually run:
    echo     - npm cache clean --force
    echo     - npm install
    echo     - npm run web
    echo.
    pause
)
