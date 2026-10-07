import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getMemoryUsers, toSafeUser } from '../routes/authRoutes.js';
import { isConnected } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'creovate-jwt-secret-key-2026';

/**
 * Middleware to verify JWT token from Authorization header (Bearer <token>)
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. No bearer token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session token. Please log in again.'
      });
    }

    let user = null;
    const cleanId = decoded.id ? decoded.id.replace(/^creator-|^brand-/, '') : '';
    const normEmail = decoded.email ? decoded.email.toLowerCase() : '';

    if (isConnected) {
      try {
        const query = [];
        if (decoded.id) query.push({ id: decoded.id });
        if (cleanId) query.push({ id: cleanId });
        if (normEmail) query.push({ email: normEmail });
        if (query.length > 0) {
          user = await User.findOne({ $or: query });
        }
      } catch {}
    }
    if (!user) {
      const memoryList = getMemoryUsers();
      user = memoryList.find(u => 
        (decoded.id && u.id === decoded.id) ||
        (cleanId && (u.id === cleanId || u.id === `creator-${cleanId}` || u.id === `brand-${cleanId}`)) ||
        (normEmail && u.email && u.email.toLowerCase() === normEmail)
      );
    }


    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User account not found.'
      });
    }

    req.user = toSafeUser(user);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Authentication verification failed.'
    });
  }
}

/**
 * Middleware to enforce role-based access
 * e.g. requireRole('brand') or requireRole('creator', 'admin')
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Requires one of roles: [${allowedRoles.join(', ')}]`
      });
    }
    next();
  };
}
