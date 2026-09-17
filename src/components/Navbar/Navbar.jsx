import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTemplates } from '../../context/TemplateContext';
import ShareModal from '../ShareModal/ShareModal';
import {
  Share2,
  Bell,
  Heart,
  Film,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { favorites, purchases, allTemplates } = useTemplates();
  const navigate = useNavigate();
  const location = useLocation();

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setNotificationsOpen(false);
  }, [location.pathname]);

  const handleProtectedClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal('login', () => navigate(path));
    }
  };

  const currentTemplate = allTemplates[0];

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* 1. TOP HEADER (Mobile Responsive & Zero Horizontal Overflow) */}
      <header className="w-full bg-[#080911]/95 backdrop-blur-xl border-b border-white/[0.06] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Professional Video Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group select-none shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#080912] rounded-[9px] sm:rounded-[10px] flex items-center justify-center">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-base sm:text-2xl tracking-tight bg-gradient-to-r from-white via-zinc-100 to-purple-200 bg-clip-text text-transparent leading-none">
                Hologram
              </span>
              <span className="text-[7.5px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-purple-400 uppercase mt-1">
                STUDIO SUITE
              </span>
            </div>
          </Link>

          {/* Right: Sleek, unified action buttons (Mobile Optimized) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Credits Pill */}
            <button
              onClick={(e) => handleProtectedClick(e, '/dashboard')}
              className="h-8 sm:h-10 px-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-950/40 via-zinc-900/90 to-zinc-900/90 hover:from-purple-900/50 hover:to-zinc-800/90 border border-purple-500/25 hover:border-purple-400/50 text-xs font-semibold text-amber-300 flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shrink-0"
              title="Render Credits"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white tracking-wide text-xs">{isAuthenticated ? '5' : '0'}</span>
              <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider hidden md:inline">Credits</span>
            </button>

            {/* Share Button (All Viewports) */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center bg-zinc-900/70 hover:bg-zinc-800/90 border border-white/[0.08] hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(168,85,247,0.2)] hover:-translate-y-0.5 active:scale-95 relative shrink-0"
              title="Share platform"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] ring-2 ring-[#080911]" />
            </button>

            {/* Notifications Bell (All Viewports) */}
            <div className="relative shrink-0" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:scale-95 relative ${
                  notificationsOpen
                    ? 'bg-purple-600/20 border-purple-500/60 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-zinc-900/70 hover:bg-zinc-800/90 border-white/[0.08] hover:border-purple-500/40 text-zinc-300 hover:text-white hover:shadow-[0_4px_16px_rgba(168,85,247,0.2)]'
                }`}
                title="Notifications"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7] ring-2 ring-[#080911]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 max-w-[calc(100vw-24px)] p-3.5 sm:p-4 rounded-2xl bg-[#0F121F] border border-purple-500/30 shadow-2xl z-50 animate-fadeIn">
                  <div className="text-xs font-semibold text-zinc-100 mb-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                    <span>Platform Notifications</span>
                    <span className="text-[10px] text-purple-400 font-mono">LIVE</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-zinc-300">
                      <span className="text-purple-400 font-medium block text-[11px]">Creative Launch Active</span>
                      Explore high-framerate animation templates for your projects.
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-zinc-300">
                      <span className="text-cyan-400 font-medium block text-[11px]">60 FPS ProRes Render</span>
                      Full HD and 4K cinema encoding unlocked for all templates.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon with Crisp Badge */}
            <Link
              to="/favorites"
              onClick={(e) => handleProtectedClick(e, '/favorites')}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center bg-zinc-900/70 hover:bg-zinc-800/90 border border-white/[0.08] hover:border-purple-500/40 text-zinc-300 hover:text-rose-400 transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(244,63,94,0.2)] hover:-translate-y-0.5 active:scale-95 relative shrink-0"
              title="Saved Favorites"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-[#080911]">
                  {favorites.length}
                </span>
              )}
            </Link>

          </div>
        </div>
      </header>


      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        template={currentTemplate}
      />
    </div>
  );
}
