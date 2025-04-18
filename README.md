# Node.js Framework

A TypeScript-based Node.js framework project.

## Project Structure

```
nodeFramework/
├── src/                # Source files
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `src` directory and add your TypeScript files:
```bash
mkdir src
```

3. Compile TypeScript:
```bash
npm run build
```

## Development

- The project uses TypeScript with ES2020 target
- Source files should be placed in the `src` directory
- Compiled output will be in the `dist` directory

## Configuration

The project is configured with:
- TypeScript for type safety
- ES2020 target for modern JavaScript features
- Source files in `src/**/*`
- Excluded test files and node_modules

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