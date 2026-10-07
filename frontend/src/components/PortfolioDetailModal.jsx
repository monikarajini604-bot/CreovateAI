import React from 'react';
import { X, ExternalLink, ShieldCheck, Layers, Cpu, Video, CheckCircle2, FileCheck, Film } from 'lucide-react';
import { ProofPassportBadge } from './ProofPassportBadge';

export function PortfolioDetailModal({ item, isOpen, onClose, onShortlistCreator = null }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0c1220] border border-purple-500/30 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {item.content_type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-white/10">
                {item.style}
              </span>
              <ProofPassportBadge badge={item.evidence_status} size="sm" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">{item.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              By <span className="text-purple-300 font-semibold">{item.creator_name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview */}
        <div className="relative my-5 rounded-xl overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center group">
          <img
            src={item.media_url || item.thumbnail_url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <div className="flex items-center gap-3 text-xs text-white">
              <span className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                <Film className="w-3.5 h-3.5 text-purple-400" />
                Format: {item.output_format}
              </span>
              <span className="bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                Aspect Ratio: {item.aspect_ratio}
              </span>
            </div>
          </div>
        </div>

        {/* Content details grid */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Project Overview</h4>
            <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-white/5">
              {item.description}
            </p>
          </div>

          {/* AI Production Stack & Skills Involved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                <Cpu className="w-4 h-4 text-purple-400" />
                AI Production Stack (Tools & Models)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(item.tools_used || item.tools || []).map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-950/60 border border-purple-500/30 text-purple-200"
                  >
                    {tool}
                  </span>
                ))}
                {(item.models || []).map((model, idx) => (
                  <span
                    key={`m-${idx}`}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/60 border border-indigo-500/30 text-indigo-200"
                  >
                    Model: {model}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                Skills Involved
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(item.skills || ["Prompt Engineering", "Temporal Consistency", "AI Filmmaking"]).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-950/50 border border-cyan-500/30 text-cyan-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow Pipeline */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <Layers className="w-4 h-4 text-cyan-400" />
              AI Production Workflow
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-300">
                {(item.workflow ? item.workflow.split('→').map(s => s.trim()) : [
                  "Concept", "Prompting", "Generation", "Selection", "Editing", "Upscaling", "Final Delivery"
                ]).map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-purple-500/30 text-white font-medium text-xs">
                      {idx + 1}. {step}
                    </span>
                    {idx < arr.length - 1 && <span className="text-purple-400 font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Commercial Usage Clearance */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/20 via-slate-900/60 to-cyan-950/20 border border-purple-500/20 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Commercial Usage & Licensing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                <span className="text-slate-400 block mb-1">Commercial Usage Rights:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block">
                  {item.commercial_use || "Commercial Use Available"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                <span className="text-slate-400 block mb-1">Licensing Terms:</span>
                <span className="text-white font-medium">{item.licensing || "Full commercial buyout with worldwide digital ad rights"}</span>
              </div>
            </div>
          </div>

          {/* Proof & Evidence details if present */}
          {item.evidence_details && (
            <div className="p-3 rounded-lg bg-slate-900/40 border border-white/5 text-xs text-slate-400 flex items-center justify-between">
              <span>Telemetry: Render & Human Input Metrics</span>
              <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
                {Object.entries(item.evidence_details).map(([key, val]) => (
                  <span key={key} className="bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {key.replace('_', ' ')}: <strong className="text-purple-300">{val}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            ID: <span className="font-mono text-slate-500">{item.id}</span>
          </div>
          <div className="flex items-center gap-3">
            {onShortlistCreator && (
              <button
                onClick={() => {
                  onShortlistCreator(item.creator_id);
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-lg shadow-purple-600/30"
              >
                Shortlist Creator
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
