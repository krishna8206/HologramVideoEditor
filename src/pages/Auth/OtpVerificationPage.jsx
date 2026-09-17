import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, sendOtp } = useAuth();

  const phoneOrEmail = location.state?.phoneOrEmail || 'patron@meridian.io';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendNotice, setResendNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await verifyOtp(phoneOrEmail, code);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      await sendOtp(phoneOrEmail);
      setResendNotice('New OTP dispatched (Demo: 123456)');
      setTimeout(() => setResendNotice(''), 3000);
    } catch (err) {
      setError('Failed to resend code.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-light text-zinc-100 tracking-tight">
            Verify Identity
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
            Enter the 6-digit code sent to <span className="text-amber-400 font-mono">{phoneOrEmail}</span>
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {resendNotice && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{resendNotice}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-14 text-center text-xl font-mono font-bold text-amber-300 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-400 focus:outline-none transition-colors"
                />
              ))}
            </div>

            <p className="text-[11px] text-zinc-500 text-center font-mono">
              Demo Code: <span className="text-amber-400 font-bold">123456</span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-obsidian font-semibold text-xs tracking-wider uppercase shadow-gold-subtle hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Verify & Enter Studio <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleResend}
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Resend Code
              </button>
              <Link to="/login" className="text-zinc-500 hover:text-zinc-300">
                Back to Login
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
