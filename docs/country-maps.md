# Country Maps

`@sil/data` provides functions to render a standalone SVG for any individual country, using the bundled world-map vector data and the bundled cities dataset.

Each country SVG shows the country's **outline** and, optionally, **city marker dots** (with the capital city highlighted in a different colour).

For maps that also show administrative-subdivision (province / state / region) boundaries, use [`getCountrySubdivisionMapUrl`](#getcountrysubdivisionmapurl) to obtain a URL pointing to an external Wikimedia Commons source.

---

## Functions

### `getCountrySvg(alpha2, options?)`

Renders a standalone `<svg>…</svg>` string for a single country.

**Signature:**

```ts
function getCountrySvg(
  alpha2: string,
  options?: CountryMapOptions,
): string | null;
```

- Returns `null` if the country code is unknown or the country has no drawable path data (e.g. very small territories not represented in the world-map dataset).
- The `alpha2` lookup is **case-insensitive** (`"de"` and `"DE"` both work).

**Every country `<path>` element has:**
- `id` — ISO alpha-2 code, e.g. `id="DE"`
- `data-code` — same code
- `data-name` — human-readable country name

**Every city `<circle>` element has:**
- `data-city` — city name
- `data-capital="true"` — only on the capital city
- `<title>` child with the city name (for accessibility / tooltip)

**Example:**

```ts
import { getCountrySvg } from "@sil/data";

// Render Germany with default styling
document.getElementById("map")!.innerHTML = getCountrySvg("DE") ?? "";

// Custom styling – blue fill, no city markers
const svg = getCountrySvg("JP", {
  fill:       "#4a90e2",
  stroke:     "#ffffff",
  showCities: false,
  className:  "country-map",
});

// Use a specific capital city colour
const svg2 = getCountrySvg("US", {
  fill:          "#e8f4f8",
  cityColor:     "#888888",
  capitalColor:  "#e24a4a",
  capitalRadius: 6,
});
```

---

### `getCountrySubdivisionMapUrl(alpha3)`

Returns a URL to a PNG rendering of the country's administrative-subdivision map hosted on Wikimedia Commons.  The underlying file is an SVG that typically shows province, state, or region boundaries.  This image is **not bundled** in the package.

**Signature:**

```ts
function getCountrySubdivisionMapUrl(alpha3: string): string;
```

- `alpha3` is the ISO 3166-1 alpha-3 code (e.g. `"DEU"`, `"USA"`, `"FRA"`).
- The lookup is **case-insensitive**.

**Example:**

```ts
import { getCountrySubdivisionMapUrl } from "@sil/data";

const url = getCountrySubdivisionMapUrl("DEU");
// → "https://upload.wikimedia.org/wikipedia/commons/thumb/maps/DEU.svg/800px-DEU.svg.png"

const img = document.createElement("img");
img.src = getCountrySubdivisionMapUrl("FRA");
img.alt = "France administrative divisions map";
document.body.appendChild(img);
```

---

### `latLonToMapPoint(lat, lon)`

Converts geographic coordinates (latitude / longitude) to the SVG coordinate system used by the bundled world-map path data (equirectangular, 2000 × 857 canvas).

Useful when you need to position custom markers at specific coordinates on top of a country or world-map SVG.

**Signature:**

```ts
function latLonToMapPoint(
  lat: number,
  lon: number,
): { x: number; y: number };
```

**Example:**

```ts
import { latLonToMapPoint, getCountrySvg } from "@sil/data";

const berlin = latLonToMapPoint(52.52, 13.41);
// → { x: 1074.5, y: 207.9 }

// Add a custom marker to the Germany SVG
const svgContent = getCountrySvg("DE") ?? "";
const withMarker = svgContent.replace(
  "</svg>",
  `<circle cx="${berlin.x.toFixed(1)}" cy="${berlin.y.toFixed(1)}" r="8" fill="red"/>\n</svg>`
);
```

---

## Types

### `CountryMapOptions`

All fields are optional.  Omitted values fall back to `COUNTRY_MAP_DEFAULTS`.

```ts
interface CountryMapOptions {
  /** Fill color for the country shape. Default: "#d0d0d0" */
  fill?: string;
  /** Stroke (border) color for the outline. Default: "#ffffff" */
  stroke?: string;
  /** Stroke width in SVG units. Default: 0.5 */
  strokeWidth?: number;
  /** SVG width attribute (e.g. "100%", 800). Default: "100%" */
  width?: string | number;
  /** SVG height attribute (e.g. "auto", 400). Default: "auto" */
  height?: string | number;
  /** Optional CSS class on the <svg> element. */
  className?: string;
  /** Whether to show city marker dots. Default: true */
  showCities?: boolean;
  /** Fill color for regular city markers. Default: "#555555" */
  cityColor?: string;
  /** Fill color for the capital city marker. Default: "#cc2222" */
  capitalColor?: string;
  /** Radius of regular city markers in SVG units. Default: 3 */
  cityRadius?: number;
  /** Radius of the capital city marker in SVG units. Default: 5 */
  capitalRadius?: number;
  /** Extra space (in SVG units) around the country outline. Default: 5 */
  padding?: number;
}
```

### `COUNTRY_MAP_DEFAULTS`

```ts
{
  fill:          "#d0d0d0",
  stroke:        "#ffffff",
  strokeWidth:   0.5,
  width:         "100%",
  height:        "auto",
  className:     "",
  showCities:    true,
  cityColor:     "#555555",
  capitalColor:  "#cc2222",
  cityRadius:    3,
  capitalRadius: 5,
  padding:       5,
}
```

---

## Styling tips

Because each country path has a predictable `id` attribute, you can style or interact with individual paths via CSS or JavaScript:

```css
/* Hover effect */
#DE:hover { fill: steelblue; cursor: pointer; }
```

```js
import { getCountrySvg } from "@sil/data";

document.getElementById("map")!.innerHTML = getCountrySvg("BR") ?? "";

// Listen for clicks on any city marker
document.querySelectorAll("#map circle[data-city]").forEach(circle => {
  circle.addEventListener("click", () => {
    const city    = circle.dataset.city;
    const capital = circle.dataset.capital === "true";
    console.log(`Clicked: ${city}${capital ? " (capital)" : ""}`);
  });
});
```

---

## Data sources

- **Country outlines** — extracted from the bundled world-map SVG path data (see [World Map](./world-map.md)).
- **City markers** — derived from the bundled [Cities](./cities.md) dataset.
- **ViewBox** — calculated from the geographic bounding boxes in the bundled [Geography](./geography.md) dataset.
- **Subdivision maps** — external reference URLs pointing to [Wikimedia Commons](https://commons.wikimedia.org/).
