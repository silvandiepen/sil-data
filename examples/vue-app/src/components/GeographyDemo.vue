<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">Geography</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        Centroids, borders, climate zones, distance &amp; direction calculations.
      </p>
    </div>

    <!-- getCountryGeography -->
    <div class="card col">
      <div class="section-title">getCountryGeography(alpha2)</div>
      <div class="code">import { getCountryGeography } from "@sil/data";
getCountryGeography("{{ geoCode }}")</div>
      <input v-model="geoCode" placeholder="Alpha-2, e.g. BR" style="max-width:140px" />
      <div v-if="geo" class="grid-2">
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Centroid</div>
          <div>{{ geo.lat.toFixed(4) }}°, {{ geo.lon.toFixed(4) }}°</div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Area</div>
          <div>{{ geo.area.toLocaleString() }} km²</div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Climate</div>
          <div><span class="badge blue">{{ geo.climate }}</span></div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Avg. Temperature</div>
          <div>{{ geo.avgTemperature }}°C</div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Landlocked</div>
          <span :class="['badge', geo.landlocked ? 'yellow' : 'green']">
            {{ geo.landlocked ? 'Yes' : 'No' }}
          </span>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Bounds</div>
          <div style="font-size:0.8rem;color:var(--muted)">
            N {{ geo.bounds.north.toFixed(1) }}  S {{ geo.bounds.south.toFixed(1) }}
            E {{ geo.bounds.east.toFixed(1) }}  W {{ geo.bounds.west.toFixed(1) }}
          </div>
        </div>
        <div class="card" style="background:var(--surface2);grid-column:1/-1">
          <div class="section-title">Neighbours</div>
          <div class="row" style="flex-wrap:wrap;gap:0.35rem">
            <span v-for="nb in geo.neighbors" :key="nb" class="badge blue">{{ nb }}</span>
            <span v-if="geo.neighbors.length === 0" style="color:var(--muted);font-size:0.82rem">Island nation — no land borders</span>
          </div>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No geography data for "{{ geoCode }}".</p>
    </div>

    <!-- getLandlockedCountries -->
    <div class="card col">
      <div class="section-title">getLandlockedCountries()</div>
      <div class="code">getLandlockedCountries() // → {{ landlocked.length }} countries</div>
      <div class="row" style="flex-wrap:wrap;gap:0.35rem">
        <span v-for="c in landlocked" :key="c.alpha2" class="badge yellow">
          {{ c.alpha2 }}
        </span>
      </div>
    </div>

    <!-- getCountriesByClimate -->
    <div class="card col">
      <div class="section-title">getCountriesByClimate(climate)</div>
      <div class="code">getCountriesByClimate("{{ selectedClimate }}")
// → {{ byClimate.length }} countries</div>
      <select v-model="selectedClimate" style="max-width:220px">
        <option v-for="z in climateZones" :key="z" :value="z">{{ z }}</option>
      </select>
      <div class="row" style="flex-wrap:wrap;gap:0.35rem">
        <span v-for="c in byClimate" :key="c.alpha2" class="badge blue">{{ c.alpha2 }}</span>
      </div>
    </div>

    <!-- doCountriesBorder / getNeighbors -->
    <div class="card col">
      <div class="section-title">getNeighbors(alpha2) &amp; doCountriesBorder(a, b)</div>
      <div class="code">getNeighbors("{{ borderA }}")
doCountriesBorder("{{ borderA }}", "{{ borderB }}")</div>
      <div class="row">
        <input v-model="borderA" placeholder="Country A (alpha-2)" style="max-width:140px" />
        <input v-model="borderB" placeholder="Country B (alpha-2)" style="max-width:140px" />
      </div>
      <div class="row" style="flex-wrap:wrap;gap:0.35rem">
        <span class="section-title" style="margin-bottom:0">Neighbors of {{ borderA.toUpperCase() }}:</span>
        <span v-for="nb in neighbors" :key="nb.alpha2" class="badge blue">{{ nb.alpha2 }}</span>
      </div>
      <div>
        <span class="section-title">Do they border?</span>
        <span :class="['badge', borders ? 'green' : 'red']" style="font-size:0.9rem">
          {{ borders ? `✓ ${borderA.toUpperCase()} and ${borderB.toUpperCase()} share a border` : `✗ ${borderA.toUpperCase()} and ${borderB.toUpperCase()} do not share a border` }}
        </span>
      </div>
    </div>

    <!-- distance + direction -->
    <div class="card col">
      <div class="section-title">getDistanceBetweenCountries &amp; getDirectionBetweenCountries</div>
      <div class="code">getDistanceBetweenCountries("{{ distA }}", "{{ distB }}")
// → {{ distance !== null ? distance.toFixed(0) + " km" : "null" }}

getDirectionBetweenCountries("{{ distA }}", "{{ distB }}")
// → "{{ direction ?? 'null' }}"</div>
      <div class="row">
        <input v-model="distA" placeholder="From (alpha-2)" style="max-width:140px" />
        <span style="color:var(--muted)">→</span>
        <input v-model="distB" placeholder="To (alpha-2)" style="max-width:140px" />
      </div>
      <div v-if="distance !== null" class="row" style="gap:1rem">
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Distance</div>
          <div style="font-size:1.2rem;font-weight:700">{{ distance.toFixed(0) }} km</div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Direction</div>
          <div style="font-size:1.2rem;font-weight:700">{{ direction }}</div>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">Enter two valid alpha-2 codes.</p>
    </div>

    <!-- raw haversine / bearing -->
    <div class="card col">
      <div class="section-title">haversineDistance · bearing · bearingToCardinal</div>
      <div class="code">import { haversineDistance, bearing, bearingToCardinal } from "@sil/data";

haversineDistance({{ rawLat1 }}, {{ rawLon1 }}, {{ rawLat2 }}, {{ rawLon2 }})
// → {{ rawDistance.toFixed(2) }} km

bearing({{ rawLat1 }}, {{ rawLon1 }}, {{ rawLat2 }}, {{ rawLon2 }})
// → {{ rawBearing.toFixed(2) }}°

bearingToCardinal({{ rawBearing.toFixed(2) }})
// → "{{ bearingToCardinal(rawBearing) }}"</div>
      <div class="grid-2">
        <div class="col" style="gap:0.35rem">
          <div class="section-title">Point A</div>
          <div class="row">
            <input type="number" v-model.number="rawLat1" placeholder="Lat" style="max-width:110px" step="0.01" />
            <input type="number" v-model.number="rawLon1" placeholder="Lon" style="max-width:110px" step="0.01" />
          </div>
        </div>
        <div class="col" style="gap:0.35rem">
          <div class="section-title">Point B</div>
          <div class="row">
            <input type="number" v-model.number="rawLat2" placeholder="Lat" style="max-width:110px" step="0.01" />
            <input type="number" v-model.number="rawLon2" placeholder="Lon" style="max-width:110px" step="0.01" />
          </div>
        </div>
      </div>
      <div class="row" style="gap:1rem">
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Distance</div>
          <div style="font-weight:700">{{ rawDistance.toFixed(1) }} km</div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Bearing</div>
          <div style="font-weight:700">{{ rawBearing.toFixed(1) }}°</div>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Cardinal</div>
          <div style="font-weight:700">{{ bearingToCardinal(rawBearing) }}</div>
        </div>
      </div>
    </div>

    <!-- compareTemperature / compareSize / getHemisphere -->
    <div class="card col">
      <div class="section-title">compareTemperature · compareSize · getHemisphere</div>
      <div class="code">import { compareTemperature, compareSize, getHemisphere } from "@sil/data";

compareTemperature("{{ compareA }}", "{{ compareB }}")
// → "{{ compareTemperature(compareA.toUpperCase(), compareB.toUpperCase()) ?? 'null' }}"

compareSize("{{ compareA }}", "{{ compareB }}")
// → "{{ compareSize(compareA.toUpperCase(), compareB.toUpperCase()) ?? 'null' }}"

getHemisphere("{{ compareA }}")
// → {{ hemiA ? JSON.stringify(hemiA) : 'null' }}</div>
      <div class="row">
        <input v-model="compareA" placeholder="Country A (alpha-2)" style="max-width:140px" />
        <span style="color:var(--muted)">vs</span>
        <input v-model="compareB" placeholder="Country B (alpha-2)" style="max-width:140px" />
      </div>
      <div class="row" style="gap:1rem;flex-wrap:wrap">
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Temperature</div>
          <span :class="tempBadgeClass">{{ compareTemperature(compareA.toUpperCase(), compareB.toUpperCase()) ?? 'n/a' }}</span>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Size</div>
          <span class="badge">{{ compareSize(compareA.toUpperCase(), compareB.toUpperCase()) ?? 'n/a' }}</span>
        </div>
        <div class="card" style="background:var(--surface2)">
          <div class="section-title">Hemisphere of {{ compareA.toUpperCase() }}</div>
          <span class="badge blue" v-if="hemiA">{{ hemiA.ns }} / {{ hemiA.ew }}</span>
          <span v-else style="color:var(--muted);font-size:0.82rem">n/a</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  getCountryGeography,
  getLandlockedCountries,
  getCountriesByClimate,
  getNeighbors,
  doCountriesBorder,
  getDistanceBetweenCountries,
  getDirectionBetweenCountries,
  haversineDistance,
  bearing,
  bearingToCardinal,
  compareTemperature,
  compareSize,
  getHemisphere,
} from "@sil/data";
import type { ClimateZone } from "@sil/data";

const geoCode = ref("DE");
const geo = computed(() => getCountryGeography(geoCode.value.toUpperCase()));

const landlocked = getLandlockedCountries();

const climateZones: ClimateZone[] = [
  "tropical", "subtropical", "arid", "mediterranean",
  "temperate", "continental", "subarctic", "arctic",
];
const selectedClimate = ref<ClimateZone>("temperate");
const byClimate = computed(() => getCountriesByClimate(selectedClimate.value));

const borderA = ref("FR");
const borderB = ref("DE");
const neighbors = computed(() => getNeighbors(borderA.value.toUpperCase()));
const borders = computed(() => doCountriesBorder(borderA.value.toUpperCase(), borderB.value.toUpperCase()));

const distA = ref("US");
const distB = ref("JP");
const distance = computed(() => getDistanceBetweenCountries(distA.value.toUpperCase(), distB.value.toUpperCase()));
const direction = computed(() => getDirectionBetweenCountries(distA.value.toUpperCase(), distB.value.toUpperCase()));

// Raw haversine
const rawLat1 = ref(52.3676);  // Amsterdam
const rawLon1 = ref(4.9041);
const rawLat2 = ref(48.8566);  // Paris
const rawLon2 = ref(2.3522);

const rawDistance = computed(() => haversineDistance(rawLat1.value, rawLon1.value, rawLat2.value, rawLon2.value));
const rawBearing = computed(() => bearing(rawLat1.value, rawLon1.value, rawLat2.value, rawLon2.value));

// compareTemperature / compareSize / getHemisphere
const compareA = ref("NO");
const compareB = ref("BR");
const hemiA = computed(() => getHemisphere(compareA.value.toUpperCase()));
const tempBadgeClass = computed(() => {
  const t = compareTemperature(compareA.value.toUpperCase(), compareB.value.toUpperCase());
  return t === "hotter" ? "badge red" : t === "colder" ? "badge blue" : "badge green";
});
</script>
