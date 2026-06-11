"use client";
import { CardFormData } from "@/lib/types";

interface Props {
  data: Partial<CardFormData>;
  qrDataUrl?: string;
}

const templateStyles: Record<string, string> = {
  classic: "bg-blue-900 text-white",
  modern: "bg-gradient-to-br from-indigo-600 to-purple-500 text-white",
  minimal: "bg-white text-gray-800 border border-gray-200",
  bold: "bg-gray-900 text-white border border-white",
  elegant: "bg-black text-yellow-400",
  sunset: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
  emerald: "bg-green-700 text-white",
  rose: "bg-pink-100 text-pink-900",
  neon: "bg-black text-cyan-400 border border-cyan-400 shadow-lg shadow-cyan-500/30",
  ocean: "bg-gradient-to-r from-teal-500 to-blue-600 text-white",
  lavender: "bg-purple-200 text-purple-900",
  corporate: "bg-gray-200 text-indigo-900 border border-gray-400",
};

const dividerStyles: Record<string, string> = {
  neon: "bg-cyan-400",
  elegant: "bg-yellow-400",
  minimal: "bg-gray-300",
  corporate: "bg-indigo-300",
  default: "bg-current",
};

export default function CardPreview({ data, qrDataUrl }: Props) {
  const tpl = data.template || "classic";

  const themeClass = templateStyles[tpl] || templateStyles.classic;
  const dividerColor = dividerStyles[tpl] || dividerStyles.default;

  return (
    <div
      id="card-preview"
      className={`card-preview flex flex-col justify-between p-5 shadow-2xl rounded-xl transition-all ${themeClass}`}
      style={{ width: 350, height: 200 }}
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Logo */}
          {data.logoUrl && (
            <img
              src={data.logoUrl}
              alt="Logo"
              className="h-8 mb-2 object-contain"
            />
          )}

          <div className="font-bold text-lg leading-tight">
            {data.fullName || "Your Name"}
          </div>

          <div className="text-sm opacity-80">
            {data.jobTitle || "Job Title"}
          </div>

          {data.company && (
            <div className="text-xs opacity-60 mt-0.5">
              {data.company}
            </div>
          )}
        </div>

        {/* QR Code */}
        {qrDataUrl && (
          <img
            src={qrDataUrl}
            alt="QR Code"
            className="w-14 h-14 flex-shrink-0 rounded bg-white p-1"
          />
        )}
      </div>

      {/* Divider */}
      <div
        className={`h-px w-full opacity-40 my-2 ${dividerColor}`}
      />

      {/* Bottom contact row */}
      <div className="flex flex-col gap-0.5 text-xs opacity-80">
        {data.email && <span>✉ {data.email}</span>}
        {data.phone && <span>📞 {data.phone}</span>}
        {data.website && <span>🌐 {data.website}</span>}
        {data.address && <span>📍 {data.address}</span>}
      </div>
    </div>
  );
}