<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">States &amp; Provinces</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        {{ states.length }} states, provinces, territories &amp; more from 20+ countries.
      </p>
    </div>

    <!-- getStatesByCountry -->
    <div class="card col">
      <div class="section-title">getStatesByCountry(countryCode)</div>
      <div class="code">import { getStatesByCountry } from "@sil/data";
getStatesByCountry("{{ countryCode }}")</div>
      <div class="row">
        <select v-model="countryCode" style="max-width:260px">
          <option v-for="cc in availableCountries" :key="cc.code" :value="cc.code">
            {{ cc.flag }} {{ cc.name }} ({{ cc.code }})
          </option>
        </select>
      </div>
      <p style="color:var(--muted);font-size:0.82rem">{{ statesByCountry.length }} divisions</p>
      <div class="scroll-table">
        <table>
          <thead>
            <tr><th>Code</th><th>Name</th><th>Type</th></tr>
          </thead>
          <tbody>
            <tr v-for="s in statesByCountry" :key="s.code + s.country">
              <td><span class="badge blue">{{ s.code }}</span></td>
              <td>{{ s.name }}</td>
              <td><span class="badge">{{ s.type }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- getStateByCode -->
    <div class="card col">
      <div class="section-title">getStateByCode(code, countryCode)</div>
      <div class="code">getStateByCode("{{ stateCode }}", "{{ stateCountry }}")</div>
      <div class="row">
        <input v-model="stateCode" placeholder="State code, e.g. CA" style="max-width:120px" />
        <input v-model="stateCountry" placeholder="Country, e.g. US" style="max-width:120px" />
      </div>
      <div v-if="foundState" class="card" style="background:var(--surface2)">
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem">{{ foundState.name }}</div>
        <div class="grid-2">
          <div><span class="section-title">Code</span><div>{{ foundState.code }}</div></div>
          <div><span class="section-title">Country</span><div>{{ foundState.country }}</div></div>
          <div><span class="section-title">Type</span><div>
            <span class="badge">{{ foundState.type }}</span>
          </div></div>
        </div>
      </div>
      <p v-else style="color:var(--red);font-size:0.85rem">Not found.</p>
    </div>

    <!-- getStatesByType -->
    <div class="card col">
      <div class="section-title">getStatesByType(type)</div>
      <div class="code">getStatesByType("{{ selectedType }}")
// → {{ byType.length }} entries</div>
      <div class="row">
        <select v-model="selectedType" style="max-width:220px">
          <option v-for="t in stateTypes" :key="t" :value="t">{{ t }}</option>
        </select>
        <span style="color:var(--muted);font-size:0.85rem">{{ byType.length }} results</span>
      </div>
      <div class="scroll-table">
        <table>
          <thead>
            <tr><th>Code</th><th>Name</th><th>Country</th></tr>
          </thead>
          <tbody>
            <tr v-for="s in byType.slice(0, 80)" :key="s.code + s.country">
              <td><span class="badge blue">{{ s.code }}</span></td>
              <td>{{ s.name }}</td>
              <td>{{ s.country }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="byType.length > 80" style="color:var(--muted);font-size:0.8rem">
        … and {{ byType.length - 80 }} more.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { states, getStatesByCountry, getStateByCode, getStatesByType, getCountryByCode, getCountryFlag } from "@sil/data";
import type { StateType } from "@sil/data";

// derive unique countries that have state data
const availableCountries = computed(() => {
  const codes = [...new Set(states.map(s => s.country))].sort();
  return codes.map(code => {
    const c = getCountryByCode(code);
    return { code, name: c?.name ?? code, flag: c?.flag ?? "" };
  });
});

const countryCode = ref("US");
const statesByCountry = computed(() => getStatesByCountry(countryCode.value));

const stateCode = ref("CA");
const stateCountry = ref("US");
const foundState = computed(() => getStateByCode(stateCode.value.toUpperCase(), stateCountry.value.toUpperCase()));

const stateTypes: StateType[] = [
  "state", "province", "territory", "autonomous region", "district",
  "department", "region", "county", "emirate", "canton",
];
const selectedType = ref<StateType>("province");
const byType = computed(() => getStatesByType(selectedType.value));
</script>
