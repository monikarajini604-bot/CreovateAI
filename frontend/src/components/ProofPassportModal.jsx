import React from 'react';
import { X, ShieldCheck, CheckCircle2, FileCode, AlertCircle, Sparkles } from 'lucide-react';
import { ProofPassportBadge } from './ProofPassportBadge';

export function ProofPassportModal({ creator, isOpen, onClose }) {
  if (!isOpen || !creator) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d1322] border border-purple-500/30 rounded-3xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-heading text-white">Creator Verification Vault</h3>
                <ProofPassportBadge badge="Verified" size="sm" />
              </div>
              <p className="text-xs text-slate-400">
                Verified technical telemetry & production credentials for <span className="text-purple-300 font-medium">{creator.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Policy */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">CREOVATE AI Verification Standard:</strong> Verification signals indicate that model stacks, prompt architectures, and portfolio deliverables have been inspected for reproducibility and commercial IP readiness.
          </div>
        </div>

        {/* Passport Entries */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Verified Capabilities & Telemetry ({creator.evidence_passport?.length || 0})
          </h4>

          {(!creator.evidence_passport || creator.evidence_passport.length === 0) ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No evidence items registered yet for this creator.
            </div>
          ) : (
            creator.evidence_passport.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 hover:border-purple-500/30 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    {item.claimed_skill}
                  </div>
                  <ProofPassportBadge badge={item.evidence_status} size="sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block mb-0.5 font-medium text-[10px]">AI Tool / Model Stack:</span>
                    <span className="text-purple-300 font-mono font-medium">{item.tool_model}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block mb-0.5 font-medium text-[10px]">Audit Status:</span>
                    <span className="text-emerald-300 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {item.review_status}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 pt-1">
                  <div>
                    <span className="text-slate-400 font-medium text-[11px]">Portfolio Deliverable Evidence:</span>
                    <p className="text-slate-200 mt-0.5 bg-slate-900/60 p-2 rounded-lg border border-white/5 font-mono text-[11px]">
                      {item.portfolio_evidence}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium text-[11px]">Workflow Telemetry & Logs:</span>
                    <p className="text-slate-200 mt-0.5 bg-slate-900/60 p-2 rounded-lg border border-white/5 font-mono text-[11px] flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {item.workflow_evidence}
                    </p>
                  </div>
                </div>

                {item.verified_at && (
                  <div className="text-[10px] text-slate-500 text-right">
                    Verified Date: {item.verified_at}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>CREOVATE Verification ID: #CRV-{creator.id.toUpperCase().slice(-6)}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
}
