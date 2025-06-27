// src/components/ComplexityAnalyzer.js

function ComplexityAnalyzer(code, language) {
  const lines = code.split('\n');
  let loopCount = 0;
  let recursiveCount = 0;
  let maxNesting = 0;
  let currentNesting = 0;
  let arrayUsage = 0;
  let objectUsage = 0;

  const loopPatterns = {
    javascript: /for\s*\(|while\s*\(/,
    java: /for\s*\(|while\s*\(/,
    python: /^\s*(for|while)\s+/,
  };

  const arrayPatterns = {
    javascript: /\[.*\]/,
    java: /new\s+\w+\[\]/,
    python: /\[.*\]/,
  };

  const objectPatterns = {
    javascript: /\{.*\}/,
    java: /new\s+\w+\s*\(.*\)/,
    python: /\{.*:.*\}/,
  };

  const functionName = detectFunctionName(code, language);

  lines.forEach(line => {
    const trimmed = line.trim();

    // Count loops
    if (loopPatterns[language]?.test(trimmed)) {
      loopCount++;
      currentNesting++;
      maxNesting = Math.max(maxNesting, currentNesting);
    }

    // Detect recursion
    if (functionName && trimmed.includes(functionName)) {
      recursiveCount++;
    }

    // Array usage
    if (arrayPatterns[language]?.test(trimmed)) {
      arrayUsage++;
    }

    // Object usage
    if (objectPatterns[language]?.test(trimmed)) {
      objectUsage++;
    }

    // Reduce nesting if block ends
    if (trimmed === '}' || trimmed === 'end') {
      currentNesting = Math.max(0, currentNesting - 1);
    }
  });

  const time = estimateTimeComplexity(loopCount, recursiveCount, maxNesting);
  const space = estimateSpaceComplexity(arrayUsage, objectUsage, recursiveCount);

  return {
    time,
    space,
    explanation: generateExplanation(time, space),
    details: {
      loops: loopCount,
      nestedLoops: maxNesting,
      recursiveCount,
      arrayUsage,
      objectUsage,
    }
  };
}

function detectFunctionName(code, language) {
  if (language === 'javascript') {
    const match = code.match(/function\s+([a-zA-Z_]\w*)\s*\(/);
    return match ? match[1] : null;
  }
  if (language === 'java') {
    const match = code.match(/(?:public|private|protected)?\s*(?:static\s+)?\w+\s+([a-zA-Z_]\w*)\s*\(/);
    return match ? match[1] : null;
  }
  if (language === 'python') {
    const match = code.match(/def\s+([a-zA-Z_]\w*)\s*\(/);
    return match ? match[1] : null;
  }
  return null;
}

function estimateTimeComplexity(loops, recursive, nesting) {
  if (recursive > 0 && nesting >= 2) return 'O(2^n)';
  if (recursive > 0) return 'O(n)';
  if (nesting >= 2) return 'O(n^2)';
  if (loops > 0) return 'O(n)';
  return 'O(1)';
}

function estimateSpaceComplexity(array, object, recursive) {
  if (recursive > 0 || array + object > 2) return 'O(n)';
  return 'O(1)';
}

function generateExplanation(time, space) {
  return `Based on detected control structures and memory usage, the algorithm is estimated to have ${time} time complexity and ${space} space complexity.`;
}

export default ComplexityAnalyzer;
