import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { sql } from "@/lib/db";
import type { BusinessCard } from "@/lib/db";
import CardForm from "@/components/templates/CardForm";

export default async function EditCardPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const [card] = await sql`
    SELECT * FROM business_cards WHERE id = ${params.id} AND user_id = ${userId}
  `;
  if (!card) notFound();

  const initial = {
    id: card.id,
    fullName: card.full_name,
    jobTitle: card.job_title || "",
    company: card.company || "",
    phone: card.phone || "",
    email: card.email,
    website: card.website || "",
    address: card.address || "",
    logoUrl: card.logo_url || "",
    template: card.template as "classic" | "modern" | "minimal" | "bold" | "elegant",
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/cards/${card.id}`} className="text-slate-500 hover:text-slate-700 text-sm">← Back</Link>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-800">Edit Card</span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <CardForm initial={initial} />
      </div>
    </main>
  );
}
