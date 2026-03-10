# States, Provinces & Administrative Divisions

[← Back to README](../README.md)

The `states` array contains 600+ administrative divisions across 20+ countries: US states, Canadian provinces, Australian states, Swiss cantons, Brazilian states, German Länder, French regions, Spanish autonomous communities, Italian regions, Mexican states, Japanese prefectures, Indian states, Chinese provinces, and more.

## Import

```ts
import {
  states,
  getStatesByCountry,
  getStateByCode,
  getStatesByType,
} from "@sil/data";
import type { State, StateType } from "@sil/data";
```

## Data shape

```ts
interface State {
  name: string;      // "California"
  code: string;      // "CA" — state/province abbreviation code
  country: string;   // "US" — ISO 3166-1 alpha-2 country code
  type: StateType;   // "state" | "province" | "territory" | ...
}

type StateType =
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
```

## Examples

### All divisions for a country

```ts
import { getStatesByCountry } from "@sil/data";

// United States
const usAll = getStatesByCountry("US");
console.log(usAll.length); // 50 states + DC + territories = 57

// Switzerland
const chAll = getStatesByCountry("CH");
console.log(chAll.length); // 26 cantons

// Japan
const jpAll = getStatesByCountry("JP");
console.log(jpAll.length); // 47 prefectures
```

### Look up a specific division by code

```ts
import { getStateByCode } from "@sil/data";

getStateByCode("CA", "US");
// { name: "California", code: "CA", country: "US", type: "state" }

getStateByCode("ON", "CA");
// { name: "Ontario", code: "ON", country: "CA", type: "province" }

getStateByCode("ZZ", "US"); // undefined
```

### Filter by division type

```ts
import { getStatesByType } from "@sil/data";

// All provinces (CA, AU, ...)
const provinces = getStatesByType("province");

// All cantons (Switzerland)
const cantons = getStatesByType("canton");
cantons.every(c => c.country === "CH"); // true
cantons.length; // 26

// All territories
const territories = getStatesByType("territory");
territories.map(t => `${t.name} (${t.country})`);
// ["Australian Capital Territory (AU)", "Northwest Territories (CA)", ...]
```

### Build a state selector that changes with the selected country

```ts
import { getStatesByCountry } from "@sil/data";

function getStateOptions(countryCode: string) {
  const divisions = getStatesByCountry(countryCode);
  if (divisions.length === 0) return null; // no division data for this country

  return divisions.map(s => ({
    value: s.code,
    label: s.name,
  }));
}

getStateOptions("US");
// [{ value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, ...]

getStateOptions("CH");
// [{ value: "ZH", label: "Zurich" }, { value: "BE", label: "Bern" }, ...]
```

## Country coverage

| Country | Type | Count |
|---------|------|-------|
| 🇺🇸 United States | states + DC + territories | 57 |
| 🇨🇦 Canada | provinces + territories | 13 |
| 🇦🇺 Australia | states + territories | 8 |
| 🇧🇷 Brazil | states + DF | 27 |
| 🇩🇪 Germany | Länder | 16 |
| 🇫🇷 France | regions + overseas | 18 |
| 🇪🇸 Spain | autonomous communities | 17 |
| 🇮🇹 Italy | regions | 20 |
| 🇲🇽 Mexico | states + CDMX | 32 |
| 🇮🇳 India | states + union territories | 36 |
| 🇨🇳 China | provinces + autonomous regions + municipalities | 33 |
| 🇯🇵 Japan | prefectures | 47 |
| 🇨🇭 Switzerland | cantons | 26 |
| 🇷🇺 Russia | federal subjects (8 major regions + Moscow) | 9 |
| 🇦🇪 UAE | emirates | 7 |
| 🇳🇴 Norway | counties | 15 |
| 🇵🇹 Portugal | districts | 18 |
| 🇳🇱 Netherlands | provinces | 12 |
| 🇧🇪 Belgium | provinces | 10 |
| 🇸🇪 Sweden | counties | 21 |

## Related

- [Countries](countries.md) — the `country` field in each `State` uses alpha-2 codes from `countries`
- [Cities](cities.md) — the `state` field in each `City` aligns with state names here
