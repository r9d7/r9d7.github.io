import { type CollectionEntry } from "astro:content";

export type PostListProps = {
  posts: CollectionEntry<"blog">[];
};

export function PostList(props: PostListProps) {
  return (
    <ul class="flex flex-col text-3xl sm:text-5xl lg:text-7xl space-y-2 [&>li>a]:block">
      {props.posts
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
        .map((post) => (
          <li>
            <a href={`/blog/${post.slug}`} class="truncate">
              <time datetime={post.data.pubDate.toISOString()}>
                {[
                  post.data.pubDate.getUTCFullYear(),
                  post.data.pubDate.getUTCMonth().toString().padStart(2, "0"),
                ].join("·")}
              </time>
              {" ~ "}
              <h1 class="inline font-bold">{post.data.title}</h1>
            </a>
          </li>
        ))}
    </ul>
  );
}
