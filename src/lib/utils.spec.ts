import { describe, expect, it } from "vitest";
import { cn, currency, initials } from "./utils";

describe("cn", () => {
	it("should merge class names with Tailwind CSS", () => {
		const className = cn("text-red-500", "text-blue-500");
		expect(className).toBe("text-blue-500");
	});

	it("should parse objects and lists to class names", () => {
		const className = cn({ "text-red-500": true, "bg-blue-500": false });
		expect(className).toBe("text-red-500");
	});
});

describe("initials", () => {
	it("should return the initials of a name", () => {
		expect(initials("William Fernandes")).toBe("WF");
	});
});

describe("currency", () => {
	it("should format a value as currency", () => {
		expect(currency(1000)).toBe("$1,000.00");
	});

	it("should format a value as currency with a different currency", () => {
		expect(currency(1000, "BRL")).toBe("R$1,000.00");
	});
});
