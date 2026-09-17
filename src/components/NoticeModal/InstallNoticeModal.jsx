import React, { useState, useEffect } from 'react';
import { Film, X, Sparkles, Download, CheckCircle2 } from 'lucide-react';

export default function InstallNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installedToast, setInstalledToast] = useState(false);

  useEffect(() => {
    // Listen for PWA beforeinstallprompt event if supported
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show popup at start when entering the web (after 900ms splash completes)
    const hasDismissed = sessionStorage.getItem('auravideo_notice_dismissed');
    if (!hasDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 900);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('auravideo_notice_dismissed', 'true');
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledToast(true);
      }
      setDeferredPrompt(null);
    } else {
      setInstalledToast(true);
      setTimeout(() => {
        setInstalledToast(false);
        handleDismiss();
      }, 2500);
    }
  };

  if (!isOpen && !installedToast) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Toast Notification */}
      {installedToast && (
        <div className="fixed top-8 z-50 px-5 py-3 rounded-2xl bg-zinc-900 border border-purple-500/40 shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold text-white">
            ✨ AuraVideo Studio added! Bookmark or add to home screen for 1-click access.
          </span>
        </div>
      )}

      {/* Main Notice Card (Lady Luck Style) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[400px] p-6 sm:p-7 rounded-3xl bg-[#0D101C] border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(168,85,247,0.2)] flex flex-col items-center text-center gap-4 animate-slideUp"
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Notice"
        >
          <X className="w-4 h-4" />
        </button>

        {/* App Icon */}
        <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] shadow-[0_0_24px_rgba(168,85,247,0.4)] flex items-center justify-center">
          <div className="w-full h-full rounded-[14px] bg-[#090B14] flex items-center justify-center">
            <Film className="w-8 h-8 text-purple-300" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 px-2">
          <h3 className="text-xl font-bold text-white tracking-tight">
            AuraVideo App
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            Install our app for a faster & premium experience!
          </p>
        </div>

        {/* Action Buttons (Lady Luck Style Later / Install Now) */}
        <div className="w-full flex items-center gap-3 pt-2">
          <button
            onClick={handleDismiss}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-sm transition-all active:scale-95 border border-white/[0.06]"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_4px_16px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_22px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            Install Now
          </button>
        </div>
      </div>

    </div>
  );
}
