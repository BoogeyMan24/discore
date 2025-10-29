import { DiscoreClient } from "../discore";
import { readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { Client } from "discord.js";
import { getRequire } from "../utilities";
import { EventCallback, EventFile, EventType } from "../types";


export class EventHandler {
	private discore: DiscoreClient;
	private client: Client;
	private eventsDir: string;
	private eventsMap: Map<EventType, EventCallback[]> = new Map();

	constructor(discore: DiscoreClient, client: Client, eventsDir: string) {
		this.discore = discore;
		this.client = client;
		this.eventsDir = eventsDir;

		this.loadEventsFromDirectory();
		this.registerEvents();
	}

	private loadEventsFromDirectory() {
		const files = readdirSync(this.eventsDir, { withFileTypes: true });

		for (const file of files) {
			if (!file.isFile()) continue;
			if (![".js", ".ts"].includes(extname(file.name))) continue;

			const absolutePath = join(this.eventsDir, file.name);
			const eventFile = getRequire()(absolutePath);
			if (!validateEventFile(file.name, eventFile))
				throw new Error(`Invalid event file at ${absolutePath}.`);


			this.addEventFile(eventFile);
		}
	}

	private addEventFile(eventFile: EventFile) {
		if (this.eventsMap.has(eventFile.event)) {
			this.eventsMap.get(eventFile.event)!.push(eventFile.callback);
		} else {
			this.eventsMap.set(eventFile.event, [eventFile.callback]);
		}
	}

	private registerEvents() {
		for (const [event, callbacks] of this.eventsMap.entries()) {

			this.client.on(event,
				(...args) => {
					console.log("Testing!!", ...args);
					callbacks.forEach((callback) => callback(this.discore, ...args))
				}
			);
		}
	}
}

function validateEventFile(filename: string, value: unknown): value is EventFile {
	const candidate = value as Partial<EventFile> | undefined;
	return typeof candidate?.event === "string" &&
		   typeof candidate?.callback === "function";
}