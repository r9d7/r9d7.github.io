export type CurseFaceProps = { class?: string };

export function CursedFace(props: CurseFaceProps) {
  return (
    <div
      class={["text-7xl flex flex-col items-center", props.class]
        .filter(Boolean)
        .join(" ")}
    >
      <p>
        <span class="rotate-y-180 inline-block">👁👂</span>👃👁👂
      </p>
      <p>👄</p>
    </div>
  );
}
