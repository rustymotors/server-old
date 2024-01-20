import { GenericReplyMessage } from "./GenericReplyMessage.js";
import { LoginCompleteMessage, TLoginMessage } from "./TLoginMessage.js";
import { OldServerMessage } from "../../shared/messageFactory.js";
import { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function login({
    connectionId,
    packet,
    log,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
    // Read the inbound packet
    const loginMessage = new TLoginMessage();
    loginMessage.deserialize(packet.serialize());
    log.debug(`Received LoginMessage: ${loginMessage.toString()}`);

    // Create new response packet
    const pReply = new LoginCompleteMessage();
    pReply._msgNo = 213;
    pReply._firstTime = true;

    // Log the message
    log.debug(pReply.toString());

    const responsePacket = new OldServerMessage();
    responsePacket._header.sequence = packet._header.sequence;
    responsePacket._header.flags = 8;
    responsePacket.setBuffer(pReply.serialize());

    return { connectionId, messages: [responsePacket] };
}
