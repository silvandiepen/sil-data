import { describe, it, expect } from "vitest";
import { countries, getRecognizedCountries } from "../data/countries.js";
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
      "recognized",
    ];

    for (const country of countries) {
      for (const field of requiredFields) {
        expect(
          country[field] !== undefined && country[field] !== null,
          `Country "${country.name}" is missing field "${field}"`
        ).toBe(true);
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
    expect(us?.recognized).toBe(true);
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
    expect(de?.recognized).toBe(true);
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

  it("should have recognized as a boolean for every country", () => {
    for (const country of countries) {
      expect(
        typeof country.recognized,
        `Country "${country.name}" has non-boolean recognized field`
      ).toBe("boolean");
    }
  });

  it("should mark most countries as recognized", () => {
    const recognized = countries.filter((c) => c.recognized);
    expect(recognized.length).toBeGreaterThan(150);
  });

  it("should mark Kosovo as not recognized", () => {
    const xk = countries.find((c) => c.alpha2 === "XK");
    expect(xk).toBeDefined();
    expect(xk?.recognized).toBe(false);
  });

  it("should mark Nagorno-Karabakh as not recognized", () => {
    const xn = countries.find((c) => c.alpha2 === "XN");
    expect(xn).toBeDefined();
    expect(xn?.recognized).toBe(false);
  });

  describe("getRecognizedCountries", () => {
    it("should return only recognized countries", () => {
      const recognized = getRecognizedCountries();
      expect(recognized.every((c) => c.recognized)).toBe(true);
    });

    it("should not include Kosovo or Nagorno-Karabakh", () => {
      const recognized = getRecognizedCountries();
      const codes = recognized.map((c) => c.alpha2);
      expect(codes).not.toContain("XK");
      expect(codes).not.toContain("XN");
    });

    it("should include major recognized countries", () => {
      const recognized = getRecognizedCountries();
      const codes = recognized.map((c) => c.alpha2);
      expect(codes).toContain("US");
      expect(codes).toContain("DE");
      expect(codes).toContain("JP");
    });
  });
});
