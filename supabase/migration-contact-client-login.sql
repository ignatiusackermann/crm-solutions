-- Run once in Supabase → SQL Editor if tables already exist

ALTER TABLE payment_plans
  ADD COLUMN IF NOT EXISTS access_code_hash text;

CREATE TABLE IF NOT EXISTS contact_submissions (
  id text PRIMARY KEY NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  source text DEFAULT 'website' NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  created_at text NOT NULL
);
