# Quick Start Guide - 5 Minutes to Running App

## ⚡ Fast Track Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or Atlas account

### 1. Start MongoDB (Choose One)

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
- Create account at mongodb.com/cloud/atlas
- Create cluster and get connection string
- Skip to server setup

### 2. Configure Server (1 minute)

```bash
cd server
# The .env file is already created with defaults
# For MongoDB Atlas, edit server/.env and update MONGODB_URI
```

### 3. Start All Services (Terminal Tabs)

**Tab 1 - Server:**
```bash
cd server
npm install
npm run dev
```

**Tab 2 - Admin:**
```bash
cd admin
npm install
npm run dev
```

**Tab 3 - Client:**
```bash
cd client
npm install
npm run dev
```

### 4. Create Admin Account (1 minute)

1. Go to: http://localhost:5174/register
2. Fill in email, password, name
3. Click Register
4. You're now logged in!

### 5. Test Everything (2 minutes)

**Test Server:**
- Open http://localhost:5000/health
- Should show: `{"status":"OK",...}`

**Test Admin:**
- Already logged in at http://localhost:5174/dashboard
- Click "Contacts" to view contact submissions

**Test Client:**
- Go to http://localhost:5173
- Click Contact
- Submit a test message
- Check admin panel → contacts to see it

---

## ✅ Success Indicators

You're all set when you see:

**Server Terminal:**
```
================================
  Bhavana Technology API Server
================================
✓ Server running on port 5000
```

**Admin Browser:**
- You see the dashboard (not login page)

**Client Browser:**
- Homepage loads with full content

---

## 🔑 Default Accounts

After registration:
- **Admin:** admin@youremail.com (whatever you created)
- **Password:** whatever you set (min 8 chars)

---

## 📱 Application URLs

| App | URL | Purpose |
|-----|-----|---------|
| Admin Panel | http://localhost:5174 | Manage contacts, view dashboard |
| Client Site | http://localhost:5173 | Public website |
| Server API | http://localhost:5000 | Backend API |

---

## ⚠️ Common Issues Quick Fix

### "Connection refused" Error
```bash
# Server not running - start it:
cd server && npm run dev
```

### "Invalid email or password"
```bash
# Go register first:
# http://localhost:5174/register
```

### "CORS error"
```bash
# Server restart needed:
# Ctrl+C in server terminal
# npm run dev
```

### MongoDB not connecting
```bash
# For local MongoDB:
mongod  # Run in another terminal

# For Atlas:
# Edit server/.env, update MONGODB_URI
# Restart server
```

---

## 📝 Next Steps

After getting it running:

1. **Explore Admin Features**
   - View contacts from submitted forms
   - Mark contacts as read/replied
   - Mark spam contacts
   - Delete contacts

2. **Customize**
   - Edit pages in `client/src/pages/`
   - Modify routes in `admin/src/App.jsx`
   - Update styling with Tailwind

3. **Add Features**
   - Create new API endpoints in `server/routes/`
   - Add new admin pages in `admin/src/pages/`
   - Connect database to new features

4. **Deploy**
   - Read SETUP_GUIDE.md for deployment instructions
   - Use Vercel, Netlify, AWS, or your hosting

---

## 📚 Full Documentation

- **Setup Details:** Read `SETUP_GUIDE.md`
- **Troubleshooting:** Check `TROUBLESHOOTING.md`
- **All Fixes Applied:** See `FIXES_APPLIED.md`

---

## 🚀 One Command Startup (Optional)

Use the automated startup script:

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows:**
```bash
# Run each in separate terminal or use:
start cmd /k "cd server && npm run dev"
start cmd /k "cd admin && npm run dev"
start cmd /k "cd client && npm run dev"
```

---

## 💡 Pro Tips

1. **Keep Terminal Visible**
   - View logs while testing
   - Spot errors immediately

2. **Use Browser DevTools (F12)**
   - Console tab shows [v0] logs
   - Network tab shows API calls
   - Application tab shows stored tokens

3. **MongoDB Compass**
   - GUI for MongoDB data
   - View collections visually
   - Verify contact submissions

---

That's it! Your app is running. 🎉

For detailed information, see the full documentation in SETUP_GUIDE.md
