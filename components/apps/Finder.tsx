"use client"

import { useState } from "react"
import { projects, type Project } from "@/constants/projects"
import { useOSStore } from "@/hooks/useOSStore"
import { FolderOpen, Folder, FileText, Grid3X3, ArrowLeft, ArrowRight } from "lucide-react"

interface FinderProps {
  isDarkMode?: boolean
}

type Section = "projects" | "documents" | "downloads"

const sections: { id: Section; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "documents", label: "Documents" },
  { id: "downloads", label: "Downloads" },
]

function ProjectCard({ project, isDarkMode }: { project: Project; isDarkMode: boolean }) {
  const openFile = useOSStore((s) => s.openFile)

  const bg = isDarkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-gray-100 hover:bg-gray-200"
  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const badgeBg = isDarkMode ? "bg-gray-700" : "bg-gray-200"

  return (
    <div className={`rounded-xl border p-4 transition-colors ${bg} ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
      <div className="mb-3 flex items-start gap-3">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
          <img src={project.icon} alt="" className="size-6 object-contain" draggable={false} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`truncate font-semibold ${text}`}>{project.title}</h3>
          <p className={`mt-1 line-clamp-2 text-xs leading-relaxed ${muted}`}>{project.description}</p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span key={t} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${badgeBg} ${muted}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors bg-gray-600 hover:bg-gray-500"
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500"
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default function Finder({ isDarkMode = true }: FinderProps) {
  const [section, setSection] = useState<Section>("projects")

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const activeBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"
  const hover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"

  return (
    <div className={`flex h-full ${bg} ${text}`}>
      <div className={`flex w-52 shrink-0 flex-col border-r ${border} ${sidebarBg}`}>
        <div className={`border-b ${border} px-4 py-2.5 text-xs font-semibold ${muted}`}>Favorites</div>
        <nav className="flex-1 space-y-0.5 p-2">
          {sections.map((s) => {
            const Icon = s.id === "projects" ? FolderOpen : Folder
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  section === s.id ? activeBg : hover
                }`}
              >
                <Icon className={`size-4 ${section === s.id ? "" : muted}`} />
                <span>{s.label}</span>
                <span className={`ml-auto text-xs ${muted}`}>
                  {s.id === "projects" ? projects.length : 0}
                </span>
              </button>
            )
          })}
        </nav>
        <div className={`border-t ${border} p-3 text-center text-xs ${muted}`}>6 items</div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className={`flex items-center gap-2 border-b ${border} px-4 py-2`}>
          <button className={`rounded p-0.5 ${hover}`}><ArrowLeft className="size-3.5" /></button>
          <button className={`rounded p-0.5 ${hover}`}><ArrowRight className="size-3.5" /></button>
          <div className={`flex items-center gap-2 rounded-md px-3 py-1 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <FolderOpen className="size-3.5" />
            <span className="text-xs font-medium">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
          </div>
          <div className="ml-auto flex gap-1">
            <button className={`rounded p-1 ${hover}`}><Grid3X3 className="size-3.5" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {section === "projects" && (
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold">{text}</h2>
                <span className={`text-xs ${muted}`}>{projects.length} projects</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>
          )}

          {section === "documents" && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <FileText className={`mx-auto mb-2 size-8 ${muted}`} />
                <p className={`text-sm ${muted}`}>No documents yet</p>
              </div>
            </div>
          )}

          {section === "downloads" && (
            <div className="flex h-full items-center justify-center">
              <div className={`text-center text-sm ${muted}`}>Downloads folder is empty</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
