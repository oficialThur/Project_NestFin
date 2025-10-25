# 🔍 Script para Diagnosticar Network Error
Write-Host "🔍 Diagnosticando Network Error..." -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "backend") -or !(Test-Path "web")) {
    Write-Host "❌ Diretórios 'backend' e 'web' não encontrados!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto NestFin" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "📋 Verificando serviços..." -ForegroundColor Yellow

# Verificar se o backend está rodando
Write-Host "🔍 Verificando backend (porta 5000)..." -ForegroundColor Yellow
$backendStatus = netstat -an | findstr ":5000"
if ($backendStatus) {
    Write-Host "✅ Backend está rodando na porta 5000" -ForegroundColor Green
} else {
    Write-Host "❌ Backend NÃO está rodando na porta 5000" -ForegroundColor Red
    Write-Host "   Vamos iniciar o backend..." -ForegroundColor Yellow
    
    # Iniciar backend
    Set-Location backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🚀 Iniciando Backend...' -ForegroundColor Green; dotnet run" -WindowStyle Normal
    Set-Location ..
    
    Write-Host "⏳ Aguardando backend inicializar..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

# Verificar se o frontend está rodando
Write-Host "🔍 Verificando frontend (porta 3000)..." -ForegroundColor Yellow
$frontendStatus = netstat -an | findstr ":3000"
if ($frontendStatus) {
    Write-Host "✅ Frontend está rodando na porta 3000" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend NÃO está rodando na porta 3000" -ForegroundColor Red
    Write-Host "   Vamos iniciar o frontend..." -ForegroundColor Yellow
    
    # Iniciar frontend
    Set-Location web
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🚀 Iniciando Frontend...' -ForegroundColor Green; npm run dev" -WindowStyle Normal
    Set-Location ..
    
    Write-Host "⏳ Aguardando frontend inicializar..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

Write-Host ""
Write-Host "🔍 Verificando configuração da API..." -ForegroundColor Yellow

# Verificar arquivo de configuração da API
$apiConfigPath = "web/src/lib/api.ts"
if (Test-Path $apiConfigPath) {
    Write-Host "✅ Arquivo de configuração da API encontrado" -ForegroundColor Green
    
    # Verificar conteúdo do arquivo
    $apiContent = Get-Content $apiConfigPath -Raw
    if ($apiContent -like "*localhost:5000*") {
        Write-Host "✅ API configurada para localhost:5000" -ForegroundColor Green
    } else {
        Write-Host "⚠️ API pode não estar configurada corretamente" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Arquivo de configuração da API não encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔍 Testando conectividade..." -ForegroundColor Yellow

# Testar se o backend responde
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Backend responde na porta 5000" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend não responde na porta 5000" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Gray
}

# Testar se o frontend responde
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Frontend responde na porta 3000" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend não responde na porta 3000" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🔧 Soluções para Network Error:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. ✅ Verificar se ambos os serviços estão rodando:" -ForegroundColor White
Write-Host "   - Backend: http://localhost:5000" -ForegroundColor Gray
Write-Host "   - Frontend: http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "2. ✅ Verificar configuração da API no frontend:" -ForegroundColor White
Write-Host "   - Arquivo: web/src/lib/api.ts" -ForegroundColor Gray
Write-Host "   - URL deve apontar para: http://localhost:5000" -ForegroundColor Gray
Write-Host ""
Write-Host "3. ✅ Verificar CORS no backend:" -ForegroundColor White
Write-Host "   - Deve permitir localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "4. ✅ Verificar firewall/antivírus:" -ForegroundColor White
Write-Host "   - Pode estar bloqueando as portas" -ForegroundColor Gray

Write-Host ""
Write-Host "🚀 Iniciando serviços automaticamente..." -ForegroundColor Cyan

# Iniciar backend se não estiver rodando
if (!$backendStatus) {
    Write-Host "📊 Iniciando backend..." -ForegroundColor Yellow
    Set-Location backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🚀 Backend NestFin iniciando...' -ForegroundColor Green; dotnet run" -WindowStyle Normal
    Set-Location ..
    Start-Sleep -Seconds 5
}

# Iniciar frontend se não estiver rodando
if (!$frontendStatus) {
    Write-Host "🎨 Iniciando frontend..." -ForegroundColor Yellow
    Set-Location web
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🚀 Frontend NestFin iniciando...' -ForegroundColor Green; npm run dev" -WindowStyle Normal
    Set-Location ..
    Start-Sleep -Seconds 5
}

Write-Host ""
Write-Host "✅ Diagnóstico concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs para testar:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue
Write-Host ""
Write-Host "⏳ Aguarde alguns segundos e tente cadastrar novamente!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
