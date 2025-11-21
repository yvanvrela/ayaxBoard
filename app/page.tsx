import { LeaderboardHeader } from "@/components/leaderboard-header"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { StatsCards } from "@/components/stats-cards"
import { ExerciseForm } from "@/components/exercise-form"
import { AthleteForm } from "@/components/athlete-form"
import { AthletesList } from "@/components/athletes-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <LeaderboardHeader />
        <StatsCards />

        <Tabs defaultValue="leaderboard" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leaderboard">Puntuaciones</TabsTrigger>
            <TabsTrigger value="exercises">Ejercicios</TabsTrigger>
            <TabsTrigger value="athletes">Nuevo Atleta</TabsTrigger>
            <TabsTrigger value="list">Lista Atletas</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="mt-6">
            <LeaderboardTable />
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <ExerciseForm />
          </TabsContent>

          <TabsContent value="athletes" className="mt-6">
            <AthleteForm />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <AthletesList />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
