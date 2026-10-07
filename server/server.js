import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, isConnected } from './config/db.js';
import { Creator } from './models/Creator.js';
import { Brief } from './models/Brief.js';
import { Engagement } from './models/Engagement.js';
import { Brand } from './models/Brand.js';
import { Conversation } from './models/Conversation.js';
import { initialCreators, initialBriefs, initialEngagements } from './data/seedData.js';
import { initialBrands, initialConversations } from './data/brandSeedData.js';

import creatorRoutes from './routes/creatorRoutes.js';
import briefRoutes from './routes/briefRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import engagementRoutes from './routes/engagementRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load unified root .env file, with fallback to local directory .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();

// Middleware & CORS Configuration for Localhost & Production
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
  process.env.APP_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (process.env.ENVIRONMENT !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
app.use(express.json());

// Database Connection & Auto-Seed
async function initDatabase() {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const creatorCount = await Creator.countDocuments();
      if (creatorCount === 0) {
        console.log('[Seed] Seeding initial creators into MongoDB...');
        await Creator.insertMany(initialCreators);
      }
      const briefCount = await Brief.countDocuments();
      if (briefCount === 0) {
        console.log('[Seed] Seeding initial briefs into MongoDB...');
        await Brief.insertMany(initialBriefs);
      }
      const engagementCount = await Engagement.countDocuments();
      if (engagementCount === 0) {
        console.log('[Seed] Seeding initial engagements into MongoDB...');
        await Engagement.insertMany(initialEngagements);
      }
      const brandCount = await Brand.countDocuments();
      if (brandCount === 0) {
        console.log('[Seed] Seeding initial brands into MongoDB...');
        await Brand.insertMany(initialBrands);
      }
      const conversationCount = await Conversation.countDocuments();
      if (conversationCount === 0 && initialConversations && initialConversations.length > 0) {
        console.log('[Seed] Seeding initial conversations into MongoDB...');
        await Conversation.insertMany(initialConversations);
      }
    } catch (err) {
      console.warn('[Seed Error] Auto-seeding skipped:', err.message);
    }
  }
}

initDatabase();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    stack: 'MERN (MongoDB + Express + React + Node.js)',
    marketplace: 'CREOVATE AI',
    tagline: 'Create. Innovate. Elevate with AI.',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Dashboard Stats Endpoint
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    let totalCreators = initialCreators.length;
    let totalBriefs = initialBriefs.length;
    let activeEngagements = initialEngagements.length;

    if (isConnected) {
      try {
        totalCreators = await Creator.countDocuments() || totalCreators;
        totalBriefs = await Brief.countDocuments() || totalBriefs;
        activeEngagements = await Engagement.countDocuments() || activeEngagements;
      } catch {}
    }

    res.json({
      success: true,
      stats: {
        verified_creators: totalCreators,
        active_campaign_briefs: totalBriefs,
        in_progress_engagements: activeEngagements,
        match_accuracy_rate: '98.4%',
        commercial_clearance_rate: '100%',
        avg_turnaround_days: 7.2
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mount Routes
app.use('/api/creators', creatorRoutes);
app.use('/api/briefs', briefRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/engagements', engagementRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
});

// Start Express Server with Error Handling
const server = app.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`  CREOVATE AI - AI Content Creator Marketplace      `);
  console.log(`  Server running on http://localhost:${PORT}        `);
  console.log(`  Localhost Binding: http://127.0.0.1:${PORT}         `);
  console.log(`  MERN Stack: MongoDB | Express | React | Node.js   `);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Server Startup Error] Port ${PORT} is already in use by another process.`);
  } else {
    console.error(`[Server Startup Error] Failed to bind to ${HOST}:${PORT}:`, err.message);
  }
});
