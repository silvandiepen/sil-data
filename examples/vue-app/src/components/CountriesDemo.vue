<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">Countries</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        {{ countries.length }} countries · search, filter by continent, look up by code.
      </p>
    </div>

    <!-- search + filters -->
    <div class="card col">
      <div class="section-title">Search &amp; Filter</div>
      <div class="code">import { countries, getCountryByCode, getCountriesByContinent, getCountryFlag, getRecognizedCountries } from "@sil/data";</div>
      <div class="row">
        <input v-model="search" placeholder="Search by name, code or capital…" style="max-width:320px" />
        <select v-model="continentFilter" style="max-width:200px">
          <option value="">All continents</option>
          <option v-for="c in continentNames" :key="c" :value="c">{{ c }}</option>
        </select>
        <label class="row" style="gap:0.4rem;cursor:pointer">
          <input type="checkbox" v-model="recognizedOnly" style="width:auto" />
          <span style="font-size:0.85rem">Recognized only</span>
        </label>
      </div>
      <p style="color:var(--muted);font-size:0.82rem">
        Showing {{ filtered.length }} of {{ countries.length }} countries
      </p>
      <div class="scroll-table">
        <table>
          <thead>
            <tr>
              <th>Flag</th><th>Name</th><th>Alpha-2</th><th>Alpha-3</th>
              <th>Capital</th><th>Continent</th><th>Phone</th><th>Currency</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filtered.slice(0, 100)" :key="c.alpha2">
              <td style="font-size:1.4rem">{{ c.flag }}</td>
              <td>{{ c.name }}</td>
              <td><span class="badge blue">{{ c.alpha2 }}</span></td>
              <td><span class="badge">{{ c.alpha3 }}</span></td>
              <td>{{ c.capital }}</td>
              <td>{{ c.continent }}</td>
              <td>{{ c.phoneCode }}</td>
              <td>{{ c.currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="filtered.length > 100" style="color:var(--muted);font-size:0.8rem">
        … and {{ filtered.length - 100 }} more (refine your search to see all)
      </p>
    </div>

    <!-- getCountryByCode -->
    <div class="card col">
      <div class="section-title">getCountryByCode(code)</div>
      <div class="code">getCountryByCode("{{ lookupCode }}")</div>
      <div class="row">
        <input v-model="lookupCode" placeholder="Alpha-2 code, e.g. FR" style="max-width:160px" />
      </div>
      <div v-if="looked" class="card" style="background:var(--surface2)">
        <div class="row" style="font-size:1.6rem;margin-bottom:0.5rem">
          {{ looked.flag }} <strong>{{ looked.name }}</strong>
          <span v-if="looked.nativeName" style="color:var(--muted);font-size:1rem">({{ looked.nativeName }})</span>
        </div>
        <div class="grid-2">
          <div><span class="section-title">Alpha-2</span><div>{{ looked.alpha2 }}</div></div>
          <div><span class="section-title">Alpha-3</span><div>{{ looked.alpha3 }}</div></div>
          <div><span class="section-title">Numeric</span><div>{{ looked.numeric }}</div></div>
          <div><span class="section-title">Capital</span><div>{{ looked.capital }}</div></div>
          <div><span class="section-title">Continent</span><div>{{ looked.continent }}</div></div>
          <div><span class="section-title">Phone</span><div>{{ looked.phoneCode }}</div></div>
          <div><span class="section-title">Currency</span><div>{{ looked.currency }}</div></div>
          <div><span class="section-title">TLD</span><div>{{ looked.tld ?? "—" }}</div></div>
          <div><span class="section-title">Languages</span><div>{{ looked.languages?.join(", ") ?? "—" }}</div></div>
          <div><span class="section-title">Recognized</span><div>
            <span :class="['badge', looked.recognized ? 'green' : 'red']">{{ looked.recognized ? 'Yes' : 'No' }}</span>
          </div></div>
        </div>
      </div>
      <p v-else style="color:var(--red);font-size:0.85rem">No country found for code "{{ lookupCode }}"</p>
    </div>

    <!-- getRecognizedCountries -->
    <div class="card col">
      <div class="section-title">getRecognizedCountries()</div>
      <div class="code">const recognized = getRecognizedCountries();
// → {{ getRecognizedCountries().length }} UN-recognized countries</div>
      <p style="color:var(--muted);font-size:0.85rem">
        Returns {{ getRecognizedCountries().length }} officially UN-recognized countries
        out of {{ countries.length }} total entries.
      </p>
    </div>

    <!-- getCountriesByContinent -->
    <div class="card col">
      <div class="section-title">getCountriesByContinent(continent)</div>
      <div class="code">getCountriesByContinent("{{ selectedContinent }}")</div>
      <select v-model="selectedContinent" style="max-width:220px">
        <option v-for="c in continentNames" :key="c" :value="c">{{ c }}</option>
      </select>
      <p style="color:var(--muted);font-size:0.85rem">
        {{ byContinent.length }} countries in {{ selectedContinent }}
      </p>
      <div class="grid-3">
        <div v-for="c in byContinent" :key="c.alpha2" class="card row" style="background:var(--surface2);gap:0.5rem;padding:0.5rem 0.75rem">
          <span style="font-size:1.3rem">{{ c.flag }}</span>
          <div>
            <div style="font-size:0.82rem;font-weight:600">{{ c.name }}</div>
            <div style="color:var(--muted);font-size:0.72rem">{{ c.alpha2 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- getCountryFlag -->
    <div class="card col">
      <div class="section-title">getCountryFlag(alpha2)</div>
      <div class="code">getCountryFlag("{{ flagCode }}") // → {{ getCountryFlag(flagCode) || '?' }}</div>
      <div class="row">
        <input v-model="flagCode" placeholder="e.g. US" style="max-width:120px" />
        <span style="font-size:3rem">{{ getCountryFlag(flagCode) }}</span>
      </div>
      <p style="color:var(--muted);font-size:0.82rem">Computes the Unicode emoji flag from any alpha-2 code.</p>
    </div>

    <!-- phoneCountryCodes + lookup -->
    <div class="card col">
      <div class="section-title">phoneCountryCodes · getPhoneCodeByCountry · getCountriesByPhoneCode</div>
      <div class="code">import { phoneCountryCodes, getPhoneCodeByCountry, getCountriesByPhoneCode } from "@sil/data";

// {{ phoneCountryCodes.length }} entries (including territories)
getPhoneCodeByCountry("{{ phoneCountry }}")
// phoneCode → "{{ getPhoneCodeByCountry(phoneCountry)?.phoneCode ?? '?' }}"

getCountriesByPhoneCode("{{ sharedPhoneCode }}")
// → {{ getCountriesByPhoneCode(sharedPhoneCode).length }} countries share this code</div>
      <div class="row" style="flex-wrap:wrap;gap:1rem">
        <div class="col" style="gap:0.35rem">
          <div class="section-title">Look up by country code</div>
          <div class="row">
            <input v-model="phoneCountry" placeholder="Alpha-2, e.g. US" style="max-width:140px" />
          </div>
          <div v-if="phoneLookup" class="card row" style="background:var(--surface2);gap:0.75rem;padding:0.6rem 0.75rem">
            <span style="font-size:1.4rem">{{ phoneLookup.flag }}</span>
            <div>
              <div style="font-weight:600;font-size:0.9rem">{{ phoneLookup.country }}</div>
              <div style="color:var(--accent);font-size:1.1rem;font-weight:700">{{ phoneLookup.phoneCode }}</div>
            </div>
          </div>
          <p v-else style="color:var(--muted);font-size:0.82rem">Not found.</p>
        </div>
        <div class="col" style="gap:0.35rem">
          <div class="section-title">Countries sharing a dial code</div>
          <div class="row">
            <input v-model="sharedPhoneCode" placeholder="e.g. +1" style="max-width:120px" />
          </div>
          <div class="row" style="flex-wrap:wrap;gap:0.35rem">
            <div
              v-for="pc in sharedCountries"
              :key="pc.alpha2"
              class="card row"
              style="background:var(--surface2);gap:0.4rem;padding:0.4rem 0.6rem"
            >
              <span style="font-size:1.1rem">{{ pc.flag }}</span>
              <span style="font-size:0.78rem">{{ pc.country }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- continents -->
    <div class="card col">
      <div class="section-title">continents · getContinentByCode(code)</div>
      <div class="code">import { continents, getContinentByCode } from "@sil/data";

continents.length // → {{ continents.length }}
getContinentByCode("{{ contCode }}")</div>
      <div class="row">
        <input v-model="contCode" placeholder="2-letter code, e.g. EU" style="max-width:120px" />
      </div>
      <div class="grid-2" style="margin-top:0.5rem">
        <div
          v-for="cont in continents"
          :key="cont.code"
          class="card"
          :style="`background:var(--surface2);border-left:3px solid ${cont.code === contCode.toUpperCase() ? 'var(--accent)' : 'var(--border)'}`"
        >
          <div style="font-weight:700;font-size:0.95rem">{{ cont.name }}</div>
          <div style="color:var(--muted);font-size:0.75rem;margin-top:0.25rem">
            <span class="badge blue">{{ cont.code }}</span>
            &nbsp;{{ cont.countries }} countries ·
            {{ (cont.population / 1e6).toFixed(0) }}M people ·
            {{ (cont.area / 1e6).toFixed(1) }}M km²
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  countries,
  getCountryByCode,
  getCountriesByContinent,
  getCountryFlag,
  getRecognizedCountries,
  phoneCountryCodes,
  getPhoneCodeByCountry,
  getCountriesByPhoneCode,
  continents,
  getContinentByCode,
} from "@sil/data";
import type { ContinentName } from "@sil/data";

const search = ref("");
const continentFilter = ref<ContinentName | "">("");
const recognizedOnly = ref(false);

const continentNames = [
  "Africa","Antarctica","Asia","Europe","North America","Oceania","South America",
] as ContinentName[];

const filtered = computed(() => {
  let list = recognizedOnly.value ? getRecognizedCountries() : [...countries];
  if (continentFilter.value) list = list.filter(c => c.continent === continentFilter.value);
  const q = search.value.toLowerCase().trim();
  if (q) list = list.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.alpha2.toLowerCase().includes(q) ||
    c.alpha3.toLowerCase().includes(q) ||
    (c.capital ?? "").toLowerCase().includes(q),
  );
  return list;
});

const lookupCode = ref("NL");
const looked = computed(() => getCountryByCode(lookupCode.value));

const selectedContinent = ref<ContinentName>("Europe");
const byContinent = computed(() => getCountriesByContinent(selectedContinent.value));

const flagCode = ref("JP");

const phoneCountry = ref("US");
const phoneLookup = computed(() => getPhoneCodeByCountry(phoneCountry.value.toUpperCase()));

const sharedPhoneCode = ref("+1");
const sharedCountries = computed(() => getCountriesByPhoneCode(sharedPhoneCode.value));

const contCode = ref("EU");
</script>
