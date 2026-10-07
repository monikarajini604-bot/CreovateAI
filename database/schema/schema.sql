-- ============================================================
-- CREOVATE AI — Database Schema
-- Supabase PostgreSQL Architecture
-- Hackathon: HacXLerate 2026 (Challenge 2: AI Content Creator Marketplace)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CREATORS TABLE
CREATE TABLE IF NOT EXISTS creators (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT NOT NULL,
    headline VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    experience_years INT DEFAULT 3,
    hourly_rate INT DEFAULT 120,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    completed_projects INT DEFAULT 24,
    skills TEXT[] DEFAULT '{}',
    tools TEXT[] DEFAULT '{}',
    content_types TEXT[] DEFAULT '{}',
    styles TEXT[] DEFAULT '{}',
    workflows JSONB DEFAULT '[]'::jsonb,
    commercial_use VARCHAR(100) DEFAULT 'Commercial use available',
    licensing_terms TEXT DEFAULT 'Full perpetual commercial buyout with attribution optional',
    verification_status VARCHAR(50) DEFAULT 'Evidence provided',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PORTFOLIOS TABLE
CREATE TABLE IF NOT EXISTS portfolios (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    creator_id TEXT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    media_url TEXT NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    style VARCHAR(100) NOT NULL,
    tools_used TEXT[] DEFAULT '{}',
    workflow TEXT NOT NULL,
    output_format VARCHAR(50) NOT NULL,
    aspect_ratio VARCHAR(20) NOT NULL,
    commercial_use VARCHAR(100) NOT NULL,
    licensing VARCHAR(100) NOT NULL,
    evidence_status VARCHAR(50) NOT NULL DEFAULT 'Evidence provided', -- 'Self-declared', 'Evidence provided', 'Reviewed'
    evidence_details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROOF PASSPORTS / EVIDENCE TABLE
CREATE TABLE IF NOT EXISTS creator_evidence (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    creator_id TEXT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    claimed_skill VARCHAR(150) NOT NULL,
    tool_model VARCHAR(100) NOT NULL,
    portfolio_evidence TEXT NOT NULL,
    workflow_evidence TEXT NOT NULL,
    evidence_status VARCHAR(50) NOT NULL DEFAULT 'Evidence provided', -- 'Self-declared', 'Evidence provided', 'Reviewed'
    review_status VARCHAR(50) NOT NULL DEFAULT 'Peer Reviewed & Model Verified',
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CREATIVE BRIEFS TABLE
CREATE TABLE IF NOT EXISTS briefs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    brand_name VARCHAR(255) NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    objective TEXT NOT NULL,
    target_audience TEXT NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    creative_style VARCHAR(100) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    aspect_ratio VARCHAR(20) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    deadline VARCHAR(100) NOT NULL,
    budget VARCHAR(100) NOT NULL,
    commercial_use_req VARCHAR(150) NOT NULL,
    licensing_req VARCHAR(150) NOT NULL,
    additional_notes TEXT DEFAULT '',
    status VARCHAR(50) DEFAULT 'Active', -- 'Draft', 'Active', 'Matched', 'In Progress', 'Completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. MATCHES TABLE
CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    brief_id TEXT NOT NULL REFERENCES briefs(id) ON DELETE CASCADE,
    creator_id TEXT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    match_score INT NOT NULL,
    breakdown JSONB NOT NULL,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SHORTLISTS TABLE
CREATE TABLE IF NOT EXISTS shortlists (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    brief_id TEXT REFERENCES briefs(id) ON DELETE SET NULL,
    creator_id TEXT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(brief_id, creator_id)
);

-- 7. ENGAGEMENTS TABLE
CREATE TABLE IF NOT EXISTS engagements (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    brief_id TEXT REFERENCES briefs(id) ON DELETE SET NULL,
    campaign_name VARCHAR(255) NOT NULL,
    creator_id TEXT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Requested', -- 'Draft', 'Shortlisted', 'Requested', 'In Progress', 'Review', 'Completed'
    current_stage_index INT DEFAULT 2,
    deliverables TEXT[] DEFAULT '{}',
    milestones JSONB DEFAULT '[]'::jsonb,
    commercial_license_status VARCHAR(100) DEFAULT 'Commercial license agreement executed',
    total_budget VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for lightning-fast discovery & matching
CREATE INDEX IF NOT EXISTS idx_creators_specialization ON creators(specialization);
CREATE INDEX IF NOT EXISTS idx_creators_skills ON creators USING GIN(skills);
CREATE INDEX IF NOT EXISTS idx_creators_tools ON creators USING GIN(tools);
CREATE INDEX IF NOT EXISTS idx_portfolios_creator_id ON portfolios(creator_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_content_type ON portfolios(content_type);
CREATE INDEX IF NOT EXISTS idx_briefs_status ON briefs(status);
CREATE INDEX IF NOT EXISTS idx_engagements_creator_id ON engagements(creator_id);
CREATE INDEX IF NOT EXISTS idx_engagements_brief_id ON engagements(brief_id);
