import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JobMacth App',
  description: 'Applicaion to checkout Job Match',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
