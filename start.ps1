# 🚀 Script de Inicialização do Projeto NestFin
Write-Host "🚀 Iniciando Projeto NestFin..." -ForegroundColor Green
Write-Host ""

# Instalar dependências do backend
Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Yellow
Set-Location backend
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do backend" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Instalar dependências do frontend
Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
Set-Location ../web
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Iniciando serviços..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue
Write-Host ""

# Iniciar backend
Write-Host "Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; dotnet run"

# Aguardar um pouco
Start-Sleep -Seconds 5

# Iniciar frontend
Write-Host "Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\web'; npm run dev"

Write-Host ""
Write-Host "✅ Projeto iniciado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Read-Host "Pressione Enter para sair"
