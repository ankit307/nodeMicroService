# Node.js Framework

A TypeScript-based Node.js framework project.

## Project Structure

```
nodeFramework/
├── src/                # Source files
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── tests/             # Test files
├── dist/              # Compiled output
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Features

- 🚀 Built with TypeScript
- 🗄️ Multi-database support (MongoDB, PostgreSQL, MySQL)
- 🐳 Docker and Docker Compose support
- 🔄 Hot-reloading in development
- 📝 Structured logging
- 🔒 Environment-based configuration
- 🧪 Test setup with Jest
- 🔄 Database connection pooling
- 🛡️ Error handling middleware
- 📊 Health check endpoints
- 🔐 Authentication & Authorization
- 📈 Performance monitoring
- 📦 Dependency injection
- 🔄 Caching layer

## Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose
- npm or yarn
- MongoDB/PostgreSQL/MySQL (depending on your choice)

## Developer Environment Setup

### Required Tools

1. **Node.js and npm**
   - Install Node.js 20 or higher from [nodejs.org](https://nodejs.org)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Docker and Docker Compose**
   - Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
   - Verify installation:
     ```bash
     docker --version
     docker-compose --version
     ```

3. **Database**
   - Install your preferred database:
     - [MongoDB](https://www.mongodb.com/try/download/community)
     - [PostgreSQL](https://www.postgresql.org/download/)
     - [MySQL](https://dev.mysql.com/downloads/)

### IDE Setup

1. **Recommended IDE: Visual Studio Code**
   - Download and install [VS Code](https://code.visualstudio.com/)
   - Install recommended extensions:
     - ESLint
     - Prettier
     - TypeScript and JavaScript Language Features
     - Docker
     - REST Client
     - GitLens

2. **VS Code Settings**
   Add to your `settings.json`:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "typescript.tsdk": "node_modules/typescript/lib"
   }
   ```

## Development Workflow

### Using Shell Scripts

The project includes several shell scripts to automate common development tasks. All scripts are located in the `scripts/` directory.

#### Setup Script (`setup.sh`)
```bash
# Initialize development environment
./scripts/setup.sh
```
This script:
- Checks for required tools (Node.js, npm)
- Installs dependencies
- Creates .env file
- Sets up git hooks

#### Database Script (`db.sh`)
```bash
# Start database
./scripts/db.sh start

# Stop database
./scripts/db.sh stop

# Reset database
./scripts/db.sh reset

# Check database status
./scripts/db.sh status
```
Supports MongoDB, PostgreSQL, and MySQL based on your `.env` configuration.

#### Development Script (`dev.sh`)
```bash
# Start development server
./scripts/dev.sh start

# Run tests
./scripts/dev.sh test

# Run tests in watch mode
./scripts/dev.sh test:watch

# Run linter
./scripts/dev.sh lint

# Format code
./scripts/dev.sh format

# Build project
./scripts/dev.sh build

# Clean build files
./scripts/dev.sh clean

# Start debugger
./scripts/dev.sh debug

# Start Docker development environment
./scripts/dev.sh docker:dev

# Build Docker images
./scripts/dev.sh docker:build
```

#### Deployment Script (`deploy.sh`)
```bash
# Build for production
./scripts/deploy.sh build production

# Build Docker image
./scripts/deploy.sh docker:build

# Push Docker image
./scripts/deploy.sh docker:push

# Deploy to production
./scripts/deploy.sh deploy production

# Rollback to previous version
./scripts/deploy.sh rollback
```

### Manual Development Workflow

1. **Setup Environment**
   ```bash
   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env
   ```

2. **Database Setup**
   ```bash
   # Start database (choose one)
   docker-compose up mongodb
   # or
   docker-compose up postgres
   # or
   docker-compose up mysql
   ```

3. **Development**
   ```bash
   # Start development server
   npm run dev

   # Run tests
   npm test

   # Format code
   npm run format

   # Lint code
   npm run lint
   ```

4. **Building**
   ```bash
   # Build project
   npm run build

   # Clean build files
   npm run clean
   ```

5. **Debugging**
   ```bash
   # Start debugger
   npm run debug
   ```

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd nodeFramework
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

### Docker Development

1. Build and start the containers:
```bash
docker-compose up
```

2. To stop the containers:
```bash
docker-compose down
```

## API Documentation

### Authentication

#### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### User Management

#### GET /api/users
- Returns list of users
- Requires authentication
- Supports pagination

#### GET /api/users/:id
- Returns specific user details
- Requires authentication

## Architecture

### Core Components

1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Implement business logic
3. **Models**: Define data structures
4. **Middleware**: Process requests before reaching controllers
5. **Routes**: Define API endpoints
6. **Config**: Manage environment-specific settings

### Database Layer

- Connection pooling for better performance
- Transaction support
- Query optimization
- Caching implementation

### Security

- JWT-based authentication
- Role-based access control
- Input validation
- Rate limiting
- CORS configuration

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- <test-file-path>
```

## Deployment

### Production Setup

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Environment Variables

Required environment variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: JWT secret key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint for code linting
- Write unit tests for new features
- Document your code with JSDoc comments

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or create an issue in the repository.

## Roadmap

- [ ] Add GraphQL support
- [ ] Implement WebSocket functionality
- [ ] Add Redis caching
- [ ] Enhance monitoring capabilities
- [ ] Add more database adapters

# Node Enterprise Server

An enterprise-grade Node.js server with support for multiple databases (MongoDB, PostgreSQL, MySQL) and Docker containerization.

## Features

- 🚀 Built with TypeScript
- 🗄️ Multi-database support (MongoDB, PostgreSQL, MySQL)
- 🐳 Docker and Docker Compose support
- 🔄 Hot-reloading in development
- 📝 Structured logging
- 🔒 Environment-based configuration
- 🧪 Test setup with Jest
- 🔄 Database connection pooling
- 🛡️ Error handling middleware

## Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose
- npm or yarn

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd nodeFramework
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

### Docker Development

1. Build and start the containers:
```bash
docker-compose up
```

2. To stop the containers:
```bash
docker-compose down
```

## Database Configuration

The application supports three database types:

### MongoDB (Default)
```env
DB_TYPE=mongodb
DB_HOST=localhost
DB_PORT=27017
DB_NAME=enterprise_db
```

### PostgreSQL
```env
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=enterprise_db
```

### MySQL
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=mysql
DB_PASSWORD=mysql
DB_NAME=enterprise_db
```

## Docker Usage

### Development Mode
```bash
# Start all services
docker-compose up

# Start specific services (e.g., MongoDB and app)
docker-compose up mongodb app

# View logs
docker-compose logs -f
```

### Production Mode
```bash
# Build and start in production mode
docker-compose -f docker-compose.yml up --build

# Stop all services
docker-compose down

# Stop and remove volumes (deletes all data)
docker-compose down -v
```

### Available Services
- `app`: Node.js application
- `mongodb`: MongoDB database
- `postgres`: PostgreSQL database
- `mysql`: MySQL database

## Project Structure

```
src/
├── config/         # Configuration files
├── database/       # Database connection and repository
├── middleware/     # Express middleware
├── routes/         # API routes
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Available Scripts

- `npm run dev`: Start development server with hot-reloading
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Run linter

## Environment Variables

| Variable     | Description                    | Default     |
|-------------|--------------------------------|-------------|
| PORT        | Server port                    | 3000        |
| NODE_ENV    | Environment (dev/prod)         | development |
| LOG_LEVEL   | Logging level                  | info        |
| DB_TYPE     | Database type                  | mongodb     |
| DB_HOST     | Database host                  | localhost   |
| DB_PORT     | Database port                  | 27017       |
| DB_USERNAME | Database username              | -           |
| DB_PASSWORD | Database password              | -           |
| DB_NAME     | Database name                  | enterprise_db|

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 