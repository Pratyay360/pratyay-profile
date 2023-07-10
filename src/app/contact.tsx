import social from './social.json';
import './styles.css';
export default function Contact() {
  return (
    <>
 <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl mr-2 ml-2">CONTACT ME</h1>
    {/*  */}
    <div className="flex flex-wrap text-center items-center justify-center ">
                {social.map((item, index) => (
                    <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                        <a href={item.link} target="_blank" rel="noreferrer">
                            <img
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                            />
                        </a>
                    </div>
                ))}
            </div>
    </>
  );
}
