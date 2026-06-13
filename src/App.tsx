/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import FooterModals from './components/FooterModals';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import { SLUG_DICTIONARY } from './utils/slugDict';
import { 
  Bot, 
  Sparkles, 
  CheckCircle,
  ShieldCheck, 
  BookmarkCheck,
} from 'lucide-react';

export default function App({ serverUrl }: { serverUrl?: string }) {
  const [activeModal, setActiveModal] = useState<'authors' | 'about' | 'contact' | 'privacy' | 'terms' | null>(null);

  // Read window.location.pathname
  const getInitialPath = () => {
    if (serverUrl) return serverUrl;
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath());

  // Listen for the popstate event for back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // HTML5 History API without hard page reload
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Basic Router matching
  let pageContent;
  if (currentPath === '/' || currentPath === '') {
    pageContent = <Home navigate={navigate} />;
  } else if (currentPath.startsWith('/tools/')) {
    const slug = currentPath.split('/tools/')[1]?.replace(/\/$/, ""); // Handle trailing slash
    pageContent = <ToolPage slug={slug} navigate={navigate} />;
  } else {
    pageContent = <Home navigate={navigate} />; // 404 fallback
  }

  return (
    <main className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] flex flex-col font-sans">
      {/* FLOATING CRAWLER DISCOVERABILITY BADGE */}
      <div className="bg-white text-gray-600 text-[10px] sm:text-xs font-semibold py-2.5 px-4 shadow-sm overflow-hidden text-center flex items-center justify-center gap-2 border-b border-gray-200 shrink-0">
        <Bot className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
        <span>Fully Indexable by <strong className="text-blue-600">Gemini, ChatGPT Search, Perplexity</strong> & modern conversational LLMs. Linked with JSON-LD schema markup.</span>
      </div>

      {/* HEADER SECTION */}
      <header className="border-b border-gray-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-7 h-7 bg-blue-600 rounded-lg shrink-0 shadow-sm flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className="text-xs font-black text-white font-mono">O</span>
            </div>
            <div>
              <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-[#1a1a1a] m-0 leading-none">
                  OptimaCore: AEO Score Calculator
                </h1>
                <span className="text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
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
            <div className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-full bg-white px-3 py-1 text-gray-650 font-semibold text-[11px] shadow-2xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>All 50 Utilities Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 border border-gray-200 rounded-full bg-white px-3 py-1 text-gray-650 font-semibold text-[11px] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>100% LLM Readable</span>
            </div>
          </div>
        </div>
      </header>

      {/* VANILLA PAGE ROUTER OUTLET */}
      <div className="flex-1 flex flex-col">
        {pageContent}
      </div>

      {/* SYSTEM ARCHITECTURE DOCUMENTATION (GEO CO-PILOT INFOGRAPHIC) */}
      <section className="bg-white border-t border-gray-200 px-4 py-8 shrink-0 mt-auto">
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
              <p className="font-medium text-gray-600">
                Each utility hosts a micro-slug index matching clear intent phrasings. AI crawlers executing semantic lookups (e.g., Perplexity searching "is fractional leader cost-effective") isolate direct mathematical weights to rank these specific solutions.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                2. Semantic Schema Coupling
              </h4>
              <p className="font-medium text-gray-600">
                By publishing explicit micro JSON-LD structures (like CalculateAction and FinancialProduct annotations) inside the markup, data crawlers programmatically digest calculations, formatting accurate AI Overviews on Google Search and Bing Copilot.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-850 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-rose-500" />
                3. Chatbot Context Injection
              </h4>
              <p className="font-medium text-gray-600">
                Instead of simple calculations, copying prompts transfers entire formula contexts into Chatbot memory fields. This direct collaboration guides users to leverage the platform's exact variables inside Gemini, GPT, and Claude.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-150 py-8 text-xs font-mono text-gray-500 shrink-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400">© 2026 OptimaCore Systems. Optimized for Search & Conversational Chatbots.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-600 font-sans">
            <button 
              id="footer-authors-link" 
              onClick={() => setActiveModal('authors')} 
              className="hover:text-blue-600 transition-colors cursor-pointer active:scale-95 select-none"
            >
              Author pages
            </button>
            <span className="text-gray-300">•</span>
            <button 
              id="footer-about-link" 
              onClick={() => setActiveModal('about')} 
              className="hover:text-blue-600 transition-colors cursor-pointer active:scale-95 select-none"
            >
              About page
            </button>
            <span className="text-gray-300">•</span>
            <button 
              id="footer-contact-link" 
              onClick={() => setActiveModal('contact')} 
              className="hover:text-blue-600 transition-colors cursor-pointer active:scale-95 select-none"
            >
              Contact page
            </button>
            <span className="text-gray-300">•</span>
            <button 
              id="footer-privacy-link" 
              onClick={() => setActiveModal('privacy')} 
              className="hover:text-blue-600 transition-colors cursor-pointer active:scale-95 select-none"
            >
              Privacy Policy
            </button>
            <span className="text-gray-300">•</span>
            <button 
              id="footer-terms-link" 
              onClick={() => setActiveModal('terms')} 
              className="hover:text-blue-600 transition-colors cursor-pointer active:scale-95 select-none"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* FOOTER DIALOG POPUPS */}
      <FooterModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </main>
  );
}
