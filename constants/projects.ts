export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  icon: string // lucide icon name or path
  githubUrl?: string
  demoUrl?: string
  category: "web" | "mobile" | "game" | "tool"
}

export const projects: Project[] = [
  {
    id: "lyonos",
    title: "LyonOS Portfolio",
    description:
      "macOS-inspired web OS built with Next.js 16, TypeScript 6, and Zustand 5. Features window management, interactive terminal, dark mode, and 15+ apps.",
    tech: ["Next.js", "TypeScript", "Zustand", "Tailwind", "Framer Motion"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/erikleon/lyonos",
    demoUrl: "https://lyonos.dev",
    category: "web",
  },
  {
    id: "proyecto2",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce with real-time inventory, payment processing, and admin dashboard.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    icon: "/icons/safari.png",
    githubUrl: "https://github.com/erikleon/ecommerce",
    category: "web",
  },
  {
    id: "proyecto3",
    title: "CLI Task Manager",
    description:
      "Command-line task manager written in Rust with SQLite persistence and TUI interface.",
    tech: ["Rust", "SQLite", "CLI"],
    icon: "/icons/terminal.png",
    githubUrl: "https://github.com/erikleon/task-cli",
    category: "tool",
  },
  {
    id: "proyecto4",
    title: "Weather Dashboard",
    description:
      "Real-time weather dashboard with interactive maps, 7-day forecasts, and severe weather alerts.",
    tech: ["Next.js", "TypeScript", "D3.js", "OpenWeather API"],
    icon: "/icons/weather.png",
    githubUrl: "https://github.com/erikleon/weather",
    demoUrl: "https://weather.example.com",
    category: "web",
  },
  {
    id: "proyecto5",
    title: "Snake Game",
    description:
      "Classic Snake game built with HTML Canvas and TypeScript. Features high scores, mobile controls, and progressive difficulty.",
    tech: ["TypeScript", "Canvas API"],
    icon: "/icons/snake.png",
    githubUrl: "https://github.com/erikleon/snake",
    demoUrl: "https://snake.example.com",
    category: "game",
  },
  {
    id: "proyecto6",
    title: "API Gateway",
    description:
      "Microservices API gateway with rate limiting, authentication, and request routing.",
    tech: ["Go", "Redis", "Docker", "gRPC"],
    icon: "/icons/settings.png",
    githubUrl: "https://github.com/erikleon/gateway",
    category: "tool",
  },
]
