# Deployment Guide

## Frontend Deployment (Vercel)

### What is Vercel?
Vercel is an optimal platform for Next.js and React apps. Free tier includes:
- Unlimited deployments
- Custom domains
- SSL certificates
- Global CDN

### Step-by-Step Deployment

#### 1. Prepare Your Code
```bash
# Ensure code is in Git repository
git init
git add .
git commit -m "Initial commit"
```

#### 2. Push to GitHub

```bash
# Create new repository on github.com
# Then:
git remote add origin https://github.com/yourusername/fake-news-detector.git
git branch -M main
git push -u origin main
```

#### 3. Deploy to Vercel

**Method 1: Via Vercel Dashboard**
1. Visit [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com/api` (Render URL)

7. Click "Deploy"

**Method 2: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend
vercel

# Follow prompts
# Select "Vercel"
# Link to GitHub project
# Deploy
```

#### 4. Configure Custom Domain (Optional)
1. In Vercel dashboard, go to Settings → Domains
2. Add your domain
3. Update DNS records at domain registrar

#### 5. Monitor Deployment
- View deployments in Vercel dashboard
- Check build logs
- View live site

### Frontend Deployment Checklist
- [ ] Code in GitHub repository
- [ ] Vercel account created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Site accessible
- [ ] Links work correctly

---

## Backend Deployment (Render)

### What is Render?
Render is an all-in-one platform for building and deploying Node.js apps. Free tier includes:
- Auto-deploy from Git
- SSL certificates
- Automatic restarts
- Shared CPU

### Step-by-Step Deployment

#### 1. Prepare Backend Code

**Create `.nvmrc` file** (optional, specifies Node version)
```
18
```

#### 2. Push to GitHub
(Same as frontend - repository should include both frontend and backend)

#### 3. Deploy to Render

1. Visit [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect GitHub repository

#### 4. Configure Service

**Basic Settings:**
- **Name**: `fake-news-detector-api` (or your choice)
- **Environment**: Node
- **Region**: Choose closest to users
- **Branch**: `main`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

**Or just set Root Directory to `backend`:**
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### 5. Set Environment Variables

Click "Environment" and add:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fake_news_detector
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=5000
```

#### 6. Deploy

Click "Create Web Service"

Render will:
- Build your app
- Deploy to live URL
- Show in dashboard

#### 7. Get Your Backend URL

- Go to Service settings
- Find "Renders" section
- Copy the deployed URL: `https://xxxx-xxxx-xxxx.onrender.com`
- This is your `REACT_APP_API_URL` for frontend!

### Backend Deployment Checklist
- [ ] Code in GitHub (backend directory)
- [ ] Render account created
- [ ] Repository connected
- [ ] Build command correct
- [ ] Start command correct
- [ ] Environment variables set
- [ ] MongoDB URI updated (use Atlas)
- [ ] FRONTEND_URL set correctly
- [ ] Build succeeds
- [ ] API responds (test /api/health)

---

## Database Deployment (MongoDB Atlas)

### What is MongoDB Atlas?
MongoDB Atlas is the official cloud database service. Free tier includes:
- 512MB storage
- Unlimited connections
- SSL encryption
- Daily backups

### Step-by-Step Setup

#### 1. Create Account
Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

#### 2. Create Organization & Project
- Create organization
- Create project (defaults to free)

#### 3. Build Cluster

**Create Cluster:**
1. Click "Create" (green button)
2. Select "Free" (M0 cluster)
3. Choose cloud provider (AWS, Google Cloud, Azure)
4. Choose region closest to users
5. Click "Create Cluster"

Wait 5-10 minutes for cluster to be ready.

#### 4. Create Database User

**Add User:**
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Enter username and password
4. Note these credentials!
5. Click "Create Database User"

#### 5. Set Network Access

**Add IP Address:**
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. For development: Add `0.0.0.0/0` (allows all)
4. For production: Add specific server IP
5. Click "Confirm"

#### 6. Get Connection String

**Get Connection String:**
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database user password

Example:
```
mongodb+srv://username:password@cluster-name.mongodb.net/fake_news_detector?retryWrites=true&w=majority
```

#### 7. Update Backend Configuration

In `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/fake_news_detector?retryWrites=true&w=majority
```

Or if deploying to Render:
1. Go to Web Service settings
2. Click "Environment"
3. Add `MONGODB_URI` variable with value

#### 8. Test Connection

```bash
# From backend directory
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connected'))
  .catch(err => console.log('✗ Failed', err));
"
```

### MongoDB Atlas Checklist
- [ ] Account created
- [ ] Cluster created (M0 free tier)
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string copied
- [ ] Connection string updated in backend
- [ ] Connection tested
- [ ] Backend can access database

---

## Full Deployment Checklist

### Pre-Deployment
- [ ] All code committed to Git
- [ ] All tests passing (if any)
- [ ] Environment variables documented
- [ ] No sensitive data in code
- [ ] Build succeeds locally
- [ ] No console errors

### Frontend (Vercel)
- [ ] Vercel account created
- [ ] GitHub connected
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Site accessible
- [ ] All pages work
- [ ] Links to backend working

### Backend (Render)
- [ ] Render account created
- [ ] GitHub connected
- [ ] Build command correct
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Health check responds
- [ ] Can connect to database

### Database (MongoDB Atlas)
- [ ] Cluster created
- [ ] User created
- [ ] IP whitelisted
- [ ] Connection string set
- [ ] Backend can access

### Final Testing
- [ ] Signup creates user
- [ ] Login works
- [ ] Can analyze articles
- [ ] History saves
- [ ] Dashboard displays data
- [ ] Reports submit
- [ ] No CORS errors
- [ ] Load times acceptable

---

## Post-Deployment

### Monitor Your App

**Vercel:**
- Dashboard shows build status
- View analytics
- Check error logs

**Render:**
- View service status
- Check logs
- Monitor resource usage

**MongoDB:**
- View cluster metrics
- Check storage usage
- Review backup status

### Update Deployments

**After code changes:**
```bash
git add .
git commit -m "Update feature"
git push origin main
```

- Vercel & Render auto-deploy
- No manual steps needed

### Custom Domain (Optional)

**For frontend:**
- Add domain in Vercel settings
- Update DNS records at registrar
- Wait 24-48 hours for propagation

**For backend:**
- Add domain in Render settings
- Update frontend `REACT_APP_API_URL`
- Redeploy frontend

### SSL Certificates

Both Vercel and Render automatically provide SSL certificates. Your URLs will be HTTPS by default.

### Scale Your App

**When needed:**
- **Frontend**: Vercel handles automatically
- **Backend**: Upgrade Render plan (paid)
- **Database**: Upgrade MongoDB cluster (paid)

---

## Common Deployment Issues

### Issue: Build Fails on Vercel

**Check:**
1. See build logs in Vercel dashboard
2. Common fixes:
   - Missing environment variables
   - Wrong build command
   - Node version mismatch

### Issue: Backend Can't Connect to Database

**Check:**
1. MongoDB connection string is correct
2. Database user password is correct
3. IP address is whitelisted in Atlas
4. Network connectivity (check Render logs)

### Issue: Frontend Shows 404 Errors

**Check:**
1. Backend URL in environment variable is correct
2. CORS is enabled in backend
3. Backend is running (test `/api/health`)
4. No typos in API endpoints

### Issue: Stuck on Loading

**Check:**
1. Network tab shows no errors
2. Backend is responding to requests
3. Database has data
4. API response times (check Render logs)

---

## Production Best Practices

### Security
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable CORS only for frontend domain
- [ ] Use HTTPS (automatic with Vercel/Render)
- [ ] Update dependencies regularly
- [ ] Review MongoDB user permissions

### Performance
- [ ] Enable caching in frontend
- [ ] Add database indexes
- [ ] Use CDN for static files
- [ ] Monitor response times
- [ ] Optimize images

### Monitoring
- [ ] Set up error logging (e.g., Sentry)
- [ ] Monitor database performance
- [ ] Check uptime with monitoring service
- [ ] Review logs regularly
- [ ] Set up alerts for errors

### Backups
- [ ] Enable MongoDB backups
- [ ] Test restore procedures
- [ ] Keep backup copies
- [ ] Document backup process

---

## Estimated Costs

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel | ✅ | Unlimited deployments, small projects |
| Render | ✅ | 750 free hours/month (shared CPU) |
| MongoDB Atlas | ✅ | 512MB storage, M0 cluster |
| **Total** | **✅ FREE** | Great for learning/small projects |

**When to upgrade:**
- Vercel: Large projects (upgrade paid plan)
- Render: Heavy traffic/more CPU (upgrade plan)
- MongoDB: >512MB data (upgrade cluster tier)

---

## Success! 🎉

Your app is now live! Share your deployment URLs:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

Continue development and push updates anytime!
