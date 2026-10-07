import React from 'react';
import { Sparkles, Building2, User, Search, PlusCircle, Wand2, ShieldCheck, MessageSquare, UserPlus, LogIn, LogOut, CheckCircle2, Menu, X } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { CreovateLogo } from './CreovateLogo';

export function Navbar({
  currentRole,
  onSwitchRole,
  onOpenNewBriefModal,
  onOpenCreateAccount,
  onNavigate,
  searchTerm,
  onSearchChange,
  unreadMessagesCount = 0,
  currentUser = null,
  onOpenLogin,
  onLogout,
  isMobileMenuOpen = false,
  onToggleMobileMenu = null
}) {
  return (
    <header role="banner" className="sticky top-0 z-40 w-full bg-[#080d19]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 lg:px-8 py-3 flex items-center justify-between gap-4 shadow-lg shadow-black/30">
      {/* Brand & Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
            title={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}

        <div
          role="link"
          tabIndex={0}
          onClick={() => onNavigate(currentRole === 'creator' ? 'creator-portal' : 'dashboard')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate(currentRole === 'creator' ? 'creator-portal' : 'dashboard');
            }
          }}
          className="flex items-center gap-3 cursor-pointer group select-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none rounded-xl p-1"
          aria-label="Creovate AI Home"
        >
          {/* Creative Bridge Logo (Creator ↔ Creovate ↔ Brand/Agency) */}
          <CreovateLogo size={38} className="transition-transform duration-300 group-hover:scale-105" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl font-heading tracking-tight text-white group-hover:text-purple-300 transition-colors">
                CREOVATE <span className="text-purple-400 font-bold">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-purple-300/80 font-medium hidden md:block tracking-wide">
              Create. Innovate. Elevate with AI.
            </p>
          </div>
        </div>
      </div>

      {/* Global Search */}
      <div role="search" aria-label="Global creator search" className="hidden lg:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            type="text"
            value={searchTerm || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search AI creators, Runway Gen-3, 9:16 vertical video, 3D motion..."
            aria-label="Search AI creators, Runway Gen-3, 9:16 vertical video, 3D motion"
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/30 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Role Switcher & Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Marketplace Trust Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span>Verified Creators Active</span>
        </div>

        {/* Role Switcher */}
        <div role="radiogroup" aria-label="Workspace Role Switcher" className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            type="button"
            role="radio"
            aria-checked={currentRole === 'brand'}
            onClick={() => onSwitchRole('brand')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
              currentRole === 'brand'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Brand / Agency</span>
            <span className="sm:hidden">Brand</span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={currentRole === 'creator'}
            onClick={() => onSwitchRole('creator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
              currentRole === 'creator'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">AI Creator</span>
            <span className="sm:hidden">Creator</span>
          </button>
        </div>

        {/* Action: AI Brief Builder */}
        <button
          type="button"
          onClick={() => onNavigate('ai-brief-builder')}
          aria-label="Open AI Brief Builder"
          className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 text-purple-200 border border-purple-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
        >
          <Wand2 className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
          <span>AI Brief Builder</span>
        </button>

        {/* Action: Direct Messages */}
        <button
          type="button"
          onClick={() => onNavigate('messages')}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 relative transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
          title={`Direct Messages (Brand ↔ Creator)${unreadMessagesCount > 0 ? ` - ${unreadMessagesCount} unread` : ''}`}
          aria-label={`Direct Messages${unreadMessagesCount > 0 ? ` (${unreadMessagesCount} unread)` : ''}`}
        >
          <MessageSquare className="w-4 h-4 text-purple-400" aria-hidden="true" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white font-mono font-bold text-[9px] flex items-center justify-center shadow-md shadow-purple-600/50">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Appearance / Theme Selector */}
        <ThemeSelector />

        {/* Account Authentication Controls */}
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
              title="Account Verified"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="hidden xl:inline">✓ Account Verified</span>
              <span className="xl:hidden">✓ Verified</span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
              title={`Log Out (${currentUser.name || 'User'})`}
              aria-label={`Log Out of account ${currentUser.name || 'User'}`}
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-purple-500/40 transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
            title="Log In / Sign In to your account"
            aria-label="Sign In or Log In to your account"
          >
            <LogIn className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            <span>Sign In / Log In</span>
          </button>
        )}

        {/* Action: Create Account */}
        <button
          type="button"
          onClick={onOpenCreateAccount}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/50 hover:to-indigo-600/50 text-purple-200 border border-purple-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
          title="Create Account (AI Creator or Brand / Agency)"
          aria-label="Create a new account as AI Creator or Brand Agency"
        >
          <UserPlus className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
          <span className="hidden sm:inline">Create Account</span>
          <span className="sm:hidden">Join</span>
        </button>

        {/* Action: New Brief */}
        <button
          type="button"
          onClick={onOpenNewBriefModal}
          aria-label="Create a new creative brief"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-purple-600/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
        >
          <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Create Brief</span>
          <span className="sm:hidden">Brief</span>
        </button>
      </div>
    </header>
  );
}
