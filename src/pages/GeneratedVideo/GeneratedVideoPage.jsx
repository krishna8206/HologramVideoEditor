import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { Sparkles, ArrowLeft, PlusCircle, CheckCircle2, AlertTriangle, Layers, Clock, ShieldCheck, Film } from 'lucide-react';

export default function GeneratedVideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userVideos, templates } = useTemplates();
  const [videoRecord, setVideoRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Look up in user generated videos vault
    const found = userVideos.find((v) => v.id === id);
    if (found) {
      setVideoRecord(found);
    } else {
      // Check fallback if someone navigated directly with an ID
      const fallback = userVideos[0] || null;
      setVideoRecord(fallback);
    }
    setLoading(false);
  }, [id, userVideos]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-gold-500/20 border-t-gold-500 animate-spin mb-4" />
        <p className="text-zinc-400 font-sans text-sm">Retrieving your rendered video...</p>
      </div>
    );
  }

  if (!videoRecord) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-light text-zinc-100 mb-3">Video Not Found</h2>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          The requested video session may have expired or is unavailable in your current session vault.
        </p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-obsidian font-semibold text-xs tracking-wider uppercase hover:shadow-gold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Templates
        </Link>
      </div>
    );
  }

  // Find underlying template for metadata reference
  const template = templates.find((t) => t.id === videoRecord.templateId) || {
    name: videoRecord.templateName || 'Custom Video',
    category: videoRecord.category || 'Celebration',
    aspectRatio: '9:16',
    duration: '0:15',
    resolution: '1080x1920 (FHD)'
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>
          <Link
            to="/my-videos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Film className="w-4 h-4 text-gold-500" /> View in My Videos
          </Link>
        </div>

        {/* Success Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Personalized Master Rendered
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4 tracking-tight">
            Your Video Is Ready
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Your custom content has been composited into <span className="text-gold-400 font-normal">{videoRecord.templateName}</span>. Stream the full preview below or download the production MP4 master.
          </p>
        </div>

        {/* Video Player Section */}
        <div className="mb-14">
          <VideoPlayer video={videoRecord} template={template} />
        </div>

        {/* Summary Card & Applied Content Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3 text-gold-400">
              <Layers className="w-5 h-5" />
              <h3 className="font-serif text-sm tracking-wide text-zinc-200">Template Specifications</h3>
            </div>
            <dl className="space-y-2 text-xs font-sans">
              <div className="flex justify-between py-1 border-b border-zinc-800/40">
                <dt className="text-zinc-500">Master Template</dt>
                <dd className="text-zinc-300 font-medium">{videoRecord.templateName}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/40">
                <dt className="text-zinc-500">Aspect Ratio</dt>
                <dd className="text-zinc-300 font-mono">{template.aspectRatio}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/40">
                <dt className="text-zinc-500">Resolution</dt>
                <dd className="text-zinc-300 font-mono">{template.resolution || '1080x1920'}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-zinc-500">Codec & Quality</dt>
                <dd className="text-emerald-400 font-mono">H.264 / 60 FPS</dd>
              </div>
            </dl>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3 text-gold-400">
              <Clock className="w-5 h-5" />
              <h3 className="font-serif text-sm tracking-wide text-zinc-200">Render Pipeline</h3>
            </div>
            <dl className="space-y-2 text-xs font-sans">
              <div className="flex justify-between py-1 border-b border-zinc-800/40">
                <dt className="text-zinc-500">Render ID</dt>
                <dd className="text-zinc-400 font-mono text-[11px]">{videoRecord.id}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/40">
                <dt className="text-zinc-500">Completion Time</dt>
                <dd className="text-zinc-300">{videoRecord.createdAt}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/40">
                <dt className="text-zinc-500">Compute Stage</dt>
                <dd className="text-emerald-400 font-medium">100% Completed</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-zinc-500">Watermark</dt>
                <dd className="text-gold-400 font-medium">None (VIP Tier)</dd>
              </div>
            </dl>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3 text-gold-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-serif text-sm tracking-wide text-zinc-200">Content Integrity</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Geometry, animations, and typography remain strictly locked to the master cinema template. Your personalized content was inserted without visual distortion.
              </p>
            </div>
            <Link
              to={`/templates/${videoRecord.templateId}/customize`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-zinc-700 hover:border-gold-500/50 bg-zinc-800/50 hover:bg-zinc-800 text-xs font-medium text-zinc-200 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-gold-400" /> Re-personalize This Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
