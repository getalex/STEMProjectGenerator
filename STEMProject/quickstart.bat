@echo off
REM Quick Start Script for STEM Project Generator

echo.
echo ============================================
echo STEM Project Generator - Quick Start
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version

echo.
echo Setting up backend...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)

REM Check for .env file
if not exist .env (
    echo.
    echo ⚠ WARNING: .env file not found!
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo Please edit backend\.env and add your OpenAI API key:
    echo OPENAI_API_KEY=sk-your-key-here
    pause
)

echo.
echo ✓ Backend setup complete!
echo.
echo ============================================
echo Next Steps:
echo ============================================
echo.
echo 1. Edit backend\.env with your OpenAI API key
echo.
echo 2. In a terminal, run from the backend folder:
echo    npm start
echo.
echo 3. In another terminal, run from the frontend folder:
echo    python -m http.server 3000
echo    (or: npx http-server -p 3000)
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo ============================================
echo.
pause
