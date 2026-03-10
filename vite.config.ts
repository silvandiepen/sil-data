import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*"],
      outDir: "dist/types",
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SilData",
      fileName: "sil-data",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
    },
    sourcemap: true,
    minify: false,
  },
});
