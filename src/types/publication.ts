export type PublicationType = "internal" | "external";

export interface Publication {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  author?: string;
  content?: string;
  type: PublicationType;
  link?: string;
}
