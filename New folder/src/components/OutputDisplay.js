// src/components/OutputDisplay.js
import React from 'react';
import { Clock, HardDrive, AlertCircle } from 'lucide-react';

const OutputDisplay = ({ analysis }) => {
  if (!analysis || !analysis.time) return null;

  const getComplexityColor = (complexity) => {
    if (!complexity) return 'text-gray-600 bg-gray-50';
    if (complexity.includes('O(1)')) return 'text-green-600 bg-green-50';
    if (complexity.includes('O(n)') && !complexity.includes('^')) return 'text-blue-600 bg-blue-50';
    if (complexity.includes('O(n^2)')) return 'text-yellow-600 bg-yellow-50';
    if (complexity.includes('O(n^3)') || complexity.includes('O(2^n)')) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className={`p-4 rounded-lg border ${getComplexityColor(analysis.time)}`}>
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold">Time Complexity</span>
          </div>
          <div className="text-2xl font-bold">{analysis.time}</div>
        </div>

        <div className={`p-4 rounded-lg border ${getComplexityColor(analysis.space)}`}>
          <div className="flex items-center mb-2">
            <HardDrive className="w-5 h-5 mr-2" />
            <span className="font-semibold">Space Complexity</span>
          </div>
          <div className="text-2xl font-bold">{analysis.space}</div>
        </div>
      </div>

      {analysis.explanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">Analysis Explanation</p>
              <p className="text-blue-700 text-sm mt-1">{analysis.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {analysis.details && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Detection Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Loops found: <span className="font-medium">{analysis.details.loops}</span></div>
            <div>Max nesting: <span className="font-medium">{analysis.details.nestedLoops}</span></div>
            <div>Recursive calls: <span className="font-medium">{analysis.details.recursiveCount}</span></div>
            <div>Data structures: <span className="font-medium">{(analysis.details.arrayUsage || 0) + (analysis.details.objectUsage || 0)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
