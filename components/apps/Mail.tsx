"use client"

import { useEffect } from "react"
import { Mail } from "lucide-react"

interface MailProps {
  isDarkMode?: boolean
}

export default function MailApp({ isDarkMode = true }: MailProps) {
  useEffect(() => {
    window.location.href = "mailto:hello@lyonos.dev"
  }, [])

  return (
    <div className={`flex h-full items-center justify-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="text-center">
        <Mail className="mx-auto mb-4 size-16" />
        <h2 className="text-xl font-semibold">Opening Mail...</h2>
      </div>
    </div>
  )
}
