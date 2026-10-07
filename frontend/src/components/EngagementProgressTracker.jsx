import React from 'react';
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, FileCheck2, Sparkles, MessageSquare } from 'lucide-react';

const STAGES = [
  { name: "Discovery", desc: "Creator identified & matched" },
  { name: "Shortlisted", desc: "Saved to campaign roster" },
  { name: "Invited", desc: "Official brief invitation sent" },
  { name: "Accepted", desc: "Terms & buyout agreed" },
  { name: "In Progress", desc: "Active generative production" },
  { name: "Review", desc: "Client feedback & grade" },
  { name: "Delivered", desc: "Master assets & IP handover" }
];

export function EngagementProgressTracker({ engagement, onAdvanceStage = null, onOpenChat = null }) {
  if (!engagement) return null;

  const currentIdx = engagement.current_stage_index !== undefined ? engagement.current_stage_index : 4;

  return (
    <div className="p-5 rounded-2xl bg-[#0e1424] border border-purple-500/20 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-0.5">
            Engagement Lifecycle Tracker
          </span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {engagement.campaign_name}
          </h3>
          <p className="text-xs text-slate-400">
            Brand: <span className="text-white font-medium">{engagement.brand_name}</span> • Creator: <span className="text-purple-300 font-medium">{engagement.creator_name}</span> • Budget: <span className="text-emerald-400 font-mono font-medium">{engagement.total_budget}</span>
            {engagement.deadline && <> • Deadline: <span className="text-amber-400 font-medium">{engagement.deadline}</span></>}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenChat && (
            <button
              onClick={() => onOpenChat({
                engagement_id: engagement.id,
                creator_id: engagement.creator_id,
                creator_name: engagement.creator_name,
                creator_avatar: engagement.creator_avatar,
                brand_id: engagement.brand_id,
                brand_name: engagement.brand_name,
                campaign_name: engagement.campaign_name
              })}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Open direct private chat for this campaign"
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open Chat</span>
            </button>
          )}

          {onAdvanceStage && currentIdx < 6 && (
            <button
              onClick={() => onAdvanceStage(engagement.id, currentIdx + 1)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all hover:scale-102"
            >
              Advance to "{STAGES[currentIdx + 1].name}"
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Visual Stepper (7 Stages) */}
      <div className="grid grid-cols-7 gap-1.5 pt-2">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isPending = idx > currentIdx;

          let circleStyle = "bg-slate-800 border-slate-700 text-slate-500";
          let barStyle = "bg-slate-800";
          let textColor = "text-slate-500";

          if (isDone) {
            circleStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
            barStyle = "bg-emerald-500";
            textColor = "text-emerald-400";
          } else if (isCurrent) {
            circleStyle = "bg-purple-600 border-purple-400 text-white ring-4 ring-purple-500/20 animate-pulse-subtle";
            barStyle = "bg-purple-600";
            textColor = "text-purple-300 font-semibold";
          }

          return (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              {/* Connector line */}
              {idx < 6 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 transition-all duration-300 ${
                    idx < currentIdx ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                />
              )}

              {/* Node Circle */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${circleStyle}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Stage labels */}
              <div className="mt-2 space-y-0.5">
                <div className={`text-xs ${textColor}`}>{stage.name}</div>
                <div className="text-[10px] text-slate-500 hidden sm:block leading-tight">{stage.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliverables & Milestones Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] block">
            Contracted Deliverables ({engagement.deliverables?.length || 0})
          </span>
          <div className="space-y-1.5">
            {engagement.deliverables?.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] block">
            Commercial Rights Status
          </span>
          <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 text-purple-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-medium">{engagement.commercial_license_status}</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
            <span>Last Updated: {engagement.updated_at ? String(engagement.updated_at).slice(0, 10) : 'Active'}</span>
            <span className="text-emerald-400 font-medium">Smart Contract ID: #ENG-{String(engagement.id || '').slice(-6).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
