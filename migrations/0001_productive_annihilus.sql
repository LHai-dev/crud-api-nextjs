ALTER TABLE `users` ADD `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `first_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `phone_number` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_number_unique` ON `users` (`phone_number`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `fullname`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updatedAt`;