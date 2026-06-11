import { neon } from "@neondatabase/serverless";

// Ensure env exists (important for Vercel builds)
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create Neon SQL client
const client = neon(process.env.DATABASE_URL);

// Strongly type it as a SQL template tag function
export const sql = client as unknown as {
  <T = any>(
    strings: TemplateStringsArray,
    ...values: any[]
  ): Promise<T[]>;
};

// Your BusinessCard type (unchanged)
export type BusinessCard = {
  id: string;
  user_id: string;
  full_name: string;
  job_title: string | null;
  company: string | null;
  phone: string | null;
  email: string;
  website: string | null;
  address: string | null;
  logo_url: string | null;
  template: string;
  card_data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};