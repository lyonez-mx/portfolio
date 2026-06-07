"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { wallpapers } from "@/constants/wallpapers"

const intervalMs = 120_000

function pickRandom(current: number): number {
  if (wallpapers.length <= 1) return current
  let next: number
  do {
    next = Math.floor(Math.random() * wallpapers.length)
  } while (next === current)
  return next
}

export default function DesktopBackground() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (wallpapers.length <= 1) return
    const id = setInterval(() => setIndex(pickRandom), intervalMs)
    return () => clearInterval(id)
  }, [])

  if (wallpapers.length === 0) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={wallpapers[index]}
          src={wallpapers[index]}
          alt="Desktop wallpaper"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
