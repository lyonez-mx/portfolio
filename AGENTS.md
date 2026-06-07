# AGENTS.md — LyonOS Portfolio

Stack: **Next.js 16 (App Router) · TypeScript 6 · Tailwind CSS 4 · Zustand 5 · Framer Motion 12 · Lucide React · next-themes**

## Setup commands

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

## Architecture

```
app/page.tsx                  # System state machine (boot→login→desktop→sleep→shutdown)
app/layout.tsx                # Global config, I18nProvider
app/globals.css               # @import "tailwindcss" (v4 style)
components/os/Desktop.tsx     # Desktop canvas — renders windows + dock + launchpad
components/os/DesktopBackground.tsx  # Wallpaper rotator with fade
components/os/Window.tsx      # Custom drag + resize + traffic lights + z-ordering
components/os/TopBar.tsx      # Top menu bar (Apple menu, clock, spotlight, control center)
components/os/Dock.tsx        # Bottom dock with Framer Motion magnification
components/os/BootScreen.tsx  # Apple boot animation
components/os/LoginScreen.tsx # Password gate
components/os/SleepScreen.tsx # Sleep overlay — click/key to wake
components/os/ShutdownScreen.tsx # Shutdown state
components/os/ControlCenter.tsx  # WiFi, dark mode, brightness, volume, language
components/os/Launchpad.tsx   # App grid overlay (iOS-style)
components/apps/              # App components (see Registry section)
hooks/useOSStore.ts           # Zustand store: app windows, system state, dark mode, locale
hooks/useClock.ts             # Locale-aware clock (updates every 60s)
lib/registry.ts               # AppRegistry: id → { title, defaultSize, component }
contexts/i18n.tsx             # I18nProvider + useTranslation hook
locales/                      # i18n translations (en.ts, es.ts) — 16 keys each
constants/wallpapers.ts       # Wallpaper list for rotation
postcss.config.mjs            # plugin: @tailwindcss/postcss
```

## App Registry — `lib/registry.ts`

| AppId      | Component   | Title      | Default Size | Type              |
|------------|-------------|------------|-------------|-------------------|
| finder     | Finder      | Finder     | 640×480     | Placeholder       |
| terminal   | Terminal    | Terminal   | 720×480     | Interactive shell |
| spotlight  | Spotlight   | Spotlight  | 560×400     | Search app        |
| notes      | Notes       | Notes      | 720×520     | Text editor       |
| safari     | Safari      | Safari     | 800×560     | Browser with bookmarks |
| music      | Music       | Music      | 500×560     | Music player      |
| snake      | Snake       | Snake      | 480×580     | Snake game        |
| weather    | Weather     | Weather    | 600×520     | Weather (mock)    |
| facetime   | FaceTime    | FaceTime   | 700×520     | Camera + photos   |
| github     | GitHub      | GitHub     | 480×320     | Redirect to profile |
| mail       | Mail        | Mail       | 480×320     | mailto: link      |
| youtube    | YouTube     | YouTube    | 480×320     | Redirect to channel |
| settings   | Settings    | Settings   | 680×500     | Dark/brightness/lang |

**To add a new app**: Create component in `components/apps/`, add entry to `appRegistry` in `lib/registry.ts`, add Dock item in `components/os/Dock.tsx`, and add locale keys in `locales/`.

## Key conventions

- **Zustand store** (`useOSStore.ts`): Holds app windows (open/close/minimize/z-index), system state, dark mode, brightness, locale. Named imports only.
- **Dark mode**: Controlled via Zustand `isDarkMode`. Synced to `<html class="dark">` in `page.tsx`. Components read `isDarkMode` prop.
- **System states**: `boot → login → desktop → sleep → shutdown`. Managed in Zustand `systemState`. Boot auto-transitions after 3s. Sleep wakes on click/key.
- **Window pattern**: Every app renders inside `components/os/Window.tsx`; registry controls visibility. Apps receive `{ isDarkMode }` prop.
- **Drag & resize**: Custom `mousedown/mousemove/mouseup` on document. 8 resize handles (n/s/e/w/ne/nw/se/sw). Min size 300×200.
- **Icons**: Prefer `lucide-react`. Use inline SVGs for GitHub/YouTube (not in lucide).
- **Apple menu**: TopBar renders dropdown with Sleep/Restart/Shut Down/Log Out.
- **Launchpad**: Overlay grid of all registered apps. Toggled from Dock.

## Dependencies

All installed:
```
next, react, react-dom, zustand, framer-motion, lucide-react, next-themes
@tailwindcss/postcss, tailwindcss, postcss, typescript, @types/node, @types/react
```

Not installed (optional — for API features):
```
@upstash/ratelimit, @upstash/redis, @google/generative-ai
eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin
```

## Environment variables (`.env.local`)

```
GEMINI_API_KEY=<key>
UPSTASH_REDIS_REST_URL=<url>
UPSTASH_REDIS_REST_TOKEN=<token>
```

`NEXT_PUBLIC_` prefix not needed — consumed only server-side in `app/api/spotlight/route.ts`.

## Deployment

Static + hybrid build for Vercel Edge. Set same env vars in Vercel dashboard. No database or 24/7 server.

## Known vulnerability

`next` bundles `postcss@8.4.31` internally (moderate XSS in CSS stringify). Not exploitable in this portfolio project. Upstream fix expected in Next.js canary.

## Maintenance

Update this file whenever a dependency, convention, or workflow changes.
