import Link from "next/link";
import Image from "next/image";

// Donation
interface DonationCardInterface {
  link: string;
  name: string;
  image: string;
}
export function DonationCard(props: DonationCardInterface) {
  return (
    <>
      <Link href={props.link} target="_blank">
        <div className="h-full overflow-hidden transform transition-all hover:scale-110">
          <Image
            className="lg:h-48 md:h-36 w-full object-center"
            src={props.image}
            alt={props.name}
            width={200}
            height={45}
          />
        </div>
      </Link>
    </>
  );
}

// Education

interface EducationCardInterface {
  date_from: string;
  date_to: string;
  category: string;
  title: string;
  description: string;
}
export function EducationCard(item: EducationCardInterface) {
  return (
    <>
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font dark:text-gray-200 text-2xl">
          {item.category || ""}
        </span>
        <span className="mt-1 dark:text-gray-400 text-md">
          {item.date_from || ""}-{item.date_to || ""}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="font-medium dark:text-gray-100 text-2xl title-font mb-2">
          {item.title || ""}
        </h2>
        <p className="leading-relaxed text-xl dark:text-gray-300">
          {item.description || ""}
        </p>
      </div>
    </>
  );
}


// scroll card
interface ImageCardInterface {
  image: string;
  link: string;
  name: string;
}
export function ImageCard(props: ImageCardInterface) {
  return (
    <>
      <Link href={props.link || ""} target="_blank">
        <Image
          src={props.image || ""}
          alt={props.name || ""}
          width={40}
          height={40}
        />
      </Link>
    </>
  );
}