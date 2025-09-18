"use client"
import { Item } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Package } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createItemEntryAction } from "@/lib/actions/items";

type Props = {
  item: Item
}

export default function NewEntryDialog({ item }: Props) {


  const [isOpen, setIsOpen] = useState(false)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function handleNewEntry() {
    try {
      setIsLoading(true)
      await createItemEntryAction({ item_id: item.id, stock, price })
        .then(() => {
          setIsLoading(false)
          setIsOpen(false)
        })
    } catch {
      console.log("whoops!")
      setIsLoading(false)
      setIsOpen(false)
    }

  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(e.target.value))
  }
  function handleStockChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStock(Number(e.target.value))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => { }}
          className="text-green-600 hover:text-green-600 hover:bg-green-50"
        >
          <Package className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Entrada</DialogTitle>
          <DialogDescription>
            Registra una entrada para el item:{" "}
            <span className="font-semibold">{item.description}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Cantidad
            </Label>
            <Input
              id="stock"
              type="number"
              onChange={handleStockChange}
              className="col-span-3"
              placeholder="Cantidad recibida"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio Total
            </Label>
            <Input
              type="number"
              onChange={handlePriceChange}
              id="price"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { }} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleNewEntry}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrar Entrada"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

