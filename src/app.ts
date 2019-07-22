import { ConfigManager } from "./configManager";
import * as net from "net";
import * as repl from "repl";

// get instance of config
const config = new ConfigManager().getConfig();

// MCOS Monolith
import { Server } from "./server";
const server = new Server(config);
// MCOS AuthLogin and Shard
import { WebServer } from "./services/AuthLogin/WebServer";
const AuthLogin = new WebServer(config);
AuthLogin.start();
// MCOS PatchAndShard
import { PatchServer } from "./services/PatchAndShard/patchServer";
const patchAndShardServer = new PatchServer(config);
patchAndShardServer.start();

net
  .createServer(function(socket) {
    const local = repl.start({
      prompt: "node via TCP socket> ",
      input: socket,
      output: socket,
    });
    local.context.server = server;
  })
  .listen(5001, "0.0.0.0");
