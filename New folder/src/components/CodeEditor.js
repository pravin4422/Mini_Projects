// src/components/CodeEditor.js
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';

const languageMap = {
  javascript: javascript(),
  java: java(),
  python: python(),
};

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Code Editor</span>
      </div>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[languageMap[language]]}
        onChange={(value) => setCode(value)}
        theme="light"
      />
    </div>
  );
};

export default CodeEditor;
