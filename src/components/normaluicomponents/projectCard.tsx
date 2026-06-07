"use client";

import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectCardProps {
  link: string;
  imageSrc: string;
  title: string;
  category: string;
  description: string;
}
export default function ProjectCard({
  link,
  imageSrc,
  title,
  category,
  description,
}: ProjectCardProps) {
  return (
    <Link to={link} target="_blank" rel="noopener noreferrer">
      <Card className="group relative h-full overflow-hidden transition-transform hover:scale-105">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageSrc}
            alt={title}
            width={800}
            height={450}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AspectRatio>

        <CardHeader>
          <CardDescription className="text-xs tracking-widest uppercase">
            {category}
          </CardDescription>
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        </CardHeader>
      </Card>
    </Link>
  );
}
