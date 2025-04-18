#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Default values
DB_TYPE=${DB_TYPE:-"mongodb"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"27017"}
DB_NAME=${DB_NAME:-"enterprise_db"}

case "$1" in
    "start")
        echo "🚀 Starting database..."
        case "$DB_TYPE" in
            "mongodb")
                docker-compose up -d mongodb
                ;;
            "postgresql")
                docker-compose up -d postgres
                ;;
            "mysql")
                docker-compose up -d mysql
                ;;
            *)
                echo "❌ Unknown database type: $DB_TYPE"
                exit 1
                ;;
        esac
        ;;
    "stop")
        echo "🛑 Stopping database..."
        case "$DB_TYPE" in
            "mongodb")
                docker-compose stop mongodb
                ;;
            "postgresql")
                docker-compose stop postgres
                ;;
            "mysql")
                docker-compose stop mysql
                ;;
        esac
        ;;
    "reset")
        echo "🔄 Resetting database..."
        case "$DB_TYPE" in
            "mongodb")
                docker-compose stop mongodb
                docker-compose rm -f mongodb
                docker volume rm $(docker volume ls -q | grep mongodb) || true
                docker-compose up -d mongodb
                ;;
            "postgresql")
                docker-compose stop postgres
                docker-compose rm -f postgres
                docker volume rm $(docker volume ls -q | grep postgres) || true
                docker-compose up -d postgres
                ;;
            "mysql")
                docker-compose stop mysql
                docker-compose rm -f mysql
                docker volume rm $(docker volume ls -q | grep mysql) || true
                docker-compose up -d mysql
                ;;
        esac
        ;;
    "status")
        echo "📊 Database status:"
        case "$DB_TYPE" in
            "mongodb")
                docker-compose ps mongodb
                ;;
            "postgresql")
                docker-compose ps postgres
                ;;
            "mysql")
                docker-compose ps mysql
                ;;
        esac
        ;;
    *)
        echo "Usage: $0 {start|stop|reset|status}"
        exit 1
        ;;
esac 