import express from 'express';
import { Creator } from '../models/Creator.js';
import { initialCreators } from '../data/seedData.js';
import { isConnected } from '../config/db.js';

const router = express.Router();

// Memory store fallback if MongoDB is not connected
let memoryCreators = [...initialCreators];

export const getMemoryCreators = () => memoryCreators;
export const setMemoryCreators = (data) => { memoryCreators = data; };

// GET /api/creators - Search & filter across 7 dimensions
router.get('/', async (req, res) => {
  try {
    const { q, skill, spec, tool, content, price, commercial, availability } = req.query;

    let creators = memoryCreators;
    if (isConnected) {
      try {
        const dbCreators = await Creator.find().lean();
        if (dbCreators && dbCreators.length > 0) creators = dbCreators;
      } catch {
        creators = memoryCreators;
      }
    }

    let filtered = creators.filter(c => {
      // 1. Search Query
      if (q) {
        const query = q.toLowerCase();
        const matchesName = c.name?.toLowerCase().includes(query);
        const matchesHeadline = c.headline?.toLowerCase().includes(query);
        const matchesBio = c.bio?.toLowerCase().includes(query);
        const matchesSkills = c.skills?.some(s => s.toLowerCase().includes(query));
        const matchesTools = c.tools?.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesHeadline && !matchesBio && !matchesSkills && !matchesTools) {
          return false;
        }
      }

      // 2. Skill Filter
      if (skill && skill !== 'all') {
        const hasSkill = c.skills?.some(s => s.toLowerCase() === skill.toLowerCase());
        if (!hasSkill) return false;
      }

      // 3. Specialization Filter
      if (spec && spec !== 'all') {
        const matchesSpec = c.specialization?.toLowerCase().includes(spec.toLowerCase());
        if (!matchesSpec) return false;
      }

      // 4. Tool Filter
      if (tool && tool !== 'all') {
        const hasTool = c.tools?.some(t => t.toLowerCase().includes(tool.toLowerCase()));
        if (!hasTool) return false;
      }

      // 5. Content Type Filter
      if (content && content !== 'all') {
        const hasContent = c.content_types?.some(ct => ct.toLowerCase().includes(content.toLowerCase()));
        if (!hasContent) return false;
      }

      // 6. Max Hourly Rate Filter
      if (price) {
        const maxPrice = Number(price);
        if (!isNaN(maxPrice) && c.hourly_rate > maxPrice) {
          return false;
        }
      }

      // 7. Commercial Use Filter
      if (commercial && commercial !== 'all') {
        if (commercial === 'commercial-ready') {
          const hasCommercial = c.commercial_use?.toLowerCase().includes('commercial') ||
            c.verification_badges?.some(b => b.toLowerCase().includes('commercial'));
          if (!hasCommercial) return false;
        }
      }

      // 8. Availability Filter
      if (availability && availability !== 'all') {
        const matchesAvail = c.availability?.toLowerCase() === availability.toLowerCase();
        if (!matchesAvail) return false;
      }

      return true;
    });

    res.json({
      success: true,
      count: filtered.length,
      creators: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/creators/:id - Single Creator Detail
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let creator = null;
    if (isConnected) {
      try {
        creator = await Creator.findOne({ id }).lean();
      } catch {}
    }

    if (!creator) {
      creator = memoryCreators.find(c => c.id === id);
    }

    if (!creator) {
      return res.status(404).json({ success: false, message: 'Creator not found' });
    }

    res.json({
      success: true,
      creator
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/creators - Register or update a creator profile
router.post('/', async (req, res) => {
  try {
    const creatorData = req.body;
    if (!creatorData.id) {
      creatorData.id = `creator-${Date.now()}`;
    }

    if (isConnected) {
      try {
        await Creator.findOneAndUpdate(
          { id: creatorData.id },
          creatorData,
          { upsert: true, new: true }
        );
      } catch {}
    }

    const idx = memoryCreators.findIndex(c => c.id === creatorData.id);
    if (idx >= 0) {
      memoryCreators[idx] = { ...memoryCreators[idx], ...creatorData };
    } else {
      memoryCreators.push(creatorData);
    }

    res.status(201).json({
      success: true,
      creator: creatorData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
