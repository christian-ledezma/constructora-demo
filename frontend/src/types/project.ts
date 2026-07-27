export type ProjectStatus = "under-construction" | "few-units-left";

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  description: string[];
  facts: ProjectFact[];
  coverImage: string;
  gallery: string[];
  tour360: [string, string];
}
