import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { sql } from "@/lib/db";
import type { BusinessCard } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { Plus, CreditCard, Clock } from "lucide-react";
import CardListItem from "@/components/ui/CardListItem";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const cards = await sql`
    SELECT * FROM business_cards WHERE user_id = ${userId} ORDER BY created_at DESC
  `;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-indigo-600 text-lg">CardCraft</Link>
        <div className="flex items-center gap-4">
          <Link
            href="/cards/new"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} /> New Card
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<CreditCard size={20} />} label="Total Cards" value={cards.length} />
          <StatCard icon={<Clock size={20} />} label="This Month" value={cards.filter(c => new Date(c.created_at) > new Date(Date.now() - 30 * 86400000)).length} />
        </div>

        {/* Cards list */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Your Business Cards</h2>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="text-5xl mb-4">🪪</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No cards yet</h3>
            <p className="text-slate-500 mb-6">Create your first professional business card in under 2 minutes.</p>
            <Link href="/cards/new" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Create first card
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map((card) => <CardListItem key={card.id} card={card} />)}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
      <div className="text-indigo-500">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}
