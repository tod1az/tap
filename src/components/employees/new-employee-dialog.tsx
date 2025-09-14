"use client"
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeFormData, employeeSchema } from "@/lib/zod-schemas";
import { createEmployeeAction } from "@/lib/actions/employees";


export default function NewEmployeeDialog() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: ""
    }
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await createEmployeeAction(data)
      setIsAddModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      setError("root", { message: "Error creando el empleado" })
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsAddModalOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={handleModalClose}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Empleado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
          <DialogDescription>Completa la información del nuevo empleado.</DialogDescription>
        </DialogHeader>
        {errors.root && (
          <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
        )}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                {...register("name")}
                placeholder="Juan"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Apellido
            </Label>
            <div className="col-span-3">
              <Input
                id="lastname"
                {...register("lastname")}
                placeholder="Pérez"
                className={errors.lastname ? "border-red-500" : ""}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="juan.perez@empresa.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleModalClose(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Agregando..." : "Agregar Empleado"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
