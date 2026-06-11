"use client";
import Link from "next/link";
import type { BusinessCard } from "@/lib/db";

export default function CardListItem({ card }: { card: BusinessCard }) {
  const templateColors: Record<string, string> = {
    classic: "bg-blue-900",
    modern: "bg-purple-600",
    minimal: "bg-white border border-slate-200",
    bold: "bg-black",
    elegant: "bg-slate-900",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`${templateColors[card.template] || "bg-slate-800"} rounded-lg w-14 h-9 flex-shrink-0 flex items-center justify-center`}>
          <span className="text-white text-xs opacity-70">🪪</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-800 truncate">{card.full_name}</div>
          <div className="text-sm text-slate-500 truncate">{card.job_title}{card.company ? ` · ${card.company}` : ""}</div>
          <div className="text-xs text-slate-400 mt-1">
            {card.template.charAt(0).toUpperCase() + card.template.slice(1)} · {new Date(card.created_at).toLocaleDateString()}
          </div>
        </div>
        <Link
          href={`/cards/${card.id}`}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex-shrink-0"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
