#!/bin/bash

# Calorie Calculator Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm test

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output is in the 'dist' directory"

# Optional: Deploy to specific platforms
if [ "$1" = "render" ]; then
    echo "🌐 Deploying to Render..."
    echo "Please push your changes to GitHub and connect your repository to Render."
elif [ "$1" = "netlify" ]; then
    echo "🌐 Deploying to Netlify..."
    echo "Please drag and drop the 'dist' folder to Netlify or use their CLI."
elif [ "$1" = "vercel" ]; then
    echo "🌐 Deploying to Vercel..."
    echo "Please use 'vercel --prod' command or connect your repository to Vercel."
else
    echo "📋 Deployment options:"
    echo "  ./scripts/deploy.sh render   - Deploy to Render"
    echo "  ./scripts/deploy.sh netlify  - Deploy to Netlify"
    echo "  ./scripts/deploy.sh vercel   - Deploy to Vercel"
    echo ""
    echo "📁 Your built application is ready in the 'dist' directory"
    echo "🌐 You can deploy it to any static hosting service"
fi

echo "🎉 Deployment script completed!" 