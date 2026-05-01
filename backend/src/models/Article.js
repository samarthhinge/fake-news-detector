const mongoose = require('mongoose');

// Article Schema to store analyzed news articles
const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['pasted', 'url'],
    default: 'pasted'
  },
  url: {
    type: String,
    trim: true
  },
  classification: {
    type: String,
    enum: ['Real', 'Fake', 'Unknown'],
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  reasoning: {
    type: String, // Explanation for the classification
    maxlength: 500
  },
  analyzedAt: {
    type: Date,
    default: Date.now,
    index: true // Index for faster queries
  },
  isSaved: {
    type: Boolean,
    default: true
  },
  tags: [String] // User-added tags
});

module.exports = mongoose.model('Article', articleSchema);
