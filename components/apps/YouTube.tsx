"use client"

import { useEffect, useRef } from "react"
import { Film } from "lucide-react"

interface YouTubeProps {
  isDarkMode?: boolean
}

export default function YouTubeApp({ isDarkMode = true }: YouTubeProps) {
  const opened = useRef(false)

  useEffect(() => {
    if (!opened.current) {
      opened.current = true
      window.open("https://youtube.com", "_blank")
    }
  }, [])

  return (
    <div className={`flex h-full items-center justify-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="text-center">
        <Film className="mx-auto mb-4 size-16 text-red-500" />
        <h2 className="text-xl font-semibold">Opening YouTube...</h2>
      </div>
    </div>
  )
}
