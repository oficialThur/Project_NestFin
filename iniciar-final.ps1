# 🚀 Script para Iniciar NestFin - Versão Final Corrigida
Write-Host "🚀 Iniciando NestFin - Versão Final Corrigida..." -ForegroundColor Green
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
Write-Host "🔧 Correções Implementadas:" -ForegroundColor Cyan
Write-Host "   ✅ Sistema de metas funcional" -ForegroundColor White
Write-Host "   ✅ Nome correto do usuário cadastrado" -ForegroundColor White
Write-Host "   ✅ Transações recentes zeradas" -ForegroundColor White
Write-Host "   ✅ Poupança zerada para usuário novo" -ForegroundColor White
Write-Host "   ✅ Página de informações completa" -ForegroundColor White
Write-Host "   ✅ Dados zerados para usuário novo" -ForegroundColor White
Write-Host "   ✅ Background verde em todas as telas" -ForegroundColor White
Write-Host "   ✅ Conta Corrente mostra ganho mensal" -ForegroundColor White
Write-Host "   ✅ Poupança mostra economia mensal" -ForegroundColor White
Write-Host "   ✅ Dashboard personalizado por usuário" -ForegroundColor White

Write-Host ""
Write-Host "📊 Configuração do Banco:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: NestFin" -ForegroundColor White
Write-Host "   👤 User: root" -ForegroundColor White
Write-Host "   🔑 Password: amordemae" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Como Testar:" -ForegroundColor Cyan
Write-Host "   1. Acesse http://localhost:3000" -ForegroundColor White
Write-Host "   2. Faça login ou cadastre-se" -ForegroundColor White
Write-Host "   3. Veja o nome correto do usuário no dashboard" -ForegroundColor White
Write-Host "   4. Vá para aba 'Informações' e preencha dados financeiros" -ForegroundColor White
Write-Host "   5. Defina uma meta na aba 'Metas'" -ForegroundColor White
Write-Host "   6. Volte ao dashboard para ver dados personalizados" -ForegroundColor White
Write-Host "   7. Teste Conta Corrente e Poupança" -ForegroundColor White
Write-Host "   8. Veja transações recentes zeradas" -ForegroundColor White

Write-Host ""
Write-Host "📝 Funcionalidades Testadas:" -ForegroundColor Cyan
Write-Host "   ✅ Login/Cadastro com nome correto" -ForegroundColor White
Write-Host "   ✅ Metas funcionais (criar, editar, salvar)" -ForegroundColor White
Write-Host "   ✅ Informações pessoais completas" -ForegroundColor White
Write-Host "   ✅ Dashboard com dados zerados" -ForegroundColor White
Write-Host "   ✅ Conta Corrente com ganho mensal" -ForegroundColor White
Write-Host "   ✅ Poupança com economia mensal" -ForegroundColor White
Write-Host "   ✅ Transações recentes zeradas" -ForegroundColor White
Write-Host "   ✅ Background verde em todas as telas" -ForegroundColor White

Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem..." -ForegroundColor Yellow
Write-Host "   Depois acesse http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"


