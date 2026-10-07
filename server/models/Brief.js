import mongoose from 'mongoose';

const BriefSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  brand_id: { type: String, default: "brand-1" },
  brand_name: { type: String, required: true },
  campaign_name: { type: String, required: true },
  objective: { type: String, required: true },
  description: { type: String, default: "" },
  target_audience: { type: String, default: "" },
  content_type: { type: String, default: "AI Video" },
  creative_style: { type: String, default: "Hyper-Realistic" },
  platform: { type: String, default: "Instagram Reels / TikTok / YouTube Shorts" },
  aspect_ratio: { type: String, default: "9:16" },
  duration: { type: String, default: "20 seconds" },
  required_skills: [String],
  required_tools: [String],
  commercial_use_req: { type: String, default: "Full commercial buyout" },
  licensing_req: { type: String, default: "Perpetual commercial license" },
  budget: { type: String, default: "$3,500 - $5,000" },
  deadline: { type: String, default: "14 business days" },
  deliverables: [String],
  references: [String],
  additional_notes: { type: String, default: "" },
  status: { type: String, default: "Active" }
}, { timestamps: true });

export const Brief = mongoose.models.Brief || mongoose.model('Brief', BriefSchema);
