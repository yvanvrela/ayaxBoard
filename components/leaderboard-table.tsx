"use client"

import { Card } from "@/components/ui/card"
import { Medal, Trophy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApp, type Athlete } from "@/contexts/app-context"

interface LeaderboardAthlete {
  rank: number
  name: string
  score: number
  gender: string
  ageCategory: string
}

function LeaderboardList({ ageCategory, gender }: { ageCategory: string; gender: string }) {
  const { athletes, getAthleteScore } = useApp()

  const filteredAthletes: LeaderboardAthlete[] = athletes
    .filter((a) => {
      const categoryMatch = a.ageCategory === ageCategory.toLowerCase() || 
        (ageCategory === "Adultos" && a.ageCategory === "adultos") ||
        (ageCategory === "Niños" && a.ageCategory === "niños")
      const genderMatch = 
        (gender === "Masculino" && a.gender === "masculino") ||
        (gender === "Femenino" && a.gender === "femenino")
      return categoryMatch && genderMatch
    })
    .map((athlete) => ({
      rank: 0, // Se calculará después
      name: `${athlete.firstName} ${athlete.lastName}`,
      score: getAthleteScore(athlete),
      gender: athlete.gender === "masculino" ? "Masculino" : "Femenino",
      ageCategory: athlete.ageCategory === "adultos" ? "Adultos" : "Niños",
    }))
    .sort((a, b) => b.score - a.score)
    .map((athlete, index) => ({ ...athlete, rank: index + 1 }))
    .slice(0, 10)

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-accent" />
    if (rank !== 1 && rank <= 4) return <Medal className="h-5 w-5 text-muted-foreground" />
    return null
  }

  if (filteredAthletes.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No hay atletas registrados en esta categoría</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/60">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Posición</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Atleta</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Puntos</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAthletes.map((athlete) => (
                <tr key={`${athlete.name}-${athlete.rank}`} className="transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getRankIcon(athlete.rank)}
                      <span className={`text-lg font-bold ${athlete.rank <= 4 ? "text-accent" : ""}`}>
                        {athlete.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{athlete.name}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold">{athlete.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y md:hidden">
        {filteredAthletes.map((athlete) => (
          <div key={`${athlete.name}-${athlete.rank}`} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRankIcon(athlete.rank)}
                <span className={`text-2xl font-bold ${athlete.rank <= 3 ? "text-accent" : ""}`}>{athlete.rank}</span>
              </div>
            </div>
            <div className="mb-3">
              <p className="font-semibold">{athlete.name}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-lg font-bold">{athlete.score} pts</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function LeaderboardTable() {
  return (
    <Tabs defaultValue="adultos" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="adultos">Adultos</TabsTrigger>
        <TabsTrigger value="niños">Niños</TabsTrigger>
      </TabsList>

      <TabsContent value="adultos" className="mt-6 space-y-6">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Masculino</h3>
          <LeaderboardList ageCategory="Adultos" gender="Masculino" />
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold">Femenino</h3>
          <LeaderboardList ageCategory="Adultos" gender="Femenino" />
        </div>
      </TabsContent>

      <TabsContent value="niños" className="mt-6 space-y-6">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Masculino</h3>
          <LeaderboardList ageCategory="Niños" gender="Masculino" />
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold">Femenino</h3>
          <LeaderboardList ageCategory="Niños" gender="Femenino" />
        </div>
      </TabsContent>
    </Tabs>
  )
}
