// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://mrti259.github.io",
  base: "games",
  integrations: [svelte()],
});
