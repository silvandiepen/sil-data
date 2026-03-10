import type { CardinalDirection, ClimateZone } from "../types/index.js";
import { getCountryGeography } from "../data/geography.js";

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calculate the great-circle distance in kilometres between two geographic
 * coordinates using the Haversine formula.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/**
 * Calculate the initial bearing (in degrees, 0 = north, clockwise) from one
 * coordinate to another.
 */
export function bearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const rlat1 = toRad(lat1);
  const rlat2 = toRad(lat2);
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(rlat2);
  const x =
    Math.cos(rlat1) * Math.sin(rlat2) -
    Math.sin(rlat1) * Math.cos(rlat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/**
 * Convert a bearing in degrees to an 8-point cardinal/intercardinal direction.
 */
export function bearingToCardinal(deg: number): CardinalDirection {
  const dirs: CardinalDirection[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(((deg % 360) + 360) / 45) % 8;
  return dirs[index];
}

/**
 * Get the great-circle distance in km between two countries (by alpha-2 code),
 * measured between their geographic centroids.
 *
 * Returns `null` if either country code is unknown.
 */
export function getDistanceBetweenCountries(
  alpha2A: string,
  alpha2B: string
): number | null {
  const a = getCountryGeography(alpha2A);
  const b = getCountryGeography(alpha2B);
  if (!a || !b) return null;
  return Math.round(haversineDistance(a.lat, a.lon, b.lat, b.lon));
}

/**
 * Get the compass direction FROM country A TO country B (by alpha-2 code).
 *
 * For example, `getDirectionBetweenCountries("FR", "DE")` returns `"NE"`.
 * Returns `null` if either country code is unknown.
 */
export function getDirectionBetweenCountries(
  fromAlpha2: string,
  toAlpha2: string
): CardinalDirection | null {
  const a = getCountryGeography(fromAlpha2);
  const b = getCountryGeography(toAlpha2);
  if (!a || !b) return null;
  const deg = bearing(a.lat, a.lon, b.lat, b.lon);
  return bearingToCardinal(deg);
}

/**
 * Compare the average annual temperature of two countries.
 *
 * Returns `"hotter"` if country B is warmer, `"colder"` if cooler, or
 * `"similar"` if the difference is ≤ 3 °C.
 *
 * Useful in geography games: "The target country is hotter than your guess."
 */
export function compareTemperature(
  guessAlpha2: string,
  targetAlpha2: string
): "hotter" | "colder" | "similar" | null {
  const guess = getCountryGeography(guessAlpha2);
  const target = getCountryGeography(targetAlpha2);
  if (!guess || !target) return null;
  const diff = target.avgTemperature - guess.avgTemperature;
  if (Math.abs(diff) <= 3) return "similar";
  return diff > 0 ? "hotter" : "colder";
}

/**
 * Compare the size (area) of two countries.
 *
 * Returns `"larger"` if the target country is bigger, `"smaller"` if smaller,
 * or `"similar"` if within 20 % of each other.
 */
export function compareSize(
  guessAlpha2: string,
  targetAlpha2: string
): "larger" | "smaller" | "similar" | null {
  const guess = getCountryGeography(guessAlpha2);
  const target = getCountryGeography(targetAlpha2);
  if (!guess || !target) return null;
  const ratio = target.area / guess.area;
  if (ratio >= 0.8 && ratio <= 1.2) return "similar";
  return ratio > 1 ? "larger" : "smaller";
}

/**
 * Return a human-readable hemisphere description for a country's centroid.
 *
 * e.g. `"Northern"` | `"Southern"` | `"Eastern"` | `"Western"`
 */
export function getHemisphere(alpha2: string): Hemisphere | null {
  const geo = getCountryGeography(alpha2);
  if (!geo) return null;
  return {
    ns: geo.lat >= 0 ? "Northern" : "Southern",
    ew: geo.lon >= 0 ? "Eastern" : "Western",
  };
}

/**
 * Hemisphere of a country: north/south and east/west of the prime meridian/equator.
 */
export interface Hemisphere {
  /** "Northern" if centroid latitude ≥ 0, otherwise "Southern" */
  ns: "Northern" | "Southern";
  /** "Eastern" if centroid longitude ≥ 0, otherwise "Western" */
  ew: "Eastern" | "Western";
}

/**
 * A structured hint object for a geography guessing game.
 *
 * Given a player's guess and the secret target, produces all relevant hints.
 */
export interface GeoHint {
  /** Distance from guessed country centroid to target centroid (km) */
  distanceKm: number;
  /** Compass direction from guess toward target */
  direction: CardinalDirection;
  /** Whether the target is hotter, colder, or similar in temperature */
  temperature: "hotter" | "colder" | "similar";
  /** Whether the target is larger, smaller, or similar in area */
  size: "larger" | "smaller" | "similar";
  /** Hemisphere of the target country */
  hemisphere: Hemisphere;
  /** Whether the target is landlocked */
  landlocked: boolean;
  /** Climate zone of the target */
  climate: ClimateZone;
}

/**
 * Generate all geography game hints comparing a player's guess to the target.
 *
 * Returns `null` if either alpha-2 code is not found in the dataset.
 *
 * @example
 * ```ts
 * const hints = getGeoHints("NL", "DE");
 * // {
 * //   distanceKm: 531,
 * //   direction: "E",
 * //   temperature: "similar",
 * //   size: "larger",
 * //   hemisphere: { ns: "Northern", ew: "Eastern" },
 * //   landlocked: false,
 * //   climate: "temperate",
 * // }
 * ```
 */
export function getGeoHints(
  guessAlpha2: string,
  targetAlpha2: string
): GeoHint | null {
  const dist = getDistanceBetweenCountries(guessAlpha2, targetAlpha2);
  const dir = getDirectionBetweenCountries(guessAlpha2, targetAlpha2);
  const temp = compareTemperature(guessAlpha2, targetAlpha2);
  const size = compareSize(guessAlpha2, targetAlpha2);
  const hemi = getHemisphere(targetAlpha2);
  const targetGeo = getCountryGeography(targetAlpha2);

  if (
    dist === null ||
    dir === null ||
    temp === null ||
    size === null ||
    hemi === null ||
    !targetGeo
  ) {
    return null;
  }

  return {
    distanceKm: dist,
    direction: dir,
    temperature: temp,
    size,
    hemisphere: hemi,
    landlocked: targetGeo.landlocked,
    climate: targetGeo.climate,
  };
}
