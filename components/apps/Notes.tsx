"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { useOSStore } from "@/hooks/useOSStore"
import { useTranslation } from "@/contexts/i18n"

interface NotesProps {
  isDarkMode?: boolean
}

interface Note {
  id: number
  title: string
  content: string
  date: string
}

const defaultNotes: Note[] = [
  {
    id: 1,
    title: "About Me",
    content: `**Erick León**
Full-Stack Developer & Solutions Architect

Full-Stack Developer and Software Architect with 8+ years of experience in the IT ecosystem. My expertise ranges from developing robust core backends for the banking sector to deploying cloud infrastructure and crafting fluid, intuitive user interfaces.

Passionate about automation and Artificial Intelligence, my current focus is on building autonomous agent architectures (AI Agents) to optimize business workflows, combining cutting-edge AI technologies with agile development and DevOps best practices.

**Technical Skills**

🤖 **AI & Automation**
- Python (LangChain / LangGraph)
- AI Agent Orchestration & RAG Architectures
- Advanced LLM Integration (Gemini API, OpenAI)

🖥️ **Backend & Architecture**
- Python / Java (Enterprise Systems)
- Node.js / Express
- RESTful APIs & GraphQL Design
- Microservices Architecture

🎨 **Frontend & Mobile**
- React / Next.js (TypeScript)
- Flutter (Cross-platform Mobile Development)
- Tailwind CSS / Framer Motion
- Responsive Web Design & UI/UX Principles

⚙️ **DevOps & Tools**
- Docker / Docker Compose / Kubernetes
- Google Cloud Platform (GCP)
- CI/CD Pipelines / Git & GitHub
- Linux / Unix Environments`,
    date: "Today",
  },
  {
    id: 2,
    title: "Acerca de Mí",
    content: `**Erick León**
Desarrollador Full-Stack & Arquitecto de Soluciones

Desarrollador Full-Stack y Arquitecto de Software con más de 8 años de experiencia en el ecosistema IT. Mi experiencia abarca desde el desarrollo de backends robustos para el sector bancario hasta el despliegue de infraestructura en la nube y la creación de interfaces de usuario fluidas e intuitivas.

Apasionado por la automatización y la Inteligencia Artificial, mi enfoque actual se centra en la construcción de arquitecturas de agentes autónomos (AI Agents) para optimizar flujos de trabajo empresariales, combinando tecnologías de IA de vanguardia con metodologías ágiles y mejores prácticas de DevOps.

**Habilidades Técnicas**

🤖 **IA y Automatización**
- Python (LangChain / LangGraph)
- Orquestación de Agentes de IA y Arquitecturas RAG
- Integración Avanzada de LLMs (Gemini API, OpenAI)

🖥️ **Backend y Arquitectura**
- Python / Java (Sistemas Empresariales)
- Node.js / Express
- Diseño de APIs RESTful y GraphQL
- Arquitectura de Microservicios

🎨 **Frontend y Móvil**
- React / Next.js (TypeScript)
- Flutter (Desarrollo Móvil Multiplataforma)
- Tailwind CSS / Framer Motion
- Diseño Web Responsivo y Principios UI/UX

⚙️ **DevOps y Herramientas**
- Docker / Docker Compose / Kubernetes
- Google Cloud Platform (GCP)
- Pipelines CI/CD / Git & GitHub
- Entornos Linux / Unix`,
    date: "Hoy",
  },
  {
    id: 3,
    title: "Projects",
    content: `**Lilfy Platform**
AI-powered multi-vertical business platform for Services and Real Estate. Monorepo with NestJS 11 backend (Prisma, Supabase, BullMQ, Socket.io, Google Generative AI) and Next.js 16 frontend (React 19, Tailwind v4, Recharts). Connects WhatsApp with AI agents for lead gen and customer interaction. Multi-tenant isolation, i18n, dark/light theme.

**Lilfy MCP Slack Server**
MCP server for LLM agents (Claude, Gemini, IDE bots) to interact with Slack. Exposes send_message, list_channels, and read_messages tools via the Model Context Protocol. Built with TypeScript, @modelcontextprotocol/sdk, and Slack Web API.

**Lilfy WhatsApp Adapter**
Multi-tenant WhatsApp gateway for Lilfy CRM using Baileys WebSocket protocol. QR auth, auto-reconnect, multi-image albums, inbound webhooks, group management, and contact caching. Node.js/TypeScript with Express 5, Docker Alpine.

**Lilfy Facebook Ads Scraper**
High-performance ad scraper using Playwright with anti-detection (camoufox), proxy rotation, and human simulation. Intercepts GraphQL/API calls from Facebook Ad Library. FastAPI server, Redis queuing, Docker. Exports to CSV/JSON.

**LyonOS Portfolio**
macOS-inspired web OS with custom window management, interactive terminal with virtual filesystem, dark/light mode, i18n (EN/ES), and 15+ apps. Built with Next.js 16, TypeScript 6, Zustand 5, Tailwind CSS 4, Framer Motion 12.

**Lyon Market**
Interactive storefront and org dashboard with MediaPipe camera integration, countdown overlays, and login modals. Next.js 16 App Router, React 19, TypeScript, Tailwind v4.

**Lyon Agent**
Multi-agent framework for automated video production: Planner, Script Generator, Coder, QA Verifier, and Video Editor agents. Integrates Slack for notifications and control. Python, Google Gemini, Playwright, Pydantic.

**Lyon Edit**
AI video montage editor with YOLO gesture control. Pose estimation drives touchless editing, green-screen meme compositing, Whisper transcription, Gemini clip analysis, and batch FFmpeg conversion. Python, FastAPI, WebSocket.

**Lyon Shorts**
Automated YouTube Shorts + TikTok publisher using Facade/Factory pattern. Unifies video upload, metadata, scheduling across both platforms. Python, YouTube Data API v3, TikTok Creator Graph API.

**Lyon Sentinel**
Keymapper and sound assistant for FNAF/Maze Zombie games. Automates keyboard inputs with robotjs, camera navigation hotkeys, audio soundboard, and TikTok Live connector. Node.js, uiohook-napi.

**Couch Gamer**
TikTok Live companion bot. Listens to comments/gifts, captures screen with MSS, generates voice commentary via Gemini + edge-tts. Real-time AI reactions to chat and gameplay. Python 3.13, Pillow, sounddevice.

**Iztly Amatl**
Interactive Flutter tarot app with custom physics engine (spring-damper), Rive animations, 3D card rendering with Three.js. Cross-platform: Android, iOS, Web, macOS, Windows, Linux.

**Lilfy Redis**
Production Redis config as Docker Compose for Lilfy ecosystem. Custom redis.conf with memory limits, persistence, and Sentinel for high availability.`,
    date: "Today",
  },
  {
    id: 4,
    title: "Proyectos",
    content: `**Plataforma Lilfy**
Plataforma multi-vertical de negocio impulsada por IA para Servicios y Bienes Raíces. Monorepo con backend NestJS 11 (Prisma, Supabase, BullMQ, Socket.io, Google Generative AI) y frontend Next.js 16 (React 19, Tailwind v4, Recharts). Conecta WhatsApp con agentes de IA para generación de leads e interacción con clientes. Aislamiento multi-tenant, i18n, tema oscuro/claro.

**Servidor MCP Lilfy Slack**
Servidor MCP para que agentes LLM (Claude, Gemini, bots de IDE) interactúen con Slack. Expone herramientas send_message, list_channels y read_messages mediante el Protocolo de Contexto de Modelo. TypeScript, @modelcontextprotocol/sdk, Slack Web API.

**Adaptador WhatsApp Lilfy**
Gateway multi-tenant de WhatsApp para CRM Lilfy usando protocolo WebSocket de Baileys. Autenticación QR, reconexión automática, álbumes multi-imagen, webhooks entrantes, gestión de grupos y caché de contactos. Node.js/TypeScript con Express 5, Docker Alpine.

**Scraper de Anuncios Facebook Lilfy**
Extractor de anuncios de alto rendimiento con Playwright y antidetección (camoufox), rotación de proxies y simulación humana. Intercepta llamadas GraphQL/API de la Biblioteca de Anuncios. Servidor FastAPI, colas Redis, Docker. Exporta a CSV/JSON.

**LyonOS Portfolio**
Sistema operativo web estilo macOS con gestión de ventanas, terminal interactivo con sistema de archivos virtual, modo oscuro/claro, i18n (EN/ES) y más de 15 aplicaciones. Next.js 16, TypeScript 6, Zustand 5, Tailwind CSS 4, Framer Motion 12.

**Lyon Market**
Tienda interactiva y panel de organización con integración de cámara MediaPipe, superposiciones de cuenta regresiva y modales de inicio de sesión. Next.js 16 App Router, React 19, TypeScript, Tailwind v4.

**Lyon Agent**
Framework multi-agente para producción automatizada de videos: agentes Planificador, Generador de Guiones, Programador, Verificador QA y Editor de Video. Integra Slack para notificaciones y control. Python, Google Gemini, Playwright, Pydantic.

**Lyon Edit**
Editor de montajes de video por IA con control por gestos YOLO. Edición sin contacto, composición automática de memes con green screen, transcripción Whisper, análisis de clips con Gemini y conversión por lotes FFmpeg. Python, FastAPI, WebSocket.

**Lyon Shorts**
Publicador automatizado de YouTube Shorts + TikTok usando patrón Facade/Factory. Unifica carga de video, metadatos y programación en ambas plataformas. Python, YouTube Data API v3, TikTok Creator Graph API.

**Lyon Sentinel**
Keymapper y asistente de sonido para juegos FNAF/Maze Zombie. Automatiza entradas de teclado con robotjs, navegación de cámaras, tabla de sonidos y conector TikTok Live. Node.js, uiohook-napi.

**Couch Gamer**
Bot acompañante para TikTok Live. Escucha comentarios/regalos, captura pantalla con MSS, genera comentarios por voz con Gemini + edge-tts. Reacciones IA en tiempo real al chat y al juego. Python 3.13, Pillow, sounddevice.

**Iztly Amatl**
App interactiva de tarot en Flutter con motor físico personalizado (spring-damper), animaciones Rive y renderizado 3D con Three.js. Multiplataforma: Android, iOS, Web, macOS, Windows, Linux.

**Lilfy Redis**
Configuración de Redis lista para producción como Docker Compose para el ecosistema Lilfy. redis.conf personalizado con límites de memoria, persistencia y Sentinel para alta disponibilidad.`,
    date: "Hoy",
  },
]

function renderLine(line: string): string {
  // Bold: **text**
  let html = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  return html
}

function renderNote(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      const trimmed = line.trim()
      if (!trimmed) return "<br>"

      // Headers
      if (trimmed.startsWith("### ")) {
        return `<h3 class="font-semibold text-sm mt-3 mb-1">${renderLine(trimmed.slice(4))}</h3>`
      }
      if (trimmed.startsWith("## ")) {
        return `<h2 class="font-bold text-base mt-4 mb-1">${renderLine(trimmed.slice(3))}</h2>`
      }
      if (trimmed.startsWith("# ")) {
        return `<h1 class="font-bold text-lg mt-4 mb-1">${renderLine(trimmed.slice(2))}</h1>`
      }

      // Bullet
      if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        const text = trimmed.replace(/^[-•]\s*/, "")
        return `<li class="ml-4 list-disc text-sm leading-relaxed">${renderLine(text)}</li>`
      }

      // Regular paragraph — if it starts with ** it's a bold line
      return `<p class="text-sm leading-relaxed">${renderLine(trimmed)}</p>`
    })
    .join("\n")
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  const { t } = useTranslation()
  const locale = useOSStore((s) => s.locale)
  const [notes, setNotes] = useState(defaultNotes)
  const [selectedId, setSelectedId] = useState(locale === "en" ? 1 : 2)
  const [editing, setEditing] = useState(false)

  const localeNotes = notes.filter((n) => {
    if (locale === "en") return [1, 3].includes(n.id)
    return [2, 4].includes(n.id)
  })
  const selected = localeNotes.find((n) => n.id === selectedId) ?? localeNotes[0]

  // Auto-select note based on locale
  useEffect(() => {
    const pair: Record<number, number> = { 1: 2, 2: 1, 3: 4, 4: 3 }
    const enNotes = [1, 3]
    const esNotes = [2, 4]
    if (locale === "en" && esNotes.includes(selectedId)) {
      setSelectedId(pair[selectedId])
    } else if (locale === "es" && enNotes.includes(selectedId)) {
      setSelectedId(pair[selectedId])
    }
  }, [locale, selectedId])

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!selected) return
    setNotes((prev) =>
      prev.map((n) => (n.id === selected.id ? { ...n, content: e.target.value } : n)),
    )
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebar = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bg} ${text}`}>
      {/* Sidebar */}
      <div className={`w-56 shrink-0 border-r ${border} ${sidebar} flex flex-col`}>
        <div className={`border-b ${border} px-4 py-3`}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">{t("notes")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {localeNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => { setSelectedId(note.id); setEditing(false) }}
              className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                selectedId === note.id ? selectedBg : hover
              }`}
            >
              <h3 className="truncate text-sm font-semibold">{note.title}</h3>
              <p className={`mt-0.5 truncate text-[11px] ${muted}`}>{note.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {selected && (
          <>
            <div className={`flex items-center justify-between border-b ${border} px-5 py-3`}>
              <h2 className="text-lg font-bold">{selected.title}</h2>
              <button
                onClick={() => setEditing(!editing)}
                className={`rounded-lg p-1.5 transition-colors ${hover}`}
                title={editing ? t("view") : t("edit")}
              >
                <Pencil className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              {editing ? (
                <textarea
                  className={`h-full w-full resize-none bg-transparent text-sm leading-relaxed focus:outline-none ${text}`}
                  value={selected.content}
                  onChange={handleContentChange}
                />
              ) : (
                <div
                  className="prose-custom text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderNote(selected.content) }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
