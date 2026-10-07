import React, { useState } from 'react';
import { X, Send, Lock, ShieldCheck, MessageSquare, CheckCircle2, Sparkles, Phone, Mail } from 'lucide-react';
import { ProofPassportBadge } from './ProofPassportBadge';

export function ContactCreatorModal({ isOpen, onClose, creator }) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Commercial Campaign Inquiry');
  const [budget, setBudget] = useState('$3,500 - $5,000');
  const [sent, setSent] = useState(false);

  React.useEffect(() => {
    if (creator) {
      setMessage(
        `Hi ${creator.name}, we reviewed your AI portfolio and verified workflow on Creovate AI. We have an upcoming commercial campaign and would like to discuss creative collaboration and availability.`
      );
    }
  }, [creator]);

  if (!isOpen || !creator) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0b101e] border border-cyan-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-100 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Contact {creator.name}</h2>
              <p className="text-xs text-slate-400">Secure platform messaging channel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Creator Identity & Privacy Shield Notice */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={creator.avatar_url}
              alt={creator.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{creator.name}</span>
                <ProofPassportBadge badge="Verified" size="sm" />
              </div>
              <p className="text-xs text-purple-300">{creator.specialization}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Rate</span>
            <span className="text-base font-bold font-mono text-white">${creator.hourly_rate}/hr</span>
          </div>
        </div>

        {/* Privacy Shield Standard */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>Creator Privacy Shield Active:</strong> To prevent unsolicited contact and protect creator privacy, direct personal phone numbers and private emails are shielded. Messages sent here are routed instantly to the creator's verified Creovate AI chat dashboard.
          </span>
        </div>

        {sent ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 text-emerald-300 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-base text-white">Inquiry Sent to {creator.name}!</h4>
            <p className="text-xs text-slate-300">The creator has been notified in their Creator Studio inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Inquiry Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Budget</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Campaign Message & Requirements *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white leading-relaxed focus:border-purple-500"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition-all hover:scale-102"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start Platform Chat</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
