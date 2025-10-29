import type { Client, ClientEvents } from 'discord.js';
import { DiscoreClient } from './discore';

export type Function = () => {};

export type Options = {
	client: Client;
	commandsDir?: string;
	eventsDir?: string;
	prefix?: string;
	testGuild?: string[];
	adminIds?: string[];
}


export type EventType = keyof ClientEvents
export type EventCallback<Event extends EventType = EventType> = (discore: DiscoreClient, ...args: EventType[Event]) => void;
export type EventFile<Event extends EventType = EventType> = {
	event: Event,
	callback: EventCallback<Event>;
}