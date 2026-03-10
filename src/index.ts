/**
 * @sil/data
 *
 * A comprehensive collection of reusable world data:
 * countries, phone codes, flags, cities, states, provinces, currencies, and more.
 *
 * @example
 * ```ts
 * import { phoneCountryCodes, countries, cities } from "@sil/data";
 *
 * // Use phone country codes in a select input
 * const options = phoneCountryCodes.map(p => ({
 *   label: `${p.flag} ${p.country} (${p.phoneCode})`,
 *   value: p.phoneCode,
 * }));
 * ```
 */

// Types
export type {
  Country,
  PhoneCountryCode,
  City,
  State,
  StateType,
  Continent,
  ContinentName,
  Currency,
} from "./types/index.js";

// Countries
export {
  countries,
  getCountryByCode,
  getCountriesByContinent,
  getCountryFlag,
} from "./data/countries.js";

// Phone country codes
export {
  phoneCountryCodes,
  getPhoneCodeByCountry,
  getCountriesByPhoneCode,
} from "./data/phoneCodes.js";

// Cities
export {
  cities,
  getCitiesByCountry,
  getCapitalCity,
  getCitiesByPopulation,
  searchCities,
} from "./data/cities.js";

// States and provinces
export {
  states,
  getStatesByCountry,
  getStateByCode,
  getStatesByType,
} from "./data/states.js";

// Continents
export { continents, getContinentByCode } from "./data/continents.js";

// Currencies
export {
  currencies,
  getCurrencyByCode,
  getCurrencyByCountry,
} from "./data/currencies.js";
