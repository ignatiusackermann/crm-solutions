CREATE TABLE `discovery_bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`start_utc` text NOT NULL,
	`end_utc` text NOT NULL,
	`booking_date_sa` text NOT NULL,
	`booking_time_sa` text NOT NULL,
	`visitor_timezone` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`company` text NOT NULL,
	`website` text,
	`role` text,
	`message` text NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`email_status` text DEFAULT 'pending' NOT NULL,
	`client_email_id` text,
	`admin_email_id` text,
	`reminder_email_id` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `discovery_bookings_start_utc_unique` ON `discovery_bookings` (`start_utc`);