import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetTypography,
} from "unocss";

const LAYOUT_SPACE = "2.25rem";

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",

      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },

      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },

      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
    },
    borderRadius: {
      sm: "calc(var(--radius) - 4px)",
      md: "calc(var(--radius) - 2px)",
      lg: "var(--radius)",
      xl: "calc(var(--radius) + 2px)",
      "2xl": "calc(var(--radius) + 4px)",
    },
  },
  rules: [
    [
      /^(p|m)(x|y|r|l|t|b)?-layout$/,
      ([, prop, dir], { theme, ...r }) => {
        prop = prop === "p" ? "padding" : "margin";

        switch (dir) {
          case "x":
            return {
              [`${prop}-left`]: LAYOUT_SPACE,
              [`${prop}-right`]: LAYOUT_SPACE,
            };
          case "y":
            return {
              [`${prop}-top`]: LAYOUT_SPACE,
              [`${prop}-bottom`]: LAYOUT_SPACE,
            };
          case "r":
            return { [`${prop}-right`]: LAYOUT_SPACE };
          case "l":
            return { [`${prop}-left`]: LAYOUT_SPACE };
          case "t":
            return { [`${prop}-top`]: LAYOUT_SPACE };
          case "b":
            return { [`${prop}-bottom`]: LAYOUT_SPACE };
          default:
            return { [prop]: LAYOUT_SPACE };
        }
      },
    ],
    [
      /^gap(-(x|y|col|row))?-layout$/,
      ([, dir], { theme }) => {
        if (["-x", "-col"].includes(dir)) {
          return { "column-gap": LAYOUT_SPACE };
        }
        if (["-y", "-row"].includes(dir)) {
          return { "row-gap": LAYOUT_SPACE };
        }

        return { gap: LAYOUT_SPACE };
      },
    ],
  ],
});
