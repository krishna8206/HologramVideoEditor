import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, template }) {
  if (!isOpen || !template) return null;

  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/templates/${template.id}`;
  const shareTitle = `Watch & Personalize "${template.title}" on AuraVideo`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.944.829 2.796.829h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.377 8.219c-.145.406-.848.777-1.182.825-.333.048-.769.071-2.457-.629-1.996-.826-3.265-2.859-3.365-2.993-.099-.133-.807-1.074-.807-2.049 0-.974.511-1.453.693-1.652.181-.199.397-.249.529-.249.133 0 .265.001.381.007.123.006.287-.047.45.344.167.398.572 1.393.622 1.493.05.1.083.216.017.348-.066.133-.1.216-.199.332-.099.116-.208.26-.297.35-.1.1-.205.209-.089.408.116.199.516.852 1.109 1.381.764.681 1.408.892 1.607.992.199.1.315.083.431-.05.116-.133.497-.58.629-.779.133-.199.265-.166.447-.1.182.066 1.157.546 1.356.645.199.1.332.149.381.232.05.083.05.481-.095.887z" />
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      color: 'bg-zinc-800/60 text-zinc-200 border-zinc-700/50 hover:bg-zinc-800',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      color: 'bg-blue-600/20 text-blue-400 border-blue-500/30 hover:bg-blue-600/30',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.582 9 4.615V8z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-600/30',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      )
    }
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-[2px] animate-fadeIn"
    >
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#11131C]/95 border border-zinc-700/60 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-zinc-100">Share Template</h3>
            <p className="text-xs text-zinc-400 line-clamp-1">{template.title}</p>
          </div>
        </div>

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all ${item.color}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </div>

        {/* Copy Link Field */}
        <div>
          <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">
            Direct Shareable URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-obsidian font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-all shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
