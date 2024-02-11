/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import '../stylesheet.css'
export default function Blog() {
    // Added schema of Api querry to get the data from hashnode.
    const [post, setPosts] = useState<{ node: { coverImage: { url: string | null }; title: string | null; brief: string | null; url: string | null } }[]>([]);
    const [loading, setLoading] = useState(true);
    // just change the blog link to yours and you are good to go
    const query = `query Publication {
        publication(host:"pratyaywrites.hashnode.dev") {
          posts (first:10){
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
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        const response = await fetch("https://gql.hashnode.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });
        const result = await response.json();
        var a = result.data.publication.posts.edges;
        setPosts(a);
        setLoading(false);
    }
    const [darkValue, setDarkValue] = useState(false);
    useEffect(()=>{
        try{
            if(sessionStorage.getItem("DARK")){
                        setDarkValue(true);
                }else{
                    setDarkValue(false)
                }
        }catch(err){
            console.log(err);
        }
    },[darkValue])
    return (
        <>
             <SkeletonTheme baseColor={darkValue? "#202020":"#A5A5A5"} highlightColor={darkValue?"444444":"#8e8e8e"}>
                <h1 className={darkValue?"text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold":"text-center items-center justify-center top-36 tracking-[20px] text-gray-900 text-3xl lg:text-4xl font-bold"}>Blogs</h1>
                {loading && (<div className="p-10 mt-10">
                    <Skeleton height={500} count={1} />
                </div>)}
                <section className="body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
                            {post.slice(0, 3).map((c, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <a href={c.node.url || ''} className="block" target="_blank">
                                        <div className={darkValue?"h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ":"h-full border-2 border-gray-900 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 bg-gray-300"}>
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={c.node.coverImage.url || ''}
                                                alt={c.node.title || ''}
                                                width={350}
                                                height={250}
                                            />
                                            {loading && <Skeleton width={350} height={250} />}
                                            <div className="p-6">
                                                <h1 className={darkValue?"title-font text-lg font-medium text-gray-300 mb-3":"title-font text-lg font-medium text-gray-900 mb-3"}>
                                                    {c.node.title || ''}{loading && <Skeleton count={1} />}
                                                </h1>
                                                <p className={darkValue?"leading-tight text-gray-400 mb-3 sm:leading-4":"leading-tight text-gray-900 mb-3 sm:leading-4"}>{c.node.brief || ''}
                                                    {loading && <Skeleton count={3} />}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                            {!loading && <center><a href="/blog"><button className="button-30" role="button">See More</button></a></center>}
                </section>
            </SkeletonTheme>
        </>

    )
};