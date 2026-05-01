import React, { useState, useEffect, useCallback } from 'react';
import { historyAPI } from '../utils/api';
import {
  getErrorMessage,
  formatDate,
  getClassificationColor,
  getClassificationBgColor,
  truncateText
} from '../utils/helpers';

/**
 * Dashboard Component
 * Shows user's analysis history and statistics
 */
function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);

  // ✅ FIX: useCallback to avoid dependency error
  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const historyResponse = await historyAPI.getHistory(
        10,
        page * 10,
        filter || undefined
      );
      setArticles(historyResponse.data.articles);

      if (page === 0) {
        const statsResponse = await historyAPI.getStats();
        setStats(statsResponse.data.stats);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  // ✅ FIX: include loadData safely
  useEffect(() => {
    loadData();
  }, [loadData]);

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
      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Analyzed</p>
            <p className="text-3xl font-bold">{stats.totalAnalyzed}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Real Articles</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.realCount}
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Fake Articles</p>
            <p className="text-3xl font-bold text-red-600">
              {stats.fakeCount}
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Avg Confidence</p>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.averageConfidence}%
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-2 flex-wrap">
          {['', 'Real', 'Fake', 'Unknown'].map((type) => (
            <button
              key={type || 'All'}
              onClick={() => {
                setFilter(type);
                setPage(0);
              }}
              className={`px-4 py-2 rounded ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {type || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Analysis History</h3>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="p-8 text-center text-gray-500">⏳ Loading...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No articles found.
          </div>
        ) : (
          <div className="divide-y">
            {articles.map((article) => (
              <div key={article._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">
                      {truncateText(article.title, 50)}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {truncateText(article.content, 100)}
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded text-sm font-semibold ${getClassificationBgColor(
                      article.classification
                    )} ${getClassificationColor(article.classification)}`}
                  >
                    {article.classification} ({article.confidence}%)
                  </div>
                </div>

                <div className="flex justify-between text-xs mt-3">
                  <span>{formatDate(article.analyzedAt)}</span>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-red-600"
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
          <div className="p-4 border-t flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Previous
            </button>

            <span>Page {page + 1}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={articles.length < 10}
              className="px-4 py-2 bg-gray-200 rounded"
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