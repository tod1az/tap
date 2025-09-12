import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UserPlus } from "lucide-react";

export default function NewAssigmentModal({ employee }: any) {

  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false)

  return (
    <Dialog open={isAddAssignmentModalOpen} onOpenChange={setIsAddAssignmentModalOpen}>
      <Button
        onClick={() => setIsAddAssignmentModalOpen(true)}
        variant="outline"
        size="sm"
        title="Agregar asignación"
      >
        <UserPlus className="h-4 w-4" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Asignación</DialogTitle>
          <DialogDescription>
            Crear una nueva asignación para {employee?.nombre}{" "}
            {employee?.apellido}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Título de la asignación"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              placeholder="Descripción detallada"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaVencimiento">Fecha Vencimiento</Label>
              <Input
                id="fechaVencimiento"
                type="date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddAssignmentModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button >
            Crear Asignación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
