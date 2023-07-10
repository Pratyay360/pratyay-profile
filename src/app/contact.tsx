import social from './social.json';
import './styles.css';
export default function Contact() {
  return (
    <div>
 <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl mr-2 mb-10 mt-10 ml-2">CONTACT ME</h1>
    <div className="flex high flex-row items-center justify-center overflow-hidden tracking-[10px] snap-mandatory text-center mr-5 mb-10">
      {social.map((icon, index) => (
        <div key={index} className="cont mr-4 mb-5 mt-5 transform-gpu transition-all hover:scale-125" >
          <a href={icon.link}>
            <img src={icon.image} alt={icon.name}/>
          </a>
        </div>
      ))}
    </div>
    </div>
  );
}
