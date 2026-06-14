import React, { useMemo, useEffect } from 'react';
import { SLUG_DICTIONARY } from '../utils/slugDict';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../data';
import ActiveCalculator from '../components/ActiveCalculator';
import { ArrowLeft, BookmarkCheck, Sliders, Coins, Scale, BarChart3, Lock, Home as HomeIcon } from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  finance: Coins,
  compliance: Scale,
  data: BarChart3,
  privacy: Lock,
  real_estate: HomeIcon,
};

export default function ToolPage({ slug, navigate }: { slug: string, navigate: (path: string) => void }) {
  const activeEntry = useMemo(() => {
    return SLUG_DICTIONARY[slug];
  }, [slug]);

  useEffect(() => {
    if (!activeEntry) {
      navigate('/');
      return;
    }
    
    if (typeof document !== 'undefined') {
      const { title, description, ogTitle } = activeEntry.meta;

      // 1. Update Browser Title:
      document.title = title;

      // 2. Update Meta Description:
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      }

      // 3. Update OpenGraph Tags dynamically:
      let ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) {
        ogTitleTag.setAttribute("content", ogTitle);
      }

      let ogUrlTag = document.querySelector('meta[property="og:url"]');
      if (ogUrlTag) {
        ogUrlTag.setAttribute("content", window.location.href);
      }
    }
  }, [activeEntry, navigate]);

  if (!activeEntry) {
    return null;
  }

  const activeUtility = activeEntry.utility;

  const colors = CATEGORY_COLORS[activeUtility.category];
  const IconComponent = CATEGORY_ICONS[activeUtility.category] || Sliders;
  const numberStr = activeUtility.id < 10 ? `0${activeUtility.id}` : `${activeUtility.id}`;

  const schemaMarkup = activeUtility.aeo.schemaMarkup;
  const jsonLd = schemaMarkup ? JSON.stringify(schemaMarkup) : '';

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Utilities
          </div>
          
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${colors.bg}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                <span className="text-[10px] font-black font-mono uppercase tracking-wider text-gray-400">
                  Calculator {numberStr} of 50
                </span>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border uppercase font-mono ${colors.bg}`}>
                  {CATEGORY_LABELS[activeUtility.category]}
                </span>
              </div>
              <h2 className="block text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-gray-950 mt-0.5" itemProp="name">
                {activeUtility.name}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 relative">
        <article itemScope itemType="https://schema.org/SoftwareApplication">
          <meta itemProp="url" content={`https://optimacore.systems/tools/${slug}`} />
          <meta itemProp="applicationCategory" content="UtilityApplication" />

          <div className="space-y-8">
            <div className="bg-blue-50/40 rounded-2xl p-5 border border-blue-100/50 flex gap-4 text-sm text-gray-700 leading-relaxed shadow-sm">
              <BookmarkCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-blue-900 block mb-1 text-base">Model Context & Analytical Purpose</span>
                <p className="font-medium text-gray-700" itemProp="description">{activeUtility.context}</p>
                <div className="mt-4 pt-4 border-t border-blue-100/50">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono mb-1 block">Mathematical Model</span>
                  <p className="font-mono text-blue-800 text-xs bg-blue-100/50 p-2 rounded-lg inline-block">{activeUtility.formulaDescription}</p>
                </div>
              </div>
            </div>

            {/* Actual Form Computation Engine */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              <ActiveCalculator utility={activeUtility} />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
