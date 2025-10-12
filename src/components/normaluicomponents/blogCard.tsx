// components/ui/blog-card-shadcn.tsx
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

interface BlogCardProps {
  imageUrl: string;
  link: string;
  title: string;
  brief: string;
}

export default function BlogCard({
  imageUrl,
  link,
  title,
  brief,
}: BlogCardProps) {
  return (
    <Link href={link} target="_blank">
      <Card className="group relative h-full overflow-hidden transition-transform hover:scale-105">
        {/* cover image */}
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AspectRatio>
        </div>

        {/* content */}
        <CardContent className="p-4">
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
            <CardDescription className="line-clamp-3">{brief}</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
}
