from fastapi import APIRouter
from backend.models.schemas import AIBriefGenerateRequest, AIBriefGenerateResponse
from backend.services.gemini_service import generate_brief_from_prompt

router = APIRouter(prefix="/api/ai", tags=["AI"])

@router.post("/generate-brief", response_model=AIBriefGenerateResponse)
def generate_brief(req: AIBriefGenerateRequest):
    structured_brief, generated_by, is_live_ai, demo_mode_label, rationale = generate_brief_from_prompt(
        prompt=req.prompt,
        brand_name=req.brand_name or "EcoSip"
    )

    return AIBriefGenerateResponse(
        structured_brief=structured_brief,
        generated_by=generated_by,
        is_live_ai=is_live_ai,
        demo_mode_label=demo_mode_label,
        rationale=rationale
    )
