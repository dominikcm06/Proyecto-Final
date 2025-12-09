$ErrorActionPreference = "Stop"

Write-Host "Inicializando repositorio..."
git init

Write-Host "Agregando archivos..."
git add .

Write-Host "Creando commit..."
# Check if there are changes to commit
if ((git status --porcelain) -ne $null) {
    git commit -m "Entrega Final Cinesocial"
} else {
    Write-Host "Nada que commitear, continuando..."
}

Write-Host "Configurando remoto..."
if (git remote | Select-String "origin") {
    Write-Host "El remoto 'origin' ya existe. Actualizando URL..."
    git remote set-url origin https://github.com/dominikcm06/Proyecto-Final.git
} else {
    git remote add origin https://github.com/dominikcm06/Proyecto-Final.git
}

Write-Host "Renombrando rama a main..."
git branch -M main

Write-Host "Subiendo a GitHub..."
git push -u origin main

Write-Host "¡Éxito!"
