import type { Continent } from "../types/index.js";
import { translateContinent } from "./translations.js";

/**
 * The seven continents with key metadata.
 */
export const continents: Continent[] = [
  {
    name: "Africa",
    code: "AF",
    population: 1460481772,
    area: 30370000,
    countries: 54,
  },
  {
    name: "Antarctica",
    code: "AN",
    population: 1106,
    area: 14200000,
    countries: 0,
  },
  {
    name: "Asia",
    code: "AS",
    population: 4694576167,
    area: 44579000,
    countries: 49,
  },
  {
    name: "Europe",
    code: "EU",
    population: 748958360,
    area: 10530000,
    countries: 44,
  },
  {
    name: "North America",
    code: "NA",
    population: 596581283,
    area: 24709000,
    countries: 23,
  },
  {
    name: "Oceania",
    code: "OC",
    population: 43219954,
    area: 8526000,
    countries: 14,
  },
  {
    name: "South America",
    code: "SA",
    population: 434260461,
    area: 17840000,
    countries: 12,
  },
];

/**
 * Get a continent by its two-letter code.
 */
export function getContinentByCode(code: string, lang = "en"): Continent | undefined {
  const continent = continents.find((c) => c.code.toLowerCase() === code.toLowerCase());
  if (!continent) return undefined;
  return translateContinent(continent, lang);
}
