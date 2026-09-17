import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { templateApi } from '../../services/api';
import { useTemplates } from '../../context/TemplateContext';
import { useAuth } from '../../context/AuthContext';
import ShareModal from '../../components/ShareModal/ShareModal';
import TemplateCard from '../../components/TemplateCard/TemplateCard';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  Sparkles,
  Heart,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Download,
  Wand2,
  Tag,
  ArrowLeft,
  Layers,
  Film
} from 'lucide-react';

export default function TemplateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, trackRecentlyViewed } = useTemplates();
  const { isAuthenticated, openAuthModal } = useAuth();

  const [template, setTemplate] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Video Controls State
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await templateApi.getTemplateById(id);
        setTemplate(data);
        trackRecentlyViewed(id);
        const relatedData = await templateApi.getRelatedTemplates(id, data.category);
        setRelated(relatedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin mb-4" />
        <p className="text-zinc-400 text-sm font-light">Loading template master...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="text-2xl text-white font-semibold mb-3">Template Not Found</h2>
        <p className="text-zinc-400 text-sm mb-6">The requested template could not be located in our catalog.</p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Templates
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(template.id);

  return (
    <div className="min-h-screen py-6 sm:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-8">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>

          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span className="text-indigo-400/90 font-medium">{template.categoryName}</span>
            <span>/</span>
            <span>{template.subcategoryName}</span>
          </div>
        </div>

        {/* 2-Column Hero: Video Preview + Details & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 mb-10 sm:mb-16">
          
          {/* Left Column: Large Video Player Viewport */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-indigo-500/20 shadow-2xl group max-h-[60vh] sm:max-h-[70vh]">
              <video
                ref={videoRef}
                src={template.videoUrl}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-contain"
              />

              {/* Watermark Notice Overlay Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-indigo-300 border border-indigo-400/30">
                  Original Master Preview
                </span>
              </div>

              {/* Floating Bottom Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.requestFullscreen?.().catch(() => {});
                      }
                    }}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Specs Bar Below Video */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-center text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Duration</span>
                <span className="font-mono text-zinc-200 font-medium">{template.duration}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Resolution</span>
                <span className="font-mono text-zinc-200 font-medium">{template.resolution}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Aspect Ratio</span>
                <span className="font-mono text-zinc-200 font-medium">{template.orientation}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Template Title, Pricing & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  {template.isPremium ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 text-white uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" /> Premium Template
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white uppercase tracking-wider">
                      Free Template
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-zinc-400">
                    ★ {template.rating} rating
                  </span>
                </div>

                {/* Social Share & Favorite Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                    title="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                    title="Share template"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Price */}
              <h1 className="text-2xl sm:text-3xl text-white font-semibold tracking-tight mb-3">
                {template.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-mono font-bold text-indigo-400">
                  {template.isPremium ? `₹${template.price}` : 'Free'}
                </span>
                {template.isPremium && (
                  <span className="text-xs text-zinc-500 font-mono">one-time personal / commercial license</span>
                )}
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {template.description}
              </p>

              {/* Features List */}
              <div className="mb-6 space-y-2">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-zinc-300 font-semibold">
                  Included Master Features
                </h4>
                <ul className="space-y-1.5">
                  {template.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Editable Fields Summary */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 mb-6">
                <h4 className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 mb-2.5 flex items-center gap-1.5 font-semibold">
                  <Layers className="w-3.5 h-3.5" /> Admin-Configured Editable Slots ({template.editableFields.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {template.editableFields.map((field) => (
                    <span
                      key={field.id}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 font-mono"
                    >
                      {field.label} ({field.type.toUpperCase()})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800/80">
              <Link
                to={`/templates/${template.id}/customize`}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Customize This Video</span>
              </Link>

              <Link
                to={`/templates/${template.id}/customize?mode=test`}
                className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-medium text-center transition-colors block"
              >
                Test & Watermarked Preview (Zero Cost)
              </Link>
            </div>
          </div>

        </div>

        {/* Keywords Tags */}
        <div className="pb-12 border-b border-zinc-800/60 mb-14">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-500 font-mono mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-zinc-500" /> Keywords:
            </span>
            {template.keywords.map((kw) => (
              <Link
                key={kw}
                to={`/templates?query=${encodeURIComponent(kw)}`}
                className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 text-xs text-zinc-400 hover:text-indigo-300 transition-colors font-mono"
              >
                #{kw}
              </Link>
            ))}
          </div>
        </div>

        {/* Related Templates Section */}
        {related.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  Similar Aesthetics
                </span>
                <h2 className="text-xl text-zinc-100 font-semibold mt-0.5 tracking-tight">
                  Related {template.categoryName} Animations
                </h2>
              </div>
              <Link
                to={`/templates?category=${template.category}`}
                className="text-xs uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <TemplateCard key={rel.id} template={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Social Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        template={template}
      />
    </div>
  );
}
