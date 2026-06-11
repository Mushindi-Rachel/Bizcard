export type Template = "classic" | "modern" | "minimal" | "bold" | "elegant";

export interface CardFormData {
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  logoUrl: string;
  template: Template;
}

export const TEMPLATES: { id: Template; name: string; description: string }[] = [
  { id: "classic",  name: "Classic",  description: "Clean navy & white, timeless" },
  { id: "modern",   name: "Modern",   description: "Bold gradient, tech-forward" },
  { id: "minimal",  name: "Minimal",  description: "Pure white, subtle shadow" },
  { id: "bold",     name: "Bold",     description: "Dark card, high contrast" },
  { id: "elegant",  name: "Elegant",  description: "Gold accents, luxury feel" },
];
