param(
    [Parameter(Mandatory = $false)]
    [string]$Provider = 'dataforseo',

    [Parameter(Mandatory = $true)]
    [string]$Endpoint,

    [Parameter(Mandatory = $true)]
    [string]$PayloadPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
$auditRoot = [IO.Path]::GetFullPath($PSScriptRoot).TrimEnd('\')
$resolvedPayload = [IO.Path]::GetFullPath((Join-Path $auditRoot $PayloadPath))
$resolvedOutput = [IO.Path]::GetFullPath((Join-Path $auditRoot $OutputPath))
$keyPath = Join-Path $auditRoot 'raw\aisa\.aisa-key.dpapi'

if (-not $resolvedPayload.StartsWith($auditRoot + '\', [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Payload path is outside the audit directory.'
}
if (-not $resolvedOutput.StartsWith($auditRoot + '\', [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Output path is outside the audit directory.'
}
if (-not (Test-Path -LiteralPath $resolvedPayload)) {
    throw 'Payload file was not found.'
}
if (-not (Test-Path -LiteralPath $keyPath)) {
    throw 'Encrypted AIsa key file was not found.'
}

$encryptedText = (Get-Content -LiteralPath $keyPath -Raw).Trim()
$secureKey = ConvertTo-SecureString -String $encryptedText
$credential = [System.Management.Automation.PSCredential]::new('aisa', $secureKey)
$plainKey = $credential.GetNetworkCredential().Password
$payload = Get-Content -LiteralPath $resolvedPayload -Raw -Encoding UTF8

try {
    $env:AISA_API_KEY = $plainKey
    $beforeJson = & aisa balance --json | Out-String
    if ($LASTEXITCODE -ne 0) {
        throw 'Could not read AIsa balance before the request.'
    }
    $before = $beforeJson | ConvertFrom-Json

    $responseText = & aisa run $Provider $Endpoint --method POST --data $payload --raw --show-cost | Out-String
    $requestExitCode = $LASTEXITCODE
    $responseObject = $null
    if (-not [string]::IsNullOrWhiteSpace($responseText)) {
        $responseObject = $responseText | ConvertFrom-Json
    }

    $afterJson = & aisa balance --json | Out-String
    if ($LASTEXITCODE -ne 0) {
        throw 'Could not read AIsa balance after the request.'
    }
    $after = $afterJson | ConvertFrom-Json

    Set-Content -LiteralPath $resolvedOutput -Value $responseText.TrimEnd() -Encoding UTF8

    $metaPath = $resolvedOutput + '.meta.json'
    $meta = [ordered]@{
        checked_at = [DateTimeOffset]::UtcNow.ToString('o')
        provider = $Provider
        endpoint = $Endpoint
        payload_file = $resolvedPayload.Substring($auditRoot.Length + 1)
        response_file = $resolvedOutput.Substring($auditRoot.Length + 1)
        exit_code = $requestExitCode
        available_before_micros_usd = $before.available_balance_micros_usd
        available_after_micros_usd = $after.available_balance_micros_usd
        observed_spend_micros_usd = [int64]$before.available_balance_micros_usd - [int64]$after.available_balance_micros_usd
        observed_spend_usd = ([int64]$before.available_balance_micros_usd - [int64]$after.available_balance_micros_usd) / 1000000
        response_status_code = $responseObject.status_code
        response_status_message = $responseObject.status_message
        response_reported_cost_usd = $responseObject.cost
        response_task_errors = $responseObject.tasks_error
    }
    $meta | ConvertTo-Json | Set-Content -LiteralPath $metaPath -Encoding UTF8

    $meta | ConvertTo-Json
    if ($requestExitCode -ne 0) {
        throw "AIsa request failed with exit code $requestExitCode. No automatic retry was made."
    }
    $hasStatusCode = $responseObject.PSObject.Properties.Name -contains 'status_code'
    $hasTaskErrors = $responseObject.PSObject.Properties.Name -contains 'tasks_error'
    if (($hasStatusCode -and $responseObject.status_code -ne 20000) -or ($hasTaskErrors -and $responseObject.tasks_error -gt 0)) {
        throw 'AIsa returned a task-level error. No automatic retry was made.'
    }
}
finally {
    Remove-Item Env:AISA_API_KEY -ErrorAction SilentlyContinue
    $plainKey = $null
    $credential = $null
    $secureKey = $null
    $encryptedText = $null
    $payload = $null
    $responseObject = $null
}
