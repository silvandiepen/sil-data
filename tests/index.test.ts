import { describe, it, expect } from "vitest";
import {
  // Data arrays
  countries,
  phoneCountryCodes,
  cities,
  states,
  continents,
  currencies,
  countryGeography,
  flagData,
  // Helper functions
  getCountryByCode,
  getCountriesByContinent,
  getCountryFlag,
  getPhoneCodeByCountry,
  getCountriesByPhoneCode,
  getCitiesByCountry,
  getCapitalCity,
  getCitiesByPopulation,
  searchCities,
  getStatesByCountry,
  getStateByCode,
  getStatesByType,
  getContinentByCode,
  getCurrencyByCode,
  getCurrencyByCountry,
  // Geography helpers
  getCountryGeography,
  getLandlockedCountries,
  getCountriesByClimate,
  getNeighbors,
  // Flag helpers
  getFlagData,
  getFlagsByColor,
  getSimilarFlags,
  getFlagSvgUrl,
  getFlagPngUrl,
  // Geo utilities
  haversineDistance,
  bearing,
  bearingToCardinal,
  getDistanceBetweenCountries,
  getDirectionBetweenCountries,
  compareTemperature,
  compareSize,
  getHemisphere,
  getGeoHints,
} from "../src/index.js";

describe("countries", () => {
  it("should have a comprehensive list of countries", () => {
    expect(countries.length).toBeGreaterThan(150);
  });

  it("should include major countries", () => {
    const codes = countries.map((c) => c.alpha2);
    expect(codes).toContain("US");
    expect(codes).toContain("GB");
    expect(codes).toContain("DE");
    expect(codes).toContain("JP");
    expect(codes).toContain("CN");
    expect(codes).toContain("IN");
    expect(codes).toContain("BR");
    expect(codes).toContain("AU");
    expect(codes).toContain("CA");
    expect(codes).toContain("FR");
  });

  it("should have required fields for every country", () => {
    for (const country of countries) {
      expect(country.name).toBeTruthy();
      expect(country.alpha2).toHaveLength(2);
      expect(country.alpha3).toHaveLength(3);
      expect(country.flag).toBeTruthy();
      expect(country.phoneCode).toMatch(/^\+\d+$/);
      expect(country.capital).toBeTruthy();
      expect(country.continent).toBeTruthy();
      expect(country.currency).toBeTruthy();
      expect(Array.isArray(country.languages)).toBe(true);
      expect(country.languages.length).toBeGreaterThan(0);
    }
  });

  it("should have valid ISO numeric codes", () => {
    for (const country of countries) {
      expect(country.numeric).toMatch(/^\d{3}$/);
    }
  });

  it("should have emoji flags", () => {
    const us = countries.find((c) => c.alpha2 === "US");
    expect(us?.flag).toBe("🇺🇸");

    const gb = countries.find((c) => c.alpha2 === "GB");
    expect(gb?.flag).toBe("🇬🇧");

    const jp = countries.find((c) => c.alpha2 === "JP");
    expect(jp?.flag).toBe("🇯🇵");
  });
});

describe("getCountryByCode", () => {
  it("should find a country by alpha2 code", () => {
    const us = getCountryByCode("US");
    expect(us).toBeDefined();
    expect(us?.name).toBe("United States");
    expect(us?.capital).toBe("Washington D.C.");
  });

  it("should be case-insensitive", () => {
    expect(getCountryByCode("us")).toEqual(getCountryByCode("US"));
    expect(getCountryByCode("gb")).toEqual(getCountryByCode("GB"));
  });

  it("should return undefined for unknown code", () => {
    expect(getCountryByCode("XX")).toBeUndefined();
  });
});

describe("getCountriesByContinent", () => {
  it("should return countries in Europe", () => {
    const european = getCountriesByContinent("Europe");
    expect(european.length).toBeGreaterThan(20);
    expect(european.every((c) => c.continent === "Europe")).toBe(true);
  });

  it("should return countries in Asia", () => {
    const asian = getCountriesByContinent("Asia");
    expect(asian.length).toBeGreaterThan(20);
    const codes = asian.map((c) => c.alpha2);
    expect(codes).toContain("JP");
    expect(codes).toContain("CN");
    expect(codes).toContain("IN");
  });

  it("should return countries in Africa", () => {
    const african = getCountriesByContinent("Africa");
    expect(african.length).toBeGreaterThan(40);
  });
});

describe("getCountryFlag", () => {
  it("should compute correct flag emoji from alpha2 code", () => {
    expect(getCountryFlag("US")).toBe("🇺🇸");
    expect(getCountryFlag("GB")).toBe("🇬🇧");
    expect(getCountryFlag("FR")).toBe("🇫🇷");
    expect(getCountryFlag("DE")).toBe("🇩🇪");
    expect(getCountryFlag("JP")).toBe("🇯🇵");
  });

  it("should work with lowercase codes", () => {
    expect(getCountryFlag("us")).toBe("🇺🇸");
    expect(getCountryFlag("gb")).toBe("🇬🇧");
  });
});

describe("phoneCountryCodes", () => {
  it("should have phone codes for all countries plus territories", () => {
    expect(phoneCountryCodes.length).toBeGreaterThan(150);
  });

  it("should include major country phone codes", () => {
    const us = phoneCountryCodes.find((p) => p.code === "US");
    expect(us?.phoneCode).toBe("+1");
    expect(us?.flag).toBe("🇺🇸");

    const gb = phoneCountryCodes.find((p) => p.code === "GB");
    expect(gb?.phoneCode).toBe("+44");

    const de = phoneCountryCodes.find((p) => p.code === "DE");
    expect(de?.phoneCode).toBe("+49");
  });

  it("should have flag emoji for each entry", () => {
    for (const entry of phoneCountryCodes) {
      expect(entry.flag).toBeTruthy();
      expect(entry.country).toBeTruthy();
      expect(entry.code).toBeTruthy();
      expect(entry.phoneCode).toMatch(/^\+\d+$/);
    }
  });
});

describe("getPhoneCodeByCountry", () => {
  it("should find phone code by country code", () => {
    const jp = getPhoneCodeByCountry("JP");
    expect(jp?.phoneCode).toBe("+81");
    expect(jp?.flag).toBe("🇯🇵");
  });

  it("should be case-insensitive", () => {
    expect(getPhoneCodeByCountry("jp")).toEqual(getPhoneCodeByCountry("JP"));
  });

  it("should return undefined for unknown code", () => {
    expect(getPhoneCodeByCountry("ZZ")).toBeUndefined();
  });
});

describe("getCountriesByPhoneCode", () => {
  it("should return multiple countries sharing +1", () => {
    const northAmerica = getCountriesByPhoneCode("+1");
    expect(northAmerica.length).toBeGreaterThan(5);
    const codes = northAmerica.map((p) => p.code);
    expect(codes).toContain("US");
    expect(codes).toContain("CA");
  });

  it("should work with code without + prefix", () => {
    const result = getCountriesByPhoneCode("44");
    expect(result.length).toBeGreaterThan(0);
    const codes = result.map((p) => p.code);
    expect(codes).toContain("GB");
  });
});

describe("cities", () => {
  it("should have a large list of cities", () => {
    expect(cities.length).toBeGreaterThan(200);
  });

  it("should include capital cities", () => {
    const capitals = cities.filter((c) => c.capital);
    expect(capitals.length).toBeGreaterThan(100);
  });

  it("should have required fields", () => {
    for (const city of cities) {
      expect(city.name).toBeTruthy();
      expect(city.country).toHaveLength(2);
      expect(typeof city.lat).toBe("number");
      expect(typeof city.lon).toBe("number");
      expect(city.lat).toBeGreaterThanOrEqual(-90);
      expect(city.lat).toBeLessThanOrEqual(90);
      expect(city.lon).toBeGreaterThanOrEqual(-180);
      expect(city.lon).toBeLessThanOrEqual(180);
    }
  });
});

describe("getCitiesByCountry", () => {
  it("should return cities for a given country", () => {
    const usCities = getCitiesByCountry("US");
    expect(usCities.length).toBeGreaterThan(5);
    const names = usCities.map((c) => c.name);
    expect(names).toContain("New York City");
    expect(names).toContain("Los Angeles");
  });

  it("should be case-insensitive", () => {
    expect(getCitiesByCountry("us")).toEqual(getCitiesByCountry("US"));
  });
});

describe("getCapitalCity", () => {
  it("should return the capital of a country", () => {
    const dc = getCapitalCity("US");
    expect(dc?.name).toBe("Washington D.C.");

    const london = getCapitalCity("GB");
    expect(london?.name).toBe("London");

    const tokyo = getCapitalCity("JP");
    expect(tokyo?.name).toBe("Tokyo");
  });

  it("should return undefined if no capital found", () => {
    expect(getCapitalCity("ZZ")).toBeUndefined();
  });
});

describe("getCitiesByPopulation", () => {
  it("should return cities sorted by population descending", () => {
    const top10 = getCitiesByPopulation(10);
    expect(top10.length).toBe(10);
    for (let i = 0; i < top10.length - 1; i++) {
      expect(top10[i].population ?? 0).toBeGreaterThanOrEqual(
        top10[i + 1].population ?? 0
      );
    }
  });

  it("should return all cities when no limit", () => {
    const all = getCitiesByPopulation();
    expect(all.length).toBeGreaterThan(200);
  });
});

describe("searchCities", () => {
  it("should find cities by partial name", () => {
    const results = searchCities("new");
    const names = results.map((c) => c.name);
    expect(names).toContain("New York City");
    expect(names).toContain("New Delhi");
  });

  it("should be case-insensitive", () => {
    expect(searchCities("london").length).toBeGreaterThan(0);
    expect(searchCities("LONDON").length).toBeGreaterThan(0);
    expect(searchCities("london")).toEqual(searchCities("LONDON"));
  });
});

describe("states", () => {
  it("should have a large list of states/provinces", () => {
    expect(states.length).toBeGreaterThan(200);
  });

  it("should include all US states", () => {
    const usStates = states.filter((s) => s.country === "US" && s.type === "state");
    expect(usStates.length).toBe(50);
  });

  it("should include all Canadian provinces", () => {
    const caProvinces = states.filter(
      (s) => s.country === "CA" && s.type === "province"
    );
    expect(caProvinces.length).toBe(10);
  });

  it("should include all Australian states", () => {
    const auStates = states.filter(
      (s) => s.country === "AU" && s.type === "state"
    );
    expect(auStates.length).toBe(6);
  });

  it("should have required fields for every entry", () => {
    for (const state of states) {
      expect(state.name).toBeTruthy();
      expect(state.code).toBeTruthy();
      expect(state.country).toHaveLength(2);
      expect(state.type).toBeTruthy();
    }
  });
});

describe("getStatesByCountry", () => {
  it("should return states for US", () => {
    const usStates = getStatesByCountry("US");
    expect(usStates.length).toBeGreaterThan(50); // 50 + DC + territories
    const names = usStates.map((s) => s.name);
    expect(names).toContain("California");
    expect(names).toContain("New York");
    expect(names).toContain("Texas");
  });

  it("should be case-insensitive", () => {
    expect(getStatesByCountry("us")).toEqual(getStatesByCountry("US"));
  });
});

describe("getStateByCode", () => {
  it("should find a state by code and country", () => {
    const ca = getStateByCode("CA", "US");
    expect(ca?.name).toBe("California");
    expect(ca?.type).toBe("state");
  });

  it("should return undefined for unknown code", () => {
    expect(getStateByCode("ZZ", "US")).toBeUndefined();
  });
});

describe("getStatesByType", () => {
  it("should return only states of a given type", () => {
    const provinces = getStatesByType("province");
    expect(provinces.every((s) => s.type === "province")).toBe(true);
    expect(provinces.length).toBeGreaterThan(10);
  });

  it("should return cantons for Switzerland", () => {
    const cantons = getStatesByType("canton");
    expect(cantons.every((s) => s.country === "CH")).toBe(true);
    expect(cantons.length).toBe(26);
  });
});

describe("continents", () => {
  it("should have 7 continents", () => {
    expect(continents.length).toBe(7);
  });

  it("should include all continents", () => {
    const names = continents.map((c) => c.name);
    expect(names).toContain("Africa");
    expect(names).toContain("Antarctica");
    expect(names).toContain("Asia");
    expect(names).toContain("Europe");
    expect(names).toContain("North America");
    expect(names).toContain("Oceania");
    expect(names).toContain("South America");
  });

  it("should have population and area data", () => {
    for (const continent of continents) {
      expect(continent.population).toBeGreaterThanOrEqual(0);
      expect(continent.area).toBeGreaterThan(0);
    }
  });
});

describe("getContinentByCode", () => {
  it("should return continent by code", () => {
    const europe = getContinentByCode("EU");
    expect(europe?.name).toBe("Europe");
  });

  it("should be case-insensitive", () => {
    expect(getContinentByCode("eu")).toEqual(getContinentByCode("EU"));
  });
});

describe("currencies", () => {
  it("should have a comprehensive currency list", () => {
    expect(currencies.length).toBeGreaterThan(100);
  });

  it("should include major currencies", () => {
    const codes = currencies.map((c) => c.code);
    expect(codes).toContain("USD");
    expect(codes).toContain("EUR");
    expect(codes).toContain("GBP");
    expect(codes).toContain("JPY");
    expect(codes).toContain("CNY");
  });

  it("should have required fields", () => {
    for (const currency of currencies) {
      expect(currency.code).toBeTruthy();
      expect(currency.name).toBeTruthy();
      expect(currency.symbol).toBeTruthy();
      expect(Array.isArray(currency.countries)).toBe(true);
    }
  });
});

describe("getCurrencyByCode", () => {
  it("should find a currency by code", () => {
    const usd = getCurrencyByCode("USD");
    expect(usd?.name).toBe("US Dollar");
    expect(usd?.symbol).toBe("$");
  });

  it("should be case-insensitive", () => {
    expect(getCurrencyByCode("usd")).toEqual(getCurrencyByCode("USD"));
  });
});

describe("getCurrencyByCountry", () => {
  it("should return the currency used in a country", () => {
    const usCurrency = getCurrencyByCountry("US");
    expect(usCurrency?.code).toBe("USD");

    const jpCurrency = getCurrencyByCountry("JP");
    expect(jpCurrency?.code).toBe("JPY");

    const deCurrency = getCurrencyByCountry("DE");
    expect(deCurrency?.code).toBe("EUR");
  });
});

// ── Geography data ──────────────────────────────────────────────────────────

describe("countryGeography", () => {
  it("should have geography data for all major countries", () => {
    const codes = countryGeography.map((g) => g.alpha2);
    expect(codes).toContain("US");
    expect(codes).toContain("DE");
    expect(codes).toContain("JP");
    expect(codes).toContain("CN");
    expect(codes).toContain("BR");
    expect(codes).toContain("AU");
  });

  it("should have at least 150 entries", () => {
    expect(countryGeography.length).toBeGreaterThan(150);
  });

  it("should have valid centroid coordinates", () => {
    for (const g of countryGeography) {
      expect(g.lat).toBeGreaterThanOrEqual(-90);
      expect(g.lat).toBeLessThanOrEqual(90);
      expect(g.lon).toBeGreaterThanOrEqual(-180);
      expect(g.lon).toBeLessThanOrEqual(180);
    }
  });

  it("should have positive area for all countries (except very tiny city-states)", () => {
    for (const g of countryGeography) {
      expect(g.area).toBeGreaterThanOrEqual(0);
    }
  });

  it("should have valid bounding boxes", () => {
    for (const g of countryGeography) {
      expect(g.bounds.north).toBeGreaterThan(g.bounds.south);
      expect(g.bounds.north).toBeLessThanOrEqual(90);
      expect(g.bounds.south).toBeGreaterThanOrEqual(-90);
    }
  });

  it("should have climate zone and average temperature", () => {
    const validClimates = [
      "tropical", "subtropical", "arid", "mediterranean",
      "temperate", "continental", "subarctic", "arctic",
    ];
    for (const g of countryGeography) {
      expect(validClimates).toContain(g.climate);
      expect(typeof g.avgTemperature).toBe("number");
    }
  });
});

describe("getCountryGeography", () => {
  it("should return geometry for a valid code", () => {
    const us = getCountryGeography("US");
    expect(us).toBeDefined();
    expect(us?.alpha2).toBe("US");
    expect(us?.landlocked).toBe(false);
    expect(us?.climate).toBe("temperate");
  });

  it("should be case-insensitive", () => {
    expect(getCountryGeography("us")).toEqual(getCountryGeography("US"));
  });

  it("should return undefined for unknown code", () => {
    expect(getCountryGeography("XX")).toBeUndefined();
  });
});

describe("getLandlockedCountries", () => {
  it("should return only landlocked countries", () => {
    const landlocked = getLandlockedCountries();
    expect(landlocked.every((g) => g.landlocked)).toBe(true);
  });

  it("should include known landlocked countries", () => {
    const codes = getLandlockedCountries().map((g) => g.alpha2);
    expect(codes).toContain("CH"); // Switzerland
    expect(codes).toContain("AT"); // Austria
    expect(codes).toContain("BO"); // Bolivia
    expect(codes).toContain("MN"); // Mongolia
    expect(codes).toContain("ZM"); // Zambia
  });

  it("should not include coastal countries", () => {
    const codes = getLandlockedCountries().map((g) => g.alpha2);
    expect(codes).not.toContain("US");
    expect(codes).not.toContain("GB");
    expect(codes).not.toContain("JP");
  });
});

describe("getCountriesByClimate", () => {
  it("should return tropical countries", () => {
    const tropical = getCountriesByClimate("tropical");
    expect(tropical.every((g) => g.climate === "tropical")).toBe(true);
    const codes = tropical.map((g) => g.alpha2);
    expect(codes).toContain("BR");
    expect(codes).toContain("NG");
    expect(codes).toContain("TH");
  });

  it("should return subarctic countries", () => {
    const subarctic = getCountriesByClimate("subarctic");
    const codes = subarctic.map((g) => g.alpha2);
    expect(codes).toContain("RU");
    expect(codes).toContain("NO");
    expect(codes).toContain("FI");
  });
});

describe("getNeighbors", () => {
  it("should return Germany's neighbours", () => {
    const neighbours = getNeighbors("DE");
    const codes = neighbours.map((g) => g.alpha2);
    expect(codes).toContain("FR");
    expect(codes).toContain("NL");
    expect(codes).toContain("CH");
    expect(codes).toContain("AT");
    expect(codes).toContain("PL");
  });

  it("should return an empty array for island countries with no neighbours", () => {
    const neighbours = getNeighbors("JP");
    expect(neighbours).toEqual([]);
  });

  it("should return empty array for unknown code", () => {
    expect(getNeighbors("XX")).toEqual([]);
  });
});

// ── Flag data ───────────────────────────────────────────────────────────────

describe("flagData", () => {
  it("should have flag data for major countries", () => {
    const codes = flagData.map((f) => f.alpha2);
    expect(codes).toContain("US");
    expect(codes).toContain("DE");
    expect(codes).toContain("JP");
    expect(codes).toContain("GB");
    expect(codes).toContain("FR");
  });

  it("should have at least 150 entries", () => {
    expect(flagData.length).toBeGreaterThan(150);
  });

  it("should have valid SVG and PNG URLs", () => {
    for (const f of flagData) {
      expect(f.svgUrl).toMatch(/^https:\/\/flagcdn\.com\/[a-z]{2,3}\.svg$/);
      expect(f.pngUrl).toMatch(/^https:\/\/flagcdn\.com\/w320\/[a-z]{2,3}\.png$/);
    }
  });

  it("should have at least one colour per flag", () => {
    for (const f of flagData) {
      expect(f.colors.length).toBeGreaterThan(0);
    }
  });
});

describe("getFlagData", () => {
  it("should return flag info for a valid code", () => {
    const nl = getFlagData("NL");
    expect(nl?.alpha2).toBe("NL");
    expect(nl?.colors).toContain("red");
    expect(nl?.colors).toContain("white");
    expect(nl?.colors).toContain("blue");
  });

  it("should be case-insensitive", () => {
    expect(getFlagData("nl")).toEqual(getFlagData("NL"));
  });

  it("should return undefined for unknown code", () => {
    expect(getFlagData("XX")).toBeUndefined();
  });
});

describe("getFlagsByColor", () => {
  it("should return flags that include red", () => {
    const redFlags = getFlagsByColor("red");
    expect(redFlags.length).toBeGreaterThan(50);
    expect(redFlags.every((f) => f.colors.includes("red"))).toBe(true);
  });
});

describe("getSimilarFlags", () => {
  it("should return visually similar flags for the Netherlands", () => {
    const similar = getSimilarFlags("NL");
    const codes = similar.map((f) => f.alpha2);
    expect(codes).toContain("LU"); // Luxembourg
    expect(codes).toContain("FR"); // France (vertical variant)
    expect(codes).toContain("RU"); // Russia
  });

  it("should return Nordic cross siblings for Denmark", () => {
    const similar = getSimilarFlags("DK");
    const codes = similar.map((f) => f.alpha2);
    expect(codes).toContain("NO");
    expect(codes).toContain("SE");
    expect(codes).toContain("FI");
    expect(codes).toContain("IS");
  });

  it("should return Union Jack family for Australia", () => {
    const similar = getSimilarFlags("AU");
    const codes = similar.map((f) => f.alpha2);
    expect(codes).toContain("NZ");
    expect(codes).toContain("GB");
  });

  it("should return empty array for unknown code", () => {
    expect(getSimilarFlags("XX")).toEqual([]);
  });
});

describe("getFlagSvgUrl / getFlagPngUrl", () => {
  it("should generate correct SVG URL", () => {
    expect(getFlagSvgUrl("US")).toBe("https://flagcdn.com/us.svg");
    expect(getFlagSvgUrl("GB")).toBe("https://flagcdn.com/gb.svg");
  });

  it("should be case-insensitive", () => {
    expect(getFlagSvgUrl("us")).toBe("https://flagcdn.com/us.svg");
  });

  it("should generate correct PNG URL with default width", () => {
    expect(getFlagPngUrl("US")).toBe("https://flagcdn.com/w320/us.png");
  });

  it("should generate PNG URL with custom width", () => {
    expect(getFlagPngUrl("US", 640)).toBe("https://flagcdn.com/w640/us.png");
  });
});

// ── Geo utilities ───────────────────────────────────────────────────────────

describe("haversineDistance", () => {
  it("should return ~0 for same point", () => {
    expect(haversineDistance(0, 0, 0, 0)).toBe(0);
  });

  it("should return ~111 km per degree of latitude", () => {
    const d = haversineDistance(0, 0, 1, 0);
    expect(d).toBeCloseTo(111.19, 0);
  });

  it("should compute London–Paris distance (~344 km)", () => {
    const d = haversineDistance(51.51, -0.13, 48.86, 2.35);
    expect(d).toBeGreaterThan(300);
    expect(d).toBeLessThan(400);
  });
});

describe("bearing / bearingToCardinal", () => {
  it("should return 0° (north) for due north", () => {
    expect(bearing(0, 0, 1, 0)).toBeCloseTo(0, 0);
  });

  it("should return 90° (east) for due east", () => {
    expect(bearing(0, 0, 0, 1)).toBeCloseTo(90, 0);
  });

  it("bearingToCardinal should convert angles correctly", () => {
    expect(bearingToCardinal(0)).toBe("N");
    expect(bearingToCardinal(90)).toBe("E");
    expect(bearingToCardinal(180)).toBe("S");
    expect(bearingToCardinal(270)).toBe("W");
    expect(bearingToCardinal(45)).toBe("NE");
    expect(bearingToCardinal(135)).toBe("SE");
  });
});

describe("getDistanceBetweenCountries", () => {
  it("should return a positive number between two countries", () => {
    const d = getDistanceBetweenCountries("DE", "FR");
    expect(d).not.toBeNull();
    expect(d!).toBeGreaterThan(0);
  });

  it("should return 0 for the same country", () => {
    expect(getDistanceBetweenCountries("US", "US")).toBe(0);
  });

  it("should return null for unknown codes", () => {
    expect(getDistanceBetweenCountries("XX", "DE")).toBeNull();
    expect(getDistanceBetweenCountries("DE", "XX")).toBeNull();
  });
});

describe("getDirectionBetweenCountries", () => {
  it("should return direction from France to Germany (roughly E/NE)", () => {
    const dir = getDirectionBetweenCountries("FR", "DE");
    expect(["E", "NE"]).toContain(dir);
  });

  it("should return direction from US to UK (roughly E/NE)", () => {
    const dir = getDirectionBetweenCountries("US", "GB");
    expect(["NE", "E", "N"]).toContain(dir);
  });

  it("should return null for unknown codes", () => {
    expect(getDirectionBetweenCountries("XX", "DE")).toBeNull();
  });
});

describe("compareTemperature", () => {
  it("should detect when target is hotter", () => {
    // Brazil (tropical, ~24°C) vs Canada (continental, ~-5°C)
    const result = compareTemperature("CA", "BR");
    expect(result).toBe("hotter");
  });

  it("should detect when target is colder", () => {
    const result = compareTemperature("BR", "CA");
    expect(result).toBe("colder");
  });

  it("should return similar for close temperatures", () => {
    // France and Germany are both temperate
    const result = compareTemperature("FR", "DE");
    expect(result).toBe("similar");
  });

  it("should return null for unknown code", () => {
    expect(compareTemperature("XX", "DE")).toBeNull();
  });
});

describe("compareSize", () => {
  it("should return larger when target is much bigger", () => {
    // Russia is much larger than Netherlands
    const result = compareSize("NL", "RU");
    expect(result).toBe("larger");
  });

  it("should return smaller when target is much smaller", () => {
    const result = compareSize("RU", "NL");
    expect(result).toBe("smaller");
  });

  it("should return null for unknown code", () => {
    expect(compareSize("XX", "DE")).toBeNull();
  });
});

describe("getHemisphere", () => {
  it("should return Northern/Eastern for Germany", () => {
    const h = getHemisphere("DE");
    expect(h?.ns).toBe("Northern");
    expect(h?.ew).toBe("Eastern");
  });

  it("should return Southern/Western for Argentina", () => {
    const h = getHemisphere("AR");
    expect(h?.ns).toBe("Southern");
    expect(h?.ew).toBe("Western");
  });

  it("should return null for unknown code", () => {
    expect(getHemisphere("XX")).toBeNull();
  });
});

describe("getGeoHints", () => {
  it("should return a complete hint object", () => {
    const hints = getGeoHints("NL", "DE");
    expect(hints).not.toBeNull();
    expect(typeof hints!.distanceKm).toBe("number");
    expect(hints!.distanceKm).toBeGreaterThan(0);
    expect(["N","NE","E","SE","S","SW","W","NW"]).toContain(hints!.direction);
    expect(["hotter","colder","similar"]).toContain(hints!.temperature);
    expect(["larger","smaller","similar"]).toContain(hints!.size);
    expect(hints!.hemisphere).toBeDefined();
    expect(typeof hints!.landlocked).toBe("boolean");
    expect(hints!.climate).toBeDefined();
  });

  it("should return null for unknown codes", () => {
    expect(getGeoHints("XX", "DE")).toBeNull();
    expect(getGeoHints("DE", "XX")).toBeNull();
  });
});
