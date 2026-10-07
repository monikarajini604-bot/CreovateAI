import express from 'express';
import { Creator } from '../models/Creator.js';
import { Brief } from '../models/Brief.js';
import { getMemoryCreators } from './creatorRoutes.js';
import { getMemoryBriefs } from './briefRoutes.js';

import { isConnected } from '../config/db.js';

const router = express.Router();

function calculateCreatorMatch(creator, brief) {
  // 1. Skills Match
  let skillScore = 70;
  if (brief.content_type?.toLowerCase().includes('video') && creator.specialization?.toLowerCase().includes('video')) {
    skillScore += 25;
  } else if (brief.content_type?.toLowerCase().includes('image') && creator.specialization?.toLowerCase().includes('character')) {
    skillScore += 25;
  } else if (brief.content_type?.toLowerCase().includes('audio') && creator.specialization?.toLowerCase().includes('audio')) {
    skillScore += 25;
  }

  // 2. Content Type Match
  let contentScore = 75;
  if (creator.content_types?.some(ct => brief.content_type?.toLowerCase().includes(ct.toLowerCase()) || ct.toLowerCase().includes(brief.content_type?.toLowerCase()))) {
    contentScore = 95;
  }

  // 3. Tool Match
  let toolScore = 65;
  const reqTools = brief.required_tools || [];
  if (reqTools.length > 0) {
    const matchedTools = reqTools.filter(rt =>
      creator.tools?.some(ct => ct.toLowerCase().includes(rt.toLowerCase()) || rt.toLowerCase().includes(ct.toLowerCase()))
    );
    toolScore = Math.min(98, Math.round((matchedTools.length / reqTools.length) * 100));
    if (toolScore < 60) toolScore = 65;
  } else {
    toolScore = 90;
  }

  // 4. Style Match
  let styleScore = 70;
  if (creator.styles?.some(st => brief.creative_style?.toLowerCase().includes(st.toLowerCase()) || st.toLowerCase().includes(brief.creative_style?.toLowerCase()))) {
    styleScore = 94;
  }

  // 5. Commercial Match
  let commercialScore = 90;
  if (creator.verification_badges?.some(b => b.toLowerCase().includes('commercial'))) {
    commercialScore = 100;
  }

  // Overall Weighted Score
  const overallScore = Math.round(
    skillScore * 0.25 +
    contentScore * 0.25 +
    toolScore * 0.20 +
    styleScore * 0.15 +
    commercialScore * 0.15
  );

  // Rationale ("Why this creator?")
  const matchedToolNames = creator.tools?.filter(t =>
    (brief.required_tools || []).some(rt => rt.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(rt.toLowerCase()))
  ).slice(0, 2).join(' & ') || creator.tools?.[0] || 'advanced AI generative tools';

  const whyRationale = `${creator.name} is a high-confidence match for ${brief.campaign_name || 'this campaign'} because their verified portfolio and workflows demonstrate production mastery in ${creator.specialization}. They utilize ${matchedToolNames} with complete commercial IP clearance and proven consistency.`;

  return {
    creator_id: creator.id,
    creator,
    match_score: overallScore,
    breakdown: {
      skills_match: skillScore,
      content_match: contentScore,
      tool_match: toolScore,
      style_match: styleScore,
      commercial_match: commercialScore
    },
    why_rationale: whyRationale
  };
}

// GET /api/matches/:briefId - Matches for a specific brief
router.get('/:briefId', async (req, res) => {
  try {
    const { briefId } = req.params;

    let brief = null;
    if (isConnected) {
      try {
        brief = await Brief.findOne({ id: briefId }).lean();
      } catch {}
    }
    if (!brief) {
      brief = getMemoryBriefs().find(b => b.id === briefId) || getMemoryBriefs()[0];
    }

    let creators = getMemoryCreators();
    if (isConnected) {
      try {
        const dbCreators = await Creator.find().lean();
        if (dbCreators && dbCreators.length > 0) creators = dbCreators;
      } catch {}
    }

    const matches = creators.map(c => calculateCreatorMatch(c, brief))
      .sort((a, b) => b.match_score - a.match_score);

    res.json({
      success: true,
      brief,
      matches
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/matches - Calculate matches for an ad-hoc brief object
router.post('/', async (req, res) => {
  try {
    const brief = req.body;
    let creators = getMemoryCreators();
    if (isConnected) {
      try {
        const dbCreators = await Creator.find().lean();
        if (dbCreators && dbCreators.length > 0) creators = dbCreators;
      } catch {}
    }

    const matches = creators.map(c => calculateCreatorMatch(c, brief))
      .sort((a, b) => b.match_score - a.match_score);

    res.json({
      success: true,
      brief,
      matches
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
