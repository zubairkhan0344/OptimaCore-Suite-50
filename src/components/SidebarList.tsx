import React from 'react';
import { MicroUtility, UtilityCategory } from '../types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../data';
import { Search, Filter, Hash, CheckSquare, Sparkles } from 'lucide-react';

interface SidebarListProps {
  utilities: MicroUtility[];
  selectedId: number;
  onSelect: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: UtilityCategory | 'all';
  onCategoryChange: (category: UtilityCategory | 'all') => void;
}

export default function SidebarList({
  utilities,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}: SidebarListProps) {

  // Category listing options
  const filterCategories: { value: UtilityCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Tools' },
    { value: 'finance', label: 'Finance' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'data', label: 'Stats/Data' },
    { value: 'privacy', label: 'Privacy/Sec' },
    { value: 'real_estate', label: 'Real Estate' }
  ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl flex flex-col h-[calc(100vh-190px)] lg:h-[calc(100vh-160px)] shadow-[0_4px_12px_rgba(0,0,0,0.01)] overflow-hidden min-h-[500px]" id="utility-sidebar">
      {/* SEARCH AND CONTROLS */}
      <div className="p-4 bg-gray-50/50 border-b border-gray-200/80 space-y-3 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            id="tool-search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 50 micro-calculators..."
            className="w-full pl-9 pr-4 py-2 text-xs text-gray-950 rounded-xl bg-white border border-gray-200 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600/30 transition-all font-sans placeholder-gray-400 font-medium"
          />
        </div>

        {/* HORIZONTAL CATEGORY SCROLL FILTER */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filterCategories.map(cat => {
            const isActive = selectedCategory === cat.value;
            const categoryBaseTheme = cat.value !== 'all' ? CATEGORY_COLORS[cat.value] : null;

            let pillCol = isActive 
              ? 'bg-blue-600 text-white border-blue-600/30 shadow-sm' 
              : 'bg-white text-gray-500 hover:text-gray-900 border-gray-200 hover:bg-gray-50';

            if (isActive && categoryBaseTheme) {
              const accent = categoryBaseTheme.accent;
              if (accent === 'emerald') pillCol = 'bg-emerald-600 text-white border-emerald-500/30 shadow-sm';
              if (accent === 'amber') pillCol = 'bg-amber-600 text-white border-amber-500/30 shadow-sm';
              if (accent === 'indigo') pillCol = 'bg-blue-600 text-white border-blue-500/30 shadow-sm';
              if (accent === 'rose') pillCol = 'bg-rose-600 text-white border-rose-500/30 shadow-sm';
              if (accent === 'sky') pillCol = 'bg-sky-600 text-white border-sky-500/30 shadow-sm';
            }

            return (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg border cursor-pointer select-none whitespace-nowrap transition-all active:scale-95 ${pillCol}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MATCH COUNT BAR */}
      <div className="px-4 py-2 bg-gray-50/30 border-b border-gray-200/80 shrink-0 flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span className="font-semibold uppercase tracking-wider">Indexed Directory</span>
        <span className="font-bold bg-white border border-gray-200 px-1.5 py-0.5 rounded text-blue-600">
          {utilities.length} Results
        </span>
      </div>

      {/* CORE UTILITIES LIST VIEW */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
        {utilities.length > 0 ? (
          utilities.map((util, i) => {
            const isSelected = selectedId === util.id;
            const colors = CATEGORY_COLORS[util.category];
            const numberLabel = util.id < 10 ? `0${util.id}` : `${util.id}`;

            return (
              <button
                key={util.id}
                onClick={() => onSelect(util.id)}
                className={`w-full text-left p-4 flex gap-3 transition-all cursor-pointer border-l-3 group outline-none ${
                  isSelected 
                    ? 'bg-blue-50/50 border-l-blue-600 text-gray-900' 
                    : 'bg-transparent border-l-transparent hover:bg-gray-50/50 text-gray-500 hover:text-gray-900'
                }`}
              >
                {/* ID COUNTER */}
                <span className={`font-mono text-xs font-bold shrink-0 leading-none mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {numberLabel}
                </span>

                {/* INFO CONTENT */}
                <div className="space-y-1 min-w-0">
                  <span className="block font-bold text-xs sm:text-sm tracking-tight text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {util.name}
                  </span>
                  <p className="text-2xs text-gray-500 leading-normal line-clamp-2 truncate-none font-medium">
                    {util.purpose}
                  </p>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border w-fit leading-none mt-1 bg-gray-50 border-gray-200 uppercase text-gray-650 font-mono">
                    {CATEGORY_LABELS[util.category]}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-14 text-center space-y-2 text-gray-405">
            <Filter className="w-8 h-8 text-gray-300 animate-bounce" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">No calculators found</span>
            <p className="text-2xs text-gray-450 leading-relaxed max-w-[200px]">Adjust your search query or filter category options above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
