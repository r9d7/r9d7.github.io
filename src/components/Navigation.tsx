import { Show } from "solid-js";

export function Navigation() {
  const navigationItems = [
    { href: "/", displayText: "home" },
    { href: "/writing", displayText: "writing" },
    { href: "/about", displayText: "about" },
  ];

  return (
    <nav class="flex gap-1">
      {navigationItems.map((item, i) => (
        <>
          <a href={item.href}>{item.displayText}</a>
          <Show when={i !== navigationItems.length - 1}>
            <span class="text-muted-foreground">/</span>
          </Show>
        </>
      ))}
    </nav>
  );
}
