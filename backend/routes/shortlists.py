import uuid
from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.schemas import ShortlistItem, ShortlistCreate
from backend.data.database import SHORTLISTS_DB, CREATORS_DB, get_iso_now

router = APIRouter(prefix="/api/shortlists", tags=["Shortlists"])

@router.get("", response_model=List[ShortlistItem])
def list_shortlists():
    return list(SHORTLISTS_DB.values())

@router.post("", response_model=ShortlistItem)
def add_to_shortlist(req: ShortlistCreate):
    if req.creator_id not in CREATORS_DB:
        raise HTTPException(status_code=404, detail="Creator not found")
    
    # Check if already shortlisted
    for item in SHORTLISTS_DB.values():
        if item.creator_id == req.creator_id:
            return item

    new_id = f"shortlist-{uuid.uuid4().hex[:8]}"
    item = ShortlistItem(
        id=new_id,
        brief_id=req.brief_id,
        creator_id=req.creator_id,
        creator=CREATORS_DB[req.creator_id],
        notes=req.notes or f"Shortlisted for candidate review",
        created_at=get_iso_now()
    )
    SHORTLISTS_DB[new_id] = item
    return item

@router.delete("/{item_or_creator_id}")
def remove_from_shortlist(item_or_creator_id: str):
    target_key = None
    if item_or_creator_id in SHORTLISTS_DB:
        target_key = item_or_creator_id
    else:
        for k, v in SHORTLISTS_DB.items():
            if v.creator_id == item_or_creator_id:
                target_key = k
                break
    
    if not target_key:
        raise HTTPException(status_code=404, detail="Shortlist item not found")
    
    del SHORTLISTS_DB[target_key]
    return {"success": True, "message": "Creator removed from shortlist"}
