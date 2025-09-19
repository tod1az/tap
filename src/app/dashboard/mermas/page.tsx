
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import { SearchParams, ItemLoss } from "@/lib/types"
import { getItemLoss, getItemLossCount } from "@/lib/queries/items"


type Props = {
  searchParams: SearchParams
}

export default async function MermasPage({ searchParams }: Props) {

  const { q, page } = await searchParams

  const itemLosses = await getItemLoss(q, page)
  const totalLosses = await getItemLossCount(q)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Mermas
        </CardTitle>
        <CardDescription>Administra las perdidas del inventario</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchBar item="mermas" />
        <LossesTable
          itemLosses={itemLosses}
        />
        <Pagination totalItems={totalLosses} />
      </CardContent>
    </Card>
  )
}

type TableProps = {
  itemLosses: ItemLoss[]
}


function LossesTable({ itemLosses }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemLosses.map((itemLoss) => (
            <TableRow key={itemLoss.id}>
              <TableCell className="font-medium">{itemLoss.created_at?.toLocaleDateString("es-ES")}</TableCell>
              <TableCell className="max-w-xs truncate">{itemLoss.item?.description}</TableCell>
              <TableCell>{itemLoss.stock}</TableCell>
              <TableCell>${itemLoss.item.price * itemLoss.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

