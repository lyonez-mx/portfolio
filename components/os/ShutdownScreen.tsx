"use client"

export default function ShutdownScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mb-6 size-16 text-white/20"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 2v10" />
          <path d="M12 12 15 9" />
          <path d="M12 12 9 9" />
        </svg>
        <p className="mb-1 text-lg text-white/30">Shut Down</p>
        <p className="text-sm text-white/20">Press the power button to start up</p>
      </div>
    </div>
  )
}
