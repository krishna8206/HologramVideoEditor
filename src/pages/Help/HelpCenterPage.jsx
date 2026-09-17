import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../utils/mockData';
import { HelpCircle, ChevronDown, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const STEPS = [
    { num: '01', title: 'Select a Template', desc: 'Browse our curated collection across 15+ industries and preview the high-definition master video.' },
    { num: '02', title: 'Personalize Content', desc: 'Upload your photos or logos and fine-tune cropping, zoom, rotation, and position within the predefined frame.' },
    { num: '03', title: 'Test Watermarked Preview', desc: 'Generate an instant free preview with watermark to verify your visual framing before any commitment.' },
    { num: '04', title: 'Unlock via Single Purchase', desc: 'For premium templates, pay the one-time license fee via UPI or card. Zero recurring subscriptions.' },
    { num: '05', title: 'Cloud Render & Download', desc: 'Our cluster renders a clean 60 FPS master in 1080p or 4K. Download your MP4 anytime from My Videos.' }
  ];

  return (
    <div className="min-h-screen py-6 sm:py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-1">
            <HelpCircle className="w-3.5 h-3.5" /> Support & Knowledge Base
          </div>
          <h1 className="text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
            Help Center & How It Works
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto">
            Everything you need to know about personalizing video templates, individual licensing, and export specifications.
          </p>
        </div>

        {/* How It Works Workflow Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-xl sm:text-2xl text-white font-bold tracking-tight">
              How The Studio Works
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-5 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 hover:shadow-[0_8px_25px_rgba(99,102,241,0.15)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-sm text-white font-semibold group-hover:text-indigo-300 transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-xl sm:text-2xl text-white font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-400">Quick answers to common questions about our platform</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-zinc-200 hover:text-indigo-300 transition-colors"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-indigo-400 shrink-0 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3 font-light animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div id="contact" className="p-5 sm:p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/30 transition-all max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl text-white font-bold tracking-tight">
                Contact Studio Support
              </h3>
              <p className="text-xs text-zinc-400">
                Have a custom template request or technical inquiry? Send us a message.
              </p>
            </div>
          </div>

          {contactSubmitted ? (
            <div className="py-8 text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Message Received</h4>
              <p className="text-xs text-zinc-400">Our concierge support team will respond to your registered email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Alexander Wright"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="creator@hologram.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-semibold">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Template licensing / Custom render query"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-semibold">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your question in detail..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 self-stretch sm:self-auto w-full sm:w-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
