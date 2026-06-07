export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  icon: string
  githubUrl: string
  demoUrl?: string
  category: "web" | "mobile" | "game" | "tool" | "ai" | "infra" | "app" | "backend"
}

export const projects: Project[] = [
  {
    id: "lilfy",
    title: "Lilfy",
    description:
      "AI-powered multi-vertical business platform for Services and Real Estate that connects WhatsApp with intelligent AI agents to automate lead generation, customer interaction, and conversation management. Architecture monorepo with four sub-projects: lilfy-service (NestJS 11 backend with Prisma, Supabase, BullMQ, Socket.io, Google Generative AI, and Passport JWT authentication), lilfy-app (Next.js 16 frontend with React 19, Tailwind CSS v4, Supabase SSR, Recharts dashboards, and Framer Motion interactions), lilfy-web (Next.js 16 landing page), and lilfy-mirror (Next.js 16 interactive kiosk with MediaPipe computer vision). Implements multi-tenant isolation with full data separation per organization, real-time dashboards via Socket.io + Recharts, AI agents with RAG and intent detection, WhatsApp integration flow through lilfy-whatsapp-adapter, i18n (English/Spanish), and Obsidian Flux (dark) / Luminous (light) theme system with glassmorphism UI. Infrastructure runs on Docker with Caddy reverse proxy and PostgreSQL on Supabase.",
    tech: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase", "BullMQ", "Socket.io", "PostgreSQL", "Docker", "Google Generative AI"],
    icon: "/icons/safari.png",
    githubUrl: "https://github.com/lyonez-mx/lilfy",
    category: "web",
  },
  {
    id: "iztly-amatl",
    title: "Iztly Amatl",
    description:
      "Interactive high-fidelity Flutter application showcasing advanced physics-based card animations, interactive fan widgets, and custom 3D shuffling mechanisms for tarot and card deck visualization. Features a custom spring-damper physics engine written entirely in Dart that drives realistic card fan interactions with drag-and-select mechanics, real-time physics simulation using configurable spring constants, damping ratios, and mass parameters. Integrates Rive for high-fidelity vector animations, experimental 3D card rendering using three_js and three_js_controls packages aiming toward WebGL-like visual shufflers, and custom painting via Dart's Canvas API and CustomPainter for unique card layouts and transitions. Cross-platform support across Android, iOS, Web, macOS, Windows, and Linux. Asset library includes high-resolution tarot card imagery (major arcana) and custom animation files.",
    tech: ["Dart", "Flutter", "Canvas API", "Rive", "CustomPainter", "Three.js"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/lyonez-mx/iztly-amatl",
    category: "mobile",
  },
  {
    id: "portfolio",
    title: "LyonOS Portfolio",
    description:
      "macOS-inspired web OS portfolio built with Next.js 16 App Router and TypeScript 6. Features a complete boot state machine (boot → login → desktop → sleep → shutdown), custom window management with drag, 8-direction resize, traffic light controls, and z-index stacking; interactive terminal emulator with virtual filesystem supporting cd, ls, cat, pwd, and project-aware directory navigation; 15+ built-in apps including Snake game, weather dashboard, music player, file browser with grid/list views and project preview panel, Notes editor, Safari bookmark browser, FaceTime camera integration with photo capture, and interactive project explorer showing real GitHub repositories. Dark/Light mode with localStorage persistence, full i18n (EN/ES), Framer Motion dock magnification, Launchpad app grid overlay, and Apple-style menu bar with Sleep/Restart/Shut Down controls.",
    tech: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Framer Motion", "Lucide React"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/lyonez-mx/portfolio",
    category: "web",
  },
  {
    id: "slack-app-gemini",
    title: "Lilfy MCP Slack Server",
    description:
      "Model Context Protocol (MCP) server that provides seamless integration between Large Language Model agents (Claude, Gemini, custom IDE bots) and Slack workspaces. Acts as a bidirectional bridge exposing three core tools to LLM agents: send_message for posting messages to any Slack channel or user, list_channels for enumerating available public and private channels, and read_messages for fetching recent conversation history. Built on the official @modelcontextprotocol/sdk with @slack/web-api and @slack/bolt. Configurable via standard MCP client configurations (claude_desktop_config.json, IDE configs). Enables AI agents to autonomously communicate within Slack, monitor channels, and trigger responses without manual intervention.",
    tech: ["TypeScript", "Node.js", "MCP SDK", "Slack API", "Bolt"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/lyonez-mx/slack-app-gemini",
    category: "ai",
  },
  {
    id: "lyon-market",
    title: "Lilfy Market",
    description:
      "Interactive premium storefront and organization dashboard platform built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4. Features Organization Spaces with customized landing workspaces per company or team, Mirror Camera Integration using MediaPipe tasks-vision for real-time webcam viewfinder embedded directly in components, dynamic promotional Countdown Overlays for sales events and timed promotions, premium LoginModal component with secure authentication UI, and fully responsive layout across mobile, tablet, and desktop viewports. Includes theme customization, product showcase layouts, and real-time camera effects for an immersive shopping experience.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MediaPipe", "Lucide React"],
    icon: "/icons/safari.png",
    githubUrl: "https://github.com/lyonez-mx/lyon-market",
    category: "web",
  },
  {
    id: "lyon-agent",
    title: "Lyon Agent",
    description:
      "Multi-agent autonomous framework for end-to-end video content production that orchestrates specialized AI agents to automate script generation, planning, coding, quality assurance, and video editing. Composed of five coordinated agents: a Planner that structures the production pipeline, a Video Script Generator that creates compelling narratives using Google Gemini, a Coder for implementing required software components, a QA Verifier that validates outputs against requirements, and a Video Editor that assembles final media assets. Integrates Slack (via @slack/bolt) for agent status notifications, control commands, and human-in-the-loop approvals. Uses Playwright for browser automation tasks, Pydantic for structured data validation, and Google's genai SDK for LLM-powered content generation. Designed as a modular Python framework where each agent can be developed, tested, and deployed independently.",
    tech: ["Python", "Google Gemini", "Slack Bolt", "Playwright", "Pydantic"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/lyonez-mx/lyon-agent",
    category: "ai",
  },
  {
    id: "whatsapp-adapter",
    title: "Lilfy WhatsApp Adapter",
    description:
      "Multi-tenant WhatsApp messaging adapter that bridges WhatsApp conversations with the Lilfy CRM backend via a REST API. Built on @whiskeysockets/baileys v7 WebSocket protocol for direct WhatsApp integration without Business API dependencies. Implements isolated WhatsApp sessions per tenant organization with QR code authentication, persistent session storage, and automatic reconnection with exponential backoff. Supports sending text messages, single images, and multi-image albums with native WhatsApp gallery grouping and anti-flood rate limiting. Inbound webhook system forwards incoming messages, delivery receipts, and read receipts to the CRM. Group management API lists all groups with participant metadata. Contact caching persists name mappings across restarts. Auto-update monitoring checks WhatsApp protocol version every 30 minutes and disconnects outdated versions. Containerized with Docker Alpine for production deployment at port 3004.",
    tech: ["TypeScript", "Node.js", "Baileys", "Express", "Docker", "Pino"],
    icon: "/icons/mail.png",
    githubUrl: "https://github.com/lyonez-mx/whatsapp-adapter",
    category: "tool",
  },
  {
    id: "lyon-shorts",
    title: "Lyon Shorts",
    description:
      "Automated multi-platform video publisher for YouTube Shorts and TikTok that implements the Facade and Factory design patterns to unify video uploading, metadata configuration, scheduling, and API submission across both platforms. Abstracts away the differing API complexities of YouTube Data API v3 and TikTok Creator Graph API behind a clean, unified interface. Handles authentication flows, rate limiting, video format validation, thumbnail generation, caption/subtitle attachment, and scheduled publishing. Built with Python 3.10+ using google-api-python-client for YouTube integration and the official TikTok API client. Designed for content creators who need to distribute short-form videos across both platforms simultaneously without managing two separate publishing workflows.",
    tech: ["Python", "YouTube API", "TikTok API", "google-api-python-client", "pydantic"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/lyonez-mx/lyon-shorts",
    category: "tool",
  },
  {
    id: "lyon-sentinel",
    title: "Lilfy Sentinel",
    description:
      "Automated keymapper, controller agent, and sound assistant built specifically for Five Nights at Freddy's (FNAF) and Maze Zombie games. Automates keyboard inputs using robotjs for precise key sequences, maps camera panel navigation to hotkeys, triggers defensive button actions at critical moments, and plays local audio files through sound-play for in-game soundboard effects. Uses uiohook-napi for global keyboard hooking to intercept and respond to game events in real-time, and integrates tiktok-live-connector for live-stream interaction capabilities. Designed as a Node.js automation tool that reduces repetitive manual actions in horror/survival games where quick reactions are essential.",
    tech: ["Node.js", "robotjs", "uiohook-napi", "sound-play", "tiktok-live-connector"],
    icon: "/icons/snake.png",
    githubUrl: "https://github.com/lyonez-mx/lyon-sentinel",
    category: "game",
  },
  {
    id: "lyon-edit",
    title: "Lyon Edit",
    description:
      "AI-driven video montage editor and gesture-controlled production studio that integrates computer vision pose estimation with a web interface for touchless video editing. Uses Ultralytics YOLOv8/YOLOv11 pose models to detect user body movements in real-time, mapping specific gestures to editing actions through a WebSocket/REST gateway. Features automated green-screen meme compositing that processes funny .webm overlay clips and composites them onto base footage; batch video conversion with FFmpeg; voice transcription using faster-whisper for extracting audio and generating captions; and Gemini AI integration for analyzing video clips to identify key event timings, generate descriptions, and suggest edit points. The web console provides real-time monitoring of detected gestures, media library management, and montage processing controls. Asset library includes green-screen meme clips (bebe, gatito, explosion, billetes, among others) for automated compositing.",
    tech: ["Python", "YOLOv8", "Gemini AI", "FFmpeg", "Whisper", "OpenCV", "FastAPI", "WebSocket"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/lyonez-mx/lyon-edit",
    category: "tool",
  },
  {
    id: "lilfy-redis",
    title: "Lilfy Redis",
    description:
      "Production-ready Redis infrastructure configuration as code using Docker Compose, specifically tailored for the Lilfy microservices ecosystem. Includes a custom redis.conf with optimized memory limits, persistence configuration (RDB snapshots and AOF append-only file), and network security settings. Provides a multi-service Docker Compose setup with Redis primary node, optional Redis Sentinel for high availability and automatic failover, and sample configuration for caching, rate limiting, session storage, and pub/sub messaging patterns. Designed to be plugged directly into the Lilfy docker-compose network alongside the NestJS backend and other microservices.",
    tech: ["Docker", "Redis", "Docker Compose", "Sentinel"],
    icon: "/icons/settings.png",
    githubUrl: "https://github.com/lyonez-mx/lilfy-redis",
    category: "infra",
  },
  {
    id: "facebook-ads-scrapper",
    title: "Lilfy Facebook Ads Scraper",
    description:
      "High-performance Facebook advertising data extraction tool using Playwright with async browser automation and sophisticated anti-detection techniques. Intercepts GraphQL and REST API calls made by the Facebook Ad Library frontend to extract ad creatives, copy text, targeting parameters, and estimated performance metrics without relying on official APIs. Uses camoufox for browser fingerprint randomization to evade detection, implements automatic proxy rotation for distributed scraping at scale, and simulates human interaction patterns (scrolling, hovering, variable timing) to avoid rate limiting. Exposes a FastAPI server with Uvicorn for programmatic access, uses Redis for request queuing and deduplication, Pydantic for data validation, and httpx for async HTTP requests. Fully containerized with Docker for easy deployment. Exports structured data to CSV and JSON formats for competitive analysis, market research, and ad spend intelligence.",
    tech: ["Python", "Playwright", "FastAPI", "Redis", "Docker", "camoufox", "Pydantic"],
    icon: "/icons/safari.png",
    githubUrl: "https://github.com/lyonez-mx/facebook-ads-scrapper",
    category: "tool",
  },
  {
    id: "couch-gamer",
    title: "Couch Gamer",
    description:
      "Interactive TikTok Live companion bot that listens to live stream events (comments, gifts, likes, shares, follows), captures the screen in real-time using MSS, processes game state through computer vision with Pillow, and generates dynamic voice commentary using Google Gemini for LLM-powered text generation and Gemini Vision for understanding on-screen game content. Uses edge-tts for realistic text-to-speech voice synthesis, sounddevice for audio playback, and SpeechRecognition for understanding viewer voice commands. Designed to create an engaging live streaming experience where the AI reacts to chat messages, comments on gameplay moments, responds to viewer gifts with contextual reactions, and maintains an entertaining dialogue throughout the stream without human intervention. Built with Python 3.13 and designed for low-latency real-time processing.",
    tech: ["Python", "Google Gemini", "edge-tts", "MSS", "Pillow", "sounddevice", "SpeechRecognition"],
    icon: "/icons/snake.png",
    githubUrl: "https://github.com/lyonez-mx/couch-gamer",
    category: "ai",
  },
]
