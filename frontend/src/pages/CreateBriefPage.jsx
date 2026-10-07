import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  Eye,
  Zap,
  ShieldCheck
} from 'lucide-react';

export function CreateBriefPage({ onSaveBrief, onFindBestCreators }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brand_name: 'Solaria Clean Tech',
    campaign_name: 'Solaria Home — Sustainable Energy Ad',
    objective: 'Produce a high-impact 20-second vertical social advertisement promoting Solaria smart residential batteries to eco-conscious homeowners.',
    description: 'We want a modern commercial capturing sleek home solar setups, vibrant morning sunlight, and animated neural power flow overlays.',
    target_audience: 'Homeowners aged 25-45 interested in clean energy, modern architecture, and smart tech.',
    content_type: 'AI Video',
    creative_style: 'Hyper-Realistic',
    platform: 'Instagram Reels / TikTok / YouTube Shorts',
    aspect_ratio: '9:16',
    duration: '20 seconds',
    required_tools: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'Topaz Video AI'],
    commercial_use_req: 'Full commercial buyout with global digital ad distribution rights',
    licensing_req: 'Perpetual commercial license, no recurring royalties',
    budget: '$3,500 - $5,000',
    deadline: '14 business days',
    deliverables: [
      '1x 20-second master commercial (9:16, 4K 60fps)',
      '3x 5-second vertical hook variations for A/B testing',
      'Full commercial buyout rights & prompt reproducibility seed log'
    ],
    additional_notes: 'Prioritize crisp photoreal lighting, sun rays, fluid architectural transitions, and zero generative artifacts.'
  });

  const [toolInput, setToolInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTool = () => {
    if (toolInput.trim() && !formData.required_tools.includes(toolInput.trim())) {
      setFormData(prev => ({ ...prev, required_tools: [...prev.required_tools, toolInput.trim()] }));
      setToolInput('');
    }
  };

  const handleRemoveTool = (tool) => {
    setFormData(prev => ({ ...prev, required_tools: prev.required_tools.filter(t => t !== tool) }));
  };

  const handleSubmit = async (findMatches = false) => {
    const saved = await onSaveBrief(formData);
    if (findMatches && onFindBestCreators) {
      onFindBestCreators(saved?.id || 'brief-new', formData);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-1.5">
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>Brand Creative Brief Studio</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-white">Create Structured Creative Brief</h1>
        <p className="text-xs text-slate-400 mt-1">
          Specify your campaign requirements, AI tool stack, and commercial licensing guidelines for instant creator matching
        </p>
      </div>

      {/* Stepper Bar */}
      <div className="grid grid-cols-4 gap-2 text-xs font-medium">
        {[
          { num: 1, title: 'Campaign Core' },
          { num: 2, title: 'Style & AI Tools' },
          { num: 3, title: 'Commercial & Budget' },
          { num: 4, title: 'Structured Preview' }
        ].map(step => (
          <button
            key={step.num}
            onClick={() => setCurrentStep(step.num)}
            className={`p-3 rounded-xl border text-left transition-all ${
              currentStep === step.num
                ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                : currentStep > step.num
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-900 border-white/5 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              {currentStep > step.num ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span>Step {step.num}</span>
              )}
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{step.title}</div>
          </button>
        ))}
      </div>

      {/* STEP 1: CAMPAIGN CORE */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
          <h2 className="text-lg font-bold font-heading text-white">1. Project & Campaign Core</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Brand / Agency Name *</label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                placeholder="e.g. Solaria Clean Tech"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Project / Campaign Name *</label>
              <input
                type="text"
                name="campaign_name"
                value={formData.campaign_name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 font-bold"
                placeholder="e.g. Solaria Home — Sustainable Energy Ad"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Campaign Objective *</label>
              <textarea
                rows={2}
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                placeholder="Primary marketing goal and desired viewer action..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Detailed Creative Description</label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                placeholder="Visual direction, key shots, visual metaphors, and brand guidelines..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Target Audience</label>
              <input
                type="text"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                placeholder="e.g. Tech-forward homeowners (25-45), renewable energy adopters"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-md"
            >
              <span>Next: Style & AI Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CONTENT, STYLE & AI TOOLS */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
          <h2 className="text-lg font-bold font-heading text-white">2. Content, Style & AI Tooling</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Content Type</label>
              <select
                name="content_type"
                value={formData.content_type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="AI Video">AI Video</option>
                <option value="Animation">Animation</option>
                <option value="Social Media Content">Social Media Content</option>
                <option value="Product Visualization">Product Visualization</option>
                <option value="Advertisement">Advertisement</option>
                <option value="AI Image">AI Image</option>
                <option value="3D Content">3D Content</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Creative Style</label>
              <select
                name="creative_style"
                value={formData.creative_style}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Cinematic">Cinematic</option>
                <option value="Minimal">Minimal</option>
                <option value="Futuristic">Futuristic</option>
                <option value="Luxury">Luxury</option>
                <option value="Realistic">Realistic</option>
                <option value="Surreal">Surreal</option>
                <option value="Editorial">Editorial</option>
                <option value="Experimental">Experimental</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Aspect Ratio</label>
              <select
                name="aspect_ratio"
                value={formData.aspect_ratio}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="16:9">16:9</option>
                <option value="9:16">9:16</option>
                <option value="1:1">1:1</option>
                <option value="4:5">4:5</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 font-mono"
                placeholder="e.g. 20 seconds"
              />
            </div>

            <div className="col-span-2 md:col-span-4">
              <label className="block text-slate-300 font-semibold mb-1">Target Platform</label>
              <input
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                placeholder="e.g. Instagram Reels, TikTok, YouTube Shorts"
              />
            </div>

            {/* AI Tools Tag Input */}
            <div className="col-span-2 md:col-span-4 space-y-2">
              <label className="block text-slate-300 font-semibold">Preferred AI Tools & Models</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTool(); } }}
                  placeholder="e.g. Runway Gen-3, Midjourney v6, ComfyUI, Kling AI..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddTool}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs"
                >
                  Add Tool
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {formData.required_tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-950/40 text-purple-200 border border-purple-500/30 flex items-center gap-1.5"
                  >
                    <span>{tool}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTool(tool)}
                      className="text-purple-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
            >
              Previous Step
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-md"
            >
              <span>Next: Commercial & Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: COMMERCIAL & BUDGET */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
          <h2 className="text-lg font-bold font-heading text-white">3. Commercial Rights, Budget & Deadline</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Commercial-Use Requirement *</label>
              <select
                name="commercial_use_req"
                value={formData.commercial_use_req}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Commercial License Required">Commercial License Required</option>
                <option value="Organic Social Only">Organic Social Only</option>
                <option value="Full Commercial Rights">Full Commercial Rights</option>
                <option value="Usage Rights To Be Discussed">Usage Rights To Be Discussed</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Licensing Terms *</label>
              <input
                type="text"
                name="licensing_req"
                value={formData.licensing_req}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                placeholder="Perpetual commercial license, no recurring royalties"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Estimated Budget *</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 font-mono"
                placeholder="e.g. $3,500 - $5,000"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Completion Deadline *</label>
              <input
                type="text"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                placeholder="e.g. 14 business days"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Additional Style or Negative Prompt Constraints</label>
              <input
                type="text"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-purple-500"
                placeholder="e.g. No uncanny human hands, clean vector packaging, authentic physics"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
            >
              Previous Step
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span>Review Structured Preview</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: STRUCTURED PREVIEW & SUBMISSION */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-purple-500/40 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {formData.content_type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300">
                  {formData.creative_style}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {formData.aspect_ratio} ({formData.duration})
                </span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-white mt-1.5">{formData.campaign_name}</h2>
              <p className="text-xs text-purple-300 font-medium">Brand: {formData.brand_name}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSubmit(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSubmit(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Submit & Find Best Creators</span>
              </button>
            </div>
          </div>

          {/* Structured Summary Cards */}
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campaign Objective</span>
              <p className="text-slate-200 leading-relaxed">{formData.objective}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Creative Direction & Visual Metaphors</span>
              <p className="text-slate-300 leading-relaxed">{formData.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-0.5">Budget</span>
                <span className="text-emerald-400 font-mono font-bold">{formData.budget}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-0.5">Deadline</span>
                <span className="text-white">{formData.deadline}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-0.5">Platform</span>
                <span className="text-white truncate block">{formData.platform}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-0.5">Target Audience</span>
                <span className="text-slate-300 truncate block">{formData.target_audience}</span>
              </div>
            </div>

            {/* AI Tools & Commercial Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                <span className="text-purple-400 font-semibold uppercase text-[11px] block">Required AI Toolstack</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.required_tools.map((t, idx) => (
                    <span key={idx} className="bg-black/50 text-purple-200 px-2 py-0.5 rounded font-mono text-[11px] border border-purple-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                <span className="text-emerald-400 font-semibold uppercase text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Commercial Licensing Requirements
                </span>
                <div className="text-slate-300 text-[11px]">{formData.commercial_use_req}</div>
                <div className="text-slate-400 text-[10px]">{formData.licensing_req}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
            >
              Back to Edit
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/40 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Submit & Find Best Creators</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
