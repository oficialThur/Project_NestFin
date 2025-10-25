# 🚀 Script Completo para Iniciar o NestFin
Write-Host "🚀 Iniciando Projeto NestFin Completo..." -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "backend") -or !(Test-Path "web")) {
    Write-Host "❌ Diretórios 'backend' e 'web' não encontrados!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto NestFin" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "📋 Verificando pré-requisitos..." -ForegroundColor Yellow

# Verificar Docker
try {
    docker --version | Out-Null
    Write-Host "✅ Docker encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não encontrado. Instale o Docker Desktop primeiro." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

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
Write-Host "🐳 Iniciando banco de dados MySQL..." -ForegroundColor Cyan

# Parar containers existentes
docker-compose down 2>$null

# Iniciar MySQL
docker-compose up mysql -d

# Aguardar MySQL inicializar
Write-Host "⏳ Aguardando MySQL inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Verificar MySQL
$mysqlStatus = docker ps --filter "name=nestfin-mysql" --format "table {{.Status}}"
if ($mysqlStatus -like "*Up*") {
    Write-Host "✅ MySQL está rodando!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao iniciar MySQL" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "🗄️ Configurando banco de dados..." -ForegroundColor Cyan

# Navegar para backend
Set-Location backend

# Restaurar dependências
Write-Host "📦 Restaurando dependências do backend..." -ForegroundColor Yellow
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao restaurar dependências do backend" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Instalar Entity Framework se necessário
try {
    dotnet ef --version | Out-Null
} catch {
    Write-Host "📦 Instalando Entity Framework..." -ForegroundColor Yellow
    dotnet tool install --global dotnet-ef
}

# Executar migrações
Write-Host "🚀 Executando migrações..." -ForegroundColor Yellow
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao executar migrações" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Banco de dados configurado!" -ForegroundColor Green

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
Write-Host "✅ Projeto NestFin iniciado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend API: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue
Write-Host "   🗄️ MySQL: localhost:3306" -ForegroundColor Blue

Write-Host ""
Write-Host "📊 Informações do Banco:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: nestfin_db" -ForegroundColor White
Write-Host "   👤 User: nestfin_user" -ForegroundColor White
Write-Host "   🔑 Password: nestfin_pass" -ForegroundColor White

Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem completamente..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Projeto NestFin está rodando!" -ForegroundColor Green
Write-Host ""
Read-Host "Pressione Enter para sair"

