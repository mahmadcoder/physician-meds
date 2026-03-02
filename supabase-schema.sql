-- ================================================
-- PhysicianMeds Database Schema
-- Run this SQL in your Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query
-- ================================================

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Consultation requests
CREATE TABLE IF NOT EXISTS consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    practice_name TEXT,
    specialty TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'new'
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid()
);

-- Newsletter campaigns (admin-sent emails)
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    template_id TEXT NOT NULL,
    heading TEXT NOT NULL,
    body TEXT NOT NULL,
    cta_text TEXT,
    cta_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
    recipient_type TEXT DEFAULT 'all' CHECK (recipient_type IN ('all', 'selected')),
    recipient_ids UUID[] DEFAULT '{}',
    recipient_count INT DEFAULT 0,
    sent_count INT DEFAULT 0,
    failed_count INT DEFAULT 0,
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts (CMS)
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW(),
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL DEFAULT '',
    image TEXT,
    read_time TEXT,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT FALSE,
    content JSONB NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog comments
CREATE TABLE IF NOT EXISTS blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_slug TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_website TEXT,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- CTA Inquiries (home page tailored solution form)
CREATE TABLE IF NOT EXISTS cta_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    practice_name TEXT,
    monthly_collection TEXT,
    total_ar TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'new'
);

-- Chat sessions (chatbot conversations)
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    is_read BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'active', 'contacted', 'converted', 'closed', 'ended', 'resolved')),
    message_count INT DEFAULT 0,
    email_sent_to_client BOOLEAN DEFAULT FALSE,
    email_sent_to_team BOOLEAN DEFAULT FALSE
);

-- Chat messages (individual messages within a session)
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (blocks direct client access)
-- Our backend uses service_role key which bypasses RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_comments_slug ON blog_comments(post_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cta_inquiries_created ON cta_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started ON chat_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(unsubscribe_token);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_scheduled ON newsletter_campaigns(status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_campaigns_created ON newsletter_campaigns(created_at DESC);

-- Admin notifications (newsletter sent, user unsubscribed, etc.)
CREATE TABLE IF NOT EXISTS admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_unread ON admin_notifications(is_read, created_at DESC);

-- ================================================
-- Migration: Run these if tables already exist
-- ================================================
-- ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid();
-- UPDATE subscribers SET unsubscribe_token = gen_random_uuid() WHERE unsubscribe_token IS NULL;

-- Admin notifications (run if table doesn't exist):
-- CREATE TABLE IF NOT EXISTS admin_notifications (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     type TEXT NOT NULL,
--     title TEXT NOT NULL,
--     message TEXT,
--     created_at TIMESTAMPTZ DEFAULT NOW(),
--     is_read BOOLEAN DEFAULT FALSE
-- );
