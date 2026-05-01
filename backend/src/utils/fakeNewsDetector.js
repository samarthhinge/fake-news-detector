/**
 * Fake News Detection Engine
 * Uses pattern matching and heuristics for classification
 * In production, replace with ML model or API call
 */

const FAKE_NEWS_PATTERNS = [
  { pattern: /you won't believe/i, score: 15, reason: 'Clickbait language' },
  { pattern: /shocking|unbelievable/i, score: 10, reason: 'Sensationalism' },
  { pattern: /doctors hate/i, score: 25, reason: 'Conspiracy pattern' },
  { pattern: /one weird trick/i, score: 30, reason: 'Classic fake news pattern' },
  { pattern: /government (hides|covers up)/i, score: 20, reason: 'Conspiracy theory' },
  { pattern: /miracle cure|secret remedy/i, score: 25, reason: 'Health misinformation' },
  { pattern: /all caps\s+all/i, score: 8, reason: 'Excessive capitalization' },
  { pattern: /!!!+/g, score: 5, reason: 'Multiple exclamation marks' },
  { pattern: /\?\?+/g, score: 3, reason: 'Multiple question marks' }
];

const TRUSTWORTHY_PATTERNS = [
  { pattern: /according to|scientific study|research shows/i, score: -10, reason: 'Evidence-based language' },
  { pattern: /university|research institute|peer-reviewed/i, score: -15, reason: 'Academic sources' },
  { pattern: /fact-check|verified|confirmed/i, score: -20, reason: 'Fact-checking language' }
];

/**
 * Calculate fake news confidence score
 * @param {string} text - The article text to analyze
 * @returns {object} - { classification, confidence, reasoning }
 */
function detectFakeNews(text) {
  if (!text || typeof text !== 'string') {
    return {
      classification: 'Unknown',
      confidence: 0,
      reasoning: 'Invalid text provided'
    };
  }

  let fakeScore = 50; // Start at 50 (neutral)
  let detectedReasons = [];

  // Check fake news patterns
  FAKE_NEWS_PATTERNS.forEach(({ pattern, score, reason }) => {
    const matches = text.match(pattern);
    if (matches) {
      fakeScore += score * Math.min(matches.length, 3); // Cap multiplier at 3
      detectedReasons.push(reason);
    }
  });

  // Check trustworthy patterns
  TRUSTWORTHY_PATTERNS.forEach(({ pattern, score, reason }) => {
    const matches = text.match(pattern);
    if (matches) {
      fakeScore += score * Math.min(matches.length, 3);
      detectedReasons.push(reason);
    }
  });

  // Check text quality indicators
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 50) {
    fakeScore += 15; // Short texts are often fake
    detectedReasons.push('Very short article');
  } else if (wordCount > 2000) {
    fakeScore -= 5; // Longer articles tend to be more legitimate
    detectedReasons.push('Detailed article');
  }

  // Normalize score to 0-100
  const confidence = Math.max(0, Math.min(100, fakeScore));

  // Classify based on confidence
  let classification;
  if (confidence >= 65) {
    classification = 'Fake';
  } else if (confidence <= 35) {
    classification = 'Real';
  } else {
    classification = 'Unknown';
  }

  return {
    classification,
    confidence: Math.round(confidence),
    reasoning: detectedReasons.length > 0 
      ? detectedReasons.slice(0, 3).join('; ')
      : 'No specific patterns detected'
  };
}

/**
 * Extract text from content (remove extra whitespace, normalize)
 * @param {string} content - Raw article content
 * @returns {string} - Cleaned content
 */
function cleanContent(content) {
  return content
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .toLowerCase();
}

module.exports = {
  detectFakeNews,
  cleanContent
};
