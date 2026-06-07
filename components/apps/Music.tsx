"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

interface MusicProps {
  isDarkMode?: boolean
}

const playlist = [
  { title: "Chill Lofi Beat", artist: "LoFi Artist", duration: "3:45" },
  { title: "Jazz Vibes", artist: "Jazz Artist", duration: "4:12" },
  { title: "Ambient Piano", artist: "Ambient Artist", duration: "5:00" },
]

export default function Music({ isDarkMode = true }: MusicProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const track = playlist[currentIndex]

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          handleNext()
          return 0
        }
        return p + 1
      })
    }, 500)
    return () => clearInterval(id)
  }, [isPlaying, currentIndex])

  function handleNext() {
    setCurrentIndex((i) => (i + 1) % playlist.length)
    setProgress(0)
  }

  function handlePrev() {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length)
    setProgress(0)
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-500"

  return (
    <div className={`flex h-full flex-col items-center justify-center gap-6 p-8 ${isDarkMode ? "bg-gray-900" : "bg-white"} ${text}`}>
      <div className={`flex size-48 items-center justify-center rounded-2xl ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="text-center">
          <div className="text-6xl">🎵</div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold">{track.title}</h3>
        <p className={muted}>{track.artist}</p>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className={muted}>0:00</span>
        <div className={`h-1 w-48 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={muted}>{track.duration}</span>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={handlePrev} className={`rounded-full p-2 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
          <SkipBack className="size-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex size-12 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <button onClick={handleNext} className={`rounded-full p-2 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
          <SkipForward className="size-5" />
        </button>
      </div>

      <div className={`flex w-full max-w-xs items-center gap-2 ${muted}`}>
        <Volume2 className="size-4" />
        <div className={`h-1 flex-1 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
          <div className="h-full w-3/4 rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  )
}
