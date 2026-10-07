import React, { useState, useEffect } from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Globe,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  Edit3,
  Save,
  MessageSquare,
  Lock,
  Mail,
  UserCheck,
  ArrowRight,
  Plus,
  FileText,
  Camera
} from 'lucide-react';
import { BrandVerificationModal } from '../components/BrandVerificationModal';
import { ProfilePhotoUploadModal } from '../components/ProfilePhotoUploadModal';

export const COMPANY_TYPES = [
  'Brand',
  'Creative Agency',
  'Advertising Agency',
  'Production Company',
  'Startup',
  'Marketing Agency',
  'Entertainment Company',
  'Other'
];

export const INDUSTRY_OPTIONS = [
  'Advertising',
  'Fashion',
  'Technology',
  'Automotive',
  'Gaming',
  'E-commerce',
  'Entertainment',
  'Education',
  'Healthcare',
  'Finance',
  'Media'
];

export const SERVICE_OPTIONS = [
  'Advertising',
  'Social Media Marketing',
  'Product Marketing',
  'Film Production',
  'Branding',
  'Creative Direction',
  'Content Production',
  'AI Content',
  'Digital Marketing'
];

export const CONTENT_TYPE_OPTIONS = [
  'AI Video',
  'AI Animation',
  'AI Images',
  '3D Content',
  'Motion Graphics',
  'Product Visualization',
  'Social Media Content',
  'Advertisement',
  'Short Film'
];

export const AI_TOOL_OPTIONS = [
  'Runway Gen-3 Alpha',
  'Sora',
  'Kling 1.5',
  'Midjourney v6.1',
  'Adobe Firefly',
  'Stable Diffusion',
  'ComfyUI',
  'Topaz Video AI',
  'Spline AI'
];

export function BrandProfilePage({
  brand,
  briefs = [],
  onUpdateBrand,
  onOpenChat,
  onNavigate,
  isOwnProfile = true
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(brand || {});
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (brand) setFormData(brand);
  }, [brand]);

  if (!brand) {
    return <div className="text-center py-20 text-slate-400">Brand profile not found.</div>;
  }

  // Active briefs for this brand
  const brandBriefs = briefs.filter(b => b.brand_id === brand.id || b.brand_name === brand.name);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...(prev.contact_info || {}),
        [field]: value
      }
    }));
  };

  const handleContactPersonChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...(prev.contact_info || {}),
        contact_person: {
          ...((prev.contact_info && prev.contact_info.contact_person) || {}),
          [field]: value
        }
      }
    }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const arr = prev[field] || [];
      const updated = arr.includes(item)
        ? arr.filter(i => i !== item)
        : [...arr, item];
      return { ...prev, [field]: updated };
    });
  };

  const toggleHiringRequirement = (subField, item) => {
    setFormData(prev => {
      const hiring = prev.hiring_requirements || {};
      const arr = hiring[subField] || [];
      const updated = arr.includes(item)
        ? arr.filter(i => i !== item)
        : [...arr, item];
      return {
        ...prev,
        hiring_requirements: {
          ...hiring,
          [subField]: updated
        }
      };
    });
  };

  const handleSave = async () => {
    if (onUpdateBrand) {
      await onUpdateBrand(formData);
    }
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const currentBrand = isEditing ? formData : brand;
  const isAgency = currentBrand.company_type?.includes('Agency');
  const badgeText = currentBrand.verification_status?.badge_type || (isAgency ? 'Verified Agency' : 'Verified Brand');

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Toast Notification */}
      {saveSuccess && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-semibold">Brand profile saved and verified successfully!</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/10 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              onClick={() => setIsPhotoModalOpen(true)}
              className="relative group cursor-pointer"
              title="Click to take photo or choose from device"
            >
              <img
                src={currentBrand.logo_url || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=400&q=80'}
                alt={currentBrand.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-500/30 shadow-glow bg-slate-900 group-hover:ring-purple-400 group-hover:opacity-90 transition-all"
              />
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
                <span className="text-[10px] text-white font-medium mt-1">Upload</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#0c1222]" title="Active Enterprise Partner" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">{currentBrand.name}</h1>
                
                {/* Verified Trust Badge (Clickable) */}
                <button
                  onClick={() => setIsVerificationModalOpen(true)}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-500/25 transition-all shadow-sm group"
                  title="Click to view verified identity passport"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>✓ {badgeText}</span>
                </button>

                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                  {currentBrand.company_type || 'Brand'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-purple-300 font-medium">{currentBrand.tagline}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="text-white font-medium">{currentBrand.handle || '@brand'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {currentBrand.location || 'United States'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  {currentBrand.company_size || '51-200'} employees
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Founded {currentBrand.founded_year || 2021}
                </span>
                {currentBrand.website && (
                  <>
                    <span>•</span>
                    <a
                      href={currentBrand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Message Brand Button */}
            <button
              onClick={() => onOpenChat && onOpenChat({
                brand_id: currentBrand.id,
                brand_name: currentBrand.name,
                brand_logo: currentBrand.logo_url
              })}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 hover:scale-102"
              title="Open WhatsApp-style direct chat with Brand Manager"
            >
              <MessageSquare className="w-4 h-4 text-purple-200" />
              <span>{isAgency ? 'Message Agency' : 'Message Brand'}</span>
            </button>

            {/* View Briefs Button */}
            <button
              onClick={() => {
                const el = document.getElementById('brand-active-briefs-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>View Briefs ({brandBriefs.length})</span>
            </button>

            {/* Edit Profile Toggle (For Own Profile) */}
            {isOwnProfile && (
              <button
                onClick={() => {
                  if (isEditing) handleSave();
                  else setIsEditing(true);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isEditing
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Details & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>About {currentBrand.name}</span>
              </h2>
            </div>

            {isEditing ? (
              <textarea
                name="about"
                value={formData.about || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                placeholder="Describe your company, mission, and visual style preferences..."
              />
            ) : (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentBrand.about}
              </p>
            )}
          </div>

          {/* Industries & Focus Areas */}
          <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white mb-2">Industries</h3>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  INDUSTRY_OPTIONS.map(ind => {
                    const isSelected = (formData.industries || []).includes(ind);
                    return (
                      <button
                        key={ind}
                        onClick={() => toggleArrayItem('industries', ind)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {ind}
                      </button>
                    );
                  })
                ) : (
                  (currentBrand.industries || []).map(ind => (
                    <span
                      key={ind}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-950/30 text-purple-300 border border-purple-500/20"
                    >
                      {ind}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-2">Services & Creative Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  SERVICE_OPTIONS.map(svc => {
                    const isSelected = (formData.services || []).includes(svc);
                    return (
                      <button
                        key={svc}
                        onClick={() => toggleArrayItem('services', svc)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })
                ) : (
                  (currentBrand.services || []).map(svc => (
                    <span
                      key={svc}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-950/30 text-indigo-300 border border-indigo-500/20"
                    >
                      {svc}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Creator Hiring Requirements */}
          <div className="p-6 rounded-3xl bg-[#0c1222] border border-purple-500/20 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                  Creator Matching Criteria
                </span>
                <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Hiring & AI Creator Requirements</span>
                </h2>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                Used by CREOVATE Smart Match algorithms
              </span>
            </div>

            {/* Preferred Content Types */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-2">Preferred Content Types</h4>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  CONTENT_TYPE_OPTIONS.map(ct => {
                    const isSel = (formData.hiring_requirements?.preferred_content_types || []).includes(ct);
                    return (
                      <button
                        key={ct}
                        onClick={() => toggleHiringRequirement('preferred_content_types', ct)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSel
                            ? 'bg-cyan-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {ct}
                      </button>
                    );
                  })
                ) : (
                  (currentBrand.hiring_requirements?.preferred_content_types || []).map(ct => (
                    <span
                      key={ct}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-cyan-950/30 text-cyan-300 border border-cyan-500/20"
                    >
                      {ct}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Preferred AI Tools */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-2">Preferred AI Tools & Models</h4>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  AI_TOOL_OPTIONS.map(tool => {
                    const isSel = (formData.hiring_requirements?.preferred_tools || []).includes(tool);
                    return (
                      <button
                        key={tool}
                        onClick={() => toggleHiringRequirement('preferred_tools', tool)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSel
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })
                ) : (
                  (currentBrand.hiring_requirements?.preferred_tools || []).map(tool => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-950/30 text-purple-300 border border-purple-500/20"
                    >
                      {tool}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Preferred Skills */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-2">Key Skills Expected</h4>
              <div className="flex flex-wrap gap-2">
                {(currentBrand.hiring_requirements?.preferred_skills || []).map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Active Public Briefs Section */}
          <div id="brand-active-briefs-section" className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                  Open Opportunities
                </span>
                <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Active Campaign Briefs ({brandBriefs.length})</span>
                </h2>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('create-brief-page')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post New Brief</span>
              </button>
            </div>

            {brandBriefs.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 text-center text-xs text-slate-400">
                No public briefs currently active for this brand. Check back soon or message the brand directly.
              </div>
            ) : (
              <div className="space-y-3">
                {brandBriefs.map(brief => (
                  <div
                    key={brief.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                        {brief.campaign_name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {brief.objective}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 pt-0.5">
                        <span className="text-purple-400 font-semibold">{brief.content_type}</span>
                        <span>•</span>
                        <span>Budget: <strong className="text-emerald-400 font-mono">{brief.budget}</strong></span>
                        <span>•</span>
                        <span>Deadline: {brief.deadline}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate && onNavigate('smart-matches', { briefId: brief.id })}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <span>Find Creators</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact Details & Privacy Shield */}
        <div className="space-y-6">
          {/* Trust Passport Overview Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-emerald-950/20 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Trust Badge</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                100% Cleared
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white">✓ {badgeText}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This organization's corporate email, tax jurisdiction, website, and authorized contact representative have undergone identity authentication.
              </p>
            </div>

            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>View Verification Audit Log</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Contact Information Section with Privacy Shield */}
          <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact & Representative</span>
              </h3>
              <span className="text-[10px] text-cyan-300 font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Privacy Shielded
              </span>
            </div>

            {/* Privacy Shield Notice */}
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                Sensitive phone numbers and personal emails are never exposed publicly. Direct communications take place via CREOVATE AI Private Chat.
              </p>
            </div>

            {/* Contact Person */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Designated Representative
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Representative Name"
                      value={formData.contact_info?.contact_person?.name || ''}
                      onChange={(e) => handleContactPersonChange('name', e.target.value)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Creative Director)"
                      value={formData.contact_info?.contact_person?.designation || ''}
                      onChange={(e) => handleContactPersonChange('designation', e.target.value)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                    <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {currentBrand.contact_info?.contact_person?.name || 'Authorized Project Manager'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {currentBrand.contact_info?.contact_person?.designation || 'Brand Marketing Director'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Business Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Business Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.contact_info?.business_email || ''}
                    onChange={(e) => handleContactChange('business_email', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                    <span className="text-slate-300 font-mono text-[11px]">
                      {currentBrand.contact_info?.business_email ? currentBrand.contact_info.business_email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : 'verified-domain@enterprise.com'}
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Domain Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Business Phone */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Business Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.contact_info?.business_phone || ''}
                    onChange={(e) => handleContactChange('business_phone', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                    <span className="text-slate-300 font-mono text-[11px]">
                      +1 (•••) •••-4421 (Encrypted)
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      SMS Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Preference */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Preferred Contact Method
                </label>
                {isEditing ? (
                  <select
                    value={formData.contact_info?.contact_preference || 'Platform Chat'}
                    onChange={(e) => handleContactChange('contact_preference', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Platform Chat">Platform Chat (Recommended)</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="All">All Channels</option>
                  </select>
                ) : (
                  <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 font-semibold flex items-center justify-between">
                    <span>{currentBrand.contact_info?.contact_preference || 'Platform Chat'}</span>
                    <span className="text-[10px] text-purple-400 font-normal">Fastest Response</span>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Message Action CTA */}
            <button
              onClick={() => onOpenChat && onOpenChat({
                brand_id: currentBrand.id,
                brand_name: currentBrand.name,
                brand_logo: currentBrand.logo_url
              })}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-102"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAgency ? 'Start Chat with Agency' : 'Start Chat with Brand'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brand Verification Modal */}
      <BrandVerificationModal
        brand={currentBrand}
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />

      {/* Profile Photo Upload Modal (Take Photo or Choose From Device) */}
      <ProfilePhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSavePhoto={(newPhotoUrl) => {
          handleBrandFieldChange('logo_url', newPhotoUrl);
          if (onUpdateBrand) {
            onUpdateBrand(currentBrand.id, { logo_url: newPhotoUrl });
          }
        }}
        currentPhotoUrl={currentBrand.logo_url}
      />
    </div>
  );
}
