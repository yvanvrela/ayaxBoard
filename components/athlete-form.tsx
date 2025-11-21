"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, UserPlus } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { toast } from "sonner"

interface ExerciseEntry {
  exercise: string
  repetitions: string
}

interface AthleteFormProps {
  onSubmit?: (data: any) => void
  initialData?: any
  isEditing?: boolean
}

export function AthleteForm({ onSubmit, initialData, isEditing = false }: AthleteFormProps) {
  const { exercises, addAthlete, updateAthlete } = useApp()
  const [firstName, setFirstName] = useState(initialData?.firstName || "")
  const [lastName, setLastName] = useState(initialData?.lastName || "")
  const [ageCategory, setAgeCategory] = useState(initialData?.ageCategory || "")
  const [gender, setGender] = useState(initialData?.gender || "")
  const [idNumber, setIdNumber] = useState(initialData?.idNumber || "")
  const [age, setAge] = useState(initialData?.age || "")
  const [gym, setGym] = useState(initialData?.gym || "")
  const [city, setCity] = useState(initialData?.city || "")
  const [exerciseEntries, setExerciseEntries] = useState<ExerciseEntry[]>(
    initialData?.exercises?.length > 0 ? initialData.exercises : [],
  )

  // Actualizar el formulario cuando cambie initialData
  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "")
      setLastName(initialData.lastName || "")
      setAgeCategory(initialData.ageCategory || "")
      setGender(initialData.gender || "")
      setIdNumber(initialData.idNumber || "")
      setAge(initialData.age || "")
      setGym(initialData.gym || "")
      setCity(initialData.city || "")
      setExerciseEntries(initialData.exercises?.length > 0 ? initialData.exercises : [])
    }
  }, [initialData])

  const availableExercises = exercises.map((ex) => ex.name)

  const totalRepetitions = exerciseEntries.reduce((sum, entry) => {
    const reps = Number.parseInt(entry.repetitions) || 0
    return sum + reps
  }, 0)

  const handleAddExercise = () => {
    setExerciseEntries([...exerciseEntries, { exercise: "", repetitions: "" }])
  }

  const handleRemoveExercise = (index: number) => {
    setExerciseEntries(exerciseEntries.filter((_, i) => i !== index))
  }

  const handleExerciseChange = (index: number, field: keyof ExerciseEntry, value: string) => {
    const newEntries = [...exerciseEntries]
    newEntries[index][field] = value
    setExerciseEntries(newEntries)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredExercises = exerciseEntries.filter((entry) => entry.exercise && entry.repetitions)
    const athleteData = {
      firstName,
      lastName,
      ageCategory,
      gender,
      idNumber,
      age,
      gym,
      city,
      exercises: filteredExercises,
      totalRepetitions,
    }

    if (isEditing && initialData?.id) {
      updateAthlete(initialData.id, athleteData)
      toast.success("Atleta actualizado correctamente")
    } else {
      addAthlete(athleteData)
      toast.success("Atleta registrado correctamente")
    }

    if (onSubmit) {
      onSubmit(athleteData)
    }

    if (!isEditing) {
      setFirstName("")
      setLastName("")
      setAgeCategory("")
      setGender("")
      setIdNumber("")
      setAge("")
      setGym("")
      setCity("")
      setExerciseEntries([])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Atleta" : "Registrar Atleta"}</CardTitle>
        <CardDescription>
          {isEditing ? "Actualiza los datos del competidor" : "Agrega un nuevo competidor a la competición"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Primera Sección: Datos Personales */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Datos Personales</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input
                  id="first-name"
                  placeholder="Nombre del atleta"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Apellido</Label>
                <Input
                  id="last-name"
                  placeholder="Apellido del atleta"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age-category">Categoría de Edad</Label>
                <Select value={ageCategory} onValueChange={setAgeCategory} required>
                  <SelectTrigger id="age-category">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adultos">Adultos</SelectItem>
                    <SelectItem value="niños">Niños</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Seleccionar género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id-number">Cédula de Identidad</Label>
                <Input
                  id="id-number"
                  placeholder="C.I."
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Edad"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gym">Gimnasio</Label>
                <Input
                  id="gym"
                  placeholder="Nombre del gimnasio"
                  value={gym}
                  onChange={(e) => setGym(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ejercicios y Repeticiones (Opcional)</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddExercise}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Ejercicio
              </Button>
            </div>
            {exerciseEntries.length > 0 ? (
              <div className="space-y-4">
                {exerciseEntries.map((entry, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`exercise-${index}`}>Ejercicio</Label>
                      <Select
                        value={entry.exercise}
                        onValueChange={(value) => handleExerciseChange(index, "exercise", value)}
                      >
                        <SelectTrigger id={`exercise-${index}`}>
                          <SelectValue placeholder="Seleccionar ejercicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableExercises.map((ex) => (
                            <SelectItem key={ex} value={ex}>
                              {ex}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-32 space-y-2">
                      <Label htmlFor={`reps-${index}`}>Repeticiones</Label>
                      <Input
                        id={`reps-${index}`}
                        type="number"
                        placeholder="10"
                        value={entry.repetitions}
                        onChange={(e) => handleExerciseChange(index, "repetitions", e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveExercise(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No hay ejercicios agregados</p>
            )}
          </div>

          {exerciseEntries.length > 0 && (
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total de Repeticiones</span>
                <span className="text-2xl font-bold text-accent">{totalRepetitions}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" />
            {isEditing ? "Actualizar Atleta" : "Registrar Atleta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
