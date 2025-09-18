"use client"
import { Item } from "@/lib/types"
import { Button } from "../ui/button"
import { useState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { createItemLossAction } from "@/lib/actions/items"

type Props = {
  item: Item
}
export default function ItemLossEntry({ item }: Props) {

  const [isOpen, setIsOpen] = useState(false)
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStock(Number(e.target.value))
  }

  async function handleLoss() {
    try {
      setIsLoading(true)
      await createItemLossAction({ stock, item_id: item.id })
        .then(() => {
          setIsLoading(false)
          setIsOpen(false)
        })
    } catch {
      console.log("Whoops!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(isOpen)}
          className="text-orange-600 hover:text-orange-600 hover:bg-orange-50"
        >
          <AlertTriangle className="h-4 w-4" />
        </Button>
      </DialogTrigger >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Merma</DialogTitle>
          <DialogDescription>
            Registra merma para el item: <span className="font-semibold">{item.description}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Cantidad
            </Label>
            <Input
              onChange={handleChange}
              type="number"
              id="stock"
              min={1}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleLoss}
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrar Merma"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
