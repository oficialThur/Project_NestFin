# 🚀 Script Simples para Executar o NestFin
Write-Host "🚀 Executando NestFin de forma simples..." -ForegroundColor Green
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
Write-Host "🔧 Configurando backend..." -ForegroundColor Cyan

# Navegar para backend
Set-Location backend

# Restaurar dependências
Write-Host "📦 Restaurando dependências do backend..." -ForegroundColor Yellow
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao restaurar dependências do backend" -ForegroundColor Red
    Write-Host "   Verifique se o .NET está instalado corretamente" -ForegroundColor Gray
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
Write-Host "🗄️ Executando migrações..." -ForegroundColor Yellow
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Erro nas migrações, mas continuando..." -ForegroundColor Yellow
    Write-Host "   Verifique se o MySQL está rodando e o banco NestFin existe" -ForegroundColor Gray
}

Write-Host "✅ Backend configurado!" -ForegroundColor Green

# Voltar para raiz
Set-Location ..

Write-Host ""
Write-Host "🎨 Configurando frontend..." -ForegroundColor Cyan

# Navegar para web
Set-Location web

# Instalar dependências
Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    Write-Host "   Verifique se o Node.js está instalado corretamente" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Frontend configurado!" -ForegroundColor Green

# Voltar para raiz
Set-Location ..

Write-Host ""
Write-Host "🚀 Iniciando serviços..." -ForegroundColor Cyan

# Iniciar backend
Write-Host "📊 Iniciando backend na porta 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🚀 Backend NestFin iniciando...' -ForegroundColor Green; dotnet run" -WindowStyle Normal

# Aguardar um pouco
Start-Sleep -Seconds 5

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
Write-Host "📊 Configuração do Banco:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: NestFin" -ForegroundColor White
Write-Host "   👤 User: root" -ForegroundColor White
Write-Host "   🔑 Password: amordemae" -ForegroundColor White

Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem..." -ForegroundColor Yellow
Write-Host "   Depois acesse http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
