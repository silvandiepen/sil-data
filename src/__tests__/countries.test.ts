import { describe, it, expect } from "vitest";
import { countries } from "../data/countries.js";
import type { Country } from "../types/index.js";

describe("countries", () => {
  it("should export an array of countries", () => {
    expect(Array.isArray(countries)).toBe(true);
  });

  it("should contain a significant number of countries", () => {
    expect(countries.length).toBeGreaterThan(150);
  });

  it("should have all required fields for each country", () => {
    const requiredFields: (keyof Country)[] = [
      "alpha2",
      "alpha3",
      "name",
      "capital",
      "continent",
      "flag",
      "phoneCode",
      "currency",
      "languages",
    ];

    for (const country of countries) {
      for (const field of requiredFields) {
        expect(
          country[field],
          `Country "${country.name}" is missing field "${field}"`
        ).toBeTruthy();
      }
    }
  });

  it("should have unique country codes (ISO alpha-2)", () => {
    const codes = countries.map((c) => c.alpha2);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it("should have unique country codes (ISO alpha-3)", () => {
    const codes = countries.map((c) => c.alpha3);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it("should have ISO alpha-2 codes of length 2", () => {
    for (const country of countries) {
      expect(
        country.alpha2.length,
        `Country "${country.name}" has invalid alpha-2 code: "${country.alpha2}"`
      ).toBe(2);
    }
  });

  it("should have ISO alpha-3 codes of length 3", () => {
    for (const country of countries) {
      expect(
        country.alpha3.length,
        `Country "${country.name}" has invalid alpha-3 code: "${country.alpha3}"`
      ).toBe(3);
    }
  });

  it("should have phone codes starting with +", () => {
    for (const country of countries) {
      expect(
        country.phoneCode.startsWith("+"),
        `Country "${country.name}" has invalid phone code: "${country.phoneCode}"`
      ).toBe(true);
    }
  });

  it("should include major countries", () => {
    const codes = countries.map((c) => c.alpha2);
    expect(codes).toContain("US");
    expect(codes).toContain("GB");
    expect(codes).toContain("DE");
    expect(codes).toContain("FR");
    expect(codes).toContain("CN");
    expect(codes).toContain("JP");
    expect(codes).toContain("IN");
    expect(codes).toContain("BR");
    expect(codes).toContain("AU");
    expect(codes).toContain("CA");
  });

  it("should have correct data for United States", () => {
    const us = countries.find((c) => c.alpha2 === "US");
    expect(us).toBeDefined();
    expect(us?.alpha3).toBe("USA");
    expect(us?.name).toBe("United States");
    expect(us?.capital).toBe("Washington D.C.");
    expect(us?.continent).toBe("North America");
    expect(us?.phoneCode).toBe("+1");
    expect(us?.currency).toBe("USD");
    expect(us?.flag).toBe("🇺🇸");
  });

  it("should have correct data for Germany", () => {
    const de = countries.find((c) => c.alpha2 === "DE");
    expect(de).toBeDefined();
    expect(de?.alpha3).toBe("DEU");
    expect(de?.name).toBe("Germany");
    expect(de?.capital).toBe("Berlin");
    expect(de?.continent).toBe("Europe");
    expect(de?.phoneCode).toBe("+49");
    expect(de?.currency).toBe("EUR");
    expect(de?.flag).toBe("🇩🇪");
  });

  it("should have countries from all continents", () => {
    const continents = new Set(countries.map((c) => c.continent));
    expect(continents.has("Europe")).toBe(true);
    expect(continents.has("Asia")).toBe(true);
    expect(continents.has("Africa")).toBe(true);
    expect(continents.has("North America")).toBe(true);
    expect(continents.has("South America")).toBe(true);
    expect(continents.has("Oceania")).toBe(true);
  });

  it("should have currency codes of exactly 3 characters", () => {
    for (const country of countries) {
      expect(
        country.currency.length,
        `Country "${country.name}" has invalid currency: "${country.currency}"`
      ).toBe(3);
    }
  });

  it("should have languages as a non-empty array", () => {
    for (const country of countries) {
      expect(Array.isArray(country.languages)).toBe(true);
      expect(
        country.languages.length,
        `Country "${country.name}" has no languages`
      ).toBeGreaterThan(0);
    }
  });
});
