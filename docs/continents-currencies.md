# Continents & Currencies

[← Back to README](../README.md)

---

## Continents

### Import

```ts
import { continents, getContinentByCode } from "@sil/data";
import type { Continent, ContinentName } from "@sil/data";
```

### Data shape

```ts
interface Continent {
  name: ContinentName;  // "Europe"
  code: string;         // "EU" — two-letter continent code
  population: number;   // Approximate population
  area: number;         // Area in km²
  countries: number;    // Number of sovereign states
}

type ContinentName =
  | "Africa"
  | "Antarctica"
  | "Asia"
  | "Europe"
  | "North America"
  | "Oceania"
  | "South America";
```

### Continent codes

| Code | Name | Countries | Area (km²) |
|------|------|-----------|------------|
| `AF` | Africa | 54 | 30,370,000 |
| `AN` | Antarctica | 0 | 14,200,000 |
| `AS` | Asia | 49 | 44,579,000 |
| `EU` | Europe | 44 | 10,530,000 |
| `NA` | North America | 23 | 24,709,000 |
| `OC` | Oceania | 14 | 8,526,000 |
| `SA` | South America | 12 | 17,840,000 |

### Examples

```ts
import { continents, getContinentByCode } from "@sil/data";

// All 7 continents
console.log(continents.length); // 7

// Look up by two-letter code
const europe = getContinentByCode("EU");
// { name: "Europe", code: "EU", population: 748958360, area: 10530000, countries: 44 }

// Case-insensitive
getContinentByCode("eu"); // same as getContinentByCode("EU")

// Largest continents by area
const byArea = [...continents].sort((a, b) => b.area - a.area);
byArea.map(c => c.name);
// ["Asia", "Africa", "North America", "South America", "Antarctica", "Europe", "Oceania"]
```

### Use with countries

```ts
import { continents, getCountriesByContinent } from "@sil/data";

// Add country list to each continent
const enriched = continents.map(continent => ({
  ...continent,
  countryList: getCountriesByContinent(continent.name),
}));
```

---

## Currencies

### Import

```ts
import {
  currencies,
  getCurrencyByCode,
  getCurrencyByCountry,
} from "@sil/data";
import type { Currency } from "@sil/data";
```

### Data shape

```ts
interface Currency {
  code: string;       // ISO 4217 code, e.g. "EUR"
  name: string;       // "Euro"
  symbol: string;     // "€"
  countries: string[]; // Alpha-2 codes of countries using this currency
}
```

### Examples

```ts
import { currencies, getCurrencyByCode, getCurrencyByCountry } from "@sil/data";

// All ~150 currencies
console.log(currencies.length); // ~150

// Look up by ISO 4217 code
getCurrencyByCode("USD");
// { code: "USD", name: "US Dollar", symbol: "$", countries: ["US"] }

getCurrencyByCode("EUR");
// { code: "EUR", name: "Euro", symbol: "€", countries: ["DE", "FR", "IT", "ES", ...] }

// Case-insensitive
getCurrencyByCode("usd"); // same as "USD"

// Look up by country
getCurrencyByCountry("JP");
// { code: "JPY", name: "Japanese Yen", symbol: "¥", countries: ["JP"] }

getCurrencyByCountry("DE");
// { code: "EUR", name: "Euro", symbol: "€", countries: ["DE", "FR", ...] }
```

### List all countries using the Euro

```ts
import { getCurrencyByCode, getCountryByCode } from "@sil/data";

const euro = getCurrencyByCode("EUR");
const eurozone = euro?.countries.map(code => getCountryByCode(code)?.name);
// ["Andorra", "Austria", "Belgium", "Cyprus", "Estonia", "Finland", "France", ...]
```

### Build a currency selector

```ts
import { currencies } from "@sil/data";

const currencyOptions = currencies.map(c => ({
  value: c.code,
  label: `${c.symbol} ${c.name} (${c.code})`,
}));
// [{ value: "AED", label: "د.إ United Arab Emirates Dirham (AED)" }, ...]
```

### Format a price with the right symbol

```ts
import { getCurrencyByCountry } from "@sil/data";

function formatPrice(amount: number, countryCode: string): string {
  const currency = getCurrencyByCountry(countryCode);
  if (!currency) return String(amount);
  return `${currency.symbol}${amount.toFixed(2)}`;
}

formatPrice(42.5, "US"); // "$42.50"
formatPrice(42.5, "JP"); // "¥42.50"
formatPrice(42.5, "DE"); // "€42.50"
```

## Related

- [Countries](countries.md) — `country.continent` is a `ContinentName`; `country.currency` is an ISO 4217 code
- [Geography](geography.md) — `countryGeography` is keyed by the same alpha-2 codes used in `currency.countries[]`
