"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Error() {
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            document.title = "Error Page";
            if (sessionStorage.getItem('error') !== null) {
                var err = JSON.parse(sessionStorage.getItem('error') || '{}');
                setError(err);
            } else {
                location.href = '/';
            }
        }
    }, []);
    const errorMessage = JSON.stringify(error);
    return (
        <>
            {error && (
                <div className="text-center">
                <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
                <p className=" mb-4 text-lg text-gray-100">Oops! Looks like you&apos;re lost. Please report the error message to developer</p>
                <p className="mb-4 text-lg text-gray-300">Error: {errorMessage}</p>
                <div className="animate-bounce">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </div>
                <p className="mt-4 text-gray-400" id="errmsg">Let&apos;s get you back </p>
                <div className="flex fles-wrap text-center items-center justify-center p-10">
                        <button className="border border-green-600 hover:bg-green-600 bg-black text-3xl text-white font-bold py-2 px-4 rounded-full">
                            <a href="/">Home</a>
                        </button>
                        <button className="border border-indigo-600 hover:bg-indigo-600 bg-black text-3xl text-white font-bold py-2 px-4 rounded-full m-5">
                            <a href="/message_me">Message Me</a>
                        </button>
                </div>
            </div>
            )}
            
            
            </>
    )
};