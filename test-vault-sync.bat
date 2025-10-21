@echo off
echo ====================================
echo Testing Intel Codex Vault Sync
echo ====================================
echo.
echo This script simulates the GitHub Actions workflow locally.
echo The vault will be synced to the 'intel-codex' folder (separate docs instance).
echo.

REM Clone the vault
echo [1/4] Cloning intel-codex vault...
if exist .temp-vault (
    echo Removing existing .temp-vault directory...
    rmdir /s /q .temp-vault
)
git clone --depth 1 https://github.com/gl0bal01/intel-codex.git .temp-vault

if errorlevel 1 (
    echo ERROR: Failed to clone vault
    pause
    exit /b 1
)

echo Vault cloned successfully!
echo.

REM Verify vault structure
echo [2/4] Verifying vault contents...
if not exist .temp-vault (
    echo ERROR: .temp-vault directory not found after clone
    pause
    exit /b 1
)

dir .temp-vault /b | findstr /r ".*" >nul
if errorlevel 1 (
    echo WARNING: .temp-vault appears to be empty
) else (
    echo Vault directory contains files - OK
)
echo.

REM Clear Docusaurus cache
echo [3/4] Clearing Docusaurus cache...
call npm run clear

if errorlevel 1 (
    echo ERROR: Failed to clear cache
    pause
    exit /b 1
)
echo.

REM Start development server
echo [4/4] Starting Docusaurus dev server...
echo.
echo IMPORTANT: Watch for these console messages:
echo   - "[Obsidian Vault] Starting vault sync..."
echo   - "[Obsidian Vault] Found X markdown files"
echo   - "[Obsidian Vault] Sync complete: {...stats...}"
echo.
echo Press Ctrl+C to stop the server when done testing.
echo.
pause

call npm start
