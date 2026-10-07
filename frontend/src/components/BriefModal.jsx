import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export function BriefModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState(() => ({
    brand_name: initialData?.brand_name || 'EcoSip',
    campaign_name: initialData?.campaign_name || '',
    objective: initialData?.objective || '',
    target_audience: initialData?.target_audience || '',
    content_type: initialData?.content_type || 'AI Video',
    creative_style: initialData?.creative_style || 'Hyper-Realistic',
    platform: initialData?.platform || 'Instagram Reels / TikTok / YouTube Shorts',
    aspect_ratio: initialData?.aspect_ratio || '9:16',
    duration: initialData?.duration || '20 seconds',
    deliverables: initialData?.deliverables ? initialData.deliverables.join('\n') : '1x Master 20-second commercial (9:16, 4K 60fps)\n3x 5-second vertical hook variations\nCommercial IP Assignment Certificate',
    deadline: initialData?.deadline || '14 business days',
    budget: initialData?.budget || '$3,500 - $5,000',
    commercial_use_req: initialData?.commercial_use_req || 'Full commercial buyout with global digital ad distribution rights',
    licensing_req: initialData?.licensing_req || 'Perpetual commercial license, no recurring royalties',
    additional_notes: initialData?.additional_notes || ''
  }));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        brand_name: initialData.brand_name || 'EcoSip',
        campaign_name: initialData.campaign_name || '',
        objective: initialData.objective || '',
        target_audience: initialData.target_audience || '',
        content_type: initialData.content_type || 'AI Video',
        creative_style: initialData.creative_style || 'Hyper-Realistic',
        platform: initialData.platform || 'Instagram Reels / TikTok / YouTube Shorts',
        aspect_ratio: initialData.aspect_ratio || '9:16',
        duration: initialData.duration || '20 seconds',
        deliverables: initialData.deliverables ? initialData.deliverables.join('\n') : '1x Master 20-second commercial (9:16, 4K 60fps)\n3x 5-second vertical hook variations\nCommercial IP Assignment Certificate',
        deadline: initialData.deadline || '14 business days',
        budget: initialData.budget || '$3,500 - $5,000',
        commercial_use_req: initialData.commercial_use_req || 'Full commercial buyout with global digital ad distribution rights',
        licensing_req: initialData.licensing_req || 'Perpetual commercial license, no recurring royalties',
        additional_notes: initialData.additional_notes || ''
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.campaign_name.trim() || !formData.objective.trim()) {
      setError('Campaign name and objective are required.');
      return;
    }
    setError('');
    setSubmitting(true);

    const payload = {
      ...formData,
      deliverables: formData.deliverables.split('\n').filter(d => d.trim().length > 0)
    };

    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      setError('Failed to save brief. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0b101e] border border-purple-500/30 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              {initialData ? 'Edit Creative Brief' : 'New Structured Creative Brief'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Define detailed AI-native campaign deliverables, commercial terms, and style requirements
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="my-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Brand & Campaign */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Brand / Client Name *</label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. EcoSip"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Campaign Name *</label>
              <input
                type="text"
                name="campaign_name"
                value={formData.campaign_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. Pure Hydration 2026 Commercial"
              />
            </div>
          </div>

          {/* Objective */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Campaign Objective *</label>
            <textarea
              name="objective"
              rows={2}
              value={formData.objective}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="Describe primary commercial goal, hook message, and desired viewer action..."
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Audience</label>
            <input
              type="text"
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="e.g. Gen-Z & Millennial urban eco-conscious consumers (18-34)"
            />
          </div>

          {/* Formats, Styles, Tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Content Type</label>
              <select
                name="content_type"
                value={formData.content_type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
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
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
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
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
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
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. 20 seconds"
              />
            </div>
          </div>

          {/* Platform & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Platforms</label>
              <input
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. Instagram Reels, TikTok, YouTube Shorts"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Budget Allocation</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. $3,500 - $5,000"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Deadline</label>
              <input
                type="text"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. 14 business days"
              />
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Deliverables (one per line)</label>
            <textarea
              name="deliverables"
              rows={2}
              value={formData.deliverables}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs font-mono"
            />
          </div>

          {/* Commercial Use & Licensing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
            <div>
              <label className="block text-purple-300 font-semibold mb-1">Commercial-Use Requirement</label>
              <select
                name="commercial_use_req"
                value={formData.commercial_use_req}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
              >
                <option value="Commercial License Required">Commercial License Required</option>
                <option value="Organic Social Only">Organic Social Only</option>
                <option value="Full Commercial Rights">Full Commercial Rights</option>
                <option value="Usage Rights To Be Discussed">Usage Rights To Be Discussed</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 font-semibold mb-1">Licensing Terms</label>
              <input
                type="text"
                name="licensing_req"
                value={formData.licensing_req}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
                placeholder="Perpetual commercial license, no recurring royalties"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Additional Style & Prompt Notes</label>
            <input
              type="text"
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="e.g. Must feature dynamic water condensation, clean nature transitions"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 text-xs disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Creative Brief'}
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
