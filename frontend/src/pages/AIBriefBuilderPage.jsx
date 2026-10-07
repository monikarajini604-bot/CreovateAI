import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Zap,
  CheckCircle2,
  Edit3,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { api } from '../services/api';

const SAMPLE_PROMPTS = [
  {
    title: "Electric Car Launch Video",
    text: "I need a futuristic product launch video for a new electric car."
  },
  {
    title: "Clean Tech Social Commercial",
    text: "Produce a high-impact 20-second vertical social advertisement promoting smart residential solar glass panels."
  },
  {
    title: "Luxury Skincare Still Life",
    text: "A suite of 10 photorealistic commercial studio visuals showing an organic glass dropper bottle with 100% bottle label consistency."
  }
];

export function AIBriefBuilderPage({ onSaveBrief, onFindBestCreators }) {
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0].text);
  const [brandName, setBrandName] = useState('Solaria Brands');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [briefForm, setBriefForm] = useState(null);
  const [notification, setNotification] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setNotification('');

    try {
      const res = await api.generateAIBrief(prompt, brandName);
      setBriefForm(res.structured_brief);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to generate brief:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setBriefForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUseThisBrief = async () => {
    if (!briefForm) return;
    const saved = await onSaveBrief(briefForm);
    setNotification('Structured brief saved! Loading smart creator matches...');
    if (onFindBestCreators) {
      setTimeout(() => {
        onFindBestCreators(saved?.id || 'brief-ai-generated', briefForm);
      }, 600);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AI-Assisted Brief Builder</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-white">
          Compile Creative Concepts into AI Production Briefs
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Enter a rough campaign idea. Our neural brief compiler synthesizes structured objectives, duration, aspect ratios, model requirements, and commercial licensing guidelines.
        </p>
      </div>

      {/* Input Prompt Card */}
      <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Brand / Client Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. Solaria Brands"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Quick Sample Prompts</label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(p.text)}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/20 transition-all text-left truncate max-w-[240px]"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Campaign Idea / Marketing Goal
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I need a short social media advertisement for an eco-friendly product..."
            className="w-full p-4 rounded-xl bg-slate-900/90 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-400">
            Automatically architects duration, deliverables, AI tools & commercial rights.
          </span>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-102 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Compiling AI Brief...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Brief</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Structured Brief Output Form */}
      {briefForm && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-purple-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {briefForm.content_type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                    {briefForm.creative_style}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    {briefForm.aspect_ratio} ({briefForm.duration})
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{briefForm.campaign_name}</h3>
                <p className="text-xs text-slate-400">Structured AI production brief synthesized for {briefForm.brand_name}</p>
              </div>

              {/* Three Explicit Buttons: Regenerate, Edit Brief, Use This Brief */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    isEditing
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Save Changes' : 'Edit Brief'}</span>
                </button>

                <button
                  onClick={handleUseThisBrief}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all hover:scale-102"
                >
                  <Zap className="w-4 h-4" />
                  <span>Use This Brief</span>
                </button>
              </div>
            </div>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block text-slate-400 font-semibold mb-1">Campaign Objective</label>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={briefForm.objective}
                    onChange={(e) => handleFieldChange('objective', e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200 leading-relaxed">
                    {briefForm.objective}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 font-semibold mb-1">Target Audience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={briefForm.target_audience}
                    onChange={(e) => handleFieldChange('target_audience', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-300">
                    {briefForm.target_audience}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Platform</label>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-white">
                    {briefForm.platform}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Budget Allocation</label>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-emerald-400 font-mono font-medium">
                    {briefForm.budget}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Aspect Ratio</label>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-white font-mono">
                    {briefForm.aspect_ratio}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Duration</label>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-white font-mono">
                    {briefForm.duration}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 font-semibold mb-1">Suggested Creator Deliverables</label>
                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
                  {briefForm.deliverables?.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-200 font-mono text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <span className="text-purple-300 font-semibold block mb-1">Commercial-Use Terms</span>
                <span className="text-slate-200 text-[11px]">{briefForm.commercial_use_req}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <span className="text-purple-300 font-semibold block mb-1">Licensing Clearance</span>
                <span className="text-slate-200 text-[11px]">{briefForm.licensing_req}</span>
              </div>
            </div>

            {/* Bottom Primary Action Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Ready to match with vetted AI video creators & animators.
              </span>

              <button
                onClick={handleUseThisBrief}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Use This Brief</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
