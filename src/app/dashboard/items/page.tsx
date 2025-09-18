import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, SearchParams } from "@/lib/types"
import { getItems, getItemsCount } from "@/lib/queries/items"
import NewItemDialog from "@/components/items/new-item-dialog"
import DeleteItem from "@/components/items/delete-item"
import EditItemDialog from "@/components/items/edit-item"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import NewEntryDialog from "@/components/items/new-entry-dialog"
import ItemLossEntry from "@/components/items/new-loss-entry"


type Props = {
  searchParams: SearchParams
}

export default async function ItemsManagement({ searchParams }: Props) {

  const { q, page } = await searchParams

  const items = await getItems(q, page)
  const count = await getItemsCount(q)

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
        <SearchBar item="items" />
        <ItemsTable items={items} />
        <Pagination totalItems={count} />
      </CardContent>
    </Card>
  )
}

type TableProps = {
  items: Item[]
}

function ItemsTable({ items }: TableProps) {
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
              <TableCell>${item.price}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditItemDialog item={item} />
                  <ItemLossEntry item={item} />
                  <NewEntryDialog item={item} />
                  <DeleteItem item={item} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
