import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

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
