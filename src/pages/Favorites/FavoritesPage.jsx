import React from 'react';
import { Link } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import TemplateGrid from '../../components/TemplateGrid/TemplateGrid';
import { Heart, Sparkles, ArrowLeft } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, allTemplates, loading } = useTemplates();
  const favoriteTemplates = allTemplates.filter((t) => favorites.includes(t.id));

  return (
    <div className="min-h-screen py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-400" /> Saved Wishlist
            </div>
            <h1 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight">
              Favorite Templates
            </h1>
            <p className="text-zinc-400 text-sm font-light mt-1">
              Your bookmarked animation templates for upcoming campaigns, celebrations, and releases.
            </p>
          </div>

          <Link
            to="/templates"
            className="text-xs uppercase font-mono tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Catalog
          </Link>
        </div>

        {/* Templates Grid or Empty State */}
        {favoriteTemplates.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/60 max-w-xl mx-auto px-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-sans text-zinc-100 font-semibold">
              Your Wishlist is Empty
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              You haven't saved any animation templates yet. Click the heart icon on any template to bookmark it here for quick access.
            </p>
            <div className="pt-2">
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                <span>Browse Templates</span>
              </Link>
            </div>
          </div>
        ) : (
          <TemplateGrid templates={favoriteTemplates} loading={loading} />
        )}

      </div>
    </div>
  );
}
