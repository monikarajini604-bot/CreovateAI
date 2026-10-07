import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sender_id: { type: String, required: true },
  sender_role: { type: String, required: true, enum: ['brand', 'creator'] },
  sender_name: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: String, required: true },
  created_at: { type: String, default: () => new Date().toISOString() },
  status: { type: String, default: 'sent', enum: ['sent', 'delivered', 'read'] }
}, { _id: false });

const ConversationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  brand_id: { type: String, required: true },
  brand_name: { type: String, required: true },
  brand_logo: { type: String, required: true },
  brand_verified: { type: Boolean, default: true },
  creator_id: { type: String, required: true },
  creator_name: { type: String, required: true },
  creator_avatar: { type: String, required: true },
  creator_verified: { type: Boolean, default: true },
  engagement_id: { type: String },
  campaign_name: { type: String },
  last_message: { type: String },
  last_message_time: { type: String },
  last_message_timestamp: { type: String },
  unread_count_brand: { type: Number, default: 0 },
  unread_count_creator: { type: Number, default: 0 },
  messages: [MessageSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const Conversation = mongoose.model('Conversation', ConversationSchema);
