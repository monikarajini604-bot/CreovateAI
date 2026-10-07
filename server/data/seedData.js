/**
 * CREOVATE AI - AI Content Creator Marketplace
 * Core Seed Dataset for Creators, Portfolios, Briefs, and Engagements
 */

export const initialCreators = [
  {
    id: "kai-sterling",
    name: "Kai Sterling",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    headline: "Senior AI Cinematographer & Neural Physics Director",
    bio: "Ex-VFX art director pioneering cinematic photorealistic generative video with Runway Gen-3 Alpha, Kling 1.5, and Luma Dream Machine. Specializes in luxury CPG, automotive, and dynamic fluid dynamics.",
    location: "Los Angeles, CA",
    specialization: "AI Video",
    skills: [
      "AI Video",
      "AI Filmmaking",
      "Camera Motion Rigging",
      "Dynamic Fluid Control",
      "Temporal Consistency",
      "Multi-Pass Compositing",
      "Color Grading (ACES)"
    ],
    tools: [
      "Runway Gen-3 Alpha",
      "Kling 1.5",
      "Luma Dream Machine",
      "Midjourney v6.1",
      "Topaz Video AI",
      "DaVinci Resolve Studio"
    ],
    models: [
      "Runway Gen-3 Alpha v1.2",
      "Kling 1.5 Pro",
      "Luma Dream Machine 1.5",
      "Midjourney v6.1"
    ],
    content_types: [
      "Video",
      "Commercial Ad",
      "Motion Graphics",
      "Cinematic Trailer"
    ],
    styles: [
      "Hyper-Realistic",
      "Cinematic Lighting",
      "Photorealistic Commercial",
      "Futuristic Minimalist"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Full commercial buyout with worldwide digital ad rights",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 4,
    hourly_rate: 135,
    rating: 4.98,
    completed_projects: 38,
    workflows: [
      { step_number: 1, name: "Creative Strategy & Moodboard", description: "Midjourney v6.1 style exploration, color matrix, brand guardrail lock", tools: ["Midjourney v6.1", "Figma"] },
      { step_number: 2, name: "Prompt Matrix Formulation", description: "Multi-prompt engineering with seed anchoring and camera syntax", tools: ["Custom Prompt Studio", "Runway Gen-3"] },
      { step_number: 3, name: "Video Generation & Directed Seeds", description: "Runway Gen-3 Alpha & Kling 1.5 generation at 4K native output", tools: ["Runway Gen-3 Alpha", "Kling 1.5"] },
      { step_number: 4, name: "Temporal In-painting & Artifact Clean", description: "Frame-by-frame latency reduction and neural artifact scrub", tools: ["Adobe After Effects", "Topaz Video AI"] },
      { step_number: 5, name: "Upscaling & Frame Interpolation", description: "Upscaling to master 4K 60fps with optical flow interpolation", tools: ["Topaz Video AI 5.0"] },
      { step_number: 6, name: "Color Match & IP Clearance Pack", description: "DaVinci Resolve ACES pipeline, final ProRes 422 HQ export, commercial release", tools: ["DaVinci Resolve", "CREOVATE Safe Contract"] }
    ],
    evidence_passport: [
      {
        id: "ev-kai-runway",
        claimed_skill: "Runway Gen-3 Alpha Camera Motion",
        tool_model: "Runway Gen-3 Alpha v1.2",
        portfolio_evidence: "4K Master Commercial 'Solaria Kinetic'",
        workflow_evidence: "Timestamped generation session logs & seed tokens",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-15"
      },
      {
        id: "ev-kai-commercial",
        claimed_skill: "Commercial IP Assignment",
        tool_model: "CREOVATE Legal IP Framework",
        portfolio_evidence: "Full Buyout Assignment Contract #CS-2026-081",
        workflow_evidence: "Model training opt-out verification & seed ownership guarantee",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-20"
      }
    ],
    portfolio: [
      {
        id: "port-kai-1",
        creator_id: "kai-sterling",
        creator_name: "Kai Sterling",
        title: "HydroVibe — Kinetic Liquid Commercial",
        description: "Zero-artifact beverage commercial with synchronized fluid physics and condensation macro lens movement.",
        thumbnail_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
        content_type: "Video",
        style: "Hyper-Realistic",
        tools_used: ["Runway Gen-3 Alpha", "Topaz Video AI", "DaVinci Resolve"],
        models: ["Runway Gen-3 Alpha", "Topaz Neural Engine 5"],
        skills: ["AI Video", "AI Filmmaking", "Dynamic Fluid Control"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K ProRes 422 HQ",
        aspect_ratio: "9:16",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-08-14",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Ultra-detailed macro slow-motion camera orbit around frosted glass cylinder with beads of condensation...",
          seed: "48209148",
          render_resolution: "3840x2160 @ 60fps"
        }
      },
      {
        id: "port-kai-2",
        creator_id: "kai-sterling",
        creator_name: "Kai Sterling",
        title: "Solaria Clean Tech — Energy Reimagined",
        description: "Futuristic solar architecture film with hyper-clean optical reflections and cinematic drone sweeps.",
        thumbnail_url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
        content_type: "Video",
        style: "Cinematic Lighting",
        tools_used: ["Kling 1.5", "Midjourney v6.1", "Topaz Video AI"],
        models: ["Kling 1.5 Pro", "Midjourney v6.1"],
        skills: ["AI Video", "Prompt Architecture", "Color Grading"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K Master (16:9 & 9:16)",
        aspect_ratio: "9:16",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-02",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Drone tracking shot over curved photovoltaic mega-canopy in golden hour...",
          seed: "71029411",
          render_resolution: "3840x2160 @ 60fps"
        }
      }
    ]
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    headline: "AI Brand Visualist & Consistent Character Architect",
    bio: "Pioneering identity preservation and product constancy across cross-platform omnichannel brand campaigns with Flux Pro and LoRA fine-tuning.",
    location: "Berlin, Germany",
    specialization: "Product Visualization",
    skills: [
      "Generative Art",
      "AI Photography",
      "LoRA Fine-Tuning",
      "Character Consistency",
      "Product Preservation",
      "ControlNet Depth Mapping"
    ],
    tools: [
      "Flux.1 Pro",
      "Stable Diffusion XL",
      "Midjourney v6.1",
      "ComfyUI Custom Workflows",
      "Photoshop Generative Fill"
    ],
    models: [
      "Flux.1 Dev",
      "SDXL Turbo",
      "Midjourney v6.1"
    ],
    content_types: [
      "Image",
      "Brand Visuals",
      "E-Commerce Key Art"
    ],
    styles: [
      "Editorial Photography",
      "Clean Studio Lighting",
      "Hyper-Realistic",
      "Minimalist Modern"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Full commercial license with proprietary LoRA weights handover",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 5,
    hourly_rate: 145,
    rating: 4.96,
    completed_projects: 42,
    workflows: [
      { step_number: 1, name: "Product Asset Capture & LoRA Prep", description: "24-angle photogrammetry input for LoRA fine-tuning", tools: ["DSLR", "ComfyUI Dataset Builder"] },
      { step_number: 2, name: "LoRA Training & Epoch Check", description: "Targeted 1500-step training with rank 64 preservation matrix", tools: ["RunPod A100", "Kohya-ss"] },
      { step_number: 3, name: "Scene Generation & Angle Sweep", description: "Consistent character in multiple commercial settings", tools: ["Flux.1 Pro", "ControlNet"] },
      { step_number: 4, name: "High-Resolution Inpainting & Cleanup", description: "Pixel-perfect touchups for brand typography and labels", tools: ["Photoshop AI", "Magnific AI"] }
    ],
    evidence_passport: [
      {
        id: "ev-elena-lora",
        claimed_skill: "Custom Product LoRA Training",
        tool_model: "Flux.1 Pro / Kohya",
        portfolio_evidence: "Aura Botanica Serum Pack (12 Angles)",
        workflow_evidence: "Epoch validation curves and sample grids",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-18"
      }
    ],
    portfolio: [
      {
        id: "port-elena-1",
        creator_id: "elena-rostova",
        creator_name: "Elena Rostova",
        title: "Aura Botanica — Organic Skincare Campaign",
        description: "12-asset omnichannel campaign with 100% bottle label and texture consistency across studio and outdoor sunlight shots.",
        thumbnail_url: "https://images.unsplash.com/photo-1608248597359-58a0e9b9409b?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1608248597359-58a0e9b9409b?auto=format&fit=crop&w=1200&q=80",
        content_type: "Image",
        style: "Editorial Photography",
        tools_used: ["Flux.1 Pro", "ComfyUI", "Magnific AI"],
        models: ["Flux.1 Dev", "Custom LoRA"],
        skills: ["AI Photography", "Generative Art", "Product Preservation"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "8K TIFF Master",
        aspect_ratio: "1:1 / 4:5",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout + LoRA weights",
        date: "2026-08-28",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Studio still-life of Aura Botanica amber dropper bottle on wet slate stone...",
          seed: "91823719",
          render_resolution: "6144x6144"
        }
      },
      {
        id: "port-elena-2",
        creator_id: "elena-rostova",
        creator_name: "Elena Rostova",
        title: "Luminary Watch — Macro Timepiece Series",
        description: "Synthetic chronometer studio visual showcasing sapphire glass reflections and metallic bezel beveling.",
        thumbnail_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
        content_type: "Image",
        style: "Luxury",
        tools_used: ["Midjourney v6.1", "ComfyUI", "Photoshop"],
        models: ["Midjourney v6.1", "ControlNet Canny"],
        skills: ["Generative Art", "AI Photography"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "8K PNG Master",
        aspect_ratio: "1:1",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-12",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Luxury chronograph watch on dark obsidian pedestal with rim light...",
          seed: "88219401",
          render_resolution: "5120x5120"
        }
      }
    ]
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    headline: "AI Voiceover Director & Spatial Audio Engineer",
    bio: "Pioneering emotive AI vocal cloning and multi-lingual voiceover orchestration with ElevenLabs Professional Voice Clones and Dolby Atmos spatial mastering.",
    location: "London, UK",
    specialization: "Advertising",
    skills: [
      "AI Voiceover",
      "Multilingual Dubbing",
      "Spatial Mix & Master",
      "AI SFX Generation"
    ],
    tools: [
      "ElevenLabs Pro",
      "Suno AI v3.5",
      "Udio v1.5",
      "Pro Tools Studio",
      "iZotope RX 11"
    ],
    models: [
      "Eleven Multilingual v2",
      "Suno v3.5",
      "Udio v1.5"
    ],
    content_types: [
      "Animation",
      "Audio Branding",
      "Commercial Ad"
    ],
    styles: [
      "Authoritative Commercial",
      "Warm Narrative",
      "High-Energy Hype",
      "Cinematic Orchestral"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Perpetual global broadcast voice license with signed consent waiver",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 6,
    hourly_rate: 110,
    rating: 4.92,
    completed_projects: 51,
    workflows: [
      { step_number: 1, name: "Voice Casting & Tone Calibration", description: "Voice profile selection matching demographic target", tools: ["ElevenLabs Pro"] },
      { step_number: 2, name: "Phonetic Prompting & Cadence Tuning", description: "Pacing marks and pronunciation guide alignment", tools: ["Studio Script Editor"] },
      { step_number: 3, name: "Spectral Polish & Noise Floor Mastering", description: "iZotope de-breath, de-click, and loudness normalisation to -14 LUFS", tools: ["iZotope RX 11", "Pro Tools"] }
    ],
    evidence_passport: [
      {
        id: "ev-marcus-eleven",
        claimed_skill: "ElevenLabs Voice Consent Verification",
        tool_model: "ElevenLabs Enterprise",
        portfolio_evidence: "Voice Identity Vault Certificate #VL-2026",
        workflow_evidence: "Actor verification biometric consent statement",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-10"
      }
    ],
    portfolio: [
      {
        id: "port-marcus-1",
        creator_id: "marcus-vance",
        creator_name: "Marcus Vance",
        title: "OmniSonic — Sound of Tomorrow",
        description: "Binaural commercial voiceover and procedural AI soundscape for global headphone product launch.",
        thumbnail_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
        content_type: "Animation",
        style: "Authoritative Commercial",
        tools_used: ["ElevenLabs Pro", "iZotope RX 11", "Pro Tools"],
        models: ["Eleven Multilingual v2"],
        skills: ["AI Voiceover", "Spatial Mix & Master"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "24-bit 96kHz Broadcast WAV",
        aspect_ratio: "16:9 Audio Track",
        commercial_use: "Commercial Use Available",
        licensing: "Perpetual global commercial license",
        date: "2026-08-19",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Warm, resonant mid-atlantic narrator cadence, subtle intake breaths...",
          seed: "VoiceID-MVR-78",
          render_resolution: "24-bit 96kHz Stereo / 5.1 Surround"
        }
      },
      {
        id: "port-marcus-2",
        creator_id: "marcus-vance",
        creator_name: "Marcus Vance",
        title: "Aeris AI — Global Multilingual Dubbing",
        description: "Synchronized multilingual voice localized across English, German, French, and Japanese for AI tech manifesto.",
        thumbnail_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        content_type: "Animation",
        style: "Cinematic",
        tools_used: ["ElevenLabs Enterprise", "ChatGPT"],
        models: ["Eleven Multilingual v2", "GPT-4o"],
        skills: ["Multilingual Dubbing", "AI Voiceover"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "Broadcast Stems (4 Languages)",
        aspect_ratio: "16:9",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-10",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Multilingual alignment with voice timbre preservation across all 4 locales...",
          seed: "VoiceID-AERIS-09",
          render_resolution: "Broadcast WAV Master"
        }
      }
    ]
  },
  {
    id: "aria-chen",
    name: "Aria Chen",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    headline: "AI Motion Designer & Generative 3D Artist",
    bio: "Bridging spline-based 3D animation with generative AI diffusion pipelines. Creates futuristic UI, motion graphics, and luxury brand title sequences.",
    location: "Tokyo, Japan",
    specialization: "Motion Graphics",
    skills: [
      "Motion Graphics",
      "3D Generation",
      "AI Animation",
      "Spline 3D Generation",
      "Stable Video Diffusion",
      "After Effects Compositing"
    ],
    tools: [
      "Cinema 4D",
      "Spline AI",
      "Stable Video Diffusion",
      "Runway Gen-3",
      "Blender 4.2"
    ],
    models: [
      "Runway Gen-3 Alpha",
      "SVD-XT",
      "Spline AI 2.0"
    ],
    content_types: [
      "3D",
      "Motion Graphics",
      "Animation"
    ],
    styles: [
      "Futuristic Minimalist",
      "Glassmorphism 3D",
      "Kinetic Typography",
      "Sci-Fi Holographic"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Full commercial buyout with editable 3D project files",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 4,
    hourly_rate: 125,
    rating: 4.95,
    completed_projects: 34,
    workflows: [
      { step_number: 1, name: "3D Geometry & Camera Blocking", description: "Blender spline blocking with camera motion trajectory", tools: ["Blender 4.2"] },
      { step_number: 2, name: "Generative Neural Texture Projection", description: "Texture map synthesis via Stable Diffusion ControlNet", tools: ["ComfyUI", "ControlNet"] },
      { step_number: 3, name: "Composite & Particle Polish", description: "Multi-layer render pass composite and post-effects", tools: ["After Effects"] }
    ],
    evidence_passport: [
      {
        id: "ev-aria-motion",
        claimed_skill: "3D Spline to AI Video Pipeline",
        tool_model: "Blender 4.2 + Runway Gen-3",
        portfolio_evidence: "Neural Interface 3D Title Sequence",
        workflow_evidence: "Camera trajectory curve export & render passes",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-12"
      }
    ],
    portfolio: [
      {
        id: "port-aria-1",
        creator_id: "aria-chen",
        creator_name: "Aria Chen",
        title: "NeoGlass — Holographic Device Reveal",
        description: "Interactive glassmorphic holographic device commercial with real-time refraction and fluid transitions.",
        thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        content_type: "3D",
        style: "Futuristic Minimalist",
        tools_used: ["Spline AI", "Blender 4.2", "After Effects"],
        models: ["Spline AI 2.0", "Stable Diffusion Depth"],
        skills: ["3D Generation", "Motion Graphics"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K 60fps MP4 & ProRes",
        aspect_ratio: "16:9 / 9:16",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-04",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Refractive frosted glass device with glowing emerald micro-circuits floating in dark studio...",
          seed: "3391048",
          render_resolution: "3840x2160 @ 60fps"
        }
      },
      {
        id: "port-aria-2",
        creator_id: "aria-chen",
        creator_name: "Aria Chen",
        title: "CyberWave — Kinetic UI Title Sequence",
        description: "Dynamic typographic title animation engineered with particle physics diffusion and temporal optical flares.",
        thumbnail_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
        content_type: "Motion Graphics",
        style: "Futuristic",
        tools_used: ["Cinema 4D", "Runway Gen-3", "After Effects"],
        models: ["Runway Gen-3 Alpha"],
        skills: ["Motion Graphics", "AI Animation"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K ProRes 4444",
        aspect_ratio: "16:9",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-15",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Kinetic neon wireframes dissolving into obsidian typography...",
          seed: "991024",
          render_resolution: "3840x2160 @ 60fps"
        }
      }
    ]
  },
  {
    id: "tariq-oconnor",
    name: "Tariq O'Connor",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    headline: "Commercial GenAI Creative Director & Prompt Architect",
    bio: "Over 8 years in creative direction leading brand identity for tech unicorns and Fortune 500s. Specializes in end-to-end multi-agent AI ad production from brief to final export.",
    location: "New York, NY",
    specialization: "Branding",
    skills: [
      "AI Filmmaking",
      "AI Video",
      "Generative Art",
      "Creative Direction",
      "Multi-Agent Prompting",
      "Brand Guardrail Control"
    ],
    tools: [
      "Midjourney v6.1",
      "Runway Gen-3 Alpha",
      "Flux.1 Pro",
      "ElevenLabs",
      "Premiere Pro"
    ],
    models: [
      "Midjourney v6.1",
      "Flux.1 Pro",
      "Runway Gen-3 Alpha"
    ],
    content_types: [
      "Video",
      "Image",
      "Commercial Ad"
    ],
    styles: [
      "Cinematic Lighting",
      "Hyper-Realistic",
      "High-Fashion Editorial",
      "Documentary Style"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Full commercial assignment with full legal indemnification guarantee",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 8,
    hourly_rate: 160,
    rating: 5.0,
    completed_projects: 64,
    workflows: [
      { step_number: 1, name: "Brand Voice & Visual Guardrails", description: "Formulating strict color and character brand guidelines", tools: ["Figma", "Claude 3.7"] },
      { step_number: 2, name: "Multi-Tool Asset Generation", description: "Synchronized visual and auditory asset creation", tools: ["Runway Gen-3", "Flux.1 Pro", "ElevenLabs"] },
      { step_number: 3, name: "Final Editorial Assembly", description: "Color pacing, timing, sound effects, and deliverables pack", tools: ["Premiere Pro"] }
    ],
    evidence_passport: [
      {
        id: "ev-tariq-full",
        claimed_skill: "Enterprise AI Campaign Production",
        tool_model: "Multi-Tool Integrated Pipeline",
        portfolio_evidence: "Nebula Global Product Launch Campaign",
        workflow_evidence: "Full creative deck, prompt logs, and agency signoff",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-01"
      }
    ],
    portfolio: [
      {
        id: "port-tariq-1",
        creator_id: "tariq-oconnor",
        creator_name: "Tariq O'Connor",
        title: "Nebula — The Intelligent Cloud",
        description: "Enterprise commercial exploring neural computing architectures with cinematic camera work and sound design.",
        thumbnail_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        content_type: "Video",
        style: "Cinematic Lighting",
        tools_used: ["Runway Gen-3", "Flux.1 Pro", "ElevenLabs"],
        models: ["Runway Gen-3", "Flux.1 Pro"],
        skills: ["AI Video", "AI Filmmaking", "Creative Direction"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K Master Video + Social Cutdowns",
        aspect_ratio: "16:9 / 9:16",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-08-22",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Atmospheric server hall transitioning into cosmic constellation of neural nodes...",
          seed: "8120491",
          render_resolution: "3840x2160 @ 60fps"
        }
      },
      {
        id: "port-tariq-2",
        creator_id: "tariq-oconnor",
        creator_name: "Tariq O'Connor",
        title: "Apex Horizon — High Fashion Autumn Campaign",
        description: "Haute couture virtual runway visual with fluid silk physics and hyper-realistic studio key lighting.",
        thumbnail_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        content_type: "Image",
        style: "Editorial",
        tools_used: ["Midjourney v6.1", "Flux.1 Pro", "Photoshop"],
        models: ["Midjourney v6.1", "Flux.1 Pro"],
        skills: ["AI Photography", "Generative Art"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "8K Billboard TIFF Master",
        aspect_ratio: "4:5 / 1:1",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-08",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Avant-garde editorial fashion model draped in copper woven silk on concrete brutalist stage...",
          seed: "7721094",
          render_resolution: "6144x7680"
        }
      }
    ]
  },
  {
    id: "maya-lin",
    name: "Maya Lin",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    headline: "AI Fashion Designer & Digital Human Visualist",
    bio: "Pioneering virtual fashion collections, digital garment physics, and ultra-realistic digital humans. Worked with top European luxury houses to create generative lookbooks.",
    location: "Paris, France",
    specialization: "Fashion",
    skills: [
      "AI Design",
      "AI Animation",
      "AI Photography",
      "Generative Art",
      "Digital Garment Physics",
      "Virtual Runway"
    ],
    tools: [
      "Midjourney v6.1",
      "Kling 1.5",
      "Sora",
      "Clo3D",
      "ComfyUI",
      "Adobe Firefly"
    ],
    models: [
      "Kling 1.5 Pro",
      "Sora Experimental",
      "Midjourney v6.1"
    ],
    content_types: [
      "Animation",
      "Video",
      "Image"
    ],
    styles: [
      "Luxury",
      "Editorial",
      "Surreal",
      "Cinematic"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Full commercial buyout with model rights waiver",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 5,
    hourly_rate: 140,
    rating: 4.97,
    completed_projects: 39,
    workflows: [
      { step_number: 1, name: "Textile & Silhouette Generation", description: "Generative texture maps and pattern iteration via Midjourney and Firefly", tools: ["Midjourney v6.1", "Adobe Firefly"] },
      { step_number: 2, name: "Garment Physics & Movement", description: "Dynamic fabric simulation and motion transfer", tools: ["Clo3D", "Kling 1.5"] },
      { step_number: 3, name: "Virtual Runway Compositing", description: "Multi-camera lighting match and 4K upscale", tools: ["Topaz Video AI", "DaVinci Resolve"] }
    ],
    evidence_passport: [
      {
        id: "ev-maya-fashion",
        claimed_skill: "Virtual Garment Physics & Runway Simulation",
        tool_model: "Clo3D + Kling 1.5 Pro",
        portfolio_evidence: "Maison Verte Generative Digital Runway",
        workflow_evidence: "Cloth simulation cache logs and token seeds",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-11"
      }
    ],
    portfolio: [
      {
        id: "port-maya-1",
        creator_id: "maya-lin",
        creator_name: "Maya Lin",
        title: "Maison Verte — Virtual Haute Couture",
        description: "15-look digital runway collection highlighting organic mycelium leather and bioluminescent embroidery in motion.",
        thumbnail_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        content_type: "Animation",
        style: "Luxury",
        tools_used: ["Kling 1.5", "Midjourney v6.1", "Clo3D"],
        models: ["Kling 1.5 Pro", "Midjourney v6.1"],
        skills: ["AI Design", "AI Animation", "Digital Garment Physics"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K 60fps MP4 & ProRes",
        aspect_ratio: "9:16",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-08-30",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Bioluminescent emerald green silk gown walking down wet marble runway with water reflections...",
          seed: "5510291",
          render_resolution: "3840x2160 @ 60fps"
        }
      },
      {
        id: "port-maya-2",
        creator_id: "maya-lin",
        creator_name: "Maya Lin",
        title: "Ethereal Glasswear — Virtual Accessories Lookbook",
        description: "Hyper-detailed generative campaign showcasing glass jewelry and refractive eyewear on digital models.",
        thumbnail_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
        content_type: "Image",
        style: "Editorial",
        tools_used: ["Midjourney v6.1", "Adobe Firefly", "Photoshop"],
        models: ["Midjourney v6.1"],
        skills: ["AI Photography", "Generative Art"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "8K TIFF Master",
        aspect_ratio: "4:5",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-14",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Refractive molten glass glasses resting on high-fashion model with pristine depth of field...",
          seed: "6610482",
          render_resolution: "6144x7680"
        }
      }
    ]
  },
  {
    id: "leo-sterling",
    name: "Leo Sterling",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    headline: "Commercial Automotive AI & Neural VFX Director",
    bio: "Specialist in automotive commercials, high-speed camera tracking, and neural environment generation. Delivers broadcast-ready commercials for electric vehicles and performance mobility brands.",
    location: "Stockholm, Sweden",
    specialization: "Film",
    skills: [
      "AI Filmmaking",
      "AI Video",
      "3D Generation",
      "Camera Motion Rigging",
      "High-Speed Dynamics",
      "Photorealistic Lighting"
    ],
    tools: [
      "Runway Gen-3 Alpha",
      "Sora",
      "Unreal Engine 5",
      "ComfyUI",
      "Topaz Video AI"
    ],
    models: [
      "Runway Gen-3 Alpha",
      "Sora",
      "SDXL Turbo"
    ],
    content_types: [
      "Video",
      "3D",
      "Commercial Ad"
    ],
    styles: [
      "Cinematic",
      "Realistic",
      "Futuristic"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Perpetual worldwide commercial license with source render passes",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 7,
    hourly_rate: 155,
    rating: 4.99,
    completed_projects: 47,
    workflows: [
      { step_number: 1, name: "Chassis & Wheel Consistency Anchor", description: "CAD model input anchored with ControlNet depth and normal maps", tools: ["Unreal Engine 5", "ComfyUI"] },
      { step_number: 2, name: "High-Speed Dynamic Video Synthesis", description: "Runway Gen-3 Alpha and Sora speed runs through dynamic climates", tools: ["Runway Gen-3 Alpha", "Sora"] },
      { step_number: 3, name: "Reflection & Tire Smoke Post-Process", description: "Optical flow velocity passes and HDR grade", tools: ["After Effects", "DaVinci Resolve"] }
    ],
    evidence_passport: [
      {
        id: "ev-leo-auto",
        claimed_skill: "Automotive Motion Consistency & Neural Lighting",
        tool_model: "Runway Gen-3 + Unreal Engine 5",
        portfolio_evidence: "AeroPulse EV Supercar Nordic Winter Run",
        workflow_evidence: "Camera tracking trajectory curves and frame-by-frame vector maps",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-07"
      }
    ],
    portfolio: [
      {
        id: "port-leo-1",
        creator_id: "leo-sterling",
        creator_name: "Leo Sterling",
        title: "AeroPulse EV — Nordic Winter Run",
        description: "Zero-latency electric supercar high-speed drifting across frozen Swedish lake with photorealistic snow spray physics.",
        thumbnail_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        content_type: "Video",
        style: "Cinematic",
        tools_used: ["Runway Gen-3 Alpha", "Unreal Engine 5", "Topaz Video AI"],
        models: ["Runway Gen-3 Alpha"],
        skills: ["AI Filmmaking", "AI Video", "High-Speed Dynamics"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K 60fps ProRes Master",
        aspect_ratio: "16:9",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-08-25",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Matte graphite electric hypercar drifting through powdered snow blizzard at twilight...",
          seed: "1092837",
          render_resolution: "3840x2160 @ 60fps"
        }
      },
      {
        id: "port-leo-2",
        creator_id: "leo-sterling",
        creator_name: "Leo Sterling",
        title: "Apex Aerodynamics — Wind Tunnel Flow",
        description: "Computational fluid dynamics visualized with generative volumetric neon air ribbons over sports coupe.",
        thumbnail_url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
        content_type: "3D",
        style: "Futuristic",
        tools_used: ["Sora", "Blender", "Topaz Video AI"],
        models: ["Sora", "Blender 4.2"],
        skills: ["3D Generation", "Camera Motion Rigging"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K Master (16:9)",
        aspect_ratio: "16:9",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-09",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Wind tunnel with glowing emerald laser laminar flow sweeping over curved automotive carbon wing...",
          seed: "4491028",
          render_resolution: "3840x2160 @ 60fps"
        }
      }
    ]
  },
  {
    id: "sophia-vance",
    name: "Sophia Vance",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    headline: "Generative Brand Identity & Graphic AI Designer",
    bio: "Pioneering algorithmic typography, generative brand systems, and print-ready vector diffusion pipelines for global consumer tech and wellness brands.",
    location: "San Francisco, CA",
    specialization: "Social Media",
    skills: [
      "AI Design",
      "Generative Art",
      "Motion Graphics",
      "Brand Identity System",
      "Typography Rigging",
      "Vector Synthesis"
    ],
    tools: [
      "Midjourney v6.1",
      "Adobe Firefly",
      "ChatGPT",
      "Flux.1 Pro",
      "Illustrator AI"
    ],
    models: [
      "Midjourney v6.1",
      "Flux.1 Pro",
      "GPT-4o",
      "Adobe Firefly 3"
    ],
    content_types: [
      "Image",
      "Motion Graphics",
      "Brand Visuals"
    ],
    styles: [
      "Minimal",
      "Futuristic",
      "Luxury",
      "Experimental"
    ],
    availability: "Available Now",
    commercial_use: "Commercial Ready",
    licensing_terms: "Full commercial buyout with complete brand styleguide handover",
    verification_status: "Verified",
    verification_badges: [
      "Identity Verified",
      "Tool Verified",
      "Portfolio Verified",
      "Workflow Verified",
      "Commercial Rights Verified"
    ],
    experience_years: 6,
    hourly_rate: 130,
    rating: 4.97,
    completed_projects: 53,
    workflows: [
      { step_number: 1, name: "Algorithmic Color & Font Matrix", description: "Prompt-driven palette and typographic taxonomy development", tools: ["ChatGPT", "Figma"] },
      { step_number: 2, name: "Multi-Format Asset Synthesis", description: "Flux and Midjourney asset generation across social, web, and billboard aspect ratios", tools: ["Flux.1 Pro", "Midjourney v6.1"] },
      { step_number: 3, name: "Vectorization & Export Matrix", description: "Lossless vector conversion and commercial brand kit packaging", tools: ["Illustrator AI", "Adobe Firefly"] }
    ],
    evidence_passport: [
      {
        id: "ev-sophia-brand",
        claimed_skill: "Generative Brand Identity System",
        tool_model: "Flux.1 Pro + Illustrator AI",
        portfolio_evidence: "Verve Botanicals Omnichannel Brand System",
        workflow_evidence: "Prompt matrix style tokens and SVG vector assets",
        evidence_status: "Verified",
        review_status: "Approved",
        verified_at: "2026-09-17"
      }
    ],
    portfolio: [
      {
        id: "port-sophia-1",
        creator_id: "sophia-vance",
        creator_name: "Sophia Vance",
        title: "Verve Botanicals — Omnichannel Identity Pack",
        description: "Complete visual identity and 20 social media launch assets for sustainable luxury wellness brand.",
        thumbnail_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80",
        content_type: "Image",
        style: "Minimal",
        tools_used: ["Flux.1 Pro", "Adobe Firefly", "Illustrator AI"],
        models: ["Flux.1 Pro", "Adobe Firefly 3"],
        skills: ["AI Design", "Generative Art", "Brand Identity System"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "Vector SVG & 8K TIFF Master",
        aspect_ratio: "1:1 / 4:5",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-01",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Minimalist botanical typography in earthy olive and warm travertine beige...",
          seed: "7710294",
          render_resolution: "6144x6144"
        }
      },
      {
        id: "port-sophia-2",
        creator_id: "sophia-vance",
        creator_name: "Sophia Vance",
        title: "Synapse — AI Conference Identity & Title Art",
        description: "Futuristic visual branding for global machine intelligence conference with generative neural lattice glyphs.",
        thumbnail_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
        media_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
        content_type: "Motion Graphics",
        style: "Futuristic",
        tools_used: ["Midjourney v6.1", "ChatGPT", "After Effects"],
        models: ["Midjourney v6.1", "GPT-4o"],
        skills: ["AI Design", "Motion Graphics"],
        workflow: "Concept → Prompting → Generation → Selection → Editing → Upscaling → Final Delivery",
        output_format: "4K Master (16:9)",
        aspect_ratio: "16:9",
        commercial_use: "Commercial Use Available",
        licensing: "Full commercial buyout",
        date: "2026-09-16",
        evidence_status: "Verified",
        evidence_details: {
          prompt_preview: "Intricate metallic typographic glyph morphing into radiant fiber-optic connections...",
          seed: "8820194",
          render_resolution: "3840x2160"
        }
      }
    ]
  }
];

export const initialBriefs = [
  {
    id: "brief-solaria-2026",
    brand_id: "brand-solaria",
    brand_name: "Solaria Clean Tech",
    campaign_name: "Solaria Kinetic — Clean Energy Revolution 2026",
    objective: "Produce a high-impact 20-second vertical social commercial demonstrating Solaria's futuristic solar glass panels on high-rise architecture with pristine liquid reflection physics and photorealistic materials.",
    description: "The video must highlight light refraction, rainwater bead run-off, and glowing solar nano-crystals without uncanny visual artifacts.",
    target_audience: "Eco-forward corporate architects, urban planners, and sustainability innovators aged 25-50.",
    content_type: "AI Video",
    creative_style: "Cinematic",
    platform: "Instagram Reels / TikTok / YouTube Shorts",
    aspect_ratio: "9:16",
    duration: "20 seconds",
    required_skills: ["AI Video", "AI Filmmaking", "Dynamic Fluid Control"],
    required_tools: ["Runway Gen-3 Alpha", "Kling", "Topaz Video AI"],
    commercial_use_req: "Full Commercial Rights",
    licensing_req: "Perpetual commercial license, no recurring royalties",
    budget: "$3,500 - $5,000",
    deadline: "14 business days",
    deliverables: [
      "1x Master 20-second commercial (9:16, 4K 60fps ProRes & MP4)",
      "3x 5-second vertical hook cutdowns",
      "Prompt Architecture & Seed Token Documentation",
      "CREOVATE Commercial IP Assignment Contract"
    ],
    references: ["https://images.unsplash.com/photo-1509391365360-2e959784a276"],
    additional_notes: "Focus on clean camera movement and optical fidelity. Avoid synthetic warping.",
    status: "Active"
  },
  {
    id: "brief-aura-botanica",
    brand_id: "brand-aura",
    brand_name: "Aura Botanica",
    campaign_name: "Aura Botanica — Organic Radiance Key Art Series",
    objective: "Generate a suite of 10 photorealistic commercial studio visuals showing the organic glass dropper bottle in natural sunlight, water reflections, and botanical settings with 100% bottle label consistency.",
    description: "Every asset must maintain the exact brand bottle geometry and typography across different ambient lighting conditions.",
    target_audience: "Luxury skincare and wellness consumers seeking organic clean beauty.",
    content_type: "AI Image",
    creative_style: "Editorial",
    platform: "E-Commerce / Instagram Feed / Print Key Art",
    aspect_ratio: "1:1",
    duration: "Static Imagery",
    required_skills: ["AI Photography", "Generative Art", "Product Preservation"],
    required_tools: ["Flux.1 Pro", "ComfyUI", "Adobe Firefly"],
    commercial_use_req: "Full Commercial Rights",
    licensing_req: "Perpetual commercial license",
    budget: "$2,800 - $4,200",
    deadline: "10 business days",
    deliverables: [
      "10x 8K Master Retouched Key Art Images",
      "Custom LoRA Checkpoint weights & training documentation",
      "Full Commercial Copyright Assignment"
    ],
    references: ["https://images.unsplash.com/photo-1608248597359-58a0e9b9409b"],
    additional_notes: "Must achieve zero label drift across all 10 images.",
    status: "Active"
  },
  {
    id: "brief-aeropulse-2026",
    brand_id: "brand-aeropulse",
    brand_name: "AeroPulse Motors",
    campaign_name: "AeroPulse EV — Autonomous Supercar Global Reveal",
    objective: "Create a 30-second cinematic high-speed commercial featuring the AeroPulse autonomous electric hypercar carving through mountain passes at dawn with photorealistic camera motion and sound sync.",
    description: "Needs dynamic aerodynamic air currents, realistic tire smoke, and true reflections on carbon fiber bodywork.",
    target_audience: "Automotive enthusiasts, luxury EV buyers, and technology early adopters aged 28-55.",
    content_type: "AI Video",
    creative_style: "Cinematic",
    platform: "YouTube / Connected TV / Digital Billboards",
    aspect_ratio: "16:9",
    duration: "30 seconds",
    required_skills: ["AI Filmmaking", "AI Video", "Camera Motion Rigging"],
    required_tools: ["Runway Gen-3 Alpha", "Sora", "Topaz Video AI"],
    commercial_use_req: "Full Commercial Rights",
    licensing_req: "Worldwide broadcast commercial license",
    budget: "$5,000 - $8,000",
    deadline: "18 business days",
    deliverables: [
      "1x 30-second broadcast master (16:9, 4K 60fps ProRes)",
      "2x 15-second cutdowns for social ads (9:16)",
      "VFX camera tracking project files & commercial release"
    ],
    references: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70"],
    additional_notes: "Broadcast color grade required (ACEScc or Rec.709 Master).",
    status: "Active"
  },
  {
    id: "brief-lumina-arc",
    brand_id: "brand-lumina",
    brand_name: "Lumina Tech",
    campaign_name: "Lumina Arc — Spatial Computing Smart Glasses Reveal",
    objective: "Produce an interactive glassmorphic 3D holographic teaser and 15-second motion piece demonstrating holographic AR interfaces floating seamlessly over real-world environments.",
    description: "The teaser will show micro-LED projectors inside transparent frames creating floating spatial widgets.",
    target_audience: "Spatial developers, AR enthusiasts, tech executives aged 22-45.",
    content_type: "3D Content",
    creative_style: "Futuristic",
    platform: "Twitter / Product Hunt / Website Hero / Instagram",
    aspect_ratio: "16:9",
    duration: "15 seconds",
    required_skills: ["3D Generation", "Motion Graphics", "AI Animation"],
    required_tools: ["Spline AI", "Runway Gen-3 Alpha", "Blender"],
    commercial_use_req: "Full Commercial Rights",
    licensing_req: "Perpetual commercial buyout",
    budget: "$4,200 - $6,500",
    deadline: "12 business days",
    deliverables: [
      "1x 15-second 4K 60fps Master Video",
      "Interactive 3D WebGL / Spline embed code",
      "Layered source project files & prompt ledger"
    ],
    references: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"],
    additional_notes: "Must feel like a premium Apple/Meta tier hardware announcement.",
    status: "Active"
  },
  {
    id: "brief-verve-fragrance",
    brand_id: "brand-verve",
    brand_name: "Verve Paris",
    campaign_name: "Verve Botanicals — Zero-Waste Luxury Fragrance Launch",
    objective: "Design a complete digital campaign combining animated motion posters and 8K visual still lifes showcasing refillable sculpted recycled glass bottles surrounded by rare botanical flora.",
    description: "Rich textural interplay of condensation, sunlight refracts through amber glass, and pollen particle micro-motion.",
    target_audience: "Affluent conscious luxury buyers, fragrance collectors aged 24-48.",
    content_type: "Social Media Content",
    creative_style: "Luxury",
    platform: "Instagram Feed & Stories / TikTok / Vogue Digital Ads",
    aspect_ratio: "4:5",
    duration: "10 seconds loop + 6 Stills",
    required_skills: ["AI Design", "Generative Art", "AI Photography"],
    required_tools: ["Midjourney v6.1", "Flux.1 Pro", "Adobe Firefly"],
    commercial_use_req: "Commercial License Required",
    licensing_req: "Perpetual digital advertising license",
    budget: "$3,000 - $4,800",
    deadline: "10 business days",
    deliverables: [
      "6x 8K Master Retouched Key Art Images",
      "3x 10-second seamless vertical looping motion posters",
      "Commercial clearance documentation"
    ],
    references: ["https://images.unsplash.com/photo-1547887537-6158d64c35b3"],
    additional_notes: "Refined luxury color aesthetic: forest green, travertine, amber, brushed gold.",
    status: "Active"
  }
];

export const initialEngagements = [
  {
    id: "eng-solaria-kai",
    brief_id: "brief-solaria-2026",
    campaign_name: "Solaria Kinetic — Clean Energy Revolution 2026",
    creator_id: "kai-sterling",
    creator_name: "Kai Sterling",
    creator_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    brand_id: "brand-solaria",
    brand_name: "Solaria Clean Tech",
    status: "In Progress", // Discovery -> Shortlisted -> Invited -> Accepted -> In Progress -> Review -> Delivered
    stage_name: "High-Resolution Render & Temporal Inpainting",
    current_stage_index: 5,
    deadline: "Day 14 (4 business days remaining)",
    deliverables: [
      "1x Master 20s 4K 60fps Video",
      "3x Hook Variations",
      "Prompt Vault Documentation"
    ],
    milestones: [
      { name: "Discovery & Brief Alignment", status: "Completed", due: "Day 1" },
      { name: "Creative Strategy & Seed Testing", status: "Completed", due: "Day 3" },
      { name: "Camera Motion Rigging & Renders", status: "Completed", due: "Day 6" },
      { name: "Temporal In-Painting & Artifact Scrub", status: "In Progress", due: "Day 10" },
      { name: "Final 4K Master & IP Handover", status: "Pending", due: "Day 14" }
    ],
    commercial_license_status: "Executed & Verified",
    commercial_use_req: "Full commercial buyout with worldwide digital ad rights",
    total_budget: "$4,500",
    last_updated: "2 hours ago"
  },
  {
    id: "eng-aura-elena",
    brief_id: "brief-aura-botanica",
    campaign_name: "Aura Botanica — Organic Radiance Key Art Series",
    creator_id: "elena-rostova",
    creator_name: "Elena Rostova",
    creator_avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    brand_id: "brand-aura",
    brand_name: "Aura Botanica",
    status: "Delivered",
    stage_name: "Master Assets Delivered & IP Handover Completed",
    current_stage_index: 7,
    deadline: "Completed on Schedule",
    deliverables: [
      "10x 8K Master Retouched Key Art Images",
      "Custom LoRA Weights Checkpoint",
      "IP Assignment Agreement"
    ],
    milestones: [
      { name: "Dataset Capture & Photogrammetry", status: "Completed", due: "Day 2" },
      { name: "LoRA Training & Epoch Signoff", status: "Completed", due: "Day 5" },
      { name: "10-Angle Generation Sweep", status: "Completed", due: "Day 8" },
      { name: "Final 8K Master Pack Delivery", status: "Completed", due: "Day 10" }
    ],
    commercial_license_status: "Completed & Registered in CREOVATE Vault",
    commercial_use_req: "Full commercial rights including LoRA model weights",
    total_budget: "$3,800",
    last_updated: "Yesterday"
  },
  {
    id: "eng-aeropulse-leo",
    brief_id: "brief-aeropulse-2026",
    campaign_name: "AeroPulse EV — Autonomous Supercar Reveal 2026",
    creator_id: "leo-sterling",
    creator_name: "Leo Sterling",
    creator_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    brand_id: "brand-aeropulse",
    brand_name: "AeroPulse Motors",
    status: "Shortlisted",
    stage_name: "Technical Portfolio & Telemetry Review",
    current_stage_index: 2,
    deadline: "18 business days",
    deliverables: [
      "1x 30-second broadcast master (16:9 4K 60fps)",
      "2x 15-second cutdowns",
      "Full VFX Camera Rig Files"
    ],
    milestones: [
      { name: "Creator Discovery & Technical Shortlist", status: "Completed", due: "Day 1" },
      { name: "Brief Invitation & Terms Agreement", status: "In Progress", due: "Day 3" },
      { name: "Initial Renders & Motion Review", status: "Pending", due: "Day 8" },
      { name: "Final Broadcast Delivery", status: "Pending", due: "Day 18" }
    ],
    commercial_license_status: "Draft Contract Ready",
    commercial_use_req: "Full commercial rights with worldwide digital ad rights",
    total_budget: "$6,500",
    last_updated: "3 hours ago"
  },
  {
    id: "eng-lumina-aria",
    brief_id: "brief-lumina-arc",
    campaign_name: "Lumina Arc — Spatial Computing Smart Glasses",
    creator_id: "aria-chen",
    creator_name: "Aria Chen",
    creator_avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    brand_id: "brand-lumina",
    brand_name: "Lumina Tech",
    status: "Invited",
    stage_name: "Invitation Sent — Awaiting Creator Confirmation",
    current_stage_index: 3,
    deadline: "12 business days",
    deliverables: [
      "1x 15-second 4K Master Video",
      "Interactive 3D Spline Asset",
      "Prompt Ledger"
    ],
    milestones: [
      { name: "Brief Publication & Smart Match", status: "Completed", due: "Day 1" },
      { name: "Official Invitation to Creator", status: "In Progress", due: "Day 2" },
      { name: "Concept Blocking & Spline Rigging", status: "Pending", due: "Day 6" },
      { name: "Final Render Delivery", status: "Pending", due: "Day 12" }
    ],
    commercial_license_status: "Awaiting Confirmation",
    commercial_use_req: "Full Commercial Rights",
    total_budget: "$5,200",
    last_updated: "5 hours ago"
  },
  {
    id: "eng-verve-sophia",
    brief_id: "brief-verve-fragrance",
    campaign_name: "Verve Botanicals — Zero-Waste Luxury Fragrance",
    creator_id: "sophia-vance",
    creator_name: "Sophia Vance",
    creator_avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    brand_id: "brand-verve",
    brand_name: "Verve Paris",
    status: "Review",
    stage_name: "Client Feedback & Review on 8K Stills",
    current_stage_index: 6,
    deadline: "2 business days remaining",
    deliverables: [
      "6x 8K Master Retouched Key Art Images",
      "3x 10-second vertical looping motion posters",
      "Commercial clearance documentation"
    ],
    milestones: [
      { name: "Brief Accepted & Moodboard Approved", status: "Completed", due: "Day 2" },
      { name: "Asset Synthesis & Vector Packaging", status: "Completed", due: "Day 5" },
      { name: "Motion Posters Rendering", status: "Completed", due: "Day 8" },
      { name: "Final Client Review & Signoff", status: "In Progress", due: "Day 10" }
    ],
    commercial_license_status: "Approved — Awaiting Final Signoff",
    commercial_use_req: "Commercial License Required",
    total_budget: "$4,200",
    last_updated: "Just now"
  }
];
