import { block } from "million/react";
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
// import { Article, ArticleSummary, HashnodeResponse } from "../models/hashnode";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const blog = block(function Blog() {

    return (
        <>
        <div className="flex flex-column text-center items-center justify-center">
                    <h1 className="top-36 tracking-[20px] text-gray-500 lg:text-4xl font-bold ml-2 pb-10 whitespace-break-spaces">Blogs</h1>
                </div>

        </>
    )
});
export default blog;

