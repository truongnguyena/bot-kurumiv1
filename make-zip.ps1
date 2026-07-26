$source = 'D:\kurumi-v1\kurumi-v1'
$temp = 'D:\kurumi-bot-temp'
$dest = 'D:\kurumi-bot-katabump.zip'

# Xóa file/thư mục tạm cũ
if (Test-Path $dest) { Remove-Item $dest -Force }
if (Test-Path $temp) { Remove-Item $temp -Recurse -Force }

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Dang copy files sang thu muc tam..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Dùng robocopy để copy (bỏ qua file bị lock, bỏ các thư mục không cần)
robocopy $source $temp /E /XD node_modules .git .local .breakpoints /XF "*.log" /NFL /NDL /NJH /NJS /NC /NS | Out-Null

Write-Host "Copy xong! Dang nen ZIP..." -ForegroundColor Yellow

# Nén thư mục tạm thành ZIP
Compress-Archive -Path "$temp\*" -DestinationPath $dest -Force

# Dọn thư mục tạm
Remove-Item $temp -Recurse -Force

$sizeMB = [math]::Round((Get-Item $dest).Length / 1MB, 2)
Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host " HOAN THANH!" -ForegroundColor Green
Write-Host " File ZIP: $dest" -ForegroundColor Yellow
Write-Host " Kich thuoc: $sizeMB MB" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Upload file nay len KataBump qua SFTP (FileZilla/WinSCP)" -ForegroundColor Cyan
