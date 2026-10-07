import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  name: String,
  status: String,
  due: String
}, { _id: false });

const EngagementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  brief_id: String,
  campaign_name: { type: String, required: true },
  creator_id: { type: String, required: true },
  creator_name: { type: String, required: true },
  creator_avatar: String,
  brand_id: { type: String, default: "brand-1" },
  brand_name: { type: String, required: true },
  status: { type: String, default: "In Progress" }, // Discovery, Shortlisted, Invited, Accepted, In Progress, Review, Delivered
  stage_name: { type: String, default: "Generation & Verification" },
  current_stage_index: { type: Number, default: 4 },
  deadline: { type: String, default: "14 business days" },
  deliverables: [String],
  milestones: [MilestoneSchema],
  commercial_license_status: { type: String, default: "Executed & Verified" },
  commercial_use_req: { type: String, default: "Full commercial buyout with worldwide digital ad rights" },
  total_budget: { type: String, default: "$4,500" },
  last_updated: { type: String, default: "Today" }
}, { timestamps: true });

export const Engagement = mongoose.models.Engagement || mongoose.model('Engagement', EngagementSchema);
