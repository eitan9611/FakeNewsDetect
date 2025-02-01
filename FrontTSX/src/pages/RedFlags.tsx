import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Sun, Moon, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function RedFlags({ analysisData }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Use useMemo to keep the entity data stable across re-renders
  const entityData = useMemo(() => 
    analysisData.entities.map((entity, index) => ({
      name: entity,
      fakeNewsPercentage: analysisData.percents[index],
      wikiLink: analysisData.links[index] || `https://en.wikipedia.org/wiki/${entity.replace(' ', '_')}`,
    })), [analysisData.entities, analysisData.links, analysisData.percents]
  );
  

  const getColorClass = (percentage) => {
    if (percentage < 30) return 'bg-green-100 dark:bg-green-900/30 border-green-500';
    if (percentage < 70) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500';
    return 'bg-red-100 dark:bg-red-900/30 border-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/analysis')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Analysis</span>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Red Flags Analysis
              </h2>
            </div>

            <div className="space-y-4">
              {entityData.map((entity, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getColorClass(entity.fakeNewsPercentage)} transition-all duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {entity.name}
                    </h3>
                    <a
                      href={entity.wikiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Learn More
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Fake News Association
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {entity.fakeNewsPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${entity.fakeNewsPercentage}%`,
                          backgroundColor: entity.fakeNewsPercentage < 8 ? '#10B981' :
                                         entity.fakeNewsPercentage < 15 ? '#FBBF24' : '#EF4444'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}