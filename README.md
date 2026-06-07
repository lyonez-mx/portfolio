# LyonOS Portfolio

A macOS-inspired web-based operating system portfolio built with **Next.js 16**, **TypeScript 6**, **Tailwind CSS 4**, **Zustand 5**, and **Framer Motion 12**.

> Live demo: [lyonos.dev](https://lyonos.dev)

---

## Features

- **macOS Desktop simulation** — Boot, unlock, desktop, sleep, shutdown states
- **Custom window management** — Drag, 8-direction resize, maximize, minimize, z-index stacking
- **Interactive terminal** — Virtual filesystem with `cd`, `ls`, `cat`, `pwd`, project-aware navigation
- **15+ built-in apps** — Finder, Terminal, Notes, Safari, Music, Snake, Weather, FaceTime, Settings, GitHub, Mail, YouTube, TextEdit, ImageViewer, PDFViewer
- **Dark / Light mode** — Persisted to localStorage
- **i18n** — Full English / Spanish localization
- **Dock magnification** — Framer Motion mouse-proximity scaling
- **Launchpad** — iOS-style app grid overlay
- **Apple menu** — Sleep, Restart, Shut Down, Log Out
- **Real weather data** — CONAGUA SMN API (Mexican weather service)
- **Real audio player** — 5 LoFi tracks with real-time frequency visualizer
- **Virtual filesystem** — Browse projects, documents, images, and music via Terminal and Finder
- **File preview** — Images, PDFs, audio, text with live preview in Finder

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| State | Zustand 5 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| PDF | PDFKit (generation), browser iframe (viewer) |
| Weather API | CONAGUA SMN (Mexico) |

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/lyonez-mx/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

---

## Project Structure

```
├── app/
│   ├── api/weather/       # Weather API proxy (CONAGUA)
│   ├── page.tsx           # System state machine
│   ├── layout.tsx         # Root layout + I18nProvider
│   └── globals.css        # Tailwind v4
├── components/
│   ├── apps/              # 15+ app components
│   │   ├── Finder.tsx     # File browser with preview
│   │   ├── Terminal.tsx   # Interactive shell
│   │   ├── Music.tsx      # Audio player + visualizer
│   │   ├── Weather.tsx    # Real weather data
│   │   ├── Snake.tsx      # Canvas game
│   │   ├── Notes.tsx      # Rich text notes
│   │   └── ...
│   └── os/                # OS shell components
│       ├── Desktop.tsx    # Main desktop canvas
│       ├── Window.tsx     # Drag/resize/maximize
│       ├── Dock.tsx       # Magnification dock
│       ├── TopBar.tsx     # Menu bar
│       └── ...
├── hooks/
│   └── useOSStore.ts      # Zustand global store
├── lib/
│   ├── registry.ts        # App registry (id → component)
│   └── virtual-fs.ts      # Virtual filesystem tree
├── constants/
│   ├── desktop-files.ts   # Desktop file definitions
│   └── projects.ts        # GitHub project data
├── contexts/
│   └── i18n.tsx           # i18n provider + useTranslation
├── locales/               # EN/ES translation files
└── public/
    ├── icons/             # App icons (PNG)
    ├── images/            # Photos and images
    ├── music/             # Audio tracks (MP3)
    └── pdf/               # PDF documents
```

---

## How to Add a New App

1. Create component in `components/apps/YourApp.tsx`
2. Add `AppId` to `AppId` union type in `hooks/useOSStore.ts`
3. Add entry to `appRegistry` in `lib/registry.ts`
4. Add Dock item in `components/os/Dock.tsx`
5. Add Launchpad icon in `components/os/Launchpad.tsx`
6. Add locale keys in `locales/en.ts` and `locales/es.ts`

---

## State Machine

```
boot ──→ login ──→ desktop ──→ sleep
                       │           │
                       └── shutdown ←┘
```

- **boot**: Auto-transitions to login after 3s (CSS animation)
- **login**: Click "Unlock" → desktop
- **desktop**: Main OS shell
- **sleep**: Click/key to wake → login
- **shutdown**: Click to boot

---

## i18n

All UI strings are centralized in `locales/en.ts` and `locales/es.ts`. Add new keys to both files. Use `t("key")` in components via `useTranslation()` hook.

---

## Dependencies

### Installed

```
next, react, react-dom, zustand, framer-motion, lucide-react,
@tailwindcss/postcss, postcss, tailwindcss, typescript,
@types/node, @types/react
```

### Optional

```
eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin
```

## License

MIT — see [LICENSE](./LICENSE).

---

## Author

**Erick Leonardo Hipólito Jurado** — [Lyonez Group](https://lyonez.group)
