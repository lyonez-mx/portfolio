"use client"

import { useState, useRef, useCallback } from "react"
import { useOSStore } from "@/hooks/useOSStore"
import { FileText, Image } from "lucide-react"
import type { DesktopFile } from "@/constants/desktop-files"

export default function DesktopIcon({ file: initial }: { file: DesktopFile }) {
  const openFile = useOSStore((s) => s.openFile)
  const [pos, setPos] = useState(initial.position)
  const dragRef = useRef<{
    startX: number
    startY: number
    startPos: { x: number; y: number }
  } | null>(null)
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPos: { ...pos },
      }

      const onMove = (e: MouseEvent) => {
        if (!dragRef.current) return
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY
        setPos({
          x: dragRef.current.startPos.x + dx,
          y: dragRef.current.startPos.y + dy,
        })
      }

      const onUp = () => {
        dragRef.current = null
        document.removeEventListener("mousemove", onMove)
        document.removeEventListener("mouseup", onUp)
      }

      document.addEventListener("mousemove", onMove)
      document.addEventListener("mouseup", onUp)
    },
    [pos],
  )

  function handleDoubleClick() {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }
    openFile(initial)
  }

  function handleClick() {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
      openFile(initial)
      return
    }
    clickTimeout.current = setTimeout(() => {
      clickTimeout.current = null
    }, 250)
  }

  return (
    <button
      className="absolute flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-white/80 transition-colors hover:bg-white/5 active:bg-white/10"
      style={{ left: pos.x, top: pos.y, width: 74 }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      draggable={false}
    >
      <div className="flex size-12 items-center justify-center">
        {initial.type === "txt" ? (
          <FileText className="size-10 text-blue-300" strokeWidth={1.5} />
        ) : (
          <Image className="size-10 text-green-300" strokeWidth={1.5} />
        )}
      </div>
      <span className="max-w-full truncate text-center text-[11px] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {initial.name}
      </span>
    </button>
  )
}
