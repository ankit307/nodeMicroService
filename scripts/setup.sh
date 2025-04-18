#!/bin/bash

# Exit on error
set -e

echo "🚀 Setting up development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
if [[ "${NODE_VERSION%%.*}" -lt 20 ]]; then
    echo "❌ Node.js version must be 20 or higher. Current version: $NODE_VERSION"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
fi

# Setup git hooks if .git exists
if [ -d .git ]; then
    echo "🔧 Setting up git hooks..."
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOL'
#!/bin/bash
npm run lint
npm run test
EOL
    chmod +x .git/hooks/pre-commit
fi

echo "✅ Setup complete! You can now start development with:"
echo "   npm run dev" 