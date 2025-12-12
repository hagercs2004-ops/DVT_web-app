#!/bin/bash

# DVT React - Quick Start Script

echo "================================"
echo "DVT - Document Version Tracker"
echo "React Application Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "📥 Please download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    echo "📁 Please run this script from: c:\Users\HP\Desktop\DVT-React"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Starting development server..."
    echo ""
    echo "📍 Open your browser to: http://localhost:5173"
    echo "⚠️  Make sure Python backend is running on: http://localhost:5000"
    echo ""
    npm run dev
else
    echo "❌ Installation failed"
    exit 1
fi
