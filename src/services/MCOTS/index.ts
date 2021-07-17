// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {log} from '@drazisil/mco-logger';
import {GenericReplyMessage} from '../MCServer/generic-reply-msg';
import {TCPConnection} from '../MCServer/tcpConnection';
import {MessageNode} from './message-node';

/**
 * Mangages the game database server
 * @module MCOTSServer
 */

/**
 * @class
 * @property {module:MCO_Logger.logger} logger
 */
export class MCOTServer {
  /**
   * Return the string representation of the numeric opcode
   *
   * @param {number} msgID
   * @return {string}
   */
  _MSG_STRING(messageID: number) {
    switch (messageID) {
      case 105:
        return 'MC_LOGIN';
      case 106:
        return 'MC_LOGOUT';
      case 109:
        return 'MC_SET_OPTIONS';
      case 141:
        return 'MC_STOCK_CAR_INFO';
      case 213:
        return 'MC_LOGIN_COMPLETE';
      case 266:
        return 'MC_UPDATE_PLAYER_PHYSICAL';
      case 324:
        return 'MC_GET_LOBBIES';
      case 325:
        return 'MC_LOBBIES';
      case 438:
        return 'MC_CLIENT_CONNECT_MSG';
      case 440:
        return 'MC_TRACKING_MSG';

      default:
        return 'Unknown';
    }
  }

  /**
   *
   * @param {ConnectionObj} con
   * @param {MessageNode} node
   * @return {Promise<{con: ConnectionObj, nodes: MessageNode[]}>}
   */
  async _login(con: TCPConnection, node: MessageNode) {
    // Create new response packet
    const pReply = new GenericReplyMessage();
    pReply.msgNo = 213;
    pReply.msgReply = 105;
    pReply.appId = con.appId;
    const rPacket = new MessageNode('SENT');

    rPacket.deserialize(node.serialize());
    rPacket.updateBuffer(pReply.serialize());
    rPacket.dumpPacket();

    return {con, nodes: [rPacket]};
  }

  /**
   *
   * @param {ConnectionObj} con
   * @param {MessageNode} node
   * @return {Promise<{con: ConnectionObj, nodes: MessageNode[]}>}
   */
  async _getLobbies(con: TCPConnection, node: MessageNode) {
    log('In _getLobbies...', {
      service: 'mcoserver:MCOTSServer',
      level: 'debug',
    });
    const lobbiesListMessage = node;

    // Update the appId
    lobbiesListMessage.appId = con.appId;

    // Dump the packet
    log('Dumping request...', {
      service: 'mcoserver:MCOTSServer',
      level: 'debug',
    });
    log(JSON.stringify(lobbiesListMessage), {
      service: 'mcoserver:MCOTSServer',
      level: 'debug',
    });

    // Create new response packet
    // const lobbyMsg = new LobbyMsg()

    const pReply = new GenericReplyMessage();
    pReply.msgNo = 325;
    pReply.msgReply = 324;
    const rPacket = new MessageNode('SENT');
    rPacket.flags = 9;

    const lobby = Buffer.alloc(12);
    lobby.writeInt32LE(325, 0);
    lobby.writeInt32LE(0, 4);
    lobby.writeInt32LE(0, 8);

    rPacket.updateBuffer(pReply.serialize());

    // // Dump the packet
    log('Dumping response...', {
      service: 'mcoserver:MCOTSServer',
      level: 'debug',
    });
    log(JSON.stringify(rPacket), {service: 'mcoserver:MCOTSServer', level: 'debug'});

    return {con, nodes: [rPacket]};
  }

  /**
   *
   * @param {module:ConnectionObj} con
   * @param {module:MessageNode} node
   * @return {Promise<{con: ConnectionObj, nodes: MessageNode[]}>}
   */
  async _logout(con: TCPConnection, node: MessageNode) {
    const logoutMessage = node;

    logoutMessage.data = node.serialize();

    // Update the appId
    logoutMessage.appId = con.appId;

    // Create new response packet
    const pReply = new GenericReplyMessage();
    pReply.msgNo = 101;
    pReply.msgReply = 106;
    const rPacket = new MessageNode('SENT');

    rPacket.deserialize(node.serialize());
    rPacket.updateBuffer(pReply.serialize());
    rPacket.dumpPacket();

    /** @type MessageNode[] */
    const nodes: MessageNode[] = [];

    return {con, nodes};
  }

  /**
   *
   * @param {ConnectionObj} con
   * @param {MessageNode} node
   * @return {Promise<{con: ConnectionObj, nodes: MessageNode[]}>}
   */
  async _setOptions(con: TCPConnection, node: MessageNode) {
    const setOptionsMessage = node;

    setOptionsMessage.data = node.serialize();

    // Update the appId
    setOptionsMessage.appId = con.appId;

    // Create new response packet
    const pReply = new GenericReplyMessage();
    pReply.msgNo = 101;
    pReply.msgReply = 109;
    const rPacket = new MessageNode('SENT');

    rPacket.deserialize(node.serialize());
    rPacket.updateBuffer(pReply.serialize());
    rPacket.dumpPacket();

    return {con, nodes: [rPacket]};
  }

  /**
   *
   * @param {ConnectionObj} con
   * @param {MessageNode} node
   * @return {Promise<{con: ConnectionObj, nodes: MessageNode[]}>}
   */
  async _trackingMessage(con: TCPConnection, node:MessageNode) {
    const trackingMessage = node;

    trackingMessage.data = node.serialize();

    // Update the appId
    trackingMessage.appId = con.appId;

    // Create new response packet
    const pReply = new GenericReplyMessage();
    pReply.msgNo = 101;
    pReply.msgReply = 440;
    const rPacket = new MessageNode('SENT');

    rPacket.deserialize(node.serialize());
    rPacket.updateBuffer(pReply.serialize());
    rPacket.dumpPacket();

    return {con, nodes: [rPacket]};
  }

  /**
   *
   * @param {module:ConnectionObj} con
   * @param {module:MessageNode} node
   * @return {Promise<{con: ConnectionObj, nodes: MessageNode[]}>}
   */
  async _updatePlayerPhysical(con: TCPConnection, node: MessageNode) {
    const updatePlayerPhysicalMessage = node;

    updatePlayerPhysicalMessage.data = node.serialize();

    // Update the appId
    updatePlayerPhysicalMessage.appId = con.appId;

    // Create new response packet
    const pReply = new GenericReplyMessage();
    pReply.msgNo = 101;
    pReply.msgReply = 266;
    const rPacket = new MessageNode('SENT');

    rPacket.deserialize(node.serialize());
    rPacket.updateBuffer(pReply.serialize());
    rPacket.dumpPacket();

    return {con, nodes: [rPacket]};
  }
}

