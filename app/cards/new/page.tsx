import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import CardForm from "@/components/templates/CardForm";

export default function NewCardPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-700 text-sm">← Dashboard</Link>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-800">New Business Card</span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <CardForm />
      </div>
    </main>
  );
}
