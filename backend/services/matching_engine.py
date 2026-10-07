"""
CREOVATE AI - Explainable Smart Creator Matching Engine
Deterministic, transparent matching based on weighted requirements:
- Skills: 30%
- Specialization: 20%
- AI Tools / Models: 20%
- Content Type: 15%
- Format: 10%
- Style: 5%
"""

from typing import List, Dict, Any
from backend.models.schemas import CreatorProfile, CreativeBrief, MatchBreakdown, CreatorMatch

def calculate_creator_match(creator: CreatorProfile, brief: CreativeBrief) -> CreatorMatch:
    explanations: List[str] = []

    # 1. Skills Matching (Weight: 30%)
    # Compare creator's skills with brief's objective, deliverables, and content_type
    brief_text = f"{brief.objective} {brief.campaign_name} {' '.join(brief.deliverables)} {brief.additional_notes}".lower()
    
    skill_hits = 0
    total_skills = max(1, len(creator.skills))
    matched_skills = []
    for skill in creator.skills:
        skill_lower = skill.lower()
        # check keywords
        words = [w for w in skill_lower.split() if len(w) > 3]
        if any(w in brief_text for w in words) or (brief.content_type.lower() in skill_lower):
            skill_hits += 1
            matched_skills.append(skill)

    skills_ratio = min(1.0, (skill_hits / min(3, total_skills)) * 0.8 + 0.2) if skill_hits > 0 else 0.35
    skills_score = int(skills_ratio * 30)

    if matched_skills:
        explanations.append(f"✓ Skills alignment: {', '.join(matched_skills[:2])} matches campaign requirements")
    else:
        explanations.append("✓ Relevant generative production capability")

    # 2. Specialization Matching (Weight: 20%)
    spec_lower = creator.specialization.lower()
    spec_score = 0
    if ("product" in brief_text or "bottle" in brief_text or "ad" in brief_text or "commercial" in brief_text) and "product" in spec_lower:
        spec_score = 20
        explanations.append(f"✓ Prime Specialization: Dedicated {creator.specialization}")
    elif ("video" in brief.content_type.lower() or "film" in brief.content_type.lower()) and ("film" in spec_lower or "video" in spec_lower or "animat" in spec_lower):
        spec_score = 18
        explanations.append(f"✓ Strong domain focus: {creator.specialization}")
    elif "animat" in brief.content_type.lower() and "animat" in spec_lower:
        spec_score = 20
        explanations.append(f"✓ Specialization match: {creator.specialization}")
    elif "render" in brief.content_type.lower() and "design" in spec_lower:
        spec_score = 18
        explanations.append(f"✓ Specialization match: {creator.specialization}")
    else:
        spec_score = 12
        explanations.append(f"• General AI specialization: {creator.specialization}")

    # 3. AI Tools & Models Matching (Weight: 20%)
    # Tools like Runway, Midjourney, Kling, ComfyUI
    tool_score = 0
    matched_tools = []
    for tool in creator.tools:
        tool_l = tool.lower()
        if "runway" in tool_l or "kling" in tool_l or "midjourney" in tool_l:
            matched_tools.append(tool)
    
    if len(matched_tools) >= 2:
        tool_score = 20
        explanations.append(f"✓ High-fidelity AI Toolstack: {', '.join(matched_tools[:3])}")
    elif len(matched_tools) == 1:
        tool_score = 15
        explanations.append(f"✓ Tool compatibility: {matched_tools[0]}")
    else:
        tool_score = 10
        explanations.append(f"• Standard GenAI toolstack: {', '.join(creator.tools[:2])}")

    # 4. Content Type Matching (Weight: 15%)
    ct_score = 0
    if any(brief.content_type.lower() in ct.lower() for ct in creator.content_types):
        ct_score = 15
        explanations.append(f"✓ Direct Content Type match: {brief.content_type}")
    elif any("video" in ct.lower() for ct in creator.content_types) and "video" in brief.content_type.lower():
        ct_score = 15
        explanations.append("✓ AI Video native workflow")
    else:
        ct_score = 7
        explanations.append(f"• Adaptable content formats: {', '.join(creator.content_types[:2])}")

    # 5. Format & Aspect Ratio Matching (Weight: 10%)
    format_score = 0
    # Check creator portfolios for the aspect ratio requested
    has_format_experience = any(
        brief.aspect_ratio.strip() in p.aspect_ratio or ("vertical" in brief_text and "9:16" in p.aspect_ratio)
        for p in creator.portfolio
    )
    if has_format_experience:
        format_score = 10
        explanations.append(f"✓ Verified format mastery: {brief.aspect_ratio} ({brief.duration}) in past portfolio")
    else:
        format_score = 5
        explanations.append(f"• Supports multi-format delivery ({brief.aspect_ratio})")

    # 6. Style Matching (Weight: 5%)
    style_score = 0
    if any(brief.creative_style.lower() in s.lower() for s in creator.styles):
        style_score = 5
        explanations.append(f"✓ Aesthetic alignment: {brief.creative_style} aesthetic")
    else:
        style_score = 3
        explanations.append(f"• Creative versatility ({', '.join(creator.styles[:2])})")

    # Commercial verification bonus note
    if creator.verification_status == "Reviewed":
        explanations.append("✓ Proof Passport: Reviewed & artifact-verified track record")
    elif creator.verification_status == "Evidence provided":
        explanations.append("✓ Proof Passport: Evidence and raw workflow logs submitted")

    total_score = min(99, max(45, skills_score + spec_score + tool_score + ct_score + format_score + style_score))

    breakdown = MatchBreakdown(
        match_score=total_score,
        skills_score=skills_score,
        specialization_score=spec_score,
        tools_score=tool_score,
        content_type_score=ct_score,
        format_score=format_score,
        style_score=style_score,
        explanations=explanations
    )

    return CreatorMatch(
        creator=creator,
        match_score=total_score,
        breakdown=breakdown
    )

def match_creators_for_brief(brief: CreativeBrief, creators: List[CreatorProfile]) -> List[CreatorMatch]:
    matches = [calculate_creator_match(creator, brief) for creator in creators]
    # Sort descending by match_score
    matches.sort(key=lambda m: m.match_score, reverse=True)
    return matches
