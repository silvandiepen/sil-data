import { describe, it, expect } from "vitest";
import { states } from "../data/states.js";
import type { State, StateType } from "../types/index.js";

describe("states", () => {
  it("should export an array of states/provinces", () => {
    expect(Array.isArray(states)).toBe(true);
  });

  it("should contain a significant number of entries", () => {
    expect(states.length).toBeGreaterThan(100);
  });

  it("should have all required fields", () => {
    const requiredFields: (keyof State)[] = [
      "name",
      "code",
      "country",
      "type",
    ];

    for (const state of states) {
      for (const field of requiredFields) {
        expect(
          state[field],
          `State "${state.name}" is missing field "${field}"`
        ).toBeTruthy();
      }
    }
  });

  it("should have valid type values", () => {
    const validTypes: StateType[] = [
      "state",
      "province",
      "territory",
      "autonomous region",
      "district",
      "department",
      "region",
      "county",
      "emirate",
      "canton",
    ];

    for (const state of states) {
      expect(
        validTypes.includes(state.type),
        `State "${state.name}" has invalid type: "${state.type}"`
      ).toBe(true);
    }
  });

  it("should include all 50 US states", () => {
    const usStates = states.filter(
      (s) => s.country === "US" && s.type === "state"
    );
    expect(usStates.length).toBe(50);
  });

  it("should include the District of Columbia", () => {
    const dc = states.find(
      (s) => s.country === "US" && s.code === "DC"
    );
    expect(dc).toBeDefined();
    expect(dc?.type).toBe("district");
  });

  it("should include all Canadian provinces and territories", () => {
    const caRegions = states.filter((s) => s.country === "CA");
    expect(caRegions.length).toBe(13);
  });

  it("should include all Australian states and territories", () => {
    const auRegions = states.filter((s) => s.country === "AU");
    expect(auRegions.length).toBe(8);
  });

  it("should include all German federal states", () => {
    const deStates = states.filter((s) => s.country === "DE");
    expect(deStates.length).toBe(16);
  });

  it("should have correct country codes (ISO alpha-2)", () => {
    for (const state of states) {
      expect(
        state.country.length,
        `State "${state.name}" has invalid country code: "${state.country}"`
      ).toBe(2);
    }
  });

  it("should include well-known US states", () => {
    const codes = states
      .filter((s) => s.country === "US")
      .map((s) => s.code);
    expect(codes).toContain("CA");
    expect(codes).toContain("NY");
    expect(codes).toContain("TX");
    expect(codes).toContain("FL");
    expect(codes).toContain("WA");
  });

  it("should include well-known Canadian provinces", () => {
    const codes = states
      .filter((s) => s.country === "CA")
      .map((s) => s.code);
    expect(codes).toContain("ON");
    expect(codes).toContain("QC");
    expect(codes).toContain("BC");
    expect(codes).toContain("AB");
  });

  it("should group states by country correctly", () => {
    const byCountry = states.reduce<Record<string, State[]>>((acc, state) => {
      const key = state.country;
      if (!acc[key]) acc[key] = [];
      acc[key].push(state);
      return acc;
    }, {});

    expect(Object.keys(byCountry)).toContain("US");
    expect(Object.keys(byCountry)).toContain("CA");
    expect(Object.keys(byCountry)).toContain("AU");
    expect(Object.keys(byCountry)).toContain("DE");
    expect(Object.keys(byCountry)).toContain("BR");
    expect(Object.keys(byCountry)).toContain("IN");
  });
});
