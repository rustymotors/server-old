import { AuthServer, getAuthServer } from "@mcos/auth";
import assert from "node:assert";
import { describe, it, expect } from "vitest";

describe("AuthServer", () => {
    it("AuthServer should be a function", () => {
        assert.strictEqual(typeof AuthServer, "function");
    });
});

describe("getAuthServer", () => {
    it("getAuthServer should be a function", () => {
        assert.strictEqual(typeof getAuthServer, "function");
    });
});
