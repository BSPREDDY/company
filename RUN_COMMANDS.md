# 🚀 Commands to Run the Application

## Prerequisites
```bash
# Verify Node.js is installed
node --version  # Should be 18+
npm --version   # Should be 9+

# Verify MongoDB is running
mongod          # In one terminal
# Or use MongoDB Atlas connection
```

---

## Quick Start - Copy & Paste Ready

### Terminal 1: Start Server
```bash
cd server
npm install
npm run dev
```

Expected output:
```
================================
  Bhavana Technology API Server
================================
✓ Server running on port 5000
```

### Terminal 2: Start Admin Panel
```bash
cd admin
npm install
npm run dev
```

Expected output:
```
  VITE v... ready in ... ms

➜  Local:   http://localhost:5174/
```

### Terminal 3: Start Client Website
```bash
cd client
npm install
npm run dev
```

Expected output:
```
  VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

---

## Access the Application

Once all three are running:

1. **Admin Panel** (Create account here first):
   ```
   http://localhost:5174
   ```
   - Click "Register"
   - Create your admin account
   - Login

2. **Client Website** (Test the contact form):
   ```
   http://localhost:5173
   ```
   - Go to Contact page
   - Submit a test message

3. **Server API** (Health check):
   ```
   http://localhost:5000/health
   ```
   - Should return `{"status":"OK",...}`

---

## Test the Flow

```bash
# 1. Check server is running
curl http://localhost:5000/health

# 2. Register admin account
# Go to http://localhost:5174/register
# Fill form and submit

# 3. Login with new credentials
# Go to http://localhost:5174/login

# 4. View admin dashboard
# Should see http://localhost:5174/dashboard

# 5. Submit contact from client
# Go to http://localhost:5173/contact
# Fill and submit contact form

# 6. Check contacts in admin
# Go to http://localhost:5174/contacts
# Should see your submitted contact
```

---

## One-Command Startup (Optional)

Use the automated startup script:

### macOS/Linux
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Windows (Git Bash)
```bash
bash start-dev.sh
```

### Windows (Command Prompt)
```cmd
start cmd /k "cd server && npm run dev"
start cmd /k "cd admin && npm run dev"
start cmd /k "cd client && npm run dev"
```

---

## Development Environment Variables

The `.env` file is already created in `server/` folder.

**For MongoDB Atlas (Cloud):**

Edit `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhavana
```

Replace:
- `username` - Your MongoDB Atlas username
- `password` - Your MongoDB Atlas password
- `cluster` - Your cluster name

Then restart server.

---

## Useful Development Commands

### Development
```bash
# Server dev with hot reload
cd server && npm run dev

# Admin dev with hot reload
cd admin && npm run dev

# Client dev with hot reload
cd client && npm run dev
```

### Check Logs
```bash
# See what's happening
tail -f logs/server.log
tail -f logs/admin.log
tail -f logs/client.log
```

### View Database
```bash
# MongoDB CLI
mongosh

# Or use MongoDB Compass GUI
# Download from https://www.mongodb.com/products/compass
```

### Kill Running Processes
```bash
# Kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill all Node processes
killall node

# Or just Ctrl+C in terminal
```

---

## Troubleshooting

### "Port already in use"
```bash
# Kill the process using the port
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in server/.env
PORT=5001
```

### "Cannot find module"
```bash
# Reinstall dependencies
cd server && rm -rf node_modules && npm install
cd admin && rm -rf node_modules && npm install
cd client && rm -rf node_modules && npm install
```

### "MongoDB connection error"
```bash
# Start MongoDB
mongod

# Or use Atlas connection string in server/.env
MONGODB_URI=mongodb+srv://...
```

### "CORS error"
```bash
# Restart server
# In server terminal: Ctrl+C
cd server && npm run dev
```

---

## Build for Production

```bash
# Admin production build
cd admin && npm run build
# Output: admin/dist/

# Client production build
cd client && npm run build
# Output: client/dist/

# Server production (no build needed)
cd server && npm install --production
```

---

## Debug Mode

Enable detailed logging:

```bash
# Set debug environment
export DEBUG=*
npm run dev

# Or in .env
DEBUG=*
NODE_ENV=development
```

Then check terminal and browser console (F12) for [v0] logs.

---

## Docker (Optional)

Use Docker to run services in containers:

```dockerfile
# Dockerfile.server
FROM node:18
WORKDIR /app
COPY server .
RUN npm install
CMD npm start

# Build and run
docker build -t bhavana-server -f Dockerfile.server server/
docker run -p 5000:5000 bhavana-server
```

---

## Deployment

### Vercel (Recommended)
```bash
# Server
vercel deploy --prod

# Admin
cd admin && npm run build
vercel deploy dist --prod

# Client
cd client && npm run build
vercel deploy dist --prod
```

### Other Platforms
See SETUP_GUIDE.md for detailed deployment instructions for:
- Netlify
- Heroku
- AWS
- DigitalOcean
- Self-hosted

---

## Quick Reference

| Service | Command | Port | URL |
|---------|---------|------|-----|
| Server | `cd server && npm run dev` | 5000 | http://localhost:5000 |
| Admin | `cd admin && npm run dev` | 5174 | http://localhost:5174 |
| Client | `cd client && npm run dev` | 5173 | http://localhost:5173 |
| MongoDB | `mongod` | 27017 | mongodb://localhost:27017 |

---

## Tips & Tricks

### Monitor All Services
```bash
# Install tmux (macOS)
brew install tmux

# Create new session
tmux new-session -d -s bhavana

# Create windows
tmux new-window -t bhavana -n server
tmux new-window -t bhavana -n admin
tmux new-window -t bhavana -n client

# Start services
tmux send-keys -t bhavana:server "cd server && npm run dev" Enter
tmux send-keys -t bhavana:admin "cd admin && npm run dev" Enter
tmux send-keys -t bhavana:client "cd client && npm run dev" Enter

# Attach to session
tmux attach -t bhavana
```

### Auto-restart on Changes
```bash
# Install nodemon globally
npm install -g nodemon

# Use instead of npm run dev
cd server && nodemon server.js
```

### Clear All Cache
```bash
# Remove all node_modules and lock files
find . -name node_modules -type d -exec rm -rf {} +
find . -name package-lock.json -delete
find . -name pnpm-lock.yaml -delete

# Reinstall
npm install
```

---

## Still Need Help?

1. Check **QUICKSTART.md** - 5 minute setup
2. Check **TROUBLESHOOTING.md** - Common issues
3. Check **SETUP_GUIDE.md** - Detailed guide
4. Check **DOCUMENTATION_INDEX.md** - Full navigation

All documentation files are in the project root.

---

**Last Updated:** June 28, 2024
