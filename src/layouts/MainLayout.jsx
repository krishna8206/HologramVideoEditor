import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../context/AuthContext';
import { Home, Film, ShoppingBag, User, Layers } from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleProtectedClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal('login');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#07080E] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      
      <main className={`flex-1 flex flex-col ${location.pathname === '/' ? 'pb-0' : 'pb-20 sm:pb-24'}`}>
        <Outlet />
      </main>

      {/* Render Footer ONLY on the Home Page */}
      {location.pathname === '/' && <Footer />}

      {/* LADY LUCK STYLE FIXED BOTTOM NAVIGATION BAR (Dark Glass Edition) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080911]/95 backdrop-blur-2xl border-t border-zinc-800/90 py-2 sm:py-2.5 px-2 sm:px-8 shadow-[0_-8px_30px_rgba(0,0,0,0.85)]">
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-around sm:justify-between px-1 sm:px-12">
          
          {/* 1. Home */}
          <Link
            to="/"
            className={`flex-1 sm:flex-initial flex flex-col items-center gap-0.5 sm:gap-1 py-1 px-1 sm:px-8 min-w-0 sm:min-w-[90px] transition-all duration-200 relative ${
              isActive('/')
                ? 'text-purple-400 font-semibold scale-105'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Home className={`w-5 h-5 ${isActive('/') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">Home</span>
            {isActive('/') && (
              <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            )}
          </Link>

          {/* 2. Templates */}
          <Link
            to="/templates"
            className={`flex-1 sm:flex-initial flex flex-col items-center gap-0.5 sm:gap-1 py-1 px-1 sm:px-8 min-w-0 sm:min-w-[90px] transition-all duration-200 relative ${
              isActive('/templates')
                ? 'text-purple-400 font-semibold scale-105'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className={`w-5 h-5 ${isActive('/templates') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">Templates</span>
            {isActive('/templates') && (
              <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            )}
          </Link>

          {/* 3. My Videos */}
          <Link
            to="/my-videos"
            className={`flex-1 sm:flex-initial flex flex-col items-center gap-0.5 sm:gap-1 py-1 px-1 sm:px-8 min-w-0 sm:min-w-[90px] transition-all duration-200 relative ${
              isActive('/my-videos')
                ? 'text-purple-400 font-semibold scale-105'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Film className={`w-5 h-5 ${isActive('/my-videos') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">My Videos</span>
            {isActive('/my-videos') && (
              <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            )}
          </Link>

          {/* 4. Orders / Purchases */}
          <Link
            to="/my-purchases"
            className={`flex-1 sm:flex-initial flex flex-col items-center gap-0.5 sm:gap-1 py-1 px-1 sm:px-8 min-w-0 sm:min-w-[90px] transition-all duration-200 relative ${
              isActive('/my-purchases')
                ? 'text-purple-400 font-semibold scale-105'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${isActive('/my-purchases') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">Orders</span>
            {isActive('/my-purchases') && (
              <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            )}
          </Link>

          {/* 5. Account */}
          <Link
            to="/account"
            className={`flex-1 sm:flex-initial flex flex-col items-center gap-0.5 sm:gap-1 py-1 px-1 sm:px-8 min-w-0 sm:min-w-[90px] transition-all duration-200 relative ${
              isActive('/account') || isActive('/profile') || isActive('/dashboard')
                ? 'text-purple-400 font-semibold scale-105'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className={`w-5 h-5 ${isActive('/account') || isActive('/profile') || isActive('/dashboard') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">Account</span>
            {(isActive('/account') || isActive('/profile') || isActive('/dashboard')) && (
              <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            )}
          </Link>

        </div>
      </nav>
    </div>
  );
}
