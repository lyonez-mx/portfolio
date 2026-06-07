export interface DesktopFile {
  id: string
  name: string
  type: "txt" | "image"
  content: string
  position: { x: number; y: number }
}

export const desktopFiles: DesktopFile[] = [
  {
    id: "readme",
    name: "README.txt",
    type: "txt",
    content: `Welcome to LyonOS

A macOS-inspired web OS portfolio.

Built with:
  · Next.js 16 (App Router)
  · TypeScript 6
  · Tailwind CSS 4
  · Zustand 5
  · Framer Motion 12
  · Lucide React

Features:
  · Custom window management (drag, resize, maximize)
  · Interactive terminal emulator
  · Dark / Light mode
  · i18n (EN / ES)
  · 13 built-in apps
  · Snake game, weather, music player

Click "Restart" in the Apple menu to reboot.`,
    position: { x: 30, y: 100 },
  },
  {
    id: "about",
    name: "about.txt",
    type: "txt",
    content: `About the author

Full-stack developer passionate about building
beautiful, performant web experiences.

Focus areas:
  · Frontend architecture (React, Next.js)
  · UI / UX design systems
  · Interactive web experiences
  · Open source

When not coding, you'll find me exploring
new technologies, contributing to OSS,
or playing indie games.`,
    position: { x: 30, y: 240 },
  },
  {
    id: "projects",
    name: "projects.txt",
    type: "txt",
    content: `Featured Projects

LyonOS Portfolio
  macOS-inspired web OS with window management,
  interactive terminal, and dark/light mode.
  Stack: Next.js 16 · TypeScript 6 · Zustand 5

More projects coming soon. Check back later.`,
    position: { x: 30, y: 380 },
  },
  {
    id: "foto",
    name: "foto.jpg",
    type: "image",
    content: "/icons/github.png",
    position: { x: 30, y: 520 },
  },
]
