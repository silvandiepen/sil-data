/**
 * Individual country SVG map utilities.
 *
 * Provides functions to render a standalone SVG for a single country, using
 * the bundled world-map path data for the country outline and the bundled
 * cities dataset for optional city markers.  The viewBox is automatically
 * derived from the country's geographic bounding box stored in the geography
 * dataset.
 *
 * For maps that also show administrative subdivision (province / state)
 * boundaries, use {@link getCountrySubdivisionMapUrl} to obtain a reference
 * URL pointing to an external source – those boundaries are not bundled in
 * this package.
 *
 * @example
 * ```ts
 * import { getCountrySvg } from "@sil/data";
 *
 * // Render Germany with city markers
 * document.getElementById("map").innerHTML = getCountrySvg("DE", {
 *   fill: "#4a90e2",
 *   stroke: "#ffffff",
 * });
 *
 * // Render France without city markers
 * document.getElementById("map").innerHTML = getCountrySvg("FR", {
 *   showCities: false,
 * });
 * ```
 */

import type { CountryMapOptions } from "../types/index.js";
import { getCountryMapData } from "./worldMap.js";
import { getCitiesByCountry } from "./cities.js";
import { getCountryGeography } from "./geography.js";

// World map SVG canvas dimensions (matching WORLD_MAP_VIEWBOX in worldMap.ts).
const WORLD_MAP_WIDTH = 2000;
const WORLD_MAP_HEIGHT = 857;

/**
 * Default styling and display options for single-country SVG maps.
 */
export const COUNTRY_MAP_DEFAULTS: Required<CountryMapOptions> = {
  fill: "#d0d0d0",
  stroke: "#ffffff",
  strokeWidth: 0.5,
  width: "100%",
  height: "auto",
  className: "",
  showCities: true,
  cityColor: "#555555",
  capitalColor: "#cc2222",
  cityRadius: 3,
  capitalRadius: 5,
  padding: 5,
};

/**
 * Convert geographic coordinates (latitude / longitude) to the SVG coordinate
 * system used by the bundled world-map path data.
 *
 * The world map uses a simple equirectangular projection scaled to a
 * 2000 × 857 canvas (matching `WORLD_MAP_VIEWBOX`).
 *
 * @param lat Latitude in decimal degrees (−90 … +90)
 * @param lon Longitude in decimal degrees (−180 … +180)
 * @returns `{ x, y }` in world-map SVG units.
 *
 * @example
 * const { x, y } = latLonToMapPoint(52.52, 13.41); // Berlin, Germany
 */
export function latLonToMapPoint(lat: number, lon: number): { x: number; y: number } {
  return {
    x: (lon + 180) * (WORLD_MAP_WIDTH / 360),
    y: (90 - lat) * (WORLD_MAP_HEIGHT / 180),
  };
}

/**
 * Return an external URL for a country's administrative-subdivision map.
 *
 * The URL points to a Wikimedia Commons PNG rendering (800 px wide) of the
 * corresponding SVG map file.  These maps typically include province, state,
 * or region boundaries.  The image is **not bundled** in this package – it is
 * fetched at runtime from Wikimedia servers.
 *
 * **Note:** Wikimedia Commons SVG thumbnails require a hash-based path for
 * most files.  This helper uses the same simplified URL convention that is
 * already in use in the `flags` module (`getCountryMapSvgUrl`).  If a
 * particular country's map file is not served at this path, the URL may
 * return a 404; in that case, use the Wikimedia Commons search page for
 * `"administrative divisions map of {country name}"` to find the correct file.
 *
 * @param alpha3 ISO 3166-1 alpha-3 code (case-insensitive, e.g. `"DEU"`, `"usa"`)
 * @returns A reference URL string – not guaranteed to resolve for every country.
 *
 * @example
 * getCountrySubdivisionMapUrl("DEU");
 * // → "https://upload.wikimedia.org/wikipedia/commons/thumb/maps/DEU.svg/800px-DEU.svg.png"
 */
export function getCountrySubdivisionMapUrl(alpha3: string): string {
  const code = alpha3.toUpperCase();
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/maps/${code}.svg/800px-${code}.svg.png`;
}

/**
 * Render a standalone SVG string for a single country.
 *
 * The SVG shows:
 * - The country's outline, drawn from the bundled world-map vector paths.
 * - Optional city markers (dots) for every city in the bundled cities dataset
 *   that belongs to this country.  Capital cities use a distinct colour and a
 *   slightly larger dot.
 *
 * Each country `<path>` element receives:
 * - `id` — ISO alpha-2 code, e.g. `id="DE"`
 * - `data-code` — same code
 * - `data-name` — human-readable country name
 *
 * Each city `<circle>` element receives:
 * - `data-city` — city name
 * - `data-capital="true"` — only present for the capital city
 *
 * @param alpha2  ISO 3166-1 alpha-2 code (case-insensitive, e.g. `"DE"`, `"us"`)
 * @param options Optional styling / display overrides.
 * @returns A complete `<svg>…</svg>` string, or `null` if the country code is
 *   unknown or has no drawable path data.
 *
 * @example
 * const svg = getCountrySvg("JP", { fill: "#e8f4f8", capitalColor: "#e24a4a" });
 * document.getElementById("map")!.innerHTML = svg ?? "";
 */
export function getCountrySvg(alpha2: string, options: CountryMapOptions = {}): string | null {
  const opts: Required<CountryMapOptions> = { ...COUNTRY_MAP_DEFAULTS, ...options };
  const code = alpha2.toUpperCase();

  const countryData = getCountryMapData(code);
  if (!countryData || countryData.paths.length === 0) return null;

  const geo = getCountryGeography(code);
  if (!geo) return null;

  // Derive a tight viewBox from the country's geographic bounding box.
  const { x: x1, y: y1 } = latLonToMapPoint(geo.bounds.north, geo.bounds.west);
  const { x: x2, y: y2 } = latLonToMapPoint(geo.bounds.south, geo.bounds.east);

  const minX = Math.min(x1, x2) - opts.padding;
  const minY = Math.min(y1, y2) - opts.padding;
  const boxW  = Math.abs(x2 - x1) + opts.padding * 2;
  const boxH  = Math.abs(y2 - y1) + opts.padding * 2;
  const viewBox = `${minX.toFixed(1)} ${minY.toFixed(1)} ${boxW.toFixed(1)} ${boxH.toFixed(1)}`;

  // Render country outline paths.
  const pathsHtml = countryData.paths
    .map((d, i) => {
      const attrs = i === 0
        ? ` id="${code}" data-code="${code}" data-name="${countryData.name}"`
        : ` data-code="${code}"`;
      return `<path${attrs} d="${d}" fill="${opts.fill}" stroke="${opts.stroke}" stroke-width="${opts.strokeWidth}"/>`;
    })
    .join("\n  ");

  // Render city markers (if requested).
  let cityMarkersHtml = "";
  if (opts.showCities) {
    const citiesForCountry = getCitiesByCountry(code);
    cityMarkersHtml = citiesForCountry
      .map(city => {
        const { x, y } = latLonToMapPoint(city.lat, city.lon);
        const isCapital = city.capital === true;
        const r     = isCapital ? opts.capitalRadius : opts.cityRadius;
        const color = isCapital ? opts.capitalColor  : opts.cityColor;
        const capitalAttr = isCapital ? ' data-capital="true"' : "";
        return (
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"` +
          ` data-city="${city.name}"${capitalAttr}>` +
          `<title>${city.name}${isCapital ? " (capital)" : ""}</title>` +
          `</circle>`
        );
      })
      .join("\n  ");
  }

  const svgClass = opts.className ? ` class="${opts.className}"` : "";
  const body = cityMarkersHtml
    ? `  ${pathsHtml}\n  ${cityMarkersHtml}`
    : `  ${pathsHtml}`;

  return (
    `<svg\n` +
    `  xmlns="http://www.w3.org/2000/svg"\n` +
    `  viewBox="${viewBox}"\n` +
    `  width="${opts.width}"\n` +
    `  height="${opts.height}"${svgClass}\n` +
    `  role="img"\n` +
    `  aria-label="${countryData.name} map">\n` +
    `${body}\n` +
    `</svg>`
  );
}
