import { Handlers } from "$fresh/server.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "jsr:@deno/gfm";
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
//import { Renderer } from "./renderer.ts"

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <html>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <main class="max-w-screen-md px-4 pt-16 mx-auto">
        <h1 class="text-5xl font-bold">{post.title}</h1>
        <time class="text-rose-700">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          data-color-mode="dark"
          data-dark-theme="dark"
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
    </html>
  );
}
