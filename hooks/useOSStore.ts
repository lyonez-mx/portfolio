import { create } from "zustand"
import type { DesktopFile } from "@/constants/desktop-files"

export type SystemState = "boot" | "login" | "desktop" | "sleep" | "shutdown"

export type AppId =
  | "finder"
  | "terminal"
  | "spotlight"
  | "notes"
  | "safari"
  | "music"
  | "snake"
  | "weather"
  | "facetime"
  | "github"
  | "mail"
  | "youtube"
  | "settings"
  | "textedit"
  | "imageviewer"

export interface AppState {
  id: AppId
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
}

export type Locale = "en" | "es"

interface OSStore {
  apps: AppState[]
  highestZ: number
  locale: Locale
  systemState: SystemState
  isDarkMode: boolean
  brightness: number
  currentFile: DesktopFile | null
  openApp: (id: AppId) => void
  closeApp: (id: AppId) => void
  toggleMinimize: (id: AppId) => void
  focusApp: (id: AppId) => void
  setLocale: (locale: Locale) => void
  setSystemState: (state: SystemState) => void
  toggleDarkMode: () => void
  setBrightness: (value: number) => void
  openFile: (file: DesktopFile) => void
  clearFile: () => void
}

const allApps: AppId[] = [
  "finder", "terminal", "spotlight", "notes", "safari",
  "music", "snake", "weather", "facetime", "github",
  "mail", "youtube", "settings", "textedit", "imageviewer",
]

const initialApps: AppState[] = allApps.map((id) => ({
  id,
  isOpen: id === "finder",
  isMinimized: false,
  zIndex: id === "finder" ? 1 : 0,
}))

export const useOSStore = create<OSStore>((set) => {
  const savedDark = typeof window !== "undefined" ? localStorage.getItem("isDarkMode") : null
  const savedBright = typeof window !== "undefined" ? localStorage.getItem("brightness") : null

  return {
    apps: initialApps,
    highestZ: 1,
    locale: "en",
    systemState: "boot",
    isDarkMode: savedDark === null ? true : savedDark === "true",
    brightness: savedBright === null ? 90 : Number(savedBright),
    currentFile: null,

    openApp: (id) =>
      set((state) => ({
        highestZ: state.highestZ + 1,
        apps: state.apps.map((app) =>
          app.id === id
            ? { ...app, isOpen: true, isMinimized: false, zIndex: state.highestZ + 1 }
            : app
        ),
      })),

    closeApp: (id) =>
      set((state) => ({
        apps: state.apps.map((app) =>
          app.id === id ? { ...app, isOpen: false, isMinimized: false, zIndex: 0 } : app
        ),
      })),

    toggleMinimize: (id) =>
      set((state) => ({
        apps: state.apps.map((app) =>
          app.id === id ? { ...app, isMinimized: !app.isMinimized } : app
        ),
      })),

    focusApp: (id) =>
      set((state) => ({
        highestZ: state.highestZ + 1,
        apps: state.apps.map((app) =>
          app.id === id ? { ...app, zIndex: state.highestZ + 1 } : app
        ),
      })),

    setLocale: (locale) => set({ locale }),

    setSystemState: (systemState) => set({ systemState }),

    toggleDarkMode: () =>
      set((state) => {
        const next = !state.isDarkMode
        localStorage.setItem("isDarkMode", String(next))
        return { isDarkMode: next }
      }),

    setBrightness: (brightness) => {
      localStorage.setItem("brightness", String(brightness))
      set({ brightness })
    },

    openFile: (file) =>
      set((state) => {
        const appId: AppId = file.type === "txt" ? "textedit" : "imageviewer"
        return {
          currentFile: file,
          highestZ: state.highestZ + 1,
          apps: state.apps.map((app) =>
            app.id === appId
              ? { ...app, isOpen: true, isMinimized: false, zIndex: state.highestZ + 1 }
              : app
          ),
        }
      }),

    clearFile: () => set({ currentFile: null }),
  }
})
