import * as fs from "fs";
import { AdminServer } from "./AdminServer";
import { IServerConfiguration } from "./services/shared/interfaces/IServerConfiguration";
import * as bunyan from "bunyan";
import { MCServer } from "./services/MCServer/MCServer";

export class Server {
  public config: IServerConfiguration;
  public logger: bunyan;
  public mcServer!: MCServer;
  public adminServer!: AdminServer;

  public constructor(config: IServerConfiguration) {
    this.logger = bunyan
      .createLogger({ name: "mcoServer" })
      .child({ module: "server" });
    this.config = config;

    this.start();
  }

  private async start() {
    this.logger.info("Starting servers...");

    // Start the MC Server
    this.mcServer = new MCServer();
    this.mcServer.startServers(this.config);

    // Start the Admin server
    this.adminServer = new AdminServer(this.mcServer);
    this.adminServer.start(this.config.serverConfig);
    this.logger.info("[adminServer] Web Server started");

    this.logger.info("Servers started, ready for connections.");
  }
}
