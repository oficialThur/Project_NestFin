# 🔧 Script para Corrigir e Executar o Backend
Write-Host "🔧 Corrigindo e executando o backend..." -ForegroundColor Green
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
Write-Host "🔧 Corrigindo problemas..." -ForegroundColor Cyan

# Navegar para backend
Set-Location backend

# Limpar build anterior
Write-Host "🧹 Limpando build anterior..." -ForegroundColor Yellow
dotnet clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Erro ao limpar, continuando..." -ForegroundColor Yellow
}

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

# Executar o backend
Write-Host "🚀 Iniciando backend..." -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Backend iniciando na porta 5000..." -ForegroundColor Green
Write-Host "   URL: http://localhost:5000" -ForegroundColor Gray
Write-Host "   Swagger: http://localhost:5000/swagger" -ForegroundColor Gray
Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para o backend carregar..." -ForegroundColor Yellow
Write-Host ""

# Executar o backend
dotnet run
