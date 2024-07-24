import Image from "next/image";
import Link from "next/link";
interface ProjectCardInterface {
  link: string;
  imageSrc: string;
  title: string;
  category: string;
  description: string;
}
export default function ProjectCards(props: ProjectCardInterface) {
  return (
    <>
      <Link href={props.link || ""} className="block" target="_blank">
        <div className="h-full border-2 dark:border-gray-200 border-gray-900 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110">
          <Image
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={props.imageSrc || ""}
            alt={props.title || ""}
            width={300}
            height={200}
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium dark:text-gray-400 mb-1">
              {props.category || ""}
            </h2>
            <h1 className="title-font text-lg font-medium dark:text-gray-300 mb-3">
              {props.title || ""}
            </h1>
            <p className="leading-relaxed mb-3">{props.description || ""}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
