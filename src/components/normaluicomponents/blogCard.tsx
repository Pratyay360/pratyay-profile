import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogCardProps {
  imageUrl: string;
  link: string;
  title: string;
  brief: string;
}

export default function BlogCard({ imageUrl, link, title, brief }: BlogCardProps) {
  return (
    <Link to={link} target="_blank">
      <Card className="group relative h-full overflow-hidden transition-transform hover:scale-105">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={450}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AspectRatio>
        </div>

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
