import React, { useState, useEffect } from 'react';
import { historyAPI } from '../utils/api';
import { getErrorMessage, formatDate, getClassificationColor, getClassificationBgColor, truncateText } from '../utils/helpers';

/**
 * Dashboard Component
 * Shows user's analysis history and statistics
 */
function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(''); // '' for all, 'Real', 'Fake', 'Unknown'
  const [page, setPage] = useState(0);

  // Load history and stats on mount and when filter/page changes
  useEffect(() => {
    loadData();
  }, [filter, page]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch history
      const historyResponse = await historyAPI.getHistory(
        10,
        page * 10,
        filter || undefined
      );
      setArticles(historyResponse.data.articles);

      // Fetch stats (only once)
      if (page === 0) {
        const statsResponse = await historyAPI.getStats();
        setStats(statsResponse.data.stats);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await historyAPI.deleteArticle(id);
        loadData();
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Analyzed</p>
            <p className="text-3xl font-bold">{stats.totalAnalyzed}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Real Articles</p>
            <p className="text-3xl font-bold text-green-600">{stats.realCount}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Fake Articles</p>
            <p className="text-3xl font-bold text-red-600">{stats.fakeCount}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Avg Confidence</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.averageConfidence}%</p>
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setFilter(''); setPage(0); }}
            className={`px-4 py-2 rounded ${
              filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => { setFilter('Real'); setPage(0); }}
            className={`px-4 py-2 rounded ${
              filter === 'Real' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Real
          </button>
          <button
            onClick={() => { setFilter('Fake'); setPage(0); }}
            className={`px-4 py-2 rounded ${
              filter === 'Fake' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Fake
          </button>
          <button
            onClick={() => { setFilter('Unknown'); setPage(0); }}
            className={`px-4 py-2 rounded ${
              filter === 'Unknown' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Unknown
          </button>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Analysis History</h3>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <span className="animate-spin mr-2">⏳</span>Loading...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No articles found.
          </div>
        ) : (
          <div className="divide-y">
            {articles.map(article => (
              <div key={article._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{truncateText(article.title, 50)}</h4>
                    <p className="text-sm text-gray-600 mt-1">{truncateText(article.content, 100)}</p>
                  </div>
                  <div className={`px-3 py-1 rounded text-sm font-semibold ${getClassificationBgColor(article.classification)} ${getClassificationColor(article.classification)}`}>
                    {article.classification} ({article.confidence}%)
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
                  <span>{formatDate(article.analyzedAt)}</span>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {articles.length > 0 && (
          <div className="p-4 border-t flex justify-between items-center">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {page + 1}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={articles.length < 10}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
