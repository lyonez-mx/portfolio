"use client"

import { useState } from "react"

interface NotesProps {
  isDarkMode?: boolean
}

const defaultNotes = [
  {
    id: 1,
    title: "About Me",
    content: `# Erik Leon
Full-Stack Developer & UI/UX Designer

## Skills
### Frontend
- React / Next.js
- TypeScript / JavaScript
- Tailwind CSS
- Framer Motion
- Responsive Web Design

### Backend
- Node.js / Express
- Python
- RESTful APIs / GraphQL

### Tools
- Git / GitHub
- Docker
- CI/CD
- Linux / Unix

## Contact
Email: erik@example.com
GitHub: github.com/erikleon`,
    date: "Today, 10:30 AM",
  },
  {
    id: 2,
    title: "Projects",
    content: `# Featured Projects

## LyonOS Portfolio
A macOS-inspired web OS portfolio built with Next.js 16,
TypeScript 6, Tailwind CSS 4, and Zustand 5.
- Custom window management with drag & resize
- Interactive terminal emulator
- Dark/light mode
- i18n (EN/ES)

## More Projects
Coming soon...`,
    date: "Yesterday, 3:15 PM",
  },
]

export default function Notes({ isDarkMode = true }: NotesProps) {
  const [notes, setNotes] = useState(defaultNotes)
  const [selectedId, setSelectedId] = useState(1)

  const selected = notes.find((n) => n.id === selectedId)

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedId ? { ...n, content: e.target.value } : n)),
    )
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebar = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const border = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bg} ${text}`}>
      <div className={`w-56 border-r ${border} ${sidebar} flex flex-col`}>
        <div className={`border-b ${border} p-3`}>
          <h2 className="font-medium">Notes</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`cursor-pointer p-3 ${selectedId === note.id ? selectedBg : hover}`}
              onClick={() => setSelectedId(note.id)}
            >
              <h3 className="truncate font-medium">{note.title}</h3>
              <p className={`mt-1 truncate text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {note.date}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        {selected && (
          <>
            <div className={`border-b ${border} p-3`}>
              <h2 className="font-medium">{selected.title}</h2>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{selected.date}</p>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <textarea
                className={`h-full w-full resize-none ${bg} ${text} focus:outline-none`}
                value={selected.content}
                onChange={handleContentChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
