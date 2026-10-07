import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { initialCreators } from '../data/seedData.js';
import { initialBrands } from '../data/brandSeedData.js';
import { requireAuth } from '../middleware/auth.js';
import { isConnected } from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'creovate-jwt-secret-key-2026';
const TOKEN_EXPIRY = '7d';

// Default seed users
const defaultUsersSeed = [
  {
    id: 'creator-kai-sterling',
    role: 'creator',
    name: 'Kai Sterling',
    email: 'kai.sterling@creovate.ai',
    mobile: '310-555-0192',
    password: '',
    verificationStatus: 'Verified',
    email_verified: true,
    mobile_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'creator-elena-rostova',
    role: 'creator',
    name: 'Elena Rostova',
    email: 'elena.rostova@creovate.ai',
    mobile: '415-555-0842',
    password: '',
    verificationStatus: 'Verified',
    email_verified: true,
    mobile_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'brand-solaria',
    role: 'brand',
    name: 'Solaria Clean Tech',
    contact_person: 'Marcus Vance',
    businessName: 'Solaria Clean Tech',
    email: 'marcus@solariaenergy.com',
    mobile: '+1 (415) 890-2341',
    password: '',
    verificationStatus: 'Verified',
    email_verified: true,
    mobile_verified: true,
    avatar_url: 'https://images.unsplash.com/photo-1560179704-6190bf17540a?auto=format&fit=crop&w=300&q=80'
  }
];

// Memory store fallback if MongoDB is unreachable or in-memory mode
let memoryUsers = [...defaultUsersSeed];

export const getMemoryUsers = () => memoryUsers;
export const setMemoryUsers = (data) => { memoryUsers = data; };

export function toSafeUser(user) {
  if (!user) return null;
  const raw = typeof user.toObject === 'function' ? user.toObject() : { ...user };
  delete raw.password;
  delete raw.__v;
  return raw;
}

// Seed default users into MongoDB if present
let seedPromise = null;
export async function ensureDefaultUsers() {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    try {
      const defaultPasswordHash = await bcrypt.hash('password123', 10);
      memoryUsers.forEach(u => {
        if (!u.password) u.password = defaultPasswordHash;
      });

      if (isConnected) {
        try {
          const count = await User.countDocuments();
          if (count === 0) {
            console.log('[Auth] Seeding default authenticated users into MongoDB...');
            const defaultUsersWithPasswords = memoryUsers.map(u => ({ ...u }));
            await User.insertMany(defaultUsersWithPasswords);
            console.log('[Auth] Successfully seeded default users with hashed passwords.');
          }
        } catch (dbErr) {
          console.warn('[Auth Seed Warning] MongoDB seed skipped, using in-memory store:', dbErr.message);
        }
      }
    } catch (err) {
      console.warn('[Auth Seed Warning]:', err.message);
    }
  })();
  return seedPromise;
}

// Generate JWT Helper
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Helper to mask email (e.g. l*****@gmail.com)
export function maskEmail(email) {
  if (!email) return '';
  const [user, domain] = email.split('@');
  if (!domain) return email;
  if (user.length <= 1) return `*@${domain}`;
  if (user.length === 2) return `${user[0]}*@${domain}`;
  return `${user[0]}*****@${domain}`;
}

// POST /api/auth/register - Register new account with dual persistence (MongoDB + Memory)
router.post('/register', async (req, res) => {
  try {
    await ensureDefaultUsers();

    const { role, name, fullName, contactName, businessName, email, mobile, password, confirmPassword } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    // 1. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    // 2. Full Name / Contact validation
    const accountName = (fullName || businessName || name || contactName || '').trim();
    if (!accountName) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your name.'
      });
    }

    // 3. Password validation
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long.'
      });
    }

    // 4. Password confirmation check
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match.'
      });
    }

    // 5. Existing email check
    let existingUser = null;
    if (isConnected) {
      try {
        existingUser = await User.findOne({ email: normalizedEmail });
      } catch {}
    }
    if (!existingUser) {
      existingUser = memoryUsers.find(u => u.email && u.email.toLowerCase() === normalizedEmail);
    }
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'An account already exists with this email. Please Sign In / Log In.',
        isDuplicate: true
      });
    }

    // Also check seed fallback data to avoid collisions
    const seedCreator = initialCreators.find(c => c.email && c.email.toLowerCase() === normalizedEmail);
    const seedBrand = initialBrands.find(b => (b.primary_email && b.primary_email.toLowerCase() === normalizedEmail) || (b.business_email && b.business_email.toLowerCase() === normalizedEmail));
    if (seedCreator || seedBrand) {
      return res.status(409).json({
        success: false,
        error: 'An account already exists with this email. Please Sign In / Log In.',
        isDuplicate: true
      });
    }

    // 6. Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Create new User
    const userRole = role === 'brand' ? 'brand' : 'creator';
    const userId = `${userRole}-${Date.now()}`;

    const userData = {
      id: userId,
      role: userRole,
      name: accountName,
      contact_person: contactName || name || '',
      businessName: businessName || '',
      email: normalizedEmail,
      mobile: mobile ? mobile.trim() : '',
      password: hashedPassword,
      verificationStatus: 'Verified',
      email_verified: true,
      mobile_verified: true,
      avatar_url: ''
    };

    let createdUser = userData;
    if (isConnected) {
      try {
        const mongoUser = await User.create(userData);
        if (mongoUser) createdUser = mongoUser;
      } catch (err) {
        console.warn('[MongoDB Registration Warning] Fallback to memory store:', err.message);
      }
    }

    // Update memory users store
    const existingIdx = memoryUsers.findIndex(u => u.id === userId || u.email === normalizedEmail);
    if (existingIdx >= 0) {
      memoryUsers[existingIdx] = userData;
    } else {
      memoryUsers.push(userData);
    }

    const token = generateToken(userData);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. You can now sign in.',
      token,
      account: toSafeUser(createdUser)
    });
  } catch (err) {
    console.error('[Registration Error]:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to create your account right now. Please try again.'
    });
  }
});

// POST /api/auth/login - Log in existing user
router.post('/login', async (req, res) => {
  try {
    await ensureDefaultUsers();

    const { email, password } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter both email and password.'
      });
    }

    let user = null;
    if (isConnected) {
      try {
        user = await User.findOne({ email: normalizedEmail });
      } catch {}
    }
    if (!user) {
      user = memoryUsers.find(u => u.email && u.email.toLowerCase() === normalizedEmail);
    }

    // Fallback seed lookup if user not yet in MongoDB or memoryUsers
    if (!user) {
      const creatorMatch = initialCreators.find(c => c.email?.toLowerCase() === normalizedEmail);
      if (creatorMatch) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const newSeedUser = {
          id: creatorMatch.id,
          role: 'creator',
          name: creatorMatch.name,
          email: creatorMatch.email.toLowerCase(),
          mobile: creatorMatch.mobile || '310-555-0192',
          password: hashedPassword,
          verificationStatus: 'Verified',
          email_verified: true,
          mobile_verified: true,
          avatar_url: creatorMatch.avatar_url || ''
        };
        if (isConnected) {
          try {
            user = await User.create(newSeedUser);
          } catch {
            user = newSeedUser;
          }
        } else {
          user = newSeedUser;
        }
        memoryUsers.push(newSeedUser);
      } else {
        const brandMatch = initialBrands.find(b => b.primary_email?.toLowerCase() === normalizedEmail || b.business_email?.toLowerCase() === normalizedEmail);
        if (brandMatch) {
          const hashedPassword = await bcrypt.hash('password123', 10);
          const newSeedUser = {
            id: brandMatch.id,
            role: 'brand',
            name: brandMatch.name,
            contact_person: brandMatch.contact_person,
            businessName: brandMatch.name,
            email: (brandMatch.primary_email || brandMatch.business_email).toLowerCase(),
            mobile: brandMatch.phone || '+1 (415) 890-2341',
            password: hashedPassword,
            verificationStatus: 'Verified',
            email_verified: true,
            mobile_verified: true,
            avatar_url: brandMatch.logo_url || ''
          };
          if (isConnected) {
            try {
              user = await User.create(newSeedUser);
            } catch {
              user = newSeedUser;
            }
          } else {
            user = newSeedUser;
          }
          memoryUsers.push(newSeedUser);
        }
      }
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No account found with this email address.'
      });
    }

    // Password validation: bcrypt check
    let isMatch = false;
    if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Legacy plaintext password migration
      isMatch = user.password === password;
      if (isMatch) {
        user.password = await bcrypt.hash(password, 10);
        if (isConnected && typeof user.save === 'function') {
          try { await user.save(); } catch {}
        }
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password. Please try again.'
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      account: toSafeUser(user)
    });
  } catch (err) {
    console.error('[Login Error]:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred during login. Please try again.'
    });
  }
});

// GET /api/auth/me - Protected route: Return current user using token
router.get('/me', requireAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// POST /api/auth/logout - Logout endpoint
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.'
  });
});

// GET /api/auth/accounts - Development helper
router.get('/accounts', async (req, res) => {
  if (process.env.ENVIRONMENT === 'development' || !process.env.NODE_ENV) {
    try {
      await ensureDefaultUsers();
      let allUsers = null;
      if (isConnected) {
        try {
          allUsers = await User.find({}, '-password').lean();
        } catch {}
      }
      if (!allUsers || allUsers.length === 0) {
        allUsers = memoryUsers.map(toSafeUser);
      }
      return res.json({ accounts: allUsers });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.status(404).send();
});

// DELETE /api/auth/test-cleanup - Clean automated test accounts from MongoDB Atlas & memory store
router.delete('/test-cleanup', async (req, res) => {
  try {
    const testQuery = {
      $or: [
        { email: { $regex: /test\.creator/i } },
        { email: { $regex: /example\.com/i } },
        { name: 'Jordan Lee' }
      ]
    };

    let deletedCount = 0;
    if (isConnected) {
      try {
        const result = await User.deleteMany(testQuery);
        deletedCount = result.deletedCount || 0;
      } catch (dbErr) {
        console.warn('[Cleanup Warning] Failed to delete test users from MongoDB:', dbErr.message);
      }
    }

    // Clean from memoryUsers as well
    memoryUsers = memoryUsers.filter(u => 
      !/test\.creator/i.test(u.email) && 
      !/example\.com/i.test(u.email) && 
      u.name !== 'Jordan Lee'
    );

    res.json({
      success: true,
      message: 'Test accounts successfully cleaned.',
      deletedCount
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

