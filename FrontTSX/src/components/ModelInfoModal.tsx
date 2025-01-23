import React from 'react';
import { X } from 'lucide-react';

const modelInfo = {
  model1: {
    title: 'Language Pattern Analysis',
    description: 'Analyzes writing patterns, grammar usage, and linguistic features to identify potential signs of misinformation. This model is trained on a vast dataset of verified fake and legitimate news articles.',
    methodology: 'Uses natural language processing (NLP) techniques to evaluate text structure, complexity, and common patterns associated with fake news.',
    significance: 'Helps identify subtle linguistic markers that may indicate deceptive content.'
  },
  model2: {
    title: 'Source Credibility Score',
    description: 'Evaluates the reliability of information sources and cross-references with known credible sources. This model maintains an updated database of verified news sources and their credibility ratings.',
    methodology: 'Compares content against a database of verified sources and analyzes citation patterns.',
    significance: 'Critical for determining the trustworthiness of information based on its source.'
  },
  model3: {
    title: 'Contextual Verification',
    description: 'Examines the broader context of the information, including temporal relevance and consistency with established facts. This model checks for logical inconsistencies and factual accuracy.',
    methodology: 'Cross-references claims against verified fact databases and checks for temporal consistency.',
    significance: 'Helps identify content that may be misleading due to lack of context or outdated information.'
  },
  model4: {
    title: 'Sentiment Analysis',
    description: 'Analyzes the emotional tone and bias in the content to identify potential manipulation attempts. This model is trained to detect emotional manipulation tactics common in fake news.',
    methodology: 'Uses advanced sentiment analysis algorithms to detect emotional manipulation and extreme bias.',
    significance: 'Helps identify content designed to trigger emotional responses rather than inform.'
  }
};

export default function ModelInfoModal({ model, onClose }) {
  const info = modelInfo[model.id];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {info.title}
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Description
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {info.description}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Methodology
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {info.methodology}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Significance
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {info.significance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}