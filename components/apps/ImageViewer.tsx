"use client"

import { useOSStore } from "@/hooks/useOSStore"

interface ImageViewerProps {
  isDarkMode?: boolean
}

export default function ImageViewer({ isDarkMode = true }: ImageViewerProps) {
  const currentFile = useOSStore((s) => s.currentFile)

  if (!currentFile) {
    return (
      <div className={`flex h-full items-center justify-center ${isDarkMode ? "bg-gray-900 text-white/40" : "bg-white text-gray-400"}`}>
        No file selected
      </div>
    )
  }

  return (
    <div className={`flex h-full flex-col ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-1 text-xs ${isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"}`}>
        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{currentFile.name}</span>
        <span className="text-white/30">—</span>
        <span>JPEG Image</span>
        <span className="ml-auto">100%</span>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-auto p-4">
        <img
          src={currentFile.content}
          alt={currentFile.name}
          className="max-h-full max-w-full rounded-lg object-contain shadow-xl"
        />
      </div>
    </div>
  )
}
