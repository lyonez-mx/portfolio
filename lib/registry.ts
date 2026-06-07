import type { AppId } from "@/hooks/useOSStore"
import type { ComponentType } from "react"
import Finder from "@/components/apps/Finder"
import Terminal from "@/components/apps/Terminal"
import Spotlight from "@/components/apps/Spotlight"
import Notes from "@/components/apps/Notes"
import Safari from "@/components/apps/Safari"
import Music from "@/components/apps/Music"
import Snake from "@/components/apps/Snake"
import Weather from "@/components/apps/Weather"
import FaceTime from "@/components/apps/FaceTime"
import GitHub from "@/components/apps/GitHub"
import Mail from "@/components/apps/Mail"
import YouTube from "@/components/apps/YouTube"
import Settings from "@/components/apps/Settings"
import TextEdit from "@/components/apps/TextEdit"
import ImageViewer from "@/components/apps/ImageViewer"

export interface AppEntry {
  title: string
  defaultSize: { width: number; height: number }
  component: ComponentType<{ isDarkMode?: boolean }>
}

export const appRegistry: Record<AppId, AppEntry> = {
  finder:      { title: "Finder",      defaultSize: { width: 640, height: 480 },  component: Finder },
  terminal:    { title: "Terminal",    defaultSize: { width: 720, height: 480 },  component: Terminal },
  spotlight:   { title: "Spotlight",   defaultSize: { width: 560, height: 400 },  component: Spotlight },
  notes:       { title: "Notes",       defaultSize: { width: 720, height: 520 },  component: Notes },
  safari:      { title: "Safari",      defaultSize: { width: 800, height: 560 },  component: Safari },
  music:       { title: "Music",       defaultSize: { width: 500, height: 560 },  component: Music },
  snake:       { title: "Snake",       defaultSize: { width: 480, height: 580 },  component: Snake },
  weather:     { title: "Weather",     defaultSize: { width: 600, height: 520 },  component: Weather },
  facetime:    { title: "FaceTime",    defaultSize: { width: 700, height: 520 },  component: FaceTime },
  github:      { title: "GitHub",      defaultSize: { width: 480, height: 320 },  component: GitHub },
  mail:        { title: "Mail",        defaultSize: { width: 480, height: 320 },  component: Mail },
  youtube:     { title: "YouTube",     defaultSize: { width: 480, height: 320 },  component: YouTube },
  settings:    { title: "Settings",    defaultSize: { width: 680, height: 500 },  component: Settings },
  textedit:    { title: "TextEdit",    defaultSize: { width: 640, height: 480 },  component: TextEdit },
  imageviewer: { title: "Image Viewer", defaultSize: { width: 640, height: 480 }, component: ImageViewer },
}
