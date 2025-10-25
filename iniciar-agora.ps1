# 🚀 Script Simples para Iniciar NestFin
Write-Host "🚀 Iniciando Projeto NestFin..." -ForegroundColor Green
Write-Host ""

# Iniciar Backend
Write-Host "📦 Iniciando Backend..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/k", "cd /d `"$PWD\backend`" && dotnet run" -WindowStyle Normal

# Aguardar
Write-Host "⏳ Aguardando 3 segundos..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Iniciar Frontend  
Write-Host "📦 Iniciando Frontend..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/k", "cd /d `"$PWD\web`" && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Serviços iniciados!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "   📊 Backend API: http://localhost:5000" -ForegroundColor Blue
Write-Host "   📚 Swagger: http://localhost:5000/swagger" -ForegroundColor Blue
Write-Host ""
Write-Host "⏳ Aguarde alguns segundos para os serviços carregarem..." -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
