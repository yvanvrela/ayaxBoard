'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from '@/lib/use-local-storage'

export interface Exercise {
  id: string
  name: string
}

export interface ExerciseEntry {
  exercise: string
  repetitions: string
}

export interface Athlete {
  id: string
  firstName: string
  lastName: string
  ageCategory: string
  gender: string
  idNumber: string
  age: string
  gym: string
  city: string
  exercises: ExerciseEntry[]
  totalRepetitions: number
  createdAt: string
}

interface AppContextType {
  exercises: Exercise[]
  athletes: Athlete[]
  addExercise: (name: string) => void
  removeExercise: (id: string) => void
  addAthlete: (athlete: Omit<Athlete, 'id' | 'createdAt'>) => void
  updateAthlete: (id: string, athlete: Partial<Athlete>) => void
  deleteAthlete: (id: string) => void
  getAthleteScore: (athlete: Athlete) => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useLocalStorage<Exercise[]>('ayax-exercises', [
    { id: '1', name: 'Sentadilla' },
    { id: '2', name: 'Press de banca' },
    { id: '3', name: 'Peso muerto' },
    { id: '4', name: 'Dominadas' },
  ])

  const [athletes, setAthletes] = useLocalStorage<Athlete[]>('ayax-athletes', [])

  const addExercise = (name: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: name.trim(),
    }
    setExercises((prev) => [...prev, newExercise])
  }

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id))
  }

  const addAthlete = (athleteData: Omit<Athlete, 'id' | 'createdAt'>) => {
    const newAthlete: Athlete = {
      ...athleteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setAthletes((prev) => [...prev, newAthlete])
  }

  const updateAthlete = (id: string, athleteData: Partial<Athlete>) => {
    setAthletes((prev) =>
      prev.map((athlete) => {
        if (athlete.id === id) {
          const updated = { ...athlete, ...athleteData }
          // Recalcular totalRepetitions si se actualizaron los ejercicios
          if (athleteData.exercises) {
            updated.totalRepetitions = updated.exercises.reduce((sum, entry) => {
              const reps = Number.parseInt(entry.repetitions) || 0
              return sum + reps
            }, 0)
          }
          return updated
        }
        return athlete
      })
    )
  }

  const deleteAthlete = (id: string) => {
    setAthletes((prev) => prev.filter((athlete) => athlete.id !== id))
  }

  // Calcular el score del atleta basado en sus repeticiones
  const getAthleteScore = (athlete: Athlete): number => {
    return athlete.totalRepetitions
  }

  return (
    <AppContext.Provider
      value={{
        exercises,
        athletes,
        addExercise,
        removeExercise,
        addAthlete,
        updateAthlete,
        deleteAthlete,
        getAthleteScore,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

