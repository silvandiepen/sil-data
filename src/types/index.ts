/**
 * Represents a country with standard ISO codes and metadata.
 */
export interface Country {
  /** Full official name of the country */
  name: string;
  /** Common/short name of the country */
  nativeName?: string;
  /** ISO 3166-1 alpha-2 code (e.g., "US") */
  alpha2: string;
  /** ISO 3166-1 alpha-3 code (e.g., "USA") */
  alpha3: string;
  /** ISO 3166-1 numeric code (e.g., "840") */
  numeric: string;
  /** Unicode emoji flag */
  flag: string;
  /** International dialing code (e.g., "+1") */
  phoneCode: string;
  /** Capital city name */
  capital: string;
  /** Continent name */
  continent: ContinentName;
  /** ISO 4217 currency code (e.g., "USD") */
  currency: string;
  /** Primary language(s) spoken */
  languages: string[];
  /** Top-level domain (e.g., ".us") */
  tld?: string;
}

/**
 * Continent names
 */
export type ContinentName =
  | "Africa"
  | "Antarctica"
  | "Asia"
  | "Europe"
  | "North America"
  | "Oceania"
  | "South America";

/**
 * Phone country code entry, suitable for use in phone number inputs.
 */
export interface PhoneCountryCode {
  /** Country name */
  country: string;
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** International dialing code with + prefix (e.g., "+1") */
  phoneCode: string;
  /** Unicode emoji flag */
  flag: string;
  /** Example number format (without country code) */
  example?: string;
}

/**
 * Represents a city with geographic and demographic data.
 */
export interface City {
  /** City name */
  name: string;
  /** ISO 3166-1 alpha-2 country code */
  country: string;
  /** State, province, or region */
  state?: string;
  /** Approximate population */
  population?: number;
  /** Latitude */
  lat: number;
  /** Longitude */
  lon: number;
  /** Whether this is the capital of the country */
  capital?: boolean;
}

/**
 * Represents a state, province, or other administrative division.
 */
export interface State {
  /** Full name of the state/province */
  name: string;
  /** State/province abbreviation code */
  code: string;
  /** ISO 3166-1 alpha-2 country code */
  country: string;
  /** Type of administrative division */
  type: StateType;
}

/**
 * Types of administrative divisions
 */
export type StateType =
  | "state"
  | "province"
  | "territory"
  | "autonomous region"
  | "district"
  | "department"
  | "region"
  | "county"
  | "emirate"
  | "canton";

/**
 * Continent with metadata
 */
export interface Continent {
  /** Continent name */
  name: ContinentName;
  /** Two-letter continent code */
  code: string;
  /** Approximate population */
  population: number;
  /** Area in square kilometers */
  area: number;
  /** Number of countries */
  countries: number;
}

/**
 * Currency information
 */
export interface Currency {
  /** ISO 4217 currency code */
  code: string;
  /** Currency name */
  name: string;
  /** Currency symbol */
  symbol: string;
  /** Countries using this currency (alpha-2 codes) */
  countries: string[];
}

/**
 * Climate zones based on the Köppen climate classification (simplified).
 */
export type ClimateZone =
  | "tropical"
  | "subtropical"
  | "arid"
  | "mediterranean"
  | "temperate"
  | "continental"
  | "subarctic"
  | "arctic";

/**
 * Geographic bounding box of a country.
 */
export interface CountryBounds {
  /** Northernmost latitude */
  north: number;
  /** Southernmost latitude */
  south: number;
  /** Easternmost longitude */
  east: number;
  /** Westernmost longitude */
  west: number;
}

/**
 * Geographic and climate data for a country, useful for geography games.
 */
export interface CountryGeography {
  /** ISO 3166-1 alpha-2 code */
  alpha2: string;
  /** Centroid latitude of the country */
  lat: number;
  /** Centroid longitude of the country */
  lon: number;
  /** Approximate bounding box */
  bounds: CountryBounds;
  /** Land area in km² */
  area: number;
  /** Whether the country is landlocked (has no coastline) */
  landlocked: boolean;
  /** Neighboring country alpha-2 codes */
  neighbors: string[];
  /** Primary climate zone */
  climate: ClimateZone;
  /** Average annual temperature in Celsius */
  avgTemperature: number;
}

/**
 * Primary colors that can appear on a country flag.
 */
export type FlagColor =
  | "red"
  | "dark-red"
  | "white"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "black"
  | "gold"
  | "light-blue"
  | "dark-blue"
  | "dark-green"
  | "purple"
  | "brown";

/**
 * Flag metadata for a country, including visual similarity data for geography games.
 */
export interface FlagInfo {
  /** ISO 3166-1 alpha-2 code */
  alpha2: string;
  /** URL to SVG flag image (via flagcdn.com) */
  svgUrl: string;
  /** URL to a 4×3 PNG flag image (via flagcdn.com) */
  pngUrl: string;
  /** Primary colors present on the flag (up to 4, most prominent first) */
  colors: FlagColor[];
  /**
   * Alpha-2 codes of countries whose flags look visually similar.
   * Useful for building "guess the flag" games with confusing options.
   */
  similar: string[];
}

/**
 * 8-point cardinal / intercardinal compass directions.
 */
export type CardinalDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
