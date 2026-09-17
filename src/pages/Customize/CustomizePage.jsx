import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { templateApi } from '../../services/api';
import { useTemplates } from '../../context/TemplateContext';
import { useAuth } from '../../context/AuthContext';
import ImageTransformControl from '../../components/ImageEditor/ImageTransformControl';
import AdminGovernedTextControl from '../../components/TextInput/AdminGovernedTextControl';
import RenderPipelineModal from '../../components/RenderProgress/RenderPipelineModal';
import CheckoutModal from '../../components/PaymentModal/CheckoutModal';
import {
  ArrowLeft,
  Wand2,
  Sparkles,
  Undo2,
  Redo2,
  RotateCcw,
  Save,
  CheckCircle2,
  ShieldAlert,
  Play,
  Pause,
  Layers,
  Lock,
  Eye,
  AlertCircle
} from 'lucide-react';

export default function CustomizePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isPurchased, triggerRender } = useTemplates();
  const { isAuthenticated, openAuthModal } = useAuth();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Studio Content State
  const [contentValues, setContentValues] = useState({});
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Modals
  const [isTestMode, setIsTestMode] = useState(searchParams.get('mode') === 'test');
  const [renderModalOpen, setRenderModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [renderedVideoId, setRenderedVideoId] = useState(null);

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await templateApi.getTemplateById(id);
        setTemplate(data);

        // Initialize default content values from admin editable fields
        const initial = {};
        data.editableFields.forEach((field) => {
          if (field.type === 'image') {
            initial[field.id] = {
              assetUrl: field.defaultAsset || '',
              zoom: 1,
              rotate: 0,
              posX: 0,
              posY: 0
            };
          } else {
            initial[field.id] = field.defaultValue || '';
          }
        });
        setContentValues(initial);
        setHistory([initial]);
        setHistoryIdx(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const handleFieldChange = (fieldId, value) => {
    const updated = { ...contentValues, [fieldId]: value };
    setContentValues(updated);

    // Push into history stack for Undo/Redo
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(updated);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIdx > 0) {
      const prevIdx = historyIdx - 1;
      setHistoryIdx(prevIdx);
      setContentValues(history[prevIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      setContentValues(history[nextIdx]);
    }
  };

  const handleReset = () => {
    if (history.length > 0) {
      setContentValues(history[0]);
      setHistoryIdx(0);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem(`draft_${id}`, JSON.stringify(contentValues));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2500);
  };

  // Trigger Watermarked Test Preview
  const handleTestPreview = () => {
    setIsTestMode(true);
    setRenderModalOpen(true);
  };

  // Trigger Final Master Generation
  const handleGenerateFinal = () => {
    if (!isAuthenticated) {
      openAuthModal('login', () => handleGenerateFinal());
      return;
    }

    // If template is premium and not yet purchased, trigger checkout modal
    if (template.isPremium && !isPurchased(template.id)) {
      setCheckoutModalOpen(true);
      return;
    }

    // Otherwise proceed to render
    setIsTestMode(false);
    setRenderModalOpen(true);
  };

  const handleRenderFinished = async () => {
    // Record generated video in vault
    const res = await triggerRender({
      templateId: template.id,
      changes: contentValues,
      isTestPreview: isTestMode
    });

    setRenderModalOpen(false);
    if (res.video) {
      navigate(`/generated/${res.video.id}`);
    } else {
      navigate('/my-videos');
    }
  };

  const handlePaymentSuccess = () => {
    setCheckoutModalOpen(false);
    // Directly launch final clean render modal
    setIsTestMode(false);
    setRenderModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-4" />
        <p className="text-zinc-400 text-sm font-light">Preparing Personalization Studio...</p>
      </div>
    );
  }

  if (!template) {
    return null;
  }

  const purchased = isPurchased(template.id);

  // Extract first image field for overlay demonstration
  const firstImageField = template.editableFields.find((f) => f.type === 'image');
  const firstImageVal = firstImageField ? contentValues[firstImageField.id] : null;

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Top Control Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                to={`/templates/${template.id}`}
                className="text-zinc-400 hover:text-indigo-400 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> {template.title}
              </Link>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-indigo-400 font-medium">
                Personalization Studio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl text-white font-semibold tracking-tight">
              Customize Content
            </h1>
          </div>

          {/* Quick Undo/Redo & Draft Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleUndo}
              disabled={historyIdx <= 0}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all"
              title="Undo change"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIdx >= history.length - 1}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all"
              title="Redo change"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
              title="Reset all changes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isDraftSaved ? 'Draft Saved' : 'Save Draft'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* LEFT COLUMN: Real-Time Live Video Composition Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden bg-black border border-indigo-500/20 shadow-card-elevated group">
                {/* Master Template Video Stream */}
                <video
                  src={template.videoUrl}
                  autoPlay
                  loop
                  playsInline
                  muted
                  className="w-full h-full object-contain pointer-events-none"
                />

                {/* Live Custom Image Transformation Simulation Overlay */}
                {firstImageVal?.assetUrl && (
                  <div className="absolute top-8 right-8 z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-2xl pointer-events-none bg-black/40 backdrop-blur-[1px]">
                    <img
                      src={firstImageVal.assetUrl}
                      alt="Personalized overlay"
                      style={{
                        transform: `scale(${firstImageVal.zoom || 1}) rotate(${firstImageVal.rotate || 0}deg) translate(${firstImageVal.posX || 0}px, ${firstImageVal.posY || 0}px)`,
                        transition: 'transform 0.1s ease-out'
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 text-[8px] font-mono uppercase bg-black/70 px-1 py-0.5 rounded text-indigo-300 font-semibold">
                      Live Slot
                    </div>
                  </div>
                )}

                {/* Real-Time Watermark Indicator if in Test Mode */}
                {isTestMode && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="transform -rotate-12 border-4 border-indigo-500/40 bg-black/75 px-8 py-4 rounded-2xl text-center shadow-2xl">
                      <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-indigo-300 uppercase">
                        Watermarked Preview
                      </span>
                      <span className="block text-[10px] font-mono text-zinc-400 mt-1">
                        Full Resolution Unlocked Upon Render
                      </span>
                    </div>
                  </div>
                )}

                {/* Top Badge: Content Live View */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Live Canvas Preview
                  </span>
                </div>
              </div>

              {/* Integrity Notice (Rule 4 & 13) */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-400 leading-relaxed font-light">
                  <span className="text-zinc-200 font-medium">Original Animation Locked:</span> To preserve cinematic audio syncing and 3D motion tracking, core timing and geometry cannot be altered. You are modifying only the approved content slots.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dynamic Personalization Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-base text-white font-semibold">
                    Editable Content Slots
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light">
                    Generated dynamically from template configuration ({template.editableFields.length} slots)
                  </p>
                </div>
                {template.isPremium && (
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    {purchased ? 'Purchased (Active)' : `₹${template.price}`}
                  </span>
                )}
              </div>

              {/* Dynamic Fields List */}
              <div className="space-y-4">
                {template.editableFields.map((field) => {
                  if (field.type === 'image') {
                    return (
                      <ImageTransformControl
                        key={field.id}
                        field={field}
                        value={contentValues[field.id]}
                        onChange={(val) => handleFieldChange(field.id, val)}
                      />
                    );
                  }

                  return (
                    <AdminGovernedTextControl
                      key={field.id}
                      field={field}
                      value={contentValues[field.id]}
                      onChange={(val) => handleFieldChange(field.id, val)}
                    />
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                {/* 1. Final Generation Button */}
                <button
                  type="button"
                  onClick={handleGenerateFinal}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>
                    {template.isPremium && !purchased
                      ? `Continue to Purchase & Render (₹${template.price})`
                      : 'Generate Final Video (1080p / 4K)'}
                  </span>
                </button>

                {/* 2. Free Watermarked Test Preview Button */}
                <button
                  type="button"
                  onClick={handleTestPreview}
                  className="w-full py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-medium text-center transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Test & Watermarked Preview (Free)</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Render Pipeline Progress Modal */}
      <RenderPipelineModal
        isOpen={renderModalOpen}
        isTestPreview={isTestMode}
        templateTitle={template.title}
        onComplete={handleRenderFinished}
        onError={() => setRenderModalOpen(false)}
      />

      {/* Checkout & Payment Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        template={template}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
