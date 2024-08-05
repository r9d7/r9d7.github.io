import type { ParentProps } from "solid-js";

export type ContainerProps = ParentProps;

export function Container(props: ContainerProps) {
  return (
    <div class="w-full max-w-screen-md mx-auto px-layout">{props.children}</div>
  );
}
