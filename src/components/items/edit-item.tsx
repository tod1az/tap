"use client"
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditItemFormData, EditItemSchema, itemSchema } from "@/lib/zod-schemas";
import { Item } from "@/lib/types";
import { updateItemAction } from "@/lib/actions/items";


type Props = {
  item: Item
}

export default function EditItemDialog({ item }: Props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditItemFormData>({
    resolver: zodResolver(EditItemSchema),
    defaultValues: {
      id: item.id,
      description: item.description,
      stock: String(item.stock),
      price: String(item.price),
    },
  });

  const onSubmit = async (data: EditItemFormData) => {
    try {
      await updateItemAction(data)
      handleDialogClose(false);
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message })
      }
      setError("root", { message: "Error al editar el ítem" })
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Item</DialogTitle>
          <DialogDescription>Edita la información del item.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {errors.root &&
            <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Descripción
            </Label>
            <div className="col-span-3">
              <Input
                id="description"
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
                placeholder="Descripción del producto"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <div className="col-span-3">
              <Input
                id="stock"
                {...register("stock")}
                className={errors.stock ? "border-red-500" : ""}
                placeholder="0"
                min="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precio" className="text-right">
              Precio
            </Label>
            <div className="col-span-3">
              <Input
                id="price"
                {...register("price")}
                className={errors.price ? "border-red-500" : ""}
                placeholder="0"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAddDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Editando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
