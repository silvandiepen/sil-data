import { describe, it, expect } from "vitest";
import { continents } from "../data/continents.js";
import type { Continent } from "../types/index.js";

describe("continents", () => {
  it("should export an array of continents", () => {
    expect(Array.isArray(continents)).toBe(true);
  });

  it("should have exactly 7 continents", () => {
    expect(continents.length).toBe(7);
  });

  it("should have all required fields", () => {
    const requiredFields: (keyof Continent)[] = ["name", "code"];

    for (const continent of continents) {
      for (const field of requiredFields) {
        expect(
          continent[field],
          `Continent "${continent.name}" is missing field "${field}"`
        ).toBeTruthy();
      }
    }
  });

  it("should have unique codes", () => {
    const codes = continents.map((c) => c.code);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it("should include all 7 continents by name", () => {
    const names = continents.map((c) => c.name);
    expect(names).toContain("Africa");
    expect(names).toContain("Antarctica");
    expect(names).toContain("Asia");
    expect(names).toContain("Europe");
    expect(names).toContain("North America");
    expect(names).toContain("Oceania");
    expect(names).toContain("South America");
  });

  it("should have correct codes for continents", () => {
    const africa = continents.find((c) => c.name === "Africa");
    expect(africa?.code).toBe("AF");

    const europe = continents.find((c) => c.name === "Europe");
    expect(europe?.code).toBe("EU");

    const asia = continents.find((c) => c.name === "Asia");
    expect(asia?.code).toBe("AS");
  });
});
