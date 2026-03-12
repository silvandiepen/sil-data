<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">SVG Maps</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        Render a full SVG world map, highlight countries, or display individual country shapes.
      </p>
    </div>

    <!-- world map with highlights -->
    <div class="card col">
      <div class="section-title">highlightCountries(highlights, options)</div>
      <div class="code">import { highlightCountries } from "@sil/data";

highlightCountries([
  { alpha2: "{{ highlightA }}", color: "{{ colorA }}" },
  { alpha2: "{{ highlightB }}", color: "{{ colorB }}" },
], { width: 900, background: "#1a1d2e", defaultFill: "#2e3350", stroke: "#0f1117" })</div>
      <div class="row" style="flex-wrap:wrap;gap:0.75rem">
        <div class="row">
          <label style="font-size:0.82rem;color:var(--muted)">Country 1:</label>
          <input v-model="highlightA" style="max-width:80px" placeholder="e.g. FR" />
          <input type="color" v-model="colorA" style="width:48px;height:32px;padding:2px;border-radius:4px;cursor:pointer" />
        </div>
        <div class="row">
          <label style="font-size:0.82rem;color:var(--muted)">Country 2:</label>
          <input v-model="highlightB" style="max-width:80px" placeholder="e.g. DE" />
          <input type="color" v-model="colorB" style="width:48px;height:32px;padding:2px;border-radius:4px;cursor:pointer" />
        </div>
      </div>
      <div
        v-html="worldMapSvg"
        style="width:100%;overflow:hidden;border:1px solid var(--border);border-radius:var(--radius)"
      />
    </div>

    <!-- colorizeWorldMap -->
    <div class="card col">
      <div class="section-title">colorizeWorldMap(groups, options)</div>
      <div class="code">import { colorizeWorldMap } from "@sil/data";

colorizeWorldMap({
  "#ef9a9a": ["US","CA","MX"],   // red group
  "#a5d6a7": ["FR","DE","GB"],   // green group
  "#64b5f6": ["CN","JP","KR"],   // blue group
})</div>
      <div
        v-html="colorizedMap"
        style="width:100%;overflow:hidden;border:1px solid var(--border);border-radius:var(--radius)"
      />
    </div>

    <!-- individual country map -->
    <div class="card col">
      <div class="section-title">getCountrySvg(alpha2, options)</div>
      <div class="code">import { getCountrySvg } from "@sil/data";
getCountrySvg("{{ countryCode }}", { fill: "{{ countryFill }}", stroke: "#64b5f6" })</div>
      <div class="row">
        <input v-model="countryCode" placeholder="Alpha-2, e.g. AU" style="max-width:120px" />
        <input type="color" v-model="countryFill" style="width:48px;height:32px;padding:2px;border-radius:4px;cursor:pointer" />
      </div>
      <div v-if="countrySvg" style="max-width:400px;margin:0 auto">
        <div
          v-html="countrySvg"
          style="width:100%;border:1px solid var(--border);border-radius:var(--radius)"
        />
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No map data available for "{{ countryCode }}".</p>
    </div>

    <!-- getWorldMapSvg -->
    <div class="card col">
      <div class="section-title">getWorldMapSvg(options)</div>
      <div class="code">import { getWorldMapSvg, WORLD_MAP_VIEWBOX, WORLD_MAP_DEFAULTS } from "@sil/data";

// WORLD_MAP_VIEWBOX → "{{ WORLD_MAP_VIEWBOX }}"
// WORLD_MAP_DEFAULTS → { defaultFill, stroke, strokeWidth, background, width, height }
getWorldMapSvg({ background: "#1a1d2e", defaultFill: "#2e3350", stroke: "#0f1117" })</div>
      <div
        v-html="plainWorldMap"
        style="width:100%;overflow:hidden;border:1px solid var(--border);border-radius:var(--radius)"
      />
    </div>

    <!-- getCountryMapData + searchWorldMapCountries -->
    <div class="card col">
      <div class="section-title">getCountryMapData · searchWorldMapCountries · worldMapCountries</div>
      <div class="code">import { getCountryMapData, searchWorldMapCountries, worldMapCountries } from "@sil/data";

worldMapCountries.length // → {{ worldMapCountries.length }} entries
getCountryMapData("{{ mapDataCode }}")?.name // → "{{ getCountryMapData(mapDataCode.toUpperCase())?.name ?? 'not found' }}"
searchWorldMapCountries("{{ mapSearch }}").length // → {{ searchWorldMapCountries(mapSearch).length }}</div>
      <div class="row" style="flex-wrap:wrap;gap:0.75rem">
        <div class="col" style="gap:0.35rem">
          <div class="section-title">getCountryMapData(alpha2)</div>
          <input v-model="mapDataCode" placeholder="Alpha-2, e.g. AU" style="max-width:120px" />
          <div v-if="mapData" class="card" style="background:var(--surface2)">
            <div style="font-weight:700">{{ mapData.name }}</div>
            <div style="color:var(--muted);font-size:0.78rem">alpha2: {{ mapData.alpha2 }}</div>
            <div style="color:var(--muted);font-size:0.75rem;word-break:break-all;max-height:60px;overflow:hidden">
              path: {{ mapData.path.slice(0, 80) }}…
            </div>
          </div>
          <p v-else style="color:var(--muted);font-size:0.82rem">Not found.</p>
        </div>
        <div class="col" style="gap:0.35rem">
          <div class="section-title">searchWorldMapCountries(name)</div>
          <input v-model="mapSearch" placeholder="e.g. United" style="max-width:200px" />
          <div class="row" style="flex-wrap:wrap;gap:0.35rem">
            <span v-for="r in searchWorldMapCountries(mapSearch)" :key="r.alpha2" class="badge blue">{{ r.alpha2 }} {{ r.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- getCountrySubdivisionMapUrl + latLonToMapPoint -->
    <div class="card col">
      <div class="section-title">getCountryMapSvgUrl · getCountrySubdivisionMapUrl · latLonToMapPoint</div>
      <div class="code">import { getCountryMapSvgUrl, getCountrySubdivisionMapUrl, latLonToMapPoint, COUNTRY_MAP_DEFAULTS } from "@sil/data";

getCountryMapSvgUrl("{{ alpha3Code }}")
// → "{{ getCountryMapSvgUrl(alpha3Code) }}"

getCountrySubdivisionMapUrl("{{ alpha3Code }}")
// → "{{ getCountrySubdivisionMapUrl(alpha3Code) }}"

latLonToMapPoint({{ ptLat }}, {{ ptLon }})
// → {{ JSON.stringify(latLonToMapPoint(ptLat, ptLon)) }}</div>
      <div class="row" style="flex-wrap:wrap;gap:0.75rem">
        <div class="col" style="gap:0.35rem">
          <div class="section-title">Alpha-3 code for URL helpers</div>
          <input v-model="alpha3Code" placeholder="Alpha-3, e.g. NLD" style="max-width:120px" />
        </div>
        <div class="col" style="gap:0.35rem">
          <div class="section-title">latLonToMapPoint(lat, lon)</div>
          <div class="row">
            <input type="number" v-model.number="ptLat" step="1" style="max-width:100px" placeholder="Lat" />
            <input type="number" v-model.number="ptLon" step="1" style="max-width:100px" placeholder="Lon" />
          </div>
          <div class="card" style="background:var(--surface2)">
            x: {{ latLonToMapPoint(ptLat, ptLon).x.toFixed(2) }},
            y: {{ latLonToMapPoint(ptLat, ptLon).y.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  getWorldMapSvg,
  highlightCountries,
  colorizeWorldMap,
  getCountrySvg,
  WORLD_MAP_VIEWBOX,
  WORLD_MAP_DEFAULTS,
  worldMapCountries,
  getCountryMapData,
  searchWorldMapCountries,
  getCountryMapSvgUrl,
  getCountrySubdivisionMapUrl,
  latLonToMapPoint,
  COUNTRY_MAP_DEFAULTS,
} from "@sil/data";

const mapOptions = {
  background: "#1a1d2e",
  defaultFill: "#2e3350",
  stroke: "#0f1117",
  strokeWidth: 0.5,
};

const highlightA = ref("FR");
const colorA = ref("#64b5f6");
const highlightB = ref("DE");
const colorB = ref("#a5d6a7");

const worldMapSvg = computed(() =>
  highlightCountries(
    [
      { alpha2: highlightA.value.toUpperCase(), color: colorA.value },
      { alpha2: highlightB.value.toUpperCase(), color: colorB.value },
    ],
    mapOptions,
  ),
);

const colorizedMap = colorizeWorldMap(
  {
    "#ef9a9a": ["US", "CA", "MX"],
    "#a5d6a7": ["FR", "DE", "GB", "ES", "IT"],
    "#64b5f6": ["CN", "JP", "KR", "IN"],
  },
  mapOptions,
);

const countryCode = ref("AU");
const countryFill = ref("#64b5f6");
const countrySvg = computed(() =>
  getCountrySvg(countryCode.value.toUpperCase(), {
    fill: countryFill.value,
    stroke: "#0f1117",
    strokeWidth: 1,
  }),
);

const plainWorldMap = getWorldMapSvg(mapOptions);

const mapDataCode = ref("AU");
const mapData = computed(() => getCountryMapData(mapDataCode.value.toUpperCase()));

const mapSearch = ref("United");

const alpha3Code = ref("NLD");
const ptLat = ref(52.37);
const ptLon = ref(4.90);
</script>
