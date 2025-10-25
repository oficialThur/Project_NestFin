# 🗄️ Script para Conectar ao MySQL Local
Write-Host "🗄️ Conectando ao MySQL Local - NestFin..." -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "backend")) {
    Write-Host "❌ Diretório 'backend' não encontrado!" -ForegroundColor Red
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
Write-Host "🔍 Verificando conexão com MySQL..." -ForegroundColor Yellow

# Testar conexão com MySQL
try {
    mysql -h localhost -u root -pAmordemae2602 -e "USE nestfin; SHOW TABLES;" 2>$null
    Write-Host "✅ Conexão com MySQL OK!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Não foi possível testar conexão automaticamente" -ForegroundColor Yellow
    Write-Host "   Verifique se o MySQL está rodando e acessível" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📦 Configurando backend..." -ForegroundColor Cyan

# Navegar para backend
Set-Location backend

# Restaurar dependências
Write-Host "📦 Restaurando dependências..." -ForegroundColor Yellow
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao restaurar dependências" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Instalar Entity Framework se necessário
try {
    dotnet ef --version | Out-Null
    Write-Host "✅ Entity Framework encontrado" -ForegroundColor Green
} catch {
    Write-Host "📦 Instalando Entity Framework..." -ForegroundColor Yellow
    dotnet tool install --global dotnet-ef
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar Entity Framework" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# Executar migrações
Write-Host "🚀 Executando migrações no banco 'nestfin'..." -ForegroundColor Yellow
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao executar migrações" -ForegroundColor Red
    Write-Host "   Verifique se:" -ForegroundColor Gray
    Write-Host "   - MySQL está rodando" -ForegroundColor Gray
    Write-Host "   - Banco 'nestfin' existe" -ForegroundColor Gray
    Write-Host "   - Usuário 'root' tem acesso" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Migrações executadas com sucesso!" -ForegroundColor Green

# Voltar para raiz
Set-Location ..

Write-Host ""
Write-Host "📦 Configurando frontend..." -ForegroundColor Cyan

# Navegar para web
Set-Location web

# Instalar dependências
Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Frontend configurado!" -ForegroundColor Green

# Voltar para raiz
Set-Location ..

Write-Host ""
Write-Host "🚀 Iniciando serviços..." -ForegroundColor Cyan

# Iniciar backend
Write-Host "📊 Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🚀 Backend NestFin iniciando...' -ForegroundColor Green; dotnet run" -WindowStyle Normal

# Aguardar um pouco
Start-Sleep -Seconds 5

# Iniciar frontend
Write-Host "🎨 Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\web'; Write-Host '🚀 Frontend NestFin iniciando...' -ForegroundColor Green; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Projeto NestFin conectado ao MySQL local!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend API: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue

Write-Host ""
Write-Host "📊 Informações da Conexão:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: nestfin" -ForegroundColor White
Write-Host "   👤 User: root" -ForegroundColor White
Write-Host "   🔑 Password: Amordemae2602" -ForegroundColor White

Write-Host ""
Write-Host "📊 Tabelas criadas no banco 'nestfin':" -ForegroundColor Cyan
Write-Host "   👤 Users - Usuários do sistema" -ForegroundColor White
Write-Host "   📝 PersonalInfos - Informações pessoais" -ForegroundColor White
Write-Host "   🎯 Goals - Metas financeiras" -ForegroundColor White
Write-Host "   💰 Transactions - Transações financeiras" -ForegroundColor White

Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 NestFin conectado ao seu MySQL local!" -ForegroundColor Green
Write-Host ""
Read-Host "Pressione Enter para sair"
