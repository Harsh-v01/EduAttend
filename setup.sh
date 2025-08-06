#!/bin/bash

# EduAttend Pro Setup Script
# This script helps you get started with the project quickly

echo "🎓 Welcome to EduAttend Pro Setup!"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Start the development server
echo ""
echo "🚀 Starting development server..."
echo "📝 The application will open at http://localhost:5173"
echo "⚡ Press Ctrl+C to stop the server"
echo ""

npm run dev
