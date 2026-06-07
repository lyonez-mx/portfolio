"use client"

import { Phone, MessageCircle, Globe, Building2, MapPin } from "lucide-react"

interface FaceTimeProps {
  isDarkMode?: boolean
}

export default function FaceTime({ isDarkMode = true }: FaceTimeProps) {
  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const card = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"

  return (
    <div className={`flex h-full flex-col items-center justify-center gap-6 p-6 ${bg} ${text}`}>
      {/* Foto */}
      <img
        src="/images/me.jpg"
        alt="Erick Leonardo Hipólito Jurado"
        className="size-24 rounded-full object-cover ring-4 ring-blue-500/20"
      />

      {/* Name + flag */}
      <div className="text-center">
        <h2 className="text-xl font-bold">Erick Leonardo Hipólito Jurado</h2>
        <div className="mt-1 flex items-center justify-center gap-1.5">
          <span className="text-lg">🇲🇽</span>
          <span className={muted}>+52 811 636 7973</span>
        </div>
      </div>

      {/* Contact buttons */}
      <div className="flex gap-4">
        <a
          href="tel:+528116367973"
          className={`flex size-14 items-center justify-center rounded-full transition-colors ${
            isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
          } ${text}`}
        >
          <Phone className="size-6" />
        </a>
        <a
          href="https://wa.me/528116367973"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex size-14 items-center justify-center rounded-full transition-colors ${
            isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
          } ${text}`}
        >
          <MessageCircle className="size-6" />
        </a>
      </div>

      {/* Company card */}
      <div className={`w-full max-w-sm rounded-xl border p-4 ${card} ${border}`}>
        <div className="flex items-center gap-3">
          <div className={`flex size-10 items-center justify-center rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
            <Building2 className="size-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Lyonez Group</p>
            <a
              href="https://lyonez.group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
            >
              <Globe className="size-3" />
              lyonez.group
            </a>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className={`flex items-center gap-2 text-xs ${muted}`}>
        <MapPin className="size-3.5" />
        <span>Monterrey, México</span>
      </div>
    </div>
  )
}
