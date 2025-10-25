# 🔍 Script para Verificar se os Serviços estão Rodando
Write-Host "🔍 Verificando serviços do NestFin..." -ForegroundColor Green
Write-Host ""

# Verificar backend (porta 5000)
Write-Host "📊 Verificando Backend (porta 5000)..." -ForegroundColor Yellow
$backendStatus = netstat -an | findstr ":5000"
if ($backendStatus) {
    Write-Host "✅ Backend está rodando!" -ForegroundColor Green
    Write-Host "   URL: http://localhost:5000" -ForegroundColor Gray
    Write-Host "   Swagger: http://localhost:5000/swagger" -ForegroundColor Gray
} else {
    Write-Host "❌ Backend NÃO está rodando!" -ForegroundColor Red
    Write-Host "   Execute: cd backend && dotnet run" -ForegroundColor Gray
}

Write-Host ""

# Verificar frontend (porta 3000)
Write-Host "🎨 Verificando Frontend (porta 3000)..." -ForegroundColor Yellow
$frontendStatus = netstat -an | findstr ":3000"
if ($frontendStatus) {
    Write-Host "✅ Frontend está rodando!" -ForegroundColor Green
    Write-Host "   URL: http://localhost:3000" -ForegroundColor Gray
} else {
    Write-Host "❌ Frontend NÃO está rodando!" -ForegroundColor Red
    Write-Host "   Execute: cd web && npm run dev" -ForegroundColor Gray
}

Write-Host ""

# Verificar MySQL (porta 3306)
Write-Host "🗄️ Verificando MySQL (porta 3306)..." -ForegroundColor Yellow
$mysqlStatus = netstat -an | findstr ":3306"
if ($mysqlStatus) {
    Write-Host "✅ MySQL está rodando!" -ForegroundColor Green
    Write-Host "   Host: localhost:3306" -ForegroundColor Gray
    Write-Host "   Database: nestfin" -ForegroundColor Gray
} else {
    Write-Host "❌ MySQL NÃO está rodando!" -ForegroundColor Red
    Write-Host "   Inicie o MySQL ou execute: docker-compose up mysql -d" -ForegroundColor Gray
}

Write-Host ""

# Resumo
if ($backendStatus -and $frontendStatus) {
    Write-Host "🎉 Todos os serviços estão rodando!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
    Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
    Write-Host "   📊 Backend: http://localhost:5000" -ForegroundColor Blue
    Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue
    Write-Host ""
    Write-Host "✅ Agora você pode cadastrar sem Network Error!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Alguns serviços não estão rodando!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔧 Para resolver o Network Error:" -ForegroundColor Cyan
    Write-Host "   1. Inicie o backend: cd backend && dotnet run" -ForegroundColor White
    Write-Host "   2. Inicie o frontend: cd web && npm run dev" -ForegroundColor White
    Write-Host "   3. Aguarde alguns segundos" -ForegroundColor White
    Write-Host "   4. Tente cadastrar novamente" -ForegroundColor White
}

Write-Host ""
Read-Host "Pressione Enter para sair"



