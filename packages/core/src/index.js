// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017-2021>  <Drazi Crendraven>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const { pino: P } = require("pino");
const { ConnectionManager } = require("./connection-mgr.js");
const { getConfig } = require("../../config/src/index.js");
const { ListenerThread } = require("./listener-thread.js");

const log = P().child({ service: "mcos:MCServer" });
log.level = process.env["LOG_LEVEL"] || "info";

/**
 * This class starts all the servers
 */

class MCServer {
  /** @type {MCServer} */
  static _instance;
  /** @type {import("../../config/src/index").AppConfiguration} */
  config;
  /**
   * @private
   * @type {ConnectionManager | undefined}
   */
  mgr;

  /** @return {Promise<MCServer>} */
  static async getInstance() {
    if (!MCServer._instance) {
      MCServer._instance = new MCServer();
    }
    log.debug("Starting Connection manager");
    MCServer._instance.mgr = await ConnectionManager.getInstance();
    return MCServer._instance;
  }

  /** @private */
  constructor() {
    this.config = getConfig();
  }

  clearConnectionQueue() {
    if (this.mgr === undefined) {
      throw new Error("Connection manager not set");
    }
    this.mgr.resetAllQueueState();
  }

  /** @returns {import("./tcpConnection").TCPConnection[]} */
  getConnections() {
    if (this.mgr === undefined) {
      throw new Error("Connection manager is not set");
    }
    return this.mgr.dumpConnections();
  }

  /**
   * Start the HTTP, HTTPS and TCP connection listeners
   * @returns {Promise<void>}
   */

  async startServers() {
    const listenerThread = ListenerThread.getInstance();
    log.info({}, "Starting the listening sockets...");
    // TODO: Seperate the PersonaServer ports of 8226 and 8228
    const tcpPortList = [
      6660, 8228, 8226, 7003, 8227, 43_200, 43_300, 43_400, 53_303, 9000, 9001,
      9002, 9003, 9004, 9005, 9006, 9007, 9008, 9009, 9010, 9011, 9012, 9013,
      9014,
    ];

    if (this.mgr === undefined) {
      throw new Error("Connection manager is not set");
    }

    for (const port of tcpPortList) {
      listenerThread.startTCPListener(port, this.mgr);
      log.info(`port ${port} listening`);
    }

    log.info("Listening sockets create successfully.");
  }
}
module.exports = { MCServer };
