const express = require('express');
const Article = require('../models/Article');
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose'); // ✅ added

const router = express.Router();

/**
 * GET /api/history
 * Get user's analysis history
 */
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = parseInt(req.query.skip) || 0;
    const { classification } = req.query;

    let query = { userId: req.userId };

    if (classification && ['Real', 'Fake', 'Unknown'].includes(classification)) {
      query.classification = classification;
    }

    const total = await Article.countDocuments(query);

    const articles = await Article.find(query)
      .sort({ analyzedAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-content');

    res.json({
      message: 'History retrieved successfully',
      articles,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/history/stats
 * Get statistics of user's analyses
 */
router.get('/stats', authMiddleware, async (req, res, next) => {
  try {
    const stats = await Article.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } }, // ✅ FIXED
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          realCount: {
            $sum: { $cond: [{ $eq: ['$classification', 'Real'] }, 1, 0] }
          },
          fakeCount: {
            $sum: { $cond: [{ $eq: ['$classification', 'Fake'] }, 1, 0] }
          },
          unknownCount: {
            $sum: { $cond: [{ $eq: ['$classification', 'Unknown'] }, 1, 0] }
          },
          avgConfidence: { $avg: '$confidence' }
        }
      }
    ]);

    const userStats = stats[0] || {
      total: 0,
      realCount: 0,
      fakeCount: 0,
      unknownCount: 0,
      avgConfidence: 0
    };

    res.json({
      stats: {
        totalAnalyzed: userStats.total,
        realCount: userStats.realCount,
        fakeCount: userStats.fakeCount,
        unknownCount: userStats.unknownCount,
        averageConfidence: Math.round(userStats.avgConfidence * 100) / 100
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/history/:id
 */
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/history/:id
 */
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { tags } = req.body;

    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { tags: tags || [] },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({
      message: 'Article updated successfully',
      article
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;