// components/ui/cert-card-shadcn.tsx
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
import { ExternalLink } from "lucide-react";

interface CertCardProps {
  link: string;
  imageSrc: string;
  title: string;
  description: string;
}

export default function CertCard({
  link,
  imageSrc,
  title,
  description,
}: CertCardProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
    <Card className="group relative h-full overflow-hidden transition-transform hover:scale-105">
      <AspectRatio ratio={16 / 10}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </AspectRatio>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      
    </Card>
        </Link>
  );
}
