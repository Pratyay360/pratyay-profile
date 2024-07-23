import Link from 'next/link';
export default function Resume() {
return (
        <>
            <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold">RESUME</h1>
            <div className="text-center items-center justify-center top-36 backdrop-blur-30 py-20 ">
                <Link href={'https://docs.google.com/document/d/1nnV3faKcmPaUajB3ZTO8n-jtLzomG_77dhrANbKQ_UY/edit?usp=sharing' || ''}><button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-large text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500
                 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white/30 dark:text-white focus:ring-4 focus:outline-none
                 focus:ring-purple-200 dark:focus:ring-purple-800 transform-gpu transition-all hover:scale-110">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 transform-gpu lg:text-3xl hover:scale-110">Show Resume</span>
                </button></Link>
            </div>
        </>
    );
};
