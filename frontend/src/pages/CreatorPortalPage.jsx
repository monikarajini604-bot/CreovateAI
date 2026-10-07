import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Upload,
  PlusCircle,
  FileCode,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Film,
  FileText,
  Briefcase,
  Star,
  TrendingUp
} from 'lucide-react';
import { ProofPassportBadge } from '../components/ProofPassportBadge';
import { CreatorProfileEditor } from '../components/CreatorProfileEditor';

export function CreatorPortalPage({
  creator,
  briefs = [],
  engagements = [],
  onUpdateCreator,
  onNavigate,
  initialTab = 'dashboard'
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'dashboard');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [newSkill, setNewSkill] = useState('');
  const [newTool, setNewTool] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [newWorkflow, setNewWorkflow] = useState('');
  const [notification, setNotification] = useState('');

  if (!creator) return <div className="text-center py-20 text-slate-400">Loading creator studio...</div>;

  const handleSubmitProof = (e) => {
    e.preventDefault();
    if (!newSkill || !newTool) return;

    const newItem = {
      id: `ev-manual-${Date.now()}`,
      claimed_skill: newSkill,
      tool_model: newTool,
      portfolio_evidence: newEvidence || 'Production commercial artifact',
      workflow_evidence: newWorkflow || 'ComfyUI node configuration & prompt log',
      evidence_status: 'Verified Workflow',
      review_status: 'Verified by Production Audit',
      verified_at: new Date().toISOString().slice(0, 10)
    };

    const updated = {
      ...creator,
      evidence_passport: [newItem, ...(creator.evidence_passport || [])]
    };

    onUpdateCreator(updated);
    setNewSkill('');
    setNewTool('');
    setNewEvidence('');
    setNewWorkflow('');
    setNotification('New evidence item verified and added to your CREOVATE Trust Vault!');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-1.5">
            <UserCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>CREOVATE AI Creator Studio</span>
          </div>
          <h1 className="text-3xl font-bold font-heading text-white">{creator.name}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your AI portfolio, publish workflow evidence, and review inbound client engagements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ProofPassportBadge badge="Verified" size="md" />
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'dashboard', label: 'Creator Dashboard', icon: TrendingUp },
          { id: 'profile', label: 'My Profile', icon: UserCheck },
          { id: 'portfolio', label: `My AI Portfolio (${creator.portfolio?.length || 0})`, icon: Film },
          { id: 'tools', label: 'Skills & AI Tools', icon: Cpu },
          { id: 'passport', label: `Verification & Trust (${creator.evidence_passport?.length || 0})`, icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CREATOR DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Actions Bar */}
          <div className="p-4 rounded-2xl bg-[#0c1222] border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Creator Studio Quick Actions:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('profile')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Add Portfolio</span>
              </button>
              <button
                onClick={() => onNavigate && onNavigate('my-briefs')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>View Briefs</span>
              </button>
              <button
                onClick={() => onNavigate && onNavigate('engagements')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5 hover:scale-102"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Manage Engagements</span>
              </button>
            </div>
          </div>

          {/* 6 Creator Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Profile Completion</span>
              <div className="text-2xl font-extrabold text-white font-heading">96%</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Portfolio Views</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-heading">1,840</div>
              <span className="text-[10px] text-emerald-400 font-medium">+24% this week</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Brief Invitations</span>
              <div className="text-2xl font-extrabold text-purple-300 font-heading">
                {engagements.filter(e => e.status === 'Invited' || e.current_stage_index === 2).length || 2}
              </div>
              <span className="text-[10px] text-purple-400 font-medium">Pending Response</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Active Projects</span>
              <div className="text-2xl font-extrabold text-amber-400 font-heading">
                {engagements.filter(e => e.status !== 'Delivered' && e.status !== 'Completed').length || 1}
              </div>
              <span className="text-[10px] text-slate-500">In Production</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Completed Projects</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-heading">{creator.completed_projects}</div>
              <span className="text-[10px] text-amber-400 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                {creator.rating} Rating
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">New Opportunities</span>
              <div className="text-2xl font-extrabold text-white font-heading">{briefs.length}</div>
              <span className="text-[10px] text-emerald-400">Active Brand Briefs</span>
            </div>
          </div>

          {/* Available Opportunities & Active Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  New Opportunities (Brand Briefs)
                </h3>
                <span className="text-xs text-purple-400 font-mono">{briefs.length} Open</span>
              </div>

              <div className="space-y-3">
                {briefs.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{b.campaign_name}</span>
                      <span className="text-emerald-400 font-mono font-medium">{b.budget}</span>
                    </div>
                    <p className="text-slate-400 line-clamp-1">{b.objective}</p>
                    <div className="text-[11px] text-purple-300 pt-1 flex items-center justify-between">
                      <span>{b.content_type} • {b.aspect_ratio} • {b.duration}</span>
                      <span className="text-amber-400 font-medium">{b.deadline || '14 days'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  Active Projects & Invitations
                </h3>
                <span className="text-xs text-cyan-400 font-mono">{engagements.length} Tracked</span>
              </div>

              <div className="space-y-3">
                {engagements.map((e) => (
                  <div key={e.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{e.campaign_name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {e.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Brand: {e.brand_name} • Budget: {e.total_budget || e.budget}</p>
                    <button
                      onClick={() => onNavigate && onNavigate('engagements')}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Open Lifecycle Tracker →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PROFILE - MULTI-SECTION PROFESSIONAL CREATOR PROFILE BUILDER */}
      {activeTab === 'profile' && (
        <CreatorProfileEditor
          creator={creator}
          onSave={(updated) => {
            if (onUpdateCreator) onUpdateCreator(updated);
          }}
          onNavigate={onNavigate}
        />
      )}

      {/* TAB 3: PORTFOLIO */}
      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading">Published AI Portfolio Deliverables</h3>
            <button className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creator.portfolio?.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-[#0c1222] border border-white/10 space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <div className="text-[11px] text-purple-300 font-mono">{item.content_type} • {item.aspect_ratio}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TOOLS & SKILLS */}
      {activeTab === 'tools' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5 text-xs">
          <h3 className="text-base font-bold text-white font-heading">AI Models & Tools Stack</h3>

          <div className="space-y-3">
            <span className="text-slate-400 block">Verified Tools Active on Profile:</span>
            <div className="flex flex-wrap gap-2">
              {creator.tools?.map((tool, idx) => (
                <span key={idx} className="bg-purple-950/40 text-purple-200 px-3 py-1.5 rounded-xl font-mono border border-purple-500/30 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VERIFICATION & TRUST HUB */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          {/* Submit New Evidence Item Form */}
          <div className="p-6 rounded-3xl bg-[#0c1222] border border-purple-500/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Upload className="w-4 h-4 text-purple-400" />
              <span>Submit New Proof Telemetry & Artifact</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strengthen your client match rating by submitting verifiable node graphs, prompt pipelines, or raw batch seeds.
            </p>

            <form onSubmit={handleSubmitProof} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Claimed Technical Skill *</label>
                  <input
                    type="text"
                    required
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. Temporal LoRA Consistency"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">AI Tool / Model Stack *</label>
                  <input
                    type="text"
                    required
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    placeholder="e.g. Runway Gen-3 + Topaz Video AI"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Portfolio Deliverable Link</label>
                <input
                  type="text"
                  value={newEvidence}
                  onChange={(e) => setNewEvidence(e.target.value)}
                  placeholder="e.g. HydroLux Commercial cut (0:00-0:05 motion pass)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Workflow Telemetry / Raw Workflow Artifact</label>
                <input
                  type="text"
                  value={newWorkflow}
                  onChange={(e) => setNewWorkflow(e.target.value)}
                  placeholder="e.g. ComfyUI workflow JSON export or seed batch parameter logs"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition-all"
                >
                  Publish to Proof Passport
                </button>
              </div>
            </form>
          </div>

          {/* Current Passport Items */}
          <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Current Evidence Passport Items ({creator.evidence_passport?.length || 0})
            </h3>

            <div className="space-y-3">
              {creator.evidence_passport?.map((ev, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{ev.claimed_skill}</span>
                    <ProofPassportBadge badge={ev.evidence_status} size="sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                    <div className="p-2 rounded bg-black/40">
                      <span className="text-slate-500 block text-[10px]">Model:</span>
                      <span className="text-purple-300 font-mono">{ev.tool_model}</span>
                    </div>
                    <div className="p-2 rounded bg-black/40">
                      <span className="text-slate-500 block text-[10px]">Audit Note:</span>
                      <span className="text-emerald-400">{ev.review_status}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Workflow artifact:</strong> {ev.workflow_evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
