"use client"

import { useState } from "react"
import { useOSStore } from "@/hooks/useOSStore"
import { appRegistry } from "@/lib/registry"
import { desktopFiles } from "@/constants/desktop-files"
import Dock from "./Dock"
import TopBar from "./TopBar"
import DesktopBackground from "./DesktopBackground"
import Window from "./Window"
import Launchpad from "./Launchpad"
import DesktopIcon from "./DesktopIcon"

export default function Desktop() {
  const apps = useOSStore((s) => s.apps)
  const isDarkMode = useOSStore((s) => s.isDarkMode)
  const [showLaunchpad, setShowLaunchpad] = useState(false)

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${isDarkMode ? "bg-neutral-950" : "bg-neutral-100"}`}>
      <DesktopBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

      {desktopFiles.map((file) => (
        <DesktopIcon key={file.id} file={file} />
      ))}

      <TopBar />

      {apps
        .filter((a) => a.isOpen && !a.isMinimized)
        .map((app) => {
          const entry = appRegistry[app.id]
          if (!entry) return null
          const Component = entry.component
          return (
            <Window key={app.id} appId={app.id} title={entry.title} defaultSize={entry.defaultSize} defaultPosition={entry.defaultPosition}>
              <Component isDarkMode={isDarkMode} />
            </Window>
          )
        })}

      {showLaunchpad && <Launchpad onClose={() => setShowLaunchpad(false)} />}

      <Dock onLaunchpadClick={() => setShowLaunchpad((p) => !p)} />
    </div>
  )
}
