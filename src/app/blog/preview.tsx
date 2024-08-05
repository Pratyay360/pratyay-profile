import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../stylesheet.css";
import Link from "next/link";
import BlogCard from "@/components/normaluicomponents/blogCard";
export default async function Blog() {
  let loading = false;
  const query = `query Publication {
        publication(host:"pratyaywrites.hashnode.dev") {
          posts (first:4){
            edges{
              node {
                coverImage {
                  url
                },
                title,
                brief,
                url
              }
            }
          }
        }
      }
      `;

  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const result = await response.json();
  const post = result.data.publication.posts.edges;
  if (!post) {
    loading = true;
  }
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444444">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold">
          Blogs
        </h1>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton height={500} count={1} />
          </div>
        )}
        <section className="body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
              {post
                .slice(0, 3)
                .map(
                  (
                    c: {
                      node: {
                        url: any;
                        coverImage: { url: any };
                        title: any;
                        brief: any;
                      };
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <div className="p-4 md:w-1/3" key={index}>
                     <BlogCard 
                     link={c.node.url}
                     imageUrl={c.node.coverImage.url}
                     title={c.node.title}
                     brief={c.node.brief}
                     />
                    </div>
                  )
                )}
            </div>
          </div>
          {!loading && (
            <center>
              <Link href="/blog">
                <button className="button-30" role="button_more_blogs">
                  See More
                </button>
              </Link>
            </center>
          )}
        </section>
      </SkeletonTheme>
    </>
  );
}
