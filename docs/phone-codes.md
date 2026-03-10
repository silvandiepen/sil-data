# Phone Country Codes

[← Back to README](../README.md)

The `phoneCountryCodes` array is ready-to-use data for international phone number inputs (like WhatsApp, Stripe, or any contact form). It combines all sovereign countries with additional territories and special regions that have their own dialling codes.

## Import

```ts
import {
  phoneCountryCodes,
  getPhoneCodeByCountry,
  getCountriesByPhoneCode,
} from "@sil/data";
import type { PhoneCountryCode } from "@sil/data";
```

## Data shape

```ts
interface PhoneCountryCode {
  country: string;    // "Netherlands"
  code: string;       // "NL" — ISO 3166-1 alpha-2
  phoneCode: string;  // "+31" — always starts with "+"
  flag: string;       // "🇳🇱" — Unicode emoji flag
  example?: string;   // Example local number format (where available)
}
```

## Examples

### Phone number country selector (full list)

```ts
import { phoneCountryCodes } from "@sil/data";

const selectOptions = phoneCountryCodes.map((p) => ({
  label: `${p.flag} ${p.country} (${p.phoneCode})`,
  value: p.code,
}));
// [{ label: "🇦🇫 Afghanistan (+93)", value: "AF" }, ...]
```

### Look up a specific country's phone code

```ts
import { getPhoneCodeByCountry } from "@sil/data";

const nl = getPhoneCodeByCountry("NL");
// { country: "Netherlands", code: "NL", phoneCode: "+31", flag: "🇳🇱" }

// Returns undefined for unknown codes
getPhoneCodeByCountry("ZZ"); // undefined
```

### Find all entries for a shared dialling code

Some dialling codes are shared between a country and its territories. For example `+1` covers the US, Canada, and ~25 Caribbean/Pacific territories.

```ts
import { getCountriesByPhoneCode } from "@sil/data";

const plusOne = getCountriesByPhoneCode("+1");
console.log(plusOne.map(p => p.code));
// ["US", "CA", "AG", "AI", "AS", "BB", "BM", ...]

const plusFortyFour = getCountriesByPhoneCode("+44");
console.log(plusFortyFour.map(p => p.code));
// ["GB", "GG", "IM", "JE"]
```

### Validate a phone code prefix

```ts
import { phoneCountryCodes } from "@sil/data";

const knownCodes = new Set(phoneCountryCodes.map(p => p.phoneCode));
knownCodes.has("+31"); // true
knownCodes.has("+999"); // false
```

## Coverage

`phoneCountryCodes` includes every entry from `countries` plus additional territories:

- American Samoa, Anguilla, Bermuda, British Virgin Islands, Cayman Islands
- Christmas Island, Cocos Islands, Cook Islands, Falkland Islands, Faroe Islands
- French Guiana, French Polynesia, Gibraltar, Greenland, Guadeloupe, Guam
- Guernsey, Hong Kong, Isle of Man, Jersey, Macao, Martinique
- Mayotte, Montserrat, New Caledonia, Norfolk Island, Northern Mariana Islands
- Puerto Rico, Réunion, Saint Barthélemy, Saint Helena, Saint Martin
- Saint Pierre and Miquelon, Turks and Caicos Islands, US Virgin Islands
- Wallis and Futuna, Western Sahara

Total: **~250 entries**.

## Related

- [Countries](countries.md) — the base `countries` array that `phoneCountryCodes` extends
