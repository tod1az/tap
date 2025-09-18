import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import { Entry, SearchParams } from "@/lib/types"
import { getEntries, getEntriesCount } from "@/lib/queries/items"


type Props = {
  searchParams: SearchParams
}

export default async function EntradasPage({ searchParams }: Props) {

  const { q, page } = await searchParams

  const entries = await getEntries(q, page)
  const totalEntries = await getEntriesCount(q)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Entradas
        </CardTitle>
        <CardDescription>Administra las entradas de inventario y movimientos de stock</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchBar item="entradas" />
        <EntradasTable
          entries={entries}
        />
        <Pagination totalItems={totalEntries} />
      </CardContent>
    </Card>
  )
}

type TableProps = {
  entries: Entry[]
}


function EntradasTable({ entries }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.created_at?.toLocaleDateString("es-ES")}</TableCell>
              <TableCell className="max-w-xs truncate">{entry.item?.description}</TableCell>
              <TableCell>{entry.stock}</TableCell>
              <TableCell>${entry.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

