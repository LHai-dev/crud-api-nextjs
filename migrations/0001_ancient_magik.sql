ALTER TABLE `users` ADD `created_at` integer DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL;