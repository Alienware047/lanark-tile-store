export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Interior"
  | "Landscape";

export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: ProjectCategory;
  description: string;
  location?: string;
  year?: string;
}