# Fake News Detector - Full Stack Application

A complete web application for detecting fake news using pattern analysis and heuristics.

## 📋 Project Structure

```
fake-news-detector/
├── backend/                          # Node.js + Express server
│   ├── src/
│   │   ├── routes/                  # API endpoints
│   │   │   ├── auth.js             # Authentication routes
│   │   │   ├── analyze.js          # News analysis routes
│   │   │   ├── history.js          # User history routes
│   │   │   └── report.js           # Report submission routes
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── User.js             # User model with auth
│   │   │   ├── Article.js          # Article analysis model
│   │   │   └── Report.js           # User reports model
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.js             # JWT authentication
│   │   │   └── errorHandler.js     # Error handling
│   │   └── utils/                   # Utility functions
│   │       ├── fakeNewsDetector.js # ML/pattern detection logic
│   │       └── validators.js        # Input validation & sanitization
│   ├── server.js                    # Entry point
│   ├── package.json                 # Dependencies
│   └── .env.example                 # Environment template
│
├── frontend/                         # React + Tailwind CSS
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── LoginForm.jsx       # Login form
│   │   │   ├── SignupForm.jsx      # Signup form
│   │   │   ├── ArticleAnalyzer.jsx # Article analysis UI
│   │   │   ├── Dashboard.jsx       # User dashboard
│   │   │   ├── ReportNews.jsx      # Report form
│   │   │   └── ProtectedRoute.jsx  # Route protection
│   │   ├── pages/
│   │   │   └── HomePage.jsx        # Landing page
│   │   ├── utils/
│   │   │   ├── AuthContext.js      # Auth state management
│   │   │   ├── api.js              # API client
│   │   │   └── helpers.js          # Helper functions
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Tailwind styles
│   ├── package.json                 # Dependencies
│   ├── tailwind.config.js           # Tailwind config
│   └── .env.example                 # Environment template
│
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+) and npm
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Update values in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/fake_news_detector
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env.local file**
   ```bash
   cp .env.example .env.local
   ```
   Make sure `REACT_APP_API_URL=http://localhost:5000/api`

4. **Start development server**
   ```bash
   npm start
   ```
   Opens at `http://localhost:3000`

## 🔐 Authentication

### JWT Implementation
- Tokens stored in localStorage
- Auto-attached to all API requests
- 7-day expiration (configurable)
- Password hashed with bcryptjs (10 salt rounds)

### Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user (requires token)

## 📊 API Endpoints

### Analysis
- `POST /api/analyze` - Analyze article (returns classification & confidence)
- `GET /api/analyze/:id` - Get article details

### History
- `GET /api/history` - Get user's analysis history (paginated)
- `GET /api/history/stats` - Get statistics
- `DELETE /api/history/:id` - Delete article
- `PUT /api/history/:id` - Update article tags

### Reports
- `POST /api/report` - Submit fake news report
- `GET /api/report` - Get user's reports
- `GET /api/report/:id` - Get report details

## 🎯 Features

### 1. User Authentication
- Secure signup/login
- Password hashing (bcryptjs)
- JWT token authentication
- Session management

### 2. News Analysis
- Paste article text or URL
- Automatic classification: Real/Fake/Unknown
- Confidence score (0-100%)
- Detailed reasoning explanation

### 3. Analysis History
- View all analyzed articles
- Filter by classification
- Statistics dashboard
- Pagination support

### 4. Report System
- Report suspicious news
- Multiple reason categories
- Admin review system
- Community contributions

### 5. Security
- Input validation & sanitization
- XSS protection
- SQL injection prevention
- CORS enabled
- Helmet.js security headers

### 6. UI Features
- Responsive design (mobile/tablet/desktop)
- Dark mode ready
- Loading spinners
- Error handling
- Clean Tailwind styling

## 🧠 Fake News Detection Logic

The detector analyzes text for:
- **Clickbait patterns** ("you won't believe", "shocking")
- **Conspiracy indicators** ("government covers up", "doctors hate")
- **Health misinformation** ("miracle cure", "secret remedy")
- **Sensationalism** (excessive punctuation, caps)
- **Trustworthy language** ("research shows", "peer-reviewed")
- **Content quality** (word count, structure)

**Note**: For production, replace with real ML model or API (e.g., TensorFlow.js, external API)

## 📦 Database Schema

### Users
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  lastLogin: Date
}
```

### Articles
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  content: String,
  source: String ('pasted' | 'url'),
  url: String,
  classification: String ('Real' | 'Fake' | 'Unknown'),
  confidence: Number (0-100),
  reasoning: String,
  analyzedAt: Date,
  tags: [String]
}
```

### Reports
```javascript
{
  userId: ObjectId (ref: User),
  articleId: ObjectId (ref: Article),
  title: String,
  content: String,
  reportReason: String,
  description: String,
  status: String ('pending' | 'reviewed' | 'confirmed' | 'rejected'),
  reportedAt: Date
}
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect Vercel to GitHub**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` directory as root

3. **Set Environment Variables**
   - Add `REACT_APP_API_URL` pointing to your backend

4. **Deploy**
   - Vercel automatically deploys on push

### Backend Deployment (Render)

1. **Push code to GitHub**

2. **Connect Render to GitHub**
   - Visit [render.com](https://render.com)
   - Click "New Web Service"
   - Connect GitHub repository

3. **Configure Service**
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

4. **Set Environment Variables**
   - Add all variables from `.env`:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `FRONTEND_URL` (your Vercel URL)
     - `PORT=5000` (auto-set)

5. **Deploy**
   - Render automatically deploys on push

### Database Deployment (MongoDB Atlas)

1. **Create Account**
   - Visit [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region close to users
   - Create database user

3. **Get Connection String**
   - Click "Connect"
   - Copy connection string
   - Update `MONGODB_URI` in backend `.env`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Signup with new user
- [ ] Login with credentials
- [ ] Analyze test articles
- [ ] Check analysis results
- [ ] View dashboard
- [ ] Filter history by classification
- [ ] Delete articles
- [ ] Submit reports
- [ ] Mobile responsiveness

### Test Articles

**Real Article (Should score low fake %)**
```
Breaking News: Scientists Develop New Solar Panel Technology
Recent peer-reviewed research shows that scientists have successfully developed 
a new solar panel technology that increases efficiency by 15%. The study was 
conducted at leading universities and published in Nature Energy journal.
```

**Fake Article (Should score high fake %)**
```
SHOCKING: You won't believe what doctors are hiding about miracle cure!
Doctors HATE this one weird trick that cures everything! Conspiracy theory 
reveals government covers up this SECRET REMEDY! Click now before it's deleted!
```

## 🔒 Security Best Practices

- ✓ Passwords hashed with bcryptjs
- ✓ JWT tokens for stateless auth
- ✓ Input sanitization on all endpoints
- ✓ CORS properly configured
- ✓ Helmet.js security headers
- ✓ Environment variables for secrets
- ✓ SQL injection prevention via Mongoose
- ✓ XSS protection via input sanitization

### Production Checklist
- [ ] Use HTTPS only
- [ ] Change JWT_SECRET to strong random string
- [ ] Enable MongoDB IP whitelist
- [ ] Set secure CORS origins
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting on API
- [ ] Set up CSRF protection
- [ ] Regular security audits

## 📱 Dark Mode (Bonus)

To add dark mode, use Tailwind's dark mode:
1. Enable in `tailwind.config.js`: `darkMode: 'class'`
2. Add toggle button to Navbar
3. Store preference in localStorage
4. Apply `dark:` classes to components

## 🚀 Performance Optimization

- Lazy load components with `React.lazy()`
- Pagination for large lists
- Debounce search/filter inputs
- Cache API responses
- Compress images
- Code splitting in build

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - feel free to use for learning and projects

## 💡 Future Enhancements

- [ ] Real ML model integration
- [ ] Social sharing features
- [ ] Browser extension
- [ ] API rate limiting
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Two-factor authentication

## 📞 Support

For issues or questions:
1. Check documentation
2. Review API error messages
3. Check browser console for errors
4. Verify environment variables
5. Check MongoDB connection

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [JWT Authentication](https://jwt.io)

---

**Built with ❤️ for fighting misinformation**
