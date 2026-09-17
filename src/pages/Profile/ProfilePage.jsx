import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTemplates } from '../../context/TemplateContext';
import {
  User,
  Pencil,
  Check,
  X,
  Sparkles,
  Film,
  ShoppingBag,
  Heart,
  Globe,
  Smartphone,
  HelpCircle,
  MessageCircle,
  LogOut,
  ChevronRight,
  Download,
  Shield,
  Zap,
  ArrowRight,
  Phone,
  Mail,
  Video,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Star
} from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile, openAuthModal } = useAuth();
  const { userVideos, purchases, favorites } = useTemplates();
  const navigate = useNavigate();

  // 1. Inline Name Edit State
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || 'Alexander Wright');
  const [nameSaving, setNameSaving] = useState(false);

  // 2. Modals State
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [studioProfileModalOpen, setStudioProfileModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // 3. Studio Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Alexander Wright',
    email: user?.email || 'alexander@meridian.io',
    phone: user?.phone || '+91 98765 43210',
    whatsapp: user?.whatsapp || '+91 98765 43210',
    role: user?.creatorRole || 'Content Creator',
    resolution: user?.preferredResolution || '4K'
  });
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // 4. Language State
  const [language, setLanguage] = useState(() => localStorage.getItem('aura_lang') || 'en');

  // Sync user state if updated
  useEffect(() => {
    if (user?.name) setDisplayName(user.name);
    if (user) {
      setProfileForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        whatsapp: user.whatsapp || prev.whatsapp,
        role: user.creatorRole || prev.role
      }));
    }
  }, [user]);

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Handle Inline Name Save
  const handleSaveName = async () => {
    if (!displayName.trim()) return;
    setNameSaving(true);
    try {
      await updateProfile({ name: displayName.trim() });
      setIsEditingName(false);
    } catch (err) {
      console.error(err);
    } finally {
      setNameSaving(false);
    }
  };

  const handleCancelName = () => {
    setDisplayName(user?.name || 'Alexander Wright');
    setIsEditingName(false);
  };

  // Handle Full Studio Profile Save
  const handleSaveStudioProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        whatsapp: profileForm.whatsapp,
        creatorRole: profileForm.role,
        preferredResolution: profileForm.resolution
      });
      setDisplayName(profileForm.name);
      setStudioProfileModalOpen(false);
      setProfileSavedToast(true);
      setTimeout(() => setProfileSavedToast(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Language Change
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem('aura_lang', newLang);
  };

  // Handle PWA Install
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setInstallModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // User Initial
  const userInitial = (displayName || user?.name || 'A').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Responsive Container (Mobile 100% full width, Tablet max-w-4xl, Desktop max-w-5xl) */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto w-full space-y-4">

        {/* Success Toast */}
        {profileSavedToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 shadow-lg shadow-emerald-950/50 backdrop-blur-md animate-fadeIn">
            <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <span>Profile details updated successfully!</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* 1. USER PROFILE HEADER CARD (High-End Contrast Edition) */}
        {/* ======================================================== */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#15192B] to-[#0E111F] border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-2xl relative overflow-hidden">
          
          {/* Subtle Top-Border Specular Highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Avatar & Info */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Avatar Initial Monogram with Dual-Ring Glow */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_22px_rgba(168,85,247,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#101323] flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-tr from-white via-purple-100 to-purple-300 font-black text-2xl sm:text-3xl shadow-inner select-none">
                    {(displayName || user?.name || 'A').charAt(0).toUpperCase()}
                  </div>
                </div>
                {/* Online Indicator Dot */}
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#101323] shadow-sm" />
              </div>

              {/* User Details & Inline Edit */}
              <div className="flex-1 min-w-0">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      autoFocus
                      className="px-3 py-1.5 text-sm rounded-xl bg-zinc-950 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 w-full max-w-[170px] font-semibold"
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={nameSaving}
                      className="p-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow transition-colors"
                      title="Save Name"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleCancelName}
                      className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">
                      {displayName}
                    </h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1.5 rounded-full bg-white/5 hover:bg-purple-500/20 text-zinc-400 hover:text-purple-300 border border-white/5 transition-all shrink-0 active:scale-90"
                      aria-label="Edit Name"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-zinc-400 font-mono tracking-wide truncate">
                    {profileForm.phone || profileForm.email}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </span>
                </div>
              </div>
            </div>

            {/* Status Badges & Privilege Stats */}
            <div className="flex sm:flex-col items-center sm:items-end justify-start sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/35 text-xs font-mono font-bold text-amber-300 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 5 Credits
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono font-semibold text-purple-300">
                  <Shield className="w-3.5 h-3.5 text-purple-400" /> Pro Tier
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 hidden sm:block">
                Unlimited 4K Hardware Renders
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. PROMOTIONAL BANNER ("How Hologram Works") */}
        {/* ======================================================== */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#5B1E4A] via-[#3E1656] to-[#1C1448] border border-fuchsia-500/40 shadow-[0_10px_30px_rgba(168,85,247,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 relative overflow-hidden">
          
          {/* Shimmer Highlight Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />

          <div className="space-y-1.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-400/20 border border-pink-400/30 text-pink-200 font-mono text-[9px] font-extrabold uppercase tracking-wider">
              🎁 EARN FREE CREDITS
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 tracking-tight">
              How Hologram Works <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </h3>
            <p className="text-[11px] text-pink-100/80 font-normal leading-snug max-w-sm sm:max-w-md">
              Read quick guide on templates, personalization & instant 4K renders.
            </p>
          </div>

          <button
            onClick={() => setGuideModalOpen(true)}
            className="z-10 px-4 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs whitespace-nowrap shadow-[0_4px_16px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all shrink-0 self-end sm:self-auto flex items-center gap-1.5"
          >
            Read Guide 📜
          </button>

          {/* Decorative Corner Glow */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-fuchsia-500/30 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* ======================================================== */}
        {/* 3. SECTION: ACCOUNT SETTINGS */}
        {/* ======================================================== */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
              Account Settings
            </h3>
          </div>

          {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* A. My Studio Profile */}
            <div
              onClick={() => setStudioProfileModalOpen(true)}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-purple-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/25 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                    <span>My Studio Profile</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-semibold">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Personal info & WhatsApp render notifications
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* B. My Video Vault */}
            <Link
              to="/my-videos"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-cyan-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span>My Video Vault</span>
                    {userVideos?.length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-semibold">
                        {userVideos.length} Ready
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Track your ongoing & completed video renders
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* C. Purchase & License History */}
            <Link
              to="/my-purchases"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-pink-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500/25 to-rose-600/20 border border-pink-500/30 flex items-center justify-center text-pink-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                    Order & License History
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    View purchased templates & commercial licenses
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-pink-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* D. Favorite Templates */}
            <Link
              to="/favorites"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-rose-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500/25 to-red-600/20 border border-rose-500/30 flex items-center justify-center text-rose-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors flex items-center gap-2">
                    <span>Favorite Templates</span>
                    {favorites?.length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-semibold">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Bookmarked motion graphic templates
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4 & 5. PREFERENCES & APP (Responsive 2-col on sm/md) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* LANGUAGE SETTINGS */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
              <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                Language Settings
              </h3>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 shadow-[0_4px_18px_rgba(0,0,0,0.35)] flex items-center justify-between gap-3 h-[calc(100%-28px)]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500/25 to-emerald-600/20 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-sm shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white">Select Language</div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">Choose your preferred language</p>
                </div>
              </div>

              <select
                value={language}
                onChange={handleLanguageChange}
                className="px-3.5 py-2.5 rounded-xl bg-[#1A1F36] border border-white/10 text-xs text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/40 font-semibold cursor-pointer shadow-inner"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="gj">ગુજરાતી (Gujarati)</option>
              </select>
            </div>
          </div>

          {/* GET THE APP */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
              <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                Get The App
              </h3>
            </div>

            <div
              onClick={handleInstallClick}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-fuchsia-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99] h-[calc(100%-28px)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                    Install Hologram App
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Add to home screen for full-screen experience
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-fuchsia-300 group-hover:border-fuchsia-500/40 transition-all shrink-0">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. SECTION: SUPPORT */}
        {/* ======================================================== */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
              Support
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Help Center */}
            <Link
              to="/help"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-indigo-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/25 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Help Center & FAQ
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Guides, licensing & render questions
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* WhatsApp Support */}
            <a
              href="https://wa.me/919875270319?text=Hi%20Hologram%20Team%2C%20I%20need%20help%20with%20video%20templates"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#13172B]/95 to-[#0E111F]/95 border border-white/10 hover:border-emerald-500/40 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.35)] group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    <span>WhatsApp Support</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Direct chat with our video engineers
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. ACCOUNT ACTIONS (Logout or Login) */}
        {/* ======================================================== */}
        <div className="pt-2">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/25 to-zinc-900/50 hover:from-red-950/60 hover:to-zinc-900/70 border border-red-500/30 hover:border-red-500/50 text-red-300 font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_4px_18px_rgba(239,68,68,0.15)] active:scale-[0.99] transition-all"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>🚪 Logout</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(168,85,247,0.4)] active:scale-[0.99] transition-all"
            >
              <User className="w-4 h-4" />
              <span>Sign In to Your Studio Account</span>
            </button>
          )}
        </div>

        {/* 8. FOOTER VERSION INFO */}
        <div className="text-center pt-2 pb-2">
          <p className="text-[11px] font-mono text-zinc-500">
            Hologram Studio Suite • Cinema-Grade Personalization Platform
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: "HOW AURAPRO WORKS" GUIDE MODAL */}
      {/* ======================================================== */}
      {guideModalOpen && (
        <div
          onClick={() => setGuideModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0F1325] border border-purple-500/40 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 animate-scaleUp relative overflow-hidden"
          >
            {/* Top Specular Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🎁</span>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  How Hologram Works
                </h3>
              </div>
              <button
                onClick={() => setGuideModalOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps Tutorial */}
            <div className="space-y-3.5 text-xs text-zinc-300">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gradient-to-b from-[#171B30] to-[#121526] border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-purple-500/25 border border-purple-500/40 text-purple-300 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Pick a Master Template</h4>
                  <p className="text-zinc-400 mt-0.5 leading-relaxed">
                    Select from cinema-grade motion graphics engineered for Wedding, YouTube, Festival, and Business.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gradient-to-b from-[#171B30] to-[#121526] border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Personalize Content Live</h4>
                  <p className="text-zinc-400 mt-0.5 leading-relaxed">
                    Update texts, photos, dates, and names. Review audio synchronization and instant live preview.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gradient-to-b from-[#171B30] to-[#121526] border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Export Watermark-Free 4K Master</h4>
                  <p className="text-zinc-400 mt-0.5 leading-relaxed">
                    Our cloud engine compiles your master file with zero watermark, delivered directly to your vault.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setGuideModalOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_6px_22px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Got it, Let's Go! 🚀
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: STUDIO PROFILE SETUP MODAL */}
      {/* ======================================================== */}
      {studioProfileModalOpen && (
        <div
          onClick={() => setStudioProfileModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0F1325] border border-purple-500/40 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-4 max-h-[90vh] overflow-y-auto animate-scaleUp relative"
          >
            {/* Top Specular Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  My Studio Profile
                </h3>
              </div>
              <button
                onClick={() => setStudioProfileModalOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudioProfile} className="space-y-4 text-xs">
              {/* Full Name */}
              <div>
                <label className="block font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-3 rounded-xl bg-[#1A1F36] border border-white/10 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 text-xs font-semibold"
                />
              </div>

              {/* WhatsApp Number for alerts */}
              <div>
                <label className="block font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                  WhatsApp Number (For Render Completion Alerts)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="tel"
                    value={profileForm.whatsapp}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#1A1F36] border border-white/10 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 text-xs font-semibold"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">
                  We send instant video download links to this number once cloud render finishes.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#1A1F36] border border-white/10 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_6px_22px_rgba(168,85,247,0.4)] transition-all"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: PWA / ADD TO HOME SCREEN GUIDANCE MODAL */}
      {/* ======================================================== */}
      {installModalOpen && (
        <div
          onClick={() => setInstallModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0F1325] border border-purple-500/40 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-4 animate-scaleUp text-xs relative overflow-hidden"
          >
            {/* Top Specular Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Install on Your Phone
                </h3>
              </div>
              <button
                onClick={() => setInstallModalOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-zinc-300 leading-relaxed text-xs">
              Add Hologram to your home screen to launch in full-screen mode like a native app!
            </p>

            <div className="space-y-3 pt-1">
              {/* iPhone Safari */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#171B30] to-[#121526] border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2 text-xs">
                  <span>🍎 On iPhone (Safari):</span>
                </div>
                <p className="text-zinc-400 leading-normal text-[11px]">
                  Tap the <strong className="text-purple-300 font-semibold">Share</strong> icon at the bottom bar, scroll down, and select <strong className="text-white font-semibold">"Add to Home Screen"</strong>.
                </p>
              </div>

              {/* Android Chrome */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#171B30] to-[#121526] border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2 text-xs">
                  <span>🤖 On Android (Chrome):</span>
                </div>
                <p className="text-zinc-400 leading-normal text-[11px]">
                  Tap the <strong className="text-purple-300 font-semibold">Three Dots Menu (⋮)</strong> at top right, then tap <strong className="text-white font-semibold">"Install app"</strong> or <strong className="text-white font-semibold">"Add to Home screen"</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setInstallModalOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_6px_22px_rgba(168,85,247,0.4)] transition-all mt-2"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
