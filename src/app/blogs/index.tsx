import { block } from "million/react";
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
const blo = block(function Blog() {
// Added schema of Api querry to get the data from hashnode.
    const [posts, setPosts] = useState<Database['public']['Tables']['blog']['Row'][]>([]); 
    const [loading, setLoading] = useState(true);
    // just change the username to yours and you are good to go
    const query = `query {
        user(username: "pratyay") {
              publication {
                posts {
                  title
                  coverImage
                  brief
                  slug
                }
              }
            }
          }`;
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        const response = await fetch("https://api.hashnode.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });
        const result = await response.json();
        setPosts(result.data.user.publication.posts);
        setLoading(false);
    };
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold">Blogs</h1>
                {loading && (<div className="p-10 mt-10">
                        <Skeleton height={500} count={1} />
                    </div>)}
                <section className="text-gray-300 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
                            {posts.map((c, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <a href={`https://pratyaywrites.hashnode.dev/${c.slug || ''}`} className="block" target="_blank">
                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ">
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={c.coverImage || ''}
                                                alt={c.slug || ''}
                                                width={350}
                                                height={250}
                                            />
                                            {loading && <Skeleton width={350} height={250} />}
                                            <div className="p-6">
                                                <h1 className="title-font text-lg font-medium text-gray-300 mb-3">
                                                    {c.title || ''}{loading && <Skeleton count={1} />}
                                                </h1>
                                                <p className="leading-tight text-gray-400 mb-3 sm:leading-4">{c.brief || ''}
                                                    {loading && <Skeleton count={3} />}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
});
export default blo;