import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import { Film, Play, Download, Trash2, Clock, CheckCircle2, AlertCircle, Search, PlusCircle, Sparkles } from 'lucide-react';

export default function MyVideosPage() {
  const { userVideos, deleteVideo } = useTemplates();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = userVideos.filter((video) => {
    const matchesFilter = filterStatus === 'ALL' || video.status.toUpperCase() === filterStatus;
    const matchesSearch =
      video.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Ready
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gold-500/10 border border-gold-500/20 text-gold-400 animate-pulse">
            <Clock className="w-3 h-3" /> Rendering
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-zinc-800/80 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-2 sm:mb-3">
              <Film className="w-3.5 h-3.5" /> Private Media Vault
            </div>
            <h1 className="text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
              My Personalized Videos
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
              Manage, preview, and download your personalized video masters.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] active:scale-95 transition-all self-stretch sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" /> Personalize New Video
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900/60 border border-zinc-800 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
            {['ALL', 'COMPLETED', 'PROCESSING'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-indigo-950/80 text-indigo-300 shadow-sm border border-indigo-500/50 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {status === 'ALL' ? 'All Videos' : status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search your videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Video Vault Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group relative rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_8px_25px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail / Video Preview Frame */}
                <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.templateName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080E] via-transparent to-black/40" />

                  {/* Top Status & Aspect Ratio */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {getStatusBadge(video.status)}
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                      1080p 60FPS
                    </span>
                  </div>

                  {/* Play Overlay */}
                  <Link
                    to={`/generated/${video.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/95 text-zinc-900 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </Link>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-medium">
                        {video.category}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-sans">{video.createdAt}</span>
                    </div>

                    <h3 className="text-base text-white font-medium group-hover:text-indigo-300 transition-colors line-clamp-1 mb-3">
                      {video.templateName}
                    </h3>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-zinc-800/70 flex items-center justify-between gap-3">
                    <Link
                      to={`/generated/${video.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Watch
                    </Link>

                    <div className="flex items-center gap-2">
                      <a
                        href={video.videoUrl}
                        download={`${video.templateName.replace(/\s+/g, '_')}_master.mp4`}
                        className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                        title="Download Video"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="p-2 rounded-lg bg-zinc-800/60 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete from Vault"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/60 max-w-2xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5 text-indigo-400">
              <Film className="w-8 h-8" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">
              {searchQuery || filterStatus !== 'ALL' ? 'No Matching Videos Found' : 'Your Video Vault Is Empty'}
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
              {searchQuery || filterStatus !== 'ALL'
                ? 'Try adjusting your search query or status filter to see other renders.'
                : 'Browse our catalog of cinematic templates and create your first personalized video in seconds.'}
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all"
            >
              <Sparkles className="w-4 h-4" /> Explore Templates
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
