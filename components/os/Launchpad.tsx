"use client"

import { useOSStore, type AppId } from "@/hooks/useOSStore"
import { appRegistry } from "@/lib/registry"
import { FolderOpen, Search, Settings } from "lucide-react"

interface AppIcon {
  id: AppId
  iconPath?: string
  lucideIcon?: React.ReactNode
}

const appIcons: AppIcon[] = [
  { id: "finder",    lucideIcon: <FolderOpen className="size-8" /> },
  { id: "safari",    iconPath: "/icons/safari.png" },
  { id: "notes",     iconPath: "/icons/notes.png" },
  { id: "terminal",  iconPath: "/icons/terminal.png" },
  { id: "music",     iconPath: "/icons/spotify.png" },
  { id: "snake",     iconPath: "/icons/snake.png" },
  { id: "weather",   iconPath: "/icons/weather.png" },
  { id: "facetime",  iconPath: "/icons/facetime.png" },
  { id: "spotlight", lucideIcon: <Search className="size-8" /> },
  { id: "github",    iconPath: "/icons/github.png" },
  { id: "mail",      iconPath: "/icons/mail.png" },
  { id: "youtube",   iconPath: "/icons/youtube.png" },
  { id: "settings",  lucideIcon: <Settings className="size-8" /> },
]

export default function Launchpad({ onClose }: { onClose: () => void }) {
  const openApp = useOSStore((s) => s.openApp)

  function handleClick(id: AppId) {
    openApp(id)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        className="grid max-w-2xl grid-cols-5 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {appIcons.map(({ id, iconPath, lucideIcon }) => {
          const entry = appRegistry[id]
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className="flex flex-col items-center gap-2 rounded-xl p-4 text-white transition-colors hover:bg-white/10"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10">
                {iconPath ? (
                  <img src={iconPath} alt={entry.title} className="size-10 object-contain" draggable={false} />
                ) : (
                  lucideIcon
                )}
              </div>
              <span className="text-xs text-white/80">{entry.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
