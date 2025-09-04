import type React from "react"
import "./globals.css"
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
