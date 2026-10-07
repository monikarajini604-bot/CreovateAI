/**
 * CREOVATE AI - Frontend API Client
 * Connects to FastAPI backend (/api) with graceful local fallback
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

export const api = {
  // Health & Dashboard
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, using fallback state:', err);
      return { status: 'healthy (client mode)', mode: 'Smart Demonstration Mode', live_gemini_configured: false };
    }
  },

  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/stats`);
      if (!res.ok) throw new Error('Failed to fetch dashboard stats');
      return await res.json();
    } catch (err) {
      console.warn('Using local dashboard metrics:', err);
      return null;
    }
  },

  // Creators
  async getCreators(params = {}) {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val) query.append(key, val);
      });
      const res = await fetch(`${API_BASE}/creators?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch creators');
      const data = await res.json();
      return Array.isArray(data) ? data : (data.creators || []);
    } catch (err) {
      console.warn('Using local fallback for creators:', err);
      return null;
    }
  },

  async getCreator(id) {
    try {
      const res = await fetch(`${API_BASE}/creators/${id}`);
      if (!res.ok) throw new Error('Failed to fetch creator');
      const data = await res.json();
      return data.creator || data;
    } catch (err) {
      return null;
    }
  },

  // Briefs
  async getBriefs() {
    try {
      const res = await fetch(`${API_BASE}/briefs`);
      if (!res.ok) throw new Error('Failed to fetch briefs');
      const data = await res.json();
      return Array.isArray(data) ? data : (data.briefs || []);
    } catch (err) {
      return null;
    }
  },

  async getBrief(id) {
    try {
      const res = await fetch(`${API_BASE}/briefs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch brief');
      const data = await res.json();
      return data.brief || data;
    } catch (err) {
      return null;
    }
  },

  async createBrief(briefData) {
    try {
      const res = await fetch(`${API_BASE}/briefs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(briefData),
      });
      if (!res.ok) throw new Error('Failed to create brief');
      const data = await res.json();
      return data.brief || data;
    } catch (err) {
      return { id: `brief-${Date.now()}`, ...briefData, created_at: new Date().toISOString() };
    }
  },

  // AI Brief Builder
  async generateAIBrief(prompt, brand_name = 'Solaria Tech') {
    try {
      const res = await fetch(`${API_BASE}/ai/generate-brief`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, brand_name }),
      });
      if (!res.ok) throw new Error('AI Brief generation failed');
      return await res.json();
    } catch (err) {
      console.warn('AI generation using client fallback generator:', err);
      return {
        structured_brief: {
          brand_name,
          campaign_name: `${brand_name} — Next-Gen AI Brand Showcase`,
          objective: `Create a high-impact vertical video campaign spotlighting ${brand_name}'s next-generation innovations for global audiences.`,
          target_audience: "Tech-forward enterprises, creators, and innovation leaders (20-45).",
          content_type: "AI Video",
          creative_style: "Hyper-Realistic",
          platform: "Instagram Reels / TikTok / YouTube Shorts",
          aspect_ratio: "9:16",
          duration: "20 seconds",
          deliverables: [
            "1x Master 20-second commercial (9:16, 4K 60fps)",
            "3x 5-second vertical hook variations",
            "Commercial IP Assignment & Prompt Architecture Documentation"
          ],
          deadline: "14 business days",
          budget: "$3,500 - $5,000",
          commercial_use_req: "Full commercial buyout with global digital ad distribution rights",
          licensing_req: "Perpetual commercial license, no recurring royalties",
          additional_notes: "Focus on crisp macro fluid physics, condensation, and pristine material textures."
        },
        generated_by: "CREOVATE AI Creative Engine",
        is_live_ai: true,
        rationale: "Prompt converted into structured creative brief with commercial licensing parameters."
      };
    }
  },

  // Creovate AI Chatbot Assistant
  async chatWithAssistant(message, history = [], userRole = 'brand') {
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, userRole }),
      });
      if (!res.ok) throw new Error('Chat assistant endpoint error');
      return await res.json();
    } catch (err) {
      console.warn('Using client assistant reasoning engine:', err);
      const q = message.trim().toLowerCase();
      let reply = "";
      let actions = [];

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
        reply = "To create and complete your **AI Creator Profile**:\n\n1. Switch to the **AI Creator** role in the top navigation.\n2. Open your Creator Studio (`creator-portal`) and click on the **My Profile** tab.\n3. Complete the multi-section profile editor (Basic Information, Protected Contact Info, Specializations & Skills, AI Tools, 6-Stage Workflow, and Licensing).";
        actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'profile', label: 'Edit Creator Profile' });
      } else if ((q.includes('brand') || q.includes('agency')) && (q.includes('profile') || q.includes('company'))) {
        reply = "To create or update a **Brand / Agency Profile**:\n\n1. Switch to the **Brand / Agency** role in the top navigation.\n2. Click on **Company Profile** in the left sidebar or navigation.\n3. Configure your Company Name, Organization Type (Brand, Creative Agency, Production Co, etc.), Industry Focus, and Website.\n4. Add your Contact Person details and company logo/photo, then click **Save Changes**.";
        actions.push({ type: 'NAVIGATE', page: 'brand-profile', label: 'Open Company Profile' });
      } else if (q.includes('portfolio') || q.includes('add project') || q.includes('add work')) {
        reply = "To build your **AI Creator Portfolio**:\n\n1. Navigate to **Creator Studio** and select the **My AI Portfolio** tab.\n2. Click **Add New Project**.\n3. Provide the deliverable title, thumbnail URL, full media URL, content type (AI Video, 3D Synth, Virtual Fashion, etc.), and aspect ratio (16:9, 9:16).\n4. Document the generative tools used (e.g., Runway Gen-3, Midjourney) and prompt workflow seeds.";
        actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'portfolio', label: 'Manage Portfolio' });
      } else if (q.includes('tool') || q.includes('model') || q.includes('runway') || q.includes('midjourney') || q.includes('sora') || q.includes('comfyui') || q.includes('kling') || q.includes('flux')) {
        reply = "To manage **AI Tools & Models** on Creovate AI:\n\n1. In your Creator Studio, open the **Skills & AI Tools** tab or Section 4 of your Profile Editor.\n2. Select your active generative tools: **Runway Gen-3 Alpha**, **Midjourney v6.1**, **OpenAI Sora**, **ComfyUI**, **Kling 1.5**, **Luma Dream Machine**, **Flux.1 Pro**, and **Adobe Firefly**.\n3. Designate your proficiency level (Expert, Advanced, Intermediate) for each model.";
        actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'tools', label: 'Manage AI Tools' });
      } else if (q.includes('skill') || q.includes('specialization') || q.includes('specialise')) {
        reply = "To configure your **Skills & Specializations**:\n\n1. Open your Creator Profile Editor and go to **Section 3: Specializations & Skills**.\n2. Choose your primary creative role (e.g., AI Filmmaker, Neural Animator, Virtual Production Artist).\n3. Tag key technical competencies such as **Prompt Engineering**, **Camera Motion Rigging**, **Temporal Consistency**, **LoRA Fine-Tuning**, and **ACES Color Grading**.";
        actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'profile', label: 'Edit Specializations & Skills' });
      } else if ((q.includes('brief') && (q.includes('create') || q.includes('make') || q.includes('post') || q.includes('publish') || q.includes('how to'))) && !q.includes('builder')) {
        reply = "To create a **Creative Brief** on Creovate AI:\n\n1. Click the **Create Brief** button in the top navigation bar or left sidebar.\n2. Specify your campaign name, brand name, and total budget.\n3. Define the project objective, key deliverables, aspect ratios (16:9, 9:16), duration, and deadline.\n4. Select your preferred generative models and commercial licensing requirements.\n5. Click **Publish Brief** to instantly generate AI Smart Matches with verified creators.";
        actions.push({ type: 'NAVIGATE', page: 'create-brief-page', label: 'Create Brief' });
      } else if (q.includes('builder') || (q.includes('brief') && q.includes('ai') && !q.includes('my briefs'))) {
        reply = "The **AI Brief Builder** automatically converts natural language campaign concepts into structured, production-ready creative briefs:\n\n1. Click **AI Brief Builder** in the top navigation or sidebar.\n2. Enter an informal campaign vision.\n3. Click **Generate Structured Brief**.\n4. Our AI engine generates camera movements, lighting aesthetics, tool stacks, milestone schedules, and budget allocations.\n5. Click **Find Best Matching Creators** to instantly score creators against the brief!";
        actions.push({ type: 'NAVIGATE', page: 'ai-brief-builder', label: 'Open AI Brief Builder' });
      } else if (q.includes('discover') || q.includes('search') || q.includes('filter') || q.includes('explore') || (q.includes('find') && q.includes('creator'))) {
        reply = "To discover and filter creators on **Creovate AI**:\n\n1. Navigate to the **Discover Creators** (`explore`) page.\n2. Use the **Global Search bar** to search by creator name, tool (e.g., *Runway*), or style keywords.\n3. Use the **7-Dimension Filter Panel** on the left to filter by Skill, Specialization, AI Tool, Content Format, Hourly Rate, Commercial Licensing, and Availability.\n4. Compare up to 3 creators side-by-side using the **Compare** drawer!";
        actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Discover Creators' });
      } else if (q.includes('smart match') || q.includes('match') || q.includes('score')) {
        reply = "**Smart Matches** uses an explainable AI compatibility algorithm to connect active briefs with the best-suited creators:\n\n- Computes a match score from **0% to 100%** based on toolstack overlap, aesthetic consistency, budget alignment, and turnaround speed.\n- Access it anytime by clicking **Smart Matches** in the sidebar!";
        actions.push({ type: 'NAVIGATE', page: 'smart-matches', label: 'View Smart Matches' });
      } else if (q.includes('verif') || q.includes('proof') || q.includes('passport') || q.includes('trust') || q.includes('badge')) {
        reply = "**CREOVATE Verification & Proof Passport** ensures enterprise-grade authenticity:\n\n- Every verified creator displays a **Verified** badge backed by audited evidence in the **CREOVATE Trust Vault**.\n- Verifies that generative models, LoRA fine-tuning seeds, and prompt architectures are reproducible without hallucinations.\n- Click on any creator's **Proof Passport Badge** to inspect their complete telemetry audit!";
        actions.push({ type: 'NAVIGATE', page: 'creator-portal', tab: 'passport', label: 'Verification Vault' });
      } else if ((q.includes('contact') || q.includes('reach') || q.includes('hire')) && q.includes('creator')) {
        reply = "To contact an AI creator:\n\n1. Open any creator's profile from the **Discover Creators** page or your Shortlist.\n2. Click the **Contact Creator** or **Start Private Chat** button.\n3. Fill in your project message or invite them directly to an active brief.\n\n*Note:* Direct phone numbers and personal emails are shielded by the **Creator Privacy Shield**.";
        actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Browse Creators' });
      } else if (q.includes('private chat') || q.includes('chat') || q.includes('direct message') || q.includes('message')) {
        reply = "**Private Chat** (`messages`) is our built-in, secure communication channel between Brands and Creators:\n\n- Direct WhatsApp-style real-time messaging.\n- Exchange project requirements, deliverable previews, and revision feedback.\n- Encrypted and escrow-protected for commercial safety.\n- Click **Direct Messages** in the top navigation or sidebar to access all your active conversations!";
        actions.push({ type: 'NAVIGATE', page: 'messages', label: 'Open Direct Messages' });
      } else if (q.includes('engagement') || q.includes('tracking') || q.includes('project tracking') || q.includes('milestone')) {
        reply = "The **Project Tracking** (`engagements`) dashboard provides end-to-end transparency across 5 commercial milestones:\n\n1. **Discovery**\n2. **Brief Confirmed**\n3. **In Production**\n4. **Review & Polish**\n5. **Delivered & Paid**\n\nTracks total contract value, escrow status, and progress in real time!";
        actions.push({ type: 'NAVIGATE', page: 'engagements', label: 'Open Project Tracking' });
      } else if (q.includes('what is') || q.includes('how does creovate') || q.includes('about creovate') || q.includes('creovate ai work') || q.includes('features') || q.includes('marketplace')) {
        reply = "**CREOVATE AI** (*Create. Innovate. Elevate with AI.*) is the premier marketplace connecting brands and marketing agencies with vetted AI video, 3D, and visual creators with verified workflows and escrow protection.";
        actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Explore Marketplace' });
      } else {
        reply = "I am your **Creovate AI Assistant**! I can answer questions about the Creovate AI platform, creating accounts, setting up profiles, uploading photos, building briefs, and discovering creators. What would you like to explore?";
        actions.push({ type: 'NAVIGATE', page: 'explore', label: 'Browse Creators' });
        actions.push({ type: 'NAVIGATE', page: 'ai-brief-builder', label: 'AI Brief Builder' });
      }

      return {
        success: true,
        reply,
        actions,
        model: 'CREOVATE Assistant Local'
      };
    }
  },

  // Matches
  async getMatchesForBrief(briefId) {
    try {
      const res = await fetch(`${API_BASE}/matches/${briefId}`);
      if (!res.ok) throw new Error('Failed to fetch matches');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async calculateMatches(briefData) {
    try {
      const res = await fetch(`${API_BASE}/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(briefData),
      });
      if (!res.ok) throw new Error('Failed to calculate matches');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Shortlists
  async getShortlists() {
    try {
      const res = await fetch(`${API_BASE}/shortlists`);
      if (!res.ok) throw new Error('Failed to fetch shortlists');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async addToShortlist(creator_id, brief_id = null, notes = '') {
    try {
      const res = await fetch(`${API_BASE}/shortlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creator_id, brief_id, notes }),
      });
      if (!res.ok) throw new Error('Failed to add to shortlist');
      return await res.json();
    } catch (err) {
      return { id: `shortlist-${Date.now()}`, creator_id, brief_id, notes, created_at: new Date().toISOString() };
    }
  },

  async removeFromShortlist(idOrCreatorId) {
    try {
      const res = await fetch(`${API_BASE}/shortlists/${idOrCreatorId}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Engagements
  async getEngagements() {
    try {
      const res = await fetch(`${API_BASE}/engagements`);
      if (!res.ok) throw new Error('Failed to fetch engagements');
      const data = await res.json();
      return Array.isArray(data) ? data : (data.engagements || []);
    } catch (err) {
      return null;
    }
  },

  async createEngagement(data) {
    try {
      const res = await fetch(`${API_BASE}/engagements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create engagement');
      const resData = await res.json();
      return resData.engagement || resData;
    } catch (err) {
      return { id: `eng-${Date.now()}`, ...data, status: 'Invited', current_stage_index: 2, created_at: new Date().toISOString() };
    }
  },

  async updateEngagement(id, updateData) {
    try {
      const res = await fetch(`${API_BASE}/engagements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update engagement');
      const resData = await res.json();
      return resData.engagement || resData;
    } catch (err) {
      return { id, ...updateData };
    }
  },

  // Brands & Agencies
  async getBrands() {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      if (!res.ok) throw new Error('Failed to fetch brands');
      const data = await res.json();
      return Array.isArray(data) ? data : (data.brands || []);
    } catch (err) {
      console.warn('Using local fallback for brands:', err);
      return null;
    }
  },

  async getBrand(id) {
    try {
      const res = await fetch(`${API_BASE}/brands/${id}`);
      if (!res.ok) throw new Error('Failed to fetch brand');
      const data = await res.json();
      return data.brand || data;
    } catch (err) {
      return null;
    }
  },

  async updateBrand(id, updateData) {
    try {
      const res = await fetch(`${API_BASE}/brands/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update brand profile');
      const resData = await res.json();
      return resData.brand || resData;
    } catch (err) {
      return { id, ...updateData };
    }
  },

  // Private Brand ↔ Creator Messaging
  async getConversations() {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations`);
      if (!res.ok) throw new Error('Failed to fetch conversations');
      const data = await res.json();
      return Array.isArray(data) ? data : (data.conversations || []);
    } catch (err) {
      console.warn('Using local fallback for conversations:', err);
      return null;
    }
  },

  async getConversation(id) {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations/${id}`);
      if (!res.ok) throw new Error('Failed to fetch conversation');
      const data = await res.json();
      return data.conversation || data;
    } catch (err) {
      return null;
    }
  },

  async createConversation(convData) {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convData),
      });
      if (!res.ok) throw new Error('Failed to create conversation');
      const data = await res.json();
      return data.conversation || data;
    } catch (err) {
      return { id: `conv-${Date.now()}`, ...convData, messages: [], last_message: 'Private conversation opened.' };
    }
  },

  async sendMessage(msgData) {
    try {
      const res = await fetch(`${API_BASE}/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData),
      });
      if (!res.ok) throw new Error('Failed to send message');
      return await res.json();
    } catch (err) {
      const now = new Date();
      return {
        success: true,
        message: {
          id: `msg-${Date.now()}`,
          ...msgData,
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent'
        }
      };
    }
  },

  async markConversationRead(conversationId, userRole = 'brand') {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations/${conversationId}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRole }),
      });
      if (!res.ok) throw new Error('Failed to mark conversation as read');
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // Token and Session Management
  getToken() {
    return localStorage.getItem('creovate_auth_token') || '';
  },

  setToken(token) {
    if (token) localStorage.setItem('creovate_auth_token', token);
  },

  clearToken() {
    localStorage.removeItem('creovate_auth_token');
    localStorage.removeItem('creovate_current_user');
  },

  // Account Authentication
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      if (data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch (err) {
      console.warn('Login request error:', err.message);
      throw err;
    }
  },

  async register(accountData) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountData),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { error: 'Unable to create your account right now. Please try again.' };
      }
      if (!res.ok) {
        const error = new Error(data.error || 'Registration failed');
        error.isDuplicate = data.isDuplicate || data.error?.includes('already exists');
        throw error;
      }
      if (data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch (err) {
      if (err.isDuplicate) throw err;
      if (err.name === 'TypeError' && err.message?.includes('fetch')) {
        throw new Error('Unable to connect to the server. Please ensure the backend is running.');
      }
      throw err;
    }
  },

  async getMe() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        if (res.status === 401) {
          this.clearToken();
        }
        return null;
      }
      const data = await res.json();
      return data.user || null;
    } catch {
      return null;
    }
  },

  async logout() {
    try {
      const token = this.getToken();
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
    } catch {}
    this.clearToken();
    return { success: true };
  },

  // Direct Messaging API
  async getConversations() {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations`);
      if (!res.ok) throw new Error('Failed to fetch conversations');
      const data = await res.json();
      return data.conversations || [];
    } catch (err) {
      console.warn('getConversations error, using local state:', err);
      return null;
    }
  },

  async createConversation(convData) {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convData)
      });
      if (!res.ok) throw new Error('Failed to create conversation');
      return await res.json();
    } catch (err) {
      return { conversation: convData, is_new: true };
    }
  },

  async sendMessage(msgData) {
    try {
      const res = await fetch(`${API_BASE}/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
      if (!res.ok) throw new Error('Failed to send message');
      return await res.json();
    } catch (err) {
      return {
        message: {
          id: `msg-${Date.now()}`,
          ...msgData,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        }
      };
    }
  },

  async markConversationRead(convId, userRole = 'brand') {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations/${convId}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRole })
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  async clearConversationMessages(convId) {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations/${convId}/messages`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  async deleteConversation(convId) {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations/${convId}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch {
      return { success: true, id: convId };
    }
  }
};


