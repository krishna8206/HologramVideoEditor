import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import { HOMEPAGE_BANNERS, FAQ_ITEMS } from '../../utils/mockData';
import TemplateCard from '../../components/TemplateCard/TemplateCard';
import TemplateGrid from '../../components/TemplateGrid/TemplateGrid';
import CategoryNav from '../../components/CategoryFilter/CategoryNav';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Heart,
  Film,
  Lock,
  Layers,
  Wand2,
  Clock,
  HelpCircle,
  MessageSquare,
  SlidersHorizontal,
  X,
  Search
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const {
    templates,
    categories,
    allTemplates,
    loading,
    activeCategory,
    searchQuery,
    setSearchQuery,
    pricingFilter,
    setPricingFilter,
    orientationFilter,
    setOrientationFilter,
    sortBy,
    setSortBy,
    resetFilters
  } = useTemplates();
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
  const [splashLoading, setSplashLoading] = useState(() => {
    return !sessionStorage.getItem('av_splash_shown');
  });

  // Fade out splash loader after 700ms
  useEffect(() => {
    if (splashLoading) {
      const timer = setTimeout(() => {
        setSplashLoading(false);
        sessionStorage.setItem('av_splash_shown', 'true');
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [splashLoading]);

  // Auto-rotate hero banners every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % HOMEPAGE_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = HOMEPAGE_BANNERS[activeBannerIdx];
  const [trendingFormat, setTrendingFormat] = useState('9:16');

  // Top 4 trending templates of uniform format, ensuring symmetrical baseline alignment
  const trendingTemplates = useMemo(() => {
    const sorted = [...allTemplates].sort((a, b) => (b.views || 0) - (a.views || 0));
    const filtered = sorted.filter((t) => t.orientation === trendingFormat);
    return filtered.slice(0, 4);
  }, [allTemplates, trendingFormat]);

  const currentCategoryObj = categories.find((c) => c.id === activeCategory);
  const collectionTitle = currentCategoryObj
    ? `${currentCategoryObj.name} Video Collection`
    : 'All Video Templates Collection';

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setActiveBannerIdx((prev) => (prev + 1) % HOMEPAGE_BANNERS.length);
    } else if (distance < -50) {
      setActiveBannerIdx((prev) => (prev - 1 + HOMEPAGE_BANNERS.length) % HOMEPAGE_BANNERS.length);
    }
  };

  return (
    <div className="pb-6 sm:pb-8 overflow-hidden relative">
      
      {/* AMBIENT STUDIO SPOTLIGHT (Gives the website an immediate cinema suite feel) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[450px] bg-gradient-to-b from-indigo-600/18 via-violet-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-3 sm:pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.2)] animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Cinematic Video Motion Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Create Videos That Feel <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Truly Cinematic
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Choose a professionally engineered animation template, personalize permitted photos and typography, and render production-grade masters without complex video editing skills.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-semibold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 hover:border-indigo-500/50 text-xs font-semibold uppercase tracking-widest transition-all"
            >
              <span>Create Your Video</span>
            </Link>
          </div>
        </div>

        {/* 2. DYNAMIC HERO BANNER VIDEO REEL */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="mt-8 sm:mt-14 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0C14] border border-indigo-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(99,102,241,0.15)] min-h-[350px] sm:min-h-[400px] sm:aspect-[21/9] max-h-[550px] group select-none"
        >
          <video
            key={currentBanner.videoUrl}
            src={currentBanner.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
          />

          <div className={`absolute inset-0 bg-gradient-to-t ${currentBanner.bgGradient} opacity-90`} />

          {/* Banner Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 pl-12 pr-12 sm:p-8 sm:pl-16 sm:pr-16 lg:p-12 pb-12 sm:pb-12 z-10">
            <div className="max-w-xl space-y-2 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md w-fit">
                {currentBanner.badge}
              </span>
              <h3 className="text-xl sm:text-3xl lg:text-4xl text-white font-semibold leading-tight">
                {currentBanner.title}
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm font-light line-clamp-2 max-w-lg">
                {currentBanner.tagline}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  to={currentBanner.link}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 backdrop-blur-md shadow-sm active:scale-95 transition-all"
                >
                  <span>{currentBanner.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs font-bold shadow-md shrink-0">
                  Just ₹499
                </div>
              </div>
            </div>
          </div>

          {/* Slider Prev & Next Navigation Buttons */}
          <button
            onClick={() => setActiveBannerIdx((prev) => (prev - 1 + HOMEPAGE_BANNERS.length) % HOMEPAGE_BANNERS.length)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
            title="Previous Banner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setActiveBannerIdx((prev) => (prev + 1) % HOMEPAGE_BANNERS.length)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
            title="Next Banner"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-20 flex items-center gap-1.5 sm:gap-2">
            {HOMEPAGE_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBannerIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeBannerIdx === i ? 'w-8 bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* 3. LADY LUCK BASE UI: SEARCH BAR + CATEGORY NAV + COLLECTION TITLE + 4-COL TEMPLATE GRID */}
      <div className="space-y-16 mt-4 sm:mt-8">
        
        {/* Lady Luck Style Search Container */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search for Intros, Reels, 3D Motion, Titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 rounded-full bg-[#0D101B] border border-zinc-800 focus:border-purple-500 text-xs text-zinc-200 placeholder-zinc-500 outline-none shadow-md transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-20 text-zinc-500 hover:text-zinc-300 text-xs font-mono"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="absolute right-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          
          {/* Double-Tier Category & Subcategory Navigation */}
          <div className="border-b border-zinc-800/60 pb-4">
            <CategoryNav />
          </div>

          {/* Collection Title with Lady Luck Signature Underline & Filters Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
                {collectionTitle}
              </h2>
              {/* Lady Luck Signature Gradient Underline */}
              <div className="h-[2.5px] w-28 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full mt-2" />
            </div>

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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700/80 hover:border-purple-500/50 text-xs font-medium text-zinc-200 transition-all shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                <span>Filters</span>
                {(pricingFilter !== 'all' || orientationFilter !== 'all') && (
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                )}
              </button>
            </div>
          </div>

          {/* 4-Column Template Grid */}
          <TemplateGrid templates={templates} loading={loading} />

          {/* Lady Luck End-of-Catalog Marker */}
          <div className="pt-8 pb-4 text-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>✨ All templates have arrived! ✨</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </span>
          </div>

        </section>

      {/* 5. HOW IT WORKS (3 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0C0F1A]/80 border border-indigo-500/20 space-y-12 shadow-xl">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Intuitive Personalization
            </span>
            <h2 className="text-2xl sm:text-4xl text-white font-semibold tracking-tight">
              How The Studio Works
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-light">
              Create studio-quality motion sequences in 3 effortless steps without touching timeline keyframes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#090B14] border border-zinc-800/80 hover:border-indigo-500/30 transition-all space-y-3">
              <span className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">01</span>
              <h3 className="text-lg text-white font-medium">Select a Template</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Browse our multi-category catalog of motion designs. Inspect duration, audio synchronization, and editable slots before customizing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090B14] border border-zinc-800/80 hover:border-indigo-500/30 transition-all space-y-3">
              <span className="text-2xl font-mono font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">02</span>
              <h3 className="text-lg text-white font-medium">Personalize Your Content</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Upload photos, crop, zoom, and rotate inside the predefined frame. Type names and dates. Generate a free watermarked test preview anytime.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090B14] border border-zinc-800/80 hover:border-indigo-500/30 transition-all space-y-3">
              <span className="text-2xl font-mono font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">03</span>
              <h3 className="text-lg text-white font-medium">Generate & Download</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                For premium templates, unlock via individual purchase (₹299–₹799). Our cloud engine exports your clean 60 FPS master directly to My Videos.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setTutorialModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 text-purple-200 text-xs font-mono uppercase tracking-wider transition-all hover:scale-105 shadow-sm"
            >
              <span>✨ View Step-by-Step Guide 📜</span>
            </button>
          </div>

        </div>
      </section>

      {/* 6. TRENDING TEMPLATES (Perfect Baseline Alignment) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-semibold">
              Community Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl text-zinc-100 font-semibold tracking-tight mt-1">
              Trending This Week
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Aspect Ratio Format Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-sm">
              {[
                { id: '9:16', label: '9:16 Reels', dot: 'bg-purple-400' },
                { id: '16:9', label: '16:9 Cinema', dot: 'bg-blue-400' },
                { id: '1:1', label: '1:1 Square', dot: 'bg-emerald-400' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setTrendingFormat(fmt.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    trendingFormat === fmt.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${fmt.dot}`} />
                  <span>{fmt.label}</span>
                </button>
              ))}
            </div>

            <Link
              to="/templates?sortBy=popular"
              className="text-xs uppercase font-mono tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 font-medium"
            >
              View Most Popular <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Cleanly Aligned Cards with Identical Height & Symmetrical Baseline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {trendingTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl text-zinc-100 font-semibold tracking-tight">
            Answers & Purchase Clarity
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.slice(0, 3).map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0D101B]/80 border border-zinc-800/80 hover:border-indigo-500/30 transition-all space-y-2">
              <h4 className="text-sm text-zinc-200 font-medium">{item.q}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/help"
            className="text-xs text-indigo-400 hover:text-indigo-300 uppercase font-mono tracking-wider inline-flex items-center gap-1 font-medium"
          >
            Visit Full Help Center <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
      </div>

      {/* SLIDE-OUT FILTER DRAWER MODAL (Lady Luck Style) */}
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
                  <SlidersHorizontal className="w-4 h-4 text-purple-400" />
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
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'All' },
                    { id: '9:16', label: '9:16 Story' },
                    { id: '16:9', label: '16:9 Landscape' }
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setOrientationFilter(o.id)}
                      className={`py-2 rounded-xl text-xs font-mono transition-all ${
                        orientationFilter === o.id
                          ? 'bg-purple-950/80 text-purple-300 font-semibold border border-purple-500/50 shadow-sm'
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
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 font-mono focus:outline-none focus:border-purple-500"
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

      {/* LADY LUCK HOW IT WORKS TUTORIAL MODAL (Interactive Guide) */}
      {tutorialModalOpen && (
        <div 
          onClick={() => setTutorialModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[3px] animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-[#0D101A] border border-purple-500/30 p-6 sm:p-8 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative animate-scaleUp"
          >
            <button
              onClick={() => setTutorialModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <span className="text-3xl">✨</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                How Hologram Works ✨
              </h3>
              <p className="text-xs text-zinc-400">
                Personalize and render broadcast-grade motion templates in 3 effortless steps.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="w-8 h-8 rounded-xl bg-purple-900/50 border border-purple-500/40 text-purple-300 font-bold text-sm flex items-center justify-center shrink-0 font-mono">1</span>
                <div>
                  <h4 className="text-sm text-white font-medium">Select a Template</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">Browse multi-category motion designs with live preview, audio sync, and slot specifications.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="w-8 h-8 rounded-xl bg-pink-900/50 border border-pink-500/40 text-pink-300 font-bold text-sm flex items-center justify-center shrink-0 font-mono">2</span>
                <div>
                  <h4 className="text-sm text-white font-medium">Personalize Your Content</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">Upload photos, crop, zoom, and customize text fields. Test with real-time watermarked previews.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="w-8 h-8 rounded-xl bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 font-bold text-sm flex items-center justify-center shrink-0 font-mono">3</span>
                <div>
                  <h4 className="text-sm text-white font-medium">Generate & Download</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">Unlock via instant purchase. Export clean, watermark-free 60 FPS masters directly to My Videos.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setTutorialModalOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Got it, Let's Go! 🚀
              </button>
            </div>

          </div>
        </div>
      )}

      {/* LADY LUCK LUXURY INITIAL SPLASH SCREEN (fullscreen-loader-overlay) */}
      {splashLoading && (
        <div className="fixed inset-0 z-50 bg-[#07080E] flex items-center justify-center animate-fadeIn pointer-events-none transition-opacity duration-500">
          <div className="flex flex-col items-center space-y-4 text-center px-4">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-600 p-[1.5px] shadow-[0_0_40px_rgba(99,102,241,0.5)]">
              <div className="w-full h-full bg-[#090A11] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-cyan-300 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Hologram</h2>
            <p className="text-xs text-zinc-400 font-light tracking-wide">Curating your cinema motion collection...</p>
          </div>
        </div>
      )}
    </div>
  );
}
