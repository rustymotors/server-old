import { BufferSerializer } from "./BufferSerializer.js";
import type { SerializableInterface } from "./types.js";

/**
 *
 */

export class GameMessageHeader
	extends BufferSerializer
	implements SerializableInterface
{
	private id: number = 0; // 2 bytes
	private length: number = 0; // 2 bytes
	private version: 0 | 257 = 257; // 2 bytes

	private shouldEncryptPayload: boolean = false;

	constructor() {
		super();
	}

	static copy(header: GameMessageHeader): GameMessageHeader {
		const newHeader = new GameMessageHeader();
		newHeader.id = header.id;
		newHeader.length = header.length;
		newHeader.version = header.version;
		return newHeader;
	}

	override getByteSize(): number {
		return this.getVersion() === 257 ? 12 : 4;
	}

	getVersion(): number {
		return this.version;
	}
	getId(): number {
		return this.id;
	}
	getLength(): number {
		return this.length;
	}
	setVersion(version: 0 | 257): void {
		if (version !== 0 && version !== 257) {
			throw new Error(`Invalid version ${parseInt(version)}`);
		}
		this.version = version;
	}
	setId(id: number): void {
		this.id = id;
	}
	setLength(length: number): void {
		this.length = length;
	}

	private serializeV0(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		buffer.writeUInt16BE(this.id, 0);
		buffer.writeUInt16BE(this.length, 2);

		return buffer;
	}

	private serializeV1(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		buffer.writeUInt16BE(this.id, 0);
		buffer.writeUInt16BE(this.length, 2);
		buffer.writeUInt16BE(this.version, 4);
		buffer.writeUInt16BE(0, 6);
		buffer.writeUInt32BE(this.length, 8);

		return buffer;
	}

	override serialize(): Buffer {
		return this.version === 0 ? this.serializeV0() : this.serializeV1();
	}

	private deserializeV0(data: Buffer): void {
		this.id = data.readUInt16BE(0);
		this.length = data.readUInt16BE(2);
	}

	private deserializeV1(data: Buffer): void {
		this.id = data.readUInt16BE(0);
		this.length = data.readUInt16BE(2);
		// Skip version
		// Skip padding
		this.length = data.readUInt32BE(8);
	}

	override deserialize(data: Buffer): void {
		if (data.length < 4) {
			throw new Error(
				`Data is too short. Expected at least 4 bytes, got ${data.length} bytes`,
			);
		}

		if (this.version === 0) {
			this.deserializeV0(data);
		} else {
			this.deserializeV1(data);
		}
	}

	/**
	 * Sets the encryption status for the payload.
	 *
	 * @param encrypted - A boolean indicating whether the payload should be encrypted (true) or not (false).
	 */
	setPayloadEncryption(encrypted: boolean): void {
		this.shouldEncryptPayload = encrypted;
	}

	/**
	 * Determines if the payload should be encrypted.
	 *
	 * @returns {boolean} True if the payload should be encrypted, otherwise false.
	 */
	isPayloadEncrypted(): boolean {
		return this.shouldEncryptPayload;
	}

	override toString(): string {
		return `GameMessageHeader {id: ${this.id}, length: ${this.length}, version: ${this.version}}`;
	}

}
