import React, { useState, useEffect } from 'react';
import TemplateCard from '../TemplateCard/TemplateCard';
import { Film, RefreshCw } from 'lucide-react';
import { useTemplates } from '../../context/TemplateContext';

export default function TemplateGrid({ templates, loading }) {
  const { resetFilters } = useTemplates();
  const [columnsCount, setColumnsCount] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setColumnsCount(1);
      } else if (w < 768) {
        setColumnsCount(2);
      } else if (w < 1024) {
        setColumnsCount(3);
      } else {
        setColumnsCount(4);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-xl bg-zinc-900/30 border border-zinc-800/60 p-3 space-y-3 animate-pulse">
            <div className="aspect-video bg-zinc-800/40 rounded-lg" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-zinc-800/50 rounded" />
              <div className="h-4 w-3/4 bg-zinc-800/60 rounded" />
            </div>
            <div className="h-7 w-full bg-zinc-800/50 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="py-20 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/60 max-w-xl mx-auto px-6">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5 text-indigo-400">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-sans text-zinc-100 font-semibold mb-2">
          No Matching Templates Found
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
          We couldn't find any animation templates matching your current filter criteria or search keyword.
        </p>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  // Always maintain full responsive column tracks (4 on desktop, 3 on md, 2 on sm, 1 on mobile)
  // This guarantees each card is always strictly 1/4 column width (~300px), even if there is only 1 or 2 items!
  const cols = Array.from({ length: columnsCount }, () => []);
  templates.forEach((template, idx) => {
    cols[idx % columnsCount].push(template);
  });

  return (
    <div className="flex gap-4 sm:gap-5 items-start justify-start w-full">
      {cols.map((columnTemplates, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-4 sm:gap-5 min-w-0">
          {columnTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ))}
    </div>
  );
}
