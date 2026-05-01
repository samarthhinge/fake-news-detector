const express = require('express');
const Report = require('../models/Report');
const authMiddleware = require('../middleware/auth');
const { sanitizeText } = require('../utils/validators');

const router = express.Router();

/**
 * POST /api/report
 * Create a report about a news article
 * Requires: authentication
 */
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, content, reportReason, description, articleId } = req.body;

    // Validation
    if (!title || !content || !reportReason) {
      return res.status(400).json({ 
        error: 'Title, content, and report reason are required' 
      });
    }

    if (!['Misleading Information', 'False Headline', 'Conspiracy Theory', 
           'Misinformation', 'Propaganda', 'Other'].includes(reportReason)) {
      return res.status(400).json({ error: 'Invalid report reason' });
    }

    if (content.length < 10) {
      return res.status(400).json({ error: 'Content must be at least 10 characters' });
    }

    // Create report
    const report = new Report({
      userId: req.userId,
      articleId: articleId || null,
      title: sanitizeText(title),
      content: sanitizeText(content),
      reportReason,
      description: description ? sanitizeText(description) : null
    });

    await report.save();

    res.status(201).json({
      message: 'Report submitted successfully',
      report: {
        id: report._id,
        status: report.status,
        reportedAt: report.reportedAt
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/report
 * Get user's reports (non-admin view - only shows their own reports)
 * Requires: authentication
 */
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = parseInt(req.query.skip) || 0;

    const reports = await Report.find({ userId: req.userId })
      .sort({ reportedAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Report.countDocuments({ userId: req.userId });

    res.json({
      reports,
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
 * GET /api/report/:id
 * Get details of a specific report
 * Requires: authentication (only user who submitted can view)
 */
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({ report });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
