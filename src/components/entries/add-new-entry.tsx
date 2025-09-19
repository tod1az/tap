interface AddEntradaModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newEntrada: {
    fecha: string
    descripcion: string
    cantidad: string
    precio: string
    proveedor: string
  }
  onEntradaChange: (entrada: any) => void
  onAdd: () => void
}

function AddEntradaModal({ isOpen, onOpenChange, newEntrada, onEntradaChange, onAdd }: AddEntradaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Entrada
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Entrada</DialogTitle>
          <DialogDescription>Registra una nueva entrada al inventario.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha" className="text-right">
              Fecha
            </Label>
            <Input
              id="fecha"
              type="date"
              value={newEntrada.fecha}
              onChange={(e) => onEntradaChange({ ...newEntrada, fecha: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              value={newEntrada.descripcion}
              onChange={(e) => onEntradaChange({ ...newEntrada, descripcion: e.target.value })}
              className="col-span-3"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cantidad" className="text-right">
              Cantidad
            </Label>
            <Input
              id="cantidad"
              type="number"
              value={newEntrada.cantidad}
              onChange={(e) => onEntradaChange({ ...newEntrada, cantidad: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precio" className="text-right">
              Precio Total
            </Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              value={newEntrada.precio}
              onChange={(e) => onEntradaChange({ ...newEntrada, precio: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="proveedor" className="text-right">
              Proveedor
            </Label>
            <Input
              id="proveedor"
              value={newEntrada.proveedor}
              onChange={(e) => onEntradaChange({ ...newEntrada, proveedor: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onAdd}>
            Agregar Entrada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

