"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useOSStore, type AppId } from "@/hooks/useOSStore"
import { FolderOpen, Search, Settings } from "lucide-react"

interface DockItem {
  id: AppId | "launchpad"
  label: string
  icon: React.ReactNode
  iconPath?: string
}

const iconSize = 56
const maxMagnify = 80

const items: DockItem[] = [
  { id: "launchpad", label: "Launchpad", iconPath: "/icons/launchpad.png", icon: null! },
  { id: "finder",    label: "Finder",    icon: <FolderOpen className="size-7" /> },
  { id: "safari",    label: "Safari",    iconPath: "/icons/safari.png", icon: null! },
  { id: "notes",     label: "Notes",     iconPath: "/icons/notes.png", icon: null! },
  { id: "terminal",  label: "Terminal",  iconPath: "/icons/terminal.png", icon: null! },
  { id: "music",     label: "Music",     iconPath: "/icons/spotify.png", icon: null! },
  { id: "snake",     label: "Snake",     iconPath: "/icons/snake.png", icon: null! },
  { id: "weather",   label: "Weather",   iconPath: "/icons/weather.png", icon: null! },
  { id: "facetime",  label: "FaceTime",  iconPath: "/icons/facetime.png", icon: null! },
  { id: "spotlight", label: "Spotlight", icon: <Search className="size-7" /> },
  { id: "github",    label: "GitHub",    iconPath: "/icons/github.png", icon: null! },
  { id: "mail",      label: "Mail",      iconPath: "/icons/mail.png", icon: null! },
  { id: "youtube",   label: "YouTube",   iconPath: "/icons/youtube.png", icon: null! },
  { id: "settings",  label: "Settings",  icon: <Settings className="size-7" /> },
]

interface DockProps {
  onLaunchpadClick: () => void
}

function DockIcon({ item }: { item: DockItem }) {
  if (item.iconPath) {
    return (
      <img
        src={item.iconPath}
        alt={item.label}
        className="size-9 object-contain"
        draggable={false}
      />
    )
  }
  return item.icon
}

export default function Dock({ onLaunchpadClick }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-Infinity)
  const { openApp, apps } = useOSStore()

  function getDistance(index: number): number {
    const base = index * (iconSize + 8) + iconSize / 2
    return Math.abs(mouseX.get() - base)
  }

  function handleClick(id: string) {
    if (id === "launchpad") {
      onLaunchpadClick()
      return
    }
    openApp(id as AppId)
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        onMouseMove={(e) => {
          const rect = dockRef.current?.getBoundingClientRect()
          if (rect) mouseX.set(e.clientX - rect.left)
        }}
        onMouseLeave={() => mouseX.set(-Infinity)}
        className="flex items-end gap-1 rounded-2xl border border-white/10 bg-black/40 px-3 pb-2 pt-2 backdrop-blur-2xl"
      >
        {items.map((item, i) => {
          const distance = useTransform(() => {
            if (mouseX.get() === -Infinity) return iconSize * 3
            return getDistance(i)
          })

          const scale = useTransform(distance, [0, iconSize * 2], [maxMagnify / iconSize, 1], { clamp: true })
          const isOpen = apps.find((a) => a.id === item.id)?.isOpen

          return (
            <motion.button
              key={item.id}
              style={{ scale, width: iconSize, height: iconSize }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(item.id)}
              className="relative flex cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-white/10"
            >
              <DockIcon item={item} />
              {isOpen && (
                <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/60" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
