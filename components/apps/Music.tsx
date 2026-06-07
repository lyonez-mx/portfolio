"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

interface MusicProps {
  isDarkMode?: boolean
}

interface Track {
  title: string
  artist: string
  file: string
  gradient: string
}

const playlist: Track[] = [
  { title: "Good Night",  artist: "Fassounds",   file: "/music/fassounds-good-night-lofi-cozy-chill-music.mp3",   gradient: "from-blue-900 via-blue-700 to-cyan-600" },
  { title: "Lofi Study",  artist: "Fassounds",   file: "/music/fassounds-lofi-study-calm-peaceful-chill-hop.mp3",   gradient: "from-emerald-900 via-green-700 to-teal-500" },
  { title: "Lofi Music",  artist: "Prettyjohn1", file: "/music/prettyjohn1-lofi-lofi-music.mp3",                     gradient: "from-orange-900 via-amber-700 to-yellow-500" },
  { title: "LoFi Hip Hop",artist: "Solarflex",    file: "/music/solarflex-lofi-hiphop.mp3",                          gradient: "from-purple-900 via-violet-700 to-fuchsia-500" },
  { title: "LoFi Hip Hop",artist: "The Mountain", file: "/music/the_mountain-lofi-hiphop.mp3",                       gradient: "from-rose-900 via-red-700 to-pink-500" },
]

function formatTime(s: number): string {
  if (!isFinite(s)) return "0:00"
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function Music({ isDarkMode = true }: MusicProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [muted, setMuted] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const mountedRef = useRef(true)
  const userEnabledRef = useRef(false)

  const track = playlist[currentIndex]

  // Init visualizer (AudioContext) — doesn't block playback
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || audio.dataset.ctx === "1") return

    try {
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 128
      const src = ctx.createMediaElementSource(audio)
      src.connect(analyser)
      analyser.connect(ctx.destination)
      analyserRef.current = analyser
      ctxRef.current = ctx
      audio.dataset.ctx = "1"
    } catch {
      // AudioContext not available or already connected — visualizer disabled
    }

    return () => {
      const a = analyserRef.current
      const c = ctxRef.current
      analyserRef.current = null
      ctxRef.current = null
      // Only close if it's not the shared global context
      if (c && !("__audioCtx" in window && (window as any).__audioCtx === c)) {
        c.close()
      }
    }
  }, [])

  // Play/pause + track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function onTime() { if (mountedRef.current) setCurrentTime(audio!.currentTime) }
    function onMeta() { if (mountedRef.current) setDuration(audio!.duration) }
    function onEnd() {
      const i = (currentIndex + 1) % playlist.length
      setCurrentIndex(i)
      setCurrentTime(0)
      setDuration(0)
      audio!.src = playlist[i].file
      audio!.load()
      if (playing) audio!.play().catch(() => setNeedsInteraction(true))
    }
    function onCanPlay() {
      if (playing) {
        audio!.play().catch(() => {
          if (!userEnabledRef.current) setNeedsInteraction(true)
        })
      }
    }

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("ended", onEnd)
    audio.addEventListener("canplay", onCanPlay)

    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("ended", onEnd)
      audio.removeEventListener("canplay", onCanPlay)
    }
  }, [currentIndex, playing])

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false } }, [])

  // Try to play immediately on mount (close to unlock gesture)
  useEffect(() => {
    if (playing) {
      const audio = audioRef.current
      if (audio && audio.readyState >= 2) {
        tryPlay()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  // Visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function drawFallback() {
      const w = canvas!.width
      const h = canvas!.height
      ctx!.clearRect(0, 0, w, h)
      // Animated bars even without analyser
      const now = Date.now() / 300
      const barW = w / 32
      for (let i = 0; i < 32; i++) {
        const pct = (Math.sin(now + i * 0.5) * 0.5 + 0.5) * 0.6 + 0.2
        const barH = pct * h * 0.9
        const hue = 200 + i * 3
        ctx!.fillStyle = `hsla(${hue}, 80%, 65%, 0.6)`
        ctx!.fillRect(i * barW, h - barH, barW - 1, barH)
      }
      animRef.current = requestAnimationFrame(drawFallback)
    }

    function drawLive() {
      const w = canvas!.width
      const h = canvas!.height
      analyserRef.current!.getByteFrequencyData(freqData)
      ctx!.clearRect(0, 0, w, h)
      const barW = (w / freqData.length) * 2.2
      let x = 0
      for (let i = 0; i < freqData.length; i++) {
        const pct = freqData[i] / 255
        const barH = pct * h * 0.9
        const hue = 200 + i * 3
        ctx!.fillStyle = `hsla(${hue}, 80%, ${60 + pct * 30}%, ${0.6 + pct * 0.4})`
        ctx!.fillRect(x, h - barH, barW - 1, barH)
        x += barW
      }
      animRef.current = requestAnimationFrame(drawLive)
    }

    const freqData = new Uint8Array(analyserRef.current?.frequencyBinCount ?? 32)
    const hasAnalyser = !!analyserRef.current

    if (playing) {
      if (ctxRef.current?.state === "suspended") ctxRef.current.resume()
      hasAnalyser ? drawLive() : drawFallback()
    } else {
      cancelAnimationFrame(animRef.current)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return () => cancelAnimationFrame(animRef.current)
  }, [playing, currentIndex])

  function tryPlay() {
    const audio = audioRef.current
    if (!audio) return
    if (ctxRef.current?.state === "suspended") ctxRef.current.resume()
    audio.play().catch(() => {
      if (!userEnabledRef.current) setNeedsInteraction(true)
    })
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      setPlaying(true)
      tryPlay()
    }
  }

  function selectTrack(i: number) {
    if (i === currentIndex) { togglePlay(); return }
    const audio = audioRef.current
    if (!audio) return
    setCurrentIndex(i)
    setCurrentTime(0)
    setDuration(0)
    setPlaying(true)
    audio.src = playlist[i].file
    audio.load()
    tryPlay()
  }

  function nextTrack() {
    const i = (currentIndex + 1) % playlist.length
    const audio = audioRef.current
    if (!audio) return
    setCurrentIndex(i)
    setCurrentTime(0)
    setDuration(0)
    setPlaying(true)
    audio.src = playlist[i].file
    audio.load()
    tryPlay()
  }

  function prevTrack() {
    const i = (currentIndex - 1 + playlist.length) % playlist.length
    const audio = audioRef.current
    if (!audio) return
    setCurrentIndex(i)
    setCurrentTime(0)
    setDuration(0)
    setPlaying(true)
    audio.src = playlist[i].file
    audio.load()
    tryPlay()
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    if (audioRef.current) audioRef.current.currentTime = pct * duration
  }

  function handleInteraction() {
    userEnabledRef.current = true
    setNeedsInteraction(false)
    if (ctxRef.current?.state === "suspended") ctxRef.current.resume()
    tryPlay()
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const mute = isDarkMode ? "text-gray-400" : "text-gray-500"

  return (
    <div className={`flex h-full flex-col ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <audio ref={audioRef} src={track.file} preload="auto" />

      {/* Header */}
      <div
        className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${track.gradient}`}
        onClick={handleInteraction}
      >
        <canvas ref={canvasRef} width={600} height={192} className="absolute inset-0 size-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {needsInteraction && (
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
            <div className="rounded-2xl bg-white/15 px-6 py-3 text-center backdrop-blur-md">
              <p className="text-lg text-white/90">🔇 Click to enable audio</p>
              <p className="mt-1 text-xs text-white/50">Your browser requires a click to play audio</p>
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-5">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">{track.title}</h2>
          <p className="text-sm text-white/70 drop-shadow">{track.artist}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay() }}
          className="absolute right-5 bottom-4 flex size-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-all hover:bg-white/30 active:scale-90"
        >
          {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
        <div className="flex w-full max-w-sm items-center gap-3 text-xs">
          <span className={`w-10 text-right tabular-nums ${mute}`}>{formatTime(currentTime)}</span>
          <div
            className={`relative h-1.5 flex-1 cursor-pointer rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full bg-blue-500 transition-[width] duration-150"
              style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
          </div>
          <span className={`w-10 tabular-nums ${mute}`}>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={prevTrack} className={`rounded-full p-2 transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} ${text}`}>
            <SkipBack className="size-5" />
          </button>
          <button
            onClick={togglePlay}
            className="flex size-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600 active:scale-90"
          >
            {playing ? <Pause className="size-6" /> : <Play className="ml-1 size-6" />}
          </button>
          <button onClick={nextTrack} className={`rounded-full p-2 transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} ${text}`}>
            <SkipForward className="size-5" />
          </button>
        </div>

        <div className="flex w-full max-w-[180px] items-center gap-2">
          <button
            onClick={() => setMuted(!muted)}
            className={`shrink-0 rounded p-1 ${mute} ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <input
            type="range" min={0} max={1} step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => { const v = Number(e.target.value); setVolume(v); setMuted(v === 0) }}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-1">
          {playlist.map((t, i) => (
            <button
              key={i}
              onClick={() => selectTrack(i)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                i === currentIndex
                  ? isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
                  : `${isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`
              }`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded bg-white/10 text-[10px]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className={`truncate text-xs font-medium ${i === currentIndex ? text : ""}`}>{t.title}</div>
                <div className="truncate text-[10px] opacity-50">{t.artist}</div>
              </div>
              {i === currentIndex && (
                <span className="flex items-center gap-0.5">
                  {playing ? (
                    <>
                      <span className="size-0.5 animate-pulse rounded-full bg-blue-400" />
                      <span className="size-0.5 animate-pulse rounded-full bg-blue-400 [animation-delay:200ms]" />
                      <span className="size-0.5 animate-pulse rounded-full bg-blue-400 [animation-delay:400ms]" />
                    </>
                  ) : (
                    <Pause className="size-3 text-blue-400" />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
