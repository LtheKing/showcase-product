@echo off
cd /d "%~dp0"

echo Checking Node.js...
for /f "delims=" %%v in ('node -v 2^>nul') do set NODEVER=%%v
if not defined NODEVER (
  echo ERROR: Node.js tidak terinstall.
  echo Unduh Node 22 LTS: https://nodejs.org/
  pause
  exit /b 1
)
echo Found: %NODEVER%

node -e "const [maj]=process.version.slice(1).split('.').map(Number);process.exit(maj>=20?0:1)" 2>nul
if errorlevel 1 (
  echo.
  echo ERROR: Next.js 15 butuh Node 20 atau lebih baru.
  echo Versi Anda: %NODEVER%
  echo Lokasi umum Node lama: C:\Program Files\nodejs
  echo.
  echo Solusi: install Node 22 LTS dari https://nodejs.org/
  echo Centang opsi untuk mengganti Node lama, lalu buka terminal baru.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)

echo Syncing img/ to public/img/...
call npm run sync-img

echo.
echo Starting http://localhost:3000
echo Tekan Ctrl+C untuk stop.
echo.
call npm run dev
