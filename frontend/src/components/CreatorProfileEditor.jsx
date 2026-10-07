import React, { useState, useMemo } from 'react';
import {
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  Film,
  PlusCircle,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit2,
  Lock,
  Check,
  Camera
} from 'lucide-react';
import { ProfilePhotoUploadModal } from './ProfilePhotoUploadModal';

export function CreatorProfileEditor({ creator, onSave, onNavigate: _onNavigate }) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Form State initialized with creator data or robust defaults
  const [formData, setFormData] = useState({
    // Basic Information
    avatar_url: creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    full_name: creator.name || 'Kai Sterling',
    display_name: creator.name || 'Kai Sterling',
    username: creator.username || 'kai.sterling',
    headline: creator.headline || 'Senior AI Cinematographer & Neural Physics Director',
    bio: creator.bio || 'Ex-VFX art director pioneering cinematic photorealistic generative video with Runway Gen-3 Alpha, Kling 1.5, and Luma Dream Machine. Specializes in luxury CPG, automotive, and dynamic fluid dynamics.',
    location: creator.location || 'Los Angeles, CA',
    country: creator.country || 'United States',
    experience_years: creator.experience_years || 5,

    // Contact Information (Private & Protected)
    email: creator.email || 'kai.sterling@creovate.ai',
    email_verified: creator.email_verified !== undefined ? creator.email_verified : true,
    country_code: creator.country_code || '+1',
    mobile: creator.mobile || '310-555-0192',
    mobile_verified: creator.mobile_verified !== undefined ? creator.mobile_verified : true,
    contact_preferences: creator.contact_preferences || ['Platform Chat', 'Email'],

    // Professional Creator Information
    specialization: creator.specialization || 'AI Filmmaker',
    secondary_specializations: creator.secondary_specializations || ['AI Video Creator', 'Motion Designer'],
    skills: creator.skills || [
      'Prompt Engineering',
      'AI Video Generation',
      'Camera Motion Rigging',
      'Dynamic Fluid Control',
      'Temporal Consistency',
      'Color Grading (ACES)'
    ],

    // AI Tools & Models with Proficiency
    tools_with_proficiency: creator.tools_with_proficiency || [
      { tool: 'Runway Gen-3 Alpha', proficiency: 'Expert' },
      { tool: 'Midjourney v6.1', proficiency: 'Expert' },
      { tool: 'Kling 1.5', proficiency: 'Advanced' },
      { tool: 'ComfyUI', proficiency: 'Advanced' },
      { tool: 'Topaz Video AI', proficiency: 'Expert' }
    ],

    // Workflow Information
    workflow_summary: creator.workflow_summary || 'Concept development → Neural prompt engineering → Runway & Kling multi-pass generation → LoRA temporal consistency → DaVinci color grading & Topaz upscaling → Final 4K master delivery.',
    workflow_steps: creator.workflow_steps || {
      concept_development: 'Iterative moodboards, visual grammar definition, and client reference alignment.',
      prompting_workflow: 'Dual-layer negative prompt tokens with custom LoRA weights and camera vectors.',
      generation_tools: 'Runway Gen-3 Alpha, Kling 1.5 Pro, and Luma Dream Machine 1.5 for seed variations.',
      selection_process: 'Batch generation of 20+ passes with frame-by-frame structural audit.',
      editing_tools: 'DaVinci Resolve Studio and Premiere Pro for rhythmic pacing and temporal alignment.',
      post_production: 'Optical flow stabilization, depth map relighting, and ACES gamut grading.',
      upscaling_process: 'Topaz Video AI 4K 60fps motion-compensated interpolation.',
      final_delivery: 'Master ProRes 4444 delivery, vertical 9:16 cutdowns, and prompt reproducibility tokens.'
    },

    // Content Types
    content_types: creator.content_types || [
      'AI Video',
      'Animation',
      'Social Media Content',
      'Advertisements',
      'Product Visualization'
    ],

    // Experience & Professional Details
    completed_projects: creator.completed_projects || 42,
    hourly_rate: creator.hourly_rate || 150,
    availability: creator.availability || 'Available',
    industries: creator.industries || ['Advertising', 'Automotive', 'Fashion', 'Technology'],
    previous_brands: creator.previous_brands || 'Solaria Clean Tech, Nike AI Lab, CyberPulse, Aura Botanical',

    // Portfolio items
    portfolio: creator.portfolio || [],

    // Commercial & Licensing Information
    commercial_use: creator.commercial_use || 'Commercial Use Available',
    licensing_terms: creator.licensing_terms || 'Full commercial buyout with worldwide digital ad distribution rights and raw seed parameter handover.',

    // Verification Badges
    verification_badges: creator.verification_badges || [
      'Identity Verified',
      'Email Verified',
      'Mobile Verified',
      'Tool Verified',
      'Portfolio Verified',
      'Workflow Verified',
      'Commercial Rights Verified'
    ]
  });

  // UI Local states for inputs
  const [activeSection, setActiveSection] = useState('basic');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [customToolName, setCustomToolName] = useState('');
  const [customToolProficiency, setCustomToolProficiency] = useState('Advanced');
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolioIndex, setEditingPortfolioIndex] = useState(null);
  const [portfolioFormData, setPortfolioFormData] = useState(() => ({
    title: '',
    description: '',
    thumbnail_url: '',
    media_url: '',
    content_type: 'AI Video',
    tools_used: ['Runway Gen-3 Alpha', 'Midjourney v6.1'],
    models: 'Runway Gen-3 Alpha v1.2',
    skills: 'AI Video Generation, Prompt Engineering',
    workflow: 'Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery',
    commercial_use: 'Commercial Use Available',
    aspect_ratio: '9:16',
    date: new Date().toISOString().slice(0, 10)
  }));
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Available Presets
  const PRIMARY_SPECIALIZATIONS = [
    'AI Filmmaker',
    'AI Animator',
    'Generative Artist',
    'AI Video Creator',
    'AI Designer',
    'AI Photographer',
    'AI 3D Artist',
    'Motion Designer'
  ];

  const PRESET_SKILLS = [
    'Prompt Engineering',
    'AI Video Generation',
    'AI Image Generation',
    'Storyboarding',
    'Cinematic Direction',
    'Video Editing',
    'VFX',
    'Motion Graphics',
    '3D Design',
    'Art Direction',
    'Color Grading',
    'Camera Motion Rigging',
    'Temporal Consistency',
    'LoRA Fine-Tuning'
  ];

  const DEFAULT_AI_TOOLS = [
    'Midjourney',
    'Runway',
    'Sora',
    'Kling',
    'Adobe Firefly',
    'Stable Diffusion',
    'ComfyUI',
    'ChatGPT',
    'Luma Dream Machine',
    'Flux.1',
    'Topaz Video AI'
  ];

  const CONTENT_TYPE_OPTIONS = [
    'AI Video',
    'Animation',
    'AI Images',
    'Generative Art',
    '3D Content',
    'Motion Graphics',
    'Advertisements',
    'Social Media Content',
    'Product Visualization',
    'Short Films',
    'Music Visuals',
    'Other'
  ];

  const INDUSTRY_OPTIONS = [
    'Advertising',
    'Fashion',
    'Gaming',
    'Film',
    'Technology',
    'E-commerce',
    'Automotive',
    'Education',
    'Entertainment',
    'Healthcare'
  ];

  // Dynamic Profile Completion Score calculation
  const completionDetails = useMemo(() => {
    let score = 0;
    const suggestions = [];

    // Check 1: Profile photo
    if (formData.avatar_url) score += 10;
    else suggestions.push({ text: 'Add profile photo', section: 'basic' });

    // Check 2: Bio & headline
    if (formData.headline && formData.bio && formData.bio.length > 50) score += 15;
    else suggestions.push({ text: 'Complete professional headline & bio', section: 'basic' });

    // Check 3: Mobile & Contact
    if (formData.mobile && formData.email) score += 10;
    else suggestions.push({ text: 'Add mobile number & contact preferences', section: 'contact' });

    // Check 4: Specialization & Skills
    if (formData.specialization && formData.skills.length >= 3) score += 15;
    else suggestions.push({ text: 'Complete specialization & at least 3 skills', section: 'specialization' });

    // Check 5: AI Tools with proficiency
    if (formData.tools_with_proficiency.length >= 3) score += 15;
    else suggestions.push({ text: 'Add more AI tools with proficiency', section: 'tools' });

    // Check 6: Workflow Information
    if (formData.workflow_summary && formData.workflow_steps.concept_development) score += 15;
    else suggestions.push({ text: 'Document your reproducible AI workflow', section: 'workflow' });

    // Check 7: Portfolio Deliverables
    if (formData.portfolio.length >= 1) score += 15;
    else suggestions.push({ text: 'Add at least one portfolio project', section: 'portfolio' });

    // Check 8: Commercial Usage
    if (formData.commercial_use && formData.licensing_terms) score += 10;
    else suggestions.push({ text: 'Add commercial-use information & licensing notes', section: 'commercial' });

    return {
      percentage: Math.min(100, score),
      suggestions
    };
  }, [formData]);

  // Handler for form field changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedWorkflowChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      workflow_steps: {
        ...prev.workflow_steps,
        [key]: value
      }
    }));
  };

  // Toggle skill
  const handleToggleSkill = (skill) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
      };
    });
  };

  // Add custom skill
  const handleAddCustomSkill = () => {
    if (newSkillInput.trim() && !formData.skills.includes(newSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkillInput.trim()]
      }));
      setNewSkillInput('');
    }
  };

  // Toggle secondary specialization
  const handleToggleSecondarySpec = (spec) => {
    setFormData(prev => {
      const exists = prev.secondary_specializations.includes(spec);
      return {
        ...prev,
        secondary_specializations: exists
          ? prev.secondary_specializations.filter(s => s !== spec)
          : [...prev.secondary_specializations, spec]
      };
    });
  };

  // Toggle content type
  const handleToggleContentType = (type) => {
    setFormData(prev => {
      const exists = prev.content_types.includes(type);
      return {
        ...prev,
        content_types: exists
          ? prev.content_types.filter(t => t !== type)
          : [...prev.content_types, type]
      };
    });
  };

  // Toggle industry
  const handleToggleIndustry = (ind) => {
    setFormData(prev => {
      const exists = prev.industries.includes(ind);
      return {
        ...prev,
        industries: exists
          ? prev.industries.filter(i => i !== ind)
          : [...prev.industries, ind]
      };
    });
  };

  // Add AI tool with proficiency
  const handleAddToolWithProficiency = (toolName, proficiency) => {
    if (!toolName.trim()) return;
    setFormData(prev => {
      const filtered = prev.tools_with_proficiency.filter(t => t.tool.toLowerCase() !== toolName.toLowerCase());
      return {
        ...prev,
        tools_with_proficiency: [...filtered, { tool: toolName.trim(), proficiency }]
      };
    });
  };

  const handleRemoveTool = (toolName) => {
    setFormData(prev => ({
      ...prev,
      tools_with_proficiency: prev.tools_with_proficiency.filter(t => t.tool !== toolName)
    }));
  };

  // Portfolio Management: Add / Edit / Delete / Reorder
  const handleOpenAddPortfolioModal = (indexToEdit = null) => {
    if (indexToEdit !== null) {
      setEditingPortfolioIndex(indexToEdit);
      setPortfolioFormData({ ...formData.portfolio[indexToEdit] });
    } else {
      setEditingPortfolioIndex(null);
      setPortfolioFormData({
        title: '',
        description: '',
        thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        media_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        content_type: 'AI Video',
        tools_used: ['Runway Gen-3 Alpha', 'Midjourney v6.1'],
        models: 'Runway Gen-3 Alpha v1.2',
        skills: 'AI Video Generation, Prompt Engineering',
        workflow: 'Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery',
        commercial_use: 'Commercial Use Available',
        aspect_ratio: '9:16',
        date: new Date().toISOString().slice(0, 10)
      });
    }
    setIsPortfolioModalOpen(true);
  };

  const handleSavePortfolioItem = (e) => {
    e.preventDefault();
    if (!portfolioFormData.title.trim()) return;

    const newItem = {
      id: editingPortfolioIndex !== null ? formData.portfolio[editingPortfolioIndex].id : `port-custom-${Date.now()}`,
      creator_id: creator.id,
      creator_name: formData.full_name,
      ...portfolioFormData
    };

    setFormData(prev => {
      if (editingPortfolioIndex !== null) {
        const updated = [...prev.portfolio];
        updated[editingPortfolioIndex] = newItem;
        return { ...prev, portfolio: updated };
      } else {
        return { ...prev, portfolio: [newItem, ...prev.portfolio] };
      }
    });

    setIsPortfolioModalOpen(false);
  };

  const handleDeletePortfolioItem = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index)
    }));
  };

  const handleReorderPortfolioItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.portfolio.length) return;

    setFormData(prev => {
      const items = [...prev.portfolio];
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;
      return { ...prev, portfolio: items };
    });
  };

  // Submit all profile updates
  const handleSaveAllChanges = () => {
    const updatedCreator = {
      ...creator,
      name: formData.display_name || formData.full_name,
      avatar_url: formData.avatar_url,
      username: formData.username,
      headline: formData.headline,
      bio: formData.bio,
      location: formData.location,
      country: formData.country,
      experience_years: Number(formData.experience_years),
      email: formData.email,
      email_verified: formData.email_verified,
      country_code: formData.country_code,
      mobile: formData.mobile,
      mobile_verified: formData.mobile_verified,
      contact_preferences: formData.contact_preferences,
      specialization: formData.specialization,
      secondary_specializations: formData.secondary_specializations,
      skills: formData.skills,
      tools_with_proficiency: formData.tools_with_proficiency,
      tools: formData.tools_with_proficiency.map(t => t.tool),
      workflow_summary: formData.workflow_summary,
      workflow_steps: formData.workflow_steps,
      content_types: formData.content_types,
      completed_projects: Number(formData.completed_projects),
      hourly_rate: Number(formData.hourly_rate),
      availability: formData.availability,
      industries: formData.industries,
      previous_brands: formData.previous_brands,
      portfolio: formData.portfolio,
      commercial_use: formData.commercial_use,
      licensing_terms: formData.licensing_terms,
      verification_badges: formData.verification_badges
    };

    if (onSave) onSave(updatedCreator);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const sectionsList = [
    { id: 'basic', label: '1. Basic Information' },
    { id: 'contact', label: '2. Contact Information' },
    { id: 'specialization', label: '3. Specializations & Skills' },
    { id: 'tools', label: '4. AI Tools & Models' },
    { id: 'workflow', label: '5. My AI Workflow' },
    { id: 'content', label: '6. Content Types' },
    { id: 'experience', label: '7. Experience & Details' },
    { id: 'portfolio', label: '8. AI Portfolio Projects' },
    { id: 'commercial', label: '9. Commercial & Licensing' },
    { id: 'verification', label: '10. Verification Signals' }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-xs">
      {/* Top Banner: Profile Completion & Suggestions */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#0e1424] to-indigo-950/50 border border-purple-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>CREOVATE Creator Profile Experience</span>
            </div>
            <h2 className="text-xl font-bold font-heading text-white">
              Profile Completeness: <span className="text-emerald-400">{completionDetails.percentage}% Complete</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAllChanges}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-102 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Publish Profile</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${completionDetails.percentage}%` }}
          />
        </div>

        {/* Actionable Suggestions */}
        {completionDetails.suggestions.length > 0 ? (
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Suggestions to Reach 100% Marketplace Score:
            </span>
            <div className="flex flex-wrap gap-2">
              {completionDetails.suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveSection(sug.section);
                    document.getElementById(`section-${sug.section}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 text-[11px] flex items-center gap-1.5 transition-all hover:scale-102"
                >
                  <PlusCircle className="w-3 h-3 text-purple-400" />
                  <span>{sug.text}</span>
                  <span className="text-[10px] text-purple-400">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-emerald-400 text-xs font-semibold flex items-center gap-2 pt-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile is 100% complete! Your profile is verified and primed for top brand matching.</span>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile changes saved successfully! Your public profile and search index have been updated.</span>
        </div>
      )}

      {/* Section Jump Nav */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c1222] border border-white/10 overflow-x-auto">
        {sectionsList.map(sec => (
          <button
            key={sec.id}
            onClick={() => {
              setActiveSection(sec.id);
              document.getElementById(`section-${sec.id}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeSection === sec.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: BASIC INFORMATION */}
      <div id="section-basic" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 1: Basic Information</h3>
            <p className="text-xs text-slate-400">Public profile identity and visual branding</p>
          </div>
          <span className="text-[11px] font-mono text-purple-400">Public Information</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Avatar Preview */}
          <div className="space-y-3">
            <label className="block text-slate-300 font-semibold">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsPhotoModalOpen(true)}
                className="relative group cursor-pointer shrink-0"
                title="Click to take photo or choose from device"
              >
                <img
                  src={formData.avatar_url}
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-glow group-hover:ring-purple-400 group-hover:opacity-90 transition-all"
                />
                <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-[10px] text-white font-semibold mt-0.5">Upload</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-102"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <span className="text-[10px] text-slate-400">JPG/JPEG camera or file</span>
                </div>
                <input
                  type="text"
                  value={formData.avatar_url}
                  onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                  placeholder="Avatar image URL"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                />
                <span className="text-[10px] text-slate-400 block">Direct URL or upload a JPG/JPEG photo</span>
              </div>
            </div>
          </div>

          {/* Names */}
          <div className="space-y-3 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Legal Name *</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Professional Creator / Display Name *</label>
              <input
                type="text"
                value={formData.display_name}
                onChange={(e) => handleInputChange('display_name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Username / Handle *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">@</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-purple-300 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Years of AI Experience</label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.experience_years}
                onChange={(e) => handleInputChange('experience_years', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Location & Country */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">City / Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. Los Angeles, CA or London, UK"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Country *</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="e.g. United States"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
            />
          </div>

          {/* Short Headline */}
          <div className="md:col-span-3">
            <label className="block text-slate-300 font-semibold mb-1">
              Short Professional Headline *
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleInputChange('headline', e.target.value)}
              placeholder="e.g. AI Filmmaker | Generative Video Creator | Visual Storyteller"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Displayed on creator cards and directory search results.
            </span>
          </div>

          {/* Bio with Live Character Counter */}
          <div className="md:col-span-3 space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-slate-300 font-semibold">
                Bio / About Creator (Longer Professional Description) *
              </label>
              <span className={`text-[11px] font-mono ${formData.bio.length > 900 ? 'text-amber-400' : 'text-slate-400'}`}>
                {formData.bio.length} / 1000 characters
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={1000}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Describe your background, generative philosophy, commercial client history, and AI model specializations..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white leading-relaxed focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: CONTACT DETAILS (PRIVATE & SENSITIVE) */}
      <div id="section-contact" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-cyan-500/30 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold font-heading text-white">Section 2: Contact Information</h3>
            </div>
            <p className="text-xs text-slate-400">Direct contact channels and brand communication preferences</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Shielded / Private by Default
          </span>
        </div>

        {/* Privacy Notice Banner */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong>Privacy & Confidentiality Standard:</strong> Your personal mobile number and private email address are never exposed publicly on your profile. Verified brands and agencies communicate through our secure "Contact Creator" / platform chat workflow unless you explicitly permit direct handover upon contract signing.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Address */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                Email Address *
              </label>
              {formData.email_verified && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ✓ Email Verified
                </span>
              )}
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
            />
          </div>

          {/* Mobile Number */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                Mobile Number *
              </label>
              {formData.mobile_verified && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ✓ Mobile Verified
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.country_code}
                onChange={(e) => handleInputChange('country_code', e.target.value)}
                placeholder="+1"
                className="w-20 px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-center"
              />
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="310-555-0192"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
              />
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-slate-300 font-semibold">
              Contact Preferences (How Brands May Reach You) *
            </label>
            <div className="flex flex-wrap gap-3">
              {['Platform Chat', 'Email', 'Mobile', 'All'].map((pref) => {
                const isSelected = formData.contact_preferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => {
                      if (pref === 'All') {
                        setFormData(prev => ({
                          ...prev,
                          contact_preferences: prev.contact_preferences.includes('All') ? [] : ['Platform Chat', 'Email', 'Mobile', 'All']
                        }));
                      } else {
                        setFormData(prev => {
                          const exists = prev.contact_preferences.includes(pref);
                          return {
                            ...prev,
                            contact_preferences: exists
                              ? prev.contact_preferences.filter(p => p !== pref && p !== 'All')
                              : [...prev.contact_preferences, pref]
                          };
                        });
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-purple-600/30 border-purple-500 text-white'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400' : 'opacity-0'}`} />
                    <span>{pref}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: PROFESSIONAL CREATOR INFORMATION */}
      <div id="section-specialization" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 3: Specializations & Skills</h3>
            <p className="text-xs text-slate-400">Core creative discipline and verified skill capabilities</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Primary Specialization */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Primary Specialization *</label>
            <select
              value={formData.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold"
            >
              {PRIMARY_SPECIALIZATIONS.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Secondary Specializations */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-semibold">
              Secondary Specializations (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {PRIMARY_SPECIALIZATIONS.filter(s => s !== formData.specialization).map(spec => {
                const isSelected = formData.secondary_specializations.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleToggleSecondarySpec(spec)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Multi-Selection & Custom Skill */}
          <div className="space-y-2 pt-2">
            <label className="block text-slate-300 font-semibold">
              Production Skills & Directorial Capabilities ({formData.skills.length} Selected) *
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_SKILLS.map(skill => {
                const isSelected = formData.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomSkill(); } }}
                placeholder="Add custom skill (e.g. Optical Flow Synthesis)"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: AI TOOLS & MODELS (WITH PROFICIENCY) */}
      <div id="section-tools" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 4: AI Tools & Models</h3>
            <p className="text-xs text-slate-400">Generative software stack and proficiency level (Beginner to Expert)</p>
          </div>
        </div>

        {/* Existing tools with proficiency */}
        <div className="space-y-3">
          <label className="block text-slate-300 font-semibold">Active AI Toolstack & Proficiencies</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.tools_with_proficiency.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/20 flex items-center justify-between gap-2 shadow-sm"
              >
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span>{item.tool}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">
                    {item.proficiency} Proficiency
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTool(item.tool)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Tool / Custom Tool Builder */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
          <span className="text-xs font-semibold text-slate-300 block">Add Default or Custom AI Tool</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Preset Tool</label>
              <select
                onChange={(e) => {
                  if (e.target.value) setCustomToolName(e.target.value);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
              >
                <option value="">Select preset tool...</option>
                {DEFAULT_AI_TOOLS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Or Tool Name</label>
              <input
                type="text"
                value={customToolName}
                onChange={(e) => setCustomToolName(e.target.value)}
                placeholder="e.g. ComfyUI AnimateDiff"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Proficiency Level</label>
              <div className="flex gap-2">
                <select
                  value={customToolProficiency}
                  onChange={(e) => setCustomToolProficiency(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-medium"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (customToolName.trim()) {
                      handleAddToolWithProficiency(customToolName, customToolProficiency);
                      setCustomToolName('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: MY AI WORKFLOW (TRANSPARENCY STANDARD) */}
      <div id="section-workflow" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-purple-500/30 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <h3 className="text-base font-bold font-heading text-white">Section 5: My AI Workflow</h3>
            </div>
            <p className="text-xs text-slate-400">Step-by-step production methodology displayed on your public profile</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Public Transparency Mandate
          </span>
        </div>

        {/* Workflow Overview Description */}
        <div className="space-y-1">
          <label className="block text-slate-300 font-semibold">Custom AI Workflow Overview *</label>
          <textarea
            rows={2}
            value={formData.workflow_summary}
            onChange={(e) => handleInputChange('workflow_summary', e.target.value)}
            placeholder="High-level sequence: Concept → Prompt Engineering → AI Generation → Selection → Editing → Upscaling → Master Delivery"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white leading-relaxed"
          />
        </div>

        {/* Detailed 8 Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'concept_development', label: '1. Concept & Reference Research' },
            { key: 'prompting_workflow', label: '2. Neural Prompt Architecture & Tokens' },
            { key: 'generation_tools', label: '3. Generative Synthesis & Multi-Pass' },
            { key: 'selection_process', label: '4. Curation & Consistency Audit' },
            { key: 'editing_tools', label: '5. Non-Linear Editing & Compositing' },
            { key: 'post_production', label: '6. Post-Production & Color Grading' },
            { key: 'upscaling_process', label: '7. Motion-Compensated Upscaling' },
            { key: 'final_delivery', label: '8. Final Delivery & IP Asset Packaging' }
          ].map((step) => (
            <div key={step.key} className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
              <label className="block text-slate-300 font-bold text-xs">{step.label}</label>
              <input
                type="text"
                value={formData.workflow_steps[step.key] || ''}
                onChange={(e) => handleNestedWorkflowChange(step.key, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: CONTENT TYPES */}
      <div id="section-content" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 6: Content Types Produced</h3>
            <p className="text-xs text-slate-400">Media formats and asset deliverables you accept</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {CONTENT_TYPE_OPTIONS.map((type) => {
            const isSelected = formData.content_types.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleToggleContentType(type)}
                className={`p-3 rounded-2xl text-xs font-semibold border flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-purple-600/30 border-purple-500 text-white'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span>{type}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 7: EXPERIENCE & PROFESSIONAL DETAILS */}
      <div id="section-experience" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 7: Experience & Professional Details</h3>
            <p className="text-xs text-slate-400">Completed projects, rate, availability status, and industry experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Completed Client Projects</label>
            <input
              type="number"
              value={formData.completed_projects}
              onChange={(e) => handleInputChange('completed_projects', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Hourly Rate (USD) *</label>
            <input
              type="number"
              value={formData.hourly_rate}
              onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Current Availability Status *</label>
            <select
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold"
            >
              <option value="Available">Available</option>
              <option value="Limited Availability">Limited Availability</option>
              <option value="Currently Unavailable">Currently Unavailable</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-slate-300 font-semibold mb-1">Previous Brands & Creative Agencies</label>
            <input
              type="text"
              value={formData.previous_brands}
              onChange={(e) => handleInputChange('previous_brands', e.target.value)}
              placeholder="e.g. Solaria, Nike AI Lab, CyberPulse, Vogue, Aura Botanical"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
            />
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="block text-slate-300 font-semibold">
              Industry Experience (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map(ind => {
                const isSelected = formData.industries.includes(ind);
                return (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => handleToggleIndustry(ind)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8: AI PORTFOLIO PROJECTS */}
      <div id="section-portfolio" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">
              Section 8: AI Portfolio Deliverables ({formData.portfolio.length} Projects)
            </h3>
            <p className="text-xs text-slate-400">Add, edit, delete, and reorder verified commercial work</p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenAddPortfolioModal()}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Portfolio Project</span>
          </button>
        </div>

        {formData.portfolio.length === 0 ? (
          <div className="text-center py-10 p-6 rounded-2xl bg-slate-900 border border-white/5 space-y-2 text-slate-400">
            <Film className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-semibold text-white">No portfolio deliverables added yet</p>
            <p className="text-[11px]">Showcase your generative videos, 3D animations, and commercial stills to win briefs.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.portfolio.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={proj.thumbnail_url}
                    alt={proj.title}
                    className="w-16 h-12 rounded-xl object-cover ring-1 ring-white/10 bg-black"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{proj.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-purple-300 font-mono mt-0.5">
                      <span>{proj.content_type}</span>
                      <span>•</span>
                      <span>{proj.commercial_use}</span>
                    </div>
                  </div>
                </div>

                {/* Actions: Reorder, Edit, Delete */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleReorderPortfolioItem(idx, 'up')}
                    title="Move Up"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === formData.portfolio.length - 1}
                    onClick={() => handleReorderPortfolioItem(idx, 'down')}
                    title="Move Down"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenAddPortfolioModal(idx)}
                    title="Edit Project"
                    className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePortfolioItem(idx)}
                    title="Delete Project"
                    className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 9: COMMERCIAL & LICENSING INFORMATION */}
      <div id="section-commercial" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 9: Commercial Usage & Licensing</h3>
            <p className="text-xs text-slate-400">Guaranteed intellectual property and commercial clearance terms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Commercial Usage Status *</label>
            <select
              value={formData.commercial_use}
              onChange={(e) => handleInputChange('commercial_use', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold"
            >
              <option value="Commercial Use Available">Commercial Use Available</option>
              <option value="Commercial License Required">Commercial License Required</option>
              <option value="Usage Rights Negotiable">Usage Rights Negotiable</option>
              <option value="Personal/Non-commercial Only">Personal/Non-commercial Only</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="block text-slate-300 font-semibold">Licensing Notes & Usage Conditions</label>
            <textarea
              rows={3}
              value={formData.licensing_terms}
              onChange={(e) => handleInputChange('licensing_terms', e.target.value)}
              placeholder="Explain territorial rights, exclusivity, recurring royalties (if any), and raw model checkpoint/seed handover conditions..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* SECTION 10: CREATOR VERIFICATION SIGNALS */}
      <div id="section-verification" className="p-6 sm:p-7 rounded-3xl bg-[#0c1222] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Section 10: Creator Verification Signals</h3>
            <p className="text-xs text-slate-400">7 verification signals confirming trust, tooling, and workflow reproducibility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'Identity Verified',
            'Email Verified',
            'Mobile Verified',
            'Tool Verified',
            'Portfolio Verified',
            'Workflow Verified',
            'Commercial Rights Verified'
          ].map(badge => (
            <div key={badge} className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Save Bar at bottom */}
      <div className="p-4 rounded-2xl bg-[#0c1222] border border-purple-500/40 flex items-center justify-between gap-4 shadow-2xl sticky bottom-4">
        <div>
          <span className="font-bold text-white text-sm block">Ready to update your marketplace presence?</span>
          <span className="text-slate-400 text-xs">All 10 sections will be published instantly to your public profile.</span>
        </div>
        <button
          onClick={handleSaveAllChanges}
          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-102 flex items-center gap-2 shrink-0"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Modal: Add / Edit Portfolio Item */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0b101e] border border-purple-500/40 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base text-white">
                {editingPortfolioIndex !== null ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                type="button"
                onClick={() => setIsPortfolioModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePortfolioItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={portfolioFormData.title}
                  onChange={(e) => setPortfolioFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. HydroLux Commercial Cut"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={portfolioFormData.description}
                  onChange={(e) => setPortfolioFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Cinematic shots, prompt methodology, target commercial use..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Content Type</label>
                  <select
                    value={portfolioFormData.content_type}
                    onChange={(e) => setPortfolioFormData(p => ({ ...p, content_type: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  >
                    {CONTENT_TYPE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Commercial Status</label>
                  <select
                    value={portfolioFormData.commercial_use}
                    onChange={(e) => setPortfolioFormData(p => ({ ...p, commercial_use: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  >
                    <option value="Commercial Use Available">Commercial Use Available</option>
                    <option value="Commercial License Required">Commercial License Required</option>
                    <option value="Usage Rights Negotiable">Usage Rights Negotiable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={portfolioFormData.thumbnail_url}
                  onChange={(e) => setPortfolioFormData(p => ({ ...p, thumbnail_url: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Profile Photo Upload Modal (Take Photo or Choose From Device) */}
      <ProfilePhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSavePhoto={(newPhotoUrl) => {
          handleInputChange('avatar_url', newPhotoUrl);
          if (onSave) {
            onSave({ ...creator, avatar_url: newPhotoUrl });
          }
        }}
        currentPhotoUrl={formData.avatar_url}
      />
    </div>
  );
}
