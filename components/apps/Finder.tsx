"use client"

import { useState } from "react"
import { projects } from "@/constants/projects"
import { resolve, getNode, ls, cat } from "@/lib/virtual-fs"
import { useOSStore } from "@/hooks/useOSStore"
import { useTranslation } from "@/contexts/i18n"
import { FileText, File, Image, Music4, FolderOpen, Folder, ArrowLeft, Grid3X3, List } from "lucide-react"

interface FinderProps {
  isDarkMode?: boolean
}

const HOME = "/home/erik"
const SIDEBAR_PATHS = [
  { id: "projects", key: "projects" as const, path: "Projects" },
  { id: "documents", key: "documents" as const, path: "Documents" },
  { id: "downloads", key: "downloads" as const, path: "Downloads" },
] as const

type ViewMode = "grid" | "list"

function isPDF(n: string) { return n.toLowerCase().endsWith(".pdf") }
function isImage(n: string) { return /\.(png|jpg|jpeg|gif|webp)$/i.test(n) }
function isAudio(n: string) { return /\.(mp3|wav|ogg|flac)$/i.test(n) }

function getProjectByFolder(folderName: string) {
  return projects.find((p) => p.title.toLowerCase() === folderName.toLowerCase())
}

function ProjectPreviewCard({ project, isDarkMode }: { project: (typeof projects)[0]; isDarkMode: boolean }) {
  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const badgeBg = isDarkMode ? "bg-gray-700" : "bg-gray-200"
  return (
    <div className="flex flex-col items-center gap-4 p-6 text-center">
      <div className={`flex size-20 items-center justify-center rounded-2xl ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <img src={project.icon} alt="" className="size-12 object-contain" draggable={false} />
      </div>
      <div>
        <h3 className={`text-lg font-bold ${text}`}>{project.title}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{project.description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className={`rounded-md px-2.5 py-1 text-xs font-medium ${badgeBg} ${muted}`}>{t}</span>
        ))}
      </div>
      <div className="flex gap-3">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-500"
          onClick={(e) => e.stopPropagation()}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
          GitHub
        </a>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            Demo
          </a>
        )}
      </div>
    </div>
  )
}

function PDFPreviewCard({ fileName, isDarkMode }: { fileName: string; isDarkMode: boolean }) {
  const openFile = useOSStore((s) => s.openFile)
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const text = isDarkMode ? "text-white" : "text-gray-800"
  return (
    <div className="flex flex-col items-center gap-4 p-6 text-center">
      <div className={`flex size-24 items-center justify-center rounded-2xl ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <File className="size-14 text-red-400" strokeWidth={1.5} />
      </div>
      <h3 className={`text-base font-bold ${text}`}>{fileName}</h3>
      <p className={`text-sm ${muted}`}>PDF Document</p>
      <button
        onClick={() => openFile({ id: "cv", name: fileName, type: "pdf", content: "/pdf/" + fileName, position: { x: 0, y: 0 } })}
        className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Open
      </button>
    </div>
  )
}

export default function Finder({ isDarkMode = true }: FinderProps) {
  const { t } = useTranslation()
  const openApp = useOSStore((s) => s.openApp)
  const openFile = useOSStore((s) => s.openFile)
  const [sidebarSection, setSidebarSection] = useState<string>("projects")
  const [currentDir, setCurrentDir] = useState("~/Projects")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const absDir = currentDir === "~" ? HOME : currentDir.startsWith("~/") ? HOME + currentDir.slice(1) : currentDir
  const entries = ls(absDir) ?? []
  const selectedNode = selectedFile ? getNode(absDir + "/" + selectedFile) : null
  const folderParts = currentDir.split("/")
  const folderName = folderParts[folderParts.length - 1]
  const previewProject = selectedFile === "README.md" ? getProjectByFolder(folderName) : null

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const activeBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"
  const hover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-blue-600/30" : "bg-blue-100"
  const previewBg = isDarkMode ? "bg-gray-800/50" : "bg-gray-50"

  function navigateTo(path: string) { setCurrentDir(path); setSelectedFile(null) }

  function handleSidebarClick(section: string) {
    setSidebarSection(section)
    navigateTo("~/" + section.charAt(0).toUpperCase() + section.slice(1))
  }

  function handleDoubleClick(name: string) {
    const node = getNode(absDir + "/" + name)
    if (!node) return
    if (node.type === "dir") {
      navigateTo(currentDir === "~" ? "~/" + name : currentDir + "/" + name)
      return
    }
    // Open file in appropriate app
    if (isAudio(name)) {
      openApp("music")
    } else if (isImage(name)) {
      const url = (node.content ?? "").replace(/^\[image: (.+)\]$/, "$1")
      openFile({ id: name, name, type: "image", content: url, position: { x: 0, y: 0 } })
    } else if (isPDF(name)) {
      const url = (node.content ?? "").replace(/^\[PDF: (.+)\]$/, "$1")
      openFile({ id: name, name, type: "pdf", content: url, position: { x: 0, y: 0 } })
    } else {
      const content = node.content ?? ""
      openFile({ id: name, name, type: "txt", content, position: { x: 0, y: 0 } })
    }
  }

  function handleFileClick(name: string) {
    const node = getNode(absDir + "/" + name)
    if (node?.type === "file") setSelectedFile(name)
  }

  function goUp() {
    const parts = currentDir.split("/")
    if (parts.length <= 1) return
    navigateTo(parts.slice(0, -1).join("/") || "~")
  }

  const content = selectedFile && selectedNode?.type === "file" ? cat(absDir + "/" + selectedFile) : null

  function fileIcon(name: string, isDir: boolean, cls = "size-10") {
    if (isDir) return <Folder className={`${cls} ${muted}`} strokeWidth={1.5} />
    if (isPDF(name)) return <File className={`${cls} text-red-400`} strokeWidth={1.5} />
    if (isImage(name)) return <Image className={`${cls} text-green-400`} strokeWidth={1.5} />
    if (isAudio(name)) return <Music4 className={`${cls} text-purple-400`} strokeWidth={1.5} />
    return <FileText className={`${cls} text-blue-400`} strokeWidth={1.5} />
  }

  // Preview content for selected file
  function renderPreview() {
    if (!selectedFile || !selectedNode) return null
    const rawContent = selectedNode.content ?? ""

    if (previewProject && selectedFile === "README.md") {
      return <ProjectPreviewCard project={previewProject} isDarkMode={isDarkMode} />
    }
    if (isImage(selectedFile)) {
      const url = rawContent.replace(/^\[image: (.+)\]$/, "$1")
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
          <img src={url} alt={selectedFile} className="max-h-60 max-w-full rounded-lg object-contain shadow-lg" />
          <p className={`text-xs ${muted}`}>{selectedFile}</p>
        </div>
      )
    }
    if (isAudio(selectedFile)) {
      return (
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <Music4 className="size-16 text-purple-400" />
          <p className={`text-sm ${muted}`}>{selectedFile}</p>
          <button
            onClick={() => openApp("music")}
            className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-500"
          >
            Open in Music
          </button>
        </div>
      )
    }
    if (isPDF(selectedFile)) {
      return <PDFPreviewCard fileName={selectedFile} isDarkMode={isDarkMode} />
    }
    return content !== null ? (
      <pre className={`whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed ${text}`}>{content}</pre>
    ) : null
  }

  return (
    <div className={`flex h-full ${bg} ${text}`}>
      {/* Sidebar */}
      <div className={`flex w-48 shrink-0 flex-col border-r ${border} ${sidebarBg}`}>
        <div className={`border-b ${border} px-4 py-2.5 text-xs font-semibold ${muted}`}>{t("favorites")}</div>
        <nav className="flex-1 space-y-0.5 p-2">
          {SIDEBAR_PATHS.map((item) => {
            const isActive = sidebarSection === item.id
            const Icon = isActive ? FolderOpen : Folder
            return (
              <button key={item.id} onClick={() => handleSidebarClick(item.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${isActive ? activeBg : hover}`}>
                <Icon className={`size-4 ${isActive ? "" : muted}`} />
                <span>{t(item.key)}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* File browser */}
      <div className="flex w-1 flex-1 flex-col">
        <div className={`flex items-center gap-2 border-b ${border} px-3 py-2`}>
          <button onClick={goUp} className={`rounded p-0.5 ${hover} disabled:opacity-30`}
            disabled={currentDir === "~" || currentDir === "~/Projects"}>
            <ArrowLeft className="size-3.5" />
          </button>
          <div className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <FolderOpen className="size-3.5" />
            <span className="font-medium">{currentDir === "~" ? "erik" : currentDir.replace("~/", "")}</span>
          </div>
          <div className="ml-auto flex gap-1">
            <button onClick={() => setViewMode("grid")}
              className={`rounded p-1 ${viewMode === "grid" ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") : hover}`}>
              <Grid3X3 className="size-3.5" />
            </button>
            <button onClick={() => setViewMode("list")}
              className={`rounded p-1 ${viewMode === "list" ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") : hover}`}>
              <List className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3">
          {entries.length === 0 ? (
            <div className={`flex h-full items-center justify-center text-sm ${muted}`}>Empty folder</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3">
              {entries.map((name) => {
                const node = getNode(absDir + "/" + name)
                const isDir = node?.type === "dir"
                const isSelected = selectedFile === name
                return (
                  <button key={name} onClick={() => isDir ? handleDoubleClick(name) : handleFileClick(name)}
                    onDoubleClick={() => handleDoubleClick(name)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl p-3 transition-colors ${isSelected ? selectedBg : hover}`}>
                    <div className="flex size-12 items-center justify-center">{fileIcon(name, isDir)}</div>
                    <span className={`max-w-full truncate text-center text-[11px] leading-tight ${isSelected ? "font-medium" : ""}`}>{name}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {entries.map((name) => {
                const node = getNode(absDir + "/" + name)
                const isDir = node?.type === "dir"
                const isSelected = selectedFile === name
                return (
                  <button key={name} onClick={() => isDir ? handleDoubleClick(name) : handleFileClick(name)}
                    onDoubleClick={() => handleDoubleClick(name)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${isSelected ? selectedBg : hover}`}>
                    {fileIcon(name, isDir, "size-5 shrink-0")}
                    <span className={isSelected ? "font-medium" : ""}>{name}</span>
                    <span className={`ml-auto text-xs ${muted}`}>{isDir ? "folder" : isImage(name) ? "image" : isAudio(name) ? "audio" : isPDF(name) ? "pdf" : "file"}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className={`border-t ${border} px-4 py-1.5 text-xs ${muted}`}>{entries.length} {entries.length === 1 ? "item" : "items"}</div>
      </div>

      {/* Preview panel */}
      <div className={`flex w-[380px] shrink-0 flex-col border-l ${border} ${previewBg}`}>
        <div className={`border-b ${border} px-4 py-2.5 text-xs font-semibold ${muted}`}>
          {t("language") === "Language" ? "Preview" : "Vista Previa"}
        </div>
        <div className="flex-1 overflow-auto">
          {renderPreview() ??
            <div className={`flex h-full items-center justify-center p-6 text-center text-sm ${muted}`}>
              {t("language") === "Language" ? "Select a file to preview" : "Selecciona un archivo"}
            </div>
          }
        </div>
        {selectedFile && (
          <div className={`border-t ${border} px-4 py-1.5 text-xs ${muted}`}>{selectedFile}</div>
        )}
      </div>
    </div>
  )
}
