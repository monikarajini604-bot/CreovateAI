import express from 'express';
import { Brand } from '../models/Brand.js';
import { initialBrands } from '../data/brandSeedData.js';
import { isConnected } from '../config/db.js';

const router = express.Router();

let memoryBrands = [...initialBrands];

export const getMemoryBrands = () => memoryBrands;
export const setMemoryBrands = (data) => { memoryBrands = data; };

// GET /api/brands - list all brands
router.get('/', async (req, res) => {
  try {
    let brands = memoryBrands;
    if (isConnected) {
      try {
        const dbBrands = await Brand.find().lean();
        if (dbBrands && dbBrands.length > 0) brands = dbBrands;
      } catch {
        brands = memoryBrands;
      }
    }

    res.json({
      success: true,
      count: brands.length,
      brands
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/brands/:id - get brand by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let brand = null;

    if (isConnected) {
      try {
        brand = await Brand.findOne({ id }).lean();
      } catch {}
    }

    if (!brand) {
      brand = memoryBrands.find(b => b.id === id);
    }

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand or Agency not found' });
    }

    res.json({
      success: true,
      brand
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/brands/:id - update brand profile
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let updated = null;
    if (isConnected) {
      try {
        updated = await Brand.findOneAndUpdate({ id }, { ...updateData, updated_at: new Date() }, { new: true }).lean();
      } catch {}
    }

    const memIdx = memoryBrands.findIndex(b => b.id === id);
    if (memIdx >= 0) {
      memoryBrands[memIdx] = { ...memoryBrands[memIdx], ...updateData, updated_at: new Date().toISOString() };
      updated = memoryBrands[memIdx];
    } else {
      const newBrand = { id, ...updateData, created_at: new Date().toISOString() };
      memoryBrands.push(newBrand);
      updated = newBrand;
    }

    res.json({
      success: true,
      brand: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
