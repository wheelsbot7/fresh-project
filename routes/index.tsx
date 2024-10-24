import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="max-w-3xl px-4 pt-16 mx-auto border-dashed border-x-4 border-sky-400">
      <div>
        <h1 class="text-5xl font-bold border-solid border-x-4 border-sky-400 text-white p-3">
          Blog
        </h1>
        <div class="mt-8">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </div>
    </main>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border-solid border-rose-500 border-8 ridge">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text-gray-100 font-bold">
          {post.title}
        </h3>
        <time class="text-sky-400">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-200">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}
