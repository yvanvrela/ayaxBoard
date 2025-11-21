'use client'

import { Trophy } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function LeaderboardHeader() {
  return (
    <header className="mb-8 relative">
      <div className="absolute top-0 right-0 sm:right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
          <Trophy className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-2 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          CLASIFICACIÓN
        </h1>
        <p className="text-pretty text-lg text-muted-foreground">
          Juegos AYAX 4.0  
        </p>
      </div>
    </header>
  )
}
