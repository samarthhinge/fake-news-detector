import React, { useState } from 'react';
import { analyzeAPI } from '../utils/api';
import { getErrorMessage, getClassificationColor, getClassificationBgColor } from '../utils/helpers';

/**
 * Article Analyzer Component
 * Allows users to input news and analyze it
 */
function ArticleAnalyzer() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      // Validate inputs
      if (!title.trim() || !content.trim()) {
        setError('Please provide both title and content');
        return;
      }

      // Convert comma-separated tags to array
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Call analyze API
      const response = await analyzeAPI.analyze(
        title,
        content,
        'pasted',
        null,
        tagArray
      );

      setResult(response.data.article);
      
      // Clear form
      setTitle('');
      setContent('');
      setTags('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Analyze News Article</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleAnalyze} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Article Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter article title..."
            maxLength="500"
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/500</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Article Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-h-32"
            placeholder="Paste or type the article content here..."
            maxLength="10000"
          />
          <p className="text-xs text-gray-500 mt-1">{content.length}/10000</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="e.g., politics, health, sports"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center"
        >
          {loading && <span className="animate-spin mr-2">⏳</span>}
          {loading ? 'Analyzing...' : 'Check Authenticity'}
        </button>
      </form>

      {result && (
        <div className={`p-6 rounded-lg border-2 fade-in ${getClassificationBgColor(result.classification)}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Analysis Result</p>
              <p className={`text-3xl font-bold ${getClassificationColor(result.classification)}`}>
                {result.classification}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Confidence Score</p>
              <p className="text-3xl font-bold text-gray-800">{result.confidence}%</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Why this classification?</h4>
            <p className="text-gray-700">{result.reasoning}</p>
          </div>

          <div className="bg-blue-50 p-3 rounded text-sm text-gray-700">
            <p>
              <strong>Analyzed:</strong> {new Date(result.analyzedAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleAnalyzer;
