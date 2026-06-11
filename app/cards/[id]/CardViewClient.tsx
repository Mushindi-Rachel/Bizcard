"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import CardPreview from "@/components/templates/CardPreview";
import type { BusinessCard } from "@/lib/db";
import type { CardFormData } from "@/lib/types";
import { Download, Pencil, Trash2 } from "lucide-react";

export default function CardViewClient({ card }: { card: BusinessCard }) {
  const router = useRouter();
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [deleting, setDeleting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const formData: CardFormData = {
    fullName: card.full_name,
    jobTitle: card.job_title || "",
    company: card.company || "",
    phone: card.phone || "",
    email: card.email,
    website: card.website || "",
    address: card.address || "",
    logoUrl: card.logo_url || "",
    template: card.template as CardFormData["template"],
  };

  useEffect(() => {
    const vcard = [
      "BEGIN:VCARD", "VERSION:3.0",
      `FN:${card.full_name}`,
      card.job_title ? `TITLE:${card.job_title}` : "",
      card.company ? `ORG:${card.company}` : "",
      card.phone ? `TEL:${card.phone}` : "",
      `EMAIL:${card.email}`,
      card.website ? `URL:${card.website}` : "",
      card.address ? `ADR:;;${card.address}` : "",
      "END:VCARD",
    ].filter(Boolean).join("\n");

    QRCode.toDataURL(vcard, { width: 120, margin: 1 }).then(setQrDataUrl);
  }, [card]);

  const downloadPng = async () => {
    const el = document.getElementById("card-preview");
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 3, useCORS: true });
    const link = document.createElement("a");
    link.download = `${card.full_name.replace(/\s+/g, "_")}_card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this card? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/cards/${card.id}`, { method: "DELETE" });
    router.push("/dashboard");
  };

  return (
    <div className="space-y-8">
      {/* Card preview */}
      <div className="flex justify-center" ref={previewRef}>
        <div className="drop-shadow-xl">
          <CardPreview data={formData} qrDataUrl={qrDataUrl} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={downloadPng}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Download size={16} /> Download PNG
        </button>
        <button
          onClick={() => router.push(`/cards/${card.id}/edit`)}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Pencil size={16} /> Edit Card
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 bg-white border border-red-200 hover:border-red-400 text-red-600 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Trash2 size={16} /> {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>

      {/* Card details table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Card Details</h2>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {[
            ["Name", card.full_name],
            ["Job Title", card.job_title],
            ["Company", card.company],
            ["Email", card.email],
            ["Phone", card.phone],
            ["Website", card.website],
            ["Address", card.address],
            ["Template", card.template],
            ["Created", new Date(card.created_at).toLocaleDateString()],
          ].filter(([, v]) => v).map(([k, v]) => (
            <div key={k as string} className="flex gap-2">
              <dt className="text-slate-500 min-w-[80px]">{k}:</dt>
              <dd className="text-slate-800 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
