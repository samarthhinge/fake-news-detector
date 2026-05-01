import axios from 'axios';

// Get API base URL from environment or use default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // If 401, user is unauthorized - clear storage
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  signup: (username, email, password, confirmPassword) =>
    apiClient.post('/auth/signup', { username, email, password, confirmPassword }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  getMe: () =>
    apiClient.get('/auth/me')
};

// ============ ANALYZE ENDPOINTS ============

export const analyzeAPI = {
  analyze: (title, content, source = 'pasted', url = null, tags = []) =>
    apiClient.post('/analyze', { title, content, source, url, tags }),
  
  getArticle: (id) =>
    apiClient.get(`/analyze/${id}`)
};

// ============ HISTORY ENDPOINTS ============

export const historyAPI = {
  getHistory: (limit = 50, skip = 0, classification = null) =>
    apiClient.get('/history', { params: { limit, skip, classification } }),
  
  getStats: () =>
    apiClient.get('/history/stats'),
  
  deleteArticle: (id) =>
    apiClient.delete(`/history/${id}`),
  
  updateArticle: (id, tags) =>
    apiClient.put(`/history/${id}`, { tags })
};

// ============ REPORT ENDPOINTS ============

export const reportAPI = {
  createReport: (title, content, reportReason, description = '', articleId = null) =>
    apiClient.post('/report', { title, content, reportReason, description, articleId }),
  
  getReports: (limit = 50, skip = 0) =>
    apiClient.get('/report', { params: { limit, skip } }),
  
  getReport: (id) =>
    apiClient.get(`/report/${id}`)
};

export default apiClient;
