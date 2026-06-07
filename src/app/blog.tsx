import { createFileRoute } from "@tanstack/react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BlogCard from "@/components/normaluicomponents/blogCard";
import { createServerFn } from "@tanstack/react-start";

interface PostNode {
  url: string;
  coverImage: { url: string } | null;
  title: string;
  brief: string;
}

const fetchBlogPosts = createServerFn().handler(async (): Promise<PostNode[]> => {
  const query = `
    query Publication {
      publication(host: "pratyaywrites.hashnode.dev") {
        posts(first: 50) {
          edges {
            node {
              coverImage { url }
              title
              brief
              url
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    if (json.errors) throw json.errors;
    return json.data?.publication?.posts?.edges.map((e: any) => e.node) ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
});

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  loader: async () => {
    const posts = await fetchBlogPosts();
    return { posts };
  },
});

function BlogPage() {
  const { posts } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center tracking-wider mb-16">
        Blogs by Pratyay Mitra Mustafi
      </h1>

      {posts.length === 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton height={220} className="rounded-xl" />
              <Skeleton height={24} width="70%" />
              <Skeleton count={2} />
            </div>
          ))}
        </div>
      )}

      {posts.length > 0 && (
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {posts
            .filter((p) => p.coverImage?.url)
            .map((post) => (
              <BlogCard
                key={post.url}
                link={post.url}
                imageUrl={post.coverImage!.url}
                title={post.title}
                brief={post.brief}
              />
            ))}
        </section>
      )}
    </main>
  );
}
