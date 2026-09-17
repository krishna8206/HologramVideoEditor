import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export function VideoPreview({
  template,
  userValues = {},
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Aspect ratio classes
  const getAspectClass = () => {
    if (template?.aspectRatio === '9:16') return 'aspect-[9/16] max-h-[75vh]';
    if (template?.aspectRatio === '16:9') return 'aspect-[16/9] w-full';
    return 'aspect-square max-h-[70vh]';
  };

  // Find editable content values to overlay on top of preview
  const photoVal = Object.entries(userValues).find(([k]) => k.includes('photo'))?.[1];
  const nameVal = Object.entries(userValues).find(([k]) => k.includes('name'))?.[1];
  const curvedVal = Object.entries(userValues).find(([k]) => k.includes('curved'))?.[1];
  const dateVal = Object.entries(userValues).find(([k]) => k.includes('date'))?.[1];

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto rounded-2xl overflow-hidden bg-obsidian-950 border border-white/10 shadow-card-elevated group flex items-center justify-center ${getAspectClass()}`}
    >
      {/* HTML5 Master Base Video */}
      <video
        ref={videoRef}
        src={template?.videoUrl}
        playsInline
        muted={isMuted}
        autoPlay
        loop
        className="w-full h-full object-cover"
      />

      {/* Live Custom Content Overlay (Visualizing user content on the video) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-8 z-20">
        {/* Top Arch / Curved Text or Headline */}
        <div className="text-center pt-2">
          {curvedVal && (
            <span className="font-serif tracking-[0.25em] text-xs sm:text-sm font-semibold text-gold-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] uppercase">
              {curvedVal}
            </span>
          )}
        </div>

        {/* Center Custom Photo Frame (if photo field exists) */}
        {photoVal && (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-gold-glow animate-fade-in overflow-hidden">
            <img
              src={photoVal}
              alt="Personalized Asset"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}

        {/* Bottom Names & Date */}
        <div className="text-center pb-8 space-y-1">
          {nameVal && (
            <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] uppercase">
              {nameVal}
            </h2>
          )}
          {dateVal && (
            <div className="text-xs font-mono tracking-widest text-gold-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {dateVal}
            </div>
          )}
        </div>
      </div>

      {/* Video Transport Controls (Bottom Bar) */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        
        {/* Scrubber Bar */}
        <div
          onClick={handleSeek}
          className="relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer overflow-hidden mb-3 hover:h-2 transition-all"
        >
          <div
            style={{ width: `${progress}%` }}
            className="absolute top-0 bottom-0 left-0 bg-gold-400 rounded-full"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="font-mono text-[11px] text-slate-300">
              {Math.floor(currentTime)}s / {Math.floor(duration || 0)}s
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
