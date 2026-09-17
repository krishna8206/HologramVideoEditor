import React, { useState } from 'react';
import { purchaseApi } from '../../services/api';
import { useTemplates } from '../../context/TemplateContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  template,
  onPaymentSuccess
}) {
  if (!isOpen || !template) return null;

  const { recordPurchase } = useTemplates();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Price calculations
  const basePrice = template.price || 499;
  const gstAmount = Math.round(basePrice * 0.18);
  const totalAmount = basePrice + gstAmount;

  const handlePay = async () => {
    setError('');
    setLoading(true);
    try {
      // 1. Create order
      const order = await purchaseApi.createPurchaseOrder(template.id);
      // 2. Simulate gateway verification
      const verifyRes = await purchaseApi.verifyPayment(order.orderId, {
        templateId: template.id,
        paymentMethod: selectedMethod === 'upi' ? 'UPI • Instant QR' : 'Credit Card (Visa/Mastercard)',
        amount: totalAmount
      });

      recordPurchase(verifyRes.purchase);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(verifyRes.purchase);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px] animate-fadeIn"
    >
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#11131C]/95 border border-zinc-700/60 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold tracking-tight">
              Secure Template Checkout
            </h3>
            <p className="text-xs text-zinc-400">
              One-Time Purchase • Commercial Export Rights
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-12 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-2xl text-white font-semibold">Payment Verified</h4>
            <p className="text-xs text-zinc-400">
              Your license for <span className="text-indigo-300 font-medium">{template.title}</span> is now active.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              Unlocking Final Clean Master Render...
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Summary Item */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase font-mono text-indigo-400 tracking-wider font-semibold">
                  {template.categoryName} Master
                </div>
                <h4 className="text-sm text-zinc-100 font-medium truncate">
                  {template.title}
                </h4>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">
                  1080p/4K 60FPS • Clean Export
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-base font-bold text-indigo-400">
                  ₹{basePrice}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Template License Fee</span>
                <span>₹{basePrice}.00</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>GST (18%)</span>
                <span>₹{gstAmount}.00</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between text-zinc-100 text-sm font-bold">
                <span>Total Payable</span>
                <span className="text-indigo-400">₹{totalAmount}.00</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-2 font-medium">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedMethod === 'upi'
                      ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200 shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-xs font-medium">UPI / QR Code</div>
                    <div className="text-[10px] text-zinc-500">Google Pay, PhonePe, Paytm</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedMethod === 'card'
                      ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200 shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-xs font-medium">Credit / Debit Card</div>
                    <div className="text-[10px] text-zinc-500">Visa, Mastercard, RuPay</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handlePay}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Pay ₹{totalAmount} & Unlock Master</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bank Grade 256-Bit SSL Encryption • Instant Access</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
