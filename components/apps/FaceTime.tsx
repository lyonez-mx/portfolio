"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Trash2 } from "lucide-react"

interface FaceTimeProps {
  isDarkMode?: boolean
}

export default function FaceTime({ isDarkMode = true }: FaceTimeProps) {
  const [hasCamera, setHasCamera] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream
        streamRef.current = stream
        setHasCamera(true)
      })
      .catch(() => setHasCamera(false))

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  function capture() {
    if (!videoRef.current || !canvasRef.current) return
    const v = videoRef.current
    const c = canvasRef.current
    c.width = v.videoWidth
    c.height = v.videoHeight
    c.getContext("2d")!.drawImage(v, 0, 0)
    setPhotos((p) => [c.toDataURL("image/png"), ...p])
  }

  const text = isDarkMode ? "text-white" : "text-gray-800"
  const bg = isDarkMode ? "bg-gray-900" : "bg-white"

  return (
    <div className={`flex h-full flex-col ${bg} ${text}`}>
      <div className="relative flex flex-1 items-center justify-center p-4">
        {hasCamera ? (
          <video ref={videoRef} autoPlay playsInline className="max-h-full w-full rounded-xl bg-black" />
        ) : (
          <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-xl bg-black">
            <p className="px-4 text-center text-white/60">Camera not available</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
        {hasCamera && (
          <button
            onClick={capture}
            className="absolute bottom-8 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-white hover:bg-white/30"
          >
            <Camera className="size-6" />
          </button>
        )}
      </div>

      {photos.length > 0 && (
        <div className={`flex gap-3 overflow-x-auto border-t p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
          {photos.map((p, i) => (
            <div key={i} className="group relative shrink-0">
              <img src={p} alt="" className="h-20 rounded" />
              <button
                onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
