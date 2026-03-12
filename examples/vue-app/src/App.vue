<template>
  <div id="layout">
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">🌍</span>
          <span class="logo-text">@sil/data</span>
          <span class="logo-sub">Vue Demo</span>
        </div>
        <nav class="nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['nav-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </nav>
      </div>
    </header>

    <main class="main">
      <CountriesDemo v-if="activeTab === 'countries'" />
      <CitiesDemo    v-else-if="activeTab === 'cities'" />
      <StatesDemo    v-else-if="activeTab === 'states'" />
      <GeographyDemo v-else-if="activeTab === 'geography'" />
      <FlagsDemo     v-else-if="activeTab === 'flags'" />
      <MapsDemo      v-else-if="activeTab === 'maps'" />
      <CurrenciesDemo v-else-if="activeTab === 'currencies'" />
      <GeoGameDemo   v-else-if="activeTab === 'game'" />
    </main>

    <footer class="footer">
      <span>
        Built with
        <a href="https://github.com/silvandiepen/sil-data" target="_blank">@sil/data</a>
        &amp; Vue 3
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CountriesDemo  from "./components/CountriesDemo.vue";
import CitiesDemo     from "./components/CitiesDemo.vue";
import StatesDemo     from "./components/StatesDemo.vue";
import GeographyDemo  from "./components/GeographyDemo.vue";
import FlagsDemo      from "./components/FlagsDemo.vue";
import MapsDemo       from "./components/MapsDemo.vue";
import CurrenciesDemo from "./components/CurrenciesDemo.vue";
import GeoGameDemo    from "./components/GeoGameDemo.vue";

const tabs = [
  { id: "countries",  icon: "🌎", label: "Countries"  },
  { id: "cities",     icon: "🏙️",  label: "Cities"     },
  { id: "states",     icon: "🗺️",  label: "States"     },
  { id: "geography",  icon: "📐", label: "Geography"  },
  { id: "flags",      icon: "🚩", label: "Flags"      },
  { id: "maps",       icon: "🗾", label: "Maps"       },
  { id: "currencies", icon: "💱", label: "Currencies" },
  { id: "game",       icon: "🎯", label: "Geo Game"   },
];

const activeTab = ref("countries");
</script>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
}

.logo {
  align-items: center;
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.logo-icon { font-size: 1.5rem; }

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
}

.logo-sub {
  color: var(--muted);
  font-size: 0.8rem;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.nav-btn {
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 0.82rem;
  padding: 0.35rem 0.75rem;
}

.nav-btn:hover {
  background: var(--surface2);
  color: var(--text);
  opacity: 1;
}

.nav-btn.active {
  background: var(--surface2);
  border-color: var(--border);
  color: var(--accent);
  opacity: 1;
}

.main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
}

.footer {
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.8rem;
  padding: 1rem 1.5rem;
  text-align: center;
}
</style>
