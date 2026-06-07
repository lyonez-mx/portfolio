"use client"

import { useOSStore } from "@/hooks/useOSStore"

interface PDFViewerProps {
  isDarkMode?: boolean
}

export default function PDFViewer({ isDarkMode = true }: PDFViewerProps) {
  const currentFile = useOSStore((s) => s.currentFile)
  const src = currentFile ? encodeURI(currentFile.content) : "/pdf/CV%20Erick%20Leonardo.pdf"

  return (
    <div className={`flex h-full flex-col ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-1 text-xs ${isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"}`}>
        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          {currentFile?.name ?? "cv.pdf"}
        </span>
        <span className="text-white/30">—</span>
        <span>PDF Document</span>
        <span className="ml-auto">100%</span>
      </div>
      <div className="flex-1">
        <iframe
          src={src}
          className="h-full w-full"
          title="PDF Viewer"
        />
      </div>
    </div>
  )
}
