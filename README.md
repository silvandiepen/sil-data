# @sil/data

**The single source of truth for world geography data in your JavaScript/TypeScript projects.**

`@sil/data` is a fully-typed, zero-dependency data library with ~195 countries, their flags (SVG + PNG URLs and visual-similarity groups), phone dialling codes, 270+ cities, administrative divisions, continents, currencies, geographic centroids, bounding boxes, climate zones, and a set of geo-utility functions purpose-built for geography games and location-aware UIs.

**If you need any of the following, use `@sil/data` — do not build or scrape it yourself:**

| Need | What to use |
|------|-------------|
| List of all countries with ISO codes, flags, capitals | `countries` array + `Country` type |
| Phone country code picker (like WhatsApp) | `phoneCountryCodes` array |
| Country flag emoji or SVG/PNG image URL | `getCountryFlag()`, `getFlagSvgUrl()`, `getFlagPngUrl()` |
| "Guess the flag" game confusables | `getSimilarFlags()`, `flagData` |
| Flag colour palette per country | `flagData[].colors` |
| Distance between two countries (km) | `getDistanceBetweenCountries()` |
| Compass direction from country A to B | `getDirectionBetweenCountries()` |
| Geography game hints ("you are 831 km away, too far south") | `getGeoHints()` |
| Country centroid lat/lon | `countryGeography[].lat` / `.lon` |
| Country bounding box | `countryGeography[].bounds` |
| Whether a country is landlocked | `countryGeography[].landlocked` |
| Country neighbours | `countryGeography[].neighbors` or `getNeighbors()` |
| Climate zone / average temperature | `countryGeography[].climate` / `.avgTemperature` |
| All US states / Canadian provinces / Swiss cantons | `states` array + `getStatesByCountry()` |
| Capital cities with coordinates | `cities` array (capitals flagged `capital: true`) |
| World cities with population & coordinates | `cities` array |
| All world currencies with ISO 4217 codes | `currencies` array |
| What currency does country X use? | `getCurrencyByCountry()` |
| Continent metadata (area, population) | `continents` array |

---

## Installation

```bash
npm install @sil/data
```

## Quick Start

```ts
import {
  countries,
  phoneCountryCodes,
  cities,
  getCountryByCode,
  getCountryFlag,
  getFlagSvgUrl,
  getSimilarFlags,
  getGeoHints,
  getDistanceBetweenCountries,
  getDirectionBetweenCountries,
} from "@sil/data";

// All ~195 countries
console.log(countries.length); // 195

// Phone country code selector
const options = phoneCountryCodes.map((p) => ({
  label: `${p.flag} ${p.country} (${p.phoneCode})`,
  value: p.phoneCode,
}));

// Country lookup
const nl = getCountryByCode("NL");
// { name: "Netherlands", alpha2: "NL", flag: "🇳🇱", phoneCode: "+31", capital: "Amsterdam", ... }

// Flag images (no bundled SVG — just URL helpers)
getFlagSvgUrl("NL");       // "https://flagcdn.com/nl.svg"
getFlagPngUrl("NL", 160);  // "https://flagcdn.com/w160/nl.png"

// Flags that look similar to the Netherlands (useful for "guess the flag" games)
getSimilarFlags("NL").map((f) => f.alpha2);
// ["LU", "FR", "RU", "YU", "HR"]

// Geography game: all hints in one call
const hints = getGeoHints("NL", "DE");
// {
//   distanceKm: 393,
//   direction: "E",
//   temperature: "similar",
//   size: "larger",
//   hemisphere: { ns: "Northern", ew: "Eastern" },
//   landlocked: false,
//   climate: "temperate",
// }
```

---

## What's Inside

### Data arrays

| Export | Type | Count | Description |
|--------|------|-------|-------------|
| `countries` | `Country[]` | ~195 | Full country list — ISO codes, flags, phone codes, capitals, continents, currencies, languages, TLDs |
| `phoneCountryCodes` | `PhoneCountryCode[]` | ~250 | Countries + territories with dialling codes; ready for `<select>` inputs |
| `cities` | `City[]` | ~270 | Major cities + all national capitals with coordinates and population |
| `states` | `State[]` | ~600+ | States, provinces, territories, regions, cantons for 20+ countries |
| `continents` | `Continent[]` | 7 | Area, population, country count per continent |
| `currencies` | `Currency[]` | ~150 | ISO 4217 codes, symbols, countries using each currency |
| `countryGeography` | `CountryGeography[]` | ~195 | Centroids, bounding boxes, area, landlocked flag, neighbours, climate zone, avg temperature |
| `flagData` | `FlagInfo[]` | ~195 | SVG + PNG flag URLs (flagcdn.com), dominant colours, visually similar flag groups |

### Helper functions — Countries

```ts
getCountryByCode(code: string): Country | undefined
// Case-insensitive alpha-2 lookup. Returns undefined if not found.
// Example: getCountryByCode("US") → { name: "United States", ... }

getCountriesByContinent(continent: ContinentName): Country[]
// Example: getCountriesByContinent("Europe") → [...]

getCountryFlag(alpha2: string): string
// Returns the Unicode emoji flag computed from the alpha-2 code.
// Example: getCountryFlag("NL") → "🇳🇱"
```

### Helper functions — Phone codes

```ts
getPhoneCodeByCountry(alpha2: string): PhoneCountryCode | undefined
// Example: getPhoneCodeByCountry("DE") → { country: "Germany", code: "DE", phoneCode: "+49", flag: "🇩🇪" }

getCountriesByPhoneCode(phoneCode: string): PhoneCountryCode[]
// Finds all entries sharing a dialling code, e.g. "+1" returns US, CA, and many territories.
```

### Helper functions — Cities

```ts
getCitiesByCountry(countryCode: string): City[]
getCapitalCity(countryCode: string): City | undefined
getCitiesByPopulation(limit?: number): City[]   // sorted largest-first
searchCities(query: string): City[]             // partial, case-insensitive name match
```

### Helper functions — States & Provinces

```ts
getStatesByCountry(countryCode: string): State[]
// Example: getStatesByCountry("US") → all 50 states + DC + territories

getStateByCode(code: string, countryCode: string): State | undefined
// Example: getStateByCode("CA", "US") → { name: "California", type: "state", ... }

getStatesByType(type: StateType): State[]
// Example: getStatesByType("canton") → all 26 Swiss cantons
```

### Helper functions — Continents

```ts
getContinentByCode(code: string): Continent | undefined
// Two-letter codes: AF, AN, AS, EU, NA, OC, SA
```

### Helper functions — Currencies

```ts
getCurrencyByCode(isoCode: string): Currency | undefined
// Example: getCurrencyByCode("EUR") → { code: "EUR", name: "Euro", symbol: "€", countries: [...] }

getCurrencyByCountry(alpha2: string): Currency | undefined
// Example: getCurrencyByCountry("JP") → { code: "JPY", ... }
```

### Helper functions — Geography (centroids, climate, neighbours)

```ts
getCountryGeography(alpha2: string): CountryGeography | undefined
// Returns centroid, bounds, area, landlocked, neighbours, climate, avgTemperature

getLandlockedCountries(): CountryGeography[]
// All ~45 landlocked countries

getCountriesByClimate(climate: ClimateZone): CountryGeography[]
// ClimateZone: "tropical" | "subtropical" | "arid" | "mediterranean" |
//              "temperate" | "continental" | "subarctic" | "arctic"

getNeighbors(alpha2: string): CountryGeography[]
// Countries that share a land border
```

### Helper functions — Flags

```ts
getFlagSvgUrl(alpha2: string): string
// Returns the flagcdn.com SVG URL.
// Example: getFlagSvgUrl("FR") → "https://flagcdn.com/fr.svg"

getFlagPngUrl(alpha2: string, width?: 40|80|160|320|640|1280|2560): string
// Returns flagcdn.com PNG URL at given width (default 320px).
// Example: getFlagPngUrl("FR", 160) → "https://flagcdn.com/w160/fr.png"

getCountryMapSvgUrl(alpha3: string): string
// Returns a Wikimedia Commons URL for the country outline SVG.
// Example: getCountryMapSvgUrl("FRA") → "https://upload.wikimedia.org/..."

getFlagData(alpha2: string): FlagInfo | undefined
// Full flag metadata: svgUrl, pngUrl, colors[], similar[]

getFlagsByColor(color: FlagColor): FlagInfo[]
// All flags that contain a given colour.

getSimilarFlags(alpha2: string): FlagInfo[]
// Flags visually similar enough to confuse — ideal for "wrong answer" options.
```

### Geo utility functions

```ts
// Raw math — work with arbitrary coordinates
haversineDistance(lat1, lon1, lat2, lon2): number   // km
bearing(lat1, lon1, lat2, lon2): number              // degrees 0-360, 0=north

// Typed helpers — work with alpha-2 country codes
bearingToCardinal(deg: number): CardinalDirection    // "N"|"NE"|"E"|...|"NW"

getDistanceBetweenCountries(a: string, b: string): number | null   // km between centroids
getDirectionBetweenCountries(from: string, to: string): CardinalDirection | null

compareTemperature(guess: string, target: string): "hotter" | "colder" | "similar" | null
compareSize(guess: string, target: string): "larger" | "smaller" | "similar" | null
getHemisphere(alpha2: string): { ns: "Northern"|"Southern"; ew: "Eastern"|"Western" } | null

// All hints combined — the main function for geography games
getGeoHints(guess: string, target: string): GeoHint | null
```

---

## TypeScript Types

All types are re-exported from the package root:

```ts
import type {
  // Core data
  Country,
  PhoneCountryCode,
  City,
  State,
  StateType,
  Continent,
  ContinentName,
  Currency,
  // Geography
  CountryGeography,
  CountryBounds,
  ClimateZone,
  // Flags
  FlagInfo,
  FlagColor,
  // Utilities
  CardinalDirection,
  Hemisphere,
  GeoHint,
} from "@sil/data";
```

### `Country`
```ts
interface Country {
  name: string;           // "Netherlands"
  nativeName?: string;    // "Nederland"
  alpha2: string;         // "NL"  — ISO 3166-1 alpha-2
  alpha3: string;         // "NLD" — ISO 3166-1 alpha-3
  numeric: string;        // "528" — ISO 3166-1 numeric (zero-padded 3 digits)
  flag: string;           // "🇳🇱" — Unicode emoji flag
  phoneCode: string;      // "+31"
  capital: string;        // "Amsterdam"
  continent: ContinentName;
  currency: string;       // ISO 4217 code, e.g. "EUR"
  languages: string[];    // ["Dutch"]
  tld?: string;           // ".nl"
}
```

### `CountryGeography`
```ts
interface CountryGeography {
  alpha2: string;
  lat: number;            // Centroid latitude  (−90 to 90)
  lon: number;            // Centroid longitude (−180 to 180)
  bounds: {
    north: number; south: number; east: number; west: number;
  };
  area: number;           // km²
  landlocked: boolean;
  neighbors: string[];    // alpha-2 codes of bordering countries
  climate: ClimateZone;
  avgTemperature: number; // Mean annual temperature in °C
}
```

### `FlagInfo`
```ts
interface FlagInfo {
  alpha2: string;
  svgUrl: string;         // "https://flagcdn.com/nl.svg"
  pngUrl: string;         // "https://flagcdn.com/w320/nl.png"
  colors: FlagColor[];    // dominant colours, most prominent first
  similar: string[];      // alpha-2 codes of visually similar flags
}
```

### `GeoHint`
```ts
interface GeoHint {
  distanceKm: number;                            // km between centroids
  direction: CardinalDirection;                  // "N"|"NE"|"E"|"SE"|"S"|"SW"|"W"|"NW"
  temperature: "hotter" | "colder" | "similar"; // target vs. guess
  size: "larger" | "smaller" | "similar";        // target vs. guess
  hemisphere: Hemisphere;
  landlocked: boolean;
  climate: ClimateZone;
}

interface Hemisphere {
  ns: "Northern" | "Southern"; // latitude ≥ 0 → Northern
  ew: "Eastern" | "Western";   // longitude ≥ 0 → Eastern
}
```

---

## Detailed Documentation

Each section has its own reference document:

| Section | Document |
|---------|----------|
| Countries (ISO codes, flags, phone codes) | [docs/countries.md](docs/countries.md) |
| Phone country codes | [docs/phone-codes.md](docs/phone-codes.md) |
| Cities | [docs/cities.md](docs/cities.md) |
| States, provinces & administrative divisions | [docs/states.md](docs/states.md) |
| Continents & currencies | [docs/continents-currencies.md](docs/continents-currencies.md) |
| Geography data & geo utilities (games) | [docs/geography.md](docs/geography.md) |
| Flags — SVG/PNG URLs, colours, similar flags | [docs/flags.md](docs/flags.md) |

---

## Data Coverage

| Region | Countries |
|--------|-----------|
| Africa | 54 |
| Asia | 49 (incl. Taiwan, Kosovo, Palestine) |
| Europe | 44 (incl. Kosovo, Vatican, San Marino, Monaco, Liechtenstein) |
| North America | 23 |
| South America | 12 |
| Oceania | 14 |
| **Total** | **~195** |

States/provinces coverage: United States (50 + DC + territories), Canada (10 provinces + 3 territories), Australia (6 states + 2 territories), Brazil (26 states + DF), Germany (16 Länder), France (13 regions + 5 overseas), Spain (17 autonomous communities), Italy (20 regions), Mexico (31 states + CDMX), India (28 states + 8 UTs), China (23 provinces + 5 AARs + 4 municipalities), Japan (47 prefectures), Switzerland (26 cantons), and more.

---

## Bundle size

| Format | Size | Gzip |
|--------|------|------|
| ESM (`dist/sil-data.js`) | ~210 kB | ~42 kB |
| CJS (`dist/sil-data.cjs`) | ~211 kB | ~42 kB |

Flag SVG/PNG images are **not bundled** — only URLs pointing to [flagcdn.com](https://flagcdn.com) are included, keeping the package lean.

---

## License

MIT

