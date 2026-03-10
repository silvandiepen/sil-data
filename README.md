# @sil/data

A comprehensive collection of reusable world data for use in web applications. Includes countries, phone codes, flags, cities, states/provinces, continents, and currencies — all strongly typed with TypeScript.

## Installation

```bash
npm install @sil/data
```

## Usage

```ts
import { phoneCountryCodes, countries, cities, states } from "@sil/data";

// Use phone country codes in a phone number input
const phoneOptions = phoneCountryCodes.map((p) => ({
  label: `${p.flag} ${p.country} (${p.phoneCode})`,
  value: p.phoneCode,
}));

// Look up a country by ISO code
import { getCountryByCode } from "@sil/data";
const usa = getCountryByCode("US");
// { name: "United States", alpha2: "US", flag: "🇺🇸", phoneCode: "+1", ... }

// Get a computed flag emoji from a country code
import { getCountryFlag } from "@sil/data";
getCountryFlag("NL"); // 🇳🇱

// Get all US states
import { getStatesByCountry } from "@sil/data";
const usStates = getStatesByCountry("US");

// Get the capital city of a country
import { getCapitalCity } from "@sil/data";
const london = getCapitalCity("GB");
// { name: "London", country: "GB", lat: 51.5074, lon: -0.1278, capital: true }
```

## Available Data

| Export | Description |
|--------|-------------|
| `countries` | ~195 world countries with ISO codes, flags, phone codes, capitals, continents, currencies, and languages |
| `phoneCountryCodes` | Countries + territories with international dialing codes, suitable for phone inputs |
| `cities` | ~270 major world cities including all national capitals, with coordinates and population |
| `states` | Administrative divisions (states, provinces, territories, regions) for major countries |
| `continents` | All 7 continents with population, area, and country count |
| `currencies` | ~150 world currencies with ISO 4217 codes, symbols, and countries |

## Helper Functions

### Countries
- `getCountryByCode(code)` — get a country by its alpha-2 code
- `getCountriesByContinent(continent)` — get all countries in a continent
- `getCountryFlag(alpha2)` — compute the flag emoji from an alpha-2 code

### Phone Codes
- `getPhoneCodeByCountry(code)` — get phone code entry by country code
- `getCountriesByPhoneCode(phoneCode)` — find all countries using a dialing code (e.g. `+1`)

### Cities
- `getCitiesByCountry(countryCode)` — get cities for a country
- `getCapitalCity(countryCode)` — get the capital city of a country
- `getCitiesByPopulation(limit?)` — get cities sorted by population
- `searchCities(query)` — search cities by name

### States & Provinces
- `getStatesByCountry(countryCode)` — get all administrative divisions for a country
- `getStateByCode(code, countryCode)` — get a specific state/province by code
- `getStatesByType(type)` — get all divisions of a given type (e.g. `"province"`, `"canton"`)

### Continents
- `getContinentByCode(code)` — get a continent by its two-letter code

### Currencies
- `getCurrencyByCode(code)` — get a currency by ISO 4217 code
- `getCurrencyByCountry(countryCode)` — get the currency used by a country

## TypeScript Types

```ts
import type {
  Country,
  PhoneCountryCode,
  City,
  State,
  StateType,
  Continent,
  ContinentName,
  Currency,
} from "@sil/data";
```

## Countries Coverage

Data is available for all countries in the following regions:
- **Africa**: 54 countries
- **Asia**: 49 countries
- **Europe**: 44+ countries (including Kosovo)
- **North America**: 23 countries
- **South America**: 12 countries
- **Oceania**: 14 countries

## License

MIT
