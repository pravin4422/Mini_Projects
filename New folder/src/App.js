import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import ComplexityAnalyzer from './components/ComplexityAnalyzer';
import OutputDisplay from './components/OutputDisplay';
import { Play } from 'lucide-react';
import './styles.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null); // Prevent undefined error
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = ComplexityAnalyzer(code, language);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 500);
  };

  const loadExample = () => {
    const examples = {
      javascript: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      java: `public int binarySearch(int[] arr, int target) {
  int left = 0, right = arr.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      python: `def fibonacci(n, memo={}):
  if n in memo:
    return memo[n]
  if n <= 1:
    return n
  memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
  return memo[n]`
    };
    setCode(examples[language]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Code Complexity Analyzer
          </h1>
          <p className="text-gray-600">
            Analyze the time and space complexity of your algorithms
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Language:</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>
                </div>

                <button
                  onClick={loadExample}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Load Example
                </button>
              </div>
            </div>

            <CodeEditor code={code} setCode={setCode} language={language} />

            <button
              onClick={analyzeCode}
              disabled={isAnalyzing || !code.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Analyze Code
                </>
              )}
            </button>
          </section>

          <section>
            {analysis ? (
              <OutputDisplay analysis={analysis} />
            ) : (
              <div className="bg-white p-6 border border-gray-200 rounded-lg text-gray-500 text-center">
                Run analysis to view time and space complexity.
              </div>
            )}
          </section>
        </main>

        <footer className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Complexity Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Time Complexity</h4>
              <ul className="space-y-1 text-gray-600">
                <li><span className="text-green-600">O(1)</span> - Constant time</li>
                <li><span className="text-blue-600">O(n)</span> - Linear time</li>
                <li><span className="text-yellow-600">O(n²)</span> - Quadratic time</li>
                <li><span className="text-red-600">O(2ⁿ)</span> - Exponential time</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Space Complexity</h4>
              <ul className="space-y-1 text-gray-600">
                <li><span className="text-green-600">O(1)</span> - Constant space</li>
                <li><span className="text-blue-600">O(n)</span> - Linear space</li>
                <li>Based on data structures and recursion depth</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;