"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface SnakeProps {
  isDarkMode?: boolean
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Pos = { x: number; y: number }

const GRID = 20
const CELL = 20
const SPEED = 120
const INIT: Pos[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
]

export default function Snake({ isDarkMode = true }: SnakeProps) {
  const [snake, setSnake] = useState<Pos[]>(INIT)
  const [food, setFood] = useState<Pos>({ x: 5, y: 5 })
  const [dir, setDir] = useState<Direction>("UP")
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(true)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dirRef = useRef(dir)
  dirRef.current = dir

  const generateFood = useCallback((): Pos => {
    const pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    if (snake.some((s) => s.x === pos.x && s.y === pos.y)) return generateFood()
    return pos
  }, [snake])

  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore")
    if (saved) setHighScore(Number(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("snakeHighScore", String(highScore))
  }, [highScore])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = isDarkMode ? "#1a1a1a" : "#f0f0f0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = isDarkMode ? "#222" : "#e8e8e8"
          ctx.fillRect(i * CELL, j * CELL, CELL, CELL)
        }
      }
    }

    ctx.fillStyle = isDarkMode ? "#4ade80" : "#22c55e"
    snake.forEach((s) => ctx.fillRect(s.x * CELL, s.y * CELL, CELL, CELL))

    ctx.fillStyle = isDarkMode ? "#f87171" : "#ef4444"
    ctx.beginPath()
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = isDarkMode ? "#fff" : "#000"
    ctx.font = "14px monospace"
    ctx.textAlign = "left"
    ctx.fillText(`Score: ${score}`, 8, canvas.height - 8)
    ctx.textAlign = "right"
    ctx.fillText(`Best: ${highScore}`, canvas.width - 8, canvas.height - 8)

    if (gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.7)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#fff"
      ctx.font = "bold 24px monospace"
      ctx.textAlign = "center"
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10)
      ctx.font = "14px monospace"
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20)
    }
  }, [snake, food, gameOver, score, highScore, isDarkMode])

  useEffect(() => {
    if (paused || gameOver) return
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] }
        switch (dirRef.current) {
          case "UP": head.y -= 1; break
          case "DOWN": head.y += 1; break
          case "LEFT": head.x -= 1; break
          case "RIGHT": head.x += 1; break
        }
        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
          setGameOver(true)
          return prev
        }
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true)
          return prev
        }
        const ate = head.x === food.x && head.y === food.y
        const next = [head, ...prev]
        if (!ate) next.pop()
        if (ate) {
          setScore((s) => {
            const ns = s + 10
            setHighScore((h) => Math.max(h, ns))
            return ns
          })
          setFood(generateFood())
        }
        return next
      })
    }, SPEED)
    return () => clearInterval(id)
  }, [paused, gameOver, food, generateFood])

  useEffect(() => { draw() }, [draw])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (gameOver) return
      switch (e.key) {
        case "ArrowUp": if (dir !== "DOWN") setDir("UP"); break
        case "ArrowDown": if (dir !== "UP") setDir("DOWN"); break
        case "ArrowLeft": if (dir !== "RIGHT") setDir("LEFT"); break
        case "ArrowRight": if (dir !== "LEFT") setDir("RIGHT"); break
        case " ": setPaused((p) => !p); break
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [dir, gameOver])

  function reset() {
    setSnake(INIT)
    setFood({ x: 5, y: 5 })
    setDir("UP")
    setGameOver(false)
    setScore(0)
    setPaused(true)
  }

  return (
    <div className={`flex h-full flex-col items-center justify-center gap-4 p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setPaused(!paused)}
          disabled={gameOver}
          className="rounded border border-white/20 px-3 py-1 text-sm hover:bg-white/10 disabled:opacity-40"
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          onClick={reset}
          className="rounded border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
        >
          Restart
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={GRID * CELL}
        height={GRID * CELL}
        className="rounded-lg border border-white/10"
      />
      <p className="text-xs text-white/40">Arrow keys to move · Space to pause</p>
    </div>
  )
}
