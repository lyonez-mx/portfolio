"use client"

import { useOSStore } from "@/hooks/useOSStore"

interface TextEditProps {
  isDarkMode?: boolean
}

export default function TextEdit({ isDarkMode = true }: TextEditProps) {
  const currentFile = useOSStore((s) => s.currentFile)
  const clearFile = useOSStore((s) => s.clearFile)

  if (!currentFile) {
    return (
      <div className={`flex h-full items-center justify-center ${isDarkMode ? "bg-gray-900 text-white/40" : "bg-white text-gray-400"}`}>
        No file selected
      </div>
    )
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"
  const lineBg = isDarkMode ? "bg-gray-800" : "bg-gray-50"
  const lineText = isDarkMode ? "text-gray-400" : "text-gray-500"

  const lines = currentFile.content.split("\n")

  return (
    <div className={`flex h-full flex-col ${bg} ${text}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-1 text-xs ${isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"}`}>
        <span className="font-medium">{currentFile.name}</span>
        <span className="text-white/30">—</span>
        <span>{lines.length} lines</span>
        <div className="ml-auto flex gap-2">
          <span>Plain Text</span>
          <span>UTF-8</span>
        </div>
      </div>
      <div className="flex flex-1 overflow-auto">
        <div className={`flex select-none flex-col items-end px-3 py-2 text-sm leading-6 ${lineBg} ${lineText}`} style={{ minWidth: 48 }}>
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-3">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-6">
            {currentFile.content}
          </pre>
        </div>
      </div>
    </div>
  )
}
