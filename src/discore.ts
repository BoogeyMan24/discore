import { Client, ClientOptions, IntentsBitField, PresenceStatusData } from "discord.js";
import { Options } from "./types";
import { CommandHandler } from "./commands/commandHandler";
import { EventHandler } from "./events/eventHandler";

export class DiscoreClient {
	private _client!: Client;
	private eventHandler?: EventHandler;
	private commandHandler?: CommandHandler;
	private prefix?: "string";
	private testGuild?: string[];
	private adminIds?: string[];

	constructor(options: Options) {
		this.init(options);
	}

	private init(options: Options) {
		if (!options.client)
			throw new Error("Client must be defined.");

		this._client = options.client;


		this.eventHandler = 
			options.eventsDir ? new EventHandler(this, this.client, options.eventsDir) : undefined;
		this.commandHandler = 
			options.commandsDir ? new CommandHandler(this, this.client, options.commandsDir) : undefined;
	}

	public static getDefaultClientOptions(options?: { intents?: ClientOptions["intents"], status?: PresenceStatusData }): ClientOptions {
		return {
			intents: options?.intents ?? [IntentsBitField.Flags.Guilds],
			presence: { 
				status: options?.status ?? "online"
			}
		}
	}

	get client(): Client {
		return this._client;
	}
}