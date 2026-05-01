const express = require('express');
const Article = require('../models/Article');
const authMiddleware = require('../middleware/auth');
const { detectFakeNews, cleanContent } = require('../utils/fakeNewsDetector');
const { validateArticleContent } = require('../utils/validators');

const router = express.Router();

/**
 * POST /api/analyze
 * Analyze article text and detect fake news
 * Requires: authentication
 */
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, content, source, url, tags } = req.body;

    // Validate input
    const validation = validateArticleContent(title, content);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Clean content for analysis
    const cleanedContent = cleanContent(validation.sanitized.content);

    // Detect fake news
    const detection = detectFakeNews(cleanedContent);

    // Save article analysis to database
    const article = new Article({
      userId: req.userId,
      title: validation.sanitized.title,
      content: validation.sanitized.content,
      source: source || 'pasted',
      url: url || null,
      classification: detection.classification,
      confidence: detection.confidence,
      reasoning: detection.reasoning,
      tags: tags || []
    });

    await article.save();

    // Return analysis result
    res.status(200).json({
      message: 'Analysis completed',
      article: {
        id: article._id,
        title: article.title,
        classification: article.classification,
        confidence: article.confidence,
        reasoning: article.reasoning,
        analyzedAt: article.analyzedAt
      },
      analysis: {
        result: detection.classification,
        confidence: detection.confidence,
        explanation: 'Based on language patterns and content analysis'
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/analyze/:id
 * Get details of a specific analyzed article
 * Requires: authentication
 */
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ article });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
