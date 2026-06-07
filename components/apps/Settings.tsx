"use client"

import { useState } from "react"
import { Globe, Monitor, Wifi, Bell, User, Clock } from "lucide-react"
import { useOSStore } from "@/hooks/useOSStore"

interface SettingsProps {
  isDarkMode?: boolean
}

const sections = [
  { id: "general", name: "General", icon: Globe },
  { id: "appearance", name: "Appearance", icon: Monitor },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "users", name: "Users", icon: User },
  { id: "time", name: "Date & Time", icon: Clock },
]

export default function Settings({ isDarkMode = true }: SettingsProps) {
  const [active, setActive] = useState("general")
  const { isDarkMode: dark, toggleDarkMode, locale, setLocale, brightness, setBrightness } = useOSStore()

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const activeBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bg} ${text}`}>
      <div className={`w-56 shrink-0 border-r ${border} ${sidebarBg} p-2`}>
        {sections.map((s) => {
          const Icon = s.icon
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                active === s.id ? activeBg : hover
              }`}
            >
              <Icon className="size-4" />
              {s.name}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto p-6">
        {active === "general" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">General</h2>
            <div className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <p><strong>LyonOS:</strong> Version 1.0</p>
              <p className={muted}>macOS-inspired portfolio</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Language</span>
                <button
                  onClick={() => setLocale(locale === "en" ? "es" : "en")}
                  className="rounded border border-white/10 px-3 py-1 text-xs uppercase hover:bg-white/10"
                >
                  {locale}
                </button>
              </div>
            </div>
          </div>
        )}

        {active === "appearance" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    dark ? "bg-blue-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      dark ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span>Brightness</span>
                  <span className={muted}>{brightness}%</span>
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
            </div>
          </div>
        )}

        {active !== "general" && active !== "appearance" && (
          <div className="flex h-full items-center justify-center">
            <p className={muted}>Coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}


