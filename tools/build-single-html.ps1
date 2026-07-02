$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $projectRoot "dist"
$sourceHtmlPath = Join-Path $projectRoot "index.html"
$outputHtmlPath = Join-Path $distDir "SquadMapManager.html"
$outputStartPath = Join-Path $distDir "start.cmd"
$encoding = [System.Text.UTF8Encoding]::new($false)

if (-not (Test-Path -LiteralPath $sourceHtmlPath)) {
  throw "index.html was not found at: $sourceHtmlPath"
}

New-Item -ItemType Directory -Force -Path $distDir | Out-Null

function Read-ProjectFile {
  param([string]$RelativePath)

  $normalized = $RelativePath -replace '^[.][\\/]', ''
  $fullPath = Join-Path $projectRoot $normalized
  if (-not (Test-Path -LiteralPath $fullPath)) {
    throw "Referenced file was not found: $RelativePath"
  }
  return [System.IO.File]::ReadAllText($fullPath, $encoding)
}

function Escape-ScriptContent {
  param([string]$Content)

  return $Content -replace '</script', '<\/script'
}

$html = [System.IO.File]::ReadAllText($sourceHtmlPath, $encoding)

$html = [regex]::Replace(
  $html,
  '<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>',
  {
    param($match)
    $css = Read-ProjectFile $match.Groups[1].Value
    "  <style>`r`n$css`r`n  </style>"
  },
  [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
)

$html = [regex]::Replace(
  $html,
  '\s*<script\s+src="([^"]+)"></script>',
  {
    param($match)
    $script = Escape-ScriptContent (Read-ProjectFile $match.Groups[1].Value)
    "`r`n  <script>`r`n$script`r`n  </script>"
  },
  [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
)

[System.IO.File]::WriteAllText($outputHtmlPath, $html, $encoding)

$startCmd = @"
@echo off
setlocal
start "" "%~dp0SquadMapManager.html"
"@

[System.IO.File]::WriteAllText($outputStartPath, $startCmd, $encoding)

Write-Host "Built: $outputHtmlPath"
Write-Host "Built: $outputStartPath"
