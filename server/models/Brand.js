import mongoose from 'mongoose';

const ContactPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true }
}, { _id: false });

const ContactInfoSchema = new mongoose.Schema({
  business_email: { type: String, required: true },
  email_verified: { type: Boolean, default: true },
  business_phone: { type: String, required: true },
  phone_country_code: { type: String, default: '+1' },
  phone_verified: { type: Boolean, default: true },
  contact_person: ContactPersonSchema,
  contact_preference: { type: String, default: 'Platform Chat' } // 'Platform Chat' | 'Email' | 'Phone' | 'All'
}, { _id: false });

const HiringRequirementsSchema = new mongoose.Schema({
  preferred_content_types: [String],
  preferred_tools: [String],
  preferred_skills: [String]
}, { _id: false });

const VerificationStatusSchema = new mongoose.Schema({
  is_verified: { type: Boolean, default: true },
  badge_type: { type: String, default: 'Verified Brand' }, // 'Verified Brand' | 'Verified Agency'
  email_verified: { type: Boolean, default: true },
  phone_verified: { type: Boolean, default: true },
  identity_verified: { type: Boolean, default: true },
  website_verified: { type: Boolean, default: true },
  business_profile_verified: { type: Boolean, default: true },
  contact_person_verified: { type: Boolean, default: true },
  verified_date: { type: String, default: 'March 2026' }
}, { _id: false });

const BrandSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  handle: { type: String, required: true },
  logo_url: { type: String, required: true },
  company_type: { 
    type: String, 
    default: 'Brand',
    enum: [
      'Brand',
      'Creative Agency',
      'Advertising Agency',
      'Production Company',
      'Startup',
      'Marketing Agency',
      'Entertainment Company',
      'Other'
    ]
  },
  tagline: { type: String, required: true },
  about: { type: String, required: true },
  industries: [String],
  services: [String],
  location: { type: String, default: 'San Francisco, CA' },
  country: { type: String, default: 'United States' },
  company_size: { type: String, default: '51-200' },
  founded_year: { type: Number, default: 2021 },
  website: { type: String, default: 'https://example.com' },
  social_links: {
    linkedin: String,
    twitter: String,
    instagram: String
  },
  hiring_requirements: HiringRequirementsSchema,
  contact_info: ContactInfoSchema,
  verification_status: VerificationStatusSchema,
  completed_projects_count: { type: Number, default: 0 },
  active_brief_ids: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const Brand = mongoose.model('Brand', BrandSchema);
