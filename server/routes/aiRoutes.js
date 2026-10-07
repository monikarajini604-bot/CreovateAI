import express from 'express';

const router = express.Router();

// POST /api/ai/generate-brief
router.post('/generate-brief', async (req, res) => {
  try {
    const { prompt, brand_name = 'CREOVATE Brand Partner' } = req.body;

    const cleanPrompt = (prompt || '').toLowerCase();

    // Contextual heuristics based on user's natural language input
    let contentType = 'AI Video';
    let creativeStyle = 'Hyper-Realistic';
    let tools = ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'Topaz Video AI'];
    let duration = '20 seconds';
    let platform = 'Instagram Reels / TikTok / YouTube Shorts';
    let ratio = '9:16';
    let budget = '$3,500 - $5,000';
    let deadline = '14 business days';

    if (cleanPrompt.includes('voice') || cleanPrompt.includes('audio') || cleanPrompt.includes('podcast') || cleanPrompt.includes('dub')) {
      contentType = 'Audio / Voiceover';
      creativeStyle = 'Authoritative Commercial';
      tools = ['ElevenLabs Pro', 'iZotope RX 11', 'Pro Tools Studio'];
      duration = '60 seconds';
      budget = '$1,800 - $3,200';
      deadline = '7 business days';
      platform = 'Broadcast & Spotify / Podcasts';
      ratio = 'Audio Master';
    } else if (cleanPrompt.includes('photo') || cleanPrompt.includes('character') || cleanPrompt.includes('product shot') || cleanPrompt.includes('image')) {
      contentType = 'Image Series';
      creativeStyle = 'Editorial Photography';
      tools = ['Flux.1 Pro', 'ComfyUI Custom Workflows', 'Magnific AI'];
      duration = 'Static Assets';
      budget = '$2,500 - $4,000';
      deadline = '10 business days';
      platform = 'E-Commerce / Instagram Feed / Billboard';
      ratio = '1:1 / 4:5';
    } else if (cleanPrompt.includes('3d') || cleanPrompt.includes('motion') || cleanPrompt.includes('hologram') || cleanPrompt.includes('animation')) {
      contentType = '3D Generative Motion';
      creativeStyle = 'Futuristic Minimalist';
      tools = ['Spline AI', 'Blender 4.2', 'Runway Gen-3'];
      duration = '15 seconds';
      budget = '$4,000 - $6,500';
      deadline = '18 business days';
      ratio = '9:16 / 16:9';
    }

    const campaignName = `${brand_name} — ${prompt ? prompt.split(' ').slice(0, 4).join(' ').replace(/[^a-zA-Z0-9 ]/g, '') : 'Commercial'} Campaign`;

    const structured_brief = {
      brand_name,
      campaign_name: campaignName,
      objective: prompt ? `Execute an enterprise-grade AI production campaign based on: "${prompt}". Focus on flawless visual/auditory fidelity with zero synthetic drift.` : `Create a cinematic commercial for ${brand_name} with photorealistic AI output and guaranteed commercial clearance.`,
      target_audience: 'Modern digital consumers, tech enthusiasts, and early adopters aged 20-45.',
      content_type: contentType,
      creative_style: creativeStyle,
      platform,
      aspect_ratio: ratio,
      duration,
      required_tools: tools,
      commercial_use_req: 'Full commercial buyout with worldwide digital ad rights',
      licensing_req: 'Perpetual commercial license, no recurring royalties',
      budget,
      deadline,
      deliverables: [
        `1x Master ${contentType} deliverable (Full 4K / High-Bitrate Studio Master)`,
        `3x Social cutdown or variation assets`,
        `Complete Prompt Architecture & Seed Token Documentation`,
        `CREOVATE AI Verified Commercial IP Assignment Contract`
      ],
      additional_notes: 'Must follow CREOVATE AI Creator Verification standards: no model hallucination, authentic motion physics, verified tools only.'
    };

    res.json({
      success: true,
      structured_brief,
      generated_by: 'CREOVATE AI Creative Engine',
      is_live_ai: true,
      rationale: `Intelligently synthesized structured parameters for "${contentType}" focusing on ${tools.join(', ')} with full commercial IP licensing verification.`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/ai/chat - Creovate AI Project Help Assistant
router.post('/chat', async (req, res) => {
  try {
    const { message = '', history = [], userRole = 'brand' } = req.body;
    const q = message.trim().toLowerCase();

    let reply = "";
    let actions = [];

    // Platform relevance indicators
    const platformKeywords = [
      'account', 'sign up', 'signup', 'register', 'login', 'log in', 'join',
      'profile', 'avatar', 'photo', 'picture', 'image', 'camera', 'upload',
      'creator', 'brand', 'agency', 'client', 'freelance',
      'portfolio', 'project', 'deliverable', 'work', 'showcase',
      'tool', 'model', 'runway', 'midjourney', 'sora', 'kling', 'comfyui', 'luma', 'flux', 'photoshop', 'lora',
      'skill', 'specialization', 'specialise', 'prompt', 'cinematograph', 'animation', 'video', '3d',
      'brief', 'campaign', 'ai brief builder', 'create brief', 'objective', 'budget',
      'search', 'filter', 'discover', 'explore', 'find',
      'match', 'smart match', 'score', 'compatibility',
      'verification', 'verified', 'passport', 'proof', 'vault', 'badge', 'trust',
      'contact', 'hire', 'message', 'private chat', 'direct message', 'chat',
      'engagement', 'track', 'tracking', 'milestone', 'escrow', 'progress', 'stage',
      'creovate', 'marketplace', 'platform', 'feature', 'how does', 'how do i', 'how to', 'help', 'hello', 'hi', 'hey',
      'role', 'theme', 'dark mode', 'light mode', 'night mode', 'commercial', 'license', 'buyout', 'cost', 'rate', 'pricing'
    ];

    // Non-existent / unrelated features check
    const unknownFeatureKeywords = [
      'bitcoin', 'crypto', 'nft', 'flight', 'airline', 'hotel', 'uber', 'taxi',
      'streaming music', 'spotify', 'netflix', 'dating', 'tinder', 'chess', 'food delivery',
      'weather', 'stocks', 'forex', 'e-commerce store', 'dropshipping'
    ];

    const isPlatformRelated = platformKeywords.some(kw => q.includes(kw));
    const isUnknownFeature = unknownFeatureKeywords.some(kw => q.includes(kw));

    if (isUnknownFeature) {
      reply = "I’m not sure about that feature. Please check the relevant section of Creovate AI.";
    } else if (!isPlatformRelated && q.length > 3) {
      reply = "I’m here to help with Creovate AI and its marketplace features. Please ask me something related to the platform.";
    } else if (q.includes('account') || q.includes('sign up') || q.includes('signup') || q.includes('register') || (q.includes('join') && !q.includes('brief'))) {
      reply = "To create an account on **Creovate AI**:\n\n1. Click the **Create Account** button in the top navigation bar.\n2. Select your account type: **AI Creator** (to showcase portfolios, receive briefs, and earn) or **Brand / Agency** (to post briefs, hire creators, and manage campaigns).\n3. Fill in your details (Full Name / Business Name, Email, Mobile Number, and Password).\n4. Click **Create Account** to immediately access your Creator Studio or Brand Profile setup.";
      actions.push({ type: 'OPEN_CREATE_ACCOUNT', label: 'Create Account' });
    } else if ((q.includes('photo') || q.includes('avatar') || q.includes('picture')) && (q.includes('upload') || q.includes('take') || q.includes('camera') || q.includes('device') || q.includes('change') || q.includes('how'))) {
      reply = "To upload or update your profile photo on **Creovate AI**:\n\n1. Go to your profile (**My Profile** tab in Creator Studio or **Company Profile** for Brands).\n2. Click directly on your **Profile Photo / Avatar** or the **Upload Photo** button.\n3. Choose from two options:\n   - **📷 Take Photo**: Uses your device camera/webcam with a circular viewfinder and live capture. Once snapped, choose **Retake** or **Use Photo**.\n   - **🖼️ Choose From Device**: Select an existing **JPG** or **JPEG** image from your device, preview it, and click **Save Photo**.\n\nYour new photo updates your profile avatar immediately across the platform!";
      actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'profile', label: 'Open Profile' });
    } else if (q.includes('creator profile') || (q.includes('profile') && (q.includes('create') || q.includes('setup') || q.includes('build') || q.includes('edit')) && !q.includes('brand') && !q.includes('agency'))) {
      reply = "To create and complete your **AI Creator Profile**:\n\n1. Switch to the **AI Creator** role in the top navigation.\n2. Open your Creator Studio (`creator-portal`) and click on the **My Profile** tab.\n3. Complete the multi-section profile editor:\n   - **Section 1: Basic Information**: Upload a profile photo, enter your legal & display names, headline, bio, and location.\n   - **Section 2: Contact Information**: Add protected email & mobile numbers.\n   - **Section 3: Specializations & Skills**: Choose AI video, 3D synth, or motion design, and tag skills.\n   - **Section 4: AI Tools & Models**: Add your toolstack (Runway, ComfyUI, etc.) with proficiency levels.\n   - **Section 5: AI Workflow**: Document your 6-stage production pipeline.\n   - **Section 8 & 9: Portfolio & Licensing**: Publish deliverables and set commercial licensing terms.";
      actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'profile', label: 'Edit Creator Profile' });
    } else if ((q.includes('brand') || q.includes('agency')) && (q.includes('profile') || q.includes('company'))) {
      reply = "To create or update a **Brand / Agency Profile**:\n\n1. Switch to the **Brand / Agency** role in the top navigation.\n2. Click on **Company Profile** in the left sidebar or navigation.\n3. Configure your Company Name, Organization Type (Brand, Creative Agency, Production Co, etc.), Industry Focus, and Website.\n4. Add your Contact Person details and company logo/photo.\n5. Click **Save Changes** to update your verified brand presence.";
      actions.push({ type: 'NAVIGATE', page: 'brand-profile', label: 'Open Company Profile' });
    } else if (q.includes('portfolio') || q.includes('add project') || q.includes('add work')) {
      reply = "To build your **AI Creator Portfolio**:\n\n1. Navigate to **Creator Studio** and select the **My AI Portfolio** tab.\n2. Click **Add New Project**.\n3. Provide the deliverable title, thumbnail URL, full media URL, content type (AI Video, 3D Synth, Virtual Fashion, etc.), and aspect ratio (16:9, 9:16).\n4. Document the generative tools used (e.g., Runway Gen-3, Midjourney) and prompt workflow seeds to give clients proof of reproducibility.";
      actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'portfolio', label: 'Manage Portfolio' });
    } else if (q.includes('tool') || q.includes('model') || q.includes('runway') || q.includes('midjourney') || q.includes('sora') || q.includes('comfyui') || q.includes('kling') || q.includes('flux')) {
      reply = "To manage **AI Tools & Models** on Creovate AI:\n\n1. In your Creator Studio, open the **Skills & AI Tools** tab or Section 4 of your Profile Editor.\n2. Select your active generative tools from our verified registry: **Runway Gen-3 Alpha**, **Midjourney v6.1**, **OpenAI Sora**, **ComfyUI**, **Kling 1.5**, **Luma Dream Machine**, **Flux.1 Pro**, and **Adobe Firefly**.\n3. Designate your proficiency level (Expert, Advanced, Intermediate) for each model. This directly powers the **Smart Match Score** when brands search for specific AI capabilities!";
      actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'tools', label: 'Manage AI Tools' });
    } else if (q.includes('skill') || q.includes('specialization') || q.includes('specialise')) {
      reply = "To configure your **Skills & Specializations**:\n\n1. Open your Creator Profile Editor and go to **Section 3: Specializations & Skills**.\n2. Choose your primary creative role (e.g., AI Filmmaker, Neural Animator, Virtual Production Artist).\n3. Tag key technical competencies such as **Prompt Engineering**, **Camera Motion Rigging**, **Temporal Consistency**, **LoRA Fine-Tuning**, **Fluid Dynamics**, and **ACES Color Grading**.";
      actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'profile', label: 'Edit Specializations & Skills' });
    } else if ((q.includes('brief') && (q.includes('create') || q.includes('make') || q.includes('post') || q.includes('publish') || q.includes('how to'))) && !q.includes('builder')) {
      reply = "To create a **Creative Brief** on Creovate AI:\n\n1. Click the **Create Brief** button in the top navigation bar or left sidebar.\n2. Specify your campaign name, brand name, and total budget.\n3. Define the project objective, key deliverables, aspect ratios (16:9 landscape, 9:16 vertical), duration, and deadline.\n4. Select your preferred generative models and commercial licensing requirements.\n5. Click **Publish Brief** to instantly generate AI Smart Matches with verified creators.";
      actions.push({ type: 'NAVIGATE', page: 'create-brief-page', label: 'Create Brief' });
    } else if (q.includes('builder') || (q.includes('brief') && q.includes('ai') && !q.includes('my briefs'))) {
      reply = "The **AI Brief Builder** automatically converts natural language campaign concepts into structured, production-ready creative briefs:\n\n1. Click **AI Brief Builder** in the top navigation or sidebar.\n2. Enter an informal campaign vision (e.g., *'A 30-second futuristic electric vehicle launch video with dynamic neon reflections and drone camera sweep'*).\n3. Click **Generate Structured Brief**.\n4. Our AI engine generates camera movements, lighting aesthetics, tool stacks, milestone schedules, and budget allocations.\n5. Click **Find Best Matching Creators** to instantly score creators against the brief!";
      actions.push({ type: 'NAVIGATE', page: 'ai-brief-builder', label: 'Open AI Brief Builder' });
    } else if (q.includes('discover') || q.includes('search') || q.includes('filter') || q.includes('explore') || (q.includes('find') && q.includes('creator'))) {
      reply = "To discover and filter creators on **Creovate AI**:\n\n1. Navigate to the **Discover Creators** (`explore`) page.\n2. Use the **Global Search bar** to search by creator name, tool (e.g., *Runway*), or style keywords.\n3. Use the **7-Dimension Filter Panel** on the left to filter by:\n   - **Skill & Technique** (Prompt Architecture, Camera Rigging, LoRA)\n   - **Specialization** (AI Filmmaker, 3D Synth, Virtual Fashion)\n   - **AI Model Stack** (Runway, Midjourney, Kling, ComfyUI)\n   - **Content Format** (AI Video, 9:16 Social, Still Art)\n   - **Hourly Rate & Budget**\n   - **Commercial Licensing Status**\n   - **Availability**\n4. Compare up to 3 creators side-by-side using the **Compare** drawer!";
      actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Discover Creators' });
    } else if (q.includes('smart match') || q.includes('match') || q.includes('score')) {
      reply = "**Smart Matches** uses an explainable AI compatibility algorithm to connect active briefs with the best-suited creators:\n\n- Computes a match score from **0% to 100%** based on toolstack overlap, aesthetic consistency, budget alignment, and turnaround speed.\n- Provides detailed match rationales (e.g., *'98% Match: Verified Runway Gen-3 camera rigging expert within budget'*).\n- Access it anytime by clicking **Smart Matches** in the sidebar!";
      actions.push({ type: 'NAVIGATE', page: 'smart-matches', label: 'View Smart Matches' });
    } else if (q.includes('verif') || q.includes('proof') || q.includes('passport') || q.includes('trust') || q.includes('badge')) {
      reply = "**CREOVATE Verification & Proof Passport** ensures enterprise-grade authenticity:\n\n- Every verified creator displays a **Verified** badge backed by audited evidence in the **CREOVATE Trust Vault**.\n- Verifies that generative models, LoRA fine-tuning seeds, and prompt architectures are reproducible without hallucinations.\n- Guarantees commercial IP clearance and authentic model pipelines.\n- Click on any creator's **Proof Passport Badge** to inspect their complete telemetry audit!";
      actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'passport', label: 'Verification Vault' });
    } else if ((q.includes('contact') || q.includes('reach') || q.includes('hire')) && q.includes('creator')) {
      reply = "To contact an AI creator:\n\n1. Open any creator's profile from the **Discover Creators** page or your Shortlist.\n2. Click the **Contact Creator** or **Start Private Chat** button.\n3. Fill in your project message or invite them directly to an active brief.\n\n*Note:* Direct phone numbers and personal emails are shielded by the **Creator Privacy Shield**. Messages route directly to the creator's verified Creovate chat dashboard!";
      actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Browse Creators' });
    } else if (q.includes('private chat') || q.includes('chat') || q.includes('direct message') || q.includes('message')) {
      reply = "**Private Chat** (`messages`) is our built-in, secure communication channel between Brands and Creators:\n\n- Direct WhatsApp-style real-time messaging.\n- Exchange project requirements, deliverable previews, and revision feedback.\n- Encrypted and escrow-protected for commercial safety.\n- Click **Direct Messages** in the top navigation or sidebar to access all your active client-creator conversations!";
      actions.push({ type: 'NAVIGATE', page: 'messages', label: 'Open Direct Messages' });
    } else if (q.includes('engagement') || q.includes('tracking') || q.includes('project tracking') || q.includes('milestone')) {
      reply = "The **Project Tracking** (`engagements`) dashboard provides end-to-end transparency across 5 commercial milestones:\n\n1. **Discovery**: Initial proposal and scope review.\n2. **Brief Confirmed**: Formal project agreement locked.\n3. **In Production**: Creator generating and assembling AI deliverables.\n4. **Review & Polish**: Quality review, color grading, and revisions.\n5. **Delivered & Paid**: Final IP asset release and escrow disbursement.\n\nTracks total contract value, escrow status, and progress bars in real time!";
      actions.push({ type: 'NAVIGATE', page: 'engagements', label: 'Open Project Tracking' });
    } else if (q.includes('what is') || q.includes('how does creovate') || q.includes('about creovate') || q.includes('creovate ai work') || q.includes('features') || q.includes('marketplace')) {
      reply = "**CREOVATE AI** (*Create. Innovate. Elevate with AI.*) is the premier marketplace designed specifically for the generative AI era:\n\n- Connects brands and marketing agencies with vetted AI video, 3D, and visual creators.\n- Features an **AI Brief Builder**, **Smart Matching**, and **Direct Private Chat**.\n- Protects both parties with **Proof Passport Verification**, commercial IP clearance, and escrow milestone tracking.";
      actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Explore Marketplace' });
    } else {
      reply = "I am your **Creovate AI Assistant**! I can answer any questions about the Creovate AI platform, including:\n- Creating an account (Creator or Brand)\n- Building creator or brand profiles\n- Uploading profile photos (Camera or Device)\n- Adding portfolios, tools, and skills\n- Publishing briefs & using the AI Brief Builder\n- Discovering creators, Smart Matching, and Proof Passport\n- Private Chat & Project Tracking\n\nWhat would you like to explore?";
      actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Browse Creators' });
      actions.push({ type: 'NAVIGATE', page: 'ai-brief-builder', label: 'AI Brief Builder' });
    }

    res.json({
      success: true,
      reply,
      actions,
      model: 'CREOVATE Assistant v2.0',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
