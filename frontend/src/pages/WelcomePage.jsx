import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Wand2,
  Users,
  CheckCircle2,
  Zap,
  LogIn,
  UserPlus,
  Film,
  Building2,
  Cpu,
  Star
} from 'lucide-react';
import { CreovateLogo } from '../components/CreovateLogo';

/**
 * WelcomePage Component
 *
 * First screen for completely new visitors to Creovate AI.
 * Preserves the exact Creovate AI visual brand identity, logo, typography,
 * and purple accent theme.
 *
 * Action buttons:
 * - "Get Started" / "Continue" -> Opens Sign In / Log In modal
 * - "Sign In / Log In" -> Opens Sign In / Log In modal
 * - "Create Account" -> Opens Create Account modal
 *
 * Gating rule: New visitors must pass through authentication first before entering the dashboard.
 */
export function WelcomePage({
  onGetStarted,
  onOpenLogin,
  onOpenCreateAccount,
  creators = []
}) {
  const topCreators = creators.slice(0, 3);

  return (
    <div className="w-full space-y-12 animate-fade-in pb-16">
      {/* Hero Section */}
      <section
        aria-label="Welcome and Platform Overview"
        className="relative overflow-hidden p-6 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#10172e] to-cyan-950/60 border border-purple-500/30 shadow-2xl text-center flex flex-col items-center"
      >
        {/* Ambient Glow Accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-24 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl space-y-6 flex flex-col items-center">
          {/* Brand Logo & Trust Tag */}
          <div className="flex items-center gap-3">
            <CreovateLogo size={52} className="shadow-lg shadow-purple-500/20" />
            <div className="text-left">
              <span className="font-extrabold text-2xl font-heading tracking-tight text-white">
                CREOVATE <span className="text-purple-400 font-bold">AI</span>
              </span>
              <p className="text-[11px] text-purple-300 font-medium tracking-wide">
                Create. Innovate. Elevate with AI.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-200 border border-purple-500/40 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            <span>Enterprise AI Production Marketplace • 2026 AI Creator Discovery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Discover, Match & Engage <span className="text-gradient-purple">Elite AI Creators</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            The dedicated platform connecting marketing brands and creative agencies with vetted AI filmmakers, 3D animators, and generative artists through structured briefs, verified workflows, and explainable match scoring.
          </p>

          {/* Core Action Buttons: Welcome Page -> Sign In / Log In */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              id="welcome-get-started-btn"
              type="button"
              onClick={onGetStarted || onOpenLogin}
              aria-label="Get Started with Creovate AI"
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-2.5 shadow-xl shadow-purple-600/40 transition-all hover:scale-105 active:scale-98 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <button
              id="welcome-sign-in-btn"
              type="button"
              onClick={onOpenLogin}
              aria-label="Sign In or Log In to your account"
              className="px-6 py-3.5 rounded-2xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-white/10 flex items-center gap-2 transition-all hover:border-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            >
              <LogIn className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span>Sign In / Log In</span>
            </button>

            <button
              id="welcome-create-account-btn"
              type="button"
              onClick={onOpenCreateAccount}
              aria-label="Create a new Creovate AI account"
              className="px-6 py-3.5 rounded-2xl text-sm font-semibold bg-purple-950/50 hover:bg-purple-900/50 text-purple-200 border border-purple-500/40 flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            >
              <UserPlus className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div role="list" aria-label="Platform Trust Guarantees" className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div role="listitem" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Verified Creator Proof Passport</span>
            </div>
            <div role="listitem" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
              <Lock className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>End-to-End Escrow & Protected Chat</span>
            </div>
            <div role="listitem" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
              <Zap className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span>Instant & Secure Account Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section aria-label="Core Capabilities" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0c1222]/90 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-300 space-y-3 shadow-lg hover:-translate-y-1 hover:shadow-glow">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Film className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold font-heading text-white">
            Vetted AI Creator Workflows
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Inspect verified model toolstacks (Runway Gen-3, Midjourney v6, Kling AI, ComfyUI node graphs) and reproducible seed prompts with commercial IP buyout clearance.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0c1222]/90 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-300 space-y-3 shadow-lg hover:-translate-y-1 hover:shadow-glow">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Zap className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold font-heading text-white">
            Explainable Smart Matching
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Algorithmic 6-dimension scoring matching campaign objectives with creator skills, camera motion capabilities, turnaround speeds, and commercial rates.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0c1222]/90 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-300 space-y-3 shadow-lg hover:-translate-y-1 hover:shadow-glow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold font-heading text-white">
            Escrow-Protected Private Chat
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Confidential Brand ↔ Creator messaging protected by account verification, milestone tracking, and full commercial asset delivery compliance.
          </p>
        </div>
      </section>

      {/* Featured Creators Showcase */}
      {topCreators.length > 0 && (
        <section aria-label="Featured Creators" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Talent Preview
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Featured Verified AI Creators
              </h2>
            </div>
            <button
              type="button"
              onClick={onGetStarted || onOpenLogin}
              aria-label="Explore All Creators in Marketplace"
              className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none rounded-lg px-2 py-1"
            >
              <span>Explore All Creators</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCreators.map((creator) => (
              <div
                key={creator.id}
                className="p-5 rounded-3xl bg-[#0c1222]/90 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar_url}
                      alt={`${creator.name} - ${creator.specialization || 'AI Creator'}`}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/10 bg-slate-900"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{creator.name}</span>
                        <span className="text-emerald-400 text-xs font-bold" title="Identity Verified" aria-label="Identity Verified">✓</span>
                      </h3>
                      <p className="text-[11px] text-slate-300">{creator.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {creator.headline || creator.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5" aria-label={`Tools used by ${creator.name}`}>
                    {(creator.tools || []).slice(0, 3).map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-900/90 text-[10px] text-purple-200 border border-purple-500/20 font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold">{creator.availability || 'Available'}</span>
                  <button
                    type="button"
                    onClick={onGetStarted || onOpenLogin}
                    aria-label={`View profile of ${creator.name}`}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white font-semibold transition-all focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it Works / 3-Step Flow */}
      <section aria-label="How Creovate Works" className="p-8 rounded-3xl bg-[#0c1222]/90 backdrop-blur-md border border-white/10 space-y-6 text-center shadow-lg">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Seamless Workflow
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            How Creovate AI Works
          </h2>
          <p className="text-xs text-slate-300">
            Get started in minutes with verified authentication and direct collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 hover:border-purple-500/20 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 font-bold font-mono text-sm flex items-center justify-center border border-purple-500/30">
              1
            </div>
            <h3 className="text-sm font-bold text-white">Sign In or Create Account</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              New users create an account in seconds; existing users securely sign in with password credentials.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 hover:border-cyan-500/20 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-400 font-bold font-mono text-sm flex items-center justify-center border border-cyan-500/30">
              2
            </div>
            <h3 className="text-sm font-bold text-white">Match & Post Briefs</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use our AI Brief Builder to formulate structured campaigns and get explainable creator matches.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 hover:border-emerald-500/20 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 font-bold font-mono text-sm flex items-center justify-center border border-emerald-500/30">
              3
            </div>
            <h3 className="text-sm font-bold text-white">Collaborate in Private Chat</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct private messaging, milestone agreements, and commercial IP assignment built into every engagement.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={onGetStarted || onOpenLogin}
            aria-label="Continue to Sign In / Log In"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all hover:scale-102 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
          >
            Continue to Sign In / Log In →
          </button>
        </div>
      </section>
    </div>
  );
}
