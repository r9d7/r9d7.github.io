import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [presetUno()],
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
              [`${prop}-left`]: theme.spacing!.xs,
              [`${prop}-right`]: theme.spacing!.xs,
            };
          case "y":
            return {
              [`${prop}-top`]: theme.spacing!.xs,
              [`${prop}-bottom`]: theme.spacing!.xs,
            };
          case "r":
            return { [`${prop}-right`]: theme.spacing!.xs };
          case "l":
            return { [`${prop}-left`]: theme.spacing!.xs };
          case "t":
            return { [`${prop}-top`]: theme.spacing!.xs };
          case "b":
            return { [`${prop}-bottom`]: theme.spacing!.xs };
          default:
            return { [prop]: theme.spacing!.xs };
        }
      },
    ],
    [
      /^gap(-(x|y|col|row))?-layout$/,
      ([, dir], { theme }) => {
        if (["-x", "-col"].includes(dir)) {
          return { "column-gap": theme.spacing!.xs };
        }
        if (["-y", "-row"].includes(dir)) {
          return { "row-gap": theme.spacing!.xs };
        }

        return { gap: theme.spacing!.xs };
      },
    ],
  ],
});
