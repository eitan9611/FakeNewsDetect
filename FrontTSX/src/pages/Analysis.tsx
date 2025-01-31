import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CircularProgress from '../components/CircularProgress';
import ModelInfoModal from '../components/ModelInfoModal';

const getScoreColor = (score) => {
  if (score <= 20) return 'text-red-600';
  if (score <= 40) return 'text-orange-500';
  if (score <= 60) return 'text-yellow-500';
  if (score <= 80) return 'text-green-400';
  return 'text-green-600';
};

const getScoreText = (score) => {
  if (score <= 20) return 'The text is most likely fake and unreliable';
  if (score <= 40) return 'The text is likely fake';
  if (score <= 60) return 'Uncertain whether the text is reliable or not';
  if (score <= 80) return 'The text is probably reliable';
  return 'The text is very reliablexcellent Performance!';
};

export default function Analysis({ analysisData, setAnalysisData }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);

  const handleSubmit = async () => {
    if (!analysisData.inputText.trim()) {
      setError('Please enter text to analyze.');
      return;
    }
  
    setError('');
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/submit-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText: analysisData.inputText }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
  
      if (data.error) {
        setError(data.error);
      } else {
        setAnalysisData({
          ...analysisData,
          results: data.results,
          entities: data.entities,
          links: data.links,
          percents: data.percents
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAnalysisData({
      inputText: '',
      results: null,
      entities: []
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={24} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun size={24} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Text Analysis
            </h2>
            
            <textarea
              value={analysisData.inputText}
              onChange={(e) => setAnalysisData({
                ...analysisData,
                inputText: e.target.value
              })}
              placeholder="Enter the text you want to analyze..."
              className="w-full h-40 p-4 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            />

            {error && (
              <div className="flex items-center gap-2 text-red-500 mb-4">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Submit'}
              </button>
              <button
                onClick={handleClear}
                className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Analysis
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {analysisData.results && !loading && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Analysis Results
              </h3>

              <div className="grid grid-cols-2 gap-8 mb-8">
                {[
                  { id: 'model1', name: 'AI DETECT' },
                  { id: 'model2', name: 'Toxic' },
                  { id: 'model3', name: 'Bias' },
                  { id: 'model4', name: 'General Model' }
                ].map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <CircularProgress
                      percentage={analysisData.results[model.id]}
                      label={model.name}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center mb-8 p-8 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div 
                  className={`text-6xl font-black tracking-tight ${getScoreColor(analysisData.results.overall)} transition-colors duration-300`}
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  {getScoreText(analysisData.results.overall)}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/red-flags')}
                  className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  View Red Flags
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedModel && (
        <ModelInfoModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
}