"use client"
import { Assign } from "@/lib/types"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { STATUS } from "@/lib/consts"
import { Button } from "../ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Edit } from "lucide-react"
import { updateAssignAdminAction } from "@/lib/actions/assignments"
import { UpdateAssignForm, updateAssignSchema } from "@/lib/zod-schemas"
import { useSession } from "next-auth/react"


type Props = {
  assign: Assign
}

export default function UpdateAssign({ assign }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UpdateAssignForm>({
    resolver: zodResolver(updateAssignSchema),
    defaultValues: {
      title: assign.title || "",
      description: assign.description || "",
      status: assign.status || "",
    }
  })

  const { data: session } = useSession()


  const onSubmit = async (formData: UpdateAssignForm) => {
    try {
      if (!session?.user?.id) throw Error("No session")
      await updateAssignAdminAction({
        ...formData, assign_id: assign.id
      })

      setIsEditModalOpen(false)
      reset()
    } catch (error) {
      console.error('Error al actualizar asignación:', error)
    }
  }

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Asignación</DialogTitle>
          <DialogDescription>Modifica la información de la asignación.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="titel"
              {...register("title")}
              className="col-span-3"
              placeholder="Título de la asignación"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Input
              id="description"
              {...register("description")}
              className="col-span-3"
              placeholder="Descripción detallada"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Estado
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="col-span-3 capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {
                      Object.entries(STATUS).map(([key, value]) => (
                        key !== "overdue"
                          ? <SelectItem className="capitalize" value={key} key={key}>{value}</SelectItem>
                          : null
                      ))
                    }
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.root && (
            <div className="col-span-4">
              <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
