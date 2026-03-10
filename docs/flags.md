# Flags

[← Back to README](../README.md)

`@sil/data` provides complete flag metadata for ~195 countries:

- **SVG and PNG image URLs** via [flagcdn.com](https://flagcdn.com) — no SVGs are bundled, keeping the package small
- **Dominant colours** on each flag (up to 4, most prominent first)
- **Visually similar flags** — groups of flags that look alike and would be confused by players in a "guess the flag" game

## Import

```ts
import {
  flagData,
  getFlagData,
  getFlagsByColor,
  getSimilarFlags,
  getFlagSvgUrl,
  getFlagPngUrl,
  getCountryMapSvgUrl,
  getCountryFlag,  // emoji flag — from countries module
} from "@sil/data";
import type { FlagInfo, FlagColor } from "@sil/data";
```

## Data shape

```ts
interface FlagInfo {
  alpha2: string;       // "NL"
  svgUrl: string;       // "https://flagcdn.com/nl.svg"
  pngUrl: string;       // "https://flagcdn.com/w320/nl.png"
  colors: FlagColor[];  // ["red", "white", "blue"] — most dominant first
  similar: string[];    // ["LU", "FR", "RU"] — alpha-2 codes of similar-looking flags
}

type FlagColor =
  | "red" | "dark-red" | "white" | "blue" | "green" | "yellow"
  | "orange" | "black" | "gold" | "light-blue" | "dark-blue"
  | "dark-green" | "purple" | "brown";
```

## Flag image URLs

Flag images are served by [flagcdn.com](https://flagcdn.com) — a free, reliable CDN that hosts SVG and PNG flags for all countries.

### SVG flags

```ts
import { getFlagSvgUrl } from "@sil/data";

getFlagSvgUrl("NL"); // "https://flagcdn.com/nl.svg"
getFlagSvgUrl("US"); // "https://flagcdn.com/us.svg"
```

Use in HTML:
```html
<img src="https://flagcdn.com/nl.svg" width="40" alt="Netherlands flag" />
```

Use in React:
```tsx
import { getFlagSvgUrl } from "@sil/data";

function Flag({ countryCode }: { countryCode: string }) {
  return <img src={getFlagSvgUrl(countryCode)} width={40} alt={`${countryCode} flag`} />;
}
```

### PNG flags (multiple sizes)

```ts
import { getFlagPngUrl } from "@sil/data";

getFlagPngUrl("NL");        // "https://flagcdn.com/w320/nl.png"  (default 320px wide)
getFlagPngUrl("NL", 40);    // "https://flagcdn.com/w40/nl.png"
getFlagPngUrl("NL", 160);   // "https://flagcdn.com/w160/nl.png"
getFlagPngUrl("NL", 640);   // "https://flagcdn.com/w640/nl.png"
```

Available widths: `40 | 80 | 160 | 320 | 640 | 1280 | 2560`

### Country outline SVG (map shape)

```ts
import { getCountryMapSvgUrl } from "@sil/data";

getCountryMapSvgUrl("NLD"); // Wikimedia Commons outline map URL
```

> **Note:** Country outline SVGs are not bundled. This returns an external Wikimedia Commons URL. For embedded maps, consider [natural earth data](https://www.naturalearthdata.com/) or GeoJSON libraries.

## Similar flags

The `similar` field on each `FlagInfo` entry lists alpha-2 codes of countries whose flags would be visually confusing. This is designed for **"guess the flag" games** where you need to generate plausible wrong answers.

```ts
import { getSimilarFlags, getFlagData } from "@sil/data";

// Get similar flags for the Netherlands
const similar = getSimilarFlags("NL");
similar.map(f => f.alpha2); // ["LU", "FR", "RU", "YU", "HR"]

// Or access directly from the entry
const nl = getFlagData("NL");
nl?.similar; // ["LU", "FR", "RU", ...]
```

### Notable similar-flag groups

| Country | Similar flags | Reason |
|---------|--------------|--------|
| 🇳🇱 Netherlands | 🇱🇺 Luxembourg, 🇷🇺 Russia, 🇫🇷 France, 🇭🇷 Croatia | Red/white/blue horizontal or vertical tricolour |
| 🇩🇰 Denmark | 🇳🇴 Norway, 🇸🇪 Sweden, 🇫🇮 Finland, 🇮🇸 Iceland | Nordic cross design |
| 🇦🇺 Australia | 🇳🇿 New Zealand, 🇬🇧 United Kingdom, 🇫🇯 Fiji | Union Jack in canton |
| 🇩🇪 Germany | 🇧🇪 Belgium, 🇧🇴 Bolivia | Black/red/gold horizontal tricolour |
| 🇮🇹 Italy | 🇮🇪 Ireland, 🇨🇮 Ivory Coast, 🇲🇽 Mexico | Green/white/red vertical tricolour |
| 🇹🇷 Turkey | 🇹🇳 Tunisia, 🇵🇰 Pakistan, 🇦🇿 Azerbaijan, 🇲🇾 Malaysia, 🇩🇿 Algeria | Crescent and star |
| 🇪🇹 Ethiopia | 🇬🇳 Guinea, 🇲🇱 Mali, 🇨🇲 Cameroon, 🇸🇳 Senegal | Pan-African colours |
| 🇮🇩 Indonesia | 🇲🇨 Monaco, 🇵🇱 Poland, 🇸🇬 Singapore | Red and white |

## Flag colours

Use flag colours to group or filter countries:

```ts
import { getFlagsByColor, flagData } from "@sil/data";

// All flags with green
const greenFlags = getFlagsByColor("green");

// Flags that are only red and white
const redWhiteOnly = flagData.filter(
  (f) => f.colors.every((c) => c === "red" || c === "white")
);
```

## Building a "Guess the Flag" game

```ts
import { flagData, getSimilarFlags, getFlagSvgUrl, getCountryByCode } from "@sil/data";

function getQuizQuestion(targetAlpha2: string) {
  const target = getCountryByCode(targetAlpha2);
  const wrongOptions = getSimilarFlags(targetAlpha2).slice(0, 3);

  return {
    question: "Which country does this flag belong to?",
    flagUrl: getFlagSvgUrl(targetAlpha2),
    correctAnswer: target?.name,
    wrongAnswers: wrongOptions.map((f) => getCountryByCode(f.alpha2)?.name),
  };
}
```

## Full flag data array

```ts
import { flagData } from "@sil/data";

console.log(flagData.length); // ~195

// Find all flags with a gold/yellow star-associated colour
const goldFlags = flagData.filter(f => f.colors.includes("gold"));
```

## Related

- [Countries](countries.md) — `getCountryFlag()` returns the emoji flag
- [Geography](geography.md) — combine with country geography for location-aware flag games
