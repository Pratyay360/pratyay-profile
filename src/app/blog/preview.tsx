"use client";

import { useState, useEffect } from "react";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/button.css";
import { Link } from "@tanstack/react-router";
import BlogCard from "@/components/normaluicomponents/blogCard";

interface PostNode {
  url: string;
  coverImage: { url: string } | null;
  title: string;
  brief: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<PostNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const result = await response.json();
        const edges = result.data?.publication?.posts?.edges ?? [];
        setPosts(edges.map((e: any) => e.node));
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold">
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
              {posts.slice(0, 3).map((post, index) => (
                <div className="p-4 md:w-1/3" key={index}>
                  <BlogCard
                    link={post.url}
                    imageUrl={post.coverImage?.url ?? ""}
                    title={post.title}
                    brief={post.brief}
                  />
                </div>
              ))}
            </div>
          </div>
          {!loading && (
            <center>
              <Link to="/blog">
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
