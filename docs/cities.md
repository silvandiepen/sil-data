# Cities

[← Back to README](../README.md)

The `cities` array contains ~270 major world cities, including every national capital. Each city has coordinates (lat/lon), country code, and population where available.

## Import

```ts
import {
  cities,
  getCitiesByCountry,
  getCapitalCity,
  getCitiesByPopulation,
  searchCities,
} from "@sil/data";
import type { City } from "@sil/data";
```

## Data shape

```ts
interface City {
  name: string;        // "Tokyo"
  country: string;     // ISO 3166-1 alpha-2, e.g. "JP"
  state?: string;      // State/region name (optional), e.g. "Tokyo"
  population?: number; // Approximate city population (optional)
  lat: number;         // Latitude  (−90 to 90)
  lon: number;         // Longitude (−180 to 180)
  capital?: boolean;   // true if this is the national capital
}
```

## Examples

### All cities

```ts
import { cities } from "@sil/data";

console.log(cities.length); // ~270

// All national capitals
const capitals = cities.filter(c => c.capital);
console.log(capitals.length); // ~185
```

### Capital city of a country

```ts
import { getCapitalCity } from "@sil/data";

getCapitalCity("GB");
// { name: "London", country: "GB", lat: 51.5074, lon: -0.1278, capital: true, population: 9648110 }

getCapitalCity("JP");
// { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503, capital: true, population: 13960000 }

getCapitalCity("ZZ"); // undefined
```

### Cities in a country

```ts
import { getCitiesByCountry } from "@sil/data";

const usCities = getCitiesByCountry("US");
usCities.map(c => c.name);
// ["New York City", "Los Angeles", "Chicago", "Houston", "Phoenix",
//  "Philadelphia", "San Antonio", "San Diego", "Dallas", "Washington D.C.", ...]
```

### Top cities by population

```ts
import { getCitiesByPopulation } from "@sil/data";

// Top 10 most populous cities
const top10 = getCitiesByPopulation(10);
top10.map(c => `${c.name} (${c.country})`);
// ["Chongqing (CN)", "Tokyo (JP)", "Delhi (IN)", "Shanghai (CN)", ...]

// All cities sorted by population
const all = getCitiesByPopulation();
```

### Search cities by name

```ts
import { searchCities } from "@sil/data";

searchCities("new");
// [{ name: "New York City", ... }, { name: "New Delhi", ... }, ...]

searchCities("london");
// [{ name: "London", country: "GB", ... }]

// Case-insensitive
searchCities("BERLIN"); // same as searchCities("berlin")
```

### Build a city autocomplete

```ts
import { searchCities, getCountryByCode } from "@sil/data";

function cityAutocomplete(input: string) {
  return searchCities(input).map((city) => {
    const country = getCountryByCode(city.country);
    return {
      label: `${city.name}, ${country?.name ?? city.country}`,
      value: { lat: city.lat, lon: city.lon, code: city.country },
    };
  });
}

cityAutocomplete("par");
// [{ label: "Paris, France", value: { lat: 48.8566, lon: 2.3522, code: "FR" } }]
```

### Calculate distance from capital to capital

```ts
import { getCapitalCity } from "@sil/data";
import { haversineDistance } from "@sil/data";

const amsterdam = getCapitalCity("NL")!;
const berlin = getCapitalCity("DE")!;

const km = haversineDistance(amsterdam.lat, amsterdam.lon, berlin.lat, berlin.lon);
// ~577 km
```

## Coverage

Cities were chosen to cover:
- All national capitals (~185 cities)
- The largest metropolitan areas on each continent
- Major cultural, economic, and tourist destinations

Cities from every continent are represented including remote capitals like Nuku'alofa (Tonga), Funafuti (Tuvalu), and Majuro (Marshall Islands).

## Related

- [Countries](countries.md) — `country` field uses alpha-2 codes from `countries`
- [Geography](geography.md) — `haversineDistance()` works with the `lat`/`lon` fields
- [States](states.md) — `state` field aligns with entries in `states`
