import { Show } from "solid-js";

export function Navigation() {
  const navigationItems = [
    { href: "/", displayText: "home" },
    { href: "/about", displayText: "about" },
    // { href: "/writing", displayText: "writing" },
    { href: "/rss.xml", displayText: "rss feed" },
  ];

  return (
    <nav class="flex gap-2">
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
