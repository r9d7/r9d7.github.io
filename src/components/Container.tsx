import type { ParentProps } from "solid-js";

export type ContainerProps = ParentProps<{ class?: string }>;

export function Container(props: ContainerProps) {
  return (
    <div class={["container mx-auto", props.class].filter(Boolean).join(" ")}>
      {props.children}
    </div>
  );
}
