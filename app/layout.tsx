import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/contexts/app-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { BackgroundImage } from '@/components/background-image'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Juegos AYAX 4.0',
  description: 'Tabla de puntuaciones de atletas',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased relative`}>
        <BackgroundImage />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppProvider>
            {children}
          </AppProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
