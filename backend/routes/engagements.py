import uuid
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from backend.models.schemas import Engagement, EngagementUpdate
from backend.data.database import ENGAGEMENTS_DB, CREATORS_DB, BRIEFS_DB, get_iso_now

router = APIRouter(prefix="/api/engagements", tags=["Engagements"])

STAGE_NAMES = ["Draft", "Shortlisted", "Requested", "In Progress", "Review", "Completed"]

class EngagementCreateRequest(BaseModel):
    creator_id: str
    brief_id: Optional[str] = None
    campaign_name: Optional[str] = None
    brand_name: Optional[str] = "EcoSip"
    budget: Optional[str] = "$3,500 - $5,000"

@router.get("", response_model=List[Engagement])
def list_engagements():
    engs = list(ENGAGEMENTS_DB.values())
    engs.sort(key=lambda e: e.updated_at, reverse=True)
    return engs

@router.get("/{engagement_id}", response_model=Engagement)
def get_engagement(engagement_id: str):
    if engagement_id not in ENGAGEMENTS_DB:
        raise HTTPException(status_code=404, detail="Engagement not found")
    return ENGAGEMENTS_DB[engagement_id]

@router.post("", response_model=Engagement)
def create_engagement(req: EngagementCreateRequest):
    if req.creator_id not in CREATORS_DB:
        raise HTTPException(status_code=404, detail="Creator not found")

    creator = CREATORS_DB[req.creator_id]
    campaign_title = req.campaign_name
    if not campaign_title and req.brief_id and req.brief_id in BRIEFS_DB:
        campaign_title = BRIEFS_DB[req.brief_id].campaign_name
    elif not campaign_title:
        campaign_title = f"{req.brand_name} — High Impact Generative Campaign"

    new_id = f"eng-{uuid.uuid4().hex[:8]}"
    engagement = Engagement(
        id=new_id,
        brief_id=req.brief_id,
        campaign_name=campaign_title,
        creator_id=creator.id,
        creator_name=creator.name,
        creator_avatar=creator.avatar_url,
        brand_name=req.brand_name or "EcoSip",
        status="Requested",
        current_stage_index=2, # Requested
        deliverables=[
            "1x Master 20-sec 4K 60fps Ad",
            "3x Hook Variations (9:16)",
            "Commercial IP Assignment & Seed logs"
        ],
        milestones=[
            {"name": "Brief Review & Prompt Architecture Approval", "status": "In Progress", "due": "Day 2"},
            {"name": "Initial Latent Generations & Motion Cut", "status": "Pending", "due": "Day 5"},
            {"name": "Sound Design & Topaz 4K Upscale", "status": "Pending", "due": "Day 8"},
            {"name": "Final Review & Commercial License Release", "status": "Pending", "due": "Day 10"}
        ],
        commercial_license_status="Commercial use license agreement drafted",
        total_budget=req.budget or "$4,200",
        created_at=get_iso_now(),
        updated_at=get_iso_now()
    )
    ENGAGEMENTS_DB[new_id] = engagement
    return engagement

@router.put("/{engagement_id}", response_model=Engagement)
def update_engagement(engagement_id: str, update: EngagementUpdate):
    if engagement_id not in ENGAGEMENTS_DB:
        raise HTTPException(status_code=404, detail="Engagement not found")

    eng = ENGAGEMENTS_DB[engagement_id]
    
    if update.status:
        eng.status = update.status
        if update.status in STAGE_NAMES:
            eng.current_stage_index = STAGE_NAMES.index(update.status)
    elif update.current_stage_index is not None:
        idx = max(0, min(5, update.current_stage_index))
        eng.current_stage_index = idx
        eng.status = STAGE_NAMES[idx]

    if update.commercial_license_status:
        eng.commercial_license_status = update.commercial_license_status

    eng.updated_at = get_iso_now()
    ENGAGEMENTS_DB[engagement_id] = eng
    return eng
