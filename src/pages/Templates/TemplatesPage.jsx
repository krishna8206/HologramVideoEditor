import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import CategoryNav from '../../components/CategoryFilter/CategoryNav';
import TemplateGrid from '../../components/TemplateGrid/TemplateGrid';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  RefreshCw,
  Check
} from 'lucide-react';

export default function TemplatesPage() {
  const [searchParams] = useSearchParams();
  const {
    templates,
    allTemplates,
    categories,
    loading,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    searchQuery,
    setSearchQuery,
    pricingFilter,
    setPricingFilter,
    orientationFilter,
    setOrientationFilter,
    resolutionFilter,
    setResolutionFilter,
    sortBy,
    setSortBy,
    resetFilters
  } = useTemplates();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Sync category or query param if present
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setActiveCategory(catParam);
    }
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);

  // Determine active category display title
  const currentCategoryObj = categories.find((c) => c.id === activeCategory);
  const collectionTitle = currentCategoryObj
    ? `${currentCategoryObj.name} Video Collection`
    : 'All Video Templates Collection';

  return (
    <div className="min-h-screen py-6 lg:py-10 bg-[#08090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        
        {/* 1. DOUBLE-TIER CATEGORY + SUBCATEGORY PILLS (Exactly like screenshot) */}
        <div className="border-b border-zinc-800/60 pb-4">
          <CategoryNav />
        </div>

        {/* 2. COLLECTION HEADER SECTION (With signature underline & Filters button) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          
          {/* Heading with Underline Accent */}
          <div>
            <h1 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight">
              {collectionTitle}
            </h1>
            {/* Lady Luck Signature Gradient Underline */}
            <div className="h-[2.5px] w-28 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full mt-2" />
          </div>

          {/* Right Action: Quick Aspect Ratio Filters + Full Filters Drawer Button */}
          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <div className="inline-flex items-center p-1 rounded-full bg-zinc-900/90 border border-zinc-800">
              {[
                { id: 'all', label: 'All Ratios', dot: 'bg-zinc-400' },
                { id: '9:16', label: '9:16 Portrait', dot: 'bg-purple-400' },
                { id: '1:1', label: '1:1 Square', dot: 'bg-emerald-400' },
                { id: '16:9', label: '16:9 Landscape', dot: 'bg-blue-400' },
              ].map((ratio) => (
                <button
                  key={ratio.id}
                  onClick={() => setOrientationFilter(ratio.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    orientationFilter === ratio.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${ratio.dot}`} />
                  <span className="hidden sm:inline">{ratio.label}</span>
                  <span className="sm:hidden">{ratio.id === 'all' ? 'All' : ratio.id}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700/80 hover:border-purple-500/50 text-xs font-medium text-zinc-200 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <span>Filters</span>
              {(pricingFilter !== 'all' || resolutionFilter !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-pink-500" />
              )}
            </button>
          </div>

        </div>

        {/* Search / Filter Indicator if active */}
        {(searchQuery || pricingFilter !== 'all' || orientationFilter !== 'all') && (
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800">
            <span>Active Filters:</span>
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-200">
                "{searchQuery}"
              </span>
            )}
            {pricingFilter !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-200 uppercase">
                {pricingFilter}
              </span>
            )}
            {orientationFilter !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-200">
                {orientationFilter}
              </span>
            )}
            <button
              onClick={resetFilters}
              className="ml-auto text-indigo-400 hover:text-indigo-300 underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* 3. TEMPLATES GRID */}
        <TemplateGrid templates={templates} loading={loading} />

      </div>

      {/* 4. SLIDE-OUT FILTER DRAWER MODAL */}
      {filterDrawerOpen && (
        <div 
          onClick={() => setFilterDrawerOpen(false)}
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm h-full bg-[#0D101A] border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-lg text-white font-semibold">Filter Catalog</h3>
                </div>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pricing Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  License Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['all', 'free', 'premium'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPricingFilter(m)}
                      className={`py-2 rounded-xl text-xs font-mono uppercase transition-all ${
                        pricingFilter === m
                          ? 'bg-purple-950/80 text-purple-300 font-semibold border border-purple-500/50 shadow-sm'
                          : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lady Luck Style Price Presets */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Price Range (₹)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under_500', label: 'Under 500' },
                    { id: '500_1500', label: '500 - 1500' },
                    { id: 'above_1500', label: 'Above 1500' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (p.id === 'under_500') setPricingFilter('free');
                        else if (p.id === 'all') setPricingFilter('all');
                        else setPricingFilter('premium');
                      }}
                      className="py-2 px-3 rounded-xl text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/40 text-center transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orientation Filter */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: 'All Ratios' },
                    { id: '9:16', label: '9:16 Portrait' },
                    { id: '1:1', label: '1:1 Square' },
                    { id: '16:9', label: '16:9 Landscape' }
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setOrientationFilter(o.id)}
                      className={`py-2 rounded-xl text-xs font-mono transition-all ${
                        orientationFilter === o.id
                          ? 'bg-indigo-950/80 text-indigo-300 font-semibold border border-indigo-500/50 shadow-sm'
                          : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none focus:border-indigo-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="downloads">Most Downloaded</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-zinc-800 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200"
              >
                Clear All
              </button>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
