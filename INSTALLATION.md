# Installation & Setup Guide

## System Requirements
- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MongoDB**: v4.4 or higher (local or Atlas)
- **Git**: Latest version
- **RAM**: 4GB minimum
- **Disk Space**: 2GB minimum

## Complete Installation Steps

### Step 1: Clone or Download Project

```bash
# If using git
git clone https://github.com/yourusername/fake-news-detector.git
cd fake-news-detector

# Or if downloading as ZIP
unzip fake-news-detector.zip
cd fake-news-detector
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Use any text editor to update:
# - MONGODB_URI (local or MongoDB Atlas connection string)
# - JWT_SECRET (long random string)
# - FRONTEND_URL (http://localhost:3000 for dev)
```

**MongoDB Connection Options:**

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/fake_news_detector
```

**Option B: MongoDB Atlas (Cloud)**
1. Visit [atlas.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (M0 free tier)
4. Get connection string
5. Replace in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake_news_detector?retryWrites=true&w=majority
```

### Step 3: Start Backend Server

```bash
# From backend directory
npm run dev

# Expected output:
# ✓ MongoDB connected successfully
# 🚀 Server running on port 5000
# Environment: development
```

### Step 4: Setup Frontend

```bash
# Open new terminal/command prompt
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Verify REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start Frontend Server

```bash
# From frontend directory
npm start

# React app opens at http://localhost:3000
# If not, visit manually
```

## Verification Checklist

- [ ] Backend running at `http://localhost:5000/api/health` (shows `{"status":"OK"}`)
- [ ] Frontend running at `http://localhost:3000`
- [ ] MongoDB connected (check backend console)
- [ ] Can access landing page
- [ ] Signup/Login forms load

## Common Issues & Solutions

### Issue: MongoDB Connection Error
```
✗ MongoDB connection failed: MongoServerError
```

**Solution:**
1. Check MongoDB is running: `mongod` (local)
2. Check connection string in `.env`
3. For Atlas: verify IP whitelist includes your IP
4. Check username/password in connection string

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Verify backend is running
2. Check FRONTEND_URL in backend `.env` matches frontend URL
3. Restart backend after changing `.env`

### Issue: Port Already in Use
```
listen EADDRINUSE: address already in use :::5000
```

**Solution:**
1. Kill process using port: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
2. Or change PORT in `.env`
3. Or restart your machine

### Issue: npm modules not found
```
Cannot find module 'express'
```

**Solution:**
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Verify npm version: `npm -v`

### Issue: React app shows blank page
**Solution:**
1. Check browser console (F12) for errors
2. Clear browser cache: Ctrl+Shift+Delete
3. Check `.env.local` file exists
4. Restart frontend: Ctrl+C and `npm start`

## Environment Variables Reference

### Backend (.env)

| Variable | Example | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/...` | Database connection |
| `JWT_SECRET` | `your_secret_key_123...` | JWT signing key |
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment |
| `FRONTEND_URL` | `http://localhost:3000` | Frontend origin for CORS |

### Frontend (.env.local)

| Variable | Example | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:5000/api` | Backend API URL |

## Development Workflow

### Terminal Setup (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Editing Code

1. **Backend changes**: Auto-reload with nodemon
2. **Frontend changes**: Auto-reload with React dev server
3. Just save files - no need to restart

### Database Management

**View MongoDB data (if local):**
```bash
# Install MongoDB tools if needed
mongo

# Connect to database
use fake_news_detector

# View collections
show collections

# View data
db.users.find()
db.articles.find()
db.reports.find()
```

**Or use MongoDB Compass GUI:**
1. Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Connect to `mongodb://localhost:27017`
3. Browse collections visually

## First Time Testing

1. **Access the app**
   - Open http://localhost:3000

2. **Create account**
   - Click "Sign Up"
   - Enter username, email, password
   - Click "Sign Up"

3. **Login**
   - Click "Login"
   - Enter email and password
   - Click "Login"

4. **Test analysis**
   - Click "Analyze"
   - Paste sample article
   - Click "Check Authenticity"
   - View result

5. **Check dashboard**
   - Click "Dashboard"
   - View analysis history
   - View statistics

## Build for Production

### Frontend Build
```bash
cd frontend
npm run build

# Creates optimized build in frontend/build/ directory
```

### Backend Build
```bash
cd backend
npm install --production
# Ready to deploy - no build step needed
```

## Next Steps

1. **Deploy to cloud** (see DEPLOYMENT.md)
2. **Add dark mode** (update components)
3. **Integrate real ML model**
4. **Add email notifications**
5. **Setup admin dashboard**

## Getting Help

- **Check Logs**: Look at terminal output for errors
- **Browser Console**: Press F12 → Console tab for frontend errors
- **Network Tab**: F12 → Network to see API calls
- **MongoDB Logs**: Check MongoDB shell for database errors
- **Stack Overflow**: Search error messages

## Performance Tips

1. **Frontend**: 
   - Clear browser cache regularly
   - Use Chrome DevTools Performance tab
   - Check Network tab for slow requests

2. **Backend**:
   - Monitor with: `npm install -g clinic`
   - Run: `clinic doctor -- npm start`

3. **Database**:
   - Add indexes on frequently searched fields
   - Monitor with MongoDB Compass

---

**Installation complete! You're ready to develop! 🚀**
