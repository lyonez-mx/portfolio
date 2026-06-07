"use client"

import { useState } from "react"
import { projects } from "@/constants/projects"
import { Search, ExternalLink, GitFork, Star, Code, Globe, Smartphone, Gamepad2, Brain, Server, Wrench } from "lucide-react"

interface GitHubProps {
  isDarkMode?: boolean
}

const categoryIcons: Record<string, React.ReactNode> = {
  web: <Globe className="size-3.5" />,
  mobile: <Smartphone className="size-3.5" />,
  game: <Gamepad2 className="size-3.5" />,
  ai: <Brain className="size-3.5" />,
  tool: <Wrench className="size-3.5" />,
  infra: <Server className="size-3.5" />,
}

export default function GitHub({ isDarkMode = true }: GitHubProps) {
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(projects)

  function handleSearch(val: string) {
    setSearch(val)
    const q = val.toLowerCase()
    setFiltered(
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q)),
      ),
    )
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-50"
  const cardBorder = isDarkMode ? "border-gray-700" : "border-gray-200"
  const badgeBg = isDarkMode ? "bg-gray-700" : "bg-gray-200"
  const inputBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"

  const counts = {
    repos: projects.length,
    languages: new Set(projects.flatMap((p) => p.tech)).size,
    categories: new Set(projects.map((p) => p.category)).size,
  }

  return (
    <div className={`flex h-full flex-col ${bg} ${text}`}>
      {/* Header */}
      <div className={`border-b px-5 py-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-8 shrink-0">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <div>
            <a
              href="https://github.com/erickleonbs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-lg font-bold transition-colors hover:bg-white/10"
            >
              erickleonbs
              <ExternalLink className="size-3.5" />
            </a>
            <p className={`text-sm ${muted}`}>Full-Stack Developer</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          <span className={`flex items-center gap-1 ${muted}`}>
            <Code className="size-3.5" />
            <strong className={text}>{counts.repos}</strong> repositories
          </span>
          <span className={`flex items-center gap-1 ${muted}`}>
            <GitFork className="size-3.5" />
            <strong className={text}>{counts.languages}</strong> technologies
          </span>
          <span className={`flex items-center gap-1 ${muted}`}>
            <Star className="size-3.5" />
            <strong className={text}>{counts.categories}</strong> categories
          </span>
        </div>

        {/* Search */}
        <div className={`relative mt-3 ${inputBg} rounded-lg`}>
          <Search className={`absolute left-3 top-1/2 size-4 -translate-y-1/2 ${muted}`} />
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className={`w-full bg-transparent py-2 pl-10 pr-4 text-sm focus:outline-none ${text}`}
          />
        </div>
      </div>

      {/* Project grid */}
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className={`flex h-full items-center justify-center p-8 text-sm ${muted}`}>
            No repositories found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`rounded-xl border p-4 transition-colors ${cardBg} ${cardBorder} hover:shadow-md ${isDarkMode ? "hover:border-gray-600" : "hover:border-gray-300"}`}
              >
                {/* Top row: icon + title + category */}
                <div className="mb-3 flex items-start gap-3">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
                    <img src={p.icon} alt="" className="size-6 object-contain" draggable={false} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`truncate font-semibold ${text}`}>{p.title}</h3>
                    <div className={`mt-0.5 flex items-center gap-2 text-xs ${muted}`}>
                      {categoryIcons[p.category]}
                      <span className="capitalize">{p.category}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className={`mb-3 line-clamp-3 text-xs leading-relaxed ${muted}`}>
                  {p.description.split(".").slice(0, 3).join(".")}.
                </p>

                {/* Tech badges */}
                <div className="mb-3 flex flex-wrap gap-1">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${badgeBg} ${muted}`}>
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 5 && (
                    <span className={`rounded-md px-2 py-0.5 text-[10px] ${muted}`}>+{p.tech.length - 5}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors bg-gray-600 hover:bg-gray-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="size-3.5" />
                    Repository
                  </a>
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="size-3.5" />
                      Demo
                    </a>
                  )}
                </div>

                {/* Footer */}
                <div className={`mt-3 flex items-center gap-3 border-t pt-2 text-[10px] ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${muted}`}>
                  <span className="flex items-center gap-1">
                    <Code className="size-3" />
                    {p.tech[0]}
                  </span>
                  {p.githubUrl.includes("private") ? null : (
                    <span className="flex items-center gap-1">
                      <GitFork className="size-3" />
                      Public
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t px-5 py-2 text-xs ${isDarkMode ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400"}`}>
        {filtered.length} of {projects.length} repositories
      </div>
    </div>
  )
}
