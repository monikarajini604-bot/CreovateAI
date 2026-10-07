import React, { useState, useEffect } from 'react';
import {
  LogIn,
  X,
  Mail,
  Lock,
  AlertCircle,
  Sparkles,
  UserCheck,
  Building2,
  User,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

/**
 * LoginModal Component
 *
 * Allows users to sign in with their email and password.
 */
export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenCreateAccount,
  defaultEmail = ''
}) {
  const [email, setEmail] = useState(defaultEmail || '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
    if (isOpen) {
      setErrorMessage('');
    }
  }, [defaultEmail, isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e?.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.login(email.trim(), password);
      if (res.success && res.account) {
        onLoginSuccess(res.account, res.token);
        onClose();
      } else {
        setErrorMessage(res.error || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoSelect = (demoAccount) => {
    setEmail(demoAccount.email);
    setPassword('password123');
    setErrorMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-dialog-title"
        className="relative w-full max-w-md bg-[#0c1222] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <LogIn className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Member Access
              </span>
              <h2 id="login-dialog-title" className="text-xl font-bold font-heading text-white">
                Sign In / Log In
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close login dialog"
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="e.g. kai.sterling@creovate.ai or marcus@solariaenergy.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="login-password" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              aria-required="true"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {errorMessage && (
            <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In / Log In'}</span>
          </button>
        </form>

        {/* Quick Demo Accounts */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick-Select Verified Demo Accounts:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoSelect({ email: 'kai.sterling@creovate.ai' })}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 text-left text-[11px] transition-colors"
            >
              <div className="font-semibold text-purple-300 flex items-center gap-1">
                <User className="w-3 h-3 text-purple-400" />
                Kai Sterling
              </div>
              <div className="text-slate-400 text-[10px]">✓ Verified Creator</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoSelect({ email: 'marcus@solariaenergy.com' })}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 text-left text-[11px] transition-colors"
            >
              <div className="font-semibold text-cyan-300 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-cyan-400" />
                Solaria Clean Tech
              </div>
              <div className="text-slate-400 text-[10px]">✓ Verified Brand</div>
            </button>
          </div>
        </div>

        {/* Switch to Create Account */}
        <div className="text-center pt-2 border-t border-white/10 text-xs text-slate-400">
          <span>Don't have an account yet? </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenCreateAccount) onOpenCreateAccount();
            }}
            className="text-purple-400 font-semibold hover:underline"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
