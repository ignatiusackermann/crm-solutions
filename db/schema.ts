import {
  integer,
  pgTable,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const discoveryBookings = pgTable(
  "discovery_bookings",
  {
    id: text("id").primaryKey(),
    startUtc: text("start_utc").notNull(),
    endUtc: text("end_utc").notNull(),
    bookingDateSa: text("booking_date_sa").notNull(),
    bookingTimeSa: text("booking_time_sa").notNull(),
    visitorTimezone: text("visitor_timezone").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    company: text("company").notNull(),
    website: text("website"),
    role: text("role"),
    message: text("message").notNull(),
    source: text("source").default("website").notNull(),
    status: text("status").default("confirmed").notNull(),
    emailStatus: text("email_status").default("pending").notNull(),
    clientEmailId: text("client_email_id"),
    adminEmailId: text("admin_email_id"),
    reminderEmailId: text("reminder_email_id"),
    calendarStatus: text("calendar_status").default("pending").notNull(),
    googleEventId: text("google_event_id"),
    meetingUrl: text("meeting_url"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    uniqueIndex("discovery_bookings_start_utc_unique").on(table.startUtc),
  ],
);

export const paymentClients = pgTable("payment_clients", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  createdAt: text("created_at").notNull(),
});

export const paymentPlans = pgTable(
  "payment_plans",
  {
    id: text("id").primaryKey(),
    clientId: text("client_id")
      .notNull()
      .references(() => paymentClients.id),
    reference: text("reference").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    currency: text("currency").notNull(),
    totalAmountCents: integer("total_amount_cents").notNull(),
    accessTokenHash: text("access_token_hash").notNull(),
    status: text("status").default("active").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    uniqueIndex("payment_plans_reference_unique").on(table.reference),
    uniqueIndex("payment_plans_access_token_hash_unique").on(
      table.accessTokenHash,
    ),
  ],
);

export const paymentInstallments = pgTable(
  "payment_installments",
  {
    id: text("id").primaryKey(),
    planId: text("plan_id")
      .notNull()
      .references(() => paymentPlans.id),
    sequence: integer("sequence").notNull(),
    label: text("label").notNull(),
    amountCents: integer("amount_cents").notNull(),
    dueDescription: text("due_description").notNull(),
    status: text("status").default("pending").notNull(),
    paypalOrderId: text("paypal_order_id"),
    paypalCaptureId: text("paypal_capture_id"),
    paidAt: text("paid_at"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at"),
  },
  (table) => [
    uniqueIndex("payment_installments_plan_sequence_unique").on(
      table.planId,
      table.sequence,
    ),
    uniqueIndex("payment_installments_paypal_order_unique").on(
      table.paypalOrderId,
    ),
  ],
);
