from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class WorkflowStage(BaseModel):
    step_number: int
    name: str  # Concept, Generation, Selection, Editing, Enhancement, Final Delivery
    description: str
    tools: List[str]

class EvidenceItem(BaseModel):
    id: str
    claimed_skill: str
    tool_model: str
    portfolio_evidence: str
    workflow_evidence: str
    evidence_status: str  # "Self-declared" | "Evidence provided" | "Reviewed"
    review_status: str    # "Peer Reviewed & Artifact Verified", "Community Endorsed", "Awaiting Review"
    verified_at: Optional[str] = None

class PortfolioItem(BaseModel):
    id: str
    creator_id: str
    creator_name: str
    title: str
    description: str
    thumbnail_url: str
    media_url: str
    content_type: str  # AI Video, AI Animation, Generative 3D, AI Product Render, Motion Graphics
    style: str         # Hyper-Realistic, Cinematic, Surreal, Minimalist, Cyberpunk, Neo-Commercial
    tools_used: List[str]  # Runway Gen-3, Midjourney v6, Kling AI, Luma Dream Machine, ComfyUI, etc.
    workflow: str      # Text prompt -> Multi-angle generation -> Frame interpolation -> Topaz upscale
    output_format: str # MP4 (ProRes), PNG (4K), WebM
    aspect_ratio: str  # 9:16, 16:9, 1:1, 4:5
    commercial_use: str # Commercial use available, Commercial use requires agreement, Commercial buyout included
    licensing: str     # Full commercial buyout, Digital broadcast license, Social media exclusive
    evidence_status: str # Self-declared, Evidence provided, Reviewed
    evidence_details: Optional[Dict[str, Any]] = None

class CreatorProfile(BaseModel):
    id: str
    name: str
    avatar_url: str
    headline: str
    bio: str
    specialization: str
    skills: List[str]
    tools: List[str]
    content_types: List[str]
    styles: List[str]
    workflows: List[WorkflowStage]
    commercial_use: str
    licensing_terms: str
    verification_status: str  # Self-declared, Evidence provided, Reviewed
    experience_years: int = 3
    hourly_rate: int = 120
    rating: float = 4.9
    completed_projects: int = 24
    evidence_passport: List[EvidenceItem] = []
    portfolio: List[PortfolioItem] = []

class CreativeBriefCreate(BaseModel):
    brand_name: str = "EcoSip"
    campaign_name: str
    objective: str
    target_audience: str
    content_type: str
    creative_style: str
    platform: str
    aspect_ratio: str
    duration: str
    deliverables: List[str]
    deadline: str
    budget: str
    commercial_use_req: str
    licensing_req: str
    additional_notes: Optional[str] = ""

class CreativeBrief(CreativeBriefCreate):
    id: str
    status: str = "Active" # Draft, Active, Matched, In Progress, Completed
    created_at: str

class MatchBreakdown(BaseModel):
    match_score: int
    skills_score: int
    specialization_score: int
    tools_score: int
    content_type_score: int
    format_score: int
    style_score: int
    explanations: List[str]
    weights: Dict[str, str] = {
        "skills": "30%",
        "specialization": "20%",
        "tools": "20%",
        "content_type": "15%",
        "format": "10%",
        "style": "5%"
    }

class CreatorMatch(BaseModel):
    creator: CreatorProfile
    match_score: int
    breakdown: MatchBreakdown

class ShortlistCreate(BaseModel):
    brief_id: Optional[str] = None
    creator_id: str
    notes: Optional[str] = ""

class ShortlistItem(BaseModel):
    id: str
    brief_id: Optional[str] = None
    creator_id: str
    creator: CreatorProfile
    notes: Optional[str] = ""
    created_at: str

class Engagement(BaseModel):
    id: str
    brief_id: Optional[str] = None
    campaign_name: str
    creator_id: str
    creator_name: str
    creator_avatar: str
    brand_name: str
    status: str # "Draft" | "Shortlisted" | "Requested" | "In Progress" | "Review" | "Completed"
    current_stage_index: int # 0 to 5
    deliverables: List[str]
    milestones: List[Dict[str, Any]]
    commercial_license_status: str
    total_budget: str
    created_at: str
    updated_at: str

class EngagementUpdate(BaseModel):
    status: Optional[str] = None
    current_stage_index: Optional[int] = None
    commercial_license_status: Optional[str] = None

class AIBriefGenerateRequest(BaseModel):
    prompt: str
    brand_name: Optional[str] = "EcoSip"

class AIBriefGenerateResponse(BaseModel):
    structured_brief: Dict[str, Any]
    generated_by: str # "Gemini 2.5 Flash (Live AI)" | "CREOVATE Intelligent Heuristic Engine (DEMO MODE)"
    is_live_ai: bool
    demo_mode_label: str
    rationale: str
