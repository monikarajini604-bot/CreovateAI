from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.models.schemas import CreatorProfile, PortfolioItem
from backend.data.database import CREATORS_DB

router = APIRouter(prefix="/api/creators", tags=["Creators"])

@router.get("", response_model=List[CreatorProfile])
def list_creators(
    search: Optional[str] = Query(None, description="Search query across name, bio, skills"),
    skill: Optional[str] = Query(None, description="Filter by skill"),
    specialization: Optional[str] = Query(None, description="Filter by specialization"),
    tool: Optional[str] = Query(None, description="Filter by AI tool/model"),
    content_type: Optional[str] = Query(None, description="Filter by content type"),
    style: Optional[str] = Query(None, description="Filter by creative style"),
    format_type: Optional[str] = Query(None, alias="format", description="Filter by format or aspect ratio"),
    commercial_use: Optional[str] = Query(None, description="Filter by commercial use status")
):
    results = list(CREATORS_DB.values())

    if search:
        s = search.lower()
        results = [
            c for c in results
            if s in c.name.lower()
            or s in c.headline.lower()
            or s in c.bio.lower()
            or any(s in sk.lower() for sk in c.skills)
            or any(s in t.lower() for t in c.tools)
            or any(s in p.title.lower() for p in c.portfolio)
        ]

    if skill:
        sk_q = skill.lower()
        results = [c for c in results if any(sk_q in s.lower() for s in c.skills)]

    if specialization:
        sp_q = specialization.lower()
        results = [c for c in results if sp_q in c.specialization.lower()]

    if tool:
        t_q = tool.lower()
        results = [c for c in results if any(t_q in t.lower() for t in c.tools)]

    if content_type:
        ct_q = content_type.lower()
        results = [c for c in results if any(ct_q in ct.lower() for ct in c.content_types)]

    if style:
        st_q = style.lower()
        results = [c for c in results if any(st_q in s.lower() for s in c.styles)]

    if format_type:
        fmt_q = format_type.lower()
        results = [
            c for c in results
            if any(fmt_q in p.aspect_ratio.lower() or fmt_q in p.output_format.lower() for p in c.portfolio)
        ]

    if commercial_use:
        cu_q = commercial_use.lower()
        results = [c for c in results if cu_q in c.commercial_use.lower()]

    return results

@router.get("/{creator_id}", response_model=CreatorProfile)
def get_creator_by_id(creator_id: str):
    if creator_id not in CREATORS_DB:
        raise HTTPException(status_code=404, detail="Creator not found")
    return CREATORS_DB[creator_id]

@router.get("/{creator_id}/portfolio", response_model=List[PortfolioItem])
def get_creator_portfolio(creator_id: str):
    if creator_id not in CREATORS_DB:
        raise HTTPException(status_code=404, detail="Creator not found")
    return CREATORS_DB[creator_id].portfolio
