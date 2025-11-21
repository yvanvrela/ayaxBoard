'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Users, TrendingUp } from 'lucide-react'
import { useApp } from '@/contexts/app-context'

export function StatsCards() {
  const { athletes, getAthleteScore } = useApp()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalAthletes = athletes.length
  const averageScore = athletes.length > 0
    ? Math.round(athletes.reduce((sum, athlete) => sum + getAthleteScore(athlete), 0) / athletes.length)
    : 0

  const stats = [
    {
      label: 'Atletas',
      value: mounted ? totalAthletes.toString() : '0',
      icon: Users,
    },
    {
      label: 'Puntuación Media',
      value: mounted ? averageScore.toString() : '0',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="flex items-center gap-4 p-6"
          >
            <div className="rounded-lg bg-secondary p-3">
              <Icon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
