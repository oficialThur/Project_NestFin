# 🗄️ Script para Executar Migrações do Banco de Dados
Write-Host "🗄️ Executando Migrações do NestFin..." -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "backend")) {
    Write-Host "❌ Diretório 'backend' não encontrado!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto NestFin" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Navegar para o diretório backend
Set-Location backend

# Verificar se dotnet está disponível
Write-Host "🔍 Verificando .NET..." -ForegroundColor Yellow
try {
    dotnet --version | Out-Null
    Write-Host "✅ .NET encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET não encontrado. Instale o .NET 8.0 SDK primeiro." -ForegroundColor Red
    Write-Host "   Download: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se Entity Framework está instalado
Write-Host "🔍 Verificando Entity Framework..." -ForegroundColor Yellow
try {
    dotnet ef --version | Out-Null
    Write-Host "✅ Entity Framework encontrado" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Entity Framework não encontrado. Instalando..." -ForegroundColor Yellow
    dotnet tool install --global dotnet-ef
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar Entity Framework" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    Write-Host "✅ Entity Framework instalado" -ForegroundColor Green
}

# Restaurar dependências
Write-Host "📦 Restaurando dependências..." -ForegroundColor Yellow
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao restaurar dependências" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host "✅ Dependências restauradas" -ForegroundColor Green

# Verificar se o banco está acessível
Write-Host "🔍 Verificando conexão com o banco..." -ForegroundColor Yellow
try {
    dotnet ef database update --dry-run
    Write-Host "✅ Conexão com banco OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro de conexão com o banco" -ForegroundColor Red
    Write-Host "   Verifique se o MySQL está rodando:" -ForegroundColor Gray
    Write-Host "   docker ps | grep mysql" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Executar migrações
Write-Host "🚀 Executando migrações..." -ForegroundColor Yellow
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao executar migrações" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Migrações executadas com sucesso!" -ForegroundColor Green

# Voltar para o diretório raiz
Set-Location ..

Write-Host ""
Write-Host "🎉 Banco de dados configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Tabelas criadas:" -ForegroundColor Cyan
Write-Host "   👤 Users - Usuários do sistema" -ForegroundColor White
Write-Host "   📝 PersonalInfos - Informações pessoais" -ForegroundColor White
Write-Host "   🎯 Goals - Metas financeiras" -ForegroundColor White
Write-Host "   💰 Transactions - Transações financeiras" -ForegroundColor White

Write-Host ""
Write-Host "🚀 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Iniciar backend: cd backend && dotnet run" -ForegroundColor Gray
Write-Host "   2. Iniciar frontend: cd web && npm run dev" -ForegroundColor Gray

Write-Host ""
Read-Host "Pressione Enter para sair"
