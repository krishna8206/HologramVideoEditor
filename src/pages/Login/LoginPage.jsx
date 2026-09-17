import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('patron@meridian.io');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/templates';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please verify your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold-gradient p-[1px] mb-4 shadow-gold">
            <div className="w-full h-full bg-obsidian rounded-2xl flex items-center justify-center text-gold-400 font-serif text-xl font-bold">
              A
            </div>
          </div>
          <h1 className="text-3xl font-serif font-light text-zinc-100 tracking-tight">
            Welcome to Hologram
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
            Access your private salon and personalize cinema-grade videos
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="patron@meridian.io"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-gold-400/80 hover:text-gold-300 transition-colors">
                  Forgot key?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-xl bg-gold-gradient text-obsidian font-semibold text-xs tracking-wider uppercase shadow-gold hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Quick-Fill */}
          <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
            <p className="text-[11px] text-zinc-500 mb-2">Instant Demo Access</p>
            <button
              type="button"
              onClick={() => {
                setEmail('patron@meridian.io');
                setPassword('password123');
              }}
              className="text-xs text-gold-400/90 hover:text-gold-300 font-mono tracking-wide underline underline-offset-4 decoration-gold-500/30"
            >
              Prefill VIP Patron Account
            </button>
          </div>
        </div>

        {/* Signup Redirect */}
        <p className="text-center text-xs text-zinc-400 mt-6">
          Don't have an invitation?{' '}
          <Link to="/signup" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
            Request an account
          </Link>
        </p>
      </div>
    </div>
  );
}
