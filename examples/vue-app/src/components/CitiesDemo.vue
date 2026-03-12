<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">Cities</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        {{ cities.length }} cities including all national capitals with coordinates &amp; population.
      </p>
    </div>

    <!-- searchCities -->
    <div class="card col">
      <div class="section-title">searchCities(query)</div>
      <div class="code">import { searchCities } from "@sil/data";
searchCities("{{ searchQuery }}")</div>
      <input v-model="searchQuery" placeholder="Type a city name…" style="max-width:320px" />
      <p style="color:var(--muted);font-size:0.82rem">{{ searchResults.length }} results</p>
      <div class="scroll-table">
        <table>
          <thead>
            <tr><th>Name</th><th>Country</th><th>Capital</th><th>Lat</th><th>Lon</th><th>Population</th></tr>
          </thead>
          <tbody>
            <tr v-for="city in searchResults.slice(0, 50)" :key="city.name + city.country">
              <td style="font-weight:600">{{ city.name }}</td>
              <td>{{ city.country }}</td>
              <td>
                <span :class="['badge', city.isCapital ? 'green' : '']">{{ city.isCapital ? '✓ Capital' : '—' }}</span>
              </td>
              <td style="color:var(--muted)">{{ city.lat.toFixed(3) }}</td>
              <td style="color:var(--muted)">{{ city.lon.toFixed(3) }}</td>
              <td>{{ city.population ? city.population.toLocaleString() : "—" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- getCitiesByCountry -->
    <div class="card col">
      <div class="section-title">getCitiesByCountry(countryCode)</div>
      <div class="code">getCitiesByCountry("{{ countryCode }}")</div>
      <div class="row">
        <input v-model="countryCode" placeholder="Alpha-2, e.g. DE" style="max-width:140px" />
      </div>
      <p v-if="citiesByCountry.length === 0" style="color:var(--muted);font-size:0.85rem">No cities found.</p>
      <div v-else>
        <p style="color:var(--muted);font-size:0.82rem;margin-bottom:0.5rem">
          {{ citiesByCountry.length }} cities
        </p>
        <div class="grid-3">
          <div v-for="city in citiesByCountry" :key="city.name" class="card" style="background:var(--surface2);padding:0.6rem 0.75rem">
            <div style="font-weight:600;font-size:0.88rem">{{ city.name }}</div>
            <div class="row" style="margin-top:0.25rem;gap:0.4rem">
              <span v-if="city.isCapital" class="badge green">Capital</span>
              <span style="color:var(--muted);font-size:0.75rem">
                {{ city.lat.toFixed(2) }}, {{ city.lon.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- getCapitalCity -->
    <div class="card col">
      <div class="section-title">getCapitalCity(countryCode)</div>
      <div class="code">getCapitalCity("{{ capitalCode }}")</div>
      <div class="row">
        <input v-model="capitalCode" placeholder="Alpha-2, e.g. JP" style="max-width:140px" />
      </div>
      <div v-if="capital" class="card row" style="background:var(--surface2);gap:1rem">
        <div style="font-size:2rem">🏛️</div>
        <div>
          <div style="font-weight:700;font-size:1.1rem">{{ capital.name }}</div>
          <div style="color:var(--muted);font-size:0.82rem">
            {{ capital.lat.toFixed(4) }}° N, {{ capital.lon.toFixed(4) }}° E
          </div>
          <div v-if="capital.population" style="color:var(--muted);font-size:0.82rem">
            Population: {{ capital.population.toLocaleString() }}
          </div>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No capital found for "{{ capitalCode }}".</p>
    </div>

    <!-- getCitiesByPopulation -->
    <div class="card col">
      <div class="section-title">getCitiesByPopulation(limit)</div>
      <div class="code">getCitiesByPopulation({{ popLimit }})</div>
      <div class="row">
        <label style="font-size:0.85rem;color:var(--muted)">Limit:</label>
        <input type="number" v-model.number="popLimit" min="1" max="100" style="max-width:80px" />
      </div>
      <div class="scroll-table">
        <table>
          <thead>
            <tr><th>#</th><th>City</th><th>Country</th><th>Population</th></tr>
          </thead>
          <tbody>
            <tr v-for="(city, i) in topCities" :key="city.name">
              <td style="color:var(--muted);font-size:0.8rem">{{ i + 1 }}</td>
              <td style="font-weight:600">{{ city.name }}</td>
              <td>{{ city.country }}</td>
              <td>{{ city.population ? city.population.toLocaleString() : "—" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { cities, searchCities, getCitiesByCountry, getCapitalCity, getCitiesByPopulation } from "@sil/data";

const searchQuery = ref("Paris");
const searchResults = computed(() =>
  searchQuery.value.length >= 1 ? searchCities(searchQuery.value) : [],
);

const countryCode = ref("FR");
const citiesByCountry = computed(() => getCitiesByCountry(countryCode.value.toUpperCase()));

const capitalCode = ref("JP");
const capital = computed(() => getCapitalCity(capitalCode.value.toUpperCase()));

const popLimit = ref(20);
const topCities = computed(() => getCitiesByPopulation(popLimit.value));
</script>
