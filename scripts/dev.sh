#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

case "$1" in
    "start")
        echo "🚀 Starting development server..."
        npm run dev
        ;;
    "test")
        echo "🧪 Running tests..."
        npm run test
        ;;
    "test:watch")
        echo "👀 Running tests in watch mode..."
        npm run test:watch
        ;;
    "lint")
        echo "🔍 Running linter..."
        npm run lint
        ;;
    "format")
        echo "✨ Formatting code..."
        npm run format
        ;;
    "build")
        echo "🏗️ Building project..."
        npm run build
        ;;
    "clean")
        echo "🧹 Cleaning build files..."
        npm run clean
        ;;
    "debug")
        echo "🐛 Starting debugger..."
        npm run debug
        ;;
    "docker:dev")
        echo "🐳 Starting development environment with Docker..."
        docker-compose -f docker-compose.yml -f docker-compose.override.yml up
        ;;
    "docker:build")
        echo "🏗️ Building Docker images..."
        docker-compose build
        ;;
    *)
        echo "Usage: $0 {start|test|test:watch|lint|format|build|clean|debug|docker:dev|docker:build}"
        exit 1
        ;;
esac 