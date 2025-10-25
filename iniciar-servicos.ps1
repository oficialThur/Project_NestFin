# 🚀 Script para Iniciar Serviços do NestFin
Write-Host "🚀 Iniciando Serviços do NestFin..." -ForegroundColor Green
Write-Host ""

# Função para verificar se uma porta está em uso
function Test-Port {
    param([int]$Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $connection -ne $null
}

# Verificar se as portas estão livres
Write-Host "🔍 Verificando portas..." -ForegroundColor Yellow
if (Test-Port 5000) {
    Write-Host "❌ Porta 5000 (Backend) já está em uso" -ForegroundColor Red
    Write-Host "   Execute: netstat -ano | findstr :5000" -ForegroundColor Gray
    Write-Host "   Para ver qual processo está usando a porta" -ForegroundColor Gray
}

if (Test-Port 3000) {
    Write-Host "❌ Porta 3000 (Frontend) já está em uso" -ForegroundColor Red
    Write-Host "   Execute: netstat -ano | findstr :3000" -ForegroundColor Gray
    Write-Host "   Para ver qual processo está usando a porta" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📦 Verificando dependências..." -ForegroundColor Yellow

# Verificar se o backend tem as dependências
Write-Host "   Backend (.NET)..." -ForegroundColor Gray
Set-Location backend
if (Test-Path "NestFin.API.csproj") {
    Write-Host "   ✅ Projeto backend encontrado" -ForegroundColor Green
    dotnet restore --verbosity quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Dependências do backend OK" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Erro ao restaurar dependências do backend" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ Projeto backend não encontrado" -ForegroundColor Red
}

# Verificar se o frontend tem as dependências
Write-Host "   Frontend (Next.js)..." -ForegroundColor Gray
Set-Location ../web
if (Test-Path "package.json") {
    Write-Host "   ✅ Projeto frontend encontrado" -ForegroundColor Green
    if (Test-Path "node_modules") {
        Write-Host "   ✅ Dependências do frontend OK" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ Instalando dependências do frontend..." -ForegroundColor Yellow
        npm install --silent
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ Dependências do frontend instaladas" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
        }
    }
} else {
    Write-Host "   ❌ Projeto frontend não encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "🚀 Iniciando serviços..." -ForegroundColor Cyan

# Iniciar backend
Write-Host "   Iniciando Backend (porta 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🚀 Backend iniciando...' -ForegroundColor Green; dotnet run" -WindowStyle Normal

# Aguardar um pouco
Write-Host "   Aguardando 3 segundos..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Iniciar frontend
Write-Host "   Iniciando Frontend (porta 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\web'; Write-Host '🚀 Frontend iniciando...' -ForegroundColor Green; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Serviços iniciados!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend API: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue
Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem completamente..." -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
