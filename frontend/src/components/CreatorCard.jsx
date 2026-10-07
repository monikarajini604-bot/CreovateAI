import React from 'react';
import { Star, ShieldCheck, Zap, Heart, Bookmark, Eye, ArrowRight, Layers, Check } from 'lucide-react';
import { ProofPassportBadge } from './ProofPassportBadge';

export function CreatorCard({
  creator,
  matchScore = null,
  matchBreakdown = null,
  isShortlisted = false,
  isSelectedForCompare = false,
  onToggleShortlist = null,
  onToggleCompare = null,
  onViewProfile = null,
  onOpenProofPassport = null,
  onOpenPortfolio = null,
  onInviteToBrief = null
}) {
  return (
    <div
      role="article"
      aria-label={`Creator profile card: ${creator.name}`}
      className="relative p-5 rounded-2xl bg-[#0e1424]/90 backdrop-blur-md border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 flex flex-col justify-between group"
    >
      {/* Top Banner & Badges */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={creator.avatar_url}
                alt={`${creator.name}'s profile avatar`}
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(creator.name || 'creator')}`;
                }}
                className="w-13 h-13 rounded-full object-cover ring-2 ring-purple-500/30 group-hover:ring-purple-400 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0e1424]" title="Active & Available" aria-label="Active & Available" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onViewProfile && onViewProfile(creator.id)}
                  className="font-bold text-white text-base hover:text-purple-400 cursor-pointer transition-colors text-left focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg"
                  aria-label={`View profile for ${creator.name}`}
                >
                  <h3 className="font-bold">{creator.name}</h3>
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-purple-300 font-medium">{creator.specialization}</span>
                {creator.location && (
                  <>
                    <span className="text-slate-500" aria-hidden="true">•</span>
                    <span className="text-slate-300 text-[11px]">{creator.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleShortlist && (
              <button
                type="button"
                onClick={() => onToggleShortlist(creator.id)}
                title={isShortlisted ? "Saved in Shortlist" : "Save Creator to Shortlist"}
                aria-label={isShortlisted ? `Remove ${creator.name} from saved creators` : `Save ${creator.name} to shortlist`}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none ${
                  isShortlisted
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{isShortlisted ? 'Saved' : 'Save'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Headline */}
        <p className="text-xs text-slate-200 line-clamp-2 mb-3 leading-relaxed">
          {creator.headline}
        </p>

        {/* Proof Passport & Ratings Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 px-3 rounded-xl bg-slate-900/80 border border-white/5 mb-3.5 text-xs">
          <ProofPassportBadge
            badge={creator.verification_badges?.[0] || creator.verification_status || "Verified"}
            size="sm"
            onClick={() => onOpenProofPassport && onOpenProofPassport(creator)}
          />

          <div className="flex items-center gap-2.5 text-slate-200">
            <span className="flex items-center gap-1 text-amber-400 font-semibold" aria-label={`Rating ${creator.rating} out of 5 stars`}>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {creator.rating}
            </span>
            <span className="text-slate-500" aria-hidden="true">•</span>
            <span>{creator.completed_projects} projects</span>
            <span className="text-slate-500" aria-hidden="true">•</span>
            <span className="font-semibold text-white">${creator.hourly_rate}/hr</span>
          </div>
        </div>

        {/* Commercial Readiness Indicator */}
        <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
          <span className="font-medium">Commercial Status:</span>
          <span className="font-semibold">{creator.commercial_use || 'Commercial Ready'}</span>
        </div>

        {/* Match Score Display if active */}
        {matchScore !== null && (
          <div className="mb-3.5 p-3 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/60 border border-purple-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
                <Zap className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span>Creator Match Score</span>
              </div>
              <span className="text-sm font-extrabold text-white font-heading px-2 py-0.5 rounded-full bg-purple-600/30 border border-purple-500/50">
                {matchScore}%
              </span>
            </div>

            {matchBreakdown?.explanations && (
              <div className="space-y-1 text-[11px] text-slate-200 pt-1">
                {matchBreakdown.explanations.slice(0, 3).map((exp, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-emerald-300/90 truncate">
                    <span className="text-emerald-400 font-bold shrink-0" aria-hidden="true">✓</span>
                    <span className="truncate">{exp.replace(/^✓\s*/, '')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI Tools & Models */}
        <div className="space-y-1.5 mb-3.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            AI Tools & Models
          </span>
          <div className="flex flex-wrap gap-1" aria-label={`Tools: ${creator.tools.join(', ')}`}>
            {creator.tools.slice(0, 4).map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/40 text-purple-200 border border-purple-500/20"
              >
                {tool}
              </span>
            ))}
            {creator.tools.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[11px] text-slate-300 bg-white/10 font-mono">
                +{creator.tools.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Portfolio Snippets */}
        {creator.portfolio && creator.portfolio.length > 0 && (
          <div className="space-y-1.5 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Verified AI Portfolio ({creator.portfolio.length})
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {creator.portfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenPortfolio && onOpenPortfolio(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenPortfolio && onOpenPortfolio(item);
                    }
                  }}
                  aria-label={`View verified portfolio item: ${item.title}`}
                  className="relative group/thumb aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer bg-black focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
                >
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-108 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onViewProfile && onViewProfile(creator.id)}
            aria-label={`View profile of ${creator.name}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-white/10 transition-all focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
          >
            View Profile
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {onInviteToBrief && (
            <button
              type="button"
              onClick={() => onInviteToBrief(creator)}
              aria-label={`Invite ${creator.name} to creative brief`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30 transition-all flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            >
              <span>Invite to Brief</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
