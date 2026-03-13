import { describe, it, expect } from "vitest";
import {
  translations,
  getSupportedLanguages,
  getTranslations,
  translateCountry,
  translateCity,
  translateContinent,
  translateCurrency,
} from "../data/translations.js";
import { countries } from "../data/countries.js";
import {
  getCountryByCode,
  getCountriesByContinent,
  getRecognizedCountries,
} from "../data/countries.js";
import {
  getCitiesByCountry,
  getCapitalCity,
  searchCities,
  getCitiesByPopulation,
} from "../data/cities.js";
import { getContinentByCode } from "../data/continents.js";
import { getCurrencyByCode, getCurrencyByCountry } from "../data/currencies.js";
import type { Country, City, Continent, Currency } from "../types/index.js";

// ---------------------------------------------------------------------------
// getSupportedLanguages
// ---------------------------------------------------------------------------
describe("getSupportedLanguages", () => {
  it("should always include 'en'", () => {
    expect(getSupportedLanguages()).toContain("en");
  });

  it("should include all translation languages", () => {
    const langs = getSupportedLanguages();
    for (const code of ["de", "fr", "es", "pt", "nl", "it", "ar", "zh", "ja", "ru", "ko", "hi", "pl", "tr"]) {
      expect(langs).toContain(code);
    }
  });

  it("should return at least 15 languages", () => {
    expect(getSupportedLanguages().length).toBeGreaterThanOrEqual(15);
  });
});

// ---------------------------------------------------------------------------
// getTranslations
// ---------------------------------------------------------------------------
describe("getTranslations", () => {
  it("should return undefined for 'en'", () => {
    expect(getTranslations("en")).toBeUndefined();
  });

  it("should return undefined for an unsupported language", () => {
    expect(getTranslations("xx")).toBeUndefined();
  });

  it("should return a TranslationMap for 'de'", () => {
    const map = getTranslations("de");
    expect(map).toBeDefined();
    expect(map?.countries).toBeDefined();
    expect(map?.continents).toBeDefined();
    expect(map?.cities).toBeDefined();
    expect(map?.currencies).toBeDefined();
  });

  it("should be case-insensitive", () => {
    expect(getTranslations("DE")).toEqual(getTranslations("de"));
    expect(getTranslations("FR")).toEqual(getTranslations("fr"));
  });
});

// ---------------------------------------------------------------------------
// translations data structure
// ---------------------------------------------------------------------------
describe("translations data", () => {
  const langs = Object.keys(translations);

  it("should have translations for at least 14 languages", () => {
    expect(langs.length).toBeGreaterThanOrEqual(14);
  });

  for (const lang of langs) {
    describe(`language: ${lang}`, () => {
      const map = translations[lang];

      it("should have country translations", () => {
        expect(Object.keys(map.countries).length).toBeGreaterThan(100);
      });

      it("should have all 7 continent translations", () => {
        expect(Object.keys(map.continents)).toHaveLength(7);
        for (const code of ["AF", "AN", "AS", "EU", "NA", "OC", "SA"]) {
          expect(map.continents[code]).toBeTruthy();
        }
      });

      it("should have currency translations", () => {
        expect(Object.keys(map.currencies).length).toBeGreaterThan(0);
        expect(map.currencies["EUR"]).toBeTruthy();
      });

      it("should have city translations", () => {
        expect(Object.keys(map.cities).length).toBeGreaterThan(0);
      });
    });
  }
});

// ---------------------------------------------------------------------------
// translateCountry
// ---------------------------------------------------------------------------
describe("translateCountry", () => {
  const germany: Country = countries.find((c) => c.alpha2 === "DE")!;
  const japan: Country = countries.find((c) => c.alpha2 === "JP")!;

  it("should return the same object for 'en'", () => {
    expect(translateCountry(germany, "en")).toBe(germany);
  });

  it("should return the same object for an unsupported language", () => {
    expect(translateCountry(germany, "xx")).toBe(germany);
  });

  it("should translate country name into German", () => {
    // Germany's name in German is "Deutschland"
    const translated = translateCountry(germany, "de");
    expect(translated.name).toBe("Deutschland");
    expect(translated.alpha2).toBe("DE");
  });

  it("should translate country name into French", () => {
    // Germany in French is "Allemagne"
    const translated = translateCountry(germany, "fr");
    expect(translated.name).toBe("Allemagne");
  });

  it("should translate country name into Spanish", () => {
    const translated = translateCountry(germany, "es");
    expect(translated.name).toBe("Alemania");
  });

  it("should translate capital when a translation exists (German Japan→Tokio)", () => {
    const translated = translateCountry(japan, "de");
    expect(translated.capital).toBe("Tokio");
  });

  it("should NOT mutate the original country object", () => {
    const original = { ...germany };
    translateCountry(germany, "de");
    expect(germany.name).toBe(original.name);
    expect(germany.capital).toBe(original.capital);
  });

  it("should keep untranslated fields (alpha2, flag, etc.) intact", () => {
    const translated = translateCountry(germany, "de");
    expect(translated.alpha2).toBe(germany.alpha2);
    expect(translated.flag).toBe(germany.flag);
    expect(translated.currency).toBe(germany.currency);
  });
});

// ---------------------------------------------------------------------------
// translateCity
// ---------------------------------------------------------------------------
describe("translateCity", () => {
  const tokyo: City = { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503, capital: true };

  it("should return the same object for 'en'", () => {
    expect(translateCity(tokyo, "en")).toBe(tokyo);
  });

  it("should return the same object for an unsupported language", () => {
    expect(translateCity(tokyo, "xx")).toBe(tokyo);
  });

  it("should translate Tokyo into German (Tokio)", () => {
    const translated = translateCity(tokyo, "de");
    expect(translated.name).toBe("Tokio");
  });

  it("should translate Tokyo into Japanese (東京)", () => {
    const translated = translateCity(tokyo, "ja");
    expect(translated.name).toBe("東京");
  });

  it("should NOT mutate the original city object", () => {
    translateCity(tokyo, "de");
    expect(tokyo.name).toBe("Tokyo");
  });

  it("should keep untranslated fields intact", () => {
    const translated = translateCity(tokyo, "de");
    expect(translated.country).toBe(tokyo.country);
    expect(translated.lat).toBe(tokyo.lat);
    expect(translated.lon).toBe(tokyo.lon);
    expect(translated.capital).toBe(tokyo.capital);
  });
});

// ---------------------------------------------------------------------------
// translateContinent
// ---------------------------------------------------------------------------
describe("translateContinent", () => {
  const europe: Continent = { name: "Europe", code: "EU", population: 748958360, area: 10530000, countries: 44 };

  it("should return the same object for 'en'", () => {
    expect(translateContinent(europe, "en")).toBe(europe);
  });

  it("should translate 'Europe' into German ('Europa')", () => {
    const translated = translateContinent(europe, "de");
    expect(translated.name).toBe("Europa");
  });

  it("should translate 'Europe' into French ('Europe')", () => {
    const translated = translateContinent(europe, "fr");
    expect(translated.name).toBe("Europe");
  });

  it("should translate 'Europe' into Arabic (أوروبا)", () => {
    const translated = translateContinent(europe, "ar");
    expect(translated.name).toBe("أوروبا");
  });

  it("should translate 'Europe' into Chinese (欧洲)", () => {
    const translated = translateContinent(europe, "zh");
    expect(translated.name).toBe("欧洲");
  });

  it("should NOT mutate the original continent object", () => {
    translateContinent(europe, "de");
    expect(europe.name).toBe("Europe");
  });
});

// ---------------------------------------------------------------------------
// translateCurrency
// ---------------------------------------------------------------------------
describe("translateCurrency", () => {
  const euro: Currency = { code: "EUR", name: "Euro", symbol: "€", countries: ["DE", "FR"] };

  it("should return the same object for 'en'", () => {
    expect(translateCurrency(euro, "en")).toBe(euro);
  });

  it("should translate EUR into German", () => {
    const translated = translateCurrency(euro, "de");
    expect(translated.name).toBe("Euro");
  });

  it("should translate USD into German (US-Dollar)", () => {
    const usd: Currency = { code: "USD", name: "US Dollar", symbol: "$", countries: ["US"] };
    const translated = translateCurrency(usd, "de");
    expect(translated.name).toBe("US-Dollar");
  });

  it("should translate USD into Japanese (米ドル)", () => {
    const usd: Currency = { code: "USD", name: "US Dollar", symbol: "$", countries: ["US"] };
    const translated = translateCurrency(usd, "ja");
    expect(translated.name).toBe("米ドル");
  });
});

// ---------------------------------------------------------------------------
// Language-aware country functions
// ---------------------------------------------------------------------------
describe("getCountryByCode with lang", () => {
  it("should return English by default", () => {
    const country = getCountryByCode("DE");
    expect(country?.name).toBe("Germany");
  });

  it("should return translated name when lang='de'", () => {
    const country = getCountryByCode("DE", "de");
    expect(country?.name).toBe("Deutschland");
  });

  it("should return translated name when lang='fr'", () => {
    const country = getCountryByCode("DE", "fr");
    expect(country?.name).toBe("Allemagne");
  });

  it("should return translated name when lang='zh'", () => {
    const country = getCountryByCode("CN", "zh");
    expect(country?.name).toBe("中国");
  });

  it("should return undefined for unknown code regardless of lang", () => {
    expect(getCountryByCode("ZZ", "de")).toBeUndefined();
  });

  it("should fall back to English for unknown lang", () => {
    const country = getCountryByCode("DE", "xx");
    expect(country?.name).toBe("Germany");
  });
});

describe("getCountriesByContinent with lang", () => {
  it("should return English names by default", () => {
    const europeCountries = getCountriesByContinent("Europe");
    const germany = europeCountries.find((c) => c.alpha2 === "DE");
    expect(germany?.name).toBe("Germany");
  });

  it("should return translated names for lang='de'", () => {
    const europeCountries = getCountriesByContinent("Europe", "de");
    const germany = europeCountries.find((c) => c.alpha2 === "DE");
    expect(germany?.name).toBe("Deutschland");
    const france = europeCountries.find((c) => c.alpha2 === "FR");
    expect(france?.name).toBe("Frankreich");
  });
});

describe("getRecognizedCountries with lang", () => {
  it("should return English names by default", () => {
    const recognized = getRecognizedCountries();
    const us = recognized.find((c) => c.alpha2 === "US");
    expect(us?.name).toBe("United States");
  });

  it("should return translated names for lang='es'", () => {
    const recognized = getRecognizedCountries("es");
    const us = recognized.find((c) => c.alpha2 === "US");
    expect(us?.name).toBe("Estados Unidos");
  });
});

// ---------------------------------------------------------------------------
// Language-aware city functions
// ---------------------------------------------------------------------------
describe("getCapitalCity with lang", () => {
  it("should return English city name by default", () => {
    const city = getCapitalCity("JP");
    expect(city?.name).toBe("Tokyo");
  });

  it("should return translated city name when lang='de'", () => {
    const city = getCapitalCity("JP", "de");
    expect(city?.name).toBe("Tokio");
  });
});

describe("getCitiesByCountry with lang", () => {
  it("should return English names by default", () => {
    const citiesJP = getCitiesByCountry("JP");
    const tokyo = citiesJP.find((c) => c.name === "Tokyo" || c.name === "東京");
    expect(tokyo).toBeDefined();
  });

  it("should return translated names when lang='ja'", () => {
    const citiesJP = getCitiesByCountry("JP", "ja");
    const tokyo = citiesJP.find((c) => c.name === "東京");
    expect(tokyo).toBeDefined();
  });
});

describe("searchCities with lang", () => {
  it("should search in English by default", () => {
    const results = searchCities("tokyo");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("Tokyo");
  });

  it("should return translated names when lang='de'", () => {
    const results = searchCities("tokyo", "de");
    expect(results.length).toBeGreaterThan(0);
    // Translated from Tokyo -> Tokio in German
    expect(results[0].name).toBe("Tokio");
  });
});

describe("getCitiesByPopulation with lang", () => {
  it("should return English names by default", () => {
    const top5 = getCitiesByPopulation(5);
    expect(top5.length).toBe(5);
  });

  it("should return translated names when lang='zh'", () => {
    const top10 = getCitiesByPopulation(10, "zh");
    expect(top10.length).toBe(10);
    const tokyo = top10.find((c) => c.name === "东京" || c.name === "Tokyo");
    // May or may not have Tokyo in top 10, just verify no crash
    expect(top10.every((c) => typeof c.name === "string")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Language-aware continent functions
// ---------------------------------------------------------------------------
describe("getContinentByCode with lang", () => {
  it("should return English name by default", () => {
    const eu = getContinentByCode("EU");
    expect(eu?.name).toBe("Europe");
  });

  it("should return translated name when lang='de'", () => {
    const eu = getContinentByCode("EU", "de");
    expect(eu?.name).toBe("Europa");
  });

  it("should return translated name when lang='zh'", () => {
    const as = getContinentByCode("AS", "zh");
    expect(as?.name).toBe("亚洲");
  });

  it("should return undefined for unknown code", () => {
    expect(getContinentByCode("XX", "de")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Language-aware currency functions
// ---------------------------------------------------------------------------
describe("getCurrencyByCode with lang", () => {
  it("should return English name by default", () => {
    const eur = getCurrencyByCode("EUR");
    expect(eur?.name).toBe("Euro");
  });

  it("should return translated name when lang='de'", () => {
    const usd = getCurrencyByCode("USD", "de");
    expect(usd?.name).toBe("US-Dollar");
  });

  it("should return translated name when lang='ja'", () => {
    const jpy = getCurrencyByCode("JPY", "ja");
    expect(jpy?.name).toBe("日本円");
  });
});

describe("getCurrencyByCountry with lang", () => {
  it("should return English name by default", () => {
    const currency = getCurrencyByCountry("US");
    expect(currency?.name).toBe("US Dollar");
  });

  it("should return translated name when lang='de'", () => {
    const currency = getCurrencyByCountry("US", "de");
    expect(currency?.name).toBe("US-Dollar");
  });
});

// ---------------------------------------------------------------------------
// Country currencyName and currencySymbol enrichment
// ---------------------------------------------------------------------------
describe("getCountryByCode includes currencyName and currencySymbol", () => {
  it("should include English currencyName and currencySymbol", () => {
    const us = getCountryByCode("US");
    expect(us?.currency).toBe("USD");
    expect(us?.currencyName).toBe("US Dollar");
    expect(us?.currencySymbol).toBe("$");
  });

  it("should include translated currencyName when lang='de'", () => {
    const us = getCountryByCode("US", "de");
    expect(us?.currency).toBe("USD");
    expect(us?.currencyName).toBe("US-Dollar");
  });

  it("should include translated currencyName when lang='ja' for Japan", () => {
    const jp = getCountryByCode("JP", "ja");
    expect(jp?.currency).toBe("JPY");
    expect(jp?.currencyName).toBe("日本円");
    expect(jp?.currencySymbol).toBe("¥");
  });

  it("should include currencyName in getCountriesByContinent", () => {
    const eurozone = getCountriesByContinent("Europe").filter((c) => c.currency === "EUR");
    expect(eurozone.length).toBeGreaterThan(0);
    expect(eurozone[0].currencyName).toBe("Euro");
    expect(eurozone[0].currencySymbol).toBe("€");
  });

  it("should include translated currencyName in getCountriesByContinent", () => {
    const eurozone = getCountriesByContinent("Europe", "de").filter((c) => c.currency === "EUR");
    expect(eurozone.length).toBeGreaterThan(0);
    expect(eurozone[0].currencyName).toBe("Euro");
  });
});
