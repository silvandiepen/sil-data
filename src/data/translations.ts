import type { Country, City, Continent, Currency } from "../types/index.js";
import ar from "./translations/ar.js";
import de from "./translations/de.js";
import es from "./translations/es.js";
import fr from "./translations/fr.js";
import hi from "./translations/hi.js";
import it from "./translations/it.js";
import ja from "./translations/ja.js";
import ko from "./translations/ko.js";
import nl from "./translations/nl.js";
import pl from "./translations/pl.js";
import pt from "./translations/pt.js";
import ru from "./translations/ru.js";
import tr from "./translations/tr.js";
import zh from "./translations/zh.js";

/**
 * Translation record for a single country.
 */
export interface CountryTranslation {
  /** Translated country name */
  name: string;
  /** Translated capital city name (optional; omit if same as the English name) */
  capital?: string;
}

/**
 * All translations for a single language.
 */
export interface TranslationMap {
  /** Country translations keyed by ISO 3166-1 alpha-2 code */
  countries: Record<string, CountryTranslation>;
  /** Continent translations keyed by two-letter continent code */
  continents: Record<string, string>;
  /** City name translations keyed by English city name */
  cities: Record<string, string>;
  /** Currency name translations keyed by ISO 4217 code */
  currencies: Record<string, string>;
}

/**
 * All supported translation language codes (BCP 47 language tags).
 * English ("en") is the default and is always derived from the source data.
 */
export type TranslationLanguage =
  | "en"
  | "ar"
  | "de"
  | "es"
  | "fr"
  | "hi"
  | "it"
  | "ja"
  | "ko"
  | "nl"
  | "pl"
  | "pt"
  | "ru"
  | "tr"
  | "zh";

/**
 * Translation data for all supported languages.
 * Each language is defined in its own file under src/data/translations/.
 * English ("en") is intentionally omitted – the source data already contains English strings.
 */
export const translations: Record<string, TranslationMap> = {
  ar: ar as TranslationMap,
  de: de as TranslationMap,
  es: es as TranslationMap,
  fr: fr as TranslationMap,
  hi: hi as TranslationMap,
  it: it as TranslationMap,
  ja: ja as TranslationMap,
  ko: ko as TranslationMap,
  nl: nl as TranslationMap,
  pl: pl as TranslationMap,
  pt: pt as TranslationMap,
  ru: ru as TranslationMap,
  tr: tr as TranslationMap,
  zh: zh as TranslationMap,
};

/**
 * Return the list of BCP 47 language codes that have translation data.
 * "en" is always included because the source data is in English.
 */
export function getSupportedLanguages(): TranslationLanguage[] {
  return ["en", ...Object.keys(translations)] as TranslationLanguage[];
}

/**
 * Retrieve the full translation map for a given language code.
 * Returns `undefined` for unsupported languages (including "en", which uses the
 * source data directly).
 */
export function getTranslations(lang: string): TranslationMap | undefined {
  return translations[lang.toLowerCase()];
}

/**
 * Return a shallow copy of `country` with `name` (and optionally `capital`)
 * replaced by the translated values for `lang`.
 * Falls back to the original English values when no translation is found.
 */
export function translateCountry(country: Country, lang: string): Country {
  if (lang.toLowerCase() === "en") return country;
  const map = translations[lang.toLowerCase()];
  if (!map) return country;
  const t = map.countries[country.alpha2.toUpperCase()];
  if (!t) return country;
  return {
    ...country,
    name: t.name,
    ...(t.capital !== undefined ? { capital: t.capital } : {}),
  };
}

/**
 * Return a shallow copy of `city` with `name` replaced by the translated value
 * for `lang`. Falls back to the original English name when no translation exists.
 */
export function translateCity(city: City, lang: string): City {
  if (lang.toLowerCase() === "en") return city;
  const map = translations[lang.toLowerCase()];
  if (!map) return city;
  const translatedName = map.cities[city.name];
  if (!translatedName) return city;
  return { ...city, name: translatedName };
}

/**
 * Return a shallow copy of `continent` with `name` replaced by the translated
 * value for `lang`. Falls back to the original English name when no translation exists.
 */
export function translateContinent(continent: Continent, lang: string): Continent {
  if (lang.toLowerCase() === "en") return continent;
  const map = translations[lang.toLowerCase()];
  if (!map) return continent;
  const translatedName = map.continents[continent.code.toUpperCase()];
  if (!translatedName) return continent;
  return { ...continent, name: translatedName as Continent["name"] };
}

/**
 * Return a shallow copy of `currency` with `name` replaced by the translated
 * value for `lang`. Falls back to the original English name when no translation exists.
 */
export function translateCurrency(currency: Currency, lang: string): Currency {
  if (lang.toLowerCase() === "en") return currency;
  const map = translations[lang.toLowerCase()];
  if (!map) return currency;
  const translatedName = map.currencies[currency.code.toUpperCase()];
  if (!translatedName) return currency;
  return { ...currency, name: translatedName };
}
