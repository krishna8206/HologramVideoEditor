import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, User, KeyRound, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { authModal, closeAuthModal, switchAuthMode, login, register, verifyOtp, forgotPassword } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModal.isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      setSuccessMsg('Account created successfully!');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await verifyOtp(email || 'user', code);
      setSuccessMsg('Identity verified successfully!');
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccessMsg(`Reset instructions sent to ${email}`);
    } catch (err) {
      setError('Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-[3px] animate-fadeIn"
    >
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0d0f17]/95 border border-purple-500/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 p-[1px] mb-3 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            <div className="w-full h-full bg-[#0a0c13] rounded-2xl flex items-center justify-center text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {authModal.mode === 'login' && 'Sign In to AuraVideo'}
            {authModal.mode === 'register' && 'Create Creator Account'}
            {authModal.mode === 'otp' && 'Verify Identity (OTP)'}
            {authModal.mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-zinc-400 font-normal mt-1">
            {authModal.mode === 'login' && 'Access your personalized animation vault and high-res masters.'}
            {authModal.mode === 'register' && 'Personalize, render, and download cinema-grade video templates.'}
            {authModal.mode === 'otp' && 'Enter the 6-digit code sent to your email or phone.'}
            {authModal.mode === 'forgot' && 'Enter your registered email to receive access credentials.'}
          </p>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {authModal.mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="creator@auravideo.io"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => switchAuthMode('forgot')}
                  className="text-[10px] text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Forgot key?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Pre-fill */}
            <div className="pt-3 border-t border-zinc-800/80 text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('patron@meridian.io');
                  setPassword('password123');
                }}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-mono underline underline-offset-4 decoration-purple-500/30"
              >
                Instant Fill Demo Creator Account
              </button>
            </div>

            <div className="text-center text-xs text-zinc-400 pt-2">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => switchAuthMode('register')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Sign up
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {authModal.mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Eleanor Vance"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="creator@auravideo.io"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-xs text-zinc-400 pt-2">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => switchAuthMode('login')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* 3. OTP VERIFICATION FORM */}
        {authModal.mode === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="flex justify-center gap-2.5 my-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-mono font-bold text-purple-300 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                />
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 text-center font-mono">
              Demo Code: <span className="text-purple-400 font-bold">123456</span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Verify Code
            </button>

            <div className="text-center text-xs text-zinc-400">
              <button
                type="button"
                onClick={() => switchAuthMode('login')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* 4. FORGOT PASSWORD FORM */}
        {authModal.mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5 font-medium">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="creator@auravideo.io"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Send Reset Link
            </button>

            <div className="text-center text-xs text-zinc-400">
              <button
                type="button"
                onClick={() => switchAuthMode('login')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Return to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
