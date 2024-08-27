import { describe, expect, it } from "vitest";
import { updateSessionKey } from "rusty-motors-database";
import { State } from "../../shared/State.js";
import { getServerLogger } from "rusty-motors-shared";
import { TClientConnectMessage } from "../src/TClientConnectMessage.js";
import { clientConnect } from "../src/clientConnect.js";

describe("clientConnect", () => {
	it("throws when connection is not found", async () => {
		// arrange
		const customerId = 1234;
		const connectionId = "test";
		const sessionKey =
			"1234567890123456123456789012345612345678901234561234567890123456";
		const contextId = "test";
		const incomingMessage = new TClientConnectMessage();
		incomingMessage._customerId = customerId;

		const log = getServerLogger({});
		updateSessionKey(
			customerId,
			sessionKey,
			contextId,
			connectionId,
		);

		// act
		try {
			await clientConnect({
				connectionId,
				packet: incomingMessage,
				log,
			});
		} catch (error) {
			// assert
			expect(error).toEqual(
				new Error(`Encryption not found for connection ${connectionId}`),
			);
		}
	});
});
