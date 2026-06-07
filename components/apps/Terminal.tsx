"use client"

import { useState, useRef, useEffect } from "react"
import { resolve, getNode, ls, cat, formatLS } from "@/lib/virtual-fs"
import { projects } from "@/constants/projects"

interface TerminalProps {
  isDarkMode?: boolean
}

export default function Terminal({ isDarkMode = true }: TerminalProps) {
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState("~")
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

  function add(...lines: string[]) {
    setHistory((p) => [...p, ...lines, ""])
  }

  const absCwd = cwd === "~" ? "/home/erik" : cwd.startsWith("~/") ? "/home/erik" + cwd.slice(1) : cwd

  function run(cmd: string) {
    const parts = cmd.trim().split(/\s+/)
    const main = parts[0].toLowerCase()

    setHistory((prev) => [
      ...prev,
      `erik@lyonos ${cwd} % ${cmd}`,
      "",
    ])

    switch (main) {
      case "help":
        add(
          "Available commands:",
          "  cd [dir]   Change directory (cd .., cd ~, cd projects)",
          "  ls [-la]   List directory contents",
          "  cat [file] Show file contents",
          "  pwd        Print working directory",
          "  clear      Clear terminal",
          "  help       Show this message",
          "  echo       Print text",
          "  date       Show current date/time",
          "  about      About me",
          "  skills     My technical skills",
          "  projects   List all projects",
          "  whoami     Show current user",
        )
        break

      case "clear":
        setHistory([])
        break

      case "pwd":
        add(absCwd)
        break

      case "cd": {
        const target = parts[1] || "~"
        const resolved = resolve(absCwd, target)
        const node = getNode(resolved)
        if (!node) {
          add(`cd: no such file or directory: ${target}`)
        } else if (node.type !== "dir") {
          add(`cd: not a directory: ${target}`)
        } else {
          const newCwd = resolved === "/home/erik" ? "~" : resolved.startsWith("/home/erik/") ? "~" + resolved.slice(10) : resolved
          setCwd(newCwd)
        }
        break
      }

      case "ls": {
        const flag = parts[1]
        const target = flag?.startsWith("-") ? (parts[2] || ".") : (parts[1] || ".")
        const path = resolve(absCwd, target)
        const node = getNode(path)

        if (!node) {
          add(`ls: no such file or directory: ${target}`)
        } else if (node.type !== "dir") {
          add(`ls: not a directory: ${target}`)
        } else {
          if (flag === "-la") {
            const out = formatLS(path)
            add(out || "(empty)")
          } else {
            const listing = ls(path)
            if (listing && listing.length > 0) {
              add(listing.join("  "))
            } else {
              add("(empty)")
            }
          }
        }
        break
      }

      case "cat": {
        if (!parts[1]) {
          add("cat: missing filename")
          break
        }
        const path = resolve(absCwd, parts[1])
        const content = cat(path)
        if (content === null) {
          add(`cat: ${parts[1]}: No such file or directory`)
        } else {
          add(content)
        }
        break
      }

      case "echo":
        add(parts.slice(1).join(" "))
        break

      case "date":
        add(new Date().toString())
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
          "",
          "Try 'cat ~/about.txt' for more info.",
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
        add(`Total projects: ${projects.length}\n`)
        for (const p of projects) {
          add(`  ${p.title}`)
          add(`    ${p.description.split(".")[0]}.`)
          add(`    Tech: ${p.tech.join(", ")}`)
          add(`    ${p.githubUrl}`)
          add("")
        }
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
        <span className="mr-2 shrink-0 text-green-300">erik@lyonos {cwd} %</span>
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
