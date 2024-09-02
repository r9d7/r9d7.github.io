import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import solidJs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import UnoCss from "unocss/astro";

import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://r9d7.github.io",
  integrations: [solidJs(), UnoCss({ injectReset: true })],
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      [remarkToc, { maxDepth: 3 }],
      [remarkCollapse, { test: "toc", summary: "Table of Contents" }],
    ],
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
  },
});
