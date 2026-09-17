import React, { useRef, useState } from 'react';
import { 
  Download, 
  Share2, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';

export default function VideoPlayer({ videoData, video, onDownload, onCreateAnother }) {
  const currentVideo = videoData || video;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else if (currentVideo?.videoUrl) {
      const a = document.createElement('a');
      a.href = currentVideo.videoUrl;
      a.download = `${currentVideo.templateName || 'personalized_video'}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto space-y-8">
      {/* Video Viewport */}
      <div className="relative w-full aspect-[9/16] sm:aspect-video max-h-[65vh] rounded-3xl overflow-hidden bg-black border border-gold-500/30 shadow-card-elevated group">
        <video
          ref={videoRef}
          src={currentVideo?.videoUrl}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-contain"
        />

        {/* Floating Custom Content Watermark Overlay */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 text-gold-300 backdrop-blur-md border border-gold-500/20">
            Render Verified • 1080p Master
          </span>
        </div>

        {/* Quick Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-obsidian-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-xs font-mono text-slate-300">
              {videoData?.duration || '0:25'}
            </span>
          </div>

          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.requestFullscreen?.().catch(() => {});
              }
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-obsidian-950 font-semibold text-xs tracking-wider uppercase shadow-gold-subtle hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Video (.MP4)</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase border border-white/10 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied!' : 'Share Video Link'}</span>
        </button>

        <button
          onClick={onCreateAnother}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gold-300 font-medium text-xs tracking-wider uppercase border border-gold-500/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Create Another</span>
        </button>
      </div>
    </div>
  );
}
