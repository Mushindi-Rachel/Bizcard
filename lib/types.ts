export type Template =
  | "classic"
  | "modern"
  | "minimal"
  | "bold"
  | "elegant"
  | "sunset"
  | "emerald"
  | "rose"
  | "neon"
  | "ocean"
  | "lavender"
  | "corporate";
  
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
 {
    id: "classic",
    name: "Classic Blue",
    description: "Navy and white professional style",
  },
  {
    id: "modern",
    name: "Modern Gradient",
    description: "Purple-blue gradient with vibrant colors",
  },
  {
    id: "minimal",
    name: "Minimal White",
    description: "Clean and simple design",
  },
  {
    id: "bold",
    name: "Bold Dark",
    description: "Dark theme with high contrast",
  },
  {
    id: "elegant",
    name: "Elegant Gold",
    description: "Luxury black and gold design",
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    description: "Orange and red gradient",
  },
  {
    id: "emerald",
    name: "Emerald Green",
    description: "Fresh green business card",
  },
  {
    id: "rose",
    name: "Rose Pink",
    description: "Soft rose and blush colors",
  },
  {
    id: "neon",
    name: "Cyber Neon",
    description: "Black background with cyan accents",
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    description: "Teal and blue modern style",
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "Purple pastel theme",
  },
  {
    id: "corporate",
    name: "Corporate Gray",
    description: "Professional gray and indigo",
  },
];
