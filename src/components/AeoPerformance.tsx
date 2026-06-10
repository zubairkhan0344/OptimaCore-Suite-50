import React, { useState } from 'react';
import { MicroUtility } from '../types';
import { CATEGORY_COLORS } from '../data';
import { Bot, Copy, ClipboardCheck, Sparkles, Code, MessageSquare, Search } from 'lucide-react';

interface AeoPerformanceProps {
  utility: MicroUtility;
}

export default function AeoPerformance({ utility }: AeoPerformanceProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedQuery, setCopiedQuery] = useState<number | null>(null);

  const colors = CATEGORY_COLORS[utility.category];

  const handleCopyText = (text: string, type: 'prompt' | 'schema' | 'query', index?: number) => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else if (type === 'schema') {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    } else if (type === 'query' && index !== undefined) {
      setCopiedQuery(index);
      setTimeout(() => setCopiedQuery(null), 2000);
    }
  };

  const schemaString = JSON.stringify(utility.aeo.schemaMarkup, null, 2);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)]" id="aeo-performance-panel">
      {/* AEO HEADER */}
      <div className="p-6 border-b border-gray-150 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-950 flex flex-wrap items-center gap-2 text-base">
              LLM & Chatbot Discovery Suite
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200 font-mono tracking-wide uppercase">GEO-OPTIMIZED</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Equipping conversational AI with native data structures and query prompts.</p>
          </div>
        </div>
        <div className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold rounded-full uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          Active Chatbot Authority
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* DISCOVERY TRIGGERS */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-mono">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            AI Search Target Intent Queries
          </h4>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            These phrasing hooks match semantic triggers scanned by search agents like **Perplexity**, **ChatGPT Search**, and **Google Gemini**:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {utility.aeo.intentQueries.map((query, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-all text-left group"
              >
                <span className="text-xs text-gray-800 font-mono truncate mr-2 italic">"{query}"</span>
                <button
                  onClick={() => handleCopyText(query, 'query', idx)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 shrink-0"
                  title="Copy search query intent"
                >
                  {copiedQuery === idx ? <ClipboardCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* COPYABLE CHATBOT PROMPT CO-PILOT */}
        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-605" />
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">Chatbot Context Prompt Starter</h4>
            </div>
            <button
              onClick={() => handleCopyText(utility.aeo.optimizedPrompt, 'prompt')}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-400 text-xs rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 shadow-2xs font-semibold"
            >
              {copiedPrompt ? (
                <>
                  <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Copy and paste this optimized prompt directly into **Gemini, ChatGPT, Claude, DeepSeek, or Grok** to solve this calculation with exact operational constraints:
          </p>
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 font-mono leading-relaxed select-all shadow-2xs">
            {utility.aeo.optimizedPrompt}
          </div>
        </div>

        {/* STRUCTURAL JSON-LD SCHEMA */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">Semantic JSON-LD Structured Schema</h4>
            </div>
            <button
              onClick={() => handleCopyText(schemaString, 'schema')}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-400 text-xs rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 shadow-2xs font-semibold"
            >
              {copiedSchema ? (
                <>
                  <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy JSON-LD</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            This structured data markup is embedded directly into the layout block, allowing crawler indexes to dynamically harvest metadata:
          </p>
          <pre className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-2xs text-blue-650 font-mono overflow-x-auto max-h-48 scrollbar-thin">
            {schemaString}
          </pre>
        </div>
      </div>
    </div>
  );
}
