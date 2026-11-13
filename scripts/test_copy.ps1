$src = "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\User Data\Default\Network\Cookies"
$dst = "$env:TEMP\Brave-Test-Copy\Default\Network\Cookies"
try {
    $srcStream = [System.IO.File]::Open($src, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
    $dstStream = [System.IO.File]::Create($dst)
    $srcStream.CopyTo($dstStream)
    $srcStream.Close()
    $dstStream.Close()
    Write-Output "PowerShell FileShare.ReadWrite COPY SUCCEEDED!"
    Get-Item $dst | Select-Object Length, LastWriteTime
} catch {
    Write-Output "PowerShell copy failed: $_"
}
