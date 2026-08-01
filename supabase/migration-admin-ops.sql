-- Run once in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS voice_call_log (
  id text PRIMARY KEY NOT NULL,
  occurred_at text NOT NULL,
  channel text DEFAULT 'phone' NOT NULL,
  direction text DEFAULT 'inbound' NOT NULL,
  outcome text DEFAULT 'answered' NOT NULL,
  contact_name text,
  phone text,
  email text,
  company text,
  summary text NOT NULL,
  notes text,
  source text DEFAULT 'admin' NOT NULL,
  created_at text NOT NULL,
  updated_at text
);

CREATE INDEX IF NOT EXISTS voice_call_log_occurred_at_idx
  ON voice_call_log (occurred_at DESC);

CREATE INDEX IF NOT EXISTS voice_call_log_outcome_idx
  ON voice_call_log (outcome);

CREATE TABLE IF NOT EXISTS audit_results (
  id text PRIMARY KEY NOT NULL,
  email text NOT NULL,
  overall integer NOT NULL,
  band_title text,
  band_copy text,
  summary text NOT NULL,
  priorities_json text,
  source text DEFAULT 'website' NOT NULL,
  created_at text NOT NULL
);

CREATE INDEX IF NOT EXISTS audit_results_created_at_idx
  ON audit_results (created_at DESC);

CREATE INDEX IF NOT EXISTS audit_results_email_idx
  ON audit_results (email);
