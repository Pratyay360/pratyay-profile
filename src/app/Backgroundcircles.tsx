import React from 'react'
import { motion } from 'framer-motion'
export default function Backgroundcircles() {
  return (
    <div className="relative flex flex-wrap justify-center items-center">
        <div className="absolute border border-gray-500 rounded-full h-[200px] w-[200px] mt-52 animate-bounce"/>
        <div className="absolute border border-red-500 rounded-full h-[300px] w-[300px] mt-52 animate-pulse"/>
        <div className="absolute border border-orange-500 rounded-full h-[500px] w-[500px] mt-52 animate-bounce" />
        <div className="absolute rounded-full border border-yellow-500 opacity-20 h-[650px] w-[650px] animate-pulse"/>
        <div   />
    </div>
  )
}