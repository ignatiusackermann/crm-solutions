-- Run this once in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS discovery_bookings (
  id text PRIMARY KEY NOT NULL,
  start_utc text NOT NULL,
  end_utc text NOT NULL,
  booking_date_sa text NOT NULL,
  booking_time_sa text NOT NULL,
  visitor_timezone text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text NOT NULL,
  website text,
  role text,
  message text NOT NULL,
  source text DEFAULT 'website' NOT NULL,
  status text DEFAULT 'confirmed' NOT NULL,
  email_status text DEFAULT 'pending' NOT NULL,
  client_email_id text,
  admin_email_id text,
  reminder_email_id text,
  calendar_status text DEFAULT 'pending' NOT NULL,
  google_event_id text,
  meeting_url text,
  created_at text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS discovery_bookings_start_utc_unique
  ON discovery_bookings (start_utc);

CREATE TABLE IF NOT EXISTS payment_clients (
  id text PRIMARY KEY NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_plans (
  id text PRIMARY KEY NOT NULL,
  client_id text NOT NULL REFERENCES payment_clients(id),
  reference text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  currency text NOT NULL,
  total_amount_cents integer NOT NULL,
  access_token_hash text NOT NULL,
  access_code_hash text,
  status text DEFAULT 'active' NOT NULL,
  created_at text NOT NULL
);

-- Safe to re-run if the table already existed without this column
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

CREATE UNIQUE INDEX IF NOT EXISTS payment_plans_reference_unique
  ON payment_plans (reference);

CREATE UNIQUE INDEX IF NOT EXISTS payment_plans_access_token_hash_unique
  ON payment_plans (access_token_hash);

CREATE TABLE IF NOT EXISTS payment_installments (
  id text PRIMARY KEY NOT NULL,
  plan_id text NOT NULL REFERENCES payment_plans(id),
  sequence integer NOT NULL,
  label text NOT NULL,
  amount_cents integer NOT NULL,
  due_description text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  paypal_order_id text,
  paypal_capture_id text,
  paid_at text,
  created_at text NOT NULL,
  updated_at text
);

CREATE UNIQUE INDEX IF NOT EXISTS payment_installments_plan_sequence_unique
  ON payment_installments (plan_id, sequence);

CREATE UNIQUE INDEX IF NOT EXISTS payment_installments_paypal_order_unique
  ON payment_installments (paypal_order_id);

CREATE TABLE IF NOT EXISTS site_reviews (
  id text PRIMARY KEY NOT NULL,
  reviewer_name text,
  relationship text,
  email text,
  rating_first_impression integer NOT NULL,
  rating_content integer NOT NULL,
  rating_usability integer NOT NULL,
  unclear text,
  broken text,
  calculator text,
  would_contact text,
  source text DEFAULT 'website' NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  created_at text NOT NULL
);
