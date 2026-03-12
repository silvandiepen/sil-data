<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">Currencies</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        {{ currencies.length }} ISO 4217 currencies with symbols and country associations.
      </p>
    </div>

    <!-- getCurrencyByCode -->
    <div class="card col">
      <div class="section-title">getCurrencyByCode(isoCode)</div>
      <div class="code">import { getCurrencyByCode } from "@sil/data";
getCurrencyByCode("{{ isoCode.toUpperCase() }}")</div>
      <div class="row">
        <input v-model="isoCode" placeholder="ISO code, e.g. EUR" style="max-width:140px" />
      </div>
      <div v-if="byCode" class="card row" style="background:var(--surface2);gap:1rem">
        <div style="font-size:2.5rem;font-weight:700;color:var(--accent)">{{ byCode.symbol }}</div>
        <div>
          <div style="font-weight:700;font-size:1.1rem">{{ byCode.name }}</div>
          <div class="row" style="margin-top:0.35rem;gap:0.4rem">
            <span class="badge blue">{{ byCode.code }}</span>
          </div>
          <div v-if="byCode.countries && byCode.countries.length" style="margin-top:0.35rem;font-size:0.8rem;color:var(--muted)">
            Used in: {{ byCode.countries.join(", ") }}
          </div>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No currency found for "{{ isoCode }}".</p>
    </div>

    <!-- getCurrencyByCountry -->
    <div class="card col">
      <div class="section-title">getCurrencyByCountry(alpha2)</div>
      <div class="code">getCurrencyByCountry("{{ countryCode.toUpperCase() }}")</div>
      <div class="row">
        <input v-model="countryCode" placeholder="Alpha-2, e.g. JP" style="max-width:140px" />
      </div>
      <div v-if="byCountry" class="card row" style="background:var(--surface2);gap:1rem">
        <div style="font-size:2.5rem;font-weight:700;color:var(--accent)">{{ byCountry.symbol }}</div>
        <div>
          <div style="font-weight:700;font-size:1.1rem">{{ byCountry.name }}</div>
          <span class="badge blue">{{ byCountry.code }}</span>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No currency found for country "{{ countryCode }}".</p>
    </div>

    <!-- full list -->
    <div class="card col">
      <div class="section-title">All Currencies ({{ currencies.length }})</div>
      <div class="code">import { currencies } from "@sil/data";
currencies.length // → {{ currencies.length }}</div>
      <input v-model="search" placeholder="Search by name, code or symbol…" style="max-width:300px" />
      <div class="scroll-table">
        <table>
          <thead>
            <tr><th>Symbol</th><th>Code</th><th>Name</th><th>Used in</th></tr>
          </thead>
          <tbody>
            <tr v-for="c in filtered" :key="c.code">
              <td style="font-size:1.2rem;font-weight:700;color:var(--accent)">{{ c.symbol }}</td>
              <td><span class="badge blue">{{ c.code }}</span></td>
              <td>{{ c.name }}</td>
              <td style="font-size:0.78rem;color:var(--muted)">{{ c.countries?.join(", ") ?? "—" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { currencies, getCurrencyByCode, getCurrencyByCountry } from "@sil/data";

const isoCode = ref("EUR");
const byCode = computed(() => getCurrencyByCode(isoCode.value.toUpperCase()));

const countryCode = ref("JP");
const byCountry = computed(() => getCurrencyByCountry(countryCode.value.toUpperCase()));

const search = ref("");
const filtered = computed(() => {
  const q = search.value.toLowerCase();
  if (!q) return currencies;
  return currencies.filter(c =>
    c.code.toLowerCase().includes(q) ||
    c.name.toLowerCase().includes(q) ||
    c.symbol.toLowerCase().includes(q),
  );
});
</script>
