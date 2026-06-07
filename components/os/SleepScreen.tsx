"use client"

export default function SleepScreen() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      onClick={() => {
        document.body.requestPointerLock()
      }}
    >
      <div className="text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mb-4 size-12 text-white/30"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <p className="text-lg text-white/20">Click to wake</p>
      </div>
    </div>
  )
}
