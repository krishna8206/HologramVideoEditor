import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Tag, Sparkles } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search templates, keywords ('wedding', 'birthday', 'restaurant', 'intro')..." }) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  const POPULAR_KEYWORDS = [
    'wedding',
    'birthday',
    'restaurant',
    'festival',
    'corporate',
    'gold',
    'logo',
    'free'
  ];

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className={`relative flex items-center w-full rounded-2xl bg-zinc-900/80 border transition-all duration-300 ${
        isFocused ? 'border-amber-400/70 shadow-gold-subtle bg-zinc-900' : 'border-zinc-800 hover:border-zinc-700'
      }`}>
        <Search className="w-5 h-5 ml-4 text-zinc-500 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full py-3.5 pl-3 pr-10 text-sm text-zinc-100 placeholder-zinc-500 bg-transparent focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 mr-3 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Keywords Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-2xl backdrop-blur-xl z-30 animate-fadeIn">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Popular Keywords</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_KEYWORDS.map((kw) => (
              <button
                key={kw}
                type="button"
                onMouseDown={() => {
                  onChange(kw);
                  setIsFocused(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/70 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-zinc-700/50 hover:border-amber-500/30 text-xs transition-all"
              >
                <Tag className="w-3 h-3 text-zinc-500" />
                <span>{kw}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
