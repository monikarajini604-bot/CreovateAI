import React from 'react';
import { FileText, PlusCircle, Zap, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export function MyBriefsPage({
  briefs,
  onOpenNewBriefModal,
  onFindBestCreators
}) {
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">My Creative Briefs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your AI campaign briefs, inspect deliverables, and match generative creators
          </p>
        </div>

        <button
          onClick={onOpenNewBriefModal}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Creative Brief</span>
        </button>
      </div>

      {/* Briefs List */}
      {briefs.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3">
          <FileText className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Creative Briefs Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Create your first structured brief or use the AI Brief Builder to get started.
          </p>
          <button
            onClick={onOpenNewBriefModal}
            className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            Create First Brief
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {briefs.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-2xl bg-[#0c1222] border border-white/10 hover:border-purple-500/30 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {b.content_type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">
                      {b.creative_style}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {b.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">{b.campaign_name}</h3>
                  <p className="text-xs text-purple-300 font-medium">Brand: {b.brand_name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onFindBestCreators(b.id, b)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all hover:scale-102"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Find Best Creators</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-white/5">
                {b.objective}
              </p>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Platform & Aspect</span>
                  <span className="text-white font-mono">{b.aspect_ratio} • {b.duration}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Budget Allocation</span>
                  <span className="text-emerald-400 font-mono font-medium">{b.budget}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Target Audience</span>
                  <span className="text-slate-300 truncate block">{b.target_audience}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Deadline</span>
                  <span className="text-slate-300">{b.deadline}</span>
                </div>
              </div>

              {/* Deliverables snippet */}
              {b.deliverables && b.deliverables.length > 0 && (
                <div className="pt-2 border-t border-white/5 text-xs flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 text-[11px] font-semibold uppercase">Deliverables:</span>
                  {b.deliverables.slice(0, 2).map((del, idx) => (
                    <span key={idx} className="bg-purple-950/40 text-purple-200 px-2 py-0.5 rounded text-[11px] font-mono border border-purple-500/20">
                      {del}
                    </span>
                  ))}
                  {b.deliverables.length > 2 && (
                    <span className="text-[11px] text-slate-400">+{b.deliverables.length - 2} more</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
