"use client"

import { useState, useEffect } from "react"
import { useOSStore } from "@/hooks/useOSStore"
import { useTranslation } from "@/contexts/i18n"

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const locale = useOSStore((s) => s.locale)
  const { t } = useTranslation()
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    function update() {
      const now = new Date()
      setTime(
        new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      )
      setDate(
        new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }).format(now),
      )
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [locale])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl">
      <div className="mb-12 size-20 rounded-full bg-white/10 p-1">
        <svg viewBox="0 0 24 24" fill="none" className="size-full" stroke="white" strokeWidth={1}>
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20 Q5 14 12 14 Q19 14 19 20" />
        </svg>
      </div>

      <div className="mb-1 text-5xl font-thin text-white">{time}</div>
      <div className="mb-12 text-lg text-white/60">
        {date.charAt(0).toUpperCase() + date.slice(1)}
      </div>

      <button
        onClick={onLogin}
        className="rounded-full bg-white/10 px-8 py-2 text-sm text-white/80 transition-all hover:bg-white/20 hover:text-white"
      >
        {t("unlock")}
      </button>
    </div>
  )
}
