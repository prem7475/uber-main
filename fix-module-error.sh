#!/bin/bash

# Fix Module Resolution Error - Bash Script (Mac/Linux)
# This script will clean and reinstall the project

echo ""
echo "========================================"
echo "Uber Clone - Module Resolution Fix"
echo "========================================"
echo ""

# Step 1: Remove node_modules
if [ -d "node_modules" ]; then
    echo "[1/5] Removing node_modules..."
    rm -rf node_modules
    echo "✓ node_modules removed"
else
    echo "[1/5] node_modules not found (skipping)"
fi

# Step 2: Remove package-lock.json
if [ -f "package-lock.json" ]; then
    echo "[2/5] Removing package-lock.json..."
    rm package-lock.json
    echo "✓ package-lock.json removed"
else
    echo "[2/5] package-lock.json not found (skipping)"
fi

# Step 3: Clear npm cache
echo "[3/5] Clearing npm cache..."
npm cache clean --force
echo "✓ npm cache cleared"

# Step 4: Clear Expo cache
echo "[4/5] Clearing Expo cache..."
expo cache clear
echo "✓ Expo cache cleared"

# Step 5: Reinstall dependencies
echo "[5/5] Installing dependencies (this may take a few minutes)..."
npm install

# Check if successful
if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "✓ SUCCESS - Fix completed!"
    echo "========================================"
    echo ""
    echo "Next steps:"
    echo " 1. Run: npm run web:clear"
    echo " 2. Open: http://localhost:8081"
    echo ""
    read -p "Press enter to start the app..."
    npm run web:clear
else
    echo ""
    echo "========================================"
    echo "✗ ERROR - Installation failed"
    echo "========================================"
    echo ""
    echo "Try these alternatives:"
    echo " 1. Close all terminals"
    echo " 2. Run this script again"
    echo " 3. Or manually run:"
    echo "    - npm cache clean --force"
    echo "    - npm install"
    echo "    - npm run web"
    echo ""
fi
