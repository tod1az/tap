"use client"
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export default function NewEmployeeDialog() {

  function handleAddEmployee() { }

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
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
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              className="col-span-3"
              placeholder="Juan"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido
            </Label>
            <Input
              id="apellido"
              className="col-span-3"
              placeholder="Pérez"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              placeholder="juan.perez@empresa.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fechaIngreso" className="text-right">
              Fecha Ingreso
            </Label>
            <Input
              id="fechaIngreso"
              type="date"
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddEmployee}>
              Agregar Empleado
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}
