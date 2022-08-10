// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { logger } from "mcos-logger/src/index.js";
import type { SocketWithConnectionInfo } from "mcos-types";
import type {
    IncomingMessage,
    OutgoingHttpHeader,
    OutgoingHttpHeaders,
} from "node:http";
import { getAllConnections } from "./index.js";

const log = logger.child({ service: "mcos:gateway:admin" });

// https://careerkarma.com/blog/converting-circular-structure-to-json/
function replacerFunc(): // eslint-disable-next-line @typescript-eslint/no-explicit-any
((this: any, key: string, value: any) => any) | undefined {
    const visited = new WeakSet();
    return (_key: string, value: object) => {
        if (typeof value === "object" && value !== null) {
            if (visited.has(value)) {
                return;
            }
            visited.add(value);
        }
        return value;
    };
}

/**
 * Please use {@link AdminServer.getAdminServer()}
 * @classdesc
 * @property {config} config
 * @property {IMCServer} mcServer
 * @property {Server} httpServer
 */
export class AdminServer {
    /**
     *
     *
     * @private
     * @static
     * @type {AdminServer}
     * @memberof AdminServer
     */
    static _instance: AdminServer;

    /**
     * Get the single instance of the class
     *
     * @static
     * @return {AdminServer}
     * @memberof AdminServer
     */
    static getAdminServer(): AdminServer {
        if (typeof AdminServer._instance === "undefined") {
            AdminServer._instance = new AdminServer();
        }
        return AdminServer._instance;
    }

    /**
     * Creates an instance of AdminServer.
     *
     * Please use {@link AdminServer.getInstance()} instead
     * @internal
     * @memberof AdminServer
     */

    /**
     * Handle incomming http requests
     *
     * @return {ServerResponse}
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     */
    handleRequest(request: IncomingMessage): {
        code: number;
        headers:
            | OutgoingHttpHeaders
            | OutgoingHttpHeader[]
            | undefined
            | undefined;
        body: string;
    } {
        log.info(
            `[Admin] Request from ${request.socket.remoteAddress} for ${request.method} ${request.url}`
        );
        log.info(
            `Request received,
      ${JSON.stringify({
          url: request.url,
          remoteAddress: request.socket.remoteAddress,
      })}`
        );

        if (typeof request.url === "undefined") {
            return { code: 404, headers: {}, body: "" };
        }

        const connections = getAllConnections();

        if (
            request.url.startsWith("/admin/connections/releaseQueue") === true
        ) {
            const connectionId = new URL(
                request.url,
                `http://${request.headers.host}`
            ).searchParams.get("id");
            if (connectionId === null) {
                return {
                    code: 400,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: "missing connection id" }),
                };
            }
            return releaseQueue(connections, connectionId);
        }
        if (request.url === "/admin/connections/resetQueue") {
            // We only use the code here, the body is used for testing
            const { code } = resetQueue(connections);
            return { code, headers: {}, body: "ok" };
        }

        if (request.url === "/admin/connections") {
            return listConnections(connections);
        }

        if (request.url.startsWith("/admin") === true) {
            return { code: 404, headers: {}, body: "Jiggawatt!" };
        }

        return { code: 404, headers: {}, body: "" };
    }
}

/**
 * Formay a list of connections for plaintext display
 * @param {SocketWithConnectionInfo[]} connections
 * @return {{
 *   code: number;
 *   headers: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined | undefined;
 *   body: string;
 * }}
 */
export function listConnections(connections: SocketWithConnectionInfo[]): {
    code: number;
    headers: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined | undefined;
    body: string;
} {
    let responseString = "";
    connections.forEach((connection, index) => {
        const displayConnection = `
    index: ${index} - ${connection.id}
        remoteAddress: ${connection.socket.remoteAddress}:${connection.localPort}
        inQueue:       ${connection.inQueue}
    `;
        responseString = responseString.concat(displayConnection);
    });

    return {
        code: 200,
        headers: { "Content-Type": "text/plain" },
        body: responseString,
    };
}

export function releaseQueue(
    connections: SocketWithConnectionInfo[],
    connectionId: string
): {
    code: number;
    headers: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined | undefined;
    body: string;
} {
    const connectionToRelease = connections.find((connection) => {
        return connection.id === connectionId;
    });
    if (typeof connectionToRelease === "undefined") {
        return {
            code: 422,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "connection not found" }),
        };
    }
    connectionToRelease.inQueue = false;
    connectionToRelease.socket.write(Buffer.from([0x02, 0x30, 0x00, 0x00]));
    return {
        code: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "ok" }),
    };
}

export function resetQueue(connections: SocketWithConnectionInfo[]): {
    code: number;
    headers: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined | undefined;
    body: string;
} {
    const resetConnections = connections.map((c) => {
        c.inQueue = true;
        return c;
    });
    return {
        code: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetConnections, replacerFunc()),
    };
}
