#!/bin/bash

echo "===================================="
echo "Testing Intel Codex Vault Sync"
echo "===================================="
echo ""
echo "This script simulates the GitHub Actions workflow locally."
echo "The vault will be synced to the 'intel-codex' folder (separate docs instance)."
echo ""

# Clone the vault
echo "[1/4] Cloning intel-codex vault..."
if [ -d ".temp-vault" ]; then
    echo "Removing existing .temp-vault directory..."
    rm -rf .temp-vault
fi
git clone --depth 1 https://github.com/gl0bal01/intel-codex.git .temp-vault

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to clone vault"
    exit 1
fi

echo "Vault cloned successfully!"
echo ""

# Verify vault structure
echo "[2/4] Verifying vault contents..."
if [ ! -d ".temp-vault" ]; then
    echo "ERROR: .temp-vault directory not found after clone"
    exit 1
fi

if [ -z "$(ls -A .temp-vault)" ]; then
    echo "WARNING: .temp-vault appears to be empty"
else
    echo "Vault directory contains files - OK"
fi
echo ""

# Clear Docusaurus cache
echo "[3/4] Clearing Docusaurus cache..."
npm run clear

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to clear cache"
    exit 1
fi
echo ""

# Start development server
echo "[4/4] Starting Docusaurus dev server..."
echo ""
echo "IMPORTANT: Watch for these console messages:"
echo "  - \"[Obsidian Vault] Starting vault sync...\""
echo "  - \"[Obsidian Vault] Found X markdown files\""
echo "  - \"[Obsidian Vault] Sync complete: {...stats...}\""
echo ""
echo "Press Ctrl+C to stop the server when done testing."
echo ""
read -p "Press Enter to continue..."
echo ""

npm start
