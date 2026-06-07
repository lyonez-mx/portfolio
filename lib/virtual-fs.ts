import { projects } from "@/constants/projects"
import { desktopFiles } from "@/constants/desktop-files"

export interface FSNode {
  name: string
  type: "file" | "dir"
  content?: string
  children?: Record<string, FSNode>
}

function buildTree(): FSNode {
  const homeFiles: Record<string, FSNode> = {}
  for (const f of desktopFiles) {
    const enName = f.name.en
    const ext = enName.split(".").pop() ?? ""
    homeFiles[enName] = {
      name: enName,
      type: "file",
      content: f.type === "txt" ? f.content.en : f.type === "pdf" ? `[PDF: ${f.content.en}]` : `[image: ${f.content.en}]`,
    }
  }

  const projectDirs: Record<string, FSNode> = {}
  for (const p of projects) {
    projectDirs[p.id] = {
      name: p.title,
      type: "dir",
      children: {
        "README.md": {
          name: "README.md",
          type: "file",
          content: `# ${p.title}\n\n${p.description}\n\n## Tech Stack\n\n${p.tech.map((t) => `- ${t}`).join("\n")}\n\n## Links\n\n- GitHub: ${p.githubUrl}${p.demoUrl ? `\n- Demo: ${p.demoUrl}` : ""}`,
        },
        "tech.txt": {
          name: "tech.txt",
          type: "file",
          content: `${p.tech.join(", ")}`,
        },
      },
    }
  }

  return {
    name: "/",
    type: "dir",
    children: {
      home: {
        name: "home",
        type: "dir",
        children: {
          erik: {
            name: "erik",
            type: "dir",
            children: {
              Desktop: { name: "Desktop", type: "dir", children: homeFiles },
              Projects: { name: "Projects", type: "dir", children: projectDirs },
              Documents: { name: "Documents", type: "dir", children: {
                "cv.pdf": { name: "cv.pdf", type: "file", content: "[PDF: /pdf/CV Erick Leonardo.pdf]" },
                "projects.txt": { name: "projects.txt", type: "file", content: desktopFiles.find(f => f.id === "projects")?.content.en ?? "" },
                Images: { name: "Images", type: "dir", children: {
                  "lyon.png": { name: "lyon.png", type: "file", content: "[image: /images/lyon.png]" },
                  "me.jpg": { name: "me.jpg", type: "file", content: "[image: /images/me.jpg]" },
                } },
              } },
              Downloads: { name: "Downloads", type: "dir", children: {
                "good-night-lofi.mp3": { name: "good-night-lofi.mp3", type: "file", content: "[audio: /music/fassounds-good-night-lofi-cozy-chill-music.mp3]" },
                "lofi-study.mp3": { name: "lofi-study.mp3", type: "file", content: "[audio: /music/fassounds-lofi-study-calm-peaceful-chill-hop.mp3]" },
                "lofi-music.mp3": { name: "lofi-music.mp3", type: "file", content: "[audio: /music/prettyjohn1-lofi-lofi-music.mp3]" },
                "lofi-hiphop.mp3": { name: "lofi-hiphop.mp3", type: "file", content: "[audio: /music/solarflex-lofi-hiphop.mp3]" },
                "mountain-lofi.mp3": { name: "mountain-lofi.mp3", type: "file", content: "[audio: /music/the_mountain-lofi-hiphop.mp3]" },
              } },
              "about.txt": {
                name: "about.txt",
                type: "file",
                content: `Erik Leon\nFull-Stack Developer\n\nPassionate about building beautiful,\nperformant web experiences with modern\nJavaScript/TypeScript ecosystems.`,
              },
            },
          },
        },
      },
      etc: {
        name: "etc",
        type: "dir",
        children: {
          hostname: {
            name: "hostname",
            type: "file",
            content: "lyonos\n",
          },
        },
      },
      tmp: { name: "tmp", type: "dir", children: {} },
    },
  }
}

let _cached: FSNode | null = null
function getTree(): FSNode {
  if (!_cached) _cached = buildTree()
  return _cached
}

export function invalidateCache() {
  _cached = null
}

function norm(path: string): string {
  const parts = path.replace(/\/+/g, "/").split("/").filter(Boolean)
  const out: string[] = []
  for (const p of parts) {
    if (p === ".") continue
    if (p === "..") { out.pop(); continue }
    out.push(p)
  }
  return "/" + out.join("/")
}

export function resolve(cwd: string, raw: string): string {
  if (raw.startsWith("/")) return norm(raw)
  if (raw.startsWith("~/") || raw === "~") return norm("/home/erik" + raw.slice(1))
  return norm(cwd + "/" + raw)
}

export function getNode(path: string): FSNode | null {
  const parts = path.split("/").filter(Boolean)
  let node: FSNode | undefined = getTree()
  for (const p of parts) {
    if (!node.children) return null
    node = node.children[p]
    if (!node) return null
  }
  return node ?? null
}

export function ls(path: string): string[] | null {
  const node = getNode(path)
  if (!node || node.type !== "dir") return null
  return Object.keys(node.children ?? {}).sort()
}

export function cat(path: string): string | null {
  const node = getNode(path)
  if (!node || node.type !== "file") return null
  return node.content ?? ""
}

export function formatLS(path: string): string | null {
  const node = getNode(path)
  if (!node || node.type !== "dir") return null
  const entries = Object.entries(node.children ?? {}).sort(([a], [b]) => a.localeCompare(b))

  if (entries.length === 0) return ""

  const maxNameLen = Math.max(...entries.map(([n]) => n.length), 10)
  const header = `total ${entries.length}\n`

  const rows = entries.map(([name, child]) => {
    const perms = child.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--"
    const size = child.type === "file" ? (child.content?.length ?? 0).toString().padStart(6) : "     ".padStart(6)
    const nameCol = name.padEnd(maxNameLen + 2)
    return `${perms}  1 erik  staff  ${size}  ${nameCol}`
  })

  return header + rows.join("\n")
}
