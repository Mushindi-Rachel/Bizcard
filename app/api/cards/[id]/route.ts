import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import type { BusinessCard } from "@/lib/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [card] = await sql`
    SELECT * FROM business_cards WHERE id = ${params.id} AND user_id = ${userId}
  `;
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(card);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    fullName,
    jobTitle,
    company,
    phone,
    email,
    website,
    address,
    logoUrl,
    template,
  } = body;

const result = await sql`
  UPDATE business_cards
  SET full_name = ${fullName},
      job_title = ${jobTitle || null},
      company = ${company || null},
      phone = ${phone || null},
      email = ${email},
      website = ${website || null},
      address = ${address || null},
      logo_url = ${logoUrl || null},
      template = ${template || "classic"}
  WHERE id = ${params.id}
    AND user_id = ${userId}
  RETURNING *
`;

const card = result[0] as BusinessCard | undefined;


  if (!card) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await sql`DELETE FROM business_cards WHERE id = ${params.id} AND user_id = ${userId}`;

  return NextResponse.json({ success: true });
}
