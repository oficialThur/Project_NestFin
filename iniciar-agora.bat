@echo off
echo 🚀 Iniciando Projeto NestFin...
echo.

echo 📦 Iniciando Backend...
start "Backend" cmd /k "cd /d %~dp0backend && dotnet run"

echo ⏳ Aguardando 3 segundos...
timeout /t 3 /nobreak > nul

echo 📦 Iniciando Frontend...
start "Frontend" cmd /k "cd /d %~dp0web && npm run dev"

echo.
echo ✅ Serviços iniciados!
echo.
echo 🌐 URLs de Acesso:
echo    🎨 Frontend: http://localhost:3000
echo    📊 Backend API: http://localhost:5000
echo    📚 Swagger: http://localhost:5000/swagger
echo.
echo ⏳ Aguarde alguns segundos para os serviços carregarem...
echo.
pause
