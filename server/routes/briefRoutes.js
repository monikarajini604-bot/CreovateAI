import express from 'express';
import { Brief } from '../models/Brief.js';
import { initialBriefs } from '../data/seedData.js';
import { isConnected } from '../config/db.js';

const router = express.Router();

let memoryBriefs = [...initialBriefs];

export const getMemoryBriefs = () => memoryBriefs;
export const setMemoryBriefs = (data) => { memoryBriefs = data; };

// GET /api/briefs
router.get('/', async (req, res) => {
  try {
    let briefs = memoryBriefs;
    if (isConnected) {
      try {
        const dbBriefs = await Brief.find().lean();
        if (dbBriefs && dbBriefs.length > 0) briefs = dbBriefs;
      } catch {
        briefs = memoryBriefs;
      }
    }

    res.json({
      success: true,
      count: briefs.length,
      briefs
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/briefs/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let brief = null;
    if (isConnected) {
      try {
        brief = await Brief.findOne({ id }).lean();
      } catch {}
    }

    if (!brief) {
      brief = memoryBriefs.find(b => b.id === id);
    }

    if (!brief) {
      return res.status(404).json({ success: false, message: 'Brief not found' });
    }

    res.json({
      success: true,
      brief
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/briefs - Create new brief
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newBrief = {
      id: data.id || `brief-${Date.now()}`,
      brand_name: data.brand_name || 'Brand Partner',
      campaign_name: data.campaign_name || 'Untitled Campaign',
      objective: data.objective || 'Campaign creative production',
      description: data.description || '',
      target_audience: data.target_audience || 'General Demographic',
      content_type: data.content_type || 'AI Video',
      creative_style: data.creative_style || 'Hyper-Realistic',
      platform: data.platform || 'Instagram / TikTok / YouTube',
      aspect_ratio: data.aspect_ratio || '9:16',
      duration: data.duration || '20 seconds',
      required_tools: data.required_tools || ['Runway Gen-3 Alpha', 'Midjourney v6.1'],
      commercial_use_req: data.commercial_use_req || 'Full commercial buyout',
      licensing_req: data.licensing_req || 'Perpetual commercial license',
      budget: data.budget || '$3,000 - $5,000',
      deadline: data.deadline || '14 business days',
      deliverables: data.deliverables || ['1x Master Video', 'Source Prompts', 'Commercial License'],
      additional_notes: data.additional_notes || '',
      status: data.status || 'Active',
      createdAt: new Date().toISOString()
    };

    if (isConnected) {
      try {
        await Brief.create(newBrief);
      } catch {}
    }

    memoryBriefs.unshift(newBrief);

    res.status(201).json({
      success: true,
      brief: newBrief
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
