$ErrorActionPreference = 'Stop'

$aisaCommand = Get-Command aisa -ErrorAction SilentlyContinue
if (-not $aisaCommand) {
    throw 'AIsa CLI was not found. Install @aisa-one/cli first.'
}

$secureKey = Read-Host 'Enter your AIsa API key (input is hidden)' -AsSecureString
$credential = [System.Management.Automation.PSCredential]::new('aisa', $secureKey)
$plainKey = $credential.GetNetworkCredential().Password

try {
    if ([string]::IsNullOrWhiteSpace($plainKey)) {
        throw 'The API key is empty.'
    }

    $loginOutput = & $aisaCommand.Source login --key $plainKey 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
        throw "AIsa CLI login failed with exit code $LASTEXITCODE."
    }

    $authOutput = & $aisaCommand.Source whoami 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0 -or $authOutput -match 'Not authenticated') {
        throw 'AIsa did not save the API key. Check that the full valid key was entered and try again.'
    }

    $encryptedKeyPath = Join-Path $PSScriptRoot 'raw\aisa\.aisa-key.dpapi'
    $encryptedKey = ConvertFrom-SecureString -SecureString $secureKey
    Set-Content -LiteralPath $encryptedKeyPath -Value $encryptedKey -Encoding ASCII

    Write-Host $authOutput.Trim()
    Write-Host 'AIsa is connected. A Windows-encrypted key was saved for this Codex audit.'
}
finally {
    $encryptedKey = $null
    $encryptedKeyPath = $null
    $authOutput = $null
    $loginOutput = $null
    $plainKey = $null
    $credential = $null
    $secureKey = $null
}
