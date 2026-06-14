import React, { useState, useMemo, useEffect } from 'react';
import { UTILITIES, CATEGORY_COLORS, CATEGORY_LABELS } from '../data';
import { UtilityCategory } from '../types';
import { 
  Bot, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Terminal, 
  Search, 
  Compass, 
  Coins,
  Scale,
  BarChart3,
  Lock,
  Home as HomeIcon,
  X,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { generateSlug } from '../utils/slug';

const CATEGORY_ICONS: Record<UtilityCategory, any> = {
  finance: Coins,
  compliance: Scale,
  data: BarChart3,
  privacy: Lock,
  real_estate: HomeIcon,
};

const CATEGORY_TABS: { value: UtilityCategory | 'all'; label: string; icon: any }[] = [
  { value: 'all', label: 'All Tools', icon: Compass },
  { value: 'finance', label: 'Finance & Business', icon: Coins },
  { value: 'compliance', label: 'Compliance & Risk', icon: Scale },
  { value: 'data', label: 'Data & Stats', icon: BarChart3 },
  { value: 'privacy', label: 'Privacy & Security', icon: Lock },
  { value: 'real_estate', label: 'Real Estate & Property', icon: HomeIcon }
];

export default function Home({ navigate }: { navigate: (path: string) => void }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = "OptimaCore: AEO Score Calculator | Answer Engine Optimization & GEO Audit Tool";
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "OptimaCore is the ultimate AEO score calculator. Perform structural Answer Engine Optimization, GEO audits, and leverage 50 specialized calculators for generative search discovery.");
      }

      let ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) {
        ogTitleTag.setAttribute("content", "OptimaCore: AEO Score Calculator | Answer Engine Optimization");
      }

      let ogUrlTag = document.querySelector('meta[property="og:url"]');
      if (ogUrlTag) {
        ogUrlTag.setAttribute("content", "https://optimacore.systems/");
      }
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<UtilityCategory | 'all'>('all');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: UTILITIES.length,
      finance: 0,
      compliance: 0,
      data: 0,
      privacy: 0,
      real_estate: 0,
    };
    UTILITIES.forEach(u => {
      counts[u.category] = (counts[u.category] || 0) + 1;
    });
    return counts;
  }, []);

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

  return (
    <>
      <section className="bg-gray-50/50 border-b border-gray-200/80 px-4 py-5 shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border border-gray-205 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex gap-3">
            <Layers className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">50 Micro-Calculators</h3>
              <p className="text-2xs text-gray-500 mt-0.5 leading-relaxed font-sans font-medium">
                Full programmatic models mapping Finance, Risk Assessment, Statistics, Security, and Property conversions in-browser.
              </p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-205 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex gap-3">
            <Terminal className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">JSON-LD Indexed</h3>
              <p className="text-2xs text-gray-500 mt-0.5 leading-relaxed font-sans font-medium">
                Structured schema markup is embedded natively in the document structure so AI crawlers instantly resolve utility capabilities.
              </p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-205 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex gap-3">
            <Bot className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono">Chatbot Prompts</h3>
              <p className="text-2xs text-gray-500 mt-0.5 leading-relaxed font-sans font-medium">
                Every calculation is supplied with precision natural language context prompts ready to copy into ChatGPT, Claude, and Gemini.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 py-6 px-4 shrink-0">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-950 flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-blue-600" />
                AEO Interactive Calculator & Micro-Utility Suite
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Filter by department category or run a semantic keyword search to launch any specific tool instantly.
              </p>
            </div>

            <div className="relative w-full lg:max-w-md shrink-0">
              <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, formulas, or intent keywords..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-950 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600/30 transition-all font-sans placeholder-gray-400 font-medium shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 p-0.5 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-gray-100">
            {CATEGORY_TABS.map(tab => {
              const isActive = selectedCategory === tab.value;
              const TabIcon = tab.icon;
              const count = categoryCounts[tab.value];
              const theme = tab.value !== 'all' ? CATEGORY_COLORS[tab.value] : null;

              let activeStyles = 'bg-blue-600 text-white border-blue-600 shadow-xs';
              let countBadgeStyles = 'bg-white/20 text-white';

              if (isActive && theme) {
                if (theme.accent === 'emerald') activeStyles = 'bg-emerald-600 text-white border-emerald-605 shadow-xs';
                if (theme.accent === 'amber') activeStyles = 'bg-amber-600 text-white border-amber-605 shadow-xs';
                if (theme.accent === 'indigo') activeStyles = 'bg-indigo-600 text-white border-indigo-605 shadow-xs';
                if (theme.accent === 'rose') activeStyles = 'bg-rose-600 text-white border-rose-605 shadow-xs';
                if (theme.accent === 'sky') activeStyles = 'bg-sky-600 text-white border-sky-605 shadow-xs';
              }

              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer select-none whitespace-nowrap flex items-center gap-2 active:scale-97 ${
                    isActive 
                      ? activeStyles 
                      : 'bg-white text-gray-600 hover:text-gray-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? countBadgeStyles : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {filteredUtilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUtilities.map((util) => {
              const colors = CATEGORY_COLORS[util.category];
              const IconComponent = CATEGORY_ICONS[util.category] || Sliders;
              const numberStr = util.id < 10 ? `0${util.id}` : `${util.id}`;
              const slug = generateSlug(util.name);

              return (
                <div
                  onClick={() => navigate(`/tools/${slug}`)}
                  key={util.id}
                  id={`card-${util.id}`}
                  className="group relative bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-blue-600/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.035)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[230px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${colors.bg}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-tight text-gray-400 uppercase font-mono truncate">
                        {CATEGORY_LABELS[util.category]}
                      </span>
                    </div>
                    <span className="text-xs font-black text-gray-350 tracking-wider font-mono">
                      #{numberStr}
                    </span>
                  </div>

                  <div className="space-y-1.5 my-3 flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="font-extrabold text-sm sm:text-base text-gray-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {util.name}
                    </h3>
                    <p className="text-2xs sm:text-xs text-gray-500 font-medium leading-normal line-clamp-3">
                      {util.purpose}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-2xs font-mono text-gray-400 group-hover:text-blue-600 transition-colors">
                    <span className="font-semibold uppercase tracking-wider text-[9px]">Launch Model Engine</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 sm:p-24 text-center bg-white border border-gray-200 rounded-3xl space-y-3">
            <Search className="w-12 h-12 text-gray-300 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800">No calculators found</h3>
            <p className="text-xs text-gray-450 leading-relaxed max-w-sm">
              We couldn't find any calculators matching "{searchQuery}". Try selecting another category tab or broadening your query values.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
