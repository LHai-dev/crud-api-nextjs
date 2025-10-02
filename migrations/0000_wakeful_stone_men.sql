CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fullname` text NOT NULL,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE),
	`updatedAt` text DEFAULT (CURRENT_DATE)
);
