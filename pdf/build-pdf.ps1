# Vyexportuje pdf/manual.html do assets/downloads/brand-manual.pdf
# (soubor, který stahuje tlačítko „Stáhnout PDF“ ve web manuálu).
# Použití:  powershell -ExecutionPolicy Bypass -File pdf\build-pdf.ps1

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$html = Join-Path $PSScriptRoot 'manual.html'
$outDir = Join-Path $root 'assets\downloads'
$out = Join-Path $outDir 'brand-manual.pdf'

$candidates = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)
$browser = $candidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $browser) { throw 'Nenalezen Microsoft Edge ani Google Chrome.' }

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$uri = ([System.Uri]$html).AbsoluteUri
$tmpProfile = Join-Path $env:TEMP ('brand-pdf-' + [guid]::NewGuid())

& $browser --headless=new --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw `
  --virtual-time-budget=5000 --user-data-dir="$tmpProfile" --print-to-pdf="$out" $uri | Out-Null

Remove-Item -Recurse -Force $tmpProfile -ErrorAction SilentlyContinue

if (Test-Path $out) {
  Write-Host "Hotovo: $out"
} else {
  throw 'PDF se nepodařilo vytvořit.'
}
