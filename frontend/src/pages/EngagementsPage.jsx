import React, { useState } from 'react';
import { Briefcase, CheckCircle2, Clock, ShieldCheck, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { EngagementProgressTracker } from '../components/EngagementProgressTracker';

export function EngagementsPage({
  engagements,
  onAdvanceStage,
  onOpenChat
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const STAGE_NAMES = ["Discovery", "Shortlisted", "Invited", "Accepted", "In Progress", "Review", "Delivered"];

  const filteredEngagements = engagements.filter(e => {
    if (filterStatus === 'ALL') return true;
    const currentStageName = STAGE_NAMES[e.current_stage_index] || e.status;
    return e.status?.toLowerCase() === filterStatus.toLowerCase() ||
           currentStageName?.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-white">Campaign Engagements</h1>
        <p className="text-xs text-slate-400 mt-1">
          Track end-to-end production engagements from initial discovery through milestone delivery and IP release
        </p>
      </div>

      {/* Brief -> Delivery Traceability Visualizer */}
      <div className="p-6 rounded-3xl bg-[#0c1222] border border-purple-500/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
          <Sparkles className="w-4 h-4" />
          <span>Marketplace Traceability Pipeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 text-xs text-center font-medium">
          {[
            { step: '1. Discovery', desc: 'Requirements defined' },
            { step: '2. Shortlisted', desc: 'Candidate roster' },
            { step: '3. Invited', desc: 'Brief invitation' },
            { step: '4. Accepted', desc: 'Terms & budget agreed' },
            { step: '5. In Progress', desc: 'Generative production' },
            { step: '6. Review', desc: 'Feedback & upscale' },
            { step: '7. Delivered', desc: 'Commercial IP buyout' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1 hover:border-purple-500/40 transition-colors"
            >
              <div className="text-white font-bold">{item.step}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {['ALL', ...STAGE_NAMES].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === status
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {status === 'ALL' ? `All (${engagements.length})` : status}
          </button>
        ))}
      </div>

      {/* Engagements List */}
      <div className="space-y-6">
        {filteredEngagements.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Engagements Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Initiate an engagement from the Explore Creators page or Smart Matches.
            </p>
          </div>
        ) : (
          filteredEngagements.map((eng) => (
            <EngagementProgressTracker
              key={eng.id}
              engagement={eng}
              onAdvanceStage={onAdvanceStage}
              onOpenChat={onOpenChat}
            />
          ))
        )}
      </div>
    </div>
  );
}
