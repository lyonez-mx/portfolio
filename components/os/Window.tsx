"use client"

import { useState, useRef, useCallback } from "react"
import { useOSStore, type AppId } from "@/hooks/useOSStore"

interface WindowProps {
  appId: AppId
  title: string
  children: React.ReactNode
  defaultSize?: { width: number; height: number }
  defaultPosition?: { x: number; y: number }
}

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

const minSize = { width: 300, height: 200 }

function calcPos(
  defaultSize: { width: number; height: number },
  preferred?: { x: number; y: number },
) {
  if (preferred) return preferred
  const maxX = typeof window !== "undefined" ? window.innerWidth - defaultSize.width : 800
  const maxY = typeof window !== "undefined" ? window.innerHeight - defaultSize.height : 400
  return {
    x: Math.max(50, Math.min(Math.floor(Math.random() * maxX), maxX)),
    y: Math.max(50, Math.min(Math.floor(Math.random() * maxY), maxY)),
  }
}

export default function Window({
  appId, title, children,
  defaultSize = { width: 600, height: 400 },
  defaultPosition,
}: WindowProps) {
  const { apps, focusApp, closeApp, toggleMinimize } = useOSStore()
  const app = apps.find((a) => a.id === appId)
  if (!app || !app.isOpen) return null

  return (
    <WindowInner
      appId={appId}
      title={title}
      defaultSize={defaultSize}
      defaultPosition={defaultPosition}
    >
      {children}
    </WindowInner>
  )
}

function WindowInner({
  appId, title, defaultSize, defaultPosition, children,
}: WindowProps & { defaultSize: { width: number; height: number } }) {
  const { apps, focusApp, closeApp, toggleMinimize, highestZ } = useOSStore()
  const app = apps.find((a) => a.id === appId)!
  const [pos, setPos] = useState(() => calcPos(defaultSize, defaultPosition))
  const [size, setSize] = useState(defaultSize)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevState, setPrevState] = useState<{ pos: { x: number; y: number }; size: { width: number; height: number } } | null>(null)
  const dragRef = useRef<{ startX: number; startY: number; startPos: { x: number; y: number } } | null>(null)
  const resizeRef = useRef<{ startX: number; startY: number; startSize: { width: number; height: number }; startPos: { x: number; y: number }; dir: ResizeDir } | null>(null)
  const winRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      focusApp(appId)
      if (isMaximized) return
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPos: { ...pos },
      }

      const onMouseMove = (e: MouseEvent) => {
        if (!dragRef.current) return
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY
        setPos({ x: dragRef.current.startPos.x + dx, y: dragRef.current.startPos.y + dy })
      }

      const onMouseUp = () => {
        dragRef.current = null
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [appId, focusApp, isMaximized, pos],
  )

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, dir: ResizeDir) => {
      e.stopPropagation()
      focusApp(appId)
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startSize: { ...size },
        startPos: { ...pos },
        dir,
      }

      const onMouseMove = (e: MouseEvent) => {
        if (!resizeRef.current) return
        const { startX, startY, startSize, startPos, dir } = resizeRef.current
        let dx = e.clientX - startX
        let dy = e.clientY - startY
        let newX = startPos.x
        let newY = startPos.y
        let newW = startSize.width
        let newH = startSize.height

        if (dir.includes("e")) newW = Math.max(minSize.width, startSize.width + dx)
        if (dir.includes("w")) {
          newW = Math.max(minSize.width, startSize.width - dx)
          newX = startPos.x + startSize.width - newW
        }
        if (dir.includes("s")) newH = Math.max(minSize.height, startSize.height + dy)
        if (dir.includes("n")) {
          newH = Math.max(minSize.height, startSize.height - dy)
          newY = startPos.y + startSize.height - newH
        }

        setPos({ x: newX, y: newY })
        setSize({ width: newW, height: newH })
      }

      const onMouseUp = () => {
        resizeRef.current = null
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [appId, focusApp, size, pos],
  )

  function handleMaximize() {
    if (isMaximized && prevState) {
      setPos(prevState.pos)
      setSize(prevState.size)
      setIsMaximized(false)
      setPrevState(null)
    } else {
      setPrevState({ pos: { ...pos }, size: { ...size } })
      setPos({ x: 0, y: 0 })
      setSize({ width: window.innerWidth, height: window.innerHeight })
      setIsMaximized(true)
    }
  }

  if (app.isMinimized) return null

  const isActive = app.zIndex === highestZ

  return (
    <div
      ref={winRef}
      className={`absolute overflow-hidden rounded-lg border shadow-2xl ${
        isActive ? "border-white/15" : "border-white/5"
      }`}
      style={{
        left: isMaximized ? 0 : pos.x,
        top: isMaximized ? 0 : pos.y,
        width: isMaximized ? "100vw" : size.width,
        height: isMaximized ? "100vh" : size.height,
        zIndex: app.zIndex,
      }}
      onMouseDown={() => focusApp(appId)}
    >
      <div
        className="flex h-9 cursor-default items-center justify-between bg-[#2b2b2b] px-3"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
      >
        <div className="flex items-center gap-2">
          <button onClick={() => closeApp(appId)} className="size-3 rounded-full bg-[#ff5f57] hover:brightness-110" />
          <button onClick={() => toggleMinimize(appId)} className="size-3 rounded-full bg-[#febc2e] hover:brightness-110" />
          <button onClick={handleMaximize} className="size-3 rounded-full bg-[#28c840] hover:brightness-110" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-white/60">{title}</span>
        <div className="w-16" />
      </div>

      <div className="h-[calc(100%-36px)] bg-neutral-900">{children}</div>

      <div className="absolute inset-0 pointer-events-none">
        <div onMouseDown={(e) => handleResizeStart(e, "n")} className="absolute top-0 left-2 right-2 h-1 cursor-n-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "s")} className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "w")} className="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "e")} className="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "nw")} className="absolute top-0 left-0 size-3 cursor-nw-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "ne")} className="absolute top-0 right-0 size-3 cursor-ne-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "sw")} className="absolute bottom-0 left-0 size-3 cursor-sw-resize pointer-events-auto" />
        <div onMouseDown={(e) => handleResizeStart(e, "se")} className="absolute bottom-0 right-0 size-3 cursor-se-resize pointer-events-auto" />
      </div>
    </div>
  )
}
