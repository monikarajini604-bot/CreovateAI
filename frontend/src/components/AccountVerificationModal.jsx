import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  X,
  Mail,
  RefreshCw,
  LogIn,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

/**
 * Helper to mask email for privacy (e.g. l*****@gmail.com)
 */
function maskEmail(email) {
  if (!email) return '';
  const [user, domain] = email.split('@');
  if (!domain) return email;
  if (user.length <= 1) return `*@${domain}`;
  if (user.length === 2) return `${user[0]}*@${domain}`;
  return `${user[0]}*****@${domain}`;
}

/**
 * AccountVerificationModal Component
 *
 * Real Email Verification Flow (NO OTP):
 * - Displays unverified email status with instructions to click link
 * - Direct "Resend Verification Email" with 60-second cooldown
 * - Displays "Email verified successfully." when verified
 * - Prompts to "Sign In / Log In" after verification
 */
export function AccountVerificationModal({
  isOpen,
  onClose,
  account,
  verifiedMode = false,
  errorMessageOverride = '',
  onOpenLogin,
  onVerificationSuccess
}) {
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState(errorMessageOverride || '');
  const [inputEmail, setInputEmail] = useState('');

  // Countdown timer for cooldown
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(errorMessageOverride || '');
      setResendSuccess('');
      if (account?.email) {
        setInputEmail(account.email);
      }
    }
  }, [isOpen, account, errorMessageOverride]);

  if (!isOpen) return null;

  const targetEmail = account?.email || inputEmail.trim();
  const isVerified = verifiedMode || account?.verificationStatus === 'Verified' || account?.email_verified;

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    if (!targetEmail) {
      setErrorMessage('Please enter your email address to resend verification.');
      return;
    }

    setErrorMessage('');
    setIsResending(true);
    try {
      const res = await api.resendVerification(targetEmail);
      setResendSuccess('Verification email sent. Please check your inbox and click the verification link.');
      setCooldown(res.cooldownSeconds || 60);
    } catch (err) {
      if (err.cooldownSeconds) {
        setCooldown(err.cooldownSeconds);
      }
      setErrorMessage(err.message || "We couldn't send the verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md bg-[#0c1222] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow background */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                isVerified
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : errorMessageOverride
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-purple-600/20 border-purple-500/40 text-purple-400'
              }`}
            >
              {isVerified ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : errorMessageOverride ? (
                <AlertCircle className="w-6 h-6" />
              ) : (
                <Mail className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Email Verification
              </span>
              <h2 className="text-xl font-bold font-heading text-white">
                {isVerified
                  ? 'Email Verified'
                  : errorMessageOverride
                  ? 'Verification Issue'
                  : 'Verify Your Email'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* VERIFIED STATE */}
        {isVerified ? (
          <div className="text-center py-2 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-emerald-400">
                Email verified successfully.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Your email address has been verified. You can now sign in and access the full Creovate AI platform.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenLogin) onOpenLogin();
              }}
              className="w-full mt-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Log In</span>
            </button>
          </div>
        ) : (
          /* UNVERIFIED STATE */
          <div className="space-y-4">
            {/* Status card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Email Status:</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide border flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border-amber-500/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Unverified</span>
                </span>
              </div>

              {targetEmail ? (
                <div className="text-xs text-slate-300 pt-2 border-t border-white/5 space-y-1">
                  <p className="text-slate-400 text-[11px]">
                    Verification email sent to:
                  </p>
                  <p className="text-purple-300 font-mono font-semibold text-xs bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-500/20 truncate">
                    {targetEmail}
                  </p>
                </div>
              ) : (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <label className="text-[11px] text-slate-400">Enter your email address:</label>
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Please check your inbox and click the verification link to verify your account.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Resend Success Message */}
            {resendSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{resendSuccess}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || cooldown > 0}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/40 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>
                  {isResending
                    ? 'Sending Verification Email...'
                    : cooldown > 0
                    ? `Resend Verification Email (${cooldown}s)`
                    : 'Resend Verification Email'}
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
