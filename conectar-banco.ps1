# 🗄️ Script para Conectar ao Banco de Dados NestFin
Write-Host "🗄️ Conectando ao Banco de Dados NestFin..." -ForegroundColor Green
Write-Host ""

# Verificar se Docker está instalado
Write-Host "🔍 Verificando Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "✅ Docker encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não encontrado. Instale o Docker Desktop primeiro." -ForegroundColor Red
    Write-Host "   Download: https://www.docker.com/products/docker-desktop/" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se docker-compose está disponível
Write-Host "🔍 Verificando docker-compose..." -ForegroundColor Yellow
try {
    docker-compose --version | Out-Null
    Write-Host "✅ docker-compose encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ docker-compose não encontrado" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "🚀 Iniciando banco de dados MySQL..." -ForegroundColor Cyan

# Parar containers existentes
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down 2>$null

# Iniciar apenas o MySQL
Write-Host "🐳 Iniciando MySQL..." -ForegroundColor Yellow
docker-compose up mysql -d

# Aguardar MySQL inicializar
Write-Host "⏳ Aguardando MySQL inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar se MySQL está rodando
Write-Host "🔍 Verificando status do MySQL..." -ForegroundColor Yellow
$mysqlStatus = docker ps --filter "name=nestfin-mysql" --format "table {{.Status}}"
if ($mysqlStatus -like "*Up*") {
    Write-Host "✅ MySQL está rodando!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao iniciar MySQL" -ForegroundColor Red
    Write-Host "   Verifique os logs: docker logs nestfin-mysql" -ForegroundColor Gray
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "📊 Informações de Conexão:" -ForegroundColor Cyan
Write-Host "   🏠 Host: localhost" -ForegroundColor White
Write-Host "   🔌 Porta: 3306" -ForegroundColor White
Write-Host "   🗄️ Database: nestfin_db" -ForegroundColor White
Write-Host "   👤 User: nestfin_user" -ForegroundColor White
Write-Host "   🔑 Password: nestfin_pass" -ForegroundColor White

Write-Host ""
Write-Host "🔧 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Executar migrações: cd backend && dotnet ef database update" -ForegroundColor Gray
Write-Host "   2. Iniciar backend: cd backend && dotnet run" -ForegroundColor Gray
Write-Host "   3. Iniciar frontend: cd web && npm run dev" -ForegroundColor Gray

Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue

Write-Host ""
Write-Host "✅ Banco de dados conectado com sucesso!" -ForegroundColor Green
Write-Host ""
Read-Host "Pressione Enter para sair"
