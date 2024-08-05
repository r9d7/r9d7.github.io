import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import UnoCss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://whaaaaaaaastro.com",
  integrations: [solidJs(), UnoCss({ injectReset: true })],
});
