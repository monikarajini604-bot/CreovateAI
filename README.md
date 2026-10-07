# CREOVATE AI
> **AI Content Creator Marketplace — Generative AI Era**  
> **HacXLerate 2026 Round 1 — Paavai Engineering College**  
> **Challenge 2: AI Content Creator Marketplace (Kampus.VC)**  
> **Team: HACKSHIELD** (4 Members)

---

## 1. Project Title & Overview
**CREOVATE AI** is an AI-native marketplace designed specifically for the generative AI era. It connects brands, creative agencies, and enterprise marketing teams with elite AI filmmakers, 3D animators, motion designers, and generative artists.

Unlike traditional freelance websites, CREOVATE AI is engineered from the ground up to solve the unique challenges of generative AI production: model stack transparency, reproducible prompt architectures, transparent capability evidence, explainable requirement-based matching, and commercial IP rights clearance.

---

## 2. Problem Statement
Generative AI has spawned a new generation of creative professionals—AI filmmakers, neural animators, and generative VFX artists. However, traditional freelance platforms (Upwork, Fiverr) fail to serve this ecosystem because:
1. **Opaque Capabilities**: Brands cannot tell if an artist's portfolio is a lucky 1-in-100 prompt or a reproducible, controllable commercial workflow.
2. **Missing Tool & Model Context**: Freelance profiles don't capture model versions (Runway Gen-3, Midjourney v6, Kling AI, ComfyUI node graphs, LoRA fine-tunes).
3. **Ambiguous Commercial IP & Licensing**: Brands risk copyright issues without explicit model-safe commercial buyout terms and prompt seed logs.
4. **Unclear Production Workflows**: Brands struggle to collaborate through iterative AI phases (latent generation, temporal interpolation, upscaling).
5. **Inefficient Briefing**: Marketers don't know how to translate marketing goals into AI-actionable technical constraints (aspect ratios, duration, camera motion).

---

## 3. Problem Analysis
| Traditional Freelance Platforms | CREOVATE AI Marketplace |
| :--- | :--- |
| Generic portfolios with static JPGs | **Deep AI Portfolios** with model tags, workflows, aspect ratios, and seed reproducibility |
| Unverifiable claims and fake reviews | **Creator Proof Passport** with 3 transparent states (*Self-declared*, *Evidence provided*, *Reviewed*) |
| Keyword tag search only | **Explainable Smart Matching Engine** (weighted 30% skills, 20% spec, 20% tools, 15% content, 10% format, 5% style) |
| Vague free-form text briefs | **AI-Assisted Brief Builder** compiling natural language into structured technical specifications |
| Opaque milestone tracking | **6-Stage AI Production Lifecycle** (*Draft* → *Shortlisted* → *Requested* → *In Progress* → *Review* → *Completed*) |
| Unclear copyright ownership | **Commercial Rights & IP Assignment** built into every brief and engagement |

---

## 4. Proposed Solution
CREOVATE AI establishes trust and efficiency through a closed-loop platform:
1. **AI-Assisted Brief Builder**: Compiles natural language campaign ideas into structured, technical creative briefs.
2. **Explainable Smart Matching**: Deterministically scores and ranks creators, giving brands a transparent breakdown of *why* each creator matches.
3. **Creator Proof Passport**: Surfaces transparent evidence states without false certification claims.
4. **End-to-End Traceability**: Links Brief → Matches → Shortlist → Engagement → 6-Stage Delivery → IP Clearance.

---

## 5. Target Users
- **Brands & D2C Companies** (e.g. EcoSip): Seeking fast, high-converting social video ads (9:16 vertical, 4K 60fps) with full commercial clearance.
- **Creative Agencies & Production Studios**: Sourcing specialized AI animators and VFX artists for commercial campaigns.
- **AI Creators & Filmmakers**: Showcasing reproducible pipelines, node graphs, and earning premium commercial rates.

---

## 6. Core Features Implemented
- [x] **Creator Profiles & AI Portfolios**: Detailed metadata, model stacks, workflow steps, aspect ratios, formats, and commercial rights.
- [x] **Brand Creative Briefs**: Structured briefs specifying objectives, audiences, formats, durations, deliverables, and commercial requirements.
- [x] **Creator Search & Multi-Facet Filtering**: Real-time filtering across skills, specializations, AI tools, content types, styles, formats, and commercial availability.
- [x] **Explainable Smart Matching**: Deterministic weighted matching algorithm (Skills 30%, Specialization 20%, Tools 20%, Content 15%, Format 10%, Style 5%) with transparent checklist explanations.
- [x] **Shortlist Management**: Candidate bookmarking, side-by-side comparison matrix, and engagement launching.
- [x] **6-Stage Engagement Workflow**: Full lifecycle tracking (*Draft* → *Shortlisted* → *Requested* → *In Progress* → *Review* → *Completed*).

---

## 7. Bonus & Innovation Features
- [x] **Creator Proof Passport**: Transparent verification system showing claimed skills, tools, portfolio evidence, raw workflow telemetry, and review status.
- [x] **AI-Assisted Brief Builder**: Natural language compiler supporting Google Gemini API with intelligent labeled DEMO MODE fallback.
- [x] **Side-by-Side Creator Comparison**: Compare up to 3 creators across rates, tools, Proof Passport status, and portfolios.
- [x] **Deep Portfolio Inspection**: Inspect project descriptions, render times, human-in-the-loop ratios, and commercial licenses.
- [x] **Brief-to-Engagement Traceability Pipeline**: Complete audit trail from initial brief to delivered asset and IP certificate.
- [x] **Role Switcher**: Seamless toggle between Brand / Agency view and Creator Studio.

---

## 8. Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Glassmorphism UI Design System.
- **Backend API**: Node.js, Express.js (MERN API on Port 5000) & Python 3.11 FastAPI (Port 8000).
- **Database**: Cloud MongoDB Atlas Cluster (`cluster0.cehle7m.mongodb.net`) with Mongoose ODM + PostgreSQL Schema reference (`database/schema/schema.sql`).
- **AI Integration**: Google Gemini API (`google-genai` SDK) with transparent DEMO MODE heuristic compiler.
- **Configuration**: Single Master `.env` configuration file at workspace root.

---

## 9. Architecture

```
User (Brand / Agency / AI Creator)
            │
            ▼
┌──────────────────────────────────────────────┐
│       React 19 + Vite Frontend               │
│  (Tailwind CSS • Lucide • SaaS Design System)│
└──────────────────────┬───────────────────────┘
                       │ HTTP / Proxy (/api)
                       ▼
┌──────────────────────────────────────────────┐
│       Node.js Express + MERN Backend         │
│  (Port 5000 • JWT Auth • Live Cloud Sync)    │
├──────────────────────┬───────────────────────┤
│  • MongoDB Atlas     │  • AI Brief Engine    │
│    Cloud Database    │    (Gemini / Heuristic)
└──────────┬───────────┴───────────┬───────────┘
           │                       │
           ▼                       ▼
┌──────────────────────┐ ┌─────────────────────┐
│  MongoDB Atlas Cloud │ │  Google Gemini API  │
│  (Remote Clusters)   │ │  (Cloud AI Engine)  │
└──────────────────────┘ └─────────────────────┘
```

---

## 10. Project Structure
```
creovate-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── CreatorCard.jsx
│   │   │   ├── ProofPassportBadge.jsx
│   │   │   ├── ProofPassportModal.jsx
│   │   │   ├── PortfolioDetailModal.jsx
│   │   │   ├── CreatorComparisonModal.jsx
│   │   │   ├── BriefModal.jsx
│   │   │   └── EngagementProgressTracker.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ExploreCreatorsPage.jsx
│   │   │   ├── CreatorProfilePage.jsx
│   │   │   ├── AIBriefBuilderPage.jsx
│   │   │   ├── MyBriefsPage.jsx
│   │   │   ├── SmartMatchesPage.jsx
│   │   │   ├── ShortlistPage.jsx
│   │   │   ├── EngagementsPage.jsx
│   │   │   └── CreatorPortalPage.jsx
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── schemas.py
│   ├── routes/
│   │   ├── creators.py
│   │   ├── briefs.py
│   │   ├── matches.py
│   │   ├── shortlists.py
│   │   ├── engagements.py
│   │   └── ai.py
│   ├── services/
│   │   ├── matching_engine.py
│   │   └── gemini_service.py
│   ├── data/
│   │   └── database.py
│   └── main.py
│
├── database/
│   └── schema/
│       └── schema.sql
├── .env.example
├── .env
└── README.md
```

---

## 11. REST API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & Gemini status |
| `GET` | `/api/dashboard/stats` | Marketplace counts & recent activity |
| `GET` | `/api/creators` | Discover creators with multi-filter query |
| `GET` | `/api/creators/{id}` | Creator profile with portfolio & passport |
| `POST` | `/api/briefs` | Create structured creative brief |
| `GET` | `/api/briefs` | List all brand briefs |
| `GET` | `/api/matches/{brief_id}` | Calculate weighted matches for brief |
| `POST` | `/api/shortlists` | Add creator to brand shortlist |
| `DELETE` | `/api/shortlists/{id}` | Remove creator from shortlist |
| `POST` | `/api/engagements` | Launch campaign engagement |
| `PUT` | `/api/engagements/{id}` | Advance engagement stage (0–5) |
| `POST` | `/api/ai/generate-brief` | AI Brief Builder (Gemini / Demo mode) |

---

## 12. Data Model Note (Challenge Deliverable)

### A. Creator Profile & AI Portfolio Data Model
| Field Category | Schema Attributes | AI Marketplace Purpose |
| :--- | :--- | :--- |
| **Core Identity** | `id`, `name`, `headline`, `bio`, `avatar_url`, `location` | Creator personal branding & verified presence |
| **Tools & Models** | `tools[]`, `models[]` | Tracks generative stacks (*Runway Gen-3 Alpha, Kling 1.5, Midjourney v6.1, Luma Dream Machine, Topaz Video AI*) |
| **Skills & Specialization** | `skills[]`, `specialization` | High-leverage skills (*Camera Motion LoRA, Prompt Engineering, Temporal Consistency, ACES Grading*) |
| **Production Workflows** | `workflows[]` (`step_number`, `name`, `description`, `tools[]`) | 6-Stage reproducible pipeline from Concept to 4K Upscale & IP Release |
| **AI Portfolio Work** | `portfolios[]` (`title`, `media_url`, `content_type`, `style`, `output_format`, `aspect_ratio`, `seed`, `prompt`) | Direct evidence of generative capability with aspect ratio tags (9:16, 16:9) |
| **Verification & Passport**| `evidence_passport[]` (`claimed_skill`, `tool_model`, `evidence_status`, `review_status`, `verified_at`) | Transparent trust signals (*Self-declared*, *Evidence provided*, *Reviewed*) |
| **Commercial Terms** | `hourly_rate`, `commercial_use`, `licensing_terms` | Commercial advertising readiness & perpetual buyout terms |

### B. Creative Brief Data Model
| Field Category | Schema Attributes | AI Campaign Purpose |
| :--- | :--- | :--- |
| **Campaign Identity** | `id`, `brand_id`, `brand_name`, `campaign_name`, `status` | Campaign ownership and lifecycle state |
| **Marketing Goals** | `objective`, `target_audience`, `description` | Creative North Star for the creator |
| **Technical Format** | `content_type`, `aspect_ratio`, `duration`, `platform` | Strict technical requirements (*9:16 Vertical for Reels/TikTok, 20s, 4K 60fps*) |
| **Aesthetic Constraints** | `creative_style`, `references[]` | Visual style anchors (*Hyper-Realistic, Cinematic Lighting, Neo-Commercial*) |
| **Required Stack** | `required_skills[]`, `required_tools[]` | Algorithmic matching anchors for deterministic scoring |
| **Commercial & Licensing**| `commercial_use_req`, `licensing_req` | Explicit commercial buyout clauses and IP transfer terms |
| **Logistics & Budget** | `budget`, `deadline`, `deliverables[]` | Budget brackets ($3,500 - $5,000) and delivery timelines |

---

## 13. Primary Hackathon Demo Walkthrough (3-5 Minutes)

### Scenario: EcoSip 2026 Commercial Launch
- **Brand**: EcoSip
- **Goal**: 20-second vertical video ad for sustainable water bottle targeting Gen-Z.

1. **Dashboard (`/`)**: View marketplace metrics (Active Briefs, Verified Creators, Avg Match Score).
2. **AI Brief Builder**:
   - Click "*Launch 3-Minute Demo Flow*" or navigate to AI Brief Builder.
   - Enter prompt: *"I need a 20-second vertical product advertisement for an eco-friendly water bottle targeting young environmentally conscious customers."*
   - Click **Compile Structured Brief**.
   - Notice the transparent status indicator (Demo Mode / Live Gemini).
3. **Structured Brief Review**:
   - Review auto-extracted specifications (9:16 aspect ratio, 20s duration, $3,500-$5,000 budget, commercial buyout terms).
   - Click **Find Best Creators**.
4. **Smart Matches**:
   - View ranked recommendations. Notice **Kai Sterling** scored **96% Match**.
   - Inspect transparent breakdown:
     - *✓ Skills alignment: Camera Motion LoRAs & Pacing (30/30 pts)*
     - *✓ Prime Specialization: Dedicated AI Product Advertiser (20/20 pts)*
     - *✓ Tools: Runway Gen-3 Alpha & Midjourney v6*
     - *✓ Verified 9:16 vertical portfolio*
     - *✓ Proof Passport: Reviewed & artifact-verified*
5. **Creator Profile & Proof Passport**:
   - Open Kai Sterling's profile.
   - Inspect the **6-Stage Workflow Timeline** (*Concept → Multi-Angle Video → Frame Selection → Editing → 4K Upscale → Delivery*).
   - Open the **Creator Proof Passport** modal to inspect raw workflow logs and telemetry.
6. **Comparison Matrix**:
   - Compare Kai Sterling with Elena Rostova side-by-side.
7. **Engagement & 6-Stage Delivery**:
   - Click **Send Engagement Request**.
   - Navigate to **Engagements**.
   - Advance through stages (*Requested* → *In Progress* → *Review* → *Completed*).
   - Verify commercial IP certificate status.

---

## 14. Running Locally

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Start Backend
```powershell
# From workspace root
node server/server.js
```
API runs at: `http://localhost:5000`

### Start Frontend
```powershell
# From workspace root
npm run frontend
```
Web app runs at: `http://localhost:5173`

---

## 15. Environment Configuration
The platform uses **one single master `.env` file** at the root of the project:
```env
PORT=5000
HOST=127.0.0.1
NODE_ENV=development
ENVIRONMENT=development

# Cloud MongoDB Atlas Cluster
MONGODB_URI=mongodb+srv://lavanya98435_db_user:a2mqsH6IRPMUeXOl@cluster0.cehle7m.mongodb.net/creovate_ai?retryWrites=true&w=majority

# JWT Auth
JWT_SECRET=creovate-jwt-secret-key-2026-dev
JWT_EXPIRY=7d

# Frontend & Application URLs
APP_URL=http://127.0.0.1:5173
FRONTEND_URL=http://127.0.0.1:5173
VITE_API_URL=http://127.0.0.1:5000
BACKEND_URL=http://127.0.0.1:5000

# Google Gemini API Key (Optional)
GEMINI_API_KEY=
```

---

## 16. Limitations & Future Roadmap
- **Current Production Prototype**: Real-time cloud persistence on MongoDB Atlas with dual in-memory resilience; live AI brief synthesizer with heuristic fallback.
- **Future Roadmap**:
  - Live vector embeddings for semantic prompt matching.
  - On-chain proof hashing for reproducible ComfyUI workflow receipts.
  - Automated escrow payments tied to milestone sign-offs.

---
*CREOVATE AI — Team HACKSHIELD • HacXLerate 2026 Round 1 — Paavai Engineering College.*
