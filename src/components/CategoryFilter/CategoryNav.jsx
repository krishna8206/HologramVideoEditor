import React from 'react';
import { useTemplates } from '../../context/TemplateContext';

export default function CategoryNav() {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory
  } = useTemplates();

  const currentCategoryObj = categories.find((c) => c.id === activeCategory);

  return (
    <div className="space-y-3.5 pt-2 pb-1">
      {/* 1. PRIMARY CATEGORY PILLS (Top Row) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.35)] font-semibold scale-105'
              : 'bg-[#0D101B]/80 text-zinc-300 hover:text-white border border-zinc-800 hover:border-indigo-500/40'
          }`}
        >
          All Templates
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.35)] font-semibold scale-105'
                : 'bg-[#0D101B]/80 text-zinc-300 hover:text-white border border-zinc-800 hover:border-indigo-500/40'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 2. SUBCATEGORY PILLS */}
      {currentCategoryObj && currentCategoryObj.subcategories?.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pl-0.5 animate-fadeIn">
          <button
            onClick={() => setActiveSubcategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-200 ${
              activeSubcategory === 'all'
                ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-500/50 font-semibold shadow-sm'
                : 'bg-[#0D101B]/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            All
          </button>

          {currentCategoryObj.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategory(sub.id)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-200 ${
                activeSubcategory === sub.id
                  ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-500/50 font-semibold shadow-sm'
                  : 'bg-[#0D101B]/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
