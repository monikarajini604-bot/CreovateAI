import React from 'react';
import { X, Check, Star, ShieldCheck, Cpu, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import { ProofPassportBadge } from './ProofPassportBadge';

export function CreatorComparisonModal({ creators, isOpen, onClose, onShortlist, onViewProfile, onEngage }) {
  if (!isOpen || !creators || creators.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0a0f1d] border border-purple-500/30 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Creator Comparison Matrix
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Side-by-side evaluation of {creators.length} selected AI creative professionals
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Grid */}
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[650px] grid grid-cols-4 gap-4">
            {/* Criteria Column */}
            <div className="space-y-6 pt-28 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <div className="py-2 border-b border-white/5">Specialization</div>
              <div className="py-2 border-b border-white/5">Rate & Experience</div>
              <div className="py-2 border-b border-white/5">Proof Passport Status</div>
              <div className="py-2 border-b border-white/5">AI Toolstack</div>
              <div className="py-2 border-b border-white/5">Primary Skills</div>
              <div className="py-2 border-b border-white/5">Content Types</div>
              <div className="py-2 border-b border-white/5">Aesthetic Styles</div>
              <div className="py-2 border-b border-white/5">Commercial Rights</div>
              <div className="py-2 border-b border-white/5">Portfolio Projects</div>
              <div className="py-2">Direct Action</div>
            </div>

            {/* Creator Columns */}
            {creators.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-6 flex flex-col justify-between"
              >
                {/* Creator Header */}
                <div className="text-center pb-4 border-b border-white/10">
                  <img
                    src={c.avatar_url}
                    alt={c.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-purple-500/30"
                  />
                  <h3 className="font-bold text-white text-base mt-2">{c.name}</h3>
                  <p className="text-xs text-purple-400 font-medium truncate">{c.specialization}</p>
                  <div className="flex items-center justify-center gap-1 mt-1 text-xs text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{c.rating} ({c.completed_projects} projects)</span>
                  </div>
                </div>

                {/* Criteria Rows */}
                <div className="space-y-6 text-xs text-slate-300">
                  <div className="py-2 border-b border-white/5 font-medium text-white">
                    {c.specialization}
                  </div>

                  <div className="py-2 border-b border-white/5">
                    <span className="text-white font-bold text-sm">${c.hourly_rate}</span>
                    <span className="text-slate-400">/hr • {c.experience_years} yrs exp</span>
                  </div>

                  <div className="py-2 border-b border-white/5">
                    <ProofPassportBadge status={c.verification_status} size="sm" />
                    <span className="block text-[11px] text-slate-400 mt-1">
                      {c.evidence_passport?.length || 0} telemetry artifacts
                    </span>
                  </div>

                  <div className="py-2 border-b border-white/5 flex flex-wrap gap-1">
                    {c.tools.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="bg-black/40 px-1.5 py-0.5 rounded text-[11px] font-mono text-purple-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="py-2 border-b border-white/5 space-y-1">
                    {c.skills.slice(0, 3).map((sk, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-200">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{sk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="py-2 border-b border-white/5 text-[11px]">
                    {c.content_types.join(', ')}
                  </div>

                  <div className="py-2 border-b border-white/5 text-[11px]">
                    {c.styles.join(', ')}
                  </div>

                  <div className="py-2 border-b border-white/5 text-[11px] text-emerald-300 font-medium">
                    {c.commercial_use}
                  </div>

                  <div className="py-2 border-b border-white/5">
                    <span className="font-semibold text-white">{c.portfolio?.length || 0} Verified Items</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => onEngage && onEngage(c)}
                    className="w-full py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-lg shadow-purple-600/30"
                  >
                    Engage Creator
                  </button>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onShortlist && onShortlist(c.id)}
                      className="py-1.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => onViewProfile && onViewProfile(c.id)}
                      className="py-1.5 text-[11px] font-medium bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/20 rounded transition-colors"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
