# Quick Reference Guide

## 🚀 One-Minute Setup

```bash
# Terminal 1: Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Terminal 2: Frontend  
cd frontend
npm install
cp .env.example .env.local
npm start
```

Visit `http://localhost:3000`

---

## 📍 Common Workflows

### Create New User
```
1. Click "Sign Up"
2. Enter username (3-30 chars, alphanumeric)
3. Enter email (valid format)
4. Enter password (min 6 chars)
5. Confirm password
6. Click "Sign Up"
```

### Analyze Article
```
1. Login
2. Click "Analyze"
3. Paste article title
4. Paste article content
5. Optional: Add tags (comma-separated)
6. Click "Check Authenticity"
7. View result
```

### Check History
```
1. Login
2. Click "Dashboard"
3. View statistics
4. View all articles
5. Filter by classification
6. Pagination for more
```

### Report Fake News
```
1. Login
2. Click navbar → "Analyze" (or go to /report)
3. Enter article title
4. Paste article content
5. Select report reason
6. Add description (optional)
7. Click "Submit Report"
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/fake_news_detector
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📡 API Quick Reference

### Auth
```bash
# Signup
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

# Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

# Get Me
GET /api/auth/me
Headers: Authorization: Bearer {token}
```

### Analyze
```bash
# Analyze Article
POST /api/analyze
Headers: Authorization: Bearer {token}
{
  "title": "Article Title",
  "content": "Article content here...",
  "tags": ["politics", "news"]
}

# Response
{
  "article": {
    "id": "xxx",
    "classification": "Fake",
    "confidence": 75,
    "reasoning": "..."
  }
}
```

### History
```bash
# Get History
GET /api/history?limit=10&skip=0&classification=Fake
Headers: Authorization: Bearer {token}

# Get Stats
GET /api/history/stats
Headers: Authorization: Bearer {token}

# Delete Article
DELETE /api/history/{id}
Headers: Authorization: Bearer {token}
```

### Report
```bash
# Create Report
POST /api/report
Headers: Authorization: Bearer {token}
{
  "title": "Article Title",
  "content": "Content or URL",
  "reportReason": "Misleading Information",
  "description": "Why it's fake"
}

# Get Reports
GET /api/report
Headers: Authorization: Bearer {token}
```

---

## 🗂️ File Locations

### Backend Key Files
| File | Location | Purpose |
|------|----------|---------|
| Entry Point | `backend/server.js` | Start server |
| Routes | `backend/src/routes/` | API endpoints |
| Models | `backend/src/models/` | Database schemas |
| Auth | `backend/src/middleware/auth.js` | JWT verification |
| Detector | `backend/src/utils/fakeNewsDetector.js` | Analysis logic |

### Frontend Key Files
| File | Location | Purpose |
|------|----------|---------|
| Main App | `frontend/src/App.jsx` | Routing setup |
| Auth Context | `frontend/src/utils/AuthContext.js` | State management |
| API Client | `frontend/src/utils/api.js` | Backend calls |
| Components | `frontend/src/components/` | UI components |

---

## 🐛 Debugging Tips

### Check Backend Logs
```bash
# Terminal 1 (where backend runs)
# Look for error messages and stack traces
# MongoDB connection issues
# API request errors
```

### Check Frontend Logs
```bash
# Open browser Dev Tools: F12
# Console tab: Look for errors
# Network tab: Check API calls
# Look for 404 or 401 errors
```

### Test API with Curl
```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

### Test in Postman
1. Create collection "Fake News Detector"
2. Create requests for each endpoint
3. Add Authorization header with token
4. Test different scenarios

---

## 🔧 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| Cannot find module | Run `npm install` |
| MongoDB connection failed | Start `mongod` or check connection string |
| CORS error | Check FRONTEND_URL in backend .env |
| Blank frontend | Clear cache (Ctrl+Shift+Del) and restart |
| 401 Unauthorized | Check token in localStorage, re-login |
| Styles not loading | Ensure Tailwind CSS build ran |

---

## 📊 Database Quick Commands

### MongoDB Local
```bash
# Connect
mongo

# Use database
use fake_news_detector

# View collections
show collections

# Count documents
db.users.countDocuments()

# Find user
db.users.findOne({ email: "test@test.com" })

# Delete collection
db.articles.deleteMany({})

# Exit
exit
```

### MongoDB Compass
1. Download and install
2. Connect to `mongodb://localhost:27017`
3. Browse collections visually
4. Query data with UI

---

## 🚀 Deployment URLs Template

Save your deployed URLs:

```
Frontend: https://your-app.vercel.app
Backend: https://your-api.onrender.com
Database: MongoDB Atlas (no public URL)

Update REACT_APP_API_URL:
https://your-api.onrender.com/api
```

---

## 🧪 Test Data

### Valid Test User
```
Username: testuser
Email: test@example.com
Password: Test@123
```

### Sample Articles

**Real Article**
```
Title: Scientific Study Shows Climate Impact
Content: Recent peer-reviewed research from leading universities 
demonstrates significant climate change patterns. The study was 
published in Nature and conducted by qualified scientists.
```

**Fake Article**
```
Title: You Won't Believe This One Weird Trick Doctors Hate!
Content: SHOCKING TRUTH about miracle cure revealed! Doctors 
HATE this! Government COVERS UP! Click now before they delete!
```

---

## 💾 Backup & Restore

### Backup MongoDB (Local)
```bash
# Backup
mongodump --out backup_folder

# Restore
mongorestore backup_folder
```

### Backup MongoDB Atlas
- Automatic daily backups (retention based on plan)
- Manual backup via Atlas UI

---

## 📈 Performance Tips

### Frontend
```javascript
// Use lazy loading
const Dashboard = React.lazy(() => import('./Dashboard'));

// Debounce search
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

### Backend
```javascript
// Add database index
schema.index({ userId: 1, analyzedAt: -1 });

// Paginate results
.limit(10).skip(page * 10)
```

---

## 🔐 Security Reminders

- ✅ Never commit .env files
- ✅ Never expose JWT_SECRET
- ✅ Always validate user input
- ✅ Use HTTPS in production
- ✅ Rotate JWT_SECRET periodically
- ✅ Keep dependencies updated
- ✅ Review security logs regularly
- ✅ Use strong passwords

---

## 📱 Responsive Breakpoints (Tailwind)

```css
sm: 640px   (mobile small)
md: 768px   (tablet)
lg: 1024px  (laptop)
xl: 1280px  (desktop)
2xl: 1536px (large desktop)

/* Use: md:text-lg (desktop only) */
```

---

## 🎨 Color Scheme

### Tailwind Colors Used
```
Primary: blue-600 (#3B82F6)
Danger: red-600 (#DC2626)
Success: green-600 (#16A34A)
Warning: yellow-600 (#CA8A04)
Gray: gray-600 (#4B5563)
```

---

## 🔗 Important Links

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Tailwind CSS**: https://tailwindcss.com
- **JWT**: https://jwt.io
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs

---

## ✅ Pre-Deployment Checklist

- [ ] Code committed to Git
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] No console errors
- [ ] Tested signup/login
- [ ] Tested analysis
- [ ] Tested dashboard
- [ ] Tested reports
- [ ] Mobile responsive
- [ ] API responses correct
- [ ] Database backups ready
- [ ] Error logging configured

---

## 📞 Support Keywords

If you get stuck, search for:
- "Cannot find module" → npm install
- "MongoDB connection" → Check connection string
- "CORS error" → Check FRONTEND_URL
- "Port in use" → Change PORT or kill process
- "Blank page" → Check console for errors
- "401 Unauthorized" → Token expired, re-login
- "Build failed" → Check build logs

---

## 🎯 Quick Navigation

| Need | Go To | Command |
|------|-------|---------|
| Setup | INSTALLATION.md | `npm install` |
| Deploy | DEPLOYMENT.md | `git push` |
| Features | README.md | Read |
| Overview | PROJECT_SUMMARY.md | Read |
| Quick Help | This file | Read |

---

**Remember**: When in doubt, check the console logs first! 🔍
