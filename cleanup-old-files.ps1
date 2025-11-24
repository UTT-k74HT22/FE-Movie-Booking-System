# PowerShell Script to Clean Up Old Files After Migration
# Run this script from the project root directory

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Movie Booking System - File Cleanup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Confirm before proceeding
$confirmation = Read-Host "This will delete old files that have been migrated. Continue? (y/n)"
if ($confirmation -ne 'y') {
    Write-Host "Cleanup cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Starting cleanup..." -ForegroundColor Green
Write-Host ""

# Counter for deleted items
$deletedCount = 0

# Function to safely remove item
function Remove-ItemSafe {
    param($path)
    
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force
        Write-Host "[✓] Deleted: $path" -ForegroundColor Green
        $script:deletedCount++
    } else {
        Write-Host "[!] Not found (already deleted?): $path" -ForegroundColor Yellow
    }
}

# ===== PHASE 1: Old API Layer =====
Write-Host "Phase 1: Cleaning old API layer..." -ForegroundColor Cyan
Remove-ItemSafe "src/api"

# ===== PHASE 2: Old Utils =====
Write-Host ""
Write-Host "Phase 2: Cleaning old utils..." -ForegroundColor Cyan
Remove-ItemSafe "src/utils/httpRequest.js"
Remove-ItemSafe "src/utils/tokenService.js"
# Check if utils folder is empty, delete if so
if ((Test-Path "src/utils") -and ((Get-ChildItem "src/utils" | Measure-Object).Count -eq 0)) {
    Remove-ItemSafe "src/utils"
}

# ===== PHASE 3: Old Auth Components =====
Write-Host ""
Write-Host "Phase 3: Cleaning old auth components..." -ForegroundColor Cyan
Remove-ItemSafe "src/components/Auth"
Remove-ItemSafe "src/components/ProtectedRoute"
Remove-ItemSafe "src/components/UnauthorizedPage"
# Check if components folder is empty
if ((Test-Path "src/components") -and ((Get-ChildItem "src/components" | Measure-Object).Count -eq 0)) {
    Remove-ItemSafe "src/components"
}

# ===== PHASE 4: Old Layouts =====
Write-Host ""
Write-Host "Phase 4: Cleaning old layouts..." -ForegroundColor Cyan
Remove-ItemSafe "src/layouts"

# ===== PHASE 5: Old Routing =====
Write-Host ""
Write-Host "Phase 5: Cleaning old routing..." -ForegroundColor Cyan
Remove-ItemSafe "src/Router"

# ===== PHASE 6: Old Services =====
Write-Host ""
Write-Host "Phase 6: Cleaning old services..." -ForegroundColor Cyan
Remove-ItemSafe "src/services"

# ===== PHASE 7: Old Contexts =====
Write-Host ""
Write-Host "Phase 7: Cleaning old contexts..." -ForegroundColor Cyan
Remove-ItemSafe "src/Contexts"

# ===== PHASE 8: Old Pages =====
Write-Host ""
Write-Host "Phase 8: Cleaning old pages..." -ForegroundColor Cyan
Remove-ItemSafe "src/pages"
Remove-ItemSafe "src/admin"
Remove-ItemSafe "src/client"

# ===== PHASE 9: Empty Folders =====
Write-Host ""
Write-Host "Phase 9: Cleaning empty folders..." -ForegroundColor Cyan
Remove-ItemSafe "src/hooks"

# ===== PHASE 10: Replace App.jsx =====
Write-Host ""
Write-Host "Phase 10: Replacing App.jsx with new version..." -ForegroundColor Cyan
if (Test-Path "src/App-new.jsx") {
    if (Test-Path "src/App.jsx") {
        Copy-Item -Path "src/App.jsx" -Destination "src/App.jsx.backup" -Force
        Write-Host "[✓] Backed up old App.jsx to App.jsx.backup" -ForegroundColor Green
    }
    
    Copy-Item -Path "src/App-new.jsx" -Destination "src/App.jsx" -Force
    Write-Host "[✓] Replaced App.jsx with new version" -ForegroundColor Green
    $script:deletedCount++
    
    # Optionally remove App-new.jsx
    $removeNew = Read-Host "Remove App-new.jsx now that it's been copied? (y/n)"
    if ($removeNew -eq 'y') {
        Remove-ItemSafe "src/App-new.jsx"
    }
} else {
    Write-Host "[!] App-new.jsx not found. Skipping App.jsx replacement." -ForegroundColor Yellow
}

# ===== PHASE 11: Check for old CSS =====
Write-Host ""
Write-Host "Phase 11: Checking old CSS files..." -ForegroundColor Cyan
if (Test-Path "src/App.css") {
    $removeAppCss = Read-Host "Remove src/App.css? (y/n)"
    if ($removeAppCss -eq 'y') {
        Remove-ItemSafe "src/App.css"
    }
}

# ===== SUMMARY =====
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Items processed: $deletedCount" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the changes" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host "4. Test authentication (login, register, activate)" -ForegroundColor White
Write-Host "5. Test routing and navigation" -ForegroundColor White
Write-Host "6. If issues occur, restore from backup or git" -ForegroundColor White
Write-Host ""
Write-Host "Backups created:" -ForegroundColor Yellow
Write-Host "- src/App.jsx.backup (if existed)" -ForegroundColor White
Write-Host ""

# Offer to show remaining structure
$showStructure = Read-Host "Show new folder structure? (y/n)"
if ($showStructure -eq 'y') {
    Write-Host ""
    Write-Host "New structure:" -ForegroundColor Cyan
    tree /F src /A
}
