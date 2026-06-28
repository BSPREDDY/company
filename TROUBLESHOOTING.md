# Troubleshooting Guide

This document covers common issues and their solutions.

---

## Error: "AxiosError: Network Error" / "ERR_CONNECTION_REFUSED"

### Symptoms
```
AxiosError: Network Error
POST http://localhost:5000/api/admin/auth/login net::ERR_CONNECTION_REFUSED
```

### Causes
1. **Server is not running**
2. **Server crashed or failed to start**
3. **Wrong port in API configuration**
4. **MongoDB connection failed**

### Solutions

**Step 1: Verify Server is Running**
```bash
# Open a new terminal and go to server directory
cd server
npm run dev
```

You should see:
```
================================
  Bhavana Technology API Server
================================
✓ Server running on port 5000
✓ Environment: development
✓ CORS enabled for:
  - Client: http://localhost:5173
  - Admin: http://localhost:5174
✓ Database: mongodb://localhost:27017/bhavana

Available Endpoints:
  GET  http://localhost:5000/
  GET  http://localhost:5000/health
  ...
================================
```

**Step 2: Test Server Connectivity**
```bash
# In another terminal, test the health endpoint
curl http://localhost:5000/health

# Or open in browser:
# http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-06-28T...",
  "uptime": 123.456
}
```

**Step 3: Check MongoDB Connection**

If you don't see "✓ Database: mongodb://..." when server starts:

```bash
# For local MongoDB
mongosh mongodb://localhost:27017

# For MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/bhavana"
```

**Step 4: Update API Base URL (if needed)**

In `admin/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // Make sure this is correct
```

---

## Error: "CORS error" in Browser Console

### Symptoms
```
Access to XMLHttpRequest at 'http://localhost:5000/api/admin/auth/login' 
from origin 'http://localhost:5174' has been blocked by CORS policy
```

### Causes
1. Admin panel running on wrong port
2. CORS not properly configured in server

### Solutions

**Step 1: Verify Admin Port**
```bash
# Check where admin is running
# Should be http://localhost:5174
# Open browser dev tools (F12) and check the URL bar
```

**Step 2: Update server/.env CORS settings**

Edit `server/.env`:
```env
ADMIN_URL=http://localhost:5174  # Make sure this matches
CLIENT_URL=http://localhost:5173
```

**Step 3: Restart Server**
```bash
# Stop server (Ctrl+C)
# Restart server
cd server && npm run dev
```

---

## Error: "Invalid email or password"

### Symptoms
- Login fails with "Invalid email or password"
- Registration succeeds but can't login

### Causes
1. Admin account doesn't exist
2. Wrong credentials
3. Password hashing issue

### Solutions

**Step 1: Register First**
1. Go to http://localhost:5174/register
2. Create a new admin account
3. Try logging in with those credentials

**Step 2: Check Admin in Database**

Using MongoDB Compass or mongosh:
```javascript
// Connect to MongoDB
mongosh mongodb://localhost:27017

// Use bhavana database
use bhavana

// Check if admin exists
db.admins.find()

// Should show something like:
// {
//   "_id": ObjectId("..."),
//   "email": "admin@example.com",
//   "password": "$2a$10$...",  // hashed password
//   "name": "Admin Name",
//   "role": "admin",
//   "isActive": true,
//   ...
// }
```

**Step 3: Check Admin is Active**

If `isActive` is false, update it:
```javascript
db.admins.updateOne(
  { email: "admin@example.com" },
  { $set: { isActive: true } }
)
```

---

## Error: "Token expired" or "Invalid token"

### Symptoms
- Logged in but immediately logged out
- "Invalid token" error when accessing protected routes

### Causes
1. JWT_SECRET not configured
2. JWT_REFRESH_SECRET not configured
3. Token expired and refresh failed

### Solutions

**Step 1: Verify JWT Secrets in server/.env**

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars_!@#$%^&*()
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production_min_32_chars_!@#$
```

Make sure:
- Both are set
- Both are at least 32 characters
- Both are different

**Step 2: Generate New Secrets** (if needed)

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Run twice to get two different secrets
```

**Step 3: Restart Server and Clear LocalStorage**

```bash
# In browser console (F12)
localStorage.clear()

# Or manually clear:
localStorage.removeItem('adminAccessToken')
localStorage.removeItem('adminRefreshToken')
localStorage.removeItem('admin')
```

Then refresh and try logging in again.

---

## Error: "Rate limit exceeded" / "Too many login attempts"

### Symptoms
```
Too many login attempts. Please try again later.
```

### Causes
1. Made more than 5 login attempts in 15 minutes
2. Rate limiter working as intended

### Solutions

**Option 1: Wait 15 Minutes**
- The rate limit resets after 15 minutes
- Try logging in again

**Option 2: Reset Rate Limiter (for development)**

The rate limiter is in-memory, so restarting the server resets it:
```bash
# Stop server (Ctrl+C)
# Restart server
cd server && npm run dev
```

---

## Error: MongoDB Connection Failed

### Symptoms
```
MongooseError: Cannot connect to MongoDB
MongoParseError: Invalid connection string
```

### Causes
1. MongoDB not running
2. Wrong connection string
3. MongoDB credentials wrong

### Solutions

**For Local MongoDB:**

```bash
# Start MongoDB service (Windows)
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

# Or on macOS with Homebrew
brew services start mongodb-community

# Or on Linux
sudo systemctl start mongod

# Verify it's running
mongosh
```

**For MongoDB Atlas (Cloud):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: "Connect" → "Drivers" → copy connection string
4. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhavana?retryWrites=true&w=majority
   ```
5. Replace `username`, `password`, and cluster name

**Test Connection:**

```javascript
mongosh "your_connection_string"
```

---

## Error: Port Already in Use

### Symptoms
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Causes
1. Another service running on port 5000
2. Previous server process didn't stop properly

### Solutions

**Option 1: Kill Process Using Port**

```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in server/.env
PORT=5001
```

**Option 2: Use Different Port**

Edit `server/.env`:
```env
PORT=5001  # Use different port
```

Then update admin API URL in `admin/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

---

## Admin Dashboard Blank or Not Loading

### Symptoms
- Admin panel loads but no content visible
- Console shows errors

### Solutions

**Step 1: Check Browser Console (F12)**
- Look for any error messages
- Red errors are most important

**Step 2: Check if Authenticated**
- Open DevTools → Application → LocalStorage
- Look for `adminAccessToken` and `adminRefreshToken`
- If not present, user is not authenticated

**Step 3: Re-login**
1. Go to http://localhost:5174/login
2. Clear any errors
3. Login again

**Step 4: Check Network Tab**
- Open DevTools → Network tab
- Try to perform an action
- Look for failed API calls (red)
- Click on failed request to see error response

---

## Contact Form Not Submitting

### Symptoms
- "Failed to send message" error
- Message not appearing in admin panel

### Causes
1. Server not running
2. Database connection failed
3. API endpoint path wrong

### Solutions

**Step 1: Verify Server is Running**
```bash
curl http://localhost:5000/health
```

**Step 2: Check Browser Console**
- Open DevTools (F12)
- Look for error messages
- Check Network tab for failed requests

**Step 3: Verify Database Connection**
```javascript
// In mongosh
mongosh
use bhavana
db.contacts.find()  // Should show any submitted contacts
```

---

## Server Crashes on Startup

### Symptoms
```
Server starts then immediately crashes
No error message shown
```

### Causes
1. MongoDB connection error
2. Missing environment variables
3. Syntax error in code

### Solutions

**Step 1: Check Detailed Error**

```bash
cd server
node server.js  # Run directly instead of npm run dev
```

This will show more detailed error information.

**Step 2: Verify All Dependencies**

```bash
cd server
npm install
npm list  # Check for any issues
```

**Step 3: Check for Syntax Errors**

```bash
node --check server.js  # Check for syntax errors
```

---

## Admin Features Not Working

### "View Contacts" Shows Empty or Error

**Check:**
1. Server is running
2. You're logged in (have valid token)
3. Open browser DevTools → Network → Check API call response

### "Update Status" Button Does Nothing

**Solutions:**
```bash
# Check browser console for errors
# Check server logs for API errors
# Verify contact ID exists in database
```

### "Delete Contact" Fails

**Check:**
1. Refresh page first
2. Verify contact still exists in database
3. Check for 404 error in network tab

---

## Email Not Sending in Contact Form

### Symptoms
- Contact form submits successfully
- Contact appears in admin but no email received

### Causes (this is optional)
1. Email configuration not set
2. Gmail app password wrong
3. SMTP credentials incorrect

### Solution

This feature is optional. Contacts are saved even if emails fail.

To enable emails:

1. Get Gmail App Password: https://myaccount.google.com/apppasswords
2. Update `server/.env`:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_char_app_password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ```
3. Restart server

---

## Debug Logging

### Enable Full Logging

All console logs are prefixed with `[v0]` for easy identification:

**Server Logs:**
```
[v0] Login attempt for email: admin@example.com
[v0] Login successful for: admin@example.com
[v0] API Error: { message: '...', code: '...' }
```

**Client Logs (Browser Console F12):**
```
[v0] Login error: Network Error
[v0] API Error: AxiosError
[v0] Register error: ...
```

### Common Debug Scenarios

**Login Flow Debug:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to login
4. Look for `[v0]` logs showing the flow

**API Call Debug:**
1. Open DevTools → Network tab
2. Try the action
3. Click the failed request
4. Check Response tab for error details

---

## Still Having Issues?

### Checklist Before Asking for Help

- [ ] Server is running: `http://localhost:5000/health` returns OK
- [ ] MongoDB is running and connected
- [ ] `.env` file exists in server directory
- [ ] Admin is on `http://localhost:5174`
- [ ] Client is on `http://localhost:5173`
- [ ] Browser console shows `[v0]` log messages
- [ ] Checked network tab for failed requests

### Information to Provide

When reporting issues, include:
1. Full error message (copy from console)
2. Which page/action triggered the error
3. Server log output (terminal where server runs)
4. Screenshots of browser console errors
5. Results of: `curl http://localhost:5000/health`

---

Last Updated: June 28, 2024
