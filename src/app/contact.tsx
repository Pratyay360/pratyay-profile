import social from './social.json';
import './styles.css';
export default function Contact() {
  return (
    <div>
 <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl mr-2">CONTACT ME</h1>
    <div className="flex high flex-row items-center justify-center overflow-hidden tracking-[10px] snap-mandatory text-center mb-5 mr-5">
      {social.map((icon, index) => (
        <div key={index} className="cont transform transition-all hover:scale-110" >
          <a href={icon.link}>
            <img src={icon.image} alt={icon.name}/>
          </a>
        </div>
      ))}
    </div>
    </div>
  );
}
