import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import { Item } from "@/lib/types"
import { getAllItems, getItemsCount } from "@/lib/queries"
import NewItemDialog from "@/components/items/new-item-dialog"
import ItemSearchBar from "@/components/items/search-bar"
import PaginationCommands from "@/components/items/pagination-commands"

export default async function ItemsManagement() {

  const items = await getAllItems()
  const count = await getItemsCount()

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
        <ItemsTable items={items} />
        <PaginationCommands totalItems={count} />
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
            <TableHead>Stock</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Badge variant={item.stock < 10 ? "destructive" : "secondary"}>{item.stock}</Badge>
              </TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
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
