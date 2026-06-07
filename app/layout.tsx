import type { Metadata } from "next"
import { I18nProvider } from "@/contexts/i18n"
import "./globals.css"

export const metadata: Metadata = {
  title: "LyonOS",
  description: "Portfolio Web OS",
  icons: { icon: "/images/lyon.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
