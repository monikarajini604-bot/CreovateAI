import uuid
from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.schemas import CreativeBrief, CreativeBriefCreate
from backend.data.database import BRIEFS_DB, get_iso_now

router = APIRouter(prefix="/api/briefs", tags=["Briefs"])

@router.get("", response_model=List[CreativeBrief])
def list_briefs():
    briefs = list(BRIEFS_DB.values())
    # Sort newest first
    briefs.sort(key=lambda b: b.created_at, reverse=True)
    return briefs

@router.get("/{brief_id}", response_model=CreativeBrief)
def get_brief(brief_id: str):
    if brief_id not in BRIEFS_DB:
        raise HTTPException(status_code=404, detail="Brief not found")
    return BRIEFS_DB[brief_id]

@router.post("", response_model=CreativeBrief)
def create_brief(brief_in: CreativeBriefCreate):
    new_id = f"brief-{uuid.uuid4().hex[:8]}"
    brief = CreativeBrief(
        id=new_id,
        status="Active",
        created_at=get_iso_now(),
        **brief_in.model_dump()
    )
    BRIEFS_DB[new_id] = brief
    return brief

@router.put("/{brief_id}", response_model=CreativeBrief)
def update_brief(brief_id: str, brief_in: CreativeBriefCreate):
    if brief_id not in BRIEFS_DB:
        raise HTTPException(status_code=404, detail="Brief not found")
    
    existing = BRIEFS_DB[brief_id]
    updated = CreativeBrief(
        id=existing.id,
        status=existing.status,
        created_at=existing.created_at,
        **brief_in.model_dump()
    )
    BRIEFS_DB[brief_id] = updated
    return updated
