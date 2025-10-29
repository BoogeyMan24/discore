import type { Client } from 'discord.js';

export type Options = {
	client: Client;
	commandsDir?: "string";
	eventsDir?: "string";
	prefix?: "string";
	testGuild?: string[];
	adminIds?: string[];
}