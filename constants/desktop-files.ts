import type { Locale } from "@/hooks/useOSStore"

export interface DesktopFile {
  id: string
  name: Record<Locale, string>
  type: "txt" | "image" | "pdf"
  content: Record<Locale, string>
  position: { x: number; y: number }
}

export interface ResolvedFile {
  id: string
  name: string
  type: "txt" | "image" | "pdf"
  content: string
  position: { x: number; y: number }
}

export function resolveFile(file: DesktopFile, locale: Locale): ResolvedFile {
  return {
    id: file.id,
    name: file.name[locale],
    type: file.type,
    content: file.content[locale],
    position: file.position,
  }
}

export const desktopFiles: DesktopFile[] = [
  {
    id: "readme",
    name: { en: "README.txt", es: "README.txt" },
    type: "txt",
    content: {
      en: `Welcome to LyonOS

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
      es: `Bienvenido a LyonOS

Un portafolio web con estilo macOS.

Construido con:
  · Next.js 16 (App Router)
  · TypeScript 6
  · Tailwind CSS 4
  · Zustand 5
  · Framer Motion 12
  · Lucide React

Características:
  · Gestión de ventanas (arrastrar, redimensionar, maximizar)
  · Terminal interactivo
  · Modo oscuro / claro
  · i18n (EN / ES)
  · 13 aplicaciones integradas
  · Snake game, clima, reproductor musical

Haga clic en "Restart" en el menú Apple para reiniciar.`,
    },
    position: { x: 30, y: 100 },
  },
  {
    id: "about",
    name: { en: "about.txt", es: "acerca.txt" },
    type: "txt",
    content: {
      en: `Erick Leon
Full-Stack Developer & Solutions Architect

8+ years of experience in the IT ecosystem.
Expertise in core backends for banking, cloud infrastructure,
and intuitive user interfaces.

Focus: AI Agents, automation, DevOps.
Tech: Python, TypeScript, React, Next.js, Flutter, Docker, GCP.`,
      es: `Erick León
Desarrollador Full-Stack & Arquitecto de Soluciones

Más de 8 años de experiencia en el ecosistema IT.
Experiencia en backends para banca, infraestructura cloud
e interfaces de usuario intuitivas.

Enfoque: Agentes IA, automatización, DevOps.
Tecnologías: Python, TypeScript, React, Next.js, Flutter, Docker, GCP.`,
    },
    position: { x: 30, y: 240 },
  },
  {
    id: "cv",
    name: { en: "CV Erick Leonardo.pdf", es: "CV Erick Leonardo.pdf" },
    type: "pdf",
    content: { en: "/pdf/CV Erick Leonardo.pdf", es: "/pdf/CV Erick Leonardo.pdf" },
    position: { x: 30, y: 380 },
  },
  {
    id: "projects",
    name: { en: "projects.txt", es: "proyectos.txt" },
    type: "txt",
    content: {
      en: `Featured Projects

Lilfy - AI multi-vertical business platform (NestJS + Next.js, AI agents + WhatsApp)
Lilfy MCP Slack - MCP server for LLM agents to interact with Slack (TypeScript)
Lilfy WhatsApp - Multi-tenant WhatsApp adapter for CRM (TypeScript, Baileys)
Lilfy Facebook Ads - High-performance Facebook ads scraper (Python, Playwright)
LyonOS Portfolio - macOS-inspired web OS (Next.js 16, Zustand, Framer Motion)
Lyon Market - Interactive storefront + camera integration (Next.js, MediaPipe)
Lyon Agent - Multi-agent framework for video production (Python, Gemini)
Lyon Edit - AI video editor with YOLO gesture control (Python, YOLO, Whisper)
Lyon Shorts - YouTube Shorts + TikTok automated publisher (Python)
Lyon Sentinel - Keymapper + soundboard for FNAF games (Node.js, robotjs)
Couch Gamer - TikTok Live companion bot with AI voice (Python, Gemini)
Iztly Amatl - Flutter tarot app with physics engine (Dart, Flutter)
Lilfy Redis - Production Redis config on Docker (Docker, Redis)`,
      es: `Proyectos Destacados

Lilfy - Plataforma multi-vertical con IA (NestJS + Next.js, agentes IA + WhatsApp)
Lilfy MCP Slack - Servidor MCP para agentes LLM en Slack (TypeScript)
Lilfy WhatsApp - Adaptador multi-tenant WhatsApp para CRM (TypeScript, Baileys)
Lilfy Facebook Ads - Scraper de anuncios Facebook (Python, Playwright)
LyonOS Portfolio - Sistema operativo web estilo macOS (Next.js 16, Zustand)
Lyon Market - Tienda interactiva + cámara (Next.js, MediaPipe)
Lyon Agent - Framework multi-agente para producción de video (Python, Gemini)
Lyon Edit - Editor de video por IA con gestos YOLO (Python, YOLO, Whisper)
Lyon Shorts - Publicador YouTube Shorts + TikTok (Python)
Lyon Sentinel - Keymapper + sonidos para juegos FNAF (Node.js, robotjs)
Couch Gamer - Bot TikTok Live con voz IA (Python, Gemini)
Iztly Amatl - App de tarot Flutter con motor físico (Dart, Flutter)
Lilfy Redis - Config Redis producción en Docker (Docker, Redis)`,
    },
    position: { x: 160, y: 100 },
  },
  {
    id: "lyon",
    name: { en: "lyon.png", es: "lyon.png" },
    type: "image",
    content: { en: "/images/lyon.png", es: "/images/lyon.png" },
    position: { x: 160, y: 520 },
  },
  {
    id: "me",
    name: { en: "me.jpg", es: "me.jpg" },
    type: "image",
    content: { en: "/images/me.jpg", es: "/images/me.jpg" },
    position: { x: 160, y: 380 },
  },
  {
    id: "foto",
    name: { en: "foto.jpg", es: "foto.jpg" },
    type: "image",
    content: { en: "/icons/github.png", es: "/icons/github.png" },
    position: { x: 30, y: 520 },
  },
]
