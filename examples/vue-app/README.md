# @sil/data Vue Demo App

A small, deployable Vue 3 application that documents and demonstrates every
function exported by the **[@sil/data](https://github.com/silvandiepen/sil-data)** package.

## Features

| Tab | Functions demonstrated |
|-----|------------------------|
| **Countries** | `countries`, `getCountryByCode`, `getCountriesByContinent`, `getCountryFlag`, `getRecognizedCountries`, `phoneCountryCodes`, `getPhoneCodeByCountry`, `getCountriesByPhoneCode`, `continents`, `getContinentByCode` |
| **Cities** | `cities`, `searchCities`, `getCitiesByCountry`, `getCapitalCity`, `getCitiesByPopulation` |
| **States** | `states`, `getStatesByCountry`, `getStateByCode`, `getStatesByType` |
| **Geography** | `countryGeography`, `getCountryGeography`, `getLandlockedCountries`, `getCountriesByClimate`, `getNeighbors`, `doCountriesBorder`, `getDistanceBetweenCountries`, `getDirectionBetweenCountries`, `haversineDistance`, `bearing`, `bearingToCardinal`, `compareTemperature`, `compareSize`, `getHemisphere` |
| **Flags** | `flagData`, `getFlagSvgUrl`, `getFlagPngUrl`, `getFlagData`, `getFlagsByColor`, `getSimilarFlags` |
| **Maps** | `getWorldMapSvg`, `highlightCountries`, `colorizeWorldMap`, `getCountrySvg`, `WORLD_MAP_VIEWBOX`, `WORLD_MAP_DEFAULTS`, `worldMapCountries`, `getCountryMapData`, `searchWorldMapCountries`, `getCountryMapSvgUrl`, `getCountrySubdivisionMapUrl`, `latLonToMapPoint`, `COUNTRY_MAP_DEFAULTS` |
| **Currencies** | `currencies`, `getCurrencyByCode`, `getCurrencyByCountry` |
| **Geo Game** | `getGeoHints` — Wordle-style geography guessing game |

## Getting started

```bash
# install dependencies (the local @sil/data library is referenced via a file: path)
npm install

# start development server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

## Deployment

The `npm run build` command outputs a fully static site to `dist/`.  
You can deploy it to any static hosting platform, for example:

### GitHub Pages (via `gh-pages`)

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

### Vercel / Netlify / Cloudflare Pages

Set the **build command** to `npm run build` and the **publish directory** to `dist`.

### Docker / NGINX

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

## Tech stack

- [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- [Vite](https://vitejs.dev/) (build & dev server)
- TypeScript
- Zero additional CSS frameworks
