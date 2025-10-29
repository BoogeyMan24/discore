import { Events } from "discord.js";
import { DiscoreClient } from "../discore";








export class EventHandler {
	private discore: DiscoreClient;
	private eventsDir: string;
	private eventsData: ;

	constructor(discore: DiscoreClient, eventsDir: string) {
		this.discore = discore;
		this.eventsDir = eventsDir;

		this.loadEventsFromDirectory();
	}

	private loadEventsFromDirectory() {
		
	}
}