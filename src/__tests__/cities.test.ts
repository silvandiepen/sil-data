import { describe, it, expect } from "vitest";
import { cities } from "../data/cities.js";
import type { City } from "../types/index.js";

describe("cities", () => {
  it("should export an array of cities", () => {
    expect(Array.isArray(cities)).toBe(true);
  });

  it("should contain a significant number of cities", () => {
    expect(cities.length).toBeGreaterThan(100);
  });

  it("should have all required fields for each city", () => {
    const requiredFields: (keyof City)[] = [
      "name",
      "country",
      "lat",
      "lon",
    ];

    for (const city of cities) {
      for (const field of requiredFields) {
        expect(
          city[field] !== undefined,
          `City "${city.name}" is missing field "${field}"`
        ).toBe(true);
      }
    }
  });

  it("should have valid country codes (ISO alpha-2)", () => {
    for (const city of cities) {
      expect(
        city.country.length,
        `City "${city.name}" has invalid country code: "${city.country}"`
      ).toBe(2);
    }
  });

  it("should have valid lat/lon coordinates", () => {
    for (const city of cities) {
      expect(
        city.lat >= -90 && city.lat <= 90,
        `City "${city.name}" has invalid latitude: ${city.lat}`
      ).toBe(true);
      expect(
        city.lon >= -180 && city.lon <= 180,
        `City "${city.name}" has invalid longitude: ${city.lon}`
      ).toBe(true);
    }
  });

  it("should include major world capitals", () => {
    const capitalCities = cities.filter((c) => c.capital);
    const capitalNames = capitalCities.map((c) => c.name);

    expect(capitalNames).toContain("Washington D.C.");
    expect(capitalNames).toContain("London");
    expect(capitalNames).toContain("Paris");
    expect(capitalNames).toContain("Berlin");
    expect(capitalNames).toContain("Tokyo");
    expect(capitalNames).toContain("Beijing");
  });

  it("should have cities from multiple countries", () => {
    const countryCodes = new Set(cities.map((c) => c.country));
    expect(countryCodes.has("US")).toBe(true);
    expect(countryCodes.has("GB")).toBe(true);
    expect(countryCodes.has("CN")).toBe(true);
    expect(countryCodes.has("JP")).toBe(true);
    expect(countryCodes.has("AU")).toBe(true);
    expect(countryCodes.has("BR")).toBe(true);
    expect(countryCodes.has("ZA")).toBe(true);
  });

  it("should correctly identify capital cities", () => {
    const washington = cities.find((c) => c.name === "Washington D.C.");
    expect(washington?.capital).toBe(true);

    const tokyo = cities.find((c) => c.name === "Tokyo");
    expect(tokyo?.capital).toBe(true);
  });

  it("should have non-negative population values when provided", () => {
    const citiesWithPopulation = cities.filter(
      (c) => c.population !== undefined
    );
    expect(citiesWithPopulation.length).toBeGreaterThan(0);

    for (const city of citiesWithPopulation) {
      if (city.population !== undefined) {
        expect(
          city.population,
          `City "${city.name}" has negative population`
        ).toBeGreaterThan(0);
      }
    }
  });
});
