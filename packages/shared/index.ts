export { SubThread } from "./src/SubThread.js";
export { NetworkMessage } from "./src/NetworkMessage.js";
export { getServerLogger } from "./src/log.js";
export type { ServerLogger } from "./src/log.js";
export { Configuration, getServerConfiguration } from "./src/Configuration.js";
export { SerializedBuffer } from "./src/SerializedBuffer.js";
export { SerializedBufferOld } from "./src/SerializedBufferOld.js";
export { RawMessage } from "./src/RawMessage.js";
export { ServerMessage } from "./src/ServerMessage.js";
export {
	AbstractSerializable,
	SerializableMixin,
} from "./src/messageFactory.js";
export { NPSMessage } from "./src/NPSMessage.js";
export { OldServerMessage } from "./src/OldServerMessage.js";
export { MessageBufferOld } from "./src/MessageBufferOld.js";
export { GameMessage } from "./src/GameMessage.js";
export { serializeString } from "./src/serializeString.js";
export { deserializeString } from "./src/deserializeString.js";
export { serializeStringRaw } from "./src/serializeStringRaw.js";
export { MessageNode } from "./src/MessageNode.js";
export { Timestamp } from "./src/TimeStamp.js";
export {
	McosEncryptionPair,
	McosEncryption,
	addSession,
	createInitialState,
	fetchStateFromDatabase,
	addOnDataHandler,
	getOnDataHandler,
	addEncryption,
	getEncryption,
	McosSession,
	findSessionByConnectionId,
	updateEncryption,
} from "./src/State.js";
export type { State } from "./src/State.js";
export type { OnDataHandler, ServiceResponse } from "./src/State.js";
export { LegacyMessage } from "./src/LegacyMessage.js";
export { NPSHeader } from "./src/NPSHeader.js";
export * from "./src/interfaces.js";

export interface KeypressEvent {
	sequence: string;
	name: string;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;
}

export interface ConnectionRecord {
	customerId: number;
	connectionId: string;
	sessionKey: string;
	sKey: string;
	contextId: string;
}

// Function to convert ARGB to 32-bit integer
export function argbToInt(alpha: number, red: number, green: number, blue: number) {
	return (
		((alpha & 0xff) << 24) |
		((red & 0xff) << 16) |
		((green & 0xff) << 8) |
		(blue & 0xff)
	);
}

// Function to convert 32-bit integer to ARGB
export function intToArgb(int: number) {
	return {
		alpha: (int >> 24) & 0xff,
		red: (int >> 16) & 0xff,
		green: (int >> 8) & 0xff,
		blue: int & 0xff,
	};
}

//skin colors
export const skin_pale = argbToInt(255, 255, 206, 165); //light pale
export const skin_tan = argbToInt(255, 206, 164, 122); //light tan
export const skin_brown = argbToInt(255, 112, 95, 78); //light brown
//shaded versions of the basic skin colors
export const dskin_pale = argbToInt(255, 140, 115, 90); //dark pale
export const dskin_tan = argbToInt(255, 124, 98, 72); //dark tan
export const dskin_brown = argbToInt(255, 63, 49, 35); //dark brown
//hair colors
export const hair_white = argbToInt(255, 255, 255, 255); //white
export const hair_platinum = argbToInt(255, 255, 242, 167); //platinum blonde
export const hair_blonde = argbToInt(255, 244, 219, 76); //blonde
export const hair_tan = argbToInt(255, 122, 100, 49); //tan
export const hair_red = argbToInt(255, 172, 69, 13); //red
export const hair_brown = argbToInt(255, 81, 65, 29); //brown
export const hair_black = argbToInt(255, 0, 0, 0); //black
//clothing colors
export const cloth_red = argbToInt(255, 212, 82, 82); //red
export const cloth_orange = argbToInt(255, 229, 139, 38); //orange
export const cloth_yellow = argbToInt(255, 255, 216, 0); //yellow
export const cloth_green = argbToInt(255, 112, 158, 113); //green
export const cloth_blue = argbToInt(255, 67, 81, 168); //blue
export const cloth_purple = argbToInt(255, 121, 80, 132); //purple
export const cloth_brown = argbToInt(255, 117, 104, 68); //brown
export const cloth_black = argbToInt(255, 68, 68, 68); //black
export const cloth_grey = argbToInt(255, 146, 143, 137); //grey
export const cloth_white = argbToInt(255, 255, 255, 255); //white
