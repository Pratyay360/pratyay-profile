"use client"
import { motion } from "framer-motion"
import { type } from "os"
import { Cursor, useTypewriter } from "react-simple-typewriter"
import Backgroundcircles from "./Backgroundcircles"
import icons from "./social.json"
export default function Aboutme() {
    const [text, count] = useTypewriter({
        words: [
            "I am a student at the University of Kalyani studying CS 📖📖📖",
            "I am currently learning different technologies 🌐🌐🌐",
            "Arch Linux User 🐧🐧🐧",
            "I love watching anime and reading manga 📚📚📚",
            "Sleep Breathing Final Form 😴😴🥱🥱",
            "Dank Meme Enjoyer 🗿🗿🗿🗿",
            "I am Unemployed",
        ],
        loop: true,
        delaySpeed: 2000,
        deleteSpeed: 50,
        typeSpeed: 100
    });
    return (
        <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
            <Backgroundcircles />
            <img className="rounded-full h-32 w-32 mx-auto object-cover transform-gpu transition-all hover:scale-125" src="../icons/img.jpg"></img>
            <div>
                <h1 className="text-2xl text-gray-300"> HI, I am Pratyay Mitra Mustafi 👋👋👋👋 </h1>
                <h1 className="text-3xl lg:text-4xl font-semibold px-5">
                    <span>{text}</span>
                    <Cursor cursorStyle="_" />
                    <Cursor cursorColor="#dae3e3" />
                </h1>
            </div>
        </div>
    )
};