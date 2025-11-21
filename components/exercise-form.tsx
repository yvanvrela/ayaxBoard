'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useApp } from '@/contexts/app-context'

export function ExerciseForm() {
  const [exerciseName, setExerciseName] = useState('')
  const { exercises, addExercise, removeExercise } = useApp()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (exerciseName.trim()) {
      addExercise(exerciseName.trim())
      setExerciseName('')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Ejercicio</CardTitle>
          <CardDescription>Crea un nuevo ejercicio para la competición</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exercise-name">Nombre del Ejercicio</Label>
              <Input
                id="exercise-name"
                placeholder="Ej: Sentadilla, Press de banca..."
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Guardar Ejercicio
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ejercicios Registrados</CardTitle>
          <CardDescription>Lista de ejercicios disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {exercises.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay ejercicios registrados
              </p>
            ) : (
              exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3"
                >
                  <span className="text-sm font-medium">{exercise.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExercise(exercise.id)}
                    className="h-6 w-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
