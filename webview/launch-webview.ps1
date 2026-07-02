param(
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $projectRoot "index.html"

if (-not (Test-Path -LiteralPath $indexPath)) {
  throw "index.html was not found at: $indexPath"
}

function Get-NewestExecutableFromRoot {
  param(
    [string]$Root,
    [string]$ExecutableName
  )

  if (-not (Test-Path -LiteralPath $Root)) {
    return $null
  }

  $versionDirs = Get-ChildItem -LiteralPath $Root -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '^\d+(\.\d+)+$' } |
    Sort-Object { [version]$_.Name } -Descending

  foreach ($dir in $versionDirs) {
    $candidate = Join-Path $dir.FullName $ExecutableName
    if (Test-Path -LiteralPath $candidate) {
      return $candidate
    }
  }

  return $null
}

function Get-WebViewExecutable {
  $candidates = @(
    (Get-NewestExecutableFromRoot -Root "${env:ProgramFiles(x86)}\Microsoft\EdgeWebView\Application" -ExecutableName "msedgewebview2.exe"),
    (Get-NewestExecutableFromRoot -Root "${env:ProgramFiles}\Microsoft\EdgeWebView\Application" -ExecutableName "msedgewebview2.exe"),
    (Get-NewestExecutableFromRoot -Root "${env:ProgramFiles(x86)}\Microsoft\Edge\Application" -ExecutableName "msedge.exe"),
    (Get-NewestExecutableFromRoot -Root "${env:ProgramFiles}\Microsoft\Edge\Application" -ExecutableName "msedge.exe")
  )

  $pathCommand = Get-Command msedge.exe -ErrorAction SilentlyContinue
  if ($pathCommand) {
    $candidates += $pathCommand.Source
  }

  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path -LiteralPath $candidate)) {
      return $candidate
    }
  }

  return $null
}

$webViewExecutable = Get-WebViewExecutable

if (-not $webViewExecutable) {
  throw "Microsoft Edge WebView2 Runtime or Microsoft Edge was not found."
}

$indexUri = ([System.Uri](Resolve-Path -LiteralPath $indexPath).ProviderPath).AbsoluteUri
$userDataDir = Join-Path $env:LOCALAPPDATA "SquadMapManagerWebView"

$arguments = @(
  "--app=$indexUri",
  "--user-data-dir=$userDataDir",
  "--window-size=1440,980",
  "--no-first-run",
  "--disable-features=msEdgeEnableNurturingFramework"
)

if ($DryRun) {
  Write-Host "Executable: $webViewExecutable"
  Write-Host "Arguments : $($arguments -join ' ')"
  exit 0
}

Start-Process -FilePath $webViewExecutable -ArgumentList $arguments -WorkingDirectory $projectRoot
