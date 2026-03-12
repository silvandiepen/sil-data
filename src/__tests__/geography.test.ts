import { describe, it, expect } from "vitest";
import {
  countryGeography,
  getCountryGeography,
  getLandlockedCountries,
  getNeighbors,
  doCountriesBorder,
} from "../data/geography.js";

describe("countryGeography", () => {
  it("should export an array of country geography entries", () => {
    expect(Array.isArray(countryGeography)).toBe(true);
    expect(countryGeography.length).toBeGreaterThan(150);
  });
});

describe("getCountryGeography", () => {
  it("should return geography data for a known country", () => {
    const de = getCountryGeography("DE");
    expect(de).toBeDefined();
    expect(de?.alpha2).toBe("DE");
    expect(de?.neighbors).toContain("FR");
  });

  it("should be case-insensitive", () => {
    expect(getCountryGeography("de")).toEqual(getCountryGeography("DE"));
  });

  it("should return undefined for an unknown code", () => {
    expect(getCountryGeography("XX")).toBeUndefined();
  });
});

describe("getLandlockedCountries", () => {
  it("should return only landlocked countries", () => {
    const landlocked = getLandlockedCountries();
    expect(landlocked.length).toBeGreaterThan(0);
    for (const country of landlocked) {
      expect(country.landlocked).toBe(true);
    }
  });
});

describe("getNeighbors", () => {
  it("should return neighbouring country objects", () => {
    const neighbors = getNeighbors("DE");
    expect(neighbors.length).toBeGreaterThan(0);
    const codes = neighbors.map((n) => n.alpha2);
    expect(codes).toContain("FR");
  });

  it("should return an empty array for unknown code", () => {
    expect(getNeighbors("XX")).toEqual([]);
  });
});

describe("doCountriesBorder", () => {
  it("should return true for countries that share a border", () => {
    expect(doCountriesBorder("DE", "FR")).toBe(true); // Germany – France
    expect(doCountriesBorder("US", "CA")).toBe(true); // USA – Canada
    expect(doCountriesBorder("IN", "CN")).toBe(true); // India – China
  });

  it("should return true regardless of argument order", () => {
    expect(doCountriesBorder("FR", "DE")).toBe(true);
    expect(doCountriesBorder("CA", "US")).toBe(true);
  });

  it("should return false for countries that do not share a border", () => {
    expect(doCountriesBorder("DE", "US")).toBe(false); // Germany – United States
    expect(doCountriesBorder("JP", "KR")).toBe(false); // Japan – South Korea (sea only)
    expect(doCountriesBorder("AU", "NZ")).toBe(false); // Australia – New Zealand
  });

  it("should be case-insensitive", () => {
    expect(doCountriesBorder("de", "fr")).toBe(true);
    expect(doCountriesBorder("De", "Fr")).toBe(true);
  });

  it("should return false when the first country code is unknown", () => {
    expect(doCountriesBorder("XX", "DE")).toBe(false);
  });

  it("should return false when the second country code is unknown", () => {
    expect(doCountriesBorder("DE", "XX")).toBe(false);
  });

  it("should return false when both country codes are unknown", () => {
    expect(doCountriesBorder("XX", "YY")).toBe(false);
  });

  it("should return false when a country is checked against itself", () => {
    // A country does not border itself in the neighbours list
    expect(doCountriesBorder("DE", "DE")).toBe(false);
  });
});
