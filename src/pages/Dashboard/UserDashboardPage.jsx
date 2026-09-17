import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTemplates } from '../../context/TemplateContext';
import TemplateCard from '../../components/TemplateCard/TemplateCard';
import {
  Film,
  ShoppingBag,
  Heart,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  PlusCircle,
  Play,
  Download,
  Calendar
} from 'lucide-react';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const {
    userVideos,
    purchases,
    favorites,
    recentlyViewedIds,
    allTemplates
  } = useTemplates();

  // Resolved templates for favorites & recently viewed
  const favoriteTemplates = allTemplates.filter((t) => favorites.includes(t.id));
  const recentlyViewedTemplates = allTemplates.filter((t) => recentlyViewedIds.includes(t.id)).slice(0, 3);

  return (
    <div className="min-h-screen py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Creator Command Center
            </div>
            <h1 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight">
              Welcome back, {user?.name || 'Creator'}
            </h1>
            <p className="text-zinc-400 text-sm font-light mt-1">
              Review your customized animation outputs, purchased template licenses, and saved favorites.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:opacity-90 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" /> Personalize New Video
          </Link>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Film className="w-5 h-5" />
            </div>
            <div className="text-2xl font-mono font-bold text-zinc-100">{userVideos.length}</div>
            <div className="text-xs text-zinc-400 mt-1">Total Generated Videos</div>
            <Link to="/my-videos" className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono mt-3">
              Open Vault <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-2xl font-mono font-bold text-zinc-100">{purchases.length}</div>
            <div className="text-xs text-zinc-400 mt-1">Purchased Licenses</div>
            <Link to="/my-purchases" className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono mt-3">
              View Invoices <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-2xl font-mono font-bold text-zinc-100">{favorites.length}</div>
            <div className="text-xs text-zinc-400 mt-1">Saved Wishlist</div>
            <Link to="/favorites" className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono mt-3">
              Browse Saved <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl font-mono font-bold text-zinc-100">{recentlyViewedIds.length}</div>
            <div className="text-xs text-zinc-400 mt-1">Recently Viewed</div>
            <Link to="/templates" className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono mt-3">
              Explore More <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Section: Recent Videos Vault */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-semibold">
                Latest Outputs
              </span>
              <h2 className="text-xl text-zinc-100 font-semibold mt-0.5 tracking-tight">
                Recent Generated Videos
              </h2>
            </div>
            <Link
              to="/my-videos"
              className="text-xs uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              View all ({userVideos.length}) →
            </Link>
          </div>

          {userVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userVideos.slice(0, 2).map((vid) => (
                <div
                  key={vid.id}
                  className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4"
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.templateName}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-indigo-400 font-medium">
                      {vid.category}
                    </span>
                    <h4 className="text-base text-zinc-100 font-medium truncate mt-0.5">
                      {vid.templateName}
                    </h4>
                    <div className="text-xs text-zinc-400 font-mono mt-1">
                      Rendered: {vid.createdAt}
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <Link
                        to={`/generated/${vid.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Watch
                      </Link>
                      <a
                        href={vid.videoUrl}
                        download
                        className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/60">
              <p className="text-xs text-zinc-400">No videos generated yet.</p>
            </div>
          )}
        </div>

        {/* Section: Recently Viewed Templates */}
        {recentlyViewedTemplates.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-semibold">
                  Browsing History
                </span>
                <h2 className="text-xl text-zinc-100 font-semibold mt-0.5 tracking-tight">
                  Recently Viewed Templates
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewedTemplates.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
