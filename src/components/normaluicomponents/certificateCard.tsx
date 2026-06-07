import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CertCardProps {
  link: string;
  imageSrc: string;
  title: string;
  description: string;
}

export default function CertCard({ link, imageSrc, title, description }: CertCardProps) {
  return (
    <Link to={link} target="_blank" rel="noopener noreferrer">
      <Card className="group relative h-full overflow-hidden transition-transform hover:scale-105">
        <AspectRatio ratio={16 / 10}>
          <Image
            src={imageSrc}
            alt={title}
            width={800}
            height={500}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AspectRatio>

        <CardHeader>
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
