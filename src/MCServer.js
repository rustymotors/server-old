// mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher> 

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/* Internal dependencies */
const readline = require("readline");
const net = require("net");
const fs = require("fs");
const async = require("async");
const logger = require("./logger.js");
const patchServer = require("../lib/WebServer/index.js");
const loginServer = require("../lib/LoginServer/index.js")();
const personaServer = require("../lib/PersonaServer/index.js")();
const TCPManager = require("./TCPManager.js");

const database = require("../lib/database/index.js");

class MCServer {
  /**
  Need to open create listeners on the ports
  
  When a connection opens, cass it to a session controller that will log the
  connection and fork to a connection handlers
  **/
  startServers(callback) {
    logger.info("Starting the listening sockets...");
    const tcpPortList = [
      7003,
      8227,
      43300,
      9000,
      9001,
      9002,
      9003,
      9004,
      9005,
      9006,
      9007,
      9008,
      9009,
      9010,
      9011,
      9012,
      9013,
      9014,
    ];
    async.waterfall(
      [
        patchServer.start,
        loginServer.start,
        personaServer.start,
        function(callback) {
          // arg1 now equals 'one' and arg2 now equals 'two'
          tcpPortList.map(port => {
            net
              .createServer(socket => {
                TCPManager.listener(socket);
              })
              .listen(port, "0.0.0.0", () => {
                // logger.debug(`Started TCP listener on TCP port: ${port}`);
              });
          });
          callback(null);
        },
      ],
      err => {
        if (err) {
          throw err;
        }
        // result now equals 'done'
        logger.info("Listening sockets create successfully.");
        callback(null);
      }
    );
  }
  startCLI(callback) {
    logger.info("Starting the command line interface...");
    // Create the command interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // command processing loop
    var recursiveAsyncReadLine = function() {
      rl.question("", command => {
        if (command == "exit") {
          // we need some base case, for recursion
          rl.close();
          return process.exit(); // closing RL and returning from function.
        }
        // TODO: Do something with the command
        handleCLICommand(command);
        recursiveAsyncReadLine(); // Calling this function again to ask new question
      });
    };
    // Start the CLI interface
    recursiveAsyncReadLine();
    logger.info("Command line interface started successfully.");
    callback(null);
  }
  run() {
    // Connect to database
    // Start the server listeners
    async.waterfall([database.createDB, this.startServers, this.startCLI]);
  }
}

function fetchSessionKey(customerId, callback) {
  database.db.serialize(function() {
    database.db.get(
      "SELECT session_key FROM sessions WHERE customer_id = $1",
      [customerId],
      (err, res) => {
        if (err) {
          // Unknown error
          console.error(
            `DATABASE ERROR: Unable to retrieve sessionKey: ${err.message}`
          );
          callback(err);
        } else {
          callback(null, res);
        }
      }
    );
  });
}

function handleCLICommand(command) {
  if (command.indexOf("session_key ") == 0) {
    // session_key <customerID>
    const customerId = parseInt(command.split(" ")[1]);
    fetchSessionKey(customerId, (err, res) => {
      if (err) {
        throw err;
      }
      if (res == undefined) {
        console.log("Unable to locate session key for customerID:", customerId);
      } else {
        console.log(
          `The sesssionKey for customerId ${customerId} is ${res.session_key}`
        );
      }
    });
  } else {
    console.log('Got it! Your answer was: "', command, '"');
  }
}

module.exports = { MCServer };
