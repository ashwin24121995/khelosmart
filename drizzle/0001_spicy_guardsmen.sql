CREATE TABLE `contestEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`fantasyTeamId` int NOT NULL,
	`finalPoints` decimal(10,2) DEFAULT '0',
	`finalRank` int,
	`prizeWon` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contestEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`entryFee` int NOT NULL DEFAULT 0,
	`prizePool` int NOT NULL DEFAULT 0,
	`maxParticipants` int NOT NULL DEFAULT 100,
	`currentParticipants` int NOT NULL DEFAULT 0,
	`team1Name` varchar(255),
	`team2Name` varchar(255),
	`team1Logo` text,
	`team2Logo` text,
	`matchType` varchar(20),
	`matchDateTime` timestamp,
	`venue` text,
	`seriesName` varchar(255),
	`status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fantasyTeams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`matchId` varchar(64) NOT NULL,
	`name` varchar(100) NOT NULL,
	`captainId` varchar(64) NOT NULL,
	`viceCaptainId` varchar(64) NOT NULL,
	`players` json NOT NULL,
	`totalPoints` decimal(10,2) NOT NULL DEFAULT '0',
	`rank` int,
	`status` enum('draft','submitted','locked','completed') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fantasyTeams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matchCache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(64) NOT NULL,
	`name` varchar(255),
	`matchType` varchar(20),
	`status` varchar(100),
	`matchState` varchar(20),
	`team1Name` varchar(255),
	`team2Name` varchar(255),
	`team1Logo` text,
	`team2Logo` text,
	`team1Score` varchar(100),
	`team2Score` varchar(100),
	`venue` text,
	`dateTimeGMT` timestamp,
	`seriesName` varchar(255),
	`seriesId` varchar(64),
	`fantasyEnabled` boolean DEFAULT false,
	`apiResponse` json,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `matchCache_id` PRIMARY KEY(`id`),
	CONSTRAINT `matchCache_matchId_unique` UNIQUE(`matchId`)
);
--> statement-breakpoint
CREATE TABLE `playerPoints` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(64) NOT NULL,
	`playerId` varchar(64) NOT NULL,
	`playerName` varchar(255),
	`battingPoints` decimal(10,2) DEFAULT '0',
	`bowlingPoints` decimal(10,2) DEFAULT '0',
	`fieldingPoints` decimal(10,2) DEFAULT '0',
	`totalPoints` decimal(10,2) DEFAULT '0',
	`runs` int DEFAULT 0,
	`balls` int DEFAULT 0,
	`fours` int DEFAULT 0,
	`sixes` int DEFAULT 0,
	`wickets` int DEFAULT 0,
	`overs` varchar(10),
	`runsConceded` int DEFAULT 0,
	`catches` int DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `playerPoints_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `dateOfBirth` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `isAgeVerified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `state` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `isGeoRestricted` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `totalContests` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `totalWins` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `totalPoints` int DEFAULT 0 NOT NULL;