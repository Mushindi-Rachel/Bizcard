import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import type { BusinessCard } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { fullName, jobTitle, company, phone, email, website, address, logoUrl, template } = body;

  if (!fullName || !email) {
    return NextResponse.json({ error: "fullName and email are required" }, { status: 400 });
  }

  const [card] = await sql<BusinessCard[]>`
    INSERT INTO business_cards (user_id, full_name, job_title, company, phone, email, website, address, logo_url, template)
    VALUES (${userId}, ${fullName}, ${jobTitle || null}, ${company || null}, ${phone || null},
            ${email}, ${website || null}, ${address || null}, ${logoUrl || null}, ${template || "classic"})
    RETURNING *
  `;

  return NextResponse.json(card, { status: 201 });
}

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cards = await sql<BusinessCard[]>`
    SELECT * FROM business_cards WHERE user_id = ${userId} ORDER BY created_at DESC
  `;

  return NextResponse.json(cards);
}
