"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserPlus } from "lucide-react";
import { Employee } from "@/lib/types";
import { AssignmentFormData, assignmentSchema } from "@/lib/zod-schemas";
import { createAssignAction } from "@/lib/actions/assignments";


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
      await createAssignAction({ ...data, userId: employee.id })
      setIsAddAssignmentModalOpen(false);
      reset();
    } catch (error) {
      console.log(error)
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
      <DialogTrigger asChild>
        <Button
          type="button"
          onClick={() => setIsAddAssignmentModalOpen(true)}
          variant="outline"
          size="sm"
          title="Agregar asignación"
        >
          <UserPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
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
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Título de la asignación"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Descripción detallada"
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Fecha Vencimiento</Label>
              <Input
                id="dueDate"
                type="date"
                {...register("dueDate")}
                className={errors.dueDate ? "border-red-500" : ""}
              />
              {errors.dueDate && (
                <p className="text-sm text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </div>
          {errors.root && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
              {errors.root.message}
            </div>
          )}
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
