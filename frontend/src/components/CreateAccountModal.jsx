import React, { useState, useEffect } from 'react';
import { User, Building2, X, CheckCircle2, AlertCircle, UserPlus, LogIn } from 'lucide-react';
import { api } from '../services/api';

/**
 * CreateAccountModal Component
 * 
 * Allows new users to create an account as:
 * - AI Creator
 * - Brand / Agency
 * 
 * Includes full validation (required fields, email format, mobile format, password confirmation, duplicate check).
 * On successful registration, redirects to account verification.
 */
export function CreateAccountModal({
  isOpen,
  onClose,
  onAccountCreated,
  onOpenLogin,
  existingCreators = [],
  existingBrands = []
}) {
  const [accountType, setAccountType] = useState('creator'); // 'creator' | 'brand'
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonSuccess, setButtonSuccess] = useState(false);

  // Creator Form Fields
  const [creatorForm, setCreatorForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  // Brand / Agency Form Fields
  const [brandForm, setBrandForm] = useState({
    contactName: '',
    businessName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  // Reset error/success/submission state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setSuccessMessage('');
      setIsSubmitting(false);
      setButtonSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreatorChange = (field, value) => {
    setCreatorForm(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleBrandChange = (field, value) => {
    setBrandForm(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile) => {
    const cleaned = (mobile || '').replace(/\D/g, '');
    return cleaned.length >= 6 && cleaned.length <= 16;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || buttonSuccess) return;

    setErrorMessage('');
    setSuccessMessage('');

    let payload = {};

    if (accountType === 'creator') {
      const { fullName, email, mobile, password, confirmPassword } = creatorForm;

      // 1. Required fields
      if (!fullName.trim() || !email.trim() || !mobile.trim() || !password || !confirmPassword) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      // 2. Email format validation
      if (!validateEmail(email.trim())) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }

      // 3. Mobile validation
      if (!validateMobile(mobile.trim())) {
        setErrorMessage('Please enter a valid mobile number.');
        return;
      }

      // 4. Password length
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      // 5. Password confirmation
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      payload = {
        role: 'creator',
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        password,
        confirmPassword
      };
    } else {
      const { contactName, businessName, email, mobile, password, confirmPassword } = brandForm;

      // 1. Required fields
      if (!contactName.trim() || !businessName.trim() || !email.trim() || !mobile.trim() || !password || !confirmPassword) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      // 2. Email format validation
      if (!validateEmail(email.trim())) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }

      // 3. Mobile validation
      if (!validateMobile(mobile.trim())) {
        setErrorMessage('Please enter a valid mobile number.');
        return;
      }

      // 4. Password length
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      // 5. Password confirmation
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      payload = {
        role: 'brand',
        businessName: businessName.trim(),
        contactName: contactName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        password,
        confirmPassword
      };
    }

    setIsSubmitting(true);

    try {
      const res = await api.register(payload);
      if (res.success) {
        setButtonSuccess(true);
        setSuccessMessage('Account created successfully! You can now sign in.');

        // Update local registered accounts cache
        try {
          const savedAccounts = JSON.parse(localStorage.getItem('creovate_registered_accounts') || '[]');
          savedAccounts.push({
            role: payload.role,
            email: payload.email,
            name: payload.fullName || payload.businessName,
            mobile: payload.mobile,
            verificationStatus: 'Verified',
            email_verified: true,
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('creovate_registered_accounts', JSON.stringify(savedAccounts));
        } catch {}

        if (onAccountCreated && res.account) {
          onAccountCreated(res.account.role, res.account, res.token);
        }
        if (onClose) {
          onClose();
        }
      } else {
        setErrorMessage(res.error || 'Unable to create your account right now. Please try again.');
      }
    } catch (err) {
      if (err.isDuplicate || err.message?.includes('already exists')) {
        setErrorMessage('An account already exists with this email. Please Sign In / Log In.');
      } else {
        setErrorMessage(err.message || 'Unable to create your account right now. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-account-dialog-title"
        className="relative w-full max-w-lg bg-[#0d1322] border border-purple-500/30 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-100 max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-400">
              <UserPlus className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="create-account-dialog-title" className="text-xl font-bold font-heading text-white">Create Account</h2>
              <p className="text-xs text-slate-300">Join the CREOVATE AI content creator marketplace</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration dialog"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
            {onOpenLogin && (errorMessage.includes('Log In') || errorMessage.includes('Sign In')) && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Log In</span>
              </button>
            )}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs space-y-3 animate-fade-in shadow-lg">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold leading-relaxed text-emerald-100">
                {successMessage}
              </div>
            </div>
            {onOpenLogin && (
              <div className="flex items-center gap-2 pt-2 border-t border-emerald-500/20">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Log In</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Account Type Selection */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Account Type:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* AI Creator Option */}
            <button
              type="button"
              onClick={() => {
                setAccountType('creator');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center text-center gap-1.5 ${
                accountType === 'creator'
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-600/20 ring-1 ring-purple-500'
                  : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <User className={`w-5 h-5 ${accountType === 'creator' ? 'text-purple-400' : 'text-slate-400'}`} />
              <span className="text-sm font-bold">AI Creator</span>
              <span className="text-[10px] text-slate-400">Showcase AI work & monetize</span>
            </button>

            {/* Brand / Agency Option */}
            <button
              type="button"
              onClick={() => {
                setAccountType('brand');
                setErrorMessage('');
              }}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center text-center gap-1.5 ${
                accountType === 'brand'
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-600/20 ring-1 ring-purple-500'
                  : 'bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Building2 className={`w-5 h-5 ${accountType === 'brand' ? 'text-purple-400' : 'text-slate-400'}`} />
              <span className="text-sm font-bold">Brand / Agency</span>
              <span className="text-[10px] text-slate-400">Post briefs & hire creators</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {accountType === 'creator' ? (
            /* CREATOR FIELDS */
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  value={creatorForm.fullName}
                  onChange={(e) => handleCreatorChange('fullName', e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={creatorForm.email}
                    onChange={(e) => handleCreatorChange('email', e.target.value)}
                    placeholder="maya@creovate.ai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={creatorForm.mobile}
                    onChange={(e) => handleCreatorChange('mobile', e.target.value)}
                    placeholder="+1 (555) 019-2831"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={creatorForm.password}
                    onChange={(e) => handleCreatorChange('password', e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm Password <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={creatorForm.confirmPassword}
                    onChange={(e) => handleCreatorChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            /* BRAND / AGENCY FIELDS */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Person Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={brandForm.contactName}
                    onChange={(e) => handleBrandChange('contactName', e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Business / Agency Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={brandForm.businessName}
                    onChange={(e) => handleBrandChange('businessName', e.target.value)}
                    placeholder="e.g. Nebula Studio Co."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Business Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={brandForm.email}
                    onChange={(e) => handleBrandChange('email', e.target.value)}
                    placeholder="sarah@nebulastudio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={brandForm.mobile}
                    onChange={(e) => handleBrandChange('mobile', e.target.value)}
                    placeholder="+1 (555) 482-9102"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={brandForm.password}
                    onChange={(e) => handleBrandChange('password', e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm Password <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={brandForm.confirmPassword}
                    onChange={(e) => handleBrandChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Action CTAs */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="create-account-submit-btn"
              disabled={isSubmitting || buttonSuccess}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg ${
                buttonSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : isSubmitting
                  ? 'bg-purple-700/60 text-purple-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30 hover:scale-102 cursor-pointer'
              }`}
            >
              {buttonSuccess
                ? 'Account Created'
                : isSubmitting
                ? 'Creating Account...'
                : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Already have an account?</span>
          {onOpenLogin ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="text-purple-400 font-bold hover:underline flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          ) : (
            <span>Use Log In in the top navigation</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAccountModal;
