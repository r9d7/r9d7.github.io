import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetTypography,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "Hanken Grotesk",
        serif: "Source Serif Pro",
      },
    }),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",

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
      /bg-screen/,
      () => `
          .bg-screen {
            background: linear-gradient(rgba(75, 55, 231, 0.3) 50%, transparent 50%),
              linear-gradient(
                90deg,
                rgba(64, 55, 55, 0.09),
                rgba(64, 181, 64, 0.03),
                rgba(0, 0, 255, 0.06)
              );
            background-size:
              100% 2px,
              3px 100%;
          }
        `,
    ],
  ],
  shortcuts: {
    "section-heading": "text-xl md:text-3xl text-accent truncate",
  },
});
