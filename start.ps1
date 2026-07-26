Set-Location $PSScriptRoot
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:NODE_OPTIONS = "--no-deprecation"
node scripts/fca-shims.js
node scripts/bootstrap.js
