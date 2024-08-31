import type { ParentProps } from "solid-js";

export type ContainerProps = ParentProps<{ class?: string }>;

export function Container(props: ContainerProps) {
  return (
    <div
      class={["w-full max-w-screen-sm mx-auto px-4", props.class]
        .filter(Boolean)
        .join(" ")}
    >
      {props.children}
    </div>
  );
}
