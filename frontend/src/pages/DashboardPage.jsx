import React from 'react';
import {
  FileText,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  Wand2,
  Clock
} from 'lucide-react';
import { CreatorCard } from '../components/CreatorCard';
import { ProofPassportBadge } from '../components/ProofPassportBadge';

export function DashboardPage({
  creators,
  briefs,
  shortlistedIds,
  engagements,
  stats,
  onNavigate,
  onViewProfile,
  onToggleShortlist,
  onOpenProofPassport,
  onOpenPortfolio,
  onInviteToBrief
}) {
  const topCreators = creators.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enterprise Marketplace Hero Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#10172e] to-cyan-950/60 border border-purple-500/30 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Enterprise AI Production Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Discover, Match & Engage <span className="text-gradient-purple">Elite AI Creators</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            The dedicated platform connecting marketing brands and creative agencies with vetted AI filmmakers, 3D animators, and generative artists through structured briefs, verified workflows, and explainable match scoring.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('create-brief-page')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Brief</span>
            </button>

            <button
              onClick={() => onNavigate('ai-brief-builder')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 flex items-center gap-2 transition-colors"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Brief Builder</span>
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors border border-white/5 bg-slate-900/40"
            >
              <span>Discover Creators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('engagements')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-purple-300 hover:text-purple-200 flex items-center gap-1.5 transition-colors border border-purple-500/20 bg-purple-950/30"
            >
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>View Engagements</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Real Marketplace Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          { label: 'Active Briefs', val: briefs.length, icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Shortlisted Creators', val: shortlistedIds.length, icon: Bookmark, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Invitations', val: engagements.filter(e => e.status === 'Invited' || e.current_stage_index === 2).length || 2, icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Active Engagements', val: engagements.filter(e => e.status !== 'Delivered' && e.status !== 'Completed').length, icon: Briefcase, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Completed Projects', val: 18, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Recommended Creators', val: creators.length, icon: ShieldCheck, color: 'text-purple-300', bg: 'bg-purple-500/10' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-white/10 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">{m.label}</span>
                <div className={`p-1.5 rounded-lg ${m.bg} ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white font-heading">{m.val}</div>
            </div>
          );
        })}
      </div>

      {/* Active Briefs & Traceability Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Briefs List */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold font-heading text-white">Active Creative Briefs</h2>
              <p className="text-xs text-slate-400">Structured briefs ready for creator matching</p>
            </div>
            <button
              onClick={() => onNavigate('my-briefs')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              View All ({briefs.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {briefs.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{b.campaign_name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{b.objective}</p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span>{b.platform}</span>
                    <span>•</span>
                    <span className="text-purple-300 font-mono">{b.aspect_ratio} ({b.duration})</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">{b.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('smart-matches', { briefId: b.id })}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Find Creators</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold font-heading text-white">Platform Activity</h2>
              <p className="text-xs text-slate-400">Collaboration updates</p>
            </div>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-3.5">
            {[
              { title: "Milestone Approved: Styleframe Architecture", subtitle: "Kai Sterling • Solaria Campaign", time: "15m ago" },
              { title: "Workflow Verified: Runway Gen-3 Alpha Camera Motion", subtitle: "Kai Sterling • Verified Workflow", time: "2h ago" },
              { title: "Candidate Shortlisted: Elena Rostova", subtitle: "Aura Botanical 3D Sequence", time: "4h ago" },
              { title: "Creative Brief Published: Solaria Clean Tech", subtitle: "AI Brief Studio • 9:16 Vertical Video", time: "Yesterday" }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div className="flex-1 space-y-0.5">
                  <div className="font-semibold text-slate-200">{act.title}</div>
                  <div className="text-slate-400 text-[11px]">{act.subtitle}</div>
                  <div className="text-slate-500 text-[10px]">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured AI Creators Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">Recommended AI Creators</h2>
            <p className="text-xs text-slate-400">Verified specialists in generative video, 3D motion, and product advertising</p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
          >
            Explore Directory ({creators.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              isShortlisted={shortlistedIds.includes(creator.id)}
              onToggleShortlist={onToggleShortlist}
              onViewProfile={onViewProfile}
              onOpenProofPassport={onOpenProofPassport}
              onOpenPortfolio={onOpenPortfolio}
              onInviteToBrief={onInviteToBrief}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
