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
    <div className="min-h-screen py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-3">
              <ShoppingBag className="w-3.5 h-3.5" /> Template Licenses Vault
            </div>
            <h1 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight">
              My Purchases
            </h1>
            <p className="text-zinc-400 text-sm font-light mt-1">
              Your purchased template licenses, transaction receipts, and rendering access.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:opacity-90 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" /> Browse New Templates
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search purchases or TXN ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Total Purchased: <span className="text-indigo-400 font-bold">{purchases.length} Templates</span>
          </div>
        </div>

        {/* Purchases Inventory List */}
        {filteredPurchases.length > 0 ? (
          <div className="space-y-4">
            {filteredPurchases.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-5 min-w-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.templateTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-medium">
                        {item.categoryName}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Lifetime License
                      </span>
                    </div>

                    <h3 className="text-lg text-white font-medium truncate">
                      {item.templateTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {item.purchaseDate}
                      </span>
                      <span>•</span>
                      <span>Ref: {item.transactionId}</span>
                      <span>•</span>
                      <span>{item.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800">
                  <div className="text-left md:text-right min-w-[100px]">
                    <div className="text-xl font-mono font-bold text-indigo-400">
                      {item.currency}{item.amount}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Paid & Verified</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleDownloadInvoice(item)}
                      className="p-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 transition-colors"
                      title="Download Tax Invoice Receipt"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>

                    <Link
                      to={`/templates/${item.templateId}/customize`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:opacity-90 transition-all"
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
