<template>
  <div class="col" style="gap:1.5rem">
    <div>
      <h2 style="font-size:1.4rem;margin-bottom:0.25rem">Flags</h2>
      <p style="color:var(--muted);font-size:0.88rem">
        SVG &amp; PNG flag URLs, dominant colors, and visually similar flags.
      </p>
    </div>

    <!-- getFlagSvgUrl / getFlagPngUrl -->
    <div class="card col">
      <div class="section-title">getFlagSvgUrl(alpha2) &amp; getFlagPngUrl(alpha2, width)</div>
      <div class="code">import { getFlagSvgUrl, getFlagPngUrl } from "@sil/data";

getFlagSvgUrl("{{ flagCode }}")
// → "{{ getFlagSvgUrl(flagCode) }}"

getFlagPngUrl("{{ flagCode }}", {{ pngWidth }})
// → "{{ getFlagPngUrl(flagCode, pngWidth as any) }}"</div>
      <div class="row">
        <input v-model="flagCode" placeholder="Alpha-2, e.g. FR" style="max-width:120px" />
        <select v-model.number="pngWidth" style="max-width:120px">
          <option v-for="w in widths" :key="w" :value="w">{{ w }}px</option>
        </select>
      </div>
      <div v-if="flagCode" class="row" style="gap:1.5rem;align-items:flex-start">
        <div>
          <div class="section-title" style="margin-bottom:0.35rem">SVG</div>
          <img :src="getFlagSvgUrl(flagCode)" :alt="flagCode" class="flag-img" style="width:180px;border:1px solid var(--border)" />
        </div>
        <div>
          <div class="section-title" style="margin-bottom:0.35rem">PNG ({{ pngWidth }}px)</div>
          <img :src="getFlagPngUrl(flagCode, pngWidth as any)" :alt="flagCode" class="flag-img" style="width:180px;border:1px solid var(--border)" />
        </div>
      </div>
    </div>

    <!-- getFlagData -->
    <div class="card col">
      <div class="section-title">getFlagData(alpha2)</div>
      <div class="code">getFlagData("{{ flagCode }}")</div>
      <div v-if="flagInfo">
        <div class="grid-2">
          <div><span class="section-title">SVG URL</span><div style="font-size:0.78rem;word-break:break-all;color:var(--muted)">{{ flagInfo.svgUrl }}</div></div>
          <div>
            <span class="section-title">Dominant colors</span>
            <div class="row" style="gap:0.35rem;flex-wrap:wrap">
              <span v-for="col in flagInfo.colors" :key="col" class="badge">{{ col }}</span>
            </div>
          </div>
          <div>
            <span class="section-title">Similar flags</span>
            <div class="row" style="gap:0.35rem;flex-wrap:wrap">
              <span v-for="sim in flagInfo.similar" :key="sim" class="badge blue">{{ sim }}</span>
              <span v-if="flagInfo.similar.length === 0" style="color:var(--muted);font-size:0.8rem">None recorded</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No flag data for "{{ flagCode }}".</p>
    </div>

    <!-- getFlagsByColor -->
    <div class="card col">
      <div class="section-title">getFlagsByColor(color)</div>
      <div class="code">getFlagsByColor("{{ selectedColor }}")
// → {{ byColor.length }} flags</div>
      <select v-model="selectedColor" style="max-width:180px">
        <option v-for="c in flagColors" :key="c" :value="c">{{ c }}</option>
      </select>
      <div class="grid-3" style="max-height:360px;overflow-y:auto">
        <div
          v-for="f in byColor"
          :key="f.alpha2"
          class="card row"
          style="background:var(--surface2);gap:0.5rem;padding:0.5rem;align-items:center"
        >
          <img :src="f.svgUrl" :alt="f.alpha2" class="flag-img" style="width:48px" />
          <span style="font-size:0.82rem">{{ f.alpha2 }}</span>
        </div>
      </div>
    </div>

    <!-- getSimilarFlags -->
    <div class="card col">
      <div class="section-title">getSimilarFlags(alpha2)</div>
      <div class="code">getSimilarFlags("{{ simCode }}")</div>
      <input v-model="simCode" placeholder="Alpha-2, e.g. NL" style="max-width:120px" />
      <div v-if="similarFlags.length > 0" class="row" style="flex-wrap:wrap;gap:0.75rem">
        <div
          v-for="f in similarFlags"
          :key="f.alpha2"
          class="card"
          style="background:var(--surface2);padding:0.5rem;text-align:center;min-width:80px"
        >
          <img :src="f.svgUrl" :alt="f.alpha2" class="flag-img" style="width:64px;margin:0 auto 0.35rem" />
          <div style="font-size:0.78rem">{{ f.alpha2 }}</div>
        </div>
      </div>
      <p v-else style="color:var(--muted);font-size:0.85rem">No similar flags recorded for "{{ simCode }}".</p>
    </div>

    <!-- flag gallery -->
    <div class="card col">
      <div class="section-title">Flag Gallery (all {{ flagData.length }} flags)</div>
      <input v-model="gallerySearch" placeholder="Filter by alpha-2…" style="max-width:200px" />
      <div class="grid-3" style="max-height:460px;overflow-y:auto">
        <div
          v-for="f in galleryFiltered"
          :key="f.alpha2"
          class="card"
          style="background:var(--surface2);padding:0.5rem;text-align:center"
        >
          <img :src="f.svgUrl" :alt="f.alpha2" class="flag-img" style="width:64px;margin:0 auto 0.35rem" />
          <div style="font-size:0.78rem;color:var(--muted)">{{ f.alpha2 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { flagData, getFlagSvgUrl, getFlagPngUrl, getFlagData, getFlagsByColor, getSimilarFlags } from "@sil/data";
import type { FlagColor } from "@sil/data";

const flagCode = ref("NL");
const pngWidth = ref(320);
const widths = [40, 80, 160, 320, 640, 1280, 2560];

const flagInfo = computed(() => getFlagData(flagCode.value.toUpperCase()));

const flagColors: FlagColor[] = [
  "red","blue","green","white","black","yellow","orange","purple","brown","pink","gray","gold","silver","multicolor",
];
const selectedColor = ref<FlagColor>("red");
const byColor = computed(() => getFlagsByColor(selectedColor.value));

const simCode = ref("NL");
const similarFlags = computed(() => getSimilarFlags(simCode.value.toUpperCase()));

const gallerySearch = ref("");
const galleryFiltered = computed(() => {
  const q = gallerySearch.value.toUpperCase();
  return q ? flagData.filter(f => f.alpha2.includes(q)) : flagData;
});
</script>
