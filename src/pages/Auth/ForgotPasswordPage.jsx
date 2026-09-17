import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, KeyRound, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await forgotPassword(email);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-light text-zinc-100 tracking-tight">
            Reset Password
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
            Enter your account email to receive credential reset instructions.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-4 py-4 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-lg text-zinc-100">Instructions Sent</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We have dispatched password recovery instructions to <span className="text-amber-400 font-mono">{email}</span>.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 pt-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="patron@meridian.io"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-obsidian font-semibold text-xs tracking-wider uppercase shadow-gold-subtle hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Send Reset Instructions <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-zinc-400 hover:text-zinc-200">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
