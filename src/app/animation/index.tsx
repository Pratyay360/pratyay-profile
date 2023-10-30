import React from 'react'
export default function Backgroundcircles() {
  return (
    <div className="relative flex flex-wrap justify-center items-center">
        <div className="absolute border border-gray-500 rounded-full h-[330px] w-[330px] mt-52 animate-bounce"/>
        <div className="absolute border border-red-500 rounded-full h-[400px] w-[400px] mt-52 animate-pulse"/>
        <div className="absolute border border-orange-500 rounded-full h-[500px] w-[500px] mt-52 animate-bounce" />
        <div className="absolute rounded-full border border-yellow-500 opacity-50 h-[650px] w-[650px] animate-pulse"/>
        <div className="absolute rounded-full border border-green-700 opacity-30 h-[700px] w-[700px] animate-bounce"/>
        <div className="absolute rounded-full border border-white-500 opacity-20 h-[850px] w-[850px] animate-pulse"/>
    </div>
  )
};
