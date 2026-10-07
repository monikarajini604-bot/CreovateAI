"""
CREOVATE AI - In-Memory & File-Backed Marketplace Database
Provides full persistence, seed data, and realistic creator portfolios.
"""

import uuid
from datetime import datetime
from typing import List, Dict, Optional, Any
from backend.models.schemas import (
    CreatorProfile, PortfolioItem, EvidenceItem, WorkflowStage,
    CreativeBrief, ShortlistItem, Engagement
)

# Seed Realistic Fictional Creators
CREATORS_DB: Dict[str, CreatorProfile] = {}
BRIEFS_DB: Dict[str, CreativeBrief] = {}
SHORTLISTS_DB: Dict[str, ShortlistItem] = {}
ENGAGEMENTS_DB: Dict[str, Engagement] = {}

def get_iso_now():
    return datetime.utcnow().strftime("%Y-%m-%d %H:%M:%SZ")

def init_seed_data():
    if CREATORS_DB:
        return

    kai_id = "creator-kai-sterling"
    elena_id = "creator-elena-rostova"
    marcus_id = "creator-marcus-vance"
    aria_id = "creator-aria-chen"
    tariq_id = "creator-tariq-oconnor"

    # 1. KAI STERLING (Top Match for EcoSip)
    kai_workflows = [
        WorkflowStage(step_number=1, name="Concept & Visual Direction", description="Moodboards, prompt architecture, color palette definition in accordance with brand identity.", tools=["ChatGPT-4o", "Midjourney v6"]),
        WorkflowStage(step_number=2, name="Multi-Angle Generative Video", description="Batch prompting and camera motion control (pan, orbit, push-in) with high seed consistency.", tools=["Runway Gen-3 Alpha", "Kling AI"]),
        WorkflowStage(step_number=3, name="Latent Frame Selection", description="Curation of top generations, anomaly filtering, edge refinement.", tools=["ComfyUI v0.2.4", "Photoshop Generative Fill"]),
        WorkflowStage(step_number=4, name="Editing & Timing", description="Cutdown to vertical 9:16 aspect ratio, micro-pacing, sound effects and dynamic text overlay.", tools=["DaVinci Resolve Studio", "Premiere Pro"]),
        WorkflowStage(step_number=5, name="Enhancement & Upscaling", description="Temporal de-noising, artifact reduction, native 4K 60fps interpolation.", tools=["Topaz Video AI 5.2"]),
        WorkflowStage(step_number=6, name="Final Delivery & Licensing", description="Package master ProRes 422 + social MP4s + signed commercial IP release certificate.", tools=["Frame.io", "Creovate Passport"])
    ]

    kai_evidence = [
        EvidenceItem(
            id="ev-kai-1",
            claimed_skill="Camera Motion Control LoRAs",
            tool_model="Runway Gen-3 Alpha",
            portfolio_evidence="HydroPure Eco Ad (0:00-0:08 fluid orbit camera)",
            workflow_evidence="Raw Runway batch logs with seed tracking and camera control parameters",
            evidence_status="Reviewed",
            review_status="Peer Reviewed & Artifact Verified",
            verified_at="2026-09-15"
        ),
        EvidenceItem(
            id="ev-kai-2",
            claimed_skill="9:16 Vertical E-Commerce Video Pacing",
            tool_model="Topaz Video AI + DaVinci",
            portfolio_evidence="Volt Kinetic Energy Drink campaign (TikTok 2M+ views)",
            workflow_evidence="DaVinci timeline export showing color consistency across AI cuts",
            evidence_status="Reviewed",
            review_status="Commercial Client Verified",
            verified_at="2026-08-20"
        ),
        EvidenceItem(
            id="ev-kai-3",
            claimed_skill="Custom ComfyUI Node Automation",
            tool_model="ComfyUI v0.2.4",
            portfolio_evidence="Lumina Serum Hyper-real bottle textures",
            workflow_evidence="ComfyUI node graph JSON provided in Creovate Evidence Vault",
            evidence_status="Evidence provided",
            review_status="Model Artifacts Verified",
            verified_at="2026-09-02"
        )
    ]

    kai_portfolio = [
        PortfolioItem(
            id="port-kai-1",
            creator_id=kai_id,
            creator_name="Kai Sterling",
            title="HydroPure — Eco-Friendly Bottle 360 Commercial",
            description="High-velocity 20s commercial highlighting condensation, sustainable bamboo cap, and crystal-clear glacier water streams.",
            thumbnail_url="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Video",
            style="Hyper-Realistic",
            tools_used=["Runway Gen-3 Alpha", "Midjourney v6", "Topaz Video AI"],
            workflow="Midjourney product seeds -> Runway Gen-3 text-to-video with motion sliders -> Topaz 4K 60fps remaster",
            output_format="MP4 (ProRes 422)",
            aspect_ratio="9:16",
            commercial_use="Commercial use available",
            licensing="Full perpetual commercial buyout with global digital rights",
            evidence_status="Reviewed",
            evidence_details={"render_time_hrs": 4.5, "seed_consistency_rating": "98%", "human_touch_ratio": "35% editing"}
        ),
        PortfolioItem(
            id="port-kai-2",
            creator_id=kai_id,
            creator_name="Kai Sterling",
            title="Volt Kinetic — Electrolyte Beverage Ad",
            description="Dynamic macro liquid splashes and neon ice cubes designed for high-conversion social ad campaigns.",
            thumbnail_url="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Video",
            style="Neo-Commercial",
            tools_used=["Runway Gen-3 Alpha", "ComfyUI", "DaVinci Resolve"],
            workflow="ComfyUI fluid simulation seeds -> Runway Gen-3 camera zooms -> Sound design in DaVinci Fairlight",
            output_format="MP4 (H.265)",
            aspect_ratio="9:16",
            commercial_use="Commercial use available",
            licensing="Social media broadcast rights included",
            evidence_status="Evidence provided",
            evidence_details={"client": "Volt Hydration", "reach": "3.4M Impressions"}
        ),
        PortfolioItem(
            id="port-kai-3",
            creator_id=kai_id,
            creator_name="Kai Sterling",
            title="Lumina Botanical — Organic Skincare Reveal",
            description="Photorealistic glass bottle rendering amidst blooming wildflowers with sun rays and dew droplets.",
            thumbnail_url="https://images.unsplash.com/photo-1608248597359-2e612502613b?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1608248597359-2e612502613b?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Product Render",
            style="Cinematic",
            tools_used=["Midjourney v6", "ComfyUI", "Magnific AI"],
            workflow="Midjourney base textures -> Magnific 8x upscaling -> Photoshop packaging labels",
            output_format="PNG (8K)",
            aspect_ratio="1:1",
            commercial_use="Commercial use available",
            licensing="Unlimited digital and print license",
            evidence_status="Reviewed",
            evidence_details={"print_dpi": 300, "packaging_alignment": "100% Vector verified"}
        )
    ]

    CREATORS_DB[kai_id] = CreatorProfile(
        id=kai_id,
        name="Kai Sterling",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        headline="AI Commercial Filmmaker & Product Advertising Specialist",
        bio="Specializing in viral 9:16 vertical commercial ads for consumer and lifestyle brands. 4+ years turning generative video models into high-converting retail spots with zero uncanny valley.",
        specialization="AI Product Advertiser",
        skills=["Prompt Engineering", "Camera Control & Motion LoRAs", "Color Grading & Pacing", "Product Rendering", "Topaz 4K Upscaling"],
        tools=["Runway Gen-3", "Midjourney v6", "ComfyUI", "Topaz Video AI", "Kling AI", "DaVinci Resolve"],
        content_types=["AI Video", "AI Product Render", "Motion Graphics"],
        styles=["Hyper-Realistic", "Neo-Commercial", "Cinematic"],
        workflows=kai_workflows,
        commercial_use="Commercial use available",
        licensing_terms="Full commercial buyout with brand exclusivity during campaign run.",
        verification_status="Reviewed",
        experience_years=4,
        hourly_rate=145,
        rating=4.98,
        completed_projects=38,
        evidence_passport=kai_evidence,
        portfolio=kai_portfolio
    )

    # 2. ELENA ROSTOVA
    elena_workflows = [
        WorkflowStage(step_number=1, name="Style Exploration", description="Color theory and stylized visual keyframes.", tools=["Midjourney v6", "Blender"]),
        WorkflowStage(step_number=2, name="Generative 3D Mesh & Depth", description="Converting 2D concepts into spatial meshes and depth maps.", tools=["Luma Dream Machine", "ComfyUI Depth"]),
        WorkflowStage(step_number=3, name="Animation Interpolation", description="Smooth 60fps frame synthesis with stylized physics.", tools=["Stable Video Diffusion", "Kling AI"]),
        WorkflowStage(step_number=4, name="Composite & Lighting", description="Post-processing lighting passes, bloom, and stylized particle effects.", tools=["After Effects AI"]),
        WorkflowStage(step_number=5, name="Format Delivery", description="Mastering in both 16:9 widescreen and 9:16 vertical.", tools=["Media Encoder"])
    ]

    elena_evidence = [
        EvidenceItem(
            id="ev-elena-1",
            claimed_skill="Generative 3D Depth Map Integration",
            tool_model="Luma Dream Machine & Blender",
            portfolio_evidence="Bioluminescent Flora 3D Sequence",
            workflow_evidence="Blender viewport screen recording with Luma projection meshes",
            evidence_status="Reviewed",
            review_status="Peer Reviewed & Artifact Verified",
            verified_at="2026-09-10"
        ),
        EvidenceItem(
            id="ev-elena-2",
            claimed_skill="Surreal Product Animation",
            tool_model="Stable Video Diffusion",
            portfolio_evidence="Zero-Gravity Sneaker Morph",
            workflow_evidence="Checkpoint weights and LoRA configurations submitted",
            evidence_status="Evidence provided",
            review_status="Awaiting Secondary Review",
            verified_at="2026-08-29"
        )
    ]

    elena_portfolio = [
        PortfolioItem(
            id="port-elena-1",
            creator_id=elena_id,
            creator_name="Elena Rostova",
            title="Aura Botanical — Surreal Eco Oasis",
            description="Dreamlike botanical realm with floating liquid spheres and holographic natural motifs for sustainable luxury brands.",
            thumbnail_url="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Animation",
            style="Surreal",
            tools_used=["Luma Dream Machine", "Midjourney v6", "Blender AI"],
            workflow="Midjourney prompts -> Luma camera paths -> Blender composite",
            output_format="MP4 (ProRes)",
            aspect_ratio="16:9",
            commercial_use="Commercial use available",
            licensing="Standard Commercial Broadcast License",
            evidence_status="Reviewed",
            evidence_details={"resolution": "3840x2160", "fps": 60}
        ),
        PortfolioItem(
            id="port-elena-2",
            creator_id=elena_id,
            creator_name="Elena Rostova",
            title="BioSphere — Zero Waste Future Capsule",
            description="Abstract 3D motion graphics visualizing biodegradable packaging materials breaking down into nutrient-rich soil.",
            thumbnail_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            content_type="Generative 3D",
            style="Minimalist",
            tools_used=["Kling AI", "ComfyUI", "Blender"],
            workflow="Depth map conditioning -> Diffusion interpolation",
            output_format="MP4 (H.264)",
            aspect_ratio="9:16",
            commercial_use="Commercial use available",
            licensing="Digital Media Buyout",
            evidence_status="Evidence provided",
            evidence_details={"duration_sec": 15}
        )
    ]

    CREATORS_DB[elena_id] = CreatorProfile(
        id=elena_id,
        name="Elena Rostova",
        avatar_url="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
        headline="Generative 3D Artist & AI Animator",
        bio="Pioneering the intersection of neural generation and 3D spatial design. Expert in ethereal, nature-inspired surrealism and product physics simulation.",
        specialization="AI Animator",
        skills=["Generative 3D", "Stylized Visuals", "Particle Physics AI", "Camera Paths", "LoRA Character Rigging"],
        tools=["Luma Dream Machine", "Midjourney v6", "Blender AI", "Kling AI", "Stable Video Diffusion"],
        content_types=["AI Animation", "Generative 3D", "AI Video"],
        styles=["Surreal", "Minimalist", "Cinematic"],
        workflows=elena_workflows,
        commercial_use="Commercial use available",
        licensing_terms="Standard and premium commercial licenses with clear IP indemnification.",
        verification_status="Reviewed",
        experience_years=3,
        hourly_rate=130,
        rating=4.92,
        completed_projects=29,
        evidence_passport=elena_evidence,
        portfolio=elena_portfolio
    )

    # 3. MARCUS VANCE
    marcus_workflows = [
        WorkflowStage(step_number=1, name="Narrative Script & Shot List", description="Generative story generation aligned with emotional brand pillars.", tools=["Claude 3.5", "ChatGPT"]),
        WorkflowStage(step_number=2, name="Cinematic Lighting Generations", description="Photorealistic film stock emulations (35mm, anamorphic lenses).", tools=["Midjourney v6", "Runway Gen-3"]),
        WorkflowStage(step_number=3, name="Lip-Sync & Voice Generation", description="Expressive AI voice acting and mouth synchronisation.", tools=["ElevenLabs", "Hedra AI"]),
        WorkflowStage(step_number=4, name="Soundtrack & Mixing", description="Custom atmospheric audio scores and sound design.", tools=["Suno v3", "Pro Tools"]),
        WorkflowStage(step_number=5, name="Color Grading & Master", description="Kodak 2383 film print emulation.", tools=["DaVinci Resolve"])
    ]

    marcus_evidence = [
        EvidenceItem(
            id="ev-marcus-1",
            claimed_skill="Anamorphic Lens Prompt Architecture",
            tool_model="Midjourney v6 & Runway Gen-3",
            portfolio_evidence="The Last Explorer (Short Film)",
            workflow_evidence="Complete prompt cookbook with optical aberration parameters",
            evidence_status="Reviewed",
            review_status="Film Festival Verified",
            verified_at="2026-07-19"
        )
    ]

    marcus_portfolio = [
        PortfolioItem(
            id="port-marcus-1",
            creator_id=marcus_id,
            creator_name="Marcus Vance",
            title="The Blue Frontier — Eco Documentary Prologue",
            description="Breathtaking cinematic trailer depicting marine preservation and oceanic cleanup expeditions.",
            thumbnail_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Video",
            style="Cinematic",
            tools_used=["Runway Gen-3", "Midjourney v6", "ElevenLabs"],
            workflow="Midjourney cinematic plates -> Runway motion -> ElevenLabs voiceover",
            output_format="MP4 (ProRes)",
            aspect_ratio="16:9",
            commercial_use="Commercial use available",
            licensing="Global broadcast and theatrical rights",
            evidence_status="Reviewed",
            evidence_details={"camera_style": "Arri Alexa LF simulation"}
        )
    ]

    CREATORS_DB[marcus_id] = CreatorProfile(
        id=marcus_id,
        name="Marcus Vance",
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
        headline="AI Filmmaker & Narrative Commercial Director",
        bio="Award-winning director applying generative cinematic pipelines to brand storytelling. Featured at AI Film Festivals in Los Angeles and London.",
        specialization="AI Filmmaker",
        skills=["Cinematic Storyboarding", "Lighting Prompts", "Voice Sync", "Film Emulation", "Directing"],
        tools=["Runway Gen-3", "Midjourney v6", "ElevenLabs", "Pika Labs", "DaVinci Resolve"],
        content_types=["AI Video", "Commercials", "Narrative Shorts"],
        styles=["Cinematic", "Photorealistic", "Atmospheric"],
        workflows=marcus_workflows,
        commercial_use="Commercial use available",
        licensing_terms="Full commercial buyout with theatrical & streaming options.",
        verification_status="Reviewed",
        experience_years=5,
        hourly_rate=160,
        rating=4.88,
        completed_projects=42,
        evidence_passport=marcus_evidence,
        portfolio=marcus_portfolio
    )

    # 4. ARIA CHEN
    aria_workflows = [
        WorkflowStage(step_number=1, name="Vector & Aesthetic Moodboard", description="Scandi-minimalist and contemporary clean aesthetic research.", tools=["Pinterest", "ChatGPT"]),
        WorkflowStage(step_number=2, name="Prompt Crafting & Packaging Renders", description="Clean studio product lighting, zero visual noise, perfect materials.", tools=["Midjourney v6", "DALL-E 3"]),
        WorkflowStage(step_number=3, name="Typography & Label Alignment", description="Adding real vector typography to AI product surfaces without blur.", tools=["Illustrator", "Photoshop"]),
        WorkflowStage(step_number=4, name="High-Res Vector Synthesis", description="8K print-ready and web-optimized raster deliverables.", tools=["Magnific AI"])
    ]

    aria_evidence = [
        EvidenceItem(
            id="ev-aria-1",
            claimed_skill="Packaging Render Cleanliness",
            tool_model="Midjourney v6 + Magnific AI",
            portfolio_evidence="Pure Nordic Water Glass Bottle",
            workflow_evidence="Side-by-side comparison of raw prompt vs post-processed vector label",
            evidence_status="Evidence provided",
            review_status="Awaiting Peer Verification",
            verified_at="2026-09-22"
        )
    ]

    aria_portfolio = [
        PortfolioItem(
            id="port-aria-1",
            creator_id=aria_id,
            creator_name="Aria Chen",
            title="Nordic Stream — Minimalist Glass Bottle",
            description="Clean Scandinavian aesthetic, frosted glass, recycled wood cap, set in serene morning light.",
            thumbnail_url="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Product Render",
            style="Minimalist",
            tools_used=["Midjourney v6", "Magnific AI", "Adobe Firefly"],
            workflow="Prompt engineering -> Magnific 4x -> Typography vector layout",
            output_format="PNG (8K)",
            aspect_ratio="1:1",
            commercial_use="Commercial use available",
            licensing="Commercial use with full digital rights",
            evidence_status="Evidence provided",
            evidence_details={"dpi": 300, "color_space": "sRGB & Adobe RGB"}
        )
    ]

    CREATORS_DB[aria_id] = CreatorProfile(
        id=aria_id,
        name="Aria Chen",
        avatar_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
        headline="Generative Designer & Brand Visualizer",
        bio="Creating crisp, minimal generative product renders for sustainable direct-to-consumer lifestyle brands. Focus on immaculate typography integration.",
        specialization="Generative Designer",
        skills=["Product Packaging", "Brand Visual Identity", "Vector Synthesis", "Studio Lighting", "Minimalist Aesthetics"],
        tools=["Midjourney v6", "DALL-E 3", "Magnific AI", "Adobe Firefly", "Photoshop"],
        content_types=["AI Product Render", "Brand Visuals", "Social Creatives"],
        styles=["Minimalist", "Neo-Commercial", "Modern Clean"],
        workflows=aria_workflows,
        commercial_use="Commercial use available",
        licensing_terms="Perpetual commercial rights with brand buyout.",
        verification_status="Evidence provided",
        experience_years=3,
        hourly_rate=110,
        rating=4.95,
        completed_projects=51,
        evidence_passport=aria_evidence,
        portfolio=aria_portfolio
    )

    # 5. TARIQ O'CONNOR
    tariq_workflows = [
        WorkflowStage(step_number=1, name="Dynamic Prompt Chaining", description="Particle simulation keywords, kinetic lighting effects.", tools=["ComfyUI"]),
        WorkflowStage(step_number=2, name="Temporal Generation", description="Generating high-energy video clips with fluid camera movement.", tools=["Runway Gen-3", "Kling AI"]),
        WorkflowStage(step_number=3, name="VFX Composite & Sound Design", description="Bass drops, transition sweeps, glitch-free typography.", tools=["After Effects AI"])
    ]

    tariq_evidence = [
        EvidenceItem(
            id="ev-tariq-1",
            claimed_skill="Kinetic Typography AI Sync",
            tool_model="Runway Gen-3 + After Effects",
            portfolio_evidence="CyberVolt Sound Campaign",
            workflow_evidence="Speed-ramp project files submitted",
            evidence_status="Self-declared",
            review_status="Self-Declared (Portfolio pending review)",
            verified_at="2026-08-11"
        )
    ]

    tariq_portfolio = [
        PortfolioItem(
            id="port-tariq-1",
            creator_id=tariq_id,
            creator_name="Tariq O'Connor",
            title="HydroBurst — Kinetic Vertical Reel",
            description="High-energy 15s Instagram Reels edit with water shockwaves and bold glowing typography.",
            thumbnail_url="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
            media_url="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
            content_type="AI Video",
            style="Cyberpunk",
            tools_used=["Runway Gen-3", "ComfyUI", "Topaz Video AI"],
            workflow="ComfyUI motion nodes -> Runway text-to-video -> Sound design",
            output_format="MP4 (H.264)",
            aspect_ratio="9:16",
            commercial_use="Commercial use available",
            licensing="Standard Commercial Social License",
            evidence_status="Self-declared",
            evidence_details={"fps": 60, "format": "Vertical 9:16"}
        )
    ]

    CREATORS_DB[tariq_id] = CreatorProfile(
        id=tariq_id,
        name="Tariq O'Connor",
        avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
        headline="AI Motion Designer & VFX Specialist",
        bio="High-impact kinetic generative video for streetwear, gaming, and lifestyle drinks. Fast turnaround and social-first hook pacing.",
        specialization="AI Motion Designer",
        skills=["Kinetic Video", "VFX Overlays", "Sound Sync", "Fast Pacing", "ComfyUI Prompting"],
        tools=["Runway Gen-3", "ComfyUI", "Topaz Video AI", "After Effects AI", "Kling AI"],
        content_types=["Motion Graphics", "AI Video", "Social Creatives"],
        styles=["Cyberpunk", "Neo-Commercial", "High Energy"],
        workflows=tariq_workflows,
        commercial_use="Commercial use requires agreement",
        licensing_terms="Social media commercial use. Global broadcast requires add-on agreement.",
        verification_status="Self-declared",
        experience_years=2,
        hourly_rate=95,
        rating=4.85,
        completed_projects=20,
        evidence_passport=tariq_evidence,
        portfolio=tariq_portfolio
    )

    # Seed Pre-existing EcoSip Brief for immediate testing
    seed_brief_id = "brief-ecosip-01"
    BRIEFS_DB[seed_brief_id] = CreativeBrief(
        id=seed_brief_id,
        brand_name="EcoSip",
        campaign_name="Pure Hydration 2026 — Eco Water Bottle Launch",
        objective="Create a high-impact 20-second vertical social advertisement promoting EcoSip's sustainable bamboo-cap reusable water bottle to Gen-Z and millennial eco-conscious buyers.",
        target_audience="Young environmentally conscious urban consumers (ages 18-34), fitness and outdoor enthusiasts.",
        content_type="AI Video",
        creative_style="Hyper-Realistic",
        platform="Instagram Reels / TikTok / YouTube Shorts",
        aspect_ratio="9:16",
        duration="20 seconds",
        deliverables=[
            "1x 20-second master commercial (9:16, 4K 60fps)",
            "3x 5-second vertical hook variations",
            "Full commercial rights & prompt reproducibility log"
        ],
        deadline="2026-11-15",
        budget="$3,500 - $5,000",
        commercial_use_req="Full commercial buyout with global digital ad distribution rights",
        licensing_req="Perpetual commercial license, no recurring royalties",
        additional_notes="Must feature dynamic water condensation, clean nature transitions, and authentic zero-uncanny-valley bottle renders.",
        status="Active",
        created_at=get_iso_now()
    )

    # Seed Initial Shortlist
    shortlist_id = "shortlist-kai-1"
    SHORTLISTS_DB[shortlist_id] = ShortlistItem(
        id=shortlist_id,
        brief_id=seed_brief_id,
        creator_id=kai_id,
        creator=CREATORS_DB[kai_id],
        notes="Top recommended creator for EcoSip campaign. Exceptional 9:16 vertical motion portfolio and Runway Gen-3 expertise.",
        created_at=get_iso_now()
    )

    # Seed Initial Engagement for Traceability
    eng_id = "eng-ecosip-kai"
    ENGAGEMENTS_DB[eng_id] = Engagement(
        id=eng_id,
        brief_id=seed_brief_id,
        campaign_name="Pure Hydration 2026 — Eco Water Bottle Launch",
        creator_id=kai_id,
        creator_name="Kai Sterling",
        creator_avatar=CREATORS_DB[kai_id].avatar_url,
        brand_name="EcoSip",
        status="Requested",
        current_stage_index=2, # 0=Draft, 1=Shortlisted, 2=Requested, 3=In Progress, 4=Review, 5=Completed
        deliverables=[
            "1x 20-sec 9:16 Master Ad (4K 60fps)",
            "3x Hook Variations",
            "Commercial IP Assignment Certificate"
        ],
        milestones=[
            {"name": "Styleframe & Prompt Architecture Approval", "status": "Completed", "due": "Day 2"},
            {"name": "First Generative Cut & Pacing Review", "status": "In Progress", "due": "Day 5"},
            {"name": "Topaz Remaster & Final 4K Delivery", "status": "Pending", "due": "Day 8"}
        ],
        commercial_license_status="Commercial use license agreement prepared",
        total_budget="$4,200",
        created_at=get_iso_now(),
        updated_at=get_iso_now()
    )

# Run initialization
init_seed_data()
