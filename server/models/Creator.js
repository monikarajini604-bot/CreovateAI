import mongoose from 'mongoose';

const EvidenceSchema = new mongoose.Schema({
  id: String,
  claimed_skill: String,
  tool_model: String,
  portfolio_evidence: String,
  workflow_evidence: String,
  evidence_status: String,
  review_status: String,
  verified_at: String
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
  id: String,
  creator_id: String,
  creator_name: String,
  title: String,
  description: String,
  thumbnail_url: String,
  media_url: String,
  content_type: String,
  style: String,
  tools_used: [String],
  models: [String],
  skills: [String],
  workflow: String,
  output_format: String,
  aspect_ratio: String,
  commercial_use: String,
  licensing: String,
  evidence_status: String,
  evidence_details: mongoose.Schema.Types.Mixed,
  date: String,
  created_at: String
}, { _id: false });

const WorkflowStageSchema = new mongoose.Schema({
  step_number: Number,
  name: String,
  description: String,
  tools: [String]
}, { _id: false });

const CreatorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: true },
  headline: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, default: "Los Angeles, CA" },
  specialization: { type: String, required: true },
  skills: [String],
  tools: [String],
  models: [String],
  content_types: [String],
  styles: [String],
  availability: { type: String, default: "Available Now" },
  workflows: [WorkflowStageSchema],
  commercial_use: { type: String, default: "Commercial Use Available" },
  licensing_terms: { type: String, default: "Full commercial buyout" },
  verification_status: { type: String, default: "Verified" },
  verification_badges: [String],
  experience_years: { type: Number, default: 3 },
  hourly_rate: { type: Number, default: 120 },
  rating: { type: Number, default: 4.9 },
  completed_projects: { type: Number, default: 25 },
  evidence_passport: [EvidenceSchema],
  portfolio: [PortfolioSchema]
}, { timestamps: true });

export const Creator = mongoose.models.Creator || mongoose.model('Creator', CreatorSchema);
