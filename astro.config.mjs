import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import UnoCss from "unocss/astro";
import remarkToc from "remark-toc";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://whaaaaaaaastro.com",
  integrations: [solidJs(), UnoCss({ injectReset: true })],
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      [remarkToc, { heading: "toc", maxDepth: 3 }],
    ],
    rehypePlugins: [rehypeHeadingIds],
  },
});
