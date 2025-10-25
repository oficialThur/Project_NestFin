@echo off
echo 🚀 Iniciando Projeto NestFin...
echo.

echo 📦 Instalando dependências do backend...
cd backend
dotnet restore
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências do backend
    pause
    exit /b 1
)

echo 📦 Instalando dependências do frontend...
cd ../web
npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências do frontend
    pause
    exit /b 1
)

echo.
echo ✅ Dependências instaladas com sucesso!
echo.
echo 🌐 Iniciando serviços...
echo.
echo 📊 Backend: http://localhost:5000
echo 🎨 Frontend: http://localhost:3000
echo 📚 Swagger: http://localhost:5000/swagger
echo.

echo Iniciando backend em segundo plano...
start "Backend" cmd /k "cd backend && dotnet run"

echo Aguardando 5 segundos...
timeout /t 5 /nobreak > nul

echo Iniciando frontend...
start "Frontend" cmd /k "cd web && npm run dev"

echo.
echo ✅ Projeto iniciado com sucesso!
echo.
echo 🌐 Acesse: http://localhost:3000
echo.
pause
