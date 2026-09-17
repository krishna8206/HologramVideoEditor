import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Film, CheckCircle2, ShieldCheck, Zap, X, ArrowRight } from 'lucide-react';

export default function AfterLoginNoticeModal() {
  const { loginNoticeOpen, closeLoginNotice, user } = useAuth();

  if (!loginNoticeOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={closeLoginNotice}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0D101C] border border-purple-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.25)] flex flex-col gap-6 animate-slideUp text-left"
      >
        {/* Floating Close Button */}
        <button
          onClick={closeLoginNotice}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Notice"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Emblem & Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] shadow-[0_0_24px_rgba(168,85,247,0.4)] shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#090B14] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-purple-300 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono font-semibold text-purple-300 uppercase tracking-wider mb-1">
              Important Creator Notice
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Welcome, {user?.name || 'Creator'}! ✨
            </h3>
          </div>
        </div>

        {/* Notice Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Your AuraVideo Studio account is now active. Please review your unlocked platform privileges and production rules:
        </p>

        {/* Notice Privileges List (Lady Luck Style) */}
        <div className="space-y-3">
          
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3 hover:border-purple-500/30 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-zinc-100 block">5 Free Render Credits Credited</span>
              <span className="text-zinc-400 text-[11px] leading-relaxed">
                Use your complimentary credits to generate broadcast-ready videos right away.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3 hover:border-purple-500/30 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-zinc-100 block">60 FPS Hardware Encoding Unlocked</span>
              <span className="text-zinc-400 text-[11px] leading-relaxed">
                Full HD 1080p and 4K cinema rendering with zero watermarks or export limits.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3 hover:border-purple-500/30 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-zinc-100 block">100% Commercial Broadcast Clearance</span>
              <span className="text-zinc-400 text-[11px] leading-relaxed">
                Licensed music tracks and typography approved for social media and commercial ads.
              </span>
            </div>
          </div>

        </div>

        {/* Tip Box */}
        <div className="p-3 rounded-xl bg-purple-950/25 border border-purple-500/20 text-[11px] text-purple-200 flex items-center gap-2">
          <span>💡</span>
          <span>You can personalize and preview unlimited video drafts for free before rendering!</span>
        </div>

        {/* Footer Action Button (Lady Luck's Signature "Got it, Let's Go! 🚀") */}
        <button
          onClick={closeLoginNotice}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.6)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Got it, Let's Go! 🚀</span>
        </button>

      </div>
    </div>
  );
}
