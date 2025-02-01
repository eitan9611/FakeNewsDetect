import React from 'react';
import { X } from 'lucide-react';

const modelInfo = {
  model1: {
    title: 'AI-Generated Text Detection Model',
    description: 'This model identifies whether a text was written by AI. AI-generated content is often used in misinformation campaigns to produce large volumes of articles quickly. While AI text itself isn’t necessarily fake news, detecting it can help determine whether an article was created by a credible human journalist or an automated system.',
    example: 'Recent advancements in quantum computing suggest a potential breakthrough in solving NP-hard problems within the next decade.',
    exampleAnalysis: 'The model recognizes AI-generated patterns, such as highly technical language, broad futuristic claims, and a lack of specific sources. While the statement isn’t necessarily false, it appears AI-generated rather than written by a human expert.'
  },
  model2: {
    title: 'Toxicity Detection Model',
    description: 'This model analyzes the text for harmful or offensive language. Toxic speech can indicate attempts to manipulate public opinion by using emotionally charged language, insults, or inflammatory rhetoric. Detecting toxicity helps filter out sources that rely on aggressive communication to spread misinformation.',
    example: 'This politician is a complete idiot, spreading nothing but lies to brainwash people.',
    exampleAnalysis: 'The model identifies strong negative language ("idiot," "lies," "brainwash") as toxic. While this doesnt directly prove fake news, it suggests the content may be emotionally driven rather than factual.'
  },
  model3: {
    title: 'Bias Detection Model',
    description: 'This model evaluates the text for political or ideological bias. News articles with a strong bias often present information in a one-sided manner, exaggerating certain details while downplaying others. While bias alone doesn’t confirm fake news, highly biased content is more likely to mislead readers by omitting key facts or framing events in a distorted way.',
    example: 'The new policy is a disaster, proving once again that the government only cares about the wealthy elite.',
    exampleAnalysis: 'The model detects bias in the negative framing of the policy and the assumption that the government favors the wealthy. The lack of neutral or balanced language suggests a strong opinion rather than an objective report.'
  },
  model4: {
    title: 'General Fake News Detection Model',
    description: 'This pre-trained model classifies news articles as real or fake based on linguistic patterns, source credibility, and alignment with verified information. It examines whether the claims made in the text match known facts, cross-references sources, and checks for misleading structures commonly found in fake news.',
    example: 'Scientists confirm that drinking one cup of lemon water daily completely eliminates the risk of cancer.',
    exampleAnalysis: 'The model flags this claim as likely fake because it lacks a credible source, makes an absolute statement ("completely eliminates"), and contradicts established scientific consensus.'
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
                Example
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {info.example}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Example Analysis
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {info.exampleAnalysis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}