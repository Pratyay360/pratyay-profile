import React, {useState, useEffect} from 'react';
// import { block } from 'million/react';
export default function Resume() {
    const handleDownload = () => {
        window.open("https://drive.google.com/file/d/1Kb_cOhevNgiif-lV3LPJFPjStCKEd0dt/view?usp=sharing", "_blank");
    };
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
            <h1 className={darkValue?"text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold":"text-center items-center justify-center top-36 tracking-[20px] text-gray-900 text-3xl lg:text-4xl font-bold"}>RESUME</h1>
            <div className="text-center items-center justify-center top-36 backdrop-blur-30 py-20 ">
                <button onClick={handleDownload} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-large text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500
                 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white/30 dark:text-white focus:ring-4 focus:outline-none
                 focus:ring-purple-200 dark:focus:ring-purple-800 transform-gpu transition-all hover:scale-110">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 transform-gpu lg:text-3xl hover:scale-110">Download Resume</span>
                </button>
            </div>
        </>
    );
};