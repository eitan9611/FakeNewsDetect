import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="flex justify-end mb-8">
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

      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <Shield size={64} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Fake News Detection
        </h1>
        
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
          Welcome to our advanced fake news detection system. We use cutting-edge AI models 
          to analyze text and help you identify potential misinformation. Our system provides 
          detailed analysis and highlights potential red flags to help you make informed decisions 
          about the content you encounter online.
        </p>

        <button
          onClick={() => navigate('/analysis')}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-full overflow-hidden transition-all duration-300 ease-out hover:scale-105 active:scale-95 active:bg-indigo-700"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10"></span>
          <span className="relative">Analyze Text</span>
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: 'Advanced Analysis',
            description: 'Multiple AI models work together to provide comprehensive analysis of text content.'
          },
          {
            title: 'Detailed Insights',
            description: 'Get detailed breakdowns of potential red flags and contextual information.'
          },
          {
            title: 'User Friendly',
            description: 'Simple interface designed for both casual users and professionals.'
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}