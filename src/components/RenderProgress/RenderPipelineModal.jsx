import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Film, AlertTriangle, ShieldCheck, Download, ArrowRight, Play } from 'lucide-react';

export default function RenderPipelineModal({
  isOpen,
  isTestPreview = false,
  templateTitle = 'Personalized Animation Master',
  onComplete,
  onError
}) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(10);
  const [isDone, setIsDone] = useState(false);

  const STEPS = [
    { title: 'Preparing Template', desc: 'Loading motion layers and audio stems...' },
    { title: 'Applying Content', desc: 'Injecting customized photos, logos, and typography...' },
    { title: 'Hardware Encoding', desc: isTestPreview ? 'Generating watermarked preview stream...' : 'Rendering 60 FPS ProRes / H.264 master frames...' },
    { title: 'Finishing Composition', desc: 'Synthesizing final high-bitrate MP4 container...' }
  ];

  useEffect(() => {
    // Step progression simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          setIsDone(true);
          // Trigger celebration confetti
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch {}
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next >= 75) setCurrentStep(3);
        else if (next >= 50) setCurrentStep(2);
        else if (next >= 25) setCurrentStep(1);
        return Math.min(next, 98);
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px] animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#11131C]/95 border border-zinc-700/60 shadow-2xl text-center">
        
        {/* Top Status Icon */}
        <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(99,102,241,0.25)]">
          {isDone ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
          ) : (
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
          )}
        </div>

        {/* Header Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono uppercase tracking-wider mb-2">
          {isTestPreview ? 'Watermarked Test Pipeline' : 'Cinema Cloud Rendering Engine'}
        </div>

        <h3 className="text-2xl text-white font-semibold tracking-tight mb-2">
          {isDone ? 'Your Personalized Video is Ready' : 'Rendering Your Video'}
        </h3>

        <p className="text-zinc-400 text-xs font-light max-w-md mx-auto mb-6">
          {isDone
            ? `Your personalized edition of "${templateTitle}" has completed cloud compositing.`
            : 'Please hold while our server transforms your content into a high-framerate motion sequence.'}
        </p>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>{STEPS[currentStep].title}</span>
            <span className="text-indigo-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-500 font-mono text-left">
            {STEPS[currentStep].desc}
          </p>
        </div>

        {/* 4 Pipeline Stages Indicators */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl text-center border transition-all ${
                idx <= currentStep
                  ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-600'
              }`}
            >
              <div className="text-[9px] font-mono uppercase">0{idx + 1}</div>
              <div className="text-[10px] font-medium truncate">{step.title.split(' ')[0]}</div>
            </div>
          ))}
        </div>

        {/* Action Button after complete */}
        {isDone && (
          <div className="flex items-center gap-3 animate-fadeIn">
            <button
              onClick={onComplete}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Preview & Download Master</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
