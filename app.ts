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

import { GatewayServer } from "mcos/gateway";
import { GetServerLogger, Sentry, setServerConfiguration } from "mcos/shared";

Sentry.init({
    dsn: "https://9cefd6a6a3b940328fcefe45766023f2@o1413557.ingest.sentry.io/4504406901915648",

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

const log = GetServerLogger();

try {
    if (typeof process.env.EXTERNAL_HOST === "undefined") {
        console.error("Please set EXTERNAL_HOST");
        process.exit(1);
    }
    if (typeof process.env.CERTIFICATE_FILE === "undefined") {
        console.error("Please set CERTIFICATE_FILE");
        process.exit(1);
    }
    if (typeof process.env.PRIVATE_KEY_FILE === "undefined") {
        console.error("Please set PRIVATE_KEY_FILE");
        process.exit(1);
    }
    if (typeof process.env.PUBLIC_KEY_FILE === "undefined") {
        console.error("Please set PUBLIC_KEY_FILE");
        process.exit(1);
    }
    const config = setServerConfiguration(
        process.env.EXTERNAL_HOST,
        process.env.CERTIFICATE_FILE,
        process.env.PRIVATE_KEY_FILE,
        process.env.PUBLIC_KEY_FILE,
        "debug"
    );
    const appLog = GetServerLogger(config.LOG_LEVEL);

    const listeningPortList = [
        3000, 6660, 7003, 8228, 8226, 8227,
        /// 9000, 9001, 9002, 9003, 9004, 9005, 9006, 9007, 9008, 9009, 9010, 9011, 9012, 9013, 9014,
        43200,
        43300, 43400, 53303,
    ];

    const gatewayServer = new GatewayServer({
        config,
        log: appLog,
        listeningPortList,
    });

    gatewayServer.start();
} catch (err) {
    Sentry.captureException(err);
    log("crit", `Error in core server: ${String(err)}`);
    process.exit(1);
}
