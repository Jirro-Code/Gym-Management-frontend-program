ALTER TABLE `exercises` MODIFY COLUMN `repetitions` int NOT NULL;--> statement-breakpoint
ALTER TABLE `exercises` MODIFY COLUMN `sets` int NOT NULL;--> statement-breakpoint
ALTER TABLE `exercises` ADD `weight` int NOT NULL;