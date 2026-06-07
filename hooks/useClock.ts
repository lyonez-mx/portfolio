"use client"

import { useState, useEffect } from "react"
import { useOSStore } from "@/hooks/useOSStore"

export function useClock() {
  const locale = useOSStore((s) => s.locale)
  const [time, setTime] = useState("")

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      )
    }

    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [locale])

  return time
}
