// Database types for better type safety
export interface Technology {
  id: string;
  name: string;
  src: string;
  href: string;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  link: string;
  created_at?: string;
}

export interface DatabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}