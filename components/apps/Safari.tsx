"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Search, Globe } from "lucide-react"

interface SafariProps {
  isDarkMode?: boolean
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [url, setUrl] = useState("https://lyonos.dev")
  const [isLoading, setIsLoading] = useState(false)

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const toolbar = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const inputBg = isDarkMode ? "bg-gray-700" : "bg-gray-200"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"

  const bookmarks = [
    { title: "GitHub", url: "https://github.com/lyonez-mx", icon: <GithubIcon /> },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/erick-hip%C3%B3lito-7b81b838a/", icon: <LinkedinIcon /> },
    { title: "YouTube", url: "https://youtube.com", icon: <YoutubeIcon /> },
    { title: "Email", url: "mailto:[EMAIL_ADDRESS]", icon: <MailIcon /> },
  ]

  function handleRefresh() {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <div className={`flex h-full flex-col ${bg} ${text}`}>
      <div className={`flex items-center gap-2 border-b ${border} ${toolbar} p-2`}>
        <button className={`rounded p-1 ${hover}`}><ArrowLeft className="size-4" /></button>
        <button className={`rounded p-1 ${hover}`}><ArrowRight className="size-4" /></button>
        <button className={`rounded p-1 ${hover}`} onClick={handleRefresh}>
          <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
        <div className={`flex flex-1 items-center gap-2 rounded ${inputBg} px-3 py-1`}>
          <Globe className="size-3.5 text-gray-500" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full bg-transparent text-sm focus:outline-none ${text}`}
          />
          <Search className="size-3.5 text-gray-500" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <h2 className="mb-6 text-2xl font-bold">Bookmarks</h2>
        <div className="mb-12 grid grid-cols-4 gap-6">
          {bookmarks.map((b, i) => (
            <a
              key={i}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 rounded-lg p-4 ${hover}`}
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">{b.icon}</div>
              <span className="text-sm">{b.title}</span>
            </a>
          ))}
        </div>

        <div className={`mx-auto max-w-xl rounded-lg p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <h3 className="mb-2 text-xl font-semibold">Welcome to LyonOS</h3>
          <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            A macOS-inspired web experience. Explore the desktop, open apps from the dock,
            and enjoy the interactive terminal.
          </p>
        </div>
      </div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}
