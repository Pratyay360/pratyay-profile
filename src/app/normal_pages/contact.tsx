import social from './social.json';
import '../styles.css';
import {block} from 'million/react';
import Image from 'next/image';
const con =  block(function Contact() {
    return (
        <>
            <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl mr-2 ml-2">CONTACT ME</h1>
            {/*  */}
            <div className="flex flex-wrap text-center items-center justify-center ">
                {social.map((item, index) => (
                    <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                        <a href={item.link} target="_blank" rel="noreferrer">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={35}
                                height={35}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
});
export default con;
