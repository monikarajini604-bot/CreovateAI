import express from 'express';
import { Conversation } from '../models/Conversation.js';
import { initialConversations } from '../data/brandSeedData.js';
import { isConnected } from '../config/db.js';

const router = express.Router();

let memoryConversations = [...initialConversations];

export const getMemoryConversations = () => memoryConversations;
export const setMemoryConversations = (data) => { memoryConversations = data; };

// GET /api/messages/conversations - list all private conversations
router.get('/conversations', async (req, res) => {
  try {
    let conversations = memoryConversations;
    if (isConnected) {
      try {
        const dbConv = await Conversation.find().lean();
        if (dbConv && dbConv.length > 0) conversations = dbConv;
      } catch {
        conversations = memoryConversations;
      }
    }

    res.json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/messages/conversations/:id - get single conversation thread
router.get('/conversations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let conv = null;

    if (isConnected) {
      try {
        conv = await Conversation.findOne({ id }).lean();
      } catch {}
    }

    if (!conv) {
      conv = memoryConversations.find(c => c.id === id);
    }

    if (!conv) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    res.json({
      success: true,
      conversation: conv
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/messages/conversations - initiate or find conversation between brand & creator
router.post('/conversations', async (req, res) => {
  try {
    const { 
      brand_id, 
      brand_name, 
      brand_logo, 
      creator_id, 
      creator_name, 
      creator_avatar,
      campaign_name = 'Direct Platform Collaboration'
    } = req.body;

    let existing = memoryConversations.find(
      c => c.brand_id === brand_id && c.creator_id === creator_id
    );

    if (existing) {
      return res.json({ success: true, conversation: existing, is_new: false });
    }

    const newId = `conv-${brand_id.replace('brand-', '')}-${creator_id.replace('creator-', '')}-${Date.now()}`;
    const newConv = {
      id: newId,
      brand_id,
      brand_name: brand_name || 'Brand Partner',
      brand_logo: brand_logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=400&q=80',
      brand_verified: true,
      creator_id,
      creator_name: creator_name || 'AI Creator',
      creator_avatar: creator_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      creator_verified: true,
      campaign_name,
      last_message: 'Private conversation opened.',
      last_message_time: 'Just now',
      last_message_timestamp: new Date().toISOString(),
      unread_count_brand: 0,
      unread_count_creator: 0,
      messages: [],
      created_at: new Date().toISOString()
    };

    memoryConversations.unshift(newConv);

    if (isConnected) {
      try {
        await Conversation.create(newConv);
      } catch {}
    }

    res.json({
      success: true,
      conversation: newConv,
      is_new: true
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/messages/send - send a message in a conversation
router.post('/send', async (req, res) => {
  try {
    const { 
      conversation_id, 
      sender_id, 
      sender_role, 
      sender_name, 
      text 
    } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Message text cannot be empty' });
    }

    const convIndex = memoryConversations.findIndex(c => c.id === conversation_id);
    if (convIndex === -1) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    const conv = memoryConversations[convIndex];
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender_id,
      sender_role: sender_role || 'brand',
      sender_name: sender_name || (sender_role === 'creator' ? conv.creator_name : conv.brand_name),
      text: text.trim(),
      timestamp: timeFormatted,
      created_at: now.toISOString(),
      status: 'delivered'
    };

    conv.messages.push(newMsg);
    conv.last_message = text.trim();
    conv.last_message_time = 'Just now';
    conv.last_message_timestamp = now.toISOString();

    if (sender_role === 'brand') {
      conv.unread_count_creator = (conv.unread_count_creator || 0) + 1;
    } else {
      conv.unread_count_brand = (conv.unread_count_brand || 0) + 1;
    }

    // Move to top of conversations list
    memoryConversations.splice(convIndex, 1);
    memoryConversations.unshift(conv);

    if (isConnected) {
      try {
        await Conversation.findOneAndUpdate(
          { id: conversation_id },
          {
            $push: { messages: newMsg },
            $set: {
              last_message: conv.last_message,
              last_message_time: conv.last_message_time,
              last_message_timestamp: conv.last_message_timestamp,
              unread_count_brand: conv.unread_count_brand,
              unread_count_creator: conv.unread_count_creator,
              updated_at: now
            }
          }
        );
      } catch {}
    }

    res.json({
      success: true,
      message: newMsg,
      conversation: conv
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/messages/conversations/:id/read - mark conversation as read
router.put('/conversations/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const { userRole = 'brand' } = req.body;

    const conv = memoryConversations.find(c => c.id === id);
    if (!conv) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    if (userRole === 'brand') {
      conv.unread_count_brand = 0;
    } else {
      conv.unread_count_creator = 0;
    }

    // Mark messages as read
    conv.messages.forEach(m => {
      if (m.sender_role !== userRole) {
        m.status = 'read';
      }
    });

    if (isConnected) {
      try {
        const updateField = userRole === 'brand' ? { unread_count_brand: 0 } : { unread_count_creator: 0 };
        await Conversation.findOneAndUpdate({ id }, { $set: updateField });
      } catch {}
    }

    res.json({
      success: true,
      conversation: conv
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/messages/conversations/:id/messages - clear all messages from a conversation
router.delete('/conversations/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const conv = memoryConversations.find(c => c.id === id);
    if (!conv) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    conv.messages = [];
    conv.last_message = '';
    conv.last_message_time = '';
    conv.unread_count_brand = 0;
    conv.unread_count_creator = 0;

    if (isConnected) {
      try {
        await Conversation.findOneAndUpdate(
          { id },
          {
            $set: {
              messages: [],
              last_message: '',
              last_message_time: '',
              unread_count_brand: 0,
              unread_count_creator: 0
            }
          }
        );
      } catch {}
    }

    res.json({ success: true, conversation: conv });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/messages/conversations/:id - delete an entire conversation thread permanently
router.delete('/conversations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    memoryConversations = memoryConversations.filter(c => c.id !== id);

    if (isConnected) {
      try {
        await Conversation.deleteOne({ id });
      } catch {}
    }

    res.json({ success: true, message: 'Conversation deleted successfully', id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
