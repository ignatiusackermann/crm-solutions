CREATE TABLE `payment_clients` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`company` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payment_installments` (
	`id` text PRIMARY KEY NOT NULL,
	`plan_id` text NOT NULL,
	`sequence` integer NOT NULL,
	`label` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`due_description` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`paypal_order_id` text,
	`paypal_capture_id` text,
	`paid_at` text,
	`created_at` text NOT NULL,
	`updated_at` text,
	FOREIGN KEY (`plan_id`) REFERENCES `payment_plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_installments_plan_sequence_unique` ON `payment_installments` (`plan_id`,`sequence`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_installments_paypal_order_unique` ON `payment_installments` (`paypal_order_id`);--> statement-breakpoint
CREATE TABLE `payment_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`reference` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`currency` text NOT NULL,
	`total_amount_cents` integer NOT NULL,
	`access_token_hash` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`client_id`) REFERENCES `payment_clients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_plans_reference_unique` ON `payment_plans` (`reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_plans_access_token_hash_unique` ON `payment_plans` (`access_token_hash`);--> statement-breakpoint
ALTER TABLE `discovery_bookings` ADD `calendar_status` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `discovery_bookings` ADD `google_event_id` text;--> statement-breakpoint
ALTER TABLE `discovery_bookings` ADD `meeting_url` text;