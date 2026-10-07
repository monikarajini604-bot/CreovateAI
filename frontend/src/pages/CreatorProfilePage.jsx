import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Briefcase,
  Layers,
  Cpu,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
  FileCheck,
  Eye,
  Film,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Lock,
  Camera
} from 'lucide-react';
import { ProofPassportBadge } from '../components/ProofPassportBadge';
import { ContactCreatorModal } from '../components/ContactCreatorModal';
import { ProfilePhotoUploadModal } from '../components/ProfilePhotoUploadModal';

export function CreatorProfilePage({
  creator,
  isShortlisted,
  onToggleShortlist,
  onOpenProofPassport,
  onOpenPortfolio,
  onInitiateEngagement,
  onOpenChat,
  onUpdateCreator
}) {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'workflow' | 'verification'
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  if (!creator) return <div className="text-center py-20 text-slate-400">Creator profile not found.</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              onClick={() => setIsPhotoModalOpen(true)}
              className="relative group cursor-pointer"
              title="Click to take photo or choose from device"
            >
              <img
                src={creator.avatar_url}
                alt={creator.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-500/30 shadow-glow group-hover:ring-purple-400 group-hover:opacity-90 transition-all"
              />
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
                <span className="text-[10px] text-white font-medium mt-1">Upload</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#0c1222]" title="Available" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">{creator.name}</h1>
                <ProofPassportBadge badge="Verified" size="md" onClick={() => onOpenProofPassport(creator)} />
              </div>

              <p className="text-xs sm:text-sm text-purple-300 font-medium">{creator.headline}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="text-white font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {creator.rating}
                </span>
                <span>•</span>
                <span>{creator.completed_projects} projects completed</span>
                <span>•</span>
                <span>{creator.experience_years} years AI experience</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">${creator.hourly_rate}/hr</span>
                <span>•</span>
                <span className="text-cyan-300 font-medium">{creator.availability || 'Available Now'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => {
                if (onOpenChat) {
                  onOpenChat({
                    creator_id: creator.id,
                    creator_name: creator.name,
                    creator_avatar: creator.avatar_url
                  });
                } else {
                  setIsContactModalOpen(true);
                }
              }}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/40 hover:to-indigo-600/40 text-purple-200 border border-purple-500/40 flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-102"
              title="Open Private Chat with Creator (Phone & Email Shielded)"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Message Creator</span>
            </button>

            <button
              onClick={() => onToggleShortlist(creator.id)}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                isShortlisted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-rose-400' : ''}`} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              onClick={() => onInitiateEngagement(creator)}
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <Briefcase className="w-4 h-4" />
              <span>Invite to Brief</span>
            </button>
          </div>
        </div>

        {/* Verification Badges Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 mr-2">Trust Credentials:</span>
          {(creator.verification_badges || ["Verified Tools", "Verified Portfolio", "Verified Workflow", "Commercial Use Available"]).map((badge, idx) => (
            <ProofPassportBadge key={idx} badge={badge} size="sm" onClick={() => onOpenProofPassport(creator)} />
          ))}
        </div>

        {/* Bio & Commercial Terms strip */}
        <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">About Creator</span>
            <p className="text-slate-300 leading-relaxed">{creator.bio}</p>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                AI Toolstack & Models Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {creator.tools.map((tool, idx) => (
                  <span key={idx} className="bg-black/50 text-purple-200 px-2.5 py-1 rounded font-mono text-xs border border-purple-500/20">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Commercial Rights & Clearance
            </span>
            <div className="space-y-1 text-slate-300">
              <div><strong className="text-white">Status:</strong> {creator.commercial_use}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{creator.licensing_terms}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'portfolio', label: `AI Portfolios (${creator.portfolio?.length || 0})`, icon: Film },
          { id: 'workflow', label: '6-Stage AI Workflow Transparency', icon: Layers },
          { id: 'verification', label: `Verification Audit & Telemetry (${creator.evidence_passport?.length || 0})`, icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AI PORTFOLIO CARDS */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creator.portfolio?.map((item) => (
              <div
                key={item.id}
                className="group p-5 rounded-3xl bg-[#0c1222] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div
                  onClick={() => onOpenPortfolio(item)}
                  className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/5 cursor-pointer"
                >
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/70 text-purple-300 backdrop-blur-sm border border-white/10">
                      {item.content_type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-black/70 text-slate-300 backdrop-blur-sm border border-white/10">
                      {item.aspect_ratio}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3
                    onClick={() => onOpenPortfolio(item)}
                    className="font-bold text-white text-base group-hover:text-purple-400 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {item.tools_used?.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="bg-black/50 px-2 py-0.5 rounded font-mono text-[10px] text-purple-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenPortfolio(item)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold text-xs flex items-center gap-1"
                  >
                    <span>View Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: WORKFLOW TRANSPARENCY */}
      {activeTab === 'workflow' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 space-y-6">
          <div>
            <h3 className="text-xl font-bold font-heading text-white">AI-Native Production Pipeline</h3>
            <p className="text-xs text-slate-400">
              Reproducible 6-stage workflow documenting human-in-the-loop direction, generative synthesis, and post-enhancement
            </p>
          </div>

          <div className="space-y-4">
            {creator.workflows?.map((wf, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 font-bold font-mono flex items-center justify-center shrink-0 border border-purple-500/30">
                    {wf.step_number}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{wf.name}</h4>
                    <p className="text-xs text-slate-300">{wf.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0 self-start md:self-auto">
                  {wf.tools?.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-black/40 text-purple-300 text-[11px] font-mono border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFICATION SIGNALS */}
      {activeTab === 'verification' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold font-heading text-white">Verification & Trust Records</h3>
              <p className="text-xs text-slate-400">
                Audited evidence items, model seeds, and reproducibility telemetry in CREOVATE Trust Vault
              </p>
            </div>
            <button
              onClick={() => onOpenProofPassport(creator)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
            >
              Open Full Proof Passport
            </button>
          </div>

          <div className="space-y-3.5">
            {creator.evidence_passport?.map((ev, i) => (
              <div
                key={ev.id || i}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{ev.claimed_skill}</span>
                  <ProofPassportBadge badge={ev.evidence_status} size="sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <strong className="text-slate-400 block mb-0.5">Tool / Model Stack:</strong>
                    <span className="text-purple-300 font-mono">{ev.tool_model}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <strong className="text-slate-400 block mb-0.5">Verification Note:</strong>
                    <span className="text-emerald-400">{ev.review_status}</span>
                  </div>
                </div>
                <div className="pt-1 text-slate-400">
                  <strong>Workflow Telemetry Evidence:</strong> {ev.workflow_evidence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Secure Contact Modal protecting private contact data */}
      <ContactCreatorModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        creator={creator}
      />

      {/* Profile Photo Upload Modal (Take Photo or Choose From Device) */}
      <ProfilePhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSavePhoto={(newPhotoUrl) => {
          if (onUpdateCreator) {
            onUpdateCreator({ ...creator, avatar_url: newPhotoUrl });
          }
        }}
        currentPhotoUrl={creator.avatar_url}
      />
    </div>
  );
}
