import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import { Play, Heart, Clock, Wand2, Star } from 'lucide-react';

export default function TemplateCard({ template }) {
  const { toggleFavorite, isFavorite } = useTemplates();
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(template.thumbnail);
  const videoRef = useRef(null);

  const favorited = isFavorite(template.id);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleImgError = () => {
    setImgSrc('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop');
  };

  // Dynamic aspect ratio based on template video orientation (1:1 square, 9:16 portrait, 16:9 landscape)
  const getOrientationInfo = (orientation) => {
    const norm = (orientation || '').toLowerCase().trim();
    if (norm === '1:1' || norm === 'square') {
      return {
        aspectRatio: '1 / 1',
        label: '1:1 Square',
        dot: 'bg-emerald-400/90'
      };
    }
    if (norm === '9:16' || norm === 'portrait' || norm === 'vertical' || norm === 'story') {
      return {
        aspectRatio: '9 / 16',
        label: '9:16 Portrait',
        dot: 'bg-purple-400/90'
      };
    }
    return {
      aspectRatio: '16 / 9',
      label: '16:9 Landscape',
      dot: 'bg-blue-400/90'
    };
  };

  const orientationInfo = getOrientationInfo(template.orientation);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-xl bg-[#0D0F18] border border-white/[0.08] hover:border-purple-500/40 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full"
    >
      {/* 1. DYNAMIC MEDIA VIEWPORT (Square 1:1, Portrait 9:16, or Landscape 16:9) */}
      <div 
        style={{ aspectRatio: orientationInfo.aspectRatio }}
        className="relative w-full bg-zinc-950 overflow-hidden select-none"
      >
        
        {/* Still Poster */}
        <img
          src={imgSrc}
          alt={template.title}
          onError={handleImgError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Video Preview on Hover */}
        <video
          ref={videoRef}
          src={template.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Top-Left: Minimalist Price / Free Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {template.isPremium ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold shadow-sm">
              ₹{template.price}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
              FREE
            </span>
          )}
        </div>

        {/* Top-Right: Sleek Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(template.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
          title={favorited ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              favorited ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>

        {/* Bottom-Right: Duration Tag */}
        <div className="absolute bottom-2 right-2.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-200">
            <Clock className="w-2.5 h-2.5 text-purple-400" />
            {template.duration}
          </span>
        </div>

        {/* Centered Play Trigger on Hover */}
        <Link
          to={`/templates/${template.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-black/35 backdrop-blur-[1px]"
        >
          <div className="w-10 h-10 rounded-full bg-white text-zinc-950 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all shadow-lg">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </Link>
      </div>

      {/* 2. CARD BODY (Compact Clean Studio Minimalist - Hugs Content) */}
      <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 bg-[#0D0F18]">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400 mb-1">
            <span className="text-purple-400 font-medium truncate uppercase tracking-wider text-[10px]">
              {template.categoryName}
            </span>
            <span className="flex items-center gap-1 text-amber-400/90 font-medium text-[11px] shrink-0">
              <Star className="w-3 h-3 fill-current text-amber-400" />
              <span>{template.rating || '4.9'}</span>
            </span>
          </div>

          {/* Title */}
          <Link to={`/templates/${template.id}`}>
            <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1 tracking-tight">
              {template.title}
            </h4>
          </Link>
        </div>

        {/* Bottom Action Bar: Orientation + Customize Button */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <span className={`w-1.5 h-1.5 rounded-full ${orientationInfo.dot}`} />
            {orientationInfo.label}
          </span>

          <Link
            to={`/templates/${template.id}/customize`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-medium shadow-sm hover:shadow-[0_2px_12px_rgba(168,85,247,0.35)] transition-all"
          >
            <Wand2 className="w-3 h-3" />
            <span>Customize</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
