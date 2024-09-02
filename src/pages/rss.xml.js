import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    title: "R9D7 / Blog",
    description:
      "Personal internet space of Radu Dascalu. Writing notes about anything that's interesting to me.",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>en-uk</language>`,
  });
}
