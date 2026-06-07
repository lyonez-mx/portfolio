"use client"

import { useEffect, useCallback } from "react"
import { useOSStore } from "@/hooks/useOSStore"
import Desktop from "@/components/os/Desktop"
import BootScreen from "@/components/os/BootScreen"
import LoginScreen from "@/components/os/LoginScreen"
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
    if (systemState === "boot") {
      const t = setTimeout(() => setSystemState("login"), 3000)
      return () => clearTimeout(t)
    }
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

  const handleLogin = useCallback(() => setSystemState("desktop"), [setSystemState])

  return (
    <>
      {systemState === "boot" && <BootScreen />}
      {systemState === "login" && <LoginScreen onLogin={handleLogin} />}
      {systemState === "desktop" && <Desktop />}
      {systemState === "sleep" && <SleepScreen />}
      {systemState === "shutdown" && <ShutdownScreen />}
    </>
  )
}
