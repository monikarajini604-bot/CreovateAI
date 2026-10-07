import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load unified root .env file, with fallback to local directory .env
root_env = Path(__file__).resolve().parent.parent / ".env"
if root_env.exists():
    load_dotenv(dotenv_path=root_env)
load_dotenv()

from backend.routes.creators import router as creators_router
from backend.routes.briefs import router as briefs_router
from backend.routes.matches import router as matches_router
from backend.routes.shortlists import router as shortlists_router
from backend.routes.engagements import router as engagements_router
from backend.routes.ai import router as ai_router
from backend.data.database import CREATORS_DB, BRIEFS_DB, SHORTLISTS_DB, ENGAGEMENTS_DB


app = FastAPI(
    title="CREOVATE AI — API",
    description="Backend API for AI Creator Discovery & Collaboration Marketplace (HacXLerate 2026 Challenge 2)",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(creators_router)
app.include_router(briefs_router)
app.include_router(matches_router)
app.include_router(shortlists_router)
app.include_router(engagements_router)
app.include_router(ai_router)

@app.get("/api/health")
def health_check():
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    has_live_gemini = bool(gemini_key and not gemini_key.startswith("your_") and len(gemini_key) > 15)
    return {
        "status": "healthy",
        "service": "CREOVATE AI Marketplace Engine",
        "live_gemini_configured": has_live_gemini,
        "mode": "Live Gemini AI" if has_live_gemini else "Smart Demonstration Mode",
        "creators_indexed": len(CREATORS_DB),
        "briefs_count": len(BRIEFS_DB)
    }

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    active_briefs = len([b for b in BRIEFS_DB.values() if b.status in ["Active", "Draft", "Matched"]])
    shortlisted_count = len(SHORTLISTS_DB)
    active_engagements = len([e for e in ENGAGEMENTS_DB.values() if e.status != "Completed"])
    completed_projects = len([e for e in ENGAGEMENTS_DB.values() if e.status == "Completed"]) + 14 # Total past marketplace completed

    recent_activity = [
        {
            "id": "act-1",
            "type": "engagement_updated",
            "title": "Milestone Approved: Styleframe & Prompt Architecture",
            "subtitle": "Kai Sterling • Pure Hydration 2026 Campaign",
            "time": "12 minutes ago",
            "badge": "In Progress"
        },
        {
            "id": "act-2",
            "type": "proof_verified",
            "title": "Proof Passport Verified: Runway Gen-3 Camera Control",
            "subtitle": "Kai Sterling • Peer Reviewed & Artifact Verified",
            "time": "2 hours ago",
            "badge": "Verified"
        },
        {
            "id": "act-3",
            "type": "creator_shortlisted",
            "title": "Creator Shortlisted: Elena Rostova",
            "subtitle": "Shortlisted for BioSphere 3D Animation review",
            "time": "4 hours ago",
            "badge": "Shortlisted"
        },
        {
            "id": "act-4",
            "type": "brief_created",
            "title": "Creative Brief Published: EcoSip 20s Launch",
            "subtitle": "AI-Assisted Brief Builder • 9:16 Vertical Video",
            "time": "Yesterday",
            "badge": "Active"
        }
    ]

    return {
        "metrics": {
            "active_briefs": active_briefs,
            "shortlisted_creators": shortlisted_count,
            "active_engagements": active_engagements,
            "completed_projects": completed_projects,
            "verified_creators": len([c for c in CREATORS_DB.values() if c.verification_status == "Reviewed"]),
            "average_match_score": 92
        },
        "recent_activity": recent_activity
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
