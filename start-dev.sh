#!/bin/bash

# Bhavana Technology - Development Startup Script
# This script starts all three services: Server, Admin, and Client

echo "================================================"
echo "  Bhavana Technology - Development Startup"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
fi

# Check if MongoDB is accessible
echo "Checking MongoDB connection..."
if ! mongosh "mongodb://localhost:27017" --eval "db.adminCommand('ping')" &>/dev/null; then
    echo -e "${YELLOW}Warning: MongoDB local instance not accessible at localhost:27017${NC}"
    echo -e "${YELLOW}Make sure MongoDB is running or update MONGODB_URI in server/.env${NC}"
fi

echo ""
echo -e "${GREEN}Starting services...${NC}"
echo ""

# Create a temporary directory for logs
LOGS_DIR="./logs"
mkdir -p $LOGS_DIR

# Function to handle cleanup
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping all services...${NC}"
    kill $SERVER_PID 2>/dev/null
    kill $ADMIN_PID 2>/dev/null
    kill $CLIENT_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Start Server
echo -e "${GREEN}[1/3] Starting Server on port 5000...${NC}"
cd server
npm run dev > $LOGS_DIR/server.log 2>&1 &
SERVER_PID=$!
cd ..
echo -e "${GREEN}✓ Server PID: $SERVER_PID${NC}"
echo ""

# Wait a bit for server to start
sleep 2

# Start Admin Panel
echo -e "${GREEN}[2/3] Starting Admin Panel on port 5174...${NC}"
cd admin
npm run dev > $LOGS_DIR/admin.log 2>&1 &
ADMIN_PID=$!
cd ..
echo -e "${GREEN}✓ Admin PID: $ADMIN_PID${NC}"
echo ""

# Start Client Website
echo -e "${GREEN}[3/3] Starting Client Website on port 5173...${NC}"
cd client
npm run dev > $LOGS_DIR/client.log 2>&1 &
CLIENT_PID=$!
cd ..
echo -e "${GREEN}✓ Client PID: $CLIENT_PID${NC}"
echo ""

echo "================================================"
echo -e "${GREEN}All services started successfully!${NC}"
echo "================================================"
echo ""
echo "Access your applications:"
echo -e "  ${GREEN}Server API${NC}:    http://localhost:5000"
echo -e "  ${GREEN}Admin Panel${NC}:   http://localhost:5174"
echo -e "  ${GREEN}Client Site${NC}:   http://localhost:5173"
echo ""
echo "View logs:"
echo "  Server:  tail -f $LOGS_DIR/server.log"
echo "  Admin:   tail -f $LOGS_DIR/admin.log"
echo "  Client:  tail -f $LOGS_DIR/client.log"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for all processes
wait
