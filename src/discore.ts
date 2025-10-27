import { Client, ClientOptions, IntentsBitField, PresenceStatusData } from "discord.js";
import { Options } from "./types";

export class DiscoreClient {
	private client!: Client;

	constructor(options: Options) {
		this.init(options);
	}

	init(options: Options) {
		if (!options.client) {
			throw new Error("Client must be defined.");
		}

		this.client = options.client;

		console.log("test");
	}

	public static getDefaultClientOptions(options?: { intents?: ClientOptions["intents"], status?: PresenceStatusData }): ClientOptions {
		return {
			intents: options?.intents ?? [IntentsBitField.Flags.Guilds],
			presence: { 
				status: options?.status ?? "online"
			}
		}
	}
}