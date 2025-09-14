"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserPlus } from "lucide-react";
import { Employee } from "@/lib/types";
import { AssignmentFormData, assignmentSchema } from "@/lib/zod-schemas";


type Props = {
  employee: Employee
}

export default function NewAssignmentModal({ employee }: Props) {
  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
  });

  const onSubmit = async (data: AssignmentFormData) => {
    try {
      console.log("Datos de la asignación:", data);
      console.log("Empleado:", employee);

      setIsAddAssignmentModalOpen(false);
      reset();
    } catch (error) {
      setError("root", { message: "Error al crear la asignacion" })
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsAddAssignmentModalOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isAddAssignmentModalOpen} onOpenChange={handleModalClose}>
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
            Crear una nueva asignación para {employee?.name}{" "}
            {employee?.lastname}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Título de la asignación"
              {...register("titulo")}
              className={errors.titulo ? "border-red-500" : ""}
            />
            {errors.titulo && (
              <p className="text-sm text-red-500">{errors.titulo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              placeholder="Descripción detallada"
              {...register("descripcion")}
              className={errors.descripcion ? "border-red-500" : ""}
            />
            {errors.descripcion && (
              <p className="text-sm text-red-500">{errors.descripcion.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaVencimiento">Fecha Vencimiento</Label>
              <Input
                id="fechaVencimiento"
                type="date"
                {...register("fechaVencimiento")}
                className={errors.fechaVencimiento ? "border-red-500" : ""}
              />
              {errors.fechaVencimiento && (
                <p className="text-sm text-red-500">{errors.fechaVencimiento.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddAssignmentModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear Asignación"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
