<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">Geography Game (Wordle-style)</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        Guess the mystery country. After each guess you get hints via <code>getGeoHints()</code>.
      </p>
    </div>

    <div class="card col">
      <div class="section-title">getGeoHints(guess, target)</div>
      <div class="code">import { getGeoHints } from "@sil/data";

getGeoHints("{{ lastGuessCode }}", "{{ targetCode }}")
// Returns: distanceKm, direction, temperature, size, hemisphere, landlocked, climate</div>
    </div>

    <div class="card col" style="max-width:700px">
      <!-- won -->
      <div v-if="won" class="card" style="background:rgba(165,214,167,0.12);border-color:#a5d6a7;text-align:center;padding:1.5rem">
        <div style="font-size:3rem">🎉</div>
        <div style="font-size:1.4rem;font-weight:700;color:var(--green);margin:0.5rem 0">
          {{ targetCountry?.flag }} {{ targetCountry?.name }}
        </div>
        <p style="color:var(--muted);font-size:0.85rem">Solved in {{ guesses.length }} guess{{ guesses.length === 1 ? '' : 'es' }}!</p>
        <button @click="newGame" style="margin-top:1rem">🔄 New Game</button>
      </div>

      <!-- gave up -->
      <div v-else-if="gaveUp" class="card" style="background:rgba(239,154,154,0.12);border-color:#ef9a9a;text-align:center;padding:1.5rem">
        <div style="font-size:2rem">😔</div>
        <div style="color:var(--red);font-size:1rem;margin:0.5rem 0">
          The answer was: {{ targetCountry?.flag }} <strong>{{ targetCountry?.name }}</strong>
        </div>
        <button @click="newGame" style="margin-top:0.75rem">🔄 New Game</button>
      </div>

      <!-- active game -->
      <template v-else>
        <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:0.5rem">
          <div>
            <div class="section-title">Your guess ({{ guesses.length }}/10)</div>
            <div class="row" style="margin-top:0.25rem">
              <div style="position:relative;flex:1">
                <input
                  v-model="guessInput"
                  @input="filterSuggestions"
                  @keydown.enter="submitGuess"
                  @keydown.escape="suggestions = []"
                  placeholder="Type a country name or alpha-2…"
                  style="max-width:280px"
                  autocomplete="off"
                />
                <div
                  v-if="suggestions.length"
                  style="position:absolute;top:calc(100% + 4px);left:0;right:0;max-width:280px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);z-index:50;overflow-y:auto;max-height:200px"
                >
                  <div
                    v-for="s in suggestions"
                    :key="s.alpha2"
                    @click="selectSuggestion(s)"
                    style="padding:0.4rem 0.75rem;cursor:pointer;font-size:0.85rem;display:flex;gap:0.5rem;align-items:center"
                    @mouseenter="e => (e.currentTarget as HTMLElement).style.background='var(--surface2)'"
                    @mouseleave="e => (e.currentTarget as HTMLElement).style.background=''"
                  >
                    <span>{{ s.flag }}</span> {{ s.name }}
                    <span style="color:var(--muted);font-size:0.75rem">{{ s.alpha2 }}</span>
                  </div>
                </div>
              </div>
              <button @click="submitGuess" :disabled="!guessInput.trim()">Guess</button>
            </div>
            <p v-if="guessError" style="color:var(--red);font-size:0.8rem;margin-top:0.35rem">{{ guessError }}</p>
          </div>
          <div class="row" style="gap:0.5rem;align-items:flex-start">
            <button class="secondary" @click="giveUp">Give Up</button>
          </div>
        </div>

        <!-- hint legend -->
        <div class="card" style="background:var(--surface2)">
          <div class="section-title" style="margin-bottom:0.5rem">Hint Legend</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.35rem;font-size:0.78rem;color:var(--muted)">
            <span>📍 Distance to target (km)</span>
            <span>🧭 Direction to target</span>
            <span>🌡️ Warmer / Cooler / Similar temp</span>
            <span>📏 Larger / Smaller / Similar size</span>
            <span>🌐 Hemisphere (N/S/E/W)</span>
            <span>🏔️ Landlocked status</span>
            <span>☁️ Climate zone</span>
          </div>
        </div>
      </template>

      <!-- guesses list -->
      <div v-if="guesses.length" class="col" style="gap:0.5rem">
        <div class="section-title">Guesses</div>
        <div
          v-for="(g, i) in guesses"
          :key="i"
          class="card"
          :style="`background:var(--surface2);border-left:3px solid ${g.won ? '#a5d6a7' : 'var(--border)'}`"
        >
          <div class="row" style="justify-content:space-between;margin-bottom:0.4rem">
            <div class="row" style="gap:0.5rem">
              <span style="font-size:1.2rem">{{ g.flag }}</span>
              <span style="font-weight:700">{{ g.name }}</span>
              <span class="badge blue">{{ g.alpha2 }}</span>
            </div>
            <span v-if="g.won" class="badge green">✓ Correct!</span>
          </div>
          <div v-if="g.hints" style="display:flex;gap:0.5rem;flex-wrap:wrap">
            <span class="badge">📍 {{ g.hints.distanceKm.toFixed(0) }} km</span>
            <span class="badge">🧭 {{ g.hints.direction }}</span>
            <span :class="['badge', tempClass(g.hints.temperature)]">
              🌡️ {{ tempLabel(g.hints.temperature) }}
            </span>
            <span :class="['badge', sizeClass(g.hints.size)]">
              📏 {{ sizeLabel(g.hints.size) }}
            </span>
            <span class="badge">
              🌐 {{ g.hints.hemisphere.ns }}/{{ g.hints.hemisphere.ew }}
            </span>
            <span :class="['badge', g.hints.landlocked ? 'yellow' : 'green']">
              🏔️ {{ g.hints.landlocked ? 'Landlocked' : 'Coastal' }}
            </span>
            <span class="badge blue">☁️ {{ g.hints.climate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { countries, getCountryByCode, getGeoHints } from "@sil/data";
import type { Country, GeoHint } from "@sil/data";

interface GuessEntry {
  alpha2: string;
  name: string;
  flag: string;
  hints: GeoHint | null;
  won: boolean;
}

// pick a random recognized country that has geo data
function pickTarget(): Country {
  const pool = countries.filter(c => c.recognized);
  return pool[Math.floor(Math.random() * pool.length)];
}

const targetCountry = ref<Country>(pickTarget());
const targetCode = computed(() => targetCountry.value.alpha2);

const guessInput = ref("");
const guesses = ref<GuessEntry[]>([]);
const guessError = ref("");
const won = ref(false);
const gaveUp = ref(false);
const suggestions = ref<Country[]>([]);

const lastGuessCode = computed(() =>
  guesses.value.length ? guesses.value[guesses.value.length - 1].alpha2 : "—",
);

function filterSuggestions() {
  guessError.value = "";
  const q = guessInput.value.toLowerCase().trim();
  if (q.length < 1) { suggestions.value = []; return; }
  suggestions.value = countries
    .filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.alpha2.toLowerCase().startsWith(q),
    )
    .slice(0, 8);
}

function selectSuggestion(c: Country) {
  guessInput.value = c.name;
  suggestions.value = [];
  submitGuessWith(c);
}

function submitGuess() {
  suggestions.value = [];
  const q = guessInput.value.trim();
  if (!q) return;

  // find matching country
  const match = countries.find(
    c =>
      c.name.toLowerCase() === q.toLowerCase() ||
      c.alpha2.toLowerCase() === q.toLowerCase(),
  );
  if (!match) {
    guessError.value = `"${q}" is not a recognised country. Try the autocomplete.`;
    return;
  }
  submitGuessWith(match);
}

function submitGuessWith(c: Country) {
  guessInput.value = "";
  guessError.value = "";

  // check if already guessed
  if (guesses.value.some(g => g.alpha2 === c.alpha2)) {
    guessError.value = `You already guessed ${c.name}!`;
    return;
  }

  const hints = getGeoHints(c.alpha2, targetCode.value);
  const isWon = c.alpha2 === targetCode.value;

  guesses.value.push({ alpha2: c.alpha2, name: c.name, flag: c.flag, hints, won: isWon });

  if (isWon) won.value = true;
  else if (guesses.value.length >= 10) gaveUp.value = true;
}

function giveUp() { gaveUp.value = true; }

function newGame() {
  targetCountry.value = pickTarget();
  guesses.value = [];
  won.value = false;
  gaveUp.value = false;
  guessInput.value = "";
  guessError.value = "";
  suggestions.value = [];
}

function tempClass(t: string) {
  if (t === "hotter") return "badge red";
  if (t === "colder") return "badge blue";
  return "badge green";
}
function tempLabel(t: string) {
  if (t === "hotter") return "↑ Warmer";
  if (t === "colder") return "↓ Cooler";
  return "≈ Similar temp";
}
function sizeClass(s: string) {
  if (s === "larger") return "badge yellow";
  if (s === "smaller") return "badge";
  return "badge green";
}
function sizeLabel(s: string) {
  if (s === "larger") return "↑ Larger";
  if (s === "smaller") return "↓ Smaller";
  return "≈ Similar size";
}
</script>
