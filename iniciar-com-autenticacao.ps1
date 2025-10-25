# 🚀 Script para Iniciar NestFin com Sistema de Autenticação
Write-Host "🚀 Iniciando NestFin com Autenticação..." -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "backend") -or !(Test-Path "web")) {
    Write-Host "❌ Diretórios 'backend' e 'web' não encontrados!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto NestFin" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "📋 Verificando pré-requisitos..." -ForegroundColor Yellow

# Verificar .NET
try {
    dotnet --version | Out-Null
    Write-Host "✅ .NET encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET não encontrado. Instale o .NET 8.0 SDK primeiro." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar Node.js
try {
    node --version | Out-Null
    Write-Host "✅ Node.js encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Instale o Node.js primeiro." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "🚀 Iniciando serviços..." -ForegroundColor Cyan

# Iniciar backend
Write-Host "📊 Iniciando backend na porta 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🚀 Backend NestFin iniciando...' -ForegroundColor Green; dotnet run" -WindowStyle Normal

# Aguardar um pouco
Start-Sleep -Seconds 3

# Iniciar frontend
Write-Host "🎨 Iniciando frontend na porta 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\web'; Write-Host '🚀 Frontend NestFin iniciando...' -ForegroundColor Green; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Serviços iniciados!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue

Write-Host ""
Write-Host "🔐 Sistema de Autenticação:" -ForegroundColor Cyan
Write-Host "   👤 Login obrigatório para acessar o dashboard" -ForegroundColor White
Write-Host "   📝 Cadastro com validação de email e senha forte" -ForegroundColor White
Write-Host "   🎯 Dashboard personalizado por usuário" -ForegroundColor White
Write-Host "   📊 Dados baseados nas informações do usuário logado" -ForegroundColor White

Write-Host ""
Write-Host "📊 Configuração do Banco:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: NestFin" -ForegroundColor White
Write-Host "   👤 User: root" -ForegroundColor White
Write-Host "   🔑 Password: amordemae" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Funcionalidades do Dashboard:" -ForegroundColor Cyan
Write-Host "   👤 Informações pessoais do usuário logado" -ForegroundColor White
Write-Host "   💰 Situação financeira (só aparece se preenchida)" -ForegroundColor White
Write-Host "   🎯 Progresso da meta financeira" -ForegroundColor White
Write-Host "   📊 Gráfico de economia mensal" -ForegroundColor White
Write-Host "   🔮 Projeções baseadas nos dados reais" -ForegroundColor White

Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem..." -ForegroundColor Yellow
Write-Host "   Depois acesse http://localhost:3000" -ForegroundColor Yellow
Write-Host "   Faça login ou cadastre-se para ver o dashboard personalizado!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"

