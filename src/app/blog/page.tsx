import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BlogCard from "@/components/normaluicomponents/blogCard";
export default async function Home() {
  let loading = false;
  const query = `query Publication {
    publication(host:"pratyaywrites.hashnode.dev") {
      posts (first:50){
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
      <div>
        <SkeletonTheme baseColor="#202020" highlightColor="#444444">
          <h1 className="top-36 p-10 text-center items-center justify-center  tracking-[20px] dark:text-gray-500 lg:text-5xl font-bold text-3xl ml-3">
            Blogs By Pratyay Mitra Mustafi
          </h1>
          {loading && (
            <div className="p-10 mt-10">
              <Skeleton height={500} count={1} />
            </div>
          )}
          <section className="body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
                {post?.map(
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
          </section>
        </SkeletonTheme>
      </div>
    </>
  );
}
