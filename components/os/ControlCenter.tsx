"use client"

import { useState } from "react"
import { Wifi, Moon, Sun, Monitor, Bluetooth, Volume2, Maximize } from "lucide-react"
import { useTranslation } from "@/contexts/i18n"
import { useOSStore } from "@/hooks/useOSStore"

export default function ControlCenter() {
  const { t, locale, setLocale } = useTranslation()
  const isDarkMode = useOSStore((s) => s.isDarkMode)
  const toggleDarkMode = useOSStore((s) => s.toggleDarkMode)
  const brightness = useOSStore((s) => s.brightness)
  const setBrightness = useOSStore((s) => s.setBrightness)
  const [wifiOn, setWifiOn] = useState(true)
  const [bluetoothOn, setBluetoothOn] = useState(true)
  const [volume, setVolume] = useState(75)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="absolute right-4 top-8 z-50 w-64 rounded-xl border border-white/10 bg-neutral-800/90 p-3 text-xs text-white/80 shadow-2xl backdrop-blur-2xl">
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setWifiOn(!wifiOn)}
            className="flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2 hover:bg-white/10"
          >
            <Wifi className={`size-5 ${wifiOn ? "text-blue-400" : "text-white/30"}`} />
            <span className="text-[10px]">{t("wifi")}</span>
          </button>
          <button
            onClick={() => setBluetoothOn(!bluetoothOn)}
            className="flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2 hover:bg-white/10"
          >
            <Bluetooth className={`size-5 ${bluetoothOn ? "text-blue-400" : "text-white/30"}`} />
            <span className="text-[10px]">{t("bluetooth")}</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2 hover:bg-white/10"
          >
            {isDarkMode ? <Moon className="size-5 text-blue-400" /> : <Sun className="size-5 text-yellow-400" />}
            <span className="text-[10px]">{isDarkMode ? t("dark") : t("light")}</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2 hover:bg-white/10"
          >
            <Maximize className="size-5" />
            <span className="text-[10px]">{t("fullscreen")}</span>
          </button>
        </div>

        <div className="rounded-lg bg-white/5 px-3 py-2">
          <div className="mb-1 flex items-center gap-2">
            <Monitor className="size-4" />
            <span>{t("display")}</span>
            <span className="ml-auto text-white/40">{brightness}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="rounded-lg bg-white/5 px-3 py-2">
          <div className="mb-1 flex items-center gap-2">
            <Volume2 className="size-4" />
            <span>{t("volume")}</span>
            <span className="ml-auto text-white/40">{volume}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
          <span>{t("language")}</span>
          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="rounded border border-white/10 px-2 py-0.5 text-[10px] uppercase transition-colors hover:bg-white/10"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
        </div>
      </div>
    </div>
  )
}
