from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.schemas import CreatorMatch, CreativeBrief, CreativeBriefCreate
from backend.data.database import BRIEFS_DB, CREATORS_DB
from backend.services.matching_engine import match_creators_for_brief

router = APIRouter(prefix="/api/matches", tags=["Matches"])

@router.get("/{brief_id}", response_model=List[CreatorMatch])
def get_matches_for_brief(brief_id: str):
    if brief_id not in BRIEFS_DB:
        raise HTTPException(status_code=404, detail="Brief not found")
    
    brief = BRIEFS_DB[brief_id]
    creators = list(CREATORS_DB.values())
    return match_creators_for_brief(brief, creators)

@router.post("", response_model=List[CreatorMatch])
def calculate_matches_for_payload(brief_data: CreativeBriefCreate):
    temp_brief = CreativeBrief(
        id="temp-brief",
        status="Active",
        created_at="now",
        **brief_data.model_dump()
    )
    creators = list(CREATORS_DB.values())
    return match_creators_for_brief(temp_brief, creators)
