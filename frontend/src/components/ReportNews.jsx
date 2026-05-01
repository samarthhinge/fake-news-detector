import React, { useState } from 'react';
import { reportAPI } from '../utils/api';
import { getErrorMessage } from '../utils/helpers';

/**
 * Report News Component
 * Allows users to report suspicious news articles
 */
function ReportNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reason, setReason] = useState('Misleading Information');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const reasons = [
    'Misleading Information',
    'False Headline',
    'Conspiracy Theory',
    'Misinformation',
    'Propaganda',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Validate inputs
      if (!title.trim() || !content.trim()) {
        setError('Please provide both title and content');
        return;
      }

      // Call report API
      await reportAPI.createReport(title, content, reason, description);

      setSuccess(true);
      
      // Clear form
      setTitle('');
      setContent('');
      setReason('Misleading Information');
      setDescription('');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Report Suspicious News</h2>
      <p className="text-gray-600 mb-6">
        Help us identify and flag fake news by reporting suspicious articles
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          ✓ Thank you! Your report has been submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Article Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Title of the suspicious article"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Article Content / URL</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-h-28"
            placeholder="Paste the article content or link here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reason for Report</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            {reasons.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Additional Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-h-20"
            placeholder="Why do you think this article is fake? (optional)"
            maxLength="1000"
          />
          <p className="text-xs text-gray-500 mt-1">{description.length}/1000</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}

export default ReportNews;
