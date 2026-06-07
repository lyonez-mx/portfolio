"use client"

import { useEffect } from "react"
import { useOSStore } from "@/hooks/useOSStore"
import Desktop from "@/components/os/Desktop"
import SleepScreen from "@/components/os/SleepScreen"
import ShutdownScreen from "@/components/os/ShutdownScreen"

export default function Home() {
  const systemState = useOSStore((s) => s.systemState)
  const setSystemState = useOSStore((s) => s.setSystemState)
  const isDarkMode = useOSStore((s) => s.isDarkMode)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    if (systemState === "sleep") {
      const handleWake = () => setSystemState("login")
      window.addEventListener("click", handleWake, { once: true })
      window.addEventListener("keydown", handleWake, { once: true })
      return () => {
        window.removeEventListener("click", handleWake)
        window.removeEventListener("keydown", handleWake)
      }
    }
  }, [systemState, setSystemState])

  return (
    <>
      {systemState === "desktop" && <Desktop />}
      {systemState === "sleep" && <SleepScreen />}
      {systemState === "shutdown" && <ShutdownScreen />}
    </>
  )
}
