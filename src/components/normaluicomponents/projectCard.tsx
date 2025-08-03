'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink } from 'lucide-react';

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
      <Link href={link} target="_blank" rel="noopener noreferrer">
    <Card className="group relative h-full overflow-hidden transition-transform hover:scale-105">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AspectRatio>

      <CardHeader>
        <CardDescription className="text-xs tracking-widest uppercase">
          {category}
        </CardDescription>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardHeader>
    </Card>
      </Link>
  );
}