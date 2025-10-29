import { Client } from "discord.js";
import { DiscoreClient } from "../discore";





export class CommandHandler {
	private discore: DiscoreClient;
	private commandsDir: string;
	// private eventsMap: Map<EventType, EventCallback[]> = new Map();

	constructor(discore: DiscoreClient, client: Client, commandsDir: string) {
		this.discore = discore;
		this.commandsDir = commandsDir;
	}
}