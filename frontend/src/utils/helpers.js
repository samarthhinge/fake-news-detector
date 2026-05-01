/**
 * Utility functions for frontend
 */

/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get color based on classification
 */
export const getClassificationColor = (classification) => {
  switch (classification) {
    case 'Fake':
      return 'text-red-600';
    case 'Real':
      return 'text-green-600';
    case 'Unknown':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Get background color based on classification
 */
export const getClassificationBgColor = (classification) => {
  switch (classification) {
    case 'Fake':
      return 'bg-red-100';
    case 'Real':
      return 'bg-green-100';
    case 'Unknown':
      return 'bg-yellow-100';
    default:
      return 'bg-gray-100';
  }
};

/**
 * Get icon based on classification
 */
export const getClassificationIcon = (classification) => {
  switch (classification) {
    case 'Fake':
      return '✗';
    case 'Real':
      return '✓';
    case 'Unknown':
      return '?';
    default:
      return '•';
  }
};

/**
 * Extract error message from API response
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
    return error.response.data.errors.join(', ');
  }
  if (error.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 100) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};
