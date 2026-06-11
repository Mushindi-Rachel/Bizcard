"use client";
import { CardFormData } from "@/lib/types";

interface Props {
  data: Partial<CardFormData>;
  qrDataUrl?: string;
}

export default function CardPreview({ data, qrDataUrl }: Props) {
  const tpl = data.template || "classic";

  return (
    <div
      id="card-preview"
      className={`card-preview tpl-${tpl} flex flex-col justify-between p-5 shadow-2xl`}
      style={{ width: 350, height: 200 }}
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Logo */}
          {data.logoUrl && (
            <img src={data.logoUrl} alt="Logo" className="h-8 mb-2 object-contain" />
          )}
          <div className="font-bold text-lg leading-tight">{data.fullName || "Your Name"}</div>
          <div className={`text-sm opacity-80 accent`}>{data.jobTitle || "Job Title"}</div>
          {data.company && <div className="text-xs opacity-60 mt-0.5">{data.company}</div>}
        </div>
        {/* QR Code */}
        {qrDataUrl && (
          <img src={qrDataUrl} alt="QR Code" className="w-14 h-14 flex-shrink-0 rounded" />
        )}
      </div>

      {/* Divider */}
      <div className={`divider h-px w-full opacity-40 my-2`} style={{ background: "currentColor" }} />

      {/* Bottom contact row */}
      <div className="flex flex-col gap-0.5 text-xs opacity-75">
        {data.email && <span>✉ {data.email}</span>}
        {data.phone && <span>📞 {data.phone}</span>}
        {data.website && <span>🌐 {data.website}</span>}
        {data.address && <span>📍 {data.address}</span>}
      </div>
    </div>
  );
}
