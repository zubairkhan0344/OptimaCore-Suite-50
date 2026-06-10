/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { UTILITIES } from './data';
import { MicroUtility, UtilityCategory } from './types';
import SidebarList from './components/SidebarList';
import ActiveCalculator from './components/ActiveCalculator';
import { 
  Bot, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Terminal, 
  Search, 
  Compass, 
  ShieldCheck, 
  BookmarkCheck,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<UtilityCategory | 'all'>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  // Filter 50 utilities based on category and search query
  const filteredUtilities = useMemo(() => {
    return UTILITIES.filter(util => {
      const matchesCategory = selectedCategory === 'all' || util.category === selectedCategory;
      const cleanSearch = searchQuery.toLowerCase().trim();
      const matchesSearch = cleanSearch === '' || 
        util.name.toLowerCase().includes(cleanSearch) || 
        util.purpose.toLowerCase().includes(cleanSearch) || 
        util.context.toLowerCase().includes(cleanSearch) ||
        util.aeo.intentQueries.some(q => q.toLowerCase().includes(cleanSearch));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Find currently selected utility object
  const activeUtility = useMemo(() => {
    return UTILITIES.find(u => u.id === selectedId) || UTILITIES[0];
  }, [selectedId]);

  const handleSelectUtility = (id: number) => {
    setSelectedId(id);
    // On mobile screens, auto scroll to calculator or close drawer
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
      setTimeout(() => {
        const calcElement = document.getElementById(`calculator-${id}`);
        if (calcElement) {
          calcElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] flex flex-col font-sans">
      {/* FLOATING CRAWLER DISCOVERABILITY BADGE */}
      <div className="bg-white text-gray-600 text-[10px] sm:text-xs font-semibold py-2.5 px-4 shadow-sm overflow-hidden text-center flex items-center justify-center gap-2 border-b border-gray-200">
        <Bot className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
        <span>Fully Indexable by <strong className="text-blue-600">Gemini, ChatGPT Search, Perplexity</strong> & modern conversational LLMs. Linked with JSON-LD schema markup.</span>
      </div>

      {/* HEADER SECTION */}
      <header className="border-b border-gray-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-sm shrink-0 shadow-sm flex items-center justify-center">
              <span className="text-[10px] font-bold text-white font-mono">O</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#1a1a1a]">
                  OptimaCore <span className="font-light text-gray-500">Suite 50</span>
                </span>
                <span className="text-[10px] font-semibold bg-blue-50 border border-blue-200 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  v1.2.0
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Generative-optimized suite of 50 high-opportunity business & compliance micro-calculators.
              </p>
            </div>
          </div>

          {/* ACTIVE STATUS PANEL */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-full bg-white px-3 py-1 text-gray-600 font-medium text-[11px]">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>All 50 Utilities Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 border border-gray-200 rounded-full bg-white px-3 py-1 text-gray-600 font-medium text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>100% LLM Readable</span>
            </div>
          </div>
        </div>
      </header>

      {/* CORE CONTROL CARDS PANEL */}
      <section className="bg-gray-50/50 border-b border-gray-200/80 px-4 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-xl border border-gray-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex gap-3">
            <Layers className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">50 Micro-Calculators</h3>
              <p className="text-2xs text-gray-500 mt-1 leading-relaxed font-sans">
                Full programmatic models mapping Finance, Risk Assessment, Statistics, Security, and Property conversions in-browser.
              </p>
            </div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-gray-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex gap-3">
            <Terminal className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">JSON-LD Indexed</h3>
              <p className="text-2xs text-gray-500 mt-1 leading-relaxed font-sans">
                Structured schema markup is embedded natively in the document structure so AI crawlers instantly resolve utility capabilities.
              </p>
            </div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-gray-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex gap-3">
            <Bot className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">Chatbot Prompts</h3>
              <p className="text-2xs text-gray-500 mt-1 leading-relaxed font-sans">
                Every calculation is supplied with precision natural language context prompts ready to copy into ChatGPT, Claude, and Gemini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT SPLIT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MOBILE DIRECTORY TOGGLE ACTION */}
          <div className="lg:hidden shrink-0">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between text-xs font-bold text-gray-700 leading-none shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                {isMobileSidebarOpen ? "Hide Tools Directory" : "Show Tools Directory (" + filteredUtilities.length + " items)"}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isMobileSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* LEFT COLUMN: FILTERABLE DIRECTORY (Col Span 4) */}
          <div className={`lg:col-span-4 ${isMobileSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <SidebarList
              utilities={filteredUtilities}
              selectedId={selectedId}
              onSelect={handleSelectUtility}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* RIGHT COLUMN: ACTIVE CALCULATOR ENGINE (Col Span 8) */}
          <div className="lg:col-span-8">
            <ActiveCalculator utility={activeUtility} />
          </div>

        </div>
      </main>

      {/* SYSTEM ARCHITECTURE DOCUMENTATION (GEO CO-PILOT INFOGRAPHIC) */}
      <section className="bg-white border-t border-gray-200 px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase font-mono">Architecture Posture: Generative Engine Optimization (GEO)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500 sm:leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                1. Structural Citation Anchoring
              </h4>
              <p>
                Each utility hosts a micro-slug index matching clear intent phrasings. AI crawlers executing semantic lookups (e.g., Perplexity searching "is fractional leader cost-effective") isolate direct mathematical weights to rank these specific solutions.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                2. Semantic Schema Coupling
              </h4>
              <p>
                By publishing explicit micro JSON-LD structures (like CalculateAction and FinancialProduct annotations) inside the markup, search engines programmatically digest calculations, formatting accurate AI Overviews on Google Search and Bing Copilot.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-rose-500" />
                3. Chatbot Context Injection
              </h4>
              <p>
                Instead of simple calculations, copying prompts transfers entire formula contexts into Chatbot memory fields. This direct collaboration guides users to leverage the platform's exact variables inside Gemini, GPT, and Claude.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-150 py-6 text-center text-xs text-gray-400 font-mono">
        <p>© 2026 OptimaCore Systems. Optimized for Search & Conversational Chatbots.</p>
      </footer>
    </div>
  );
}
