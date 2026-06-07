"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { useTranslation } from "@/contexts/i18n"
import { useClock } from "@/hooks/useClock"
import { useOSStore } from "@/hooks/useOSStore"
import ControlCenter from "./ControlCenter"

export default function TopBar() {
  const { t, locale, setLocale } = useTranslation()
  const time = useClock()
  const openApp = useOSStore((s) => s.openApp)
  const setSystemState = useOSStore((s) => s.setSystemState)
  const apps = useOSStore((s) => s.apps)
  const [showControl, setShowControl] = useState(false)
  const [showApple, setShowApple] = useState(false)
  const controlRef = useRef<HTMLDivElement>(null)
  const appleRef = useRef<HTMLDivElement>(null)

  const activeApp = apps.find((a) => {
    const maxZ = Math.max(...apps.map((x) => x.zIndex))
    return a.zIndex === maxZ && a.isOpen
  })

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (controlRef.current && !controlRef.current.contains(e.target as Node)) {
        setShowControl(false)
      }
      if (appleRef.current && !appleRef.current.contains(e.target as Node)) {
        setShowApple(false)
      }
    }
    if (showControl || showApple) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [showControl, showApple])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-7 items-center justify-between border-b border-white/5 bg-black/30 px-4 text-xs text-white/70 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <div ref={appleRef} className="relative">
          <button
            onClick={() => setShowApple(!showApple)}
            className="flex size-6 items-center justify-center rounded font-semibold hover:bg-white/10"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5">
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.157-.902 2.852-.878 2.85.023.002 2.005-.162 2.95-1.46.944-1.297.253-2.56.253-2.56z" />
              <path d="M11.576 5.185c-.437-.652-2.481-.559-2.627-.559-.146 0-2.19-.093-2.627.559a2.37 2.37 0 0 0-.322 1.305c0 .457.143.908.322 1.306.38.64 1.22 1.054 2.626 1.054 1.406 0 2.245-.414 2.626-1.054.18-.398.322-.849.322-1.306 0-.457-.143-.908-.322-1.305z" />
            </svg>
          </button>
          {showApple && (
            <div className="absolute left-0 top-7 w-52 rounded-lg border border-white/10 bg-neutral-800/90 py-1 shadow-2xl backdrop-blur-2xl">
              <button className="w-full px-4 py-1 text-left hover:bg-white/10" onClick={() => setShowApple(false)}>
                {t("aboutThisMac")}
              </button>
              <div className="my-1 border-t border-white/10" />
              <button
                className="w-full px-4 py-1 text-left hover:bg-white/10"
                onClick={() => setSystemState("sleep")}
              >
                {t("sleep")}
              </button>
              <button
                className="w-full px-4 py-1 text-left hover:bg-white/10"
                onClick={() => setSystemState("boot")}
              >
                {t("restart")}
              </button>
              <button
                className="w-full px-4 py-1 text-left hover:bg-white/10"
                onClick={() => setSystemState("shutdown")}
              >
                {t("shutDown")}
              </button>
              <div className="my-1 border-t border-white/10" />
              <button
                className="w-full px-4 py-1 text-left hover:bg-white/10"
                onClick={() => setSystemState("login")}
              >
                {t("logOut")}
              </button>
            </div>
          )}
        </div>
        <span className="ml-1 font-semibold text-white/90">{t("appName")}</span>
        {activeApp && (
          <span className="ml-2 hidden font-medium text-white/60 sm:inline">{t("finder")}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => openApp("spotlight")}
          className="flex size-5 items-center justify-center rounded hover:bg-white/10"
          title={t("search")}
        >
          <Search className="size-3.5" />
        </button>

        <div ref={controlRef} className="relative">
          <button
            onClick={() => setShowControl(!showControl)}
            className="flex size-5 items-center justify-center rounded hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-3.5" stroke="currentColor" strokeWidth={1.5}>
              <path d="M5 16 Q6 9 9 9 L10 8 Q11 5 14 6 L15 7 Q16 5 18 7 L18.5 8 Q20 9 20 12 L20 16" />
              <path d="M4 16 L20 16" />
            </svg>
          </button>
          {showControl && <ControlCenter />}
        </div>

        <button
          onClick={() => setLocale(locale === "en" ? "es" : "en")}
          className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/50 transition-colors hover:text-white/80"
        >
          {locale === "en" ? "ES" : "EN"}
        </button>

        <span className="min-w-[80px] text-right tabular-nums">{time}</span>
      </div>
    </header>
  )
}
