#!/bin/bash

# UAE Water Delivery - Deployment Script
echo "🚀 Starting deployment of UAE Water Delivery..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down

# Remove old images (optional)
read -p "Do you want to remove old Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Removing old images..."
    docker system prune -f
fi

# Build and start containers
print_status "Building and starting containers..."
docker-compose up --build -d

# Wait for container to be ready
print_status "Waiting for application to start..."
sleep 30

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Deployment successful!"
    print_status "🌐 Your application is running at: http://your-server-ip:3000"
    print_status "🔧 Admin panel: http://your-server-ip:3000/admin/login"
    print_status ""
    print_status "📊 Available features:"
    print_status "  - Product parser: /admin/products/parse"
    print_status "  - Export system: /admin/products/export"
    print_status "  - Duplicate management: /admin/products/duplicates"
    print_status "  - Parser testing: /admin/products/test-parser"
    print_status ""
    print_status "📋 View logs: docker-compose logs -f"
    print_status "🛑 Stop application: docker-compose down"
else
    print_error "❌ Deployment failed!"
    print_error "Check logs: docker-compose logs"
    exit 1
fi
