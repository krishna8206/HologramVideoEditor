import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../utils/mockData';
import { HelpCircle, ChevronDown, Send, CheckCircle2, MessageSquare, ShieldCheck, Sparkles, Mail, FileText } from 'lucide-react';

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
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Support & Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-zinc-100 font-light">
            Help Center & How It Works
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            Everything you need to know about personalizing video templates, individual licensing, and export specifications.
          </p>
        </div>

        {/* How It Works Workflow Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-zinc-100 font-light text-center">
            How The Studio Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xl font-bold text-amber-400 mb-3">{step.num}</div>
                  <h3 className="font-serif text-sm text-zinc-100 font-medium mb-1.5">{step.title}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-serif text-zinc-100 font-light">Frequently Asked Questions</h2>
            <p className="text-xs text-zinc-400">Quick answers to common questions about our platform</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-zinc-900/40 border border-zinc-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-serif text-zinc-200 hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3 font-light animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div id="contact" className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-zinc-100 font-light">Contact Studio Support</h3>
              <p className="text-xs text-zinc-400">Have a custom template request or technical inquiry? Send us a message.</p>
            </div>
          </div>

          {contactSubmitted ? (
            <div className="py-8 text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-serif text-zinc-100">Message Received</h4>
              <p className="text-xs text-zinc-400">Our concierge support team will respond to your registered email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Alexander Wright"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="patron@meridian.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Template licensing / Custom render query"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/60"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your question in detail..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/60"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-obsidian font-semibold text-xs uppercase tracking-wider shadow-gold-subtle hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
