import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, Film } from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGES = [
  { step: 1, label: 'Preparing cinema template...', percent: 20 },
  { step: 2, label: 'Compositing your high-resolution assets...', percent: 50 },
  { step: 3, label: 'Rendering 60FPS video layers...', percent: 85 },
  { step: 4, label: 'Polishing final audio and video stream...', percent: 98 },
];

export function RenderModal({
  isOpen,
  onComplete,
  onError,
}) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(15);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIdx(0);
      setProgress(15);
      setIsDone(false);
      setError(null);
      return;
    }

    // Step 1 -> Step 2 -> Step 3 -> Step 4 -> Complete
    const t1 = setTimeout(() => {
      setCurrentStageIdx(1);
      setProgress(45);
    }, 1200);

    const t2 = setTimeout(() => {
      setCurrentStageIdx(2);
      setProgress(75);
    }, 2800);

    const t3 = setTimeout(() => {
      setCurrentStageIdx(3);
      setProgress(95);
    }, 4200);

    const t4 = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      // Trigger subtle celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F5E0A3', '#FFFFFF', '#E0A996'],
        });
      } catch (e) {}

      // Auto-redirect to generated video view
      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-obsidian-900 border border-gold-500/30 shadow-card-elevated p-8 text-center space-y-6 relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Center Spinner / Success Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-gold-400/20 animate-ping" />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-[1px]">
            <div className="w-full h-full rounded-full bg-obsidian-950 flex items-center justify-center">
              {isDone ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-scale-up" />
              ) : (
                <Film className="w-7 h-7 text-gold-300 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-xl font-semibold text-white tracking-wide">
            {isDone ? 'Your Personalized Video is Ready' : 'Creating Your Personalized Video'}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {isDone
              ? 'Final master encoded and prepared for download.'
              : 'Our cloud video engine is rendering your personalized template.'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{STAGES[currentStageIdx]?.label}</span>
            <span className="text-gold-300 font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Step Indicator Badges */}
        <div className="grid grid-cols-4 gap-1.5 pt-2">
          {STAGES.map((s, idx) => (
            <div
              key={s.step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx <= currentStageIdx ? 'bg-gold-400' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-400 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => onError?.()}
              className="underline hover:text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
