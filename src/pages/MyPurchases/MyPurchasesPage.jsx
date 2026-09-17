import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTemplates } from '../../context/TemplateContext';
import {
  ShoppingBag,
  Search,
  Download,
  Calendar,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  Wand2,
  PlusCircle,
  Receipt,
  FileText
} from 'lucide-react';

export default function MyPurchasesPage() {
  const { purchases } = useTemplates();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPurchases = purchases.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.templateTitle.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q) ||
      item.transactionId.toLowerCase().includes(q)
    );
  });

  const handleDownloadInvoice = (purchase) => {
    alert(`Downloading Official Invoice Receipt: ${purchase.transactionId}.pdf`);
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-zinc-800 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-2 sm:mb-3">
              <ShoppingBag className="w-3.5 h-3.5" /> Template Licenses Vault
            </div>
            <h1 className="text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
              My Purchases
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1 max-w-xl">
              Your purchased template licenses, transaction receipts, and rendering access.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_16px_rgba(168,85,247,0.35)] active:scale-95 transition-all self-stretch sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" /> Browse New Templates
          </Link>
        </div>

        {/* Search Bar & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search purchases or TXN ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="text-xs font-mono text-zinc-400 flex items-center justify-between sm:justify-end">
            <span>Total Purchased:</span>
            <span className="text-purple-400 font-bold ml-1.5">{purchases.length} Templates</span>
          </div>
        </div>

        {/* Purchases Inventory List */}
        {filteredPurchases.length > 0 ? (
          <div className="space-y-3.5 sm:space-y-4">
            {filteredPurchases.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 shadow-sm"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0 aspect-square">
                    <img
                      src={item.thumbnail}
                      alt={item.templateTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-semibold px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                        {item.categoryName}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3" /> Lifetime License
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-lg text-white font-bold tracking-tight line-clamp-2 leading-snug break-words">
                      {item.templateTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400 font-mono pt-0.5">
                      <span className="inline-flex items-center gap-1 text-zinc-300 bg-zinc-800/60 px-2 py-0.5 rounded-md border border-zinc-700/30 shrink-0">
                        <Calendar className="w-3 h-3 text-purple-400 shrink-0" />
                        {item.purchaseDate}
                      </span>
                      <span className="inline-flex items-center gap-1 text-zinc-400 bg-zinc-800/40 px-2 py-0.5 rounded-md border border-zinc-700/30 truncate max-w-[180px] sm:max-w-none" title={item.transactionId}>
                        <span className="text-zinc-500">Ref:</span>
                        <span className="text-zinc-300 truncate">{item.transactionId}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-zinc-400 bg-zinc-800/40 px-2 py-0.5 rounded-md border border-zinc-700/30 shrink-0">
                        <CreditCard className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{item.paymentMethod}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:justify-end gap-3 sm:gap-5 w-full md:w-auto pt-3.5 sm:pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800/80 shrink-0">
                  <div className="flex sm:flex-col items-center sm:items-start md:items-end justify-between sm:justify-start gap-1">
                    <div className="text-xl sm:text-2xl font-mono font-extrabold text-purple-300">
                      {item.currency}{item.amount}
                    </div>
                    <span className="text-[10px] font-mono font-medium text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Paid & Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleDownloadInvoice(item)}
                      className="p-2.5 sm:p-3 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.06] transition-all shrink-0 active:scale-95 flex items-center justify-center"
                      title="Download Tax Invoice Receipt"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>

                    <Link
                      to={`/templates/${item.templateId}/customize`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_22px_rgba(168,85,247,0.5)] active:scale-95 transition-all whitespace-nowrap"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Customize & Render</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/60 max-w-xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5 text-indigo-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">
              No Purchases Found
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
              You have not purchased any premium animation templates yet. Browse our catalog and unlock individual templates as needed.
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-semibold text-xs uppercase tracking-wider shadow-sm"
            >
              Explore Templates
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
