# Bhavana Technology - Complete Setup Guide

This guide will help you set up and run the entire application (Server, Admin, and Client).

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- MongoDB (local or cloud instance)
- Git

## Project Structure

```
bhavana/
├── server/          # Express.js backend (Port 5000)
├── admin/          # React admin panel (Port 5174)
├── client/         # React client website (Port 5173)
└── README          # Main project documentation
```

---

## 1. MongoDB Setup

### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Copy the connection string for later use

---

## 2. Server Setup

### Installation

```bash
cd server
npm install
# or
pnpm install
```

### Configuration

Edit `server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bhavana
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhavana

# JWT Configuration (IMPORTANT: Change these in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars_!@#$%^&*()
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production_min_32_chars_!@#$

# Client URLs for CORS
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# Email Configuration (Optional - for contact form notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Rate Limiting
MAX_LOGIN_ATTEMPTS=5
LOGIN_WINDOW_MS=900000
```

### Start Development Server

```bash
cd server
npm run dev
# or
pnpm dev
```

You should see: `Server running on port 5000`

#### Database Models

The following MongoDB collections will be created automatically:
- `admins` - Admin user accounts
- `contacts` - Website contact form submissions
- `auditlogs` - Admin action audit trail

---

## 3. Admin Panel Setup

### Installation

```bash
cd admin
npm install
# or
pnpm install
```

### Configuration

Edit `admin/.env` (or `.env.local`) file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Start Development Server

```bash
cd admin
npm run dev
# or
pnpm dev
```

Access at: `http://localhost:5174`

### Default Admin Account

After starting the server, create an admin account:

1. Go to `http://localhost:5174/register`
2. Fill in the registration form
3. Click "Register"
4. You'll be redirected to the dashboard

**OR** use MongoDB Compass to directly insert an admin:

```javascript
// Insert into 'admins' collection
{
  "email": "admin@bhavana.com",
  "password": "$2a$10$...", // Use bcrypt to hash your password
  "name": "Admin User",
  "role": "admin",
  "isActive": true
}
```

### Admin Features

- **Dashboard** - View contact statistics and overview
- **Contacts** - Manage website contact form submissions
  - View all contacts
  - Mark as read/replied/new
  - Mark as spam
  - Delete contacts
- **Admin Auth** - Secure login with JWT tokens
  - Access token (1 hour expiry)
  - Refresh token (7 days expiry)
  - Token refresh mechanism

---

## 4. Client Website Setup

### Installation

```bash
cd client
npm install
# or
pnpm install
```

### Configuration

The client will automatically use `http://localhost:5000/api` for contact form submissions.

### Start Development Server

```bash
cd client
npm run dev
# or
pnpm dev
```

Access at: `http://localhost:5173`

### Client Pages

- **Home** - Main landing page
- **About** - About Bhavana Technology
- **Services** - Service offerings
- **Contact** - Contact form to submit inquiries

---

## API Routes Reference

### Admin Authentication Routes
- `POST /api/admin/auth/register` - Register new admin
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/verify` - Verify token
- `POST /api/admin/auth/refresh` - Refresh access token
- `POST /api/admin/auth/logout` - Admin logout

### Admin Contact Routes (Protected)
- `GET /api/admin/contacts` - Get all contacts (pagination support)
- `GET /api/admin/contacts/stats` - Get contact statistics
- `GET /api/admin/contacts/:id` - Get contact by ID
- `PUT /api/admin/contacts/:id/status` - Update contact status
- `PUT /api/admin/contacts/:id/spam` - Mark as spam
- `DELETE /api/admin/contacts/:id` - Delete contact

### Public Routes
- `POST /api/contact` - Submit contact form message
- `GET /health` - Health check
- `GET /` - API status

---

## Complete Startup Checklist

### ✅ Pre-Launch Checks

- [ ] MongoDB is running and accessible
- [ ] `.env` file is configured in `/server`
- [ ] Server starts without errors on port 5000
- [ ] Admin panel loads at `http://localhost:5174`
- [ ] Client website loads at `http://localhost:5173`

### ✅ Functional Tests

**Admin Panel:**
- [ ] Register a new admin account
- [ ] Login with credentials
- [ ] Dashboard displays correctly
- [ ] Can view contacts
- [ ] Can update contact status
- [ ] Can mark as spam
- [ ] Can delete contacts
- [ ] Logout works properly

**Client Website:**
- [ ] Navigate through all pages (Home, About, Services, Contact)
- [ ] Submit a contact form message
- [ ] See success/error messages
- [ ] Check MongoDB to verify contact was saved

**Server:**
- [ ] Health check: `GET http://localhost:5000/health`
- [ ] Admin routes are protected (401 without token)
- [ ] Token refresh works
- [ ] Rate limiting on login (after 5 attempts)

---

## Running All Services Simultaneously

### Using Terminal Tabs/Splits:

```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Admin
cd admin && npm run dev

# Terminal 3 - Client
cd client && npm run dev
```

### Using Concurrently (Optional):

Create a script at project root:

```bash
# Install globally
npm install -g concurrently

# Create npm script in root package.json or run:
concurrently "cd server && npm run dev" "cd admin && npm run dev" "cd client && npm run dev"
```

---

## Troubleshooting

### "Connection refused" on admin login
- **Issue**: Server is not running
- **Fix**: Start server with `cd server && npm run dev`

### "CORS error" in browser console
- **Issue**: CORS not properly configured
- **Fix**: Check `server/server.js` CORS settings match your dev URLs

### "Token expired" errors
- **Issue**: JWT_SECRET or JWT_REFRESH_SECRET not set
- **Fix**: Update `.env` in server folder with proper secrets

### MongoDB connection fails
- **Issue**: MongoDB not running or wrong connection string
- **Fix**: 
  - For local: Start MongoDB service
  - For Atlas: Verify connection string in `.env`

### Admin registration not working
- **Issue**: Email already exists or validation error
- **Fix**: Check console logs in server and browser for specific error

### Emails not sending
- **Issue**: Email credentials not configured
- **Fix**: This is optional - contacts are still saved even if email fails

---

## Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
JWT_SECRET=<generate-strong-random-secret>
JWT_REFRESH_SECRET=<generate-strong-random-secret>
```

### Generate Strong Secrets

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Build Instructions

```bash
# Admin build
cd admin
npm run build

# Client build
cd client
npm run build

# Server (no build needed, copy to production)
cd server
npm install --production
```

---

## Security Notes

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Change JWT secrets** in production
3. **Use HTTPS** in production
4. **Set strong MongoDB passwords** for cloud instances
5. **Enable MongoDB authentication** in production
6. **Use environment-specific configurations**

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console logs in browser (F12) and terminal
3. Check server logs for API errors
4. Verify MongoDB connection and data

---

Last Updated: June 28, 2024
