export type TagListProps = {
  tags: string[];
};

export function TagList(props: TagListProps) {
  return (
    <ul class="flex flex-wrap gap-2 sm:text-lg">
      {props.tags.map((tag: string) => (
        <li>
          <a
            href={`/tags/${tag}`}
            class="bg-accent text-accent-foreground border-accent-foreground"
          >
            #{tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
