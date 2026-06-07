"use client"

export default function BootScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <svg viewBox="0 0 24 24" fill="none" className="mb-8 size-12" stroke="white" strokeWidth={1.5}>
        <path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 17 L6 21 L7 14 L2 9 L9 8 Z" />
      </svg>
      <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full origin-left animate-pulse rounded-full bg-white" />
      </div>
    </div>
  )
}
