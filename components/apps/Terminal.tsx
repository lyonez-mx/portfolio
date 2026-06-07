"use client"

import { useState, useRef, useEffect } from "react"

interface TerminalProps {
  isDarkMode?: boolean
}

export default function Terminal({ isDarkMode = true }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "Last login: " + new Date().toLocaleString(),
    "Welcome to LyonOS Terminal",
    "Type 'help' to see available commands",
    "",
  ])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    termRef.current?.addEventListener("click", () => inputRef.current?.focus())
  }, [])

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [history])

  function run(cmd: string) {
    const parts = cmd.trim().toLowerCase().split(/\s+/)
    const main = parts[0]

    setHistory((prev) => [...prev, `erik@lyonos ~ % ${cmd}`, ""])

    const add = (...lines: string[]) => setHistory((p) => [...p, ...lines, ""])

    switch (main) {
      case "help":
        add(
          "Available commands:",
          "  help      Show this message",
          "  clear     Clear terminal",
          "  echo      Print text",
          "  date      Show current date/time",
          "  ls        List files",
          "  whoami    Show current user",
          "  about     About me",
          "  skills    My technical skills",
          "  projects  Featured projects",
          "  contact   Contact info",
        )
        break
      case "clear":
        setHistory([])
        break
      case "echo":
        add(parts.slice(1).join(" "))
        break
      case "date":
        add(new Date().toString())
        break
      case "ls":
        add("Documents  Projects  Downloads  Desktop  Music  Pictures")
        break
      case "whoami":
        add("erik")
        break
      case "about":
        add(
          "┌─────────────────────────────┐",
          "│ Erik Leon                   │",
          "│ Full-Stack Developer        │",
          "└─────────────────────────────┘",
          "",
          "Passionate about building beautiful,",
          "performant web experiences.",
        )
        break
      case "skills":
        add(
          "Frontend:",
          "  React/Next.js  TypeScript  Tailwind CSS",
          "  Framer Motion  HTML/CSS    Responsive Design",
          "",
          "Backend:",
          "  Node.js/Express  Python  REST APIs  GraphQL",
          "",
          "Tools:",
          "  Git  Docker  CI/CD  Linux  Figma",
        )
        break
      case "projects":
        add(
          "Featured Projects:",
          "",
          "LyonOS Portfolio",
          "  macOS-inspired web OS with window management,",
          "  interactive terminal, and dark/light mode.",
          "  Stack: Next.js 16 · TypeScript 6 · Zustand 5 · TW 4",
          "",
          "More projects coming soon...",
        )
        break
      case "contact":
        add(
          "Email:  erik@lyonos.dev",
          "GitHub: github.com/erikleon",
        )
        break
      default:
        add(`zsh: command not found: ${main}`)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && input.trim()) {
      run(input)
      setCmdHistory((p) => [...p, input])
      setHistIdx(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(idx)
      setInput(cmdHistory[cmdHistory.length - 1 - idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx <= 0) {
        setHistIdx(-1)
        setInput("")
      } else {
        const idx = histIdx - 1
        setHistIdx(idx)
        setInput(cmdHistory[cmdHistory.length - 1 - idx])
      }
    }
  }

  return (
    <div
      ref={termRef}
      className="h-full overflow-auto bg-black p-4 font-mono text-sm text-green-400"
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex">
        <span className="mr-2 shrink-0">erik@lyonos ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="min-w-0 flex-1 bg-transparent caret-green-400 outline-none"
          autoFocus
        />
      </div>
    </div>
  )
}
