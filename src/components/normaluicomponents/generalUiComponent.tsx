import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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

/* ---------- Education ---------- */

interface EducationCardProps {
  date_from: string;
  date_to: string;
  category: string;
  title: string;
  description: string;
}

export function EducationCard({
  date_from,
  date_to,
  category,
  title,
  description,
}: EducationCardProps) {
  return (
    <Card className="flex flex-col md:flex-row gap-4 p-4">
      <CardHeader className="md:w-64 flex-shrink-0">
        <CardTitle className="text-xl">{category}</CardTitle>
        <p className="text-sm ">
          {date_from} – {date_to}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
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