const mongoose = require('mongoose');

// Report Schema for user-reported news articles
const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  reportReason: {
    type: String,
    enum: [
      'Misleading Information',
      'False Headline',
      'Conspiracy Theory',
      'Misinformation',
      'Propaganda',
      'Other'
    ],
    required: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'confirmed', 'rejected'],
    default: 'pending'
  },
  reportedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewerNotes: {
    type: String
  }
});

module.exports = mongoose.model('Report', reportSchema);
