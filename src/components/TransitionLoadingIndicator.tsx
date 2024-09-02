import { createEffect, createSignal, onCleanup } from "solid-js";

export function TransitionLoadingIndicator() {
  const [isTransitioning, setIsTransitioning] = createSignal(false);

  createEffect(() => {
    function onBeforePreparation(event: any) {
      setIsTransitioning(true);
    }
    function onPageLoad() {
      setIsTransitioning(false);
    }

    document.addEventListener("astro:before-preparation", onBeforePreparation);
    document.addEventListener("astro:after-swap", onPageLoad);

    onCleanup(() => {
      document.removeEventListener(
        "astro:before-preparation",
        onBeforePreparation,
      );
      document.removeEventListener("astro:after-swap", onPageLoad);
    });
  });

  return (
    <div
      aria-hidden
      classList={{
        "fixed left-0 top-0 right-0 bottom-0 pointer-events-none z-50": true,
        "transition-transform duration-1000 ease-in-out motion-reduce:transition-none":
          true,
        "bg-gradient-to-b from-background to-[#1ec253]": true,
        "-translate-y-full": !isTransitioning(),
      }}
    />
  );
}
