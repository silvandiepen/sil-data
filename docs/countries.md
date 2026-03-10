# Countries

[← Back to README](../README.md)

The `countries` array is the central dataset of `@sil/data`. It contains ~195 sovereign states following the ISO 3166-1 standard, covering every continent.

## Import

```ts
import {
  countries,
  getCountryByCode,
  getCountriesByContinent,
  getCountryFlag,
} from "@sil/data";
import type { Country, ContinentName } from "@sil/data";
```

## Data shape

```ts
interface Country {
  name: string;           // Full English name, e.g. "United States"
  nativeName?: string;    // Name in the country's own language (optional)
  alpha2: string;         // ISO 3166-1 alpha-2 (2-letter), e.g. "US"
  alpha3: string;         // ISO 3166-1 alpha-3 (3-letter), e.g. "USA"
  numeric: string;        // ISO 3166-1 numeric (zero-padded 3 digits), e.g. "840"
  flag: string;           // Unicode emoji flag, e.g. "🇺🇸"
  phoneCode: string;      // International dialling prefix, e.g. "+1"
  capital: string;        // Name of the capital city, e.g. "Washington D.C."
  continent: ContinentName; // "Africa"|"Antarctica"|"Asia"|"Europe"|"North America"|"Oceania"|"South America"
  currency: string;       // ISO 4217 currency code, e.g. "USD"
  languages: string[];    // Primary languages, e.g. ["English"]
  tld?: string;           // Internet ccTLD, e.g. ".us"
}
```

## Examples

### All countries

```ts
import { countries } from "@sil/data";

console.log(countries.length); // ~195
console.log(countries[0]);
// {
//   name: "Afghanistan",
//   alpha2: "AF", alpha3: "AFG", numeric: "004",
//   flag: "🇦🇫", phoneCode: "+93",
//   capital: "Kabul", continent: "Asia",
//   currency: "AFN", languages: ["Dari", "Pashto"],
//   tld: ".af"
// }
```

### Look up a country by alpha-2 code

```ts
import { getCountryByCode } from "@sil/data";

const de = getCountryByCode("DE");
// { name: "Germany", alpha2: "DE", flag: "🇩🇪", capital: "Berlin", ... }

// Case-insensitive
getCountryByCode("de") === getCountryByCode("DE"); // true

// Returns undefined if not found
getCountryByCode("ZZ"); // undefined
```

### Get all countries in a continent

```ts
import { getCountriesByContinent } from "@sil/data";

const europeanCountries = getCountriesByContinent("Europe");
console.log(europeanCountries.length); // 44+

const africanCodes = getCountriesByContinent("Africa").map(c => c.alpha2);
// ["DZ", "AO", "BJ", ...]
```

### Get the flag emoji for a country code

```ts
import { getCountryFlag } from "@sil/data";

getCountryFlag("NL"); // "🇳🇱"
getCountryFlag("JP"); // "🇯🇵"
getCountryFlag("us"); // "🇺🇸" — case-insensitive
```

### Build a country selector

```ts
import { countries } from "@sil/data";

const options = countries.map((c) => ({
  value: c.alpha2,
  label: `${c.flag} ${c.name}`,
}));
// [{ value: "AF", label: "🇦🇫 Afghanistan" }, ...]
```

### Get all European countries sorted alphabetically

```ts
import { getCountriesByContinent } from "@sil/data";

const sorted = getCountriesByContinent("Europe")
  .sort((a, b) => a.name.localeCompare(b.name));
```

### Find the currency for a given country

```ts
import { getCountryByCode } from "@sil/data";

const country = getCountryByCode("FR");
console.log(country?.currency); // "EUR"
```

## Continent name values

```ts
type ContinentName =
  | "Africa"
  | "Antarctica"
  | "Asia"
  | "Europe"
  | "North America"
  | "Oceania"
  | "South America";
```

## Coverage

All 195 UN-recognised sovereign states are included, plus Kosovo. Antarctica has no countries but appears in the `continents` array.

| Continent | Countries |
|-----------|-----------|
| Africa | 54 |
| Asia | 49 |
| Europe | 44 |
| North America | 23 |
| South America | 12 |
| Oceania | 14 |
| Antarctica | 0 |

## Related

- [Phone codes](phone-codes.md) — `phoneCountryCodes` extends country data with territory entries
- [Geography](geography.md) — `countryGeography` adds centroids, bounds, and climate data per country
- [Flags](flags.md) — `flagData` adds SVG/PNG URLs, colours, and similar-flag groups per country
- [Cities](cities.md) — `cities` has capital and major city coordinates
- [Currencies](continents-currencies.md) — `getCurrencyByCountry()` looks up currency from country code
