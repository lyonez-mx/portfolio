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
app/api/weather/route.ts      # Weather API proxy (CONAGUA SMN)
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
lib/virtual-fs.ts             # Virtual filesystem for Terminal
contexts/i18n.tsx             # I18nProvider + useTranslation hook
locales/                      # i18n translations (en.ts, es.ts) — 42 keys each
constants/wallpapers.ts       # Wallpaper list for rotation
constants/desktop-files.ts    # Desktop file definitions
constants/projects.ts         # GitHub project data
postcss.config.mjs            # plugin: @tailwindcss/postcss
```

## App Registry — `lib/registry.ts`

| AppId       | Component    | Title        | Default Size | Type              |
|-------------|--------------|--------------|-------------|-------------------|
| finder      | Finder       | Finder       | 1100×700    | File explorer     |
| terminal    | Terminal     | Terminal     | 720×480     | Interactive shell |
| spotlight   | Spotlight    | Spotlight    | 560×400     | Search app        |
| notes       | Notes        | Notes        | 720×520     | Rich text editor  |
| safari      | Safari       | Safari       | 800×560     | Browser with bookmarks |
| music       | Music        | Music        | 560×620     | Music player + visualizer |
| snake       | Snake        | Snake        | 480×580     | Snake game        |
| weather     | Weather      | Weather      | 900×690     | Real weather (CONAGUA) |
| facetime    | FaceTime     | FaceTime     | 700×520     | Contact card      |
| github      | GitHub       | GitHub       | 820×600     | Project grid      |
| mail        | Mail         | Mail         | 480×320     | mailto: link      |
| youtube     | YouTube      | YouTube      | 480×320     | Redirect to channel |
| settings    | Settings     | Settings     | 680×500     | Dark/brightness/lang |
| textedit    | TextEdit     | TextEdit     | 640×480     | Text viewer       |
| imageviewer | ImageViewer  | Image Viewer | 640×480     | Image viewer      |
| pdfviewer   | PDFViewer    | PDF Viewer   | 720×560     | PDF viewer        |

**To add a new app**: Create component in `components/apps/`, add `AppId` to `hooks/useOSStore.ts`, add entry to `appRegistry` in `lib/registry.ts`, add Dock item in `components/os/Dock.tsx`, add Launchpad icon in `components/os/Launchpad.tsx`, and add locale keys in `locales/`.

## Key conventions

- **Zustand store** (`useOSStore.ts`): Holds app windows (open/close/minimize/z-index), system state, dark mode, brightness, locale, currentFile. Named imports only.
- **Dark mode**: Controlled via Zustand `isDarkMode`. Synced to `<html class="dark">` in `page.tsx`. Components read `isDarkMode` prop.
- **System states**: `boot → login → desktop → sleep → shutdown`. Currently starts at `desktop` directly. Sleep wakes on click/key.
- **Window pattern**: Every app renders inside `components/os/Window.tsx`; registry controls visibility. Apps receive `{ isDarkMode }` prop.
- **Drag & resize**: Custom `mousedown/mousemove/mouseup` on document. 8 resize handles (n/s/e/w/ne/nw/se/sw). Min size 300×200.
- **Icons**: Prefer PNGs in `public/icons/`. Use `lucide-react` as fallback. Inline SVGs for GitHub/YouTube (not in lucide).
- **Apple menu**: TopBar renders dropdown with Sleep/Restart/Shut Down/Log Out.
- **Launchpad**: Overlay grid of all registered apps. Toggled from Dock. z-[60] to stay above windows.
- **i18n**: Use `useTranslation()` hook with `t("key")`. Keys defined in `locales/en.ts` and `locales/es.ts`.
- **File routing**: Desktop files defined in `constants/desktop-files.ts` with EN/ES content. Virtual FS in `lib/virtual-fs.ts`.
- **Weather API**: Proxy route in `app/api/weather/route.ts`. Fetches CONAGUA SMN data. No API key needed.

## Dependencies

Installed:
```
next, react, react-dom, zustand, framer-motion, lucide-react, next-themes
@tailwindcss/postcss, tailwindcss, postcss, typescript, @types/node, @types/react
```

Not installed (optional):
```
eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin
```

## Deployment

Static + hybrid build for Vercel Edge. No database, no 24/7 server, no env vars needed.

## Known vulnerability

`next` bundles `postcss@8.4.31` internally (moderate XSS in CSS stringify). Not exploitable. Upstream fix expected in Next.js canary.

## Maintenance

Update this file whenever a dependency, convention, or workflow changes.
