# 🔧 Script para Corrigir Backend e Conectar
Write-Host "🔧 Corrigindo Backend e Conectando..." -ForegroundColor Green
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

Write-Host ""
Write-Host "🔧 Corrigindo problemas do backend..." -ForegroundColor Cyan

# Navegar para backend
Set-Location backend

# Limpar build anterior
Write-Host "🧹 Limpando build anterior..." -ForegroundColor Yellow
dotnet clean 2>$null

# Restaurar dependências
Write-Host "📦 Restaurando dependências..." -ForegroundColor Yellow
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao restaurar dependências" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se Entity Framework está instalado
Write-Host "🔍 Verificando Entity Framework..." -ForegroundColor Yellow
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

# Tentar build
Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Yellow
dotnet build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build. Verificando problemas..." -ForegroundColor Red
    
    # Verificar se há problemas específicos
    Write-Host "🔍 Verificando erros específicos..." -ForegroundColor Yellow
    
    # Verificar se o arquivo Transaction.cs tem os usings corretos
    $transactionFile = "Models/Transaction.cs"
    if (Test-Path $transactionFile) {
        $content = Get-Content $transactionFile -Raw
        if ($content -notlike "*using System.ComponentModel.DataAnnotations.Schema*") {
            Write-Host "⚠️ Adicionando using necessário ao Transaction.cs..." -ForegroundColor Yellow
            $newContent = $content -replace "using System.ComponentModel.DataAnnotations;", "using System.ComponentModel.DataAnnotations;`nusing System.ComponentModel.DataAnnotations.Schema;"
            Set-Content $transactionFile $newContent
            Write-Host "✅ Using adicionado" -ForegroundColor Green
        }
    }
    
    # Tentar build novamente
    Write-Host "🔨 Tentando build novamente..." -ForegroundColor Yellow
    dotnet build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ainda há erros no build" -ForegroundColor Red
        Write-Host "   Verifique os erros acima e corrija manualmente" -ForegroundColor Gray
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

Write-Host "✅ Build realizado com sucesso!" -ForegroundColor Green

# Executar migrações
Write-Host "🗄️ Executando migrações..." -ForegroundColor Yellow
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Erro nas migrações, mas continuando..." -ForegroundColor Yellow
}

# Voltar para raiz
Set-Location ..

Write-Host ""
Write-Host "🚀 Iniciando backend..." -ForegroundColor Cyan

# Iniciar backend em background
Write-Host "📊 Iniciando backend na porta 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🚀 Backend NestFin iniciando...' -ForegroundColor Green; dotnet run" -WindowStyle Normal

# Aguardar um pouco
Start-Sleep -Seconds 5

# Verificar se backend está rodando
Write-Host "🔍 Verificando se backend está rodando..." -ForegroundColor Yellow
$backendStatus = netstat -an | findstr ":5000"
if ($backendStatus) {
    Write-Host "✅ Backend está rodando na porta 5000!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Backend pode não estar rodando ainda" -ForegroundColor Yellow
    Write-Host "   Aguarde alguns segundos e verifique manualmente" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎨 Iniciando frontend..." -ForegroundColor Cyan

# Navegar para web
Set-Location web

# Instalar dependências se necessário
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# Iniciar frontend
Write-Host "🎨 Iniciando frontend na porta 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🚀 Frontend NestFin iniciando...' -ForegroundColor Green; npm run dev" -WindowStyle Normal

# Voltar para raiz
Set-Location ..

# Aguardar um pouco
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "✅ Serviços iniciados!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue

Write-Host ""
Write-Host "📊 Informações da Conexão:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: nestfin" -ForegroundColor White
Write-Host "   👤 User: root" -ForegroundColor White
Write-Host "   🔑 Password: Amordemae2602" -ForegroundColor White

Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem..." -ForegroundColor Yellow
Write-Host "   Depois tente cadastrar novamente!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
