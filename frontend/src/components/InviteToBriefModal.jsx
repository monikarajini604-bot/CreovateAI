import React, { useState } from 'react';
import { X, Send, Sparkles, ShieldCheck, CheckCircle2, Clock, DollarSign, Calendar } from 'lucide-react';
import { ProofPassportBadge } from './ProofPassportBadge';

export function InviteToBriefModal({
  isOpen,
  onClose,
  creator,
  briefs = [],
  onConfirmInvite
}) {
  const [selectedBriefId, setSelectedBriefId] = useState(briefs[0]?.id || '');
  const [customMessage, setCustomMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (briefs.length > 0 && !selectedBriefId) {
      setSelectedBriefId(briefs[0]?.id || '');
    }
  }, [briefs, selectedBriefId]);

  React.useEffect(() => {
    if (creator) {
      setCustomMessage(
        `Hi ${creator.name}, we reviewed your AI portfolio and verified workflow. We would like to invite you to collaborate on our upcoming campaign brief.`
      );
    }
  }, [creator]);

  if (!isOpen || !creator) return null;

  const selectedBrief = briefs.find(b => b.id === selectedBriefId) || briefs[0];

  const handleSendInvite = async () => {
    setSubmitting(true);
    try {
      if (onConfirmInvite) {
        await onConfirmInvite(creator, selectedBrief, customMessage);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b101e] border border-purple-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Invite to Creative Brief</h2>
              <p className="text-xs text-slate-400">Send an official invitation and initiate production tracking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Creator Snapshot Card */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={creator.avatar_url}
              alt={creator.name}
              className="w-13 h-13 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{creator.name}</h3>
                <ProofPassportBadge badge={creator.verification_badges?.[0] || 'Verified'} size="sm" />
              </div>
              <p className="text-xs text-purple-300">{creator.specialization} • {creator.location || 'Remote'}</p>
              <p className="text-[11px] text-emerald-400 font-medium mt-0.5">{creator.commercial_use || 'Commercial Ready'}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Creator Rate</span>
            <span className="text-lg font-bold font-mono text-white">${creator.hourly_rate}/hr</span>
          </div>
        </div>

        {/* Brief Selection */}
        <div className="mt-5 space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Active Campaign Brief *
          </label>

          {briefs.length > 0 ? (
            <div className="space-y-2">
              <select
                value={selectedBriefId}
                onChange={(e) => setSelectedBriefId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 font-semibold"
              >
                {briefs.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.campaign_name} — {b.budget} ({b.content_type})
                  </option>
                ))}
              </select>

              {/* Selected Brief Summary */}
              {selectedBrief && (
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{selectedBrief.campaign_name}</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedBrief.budget}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                    {selectedBrief.objective}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-purple-300 font-mono pt-1 border-t border-white/5">
                    <span>{selectedBrief.content_type}</span>
                    <span>•</span>
                    <span>{selectedBrief.aspect_ratio}</span>
                    <span>•</span>
                    <span>{selectedBrief.duration}</span>
                    <span>•</span>
                    <span className="text-amber-400">Deadline: {selectedBrief.deadline || '14 business days'}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-400">
              No active briefs found. A new default engagement will be created for {creator.name}.
            </div>
          )}
        </div>

        {/* Invitation Message Note */}
        <div className="mt-4 space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Invitation Note & Project Requirements
          </label>
          <textarea
            rows={3}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500 leading-relaxed"
          />
        </div>

        {/* Commercial Terms Notice */}
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Engagement Milestone:</strong> Sending this invitation advances the project to <strong>Invited (Stage 3/7)</strong> with commercial rights buyout escrow.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSendInvite}
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all hover:scale-102 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Sending...' : 'Send Brief Invitation'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
