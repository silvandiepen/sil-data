import { describe, it, expect } from "vitest";
import {
  countries,
  phoneCountryCodes,
  cities,
  states,
  continents,
} from "../index.js";
import type {
  Country,
  PhoneCountryCode,
  City,
  State,
  Continent,
} from "../index.js";

describe("index exports", () => {
  it("should export countries array", () => {
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });

  it("should export phoneCountryCodes array", () => {
    expect(Array.isArray(phoneCountryCodes)).toBe(true);
    expect(phoneCountryCodes.length).toBeGreaterThan(0);
  });

  it("should export cities array", () => {
    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBeGreaterThan(0);
  });

  it("should export states array", () => {
    expect(Array.isArray(states)).toBe(true);
    expect(states.length).toBeGreaterThan(0);
  });

  it("should export continents array", () => {
    expect(Array.isArray(continents)).toBe(true);
    expect(continents.length).toBeGreaterThan(0);
  });

  it("should have correct TypeScript types for Country", () => {
    const country: Country = countries[0];
    expect(typeof country.alpha2).toBe("string");
    expect(typeof country.alpha3).toBe("string");
    expect(typeof country.name).toBe("string");
    expect(typeof country.capital).toBe("string");
    expect(typeof country.continent).toBe("string");
    expect(typeof country.flag).toBe("string");
    expect(typeof country.phoneCode).toBe("string");
    expect(typeof country.currency).toBe("string");
    expect(Array.isArray(country.languages)).toBe(true);
  });

  it("should have correct TypeScript types for PhoneCountryCode", () => {
    const pcc: PhoneCountryCode = phoneCountryCodes[0];
    expect(typeof pcc.country).toBe("string");
    expect(typeof pcc.code).toBe("string");
    expect(typeof pcc.phoneCode).toBe("string");
    expect(typeof pcc.flag).toBe("string");
  });

  it("should have correct TypeScript types for City", () => {
    const city: City = cities[0];
    expect(typeof city.name).toBe("string");
    expect(typeof city.country).toBe("string");
    expect(typeof city.lat).toBe("number");
    expect(typeof city.lon).toBe("number");
  });

  it("should have correct TypeScript types for State", () => {
    const state: State = states[0];
    expect(typeof state.name).toBe("string");
    expect(typeof state.code).toBe("string");
    expect(typeof state.country).toBe("string");
    expect(typeof state.type).toBe("string");
  });

  it("should have correct TypeScript types for Continent", () => {
    const continent: Continent = continents[0];
    expect(typeof continent.name).toBe("string");
    expect(typeof continent.code).toBe("string");
  });

  it("should allow filtering countries by continent", () => {
    const europeanCountries = countries.filter(
      (c) => c.continent === "Europe"
    );
    expect(europeanCountries.length).toBeGreaterThan(20);
  });

  it("should allow looking up phone codes by country code", () => {
    const usPhoneCode = phoneCountryCodes.find((p) => p.code === "US");
    expect(usPhoneCode).toBeDefined();
    expect(usPhoneCode?.phoneCode).toBe("+1");
  });

  it("should allow filtering cities by country", () => {
    const japanCities = cities.filter((c) => c.country === "JP");
    expect(japanCities.length).toBeGreaterThan(0);
  });

  it("should allow filtering states by country", () => {
    const usStates = states.filter((s) => s.country === "US");
    expect(usStates.length).toBeGreaterThan(50);
  });
});
