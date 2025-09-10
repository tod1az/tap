import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import NewItemDialog from "./new-item-dialog"
import ItemSearchBar from "./search-bar"
import { Item } from "@/lib/types"
import PaginationCommands from "./pagination-commands"

export default function ItemsManagement() {
  const currentItems: Item[] = [
    { id: 1, codigo: "ITM001", nombre: "Laptop Dell", categoria: "Electrónicos", stock: 15, precio: 850.0 },
    { id: 2, codigo: "ITM002", nombre: "Mouse Inalámbrico", categoria: "Accesorios", stock: 45, precio: 25.99 },
    { id: 3, codigo: "ITM003", nombre: "Teclado Mecánico", categoria: "Accesorios", stock: 23, precio: 89.5 },
    { id: 4, codigo: "ITM004", nombre: 'Monitor 24"', categoria: "Electrónicos", stock: 8, precio: 299.99 },
    { id: 5, codigo: "ITM005", nombre: "Impresora HP", categoria: "Oficina", stock: 12, precio: 199.99 },
    { id: 6, codigo: "ITM006", nombre: "Webcam HD", categoria: "Accesorios", stock: 30, precio: 45.5 },
    { id: 7, codigo: "ITM007", nombre: "Auriculares", categoria: "Audio", stock: 25, precio: 75.0 },
    { id: 8, codigo: "ITM008", nombre: "Tablet Samsung", categoria: "Electrónicos", stock: 18, precio: 350.0 },
    { id: 9, codigo: "ITM009", nombre: "Cable HDMI", categoria: "Accesorios", stock: 50, precio: 15.99 },
    { id: 10, codigo: "ITM010", nombre: "Disco Duro 1TB", categoria: "Almacenamiento", stock: 20, precio: 89.99 },
    { id: 11, codigo: "ITM011", nombre: "Router WiFi", categoria: "Redes", stock: 15, precio: 120.0 },
    { id: 12, codigo: "ITM012", nombre: "Memoria USB 32GB", categoria: "Almacenamiento", stock: 40, precio: 12.99 },
    { id: 13, codigo: "ITM013", nombre: "Silla Ergonómica", categoria: "Mobiliario", stock: 8, precio: 250.0 },
    { id: 14, codigo: "ITM014", nombre: "Lámpara LED", categoria: "Iluminación", stock: 22, precio: 35.0 },
    { id: 15, codigo: "ITM015", nombre: "Calculadora", categoria: "Oficina", stock: 35, precio: 25.5 },
  ]

  const pageItems = currentItems.slice(0, 10)
  const mockTotalItems = currentItems.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Items
          <NewItemDialog />
        </CardTitle>
        <CardDescription>Administra el inventario de items de la empresa</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemSearchBar />
        <ItemsTable items={pageItems} />
        <PaginationCommands totalItems={mockTotalItems} />
      </CardContent>
    </Card>
  )
}

type Props = {
  items: Item[]
}

function ItemsTable({ items }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.codigo}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.categoria}</TableCell>
              <TableCell>
                <Badge variant={item.stock < 10 ? "destructive" : "secondary"}>{item.stock}</Badge>
              </TableCell>
              <TableCell>${item.precio.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}
