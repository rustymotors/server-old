import { Socket, createServer as createSocketServer } from "node:net";
import FastifySensible from "@fastify/sensible";
import fastify from "fastify";
import { ConsoleThread } from "rusty-motors-cli";
import { receiveLobbyData } from "rusty-motors-lobby";
import { receiveLoginData } from "rusty-motors-login";
import { receivePersonaData } from "rusty-motors-personas";
import {
	Configuration,
	getServerConfiguration,
	type ServerLogger,
	type State,
} from "rusty-motors-shared";
import {
	addOnDataHandler,
	createInitialState,
	fetchStateFromDatabase,
} from "rusty-motors-shared";
import { getServerLogger } from "rusty-motors-shared";
import { receiveTransactionsData } from "rusty-motors-transactions";
import { onSocketConnection } from "./index.js";
import { addWebRoutes } from "./web.js";
import {
	populateGameMessageProcessors,
	populatePortToMessageTypes,
	portToMessageTypes,
	gameMessageProcessors,
} from "rusty-motors-nps";
import { receiveChatData } from "rusty-motors-chat";
import type { GatewayOptions } from "./types.js";
import { addPortRouter } from "./portRouters.js";
import { npsPortRouter } from "./npsPortRouter.js";
import { mcotsPortRouter } from "./mcotsPortRouter.js";

/**
 * Gateway server
 * @see {@link getGatewayServer()} to get a singleton instance
 */
export class Gateway {
	config: Configuration;
	log: ServerLogger;
	timer: NodeJS.Timeout | null;
	loopInterval: number;
	status: string;
	consoleEvents: string[];
	backlogAllowedCount: number;
	listeningPortList: number[];
	activeServers: import("node:net").Server[];
	socketconnection: ({
		incomingSocket,
		log,
	}: {
		incomingSocket: Socket;
		log?: ServerLogger;
	}) => void;
	static _instance: Gateway | undefined;
	webServer: import("fastify").FastifyInstance | undefined;
	readThread: ConsoleThread | undefined;
	/**
	 * Creates an instance of GatewayServer.
	 * @param {GatewayOptions} options
	 */
	constructor({
		config = getServerConfiguration({}),
		log = getServerLogger({
			name: "GatewayServer",
		}),
		backlogAllowedCount = 0,
		listeningPortList = [],
		socketConnectionHandler = onSocketConnection,
	}: GatewayOptions) {
		log.debug("Creating GatewayServer instance");

		this.config = config;
		this.log = log;
		/** @type {NodeJS.Timeout | null} */
		this.timer = null;
		this.loopInterval = 0;
		/** @type {"stopped" | "running" | "stopping" | "restarting"} */
		this.status = "stopped";
		this.consoleEvents = ["userExit", "userRestart", "userHelp"];
		this.backlogAllowedCount = backlogAllowedCount;
		this.listeningPortList = listeningPortList;
		/** @type {import("node:net").Server[]} */
		this.activeServers = [];
		this.socketconnection = socketConnectionHandler;

		Gateway._instance = this;
	}

	start() {
		this.log.debug("Starting GatewayServer in start()");
		this.log.info("Server starting");

		// Check if there are any listening ports specified
		this.ensureListeningPortsSpecified();

		// Mark the GatewayServer as running
		this.log.debug("Marking GatewayServer as running");
		this.status = "running";

		// Initialize the GatewayServer
		this.init();

		this.listeningPortList.forEach(async (port) => {
			this.startNewServer(port);
		});

		this.startWebServer();
	}

	private startWebServer() {
		if (this.webServer === undefined) {
			throw Error("webServer is undefined");
		}

		// Start the web server
		addWebRoutes(this.webServer);

		this.webServer.listen(
			{
				host: "0.0.0.0",
				port: 3000,
			},
			(err, address) => {
				if (err) {
					this.log.fatal((err as Error).message);
					process.exit(1);
				}
				this.log.info(`Server listening at ${address}`);
			},
		);
	}

	private ensureListeningPortsSpecified() {
		if (this.listeningPortList.length === 0) {
			throw Error("No listening ports specified");
		}
	}

	private startNewServer(port: number) {
		const server = createSocketServer((s) => {
			this.socketconnection({
				incomingSocket: s,
				log: this.log,
			});
		});

		// Listen on the specified port
		server.listen(port, "0.0.0.0", this.backlogAllowedCount, () => {
			this.log.debug(`Listening on port ${port}`);
		});

		// Add the server to the list of servers
		this.activeServers.push(server);
	}

	async restart() {
		// Stop the GatewayServer
		await this.stop();

		console.log("=== Restarting... ===");

		// Start the GatewayServer
		this.start();
	}

	async exit() {
		// Stop the GatewayServer
		await this.stop();

		// Exit the process
		process.exit(0);
	}

	async stop() {
		// Mark the GatewayServer as stopping
		this.log.debug("Marking GatewayServer as stopping");
		this.status = "stopping";

		// Stop the servers
		await this.shutdownServers();

		// Stop the timer
		if (this.timer !== null) {
			clearInterval(this.timer);
		}

		// Mark the GatewayServer as stopped
		this.log.debug("Marking GatewayServer as stopped");
		this.status = "stopped";

		// Reset the global state
		this.log.debug("Resetting the global state");
		createInitialState({}).save();
	}

	private async shutdownServers() {
		this.activeServers.forEach((server) => {
			server.close();
		});

		// Stop the read thread
		if (this.readThread !== undefined) {
			this.readThread.stop();
		}

		if (this.webServer === undefined) {
			throw Error("webServer is undefined");
		}
		await this.webServer.close();
	}

	/**
	 * @param {string} event
	 */
	handleReadThreadEvent(event: string) {
		if (event === "userExit") {
			this.exit();
		}
		if (event === "userRestart") {
			this.restart();
		}
		if (event === "userHelp") {
			this.help();
		}
	}

	init() {
		// Create the read thread
		this.readThread = new ConsoleThread({
			parentThread: this,
			log: this.log,
		});

		// Register the read thread events
		if (this.readThread === undefined) {
			throw Error("readThread is undefined");
		}
		this.consoleEvents.forEach((event) => {
			this.readThread?.on(event, () => {
				this.handleReadThreadEvent(event);
			});
		});

		this.webServer = fastify({});
		this.webServer.register(FastifySensible);

		addPortRouter(8226, npsPortRouter);
		addPortRouter(8227, npsPortRouter);
		addPortRouter(8228, npsPortRouter);
		addPortRouter(7003, npsPortRouter);
		addPortRouter(43300, mcotsPortRouter);

		this.log.debug("GatewayServer initialized");
	}

	help() {
		console.log("=== Help ===");
		console.log("x: Exit");
		console.log("r: Restart");
		console.log("?: Help");
		console.log("============");
	}
	run() {
		// Intentionally left blank
	}

	/**
	 *
	 * @param {GatewayOptions} options
	 * @returns {Gateway}
	 * @memberof Gateway
	 */
	static getInstance({
		config = undefined,
		log = getServerLogger({
			name: "GatewayServer",
		}),
		backlogAllowedCount = 0,
		listeningPortList = [],
		socketConnectionHandler = onSocketConnection,
	}: GatewayOptions): Gateway {
		if (Gateway._instance === undefined) {
			Gateway._instance = new Gateway({
				config,
				log,
				backlogAllowedCount,
				listeningPortList,
				socketConnectionHandler,
			});
		}
		return Gateway._instance;
	}

	shutdown() {
		this.log.debug("Shutdown complete for GatewayServer");
		this.status = "stopped";
		this.log.info("Server stopped");

		process.exit(0);
	}
}

/** @type {Gateway | undefined} */
Gateway._instance = undefined;

/**
 * Registers various data handlers to the provided state.
 *
 * This function adds handlers for different types of data, such as login data,
 * chat data, persona data, lobby data, and transaction data. Each handler is
 * associated with a specific code.
 *
 * @param state - The initial state to which the data handlers will be added.
 * @returns The updated state with all the data handlers registered.
 */
function registerDataHandlers(state: State) {
	state = addOnDataHandler(state, 8226, receiveLoginData);
	state = addOnDataHandler(state, 8227, receiveChatData);
	state = addOnDataHandler(state, 8228, receivePersonaData);
	state = addOnDataHandler(state, 7003, receiveLobbyData);
	state = addOnDataHandler(state, 9000, receiveChatData);
	state = addOnDataHandler(state, 43300, receiveTransactionsData);
	return state;
}

/**
 * Get a singleton instance of GatewayServer
 *
 * @param {GatewayOptions} options
 * @returns {Gateway}
 */
export function getGatewayServer({
	config,
	log = getServerLogger({
		name: "GatewayServer",
	}),
	backlogAllowedCount = 0,
	listeningPortList: listeningPortList = [],
	socketConnectionHandler = onSocketConnection,
}: {
	config?: Configuration;
	log?: ServerLogger;
	backlogAllowedCount?: number;
	listeningPortList?: number[];
	socketConnectionHandler?: ({
		incomingSocket,
		log,
	}: {
		incomingSocket: Socket;
		log?: ServerLogger;
	}) => void;
}): Gateway {
	return Gateway.getInstance({
		config,
		log,
		backlogAllowedCount,
		listeningPortList,
		socketConnectionHandler,
	});
}
