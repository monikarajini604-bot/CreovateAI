import express from 'express';
import { Engagement } from '../models/Engagement.js';
import { initialEngagements } from '../data/seedData.js';
import { isConnected } from '../config/db.js';

const router = express.Router();

let memoryEngagements = [...initialEngagements];

// GET /api/engagements
router.get('/', async (req, res) => {
  try {
    let engagements = memoryEngagements;
    if (isConnected) {
      try {
        const dbEngagements = await Engagement.find().lean();
        if (dbEngagements && dbEngagements.length > 0) engagements = dbEngagements;
      } catch {
        engagements = memoryEngagements;
      }
    }

    res.json({
      success: true,
      count: engagements.length,
      engagements
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/engagements - Initiate engagement
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newEngagement = {
      id: data.id || `eng-${Date.now()}`,
      brief_id: data.brief_id || '',
      campaign_name: data.campaign_name || 'Creator Collaboration Campaign',
      creator_id: data.creator_id,
      creator_name: data.creator_name || 'AI Creator',
      creator_avatar: data.creator_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      brand_name: data.brand_name || 'CREOVATE Brand Partner',
      status: 'Requested',
      current_stage_index: 1,
      deliverables: data.deliverables || ['1x Master Video', 'Commercial License Agreement'],
      milestones: [
        { name: 'Creative Strategy & Moodboard', status: 'In Progress', due: 'Day 3' },
        { name: 'Prompt Matrix Formulation', status: 'Pending', due: 'Day 6' },
        { name: 'Generation & Seed Lock', status: 'Pending', due: 'Day 10' },
        { name: 'Master Export & IP Release', status: 'Pending', due: 'Day 14' }
      ],
      commercial_license_status: 'Commercial agreement drafted',
      total_budget: data.total_budget || '$3,500',
      createdAt: new Date().toISOString()
    };

    if (isConnected) {
      try {
        await Engagement.create(newEngagement);
      } catch {}
    }

    memoryEngagements.unshift(newEngagement);

    res.status(201).json({
      success: true,
      engagement: newEngagement
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/engagements/:id/advance - Advance workflow milestone
router.put('/:id/advance', async (req, res) => {
  try {
    const { id } = req.params;
    let eng = memoryEngagements.find(e => e.id === id);
    if (!eng && isConnected) {
      try {
        eng = await Engagement.findOne({ id });
      } catch {}
    }

    if (!eng) {
      return res.status(404).json({ success: false, message: 'Engagement not found' });
    }

    const nextStage = Math.min(6, (eng.current_stage_index || 1) + 1);
    eng.current_stage_index = nextStage;
    if (nextStage === 6) {
      eng.status = 'Completed';
    } else {
      eng.status = 'In Progress';
    }

    if (isConnected) {
      try {
        await Engagement.findOneAndUpdate({ id }, {
          current_stage_index: eng.current_stage_index,
          status: eng.status
        });
      } catch {}
    }

    res.json({
      success: true,
      engagement: eng
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
