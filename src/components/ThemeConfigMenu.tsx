import { identity } from "~/lib/utils/common";

type ColorScheme = "system" | "light" | "dark";

function getCurrentColorScheme(): ColorScheme {
  if (localStorage.getItem("color-scheme")) {
    return localStorage.getItem("color-scheme")! as ColorScheme;
  }

  if (!window.matchMedia) {
    return "system";
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "system";
}

function setColorScheme(
  getNextColorScheme: (
    currentColorScheme: ColorScheme,
  ) => ColorScheme = identity,
) {
  const currentColorScheme = getCurrentColorScheme();

  if (currentColorScheme === "system") {
    document.documentElement.removeAttribute("data-color-scheme");
  } else {
    const nextColorScheme = getNextColorScheme(currentColorScheme);

    localStorage.setItem("color-scheme", nextColorScheme);
    document.documentElement.setAttribute("data-color-scheme", nextColorScheme);
  }
}

export function ThemeConfigMenu() {
  const handleAlternateColorScheme = () => {
    setColorScheme((colorScheme) =>
      colorScheme === "dark" ? "light" : "dark",
    );
  };

  return (
    <button onClick={handleAlternateColorScheme}>
      <span class="hidden group-data-[color-scheme=light]/html:block">🌙</span>
      <span class="hidden group-data-[color-scheme=dark]/html:block">☀️</span>
    </button>
  );
}
