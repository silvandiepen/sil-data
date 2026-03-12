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
  CountryGeography,
  CountryBounds,
  ClimateZone,
  FlagInfo,
  FlagColor,
  CardinalDirection,
  WorldMapCountry,
  WorldMapOptions,
  WorldMapHighlight,
  CountryMapOptions,
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

// Country geography (centroids, bounds, area, climate, neighbours)
export {
  countryGeography,
  getCountryGeography,
  getLandlockedCountries,
  getCountriesByClimate,
  getNeighbors,
} from "./data/geography.js";

// Flag metadata (SVG URLs, colours, similar flags)
export {
  flagData,
  getFlagData,
  getFlagsByColor,
  getSimilarFlags,
  getFlagSvgUrl,
  getFlagPngUrl,
  getCountryMapSvgUrl,
} from "./data/flags.js";

// Geo utilities for geography games
export {
  haversineDistance,
  bearing,
  bearingToCardinal,
  getDistanceBetweenCountries,
  getDirectionBetweenCountries,
  compareTemperature,
  compareSize,
  getHemisphere,
  getGeoHints,
} from "./utils/geo.js";

export type { GeoHint, Hemisphere } from "./utils/geo.js";

// World map SVG – path data and rendering helpers
export {
  WORLD_MAP_VIEWBOX,
  WORLD_MAP_DEFAULTS,
  worldMapCountries,
  getCountryMapData,
  searchWorldMapCountries,
  getWorldMapSvg,
  highlightCountries,
  colorizeWorldMap,
} from "./data/worldMap.js";

// Individual country SVG maps
export {
  COUNTRY_MAP_DEFAULTS,
  latLonToMapPoint,
  getCountrySvg,
  getCountrySubdivisionMapUrl,
} from "./data/countryMaps.js";
