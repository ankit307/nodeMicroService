#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Default values
ENV=${2:-"production"}
VERSION=${3:-$(git rev-parse --short HEAD)}

case "$1" in
    "build")
        echo "🏗️ Building for $ENV environment..."
        npm run clean
        npm run build
        ;;
    "docker:build")
        echo "🐳 Building Docker image..."
        docker build -t node-enterprise-server:$VERSION .
        ;;
    "docker:push")
        echo "📤 Pushing Docker image..."
        docker tag node-enterprise-server:$VERSION your-registry/node-enterprise-server:$VERSION
        docker push your-registry/node-enterprise-server:$VERSION
        ;;
    "deploy")
        echo "🚀 Deploying version $VERSION to $ENV..."
        # Add your deployment commands here
        # Example: kubectl apply -f k8s/
        ;;
    "rollback")
        echo "↩️ Rolling back to previous version..."
        # Add your rollback commands here
        ;;
    *)
        echo "Usage: $0 {build|docker:build|docker:push|deploy|rollback} [environment] [version]"
        exit 1
        ;;
esac 