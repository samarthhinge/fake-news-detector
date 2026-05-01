/**
 * Input validation utilities
 * Prevents XSS, SQL injection, and other common attacks
 */

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
 * Validate email format
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate password strength
 * - At least 6 characters
 * - No very common patterns
 */
function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  if (password.length < 6) return false;
  
  // Reject very common passwords
  const commonPasswords = ['123456', 'password', 'qwerty', 'admin'];
  if (commonPasswords.includes(password.toLowerCase())) return false;
  
  return true;
}

/**
 * Validate username
 * - 3-30 characters
 * - Alphanumeric, underscore, hyphen
 */
function validateUsername(username) {
  if (!username || typeof username !== 'string') return false;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
  return usernameRegex.test(username.trim());
}

/**
 * Sanitize text input
 * - Remove potentially malicious HTML/JS
 * - Trim whitespace
 */
function sanitizeText(text) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .trim()
    .replace(/[<>\"']/g, '') // Remove HTML special characters
    .slice(0, 5000); // Limit length
}

/**
 * Validate and sanitize article content
 */
function validateArticleContent(title, content) {
  const errors = [];
  
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (title && title.length > 500) {
    errors.push('Title is too long (max 500 chars)');
  }
  
  if (!content || content.trim().length === 0) {
    errors.push('Content is required');
  }
  if (content && content.length > 10000) {
    errors.push('Content is too long (max 10000 chars)');
  }
  if (content && content.length < 20) {
    errors.push('Content is too short (min 20 chars)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      title: sanitizeText(title),
      content: sanitizeText(content)
    }
  };
}

/**
 * Validate URL format
 */
function validateUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return URL_REGEX.test(url.trim());
}

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeText,
  validateArticleContent,
  validateUrl
};
