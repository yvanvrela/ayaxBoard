"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, User, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AthleteForm } from "./athlete-form"
import { useApp, type Athlete } from "@/contexts/app-context"
import { toast } from "sonner"

export function AthletesList() {
  const { athletes, updateAthlete, deleteAthlete } = useApp()
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deletingAthleteId, setDeletingAthleteId] = useState<string | null>(null)

  const handleEdit = (athlete: Athlete) => {
    setEditingAthlete(athlete)
    setIsDialogOpen(true)
  }

  const handleUpdateAthlete = (updatedData: any) => {
    if (editingAthlete) {
      updateAthlete(editingAthlete.id, updatedData)
      setIsDialogOpen(false)
      setEditingAthlete(null)
    }
  }

  const handleDeleteClick = (id: string) => {
    setDeletingAthleteId(id)
  }

  const handleConfirmDelete = () => {
    if (deletingAthleteId) {
      deleteAthlete(deletingAthleteId)
      toast.success("Atleta eliminado correctamente")
      setDeletingAthleteId(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Atletas</CardTitle>
          <CardDescription>Gestiona y edita los atletas registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {athletes.map((athlete) => (
              <Card key={athlete.id} className="overflow-hidden">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold">
                          {athlete.firstName} {athlete.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          C.I. {athlete.idNumber} • {athlete.age} años
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{athlete.ageCategory === "adultos" ? "Adultos" : "Niños"}</Badge>
                        <Badge variant="outline">{athlete.gender === "masculino" ? "Masculino" : "Femenino"}</Badge>
                        <Badge variant="secondary">{athlete.gym}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{athlete.city}</span>
                        <span className="font-semibold text-accent">{athlete.totalRepetitions} repeticiones</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(athlete)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(athlete.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {athletes.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No hay atletas registrados</p>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Atleta</DialogTitle>
            <DialogDescription>Actualiza la información del atleta y sus ejercicios</DialogDescription>
          </DialogHeader>
          {editingAthlete && (
            <AthleteForm initialData={editingAthlete} isEditing={true} onSubmit={handleUpdateAthlete} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deletingAthleteId !== null} onOpenChange={(open) => !open && setDeletingAthleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el atleta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
