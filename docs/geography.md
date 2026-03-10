# Geography Data & Geo Utilities

[← Back to README](../README.md)

`@sil/data` includes a complete geographic dataset for every country and a set of utility functions designed for **geography games** (Wordle-style country guessing, atlas quizzes, educational tools) and **location-aware UIs**.

## Import

```ts
import {
  // Data
  countryGeography,
  // Lookup helpers
  getCountryGeography,
  getLandlockedCountries,
  getCountriesByClimate,
  getNeighbors,
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
} from "@sil/data";

import type {
  CountryGeography,
  CountryBounds,
  ClimateZone,
  CardinalDirection,
  GeoHint,
} from "@sil/data";
```

---

## Country Geography Data

### Data shape

```ts
interface CountryGeography {
  alpha2: string;       // "DE"
  lat: number;          // Centroid latitude  — geographic centre of the country
  lon: number;          // Centroid longitude
  bounds: {
    north: number;      // Northernmost point
    south: number;      // Southernmost point
    east: number;       // Easternmost point
    west: number;       // Westernmost point
  };
  area: number;         // Land area in km²
  landlocked: boolean;  // true if the country has no coastline
  neighbors: string[];  // Alpha-2 codes of bordering countries
  climate: ClimateZone; // Simplified Köppen classification
  avgTemperature: number; // Mean annual temperature in °C
}

type ClimateZone =
  | "tropical"       // Near equator, high humidity, >18 °C year-round
  | "subtropical"    // 15–30° latitude, warm, seasonal rainfall
  | "arid"           // Desert / semi-arid, low precipitation
  | "mediterranean"  // Hot dry summers, mild wet winters
  | "temperate"      // Moderate seasons, adequate rainfall
  | "continental"    // Cold winters, warm summers, interior regions
  | "subarctic"      // Very cold winters, short summers
  | "arctic";        // Polar, permanent ice/snow
```

### Accessing geography data

```ts
import { getCountryGeography, countryGeography } from "@sil/data";

// Look up by alpha-2
const de = getCountryGeography("DE");
// {
//   alpha2: "DE",
//   lat: 51.17, lon: 10.45,
//   bounds: { north: 55.06, south: 47.27, east: 15.04, west: 5.99 },
//   area: 357114,
//   landlocked: false,
//   neighbors: ["DK","NL","BE","LU","FR","CH","AT","CZ","PL"],
//   climate: "temperate",
//   avgTemperature: 9,
// }

// Full array
console.log(countryGeography.length); // ~195
```

### Landlocked countries

```ts
import { getLandlockedCountries } from "@sil/data";

const landlocked = getLandlockedCountries();
const codes = landlocked.map(g => g.alpha2);
// ["AF", "AD", "AM", "AT", "AZ", "BY", "BT", "BO", "BW", "BF", "BI",
//  "CF", "TD", "CZ", "ET", "HU", "KZ", "XK", "KG", "LA", "LS", "LI",
//  "LT", "LU", "MW", "ML", "MD", "MN", "NP", "NE", "MK", "PY", "RW",
//  "SM", "RS", "SK", "SS", "SZ", "CH", "TJ", "TM", "UG", "UZ", "VA",
//  "ZM", "ZW"]  — ~45 countries
```

### Countries by climate zone

```ts
import { getCountriesByClimate } from "@sil/data";

// Tropical countries
getCountriesByClimate("tropical").map(g => g.alpha2);
// ["AO", "BJ", "BF", "BI", "CM", "CF", "CI", "CD", "CG", "ET", ...]

// Countries with arctic climate
getCountriesByClimate("arctic");
// Polar/extreme-north countries
```

### Neighbouring countries

```ts
import { getNeighbors } from "@sil/data";

const franceNeighbors = getNeighbors("FR");
// Returns CountryGeography[] for: ES, AD, MC, IT, CH, DE, LU, BE

// Island countries return []
getNeighbors("JP"); // []
getNeighbors("AU"); // []
```

---

## Geo Utility Functions

### Distance between countries

```ts
import { getDistanceBetweenCountries, haversineDistance } from "@sil/data";

// By alpha-2 code (uses country centroids)
getDistanceBetweenCountries("NL", "DE"); // ~393 km
getDistanceBetweenCountries("US", "AU"); // ~15,200 km
getDistanceBetweenCountries("FR", "FR"); // 0
getDistanceBetweenCountries("XX", "DE"); // null — unknown code

// Raw coordinates
haversineDistance(52.37, 4.90, 52.52, 13.40); // Amsterdam → Berlin ≈ 577 km
```

### Direction between countries

```ts
import {
  getDirectionBetweenCountries,
  bearing,
  bearingToCardinal,
} from "@sil/data";

// By alpha-2 code
getDirectionBetweenCountries("FR", "DE"); // "NE"
getDirectionBetweenCountries("US", "GB"); // "NE"
getDirectionBetweenCountries("AU", "NZ"); // "E"
getDirectionBetweenCountries("XX", "DE"); // null

// Raw bearing (degrees, 0 = north, clockwise)
const deg = bearing(52.37, 4.90, 52.52, 13.40); // ~88° (almost due east)
bearingToCardinal(deg);  // "E"

// CardinalDirection values
type CardinalDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
```

### Temperature comparison

```ts
import { compareTemperature } from "@sil/data";

compareTemperature("CA", "BR"); // "hotter"  — Brazil (24°C) vs Canada (-5°C)
compareTemperature("BR", "CA"); // "colder"
compareTemperature("FR", "DE"); // "similar" — both temperate, within 3 °C
compareTemperature("XX", "DE"); // null
```

Threshold: differences ≤ 3 °C return `"similar"`.

### Size comparison

```ts
import { compareSize } from "@sil/data";

compareSize("NL", "RU"); // "larger"   — Russia (17M km²) vs Netherlands (42k km²)
compareSize("RU", "NL"); // "smaller"
compareSize("DE", "FR"); // "similar"  — within 20% of each other
compareSize("XX", "DE"); // null
```

Threshold: area ratio within 0.8–1.2 returns `"similar"`.

### Hemisphere

```ts
import { getHemisphere } from "@sil/data";

getHemisphere("DE");
// { ns: "Northern", ew: "Eastern" }

getHemisphere("AR");
// { ns: "Southern", ew: "Western" }

getHemisphere("XX"); // null
```

---

## Geography Game Hints

`getGeoHints()` is the primary function for building Wordle-style geography games. Given a player's guess and the secret target country, it returns all relevant hints in one object.

```ts
import { getGeoHints } from "@sil/data";
import type { GeoHint } from "@sil/data";

interface GeoHint {
  distanceKm: number;                              // km between centroids
  direction: CardinalDirection;                    // "N"|"NE"|"E"|"SE"|"S"|"SW"|"W"|"NW"
  temperature: "hotter" | "colder" | "similar";   // target vs. guess
  size: "larger" | "smaller" | "similar";          // target vs. guess
  hemisphere: { ns: "Northern"|"Southern"; ew: "Eastern"|"Western" };
  landlocked: boolean;                             // is the target landlocked?
  climate: ClimateZone;                            // target's climate zone
}
```

### Example: single guess

```ts
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

### Example: geography guessing game loop

```ts
import { countries, getGeoHints } from "@sil/data";

// Pick a random target country
const target = countries[Math.floor(Math.random() * countries.length)];

// Each round: player submits a guess
function processGuess(guessAlpha2: string) {
  const hints = getGeoHints(guessAlpha2, target.alpha2);
  if (!hints) return "Unknown country code";

  if (hints.distanceKm === 0) {
    return "🎉 Correct!";
  }

  return [
    `📍 ${hints.distanceKm.toLocaleString()} km away`,
    `🧭 Head ${hints.direction} (${cardinalToWord(hints.direction)})`,
    `🌡️ The target country is ${hints.temperature}`,
    `📐 The target country is ${hints.size}`,
    `🌍 ${hints.hemisphere.ns} ${hints.hemisphere.ew} hemisphere`,
    `🏔️ ${hints.landlocked ? "Landlocked" : "Has coastline"}`,
    `☀️ Climate: ${hints.climate}`,
  ].join("\n");
}

// Helper to expand a CardinalDirection abbreviation to a full word
function cardinalToWord(dir: string): string {
  const map: Record<string, string> = {
    N: "north", NE: "northeast", E: "east", SE: "southeast",
    S: "south", SW: "southwest", W: "west", NW: "northwest",
  };
  return map[dir] ?? dir;
}

// Player guesses France, target is Germany
processGuess("FR");
// 📍 393 km away
// 🧭 Head NE (northeast)
// 🌡️ The target country is similar
// 📐 The target country is similar
// 🌍 Northern Eastern hemisphere
// 🏔️ Has coastline
// ☀️ Climate: temperate
```

### Example: build hints sentence in natural language

```ts
import { getGeoHints, getCountryByCode } from "@sil/data";

function buildHintSentence(guess: string, target: string): string {
  const hints = getGeoHints(guess, target);
  const targetCountry = getCountryByCode(target);
  if (!hints || !targetCountry) return "";

  const parts: string[] = [];
  parts.push(`You are ${hints.distanceKm.toLocaleString()} km away.`);
  parts.push(`The target country is to the ${hints.direction}.`);
  if (hints.temperature !== "similar") {
    parts.push(`It is a ${hints.temperature} country than your guess.`);
  }
  if (hints.landlocked) {
    parts.push("It is landlocked.");
  }
  return parts.join(" ");
}

buildHintSentence("NL", "MN");
// "You are 7,432 km away. The target country is to the E. It is a colder country than your guess. It is landlocked."
```

---

## Climate zones explained

| Zone | Typical regions | Avg temp range |
|------|----------------|----------------|
| `tropical` | Central Africa, SE Asia, Amazon basin | 24–30 °C |
| `subtropical` | North Africa coast, Southern USA, Southern China | 18–26 °C |
| `arid` | Sahara, Arabian Peninsula, Central Australia | 14–30 °C |
| `mediterranean` | Mediterranean basin, California, SW Australia | 14–20 °C |
| `temperate` | Western/Central Europe, Eastern USA, New Zealand | 7–14 °C |
| `continental` | Eastern Europe, Central Asia, interior Canada/US | −5 to 12 °C |
| `subarctic` | Northern Russia, Scandinavia, Northern Canada | −10 to 3 °C |
| `arctic` | Polar regions | < −10 °C |

## Related

- [Countries](countries.md) — the base `countries` array (name, code, emoji flag)
- [Flags](flags.md) — `getSimilarFlags()` to add flag-guessing to geography games
- [Cities](cities.md) — capital cities with precise coordinates
