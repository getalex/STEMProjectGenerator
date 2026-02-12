#Requires -Version 3.0

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "STEM Project Generator - Quick Start" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please download and install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Setting up backend..." -ForegroundColor Cyan
Push-Location backend

# Check if node_modules exists
if (-not (Test-Path "node_modules" -PathType Container)) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

# Check for .env file
if (-not (Test-Path ".env" -PathType Leaf)) {
    Write-Host ""
    Write-Host "⚠ WARNING: .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    
    if (Test-Path ".env.example" -PathType Leaf) {
        Copy-Item ".env.example" ".env"
    }
    
    Write-Host ""
    Write-Host "Please edit backend\.env and add your OpenAI API key:" -ForegroundColor Yellow
    Write-Host "OPENAI_API_KEY=sk-your-key-here" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter after adding your API key"
}

Pop-Location

Write-Host ""
Write-Host "✓ Backend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Edit backend\.env with your OpenAI API key" -ForegroundColor White
Write-Host ""
Write-Host "2. In a terminal, run from the backend folder:" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "3. In another terminal, run from the frontend folder:" -ForegroundColor White
Write-Host "   python -m http.server 3000" -ForegroundColor Gray
Write-Host "   (or: npx http-server -p 3000)" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
