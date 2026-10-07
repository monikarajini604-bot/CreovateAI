import React from 'react';
import { Bookmark, Trash2, Zap, Briefcase, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { ProofPassportBadge } from '../components/ProofPassportBadge';

export function ShortlistPage({
  shortlistedCreators,
  onRemoveFromShortlist,
  onOpenCompareModal,
  onViewProfile,
  onInitiateEngagement,
  onOpenProofPassport,
  onNavigate
}) {
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Shortlisted Creators</h1>
          <p className="text-xs text-slate-400 mt-1">
            Curated candidates saved for comparison and campaign engagements
          </p>
        </div>

        {shortlistedCreators.length >= 2 && (
          <button
            onClick={onOpenCompareModal}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all self-start sm:self-auto"
          >
            <Zap className="w-4 h-4" />
            <span>Compare Shortlisted ({shortlistedCreators.length})</span>
          </button>
        )}
      </div>

      {shortlistedCreators.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3">
          <Bookmark className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Shortlisted Creators Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse creator portfolios and click the bookmark button to build your candidate shortlist.
          </p>
          <button
            onClick={() => onNavigate('explore')}
            className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            Explore AI Creators
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shortlistedCreators.map((creator) => (
            <div
              key={creator.id}
              className="p-5 rounded-2xl bg-[#0c1222] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar_url}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30"
                    />
                    <div>
                      <h3
                        onClick={() => onViewProfile(creator.id)}
                        className="font-bold text-white text-base hover:text-purple-400 cursor-pointer transition-colors"
                      >
                        {creator.name}
                      </h3>
                      <p className="text-xs text-purple-400 font-medium">{creator.specialization}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromShortlist(creator.id)}
                    title="Remove from Shortlist"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <ProofPassportBadge
                    status={creator.verification_status}
                    size="sm"
                    onClick={() => onOpenProofPassport(creator)}
                  />
                  <span className="text-white font-semibold">${creator.hourly_rate}/hr</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">AI Toolstack</span>
                  <div className="flex flex-wrap gap-1">
                    {creator.tools.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="bg-black/40 px-2 py-0.5 rounded text-[11px] font-mono text-purple-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => onViewProfile(creator.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onInitiateEngagement(creator)}
                  className="flex-1 py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Invite to Brief</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
