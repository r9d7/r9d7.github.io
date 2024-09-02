import { type MarkdownInstance } from "astro";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export type PostListProps = {
  posts: MarkdownInstance<Record<string, any>>[];
};

export function PostList(props: PostListProps) {
  return (
    <ul class="flex flex-col text-3xl sm:text-5xl lg:text-7xl space-y-2 [&>li>a]:block">
      {props.posts
        .sort((a, b) =>
          dayjs(a.frontmatter.pubDate).isAfter(dayjs(b.frontmatter.pubDate))
            ? -1
            : 1,
        )
        .map((post) => (
          <li>
            <a href={post.url} class="truncate">
              {/* @ts-ignore */}
              <d>{dayjs(post.frontmatter.pubDate).format("YYYY·MM")}</d> ~{" "}
              <h1 class="inline font-bold">{post.frontmatter.title}</h1>
            </a>
          </li>
        ))}
    </ul>
  );
}
