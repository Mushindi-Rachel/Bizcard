"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import CardPreview from "./CardPreview";
import type { CardFormData, Template } from "@/lib/types";
import { TEMPLATES } from "@/lib/types";

const EMPTY: CardFormData = {
  fullName: "", jobTitle: "", company: "", phone: "",
  email: "", website: "", address: "", logoUrl: "", template: "classic",
};

export default function CardForm({ initial }: { initial?: Partial<CardFormData> & { id?: string } }) {
  const router = useRouter();
  const [form, setForm] = useState<CardFormData>({ ...EMPTY, ...initial });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Regenerate QR whenever contact info changes
  useEffect(() => {
    const vcard = [
      "BEGIN:VCARD", "VERSION:3.0",
      `FN:${form.fullName}`,
      form.jobTitle ? `TITLE:${form.jobTitle}` : "",
      form.company ? `ORG:${form.company}` : "",
      form.phone ? `TEL:${form.phone}` : "",
      form.email ? `EMAIL:${form.email}` : "",
      form.website ? `URL:${form.website}` : "",
      form.address ? `ADR:;;${form.address}` : "",
      "END:VCARD",
    ].filter(Boolean).join("\n");

    QRCode.toDataURL(vcard, { width: 120, margin: 1 }).then(setQrDataUrl).catch(() => {});
  }, [form.fullName, form.email, form.phone, form.website, form.address, form.company, form.jobTitle]);

  const set = (field: keyof CardFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.fullName || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = initial?.id ? `/api/cards/${initial.id}` : "/api/cards";
      const method = initial?.id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      router.push(`/cards/${data.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 space-y-5">
        <Section title="Personal Details">
          <Field label="Full Name *" value={form.fullName} onChange={set("fullName")} placeholder="Jane Doe" />
          <Field label="Job Title" value={form.jobTitle} onChange={set("jobTitle")} placeholder="Product Manager" />
          <Field label="Company" value={form.company} onChange={set("company")} placeholder="Acme Corp" />
        </Section>

        <Section title="Contact Info">
          <Field label="Email *" value={form.email} onChange={set("email")} placeholder="jane@acme.com" type="email" />
          <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="+254 700 123 456" />
          <Field label="Website" value={form.website} onChange={set("website")} placeholder="https://acme.com" />
          <Field label="Address" value={form.address} onChange={set("address")} placeholder="Nairobi, Kenya" />
        </Section>

        <Section title="Branding">
          <Field label="Logo URL" value={form.logoUrl} onChange={set("logoUrl")} placeholder="https://..." />
          <p className="text-xs text-slate-500">Tip: upload your logo to Imgur or Cloudinary and paste the URL.</p>
        </Section>

        {/* Template picker */}
        <Section title="Template">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, template: t.id as Template }))}
                className={`p-3 rounded-lg border text-left transition-all ${
                  form.template === t.id
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/30"
                    : "border-slate-200 hover:border-indigo-300 bg-white"
                }`}
              >
                <div className="font-medium text-sm text-slate-800">{t.name}</div>
                <div className="text-xs text-slate-500">{t.description}</div>
              </button>
            ))}
          </div>
        </Section>

        {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {saving ? "Saving…" : initial?.id ? "Update Card" : "Save Card"}
        </button>
      </div>

      {/* Live Preview */}
      <div className="lg:w-[380px]">
        <div className="sticky top-6">
          <h3 className="text-sm font-medium text-slate-600 mb-3">Live Preview</h3>
          <CardPreview data={form} qrDataUrl={qrDataUrl} />
          <p className="text-xs text-slate-400 mt-2 text-center">QR code auto-generates from your contact info</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="font-semibold text-slate-700 text-sm mb-4 pb-2 border-b border-slate-100">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text"
}: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
      />
    </div>
  );
}
